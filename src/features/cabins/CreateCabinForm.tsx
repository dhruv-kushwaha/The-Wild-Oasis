import { useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldErrors,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import useUpdateCabin from "./useUpdateCabin";

import {
  CreateCabinSchema,
  TCabinType,
  TCreateCabinType,
  UpdateCabinType,
} from "../../schema/cabinSchema";
import { useCreateCabin } from "./useCreateCabin";

const fields = ["discount", "maxCapacity", "regularPrice"];

interface CreateCabinFormProps {
  cabinToEdit?: TCabinType;
  onCloseModal?: () => void;
}

function CreateCabinForm({
  cabinToEdit = {} as TCabinType,
  onCloseModal,
}: CreateCabinFormProps) {
  const isEditSession = Boolean(cabinToEdit.id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<TCreateCabinType>({
    resolver: zodResolver(CreateCabinSchema),
    defaultValues: isEditSession ? cabinToEdit : {},
  });

  const { updateCabin, isUpdating } = useUpdateCabin();
  const { createCabin, isCreating } = useCreateCabin();
  const isWorking = isUpdating || isCreating;

  const onSubmit: SubmitHandler<TCreateCabinType> = function (data) {
    // console.log(data);
    // console.log(data.image);

    let image = data.image;
    if (isEditSession) {
      // console.log("Dirty Fields : ", dirtyFields);
      if (data.image !== undefined && data.image instanceof FileList) {
        image = data.image[0];
      }

      const updatedData: UpdateCabinType = { ...data };
      Object.keys(updatedData).forEach((fieldName) => {
        const field = fieldName as keyof UpdateCabinType;

        if (!Object.keys(dirtyFields).includes(field)) {
          updatedData[field] = undefined;
        }
      });

      updateCabin(
        {
          ...updatedData,
          image: image,
          id: cabinToEdit.id,
        },
        {
          onSuccess: () => {
            onCloseModal?.();
          },
        },
      );
    } else {
      if (data.image !== undefined && data.image instanceof FileList) {
        createCabin(
          { ...data, image: data.image[0] },
          {
            onSuccess: () => {
              reset();
              onCloseModal?.();
            },
          },
        );
      }
    }
  };

  const EmptyNumberFieldHandler = useCallback(function (
    errors: FieldErrors,
    fields: string[],
  ) {
    Object.keys(errors).forEach((field: string) => {
      const key = field as keyof TCreateCabinType;
      if (errors[key]?.type === "invalid_type" && fields.includes(field)) {
        errors[key]!.message = "Field is required";
        errors[key]!.type = "required";
      }
    });
  }, []);

  if (Object.keys(errors).length !== 0) {
    EmptyNumberFieldHandler(errors, fields);
  }

  const onError: SubmitErrorHandler<TCreateCabinType> = function (errors) {
    // EmptyNumberFieldHandler(errors, fields);
    // console.log(errors);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal !== undefined ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message ?? ""}>
        <Input
          type="text"
          disabled={isWorking}
          id="name"
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow
        label="Maximum Capacity"
        error={errors?.maxCapacity?.message ?? ""}
      >
        <Input
          type="number"
          disabled={isWorking}
          id="maxCapacity"
          defaultValue={0}
          {...register("maxCapacity", {
            valueAsNumber: true,
          })}
        />
      </FormRow>

      <FormRow
        label="Regular price"
        error={errors?.regularPrice?.message ?? ""}
      >
        <Input
          type="number"
          disabled={isWorking}
          id="regularPrice"
          defaultValue={0}
          {...register("regularPrice", {
            valueAsNumber: true,
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message ?? ""}>
        <Input
          type="number"
          disabled={isWorking}
          id="discount"
          defaultValue={0}
          {...register("discount", {
            valueAsNumber: true,
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message ?? ""}
      >
        <Textarea
          disabled={isWorking}
          id="description"
          defaultValue=""
          {...register("description")}
        />
      </FormRow>

      <FormRow label="Cabin photo" error="">
        <FileInput
          disabled={isWorking}
          id="image"
          accept="image/*"
          {...register("image")}
        />
      </FormRow>

      <FormRow label="" error="">
        {/* type is an HTML attribute! */}
        <>
          <Button
            $variation="secondary"
            type="reset"
            onClick={() => onCloseModal?.()}
          >
            Cancel
          </Button>
          <Button disabled={isWorking}>
            {/* {isEditSession ? "Edit cabin" : "Create new cabin"} */}
            Create new cabin
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
