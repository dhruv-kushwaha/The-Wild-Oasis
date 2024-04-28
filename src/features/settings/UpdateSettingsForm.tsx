import { FocusEvent } from "react";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";
import {
  TUpdateSettingType,
  UpdateSettingsSchema,
} from "../../schema/settingsSchema";
import toast from "react-hot-toast";

function UpdateSettingsForm() {
  const { isLoading, settings } = useSettings();
  const { updateSettings, isUpdating } = useUpdateSetting();

  function handleUpdate(
    e: FocusEvent<HTMLInputElement, Element>,
    field: string,
  ) {
    const value = e.target.value;

    const fieldToBeUpdated = field as keyof TUpdateSettingType;
    const parsedResult = UpdateSettingsSchema.safeParse({
      [fieldToBeUpdated]: value,
    });

    if (parsedResult.success) {
      updateSettings({ ...parsedResult.data });
    } else {
      toast.error("Field could not be updated");
    }
  }

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          disabled={isUpdating}
          defaultValue={settings?.minBookingLength}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          disabled={isUpdating}
          defaultValue={settings?.maxBookingLength}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          disabled={isUpdating}
          defaultValue={settings?.maxGuestsPerBooking}
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          disabled={isUpdating}
          defaultValue={settings?.breakfastPrice}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
