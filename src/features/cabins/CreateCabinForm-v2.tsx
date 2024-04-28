import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import {
  FieldErrors,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { createCabin } from "../../services/apiCabins";
import {
  CreateCabinSchema,
  TCabinType,
  TCreateCabinType,
} from "../../schema/cabinSchema";
import { useCallback } from "react";
import FormRow from "../../ui/FormRow";
import useUpdateCabin from "./useUpdateCabin";

const fields = ["discount", "maxCapacity", "regularPrice"];

interface CreateCabinFormProps {
  cabinToEdit?: TCabinType;
}

function CreateCabinForm({
  cabinToEdit = {} as TCabinType,
}: CreateCabinFormProps) {
  const isEditSession = Boolean(cabinToEdit.id);

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TCreateCabinType>({
    defaultValues: isEditSession ? cabinToEdit : {},
    resolver: zodResolver(CreateCabinSchema),
  });

  const { updateCabin, isUpdating } = useUpdateCabin();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: (newCabin: TCreateCabinType) => createCabin(newCabin),
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
      reset();
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  // console.log(errors);

  const onSubmit: SubmitHandler<TCreateCabinType> = function (data) {
    console.log(data);
    console.log(data.image);
    // console.log(errors);
    let image = data.image;
    if (isEditSession) {
      if (data.image !== undefined && data.image instanceof FileList) {
        image = data.image[0];
      }
      updateCabin({
        ...data,
        image: image,
        id: cabinToEdit.id,
        createdAt: cabinToEdit.createdAt,
      });
    }

    if (data.image !== undefined && data.image instanceof FileList)
      mutate({ ...data, image: data.image[0] });
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
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message ?? ""}>
        <Input
          type="text"
          disabled={isCreating}
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
          disabled={isCreating}
          id="maxCapacity"
          defaultValue={0}
          {...register("maxCapacity", {
            valueAsNumber: true,
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow
        label="Regular price"
        error={errors?.regularPrice?.message ?? ""}
      >
        <Input
          type="number"
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
          id="description"
          defaultValue=""
          {...register("description")}
        />
      </FormRow>

      <FormRow label="Cabin photo" error="">
        <FileInput
          disabled={isCreating}
          id="image"
          accept="image/*"
          {...register("image")}
        />
      </FormRow>

      <FormRow label="" error="">
        {/* type is an HTML attribute! */}
        <>
          <Button $variation="secondary" type="reset">
            Cancel
          </Button>
          <Button disabled={isCreating}>
            {isEditSession ? "Edit cabin" : "Create new cabin"}
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
