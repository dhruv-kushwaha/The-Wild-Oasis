import { ChangeEvent, FormEvent, useRef, useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import useUpdateUser from "./useUpdateUser";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const { user } = useUser();
  const formRef = useRef<HTMLFormElement>(null);
  const { updateUser, isUpdating } = useUpdateUser();

  const [name, setName] = useState<string>(user?.name as string);
  const [avatar, setAvatar] = useState<File | undefined>(undefined);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const updatedData = {
      name: name !== user?.name ? name : undefined,
      avatar,
    };

    console.log(updatedData);
    updateUser(updatedData, {
      onSuccess: () => {
        setAvatar(undefined);
        if (formRef.current) {
          formRef.current.reset();
        }
      },
    });
  }

  function handleAvatarChange(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files !== null && files.length > 0) {
      setAvatar(files[0]);
    }
  }

  function handleCancel() {
    setName(user?.name as string);
    setAvatar(undefined);
  }

  return (
    <Form onSubmit={handleSubmit} ref={formRef}>
      <FormRow label="Email address">
        <Input value={user?.email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={handleAvatarChange}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow>
        <>
          <Button
            type="reset"
            $variation="secondary"
            onClick={handleCancel}
            disabled={isUpdating}
          >
            Cancel
          </Button>
          <Button disabled={isUpdating}>Update account</Button>
        </>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
