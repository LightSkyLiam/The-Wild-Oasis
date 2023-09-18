import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSettings";
import Spinner from "../../ui/Spinner";
import { useUpdateSetting } from "./useUpdateSettings";
function UpdateSettingsForm() {
  const { isLoading, settings } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSetting();
  if (isLoading) return <Spinner />;
  const handleUpdate = (e, field) => {
    const { value } = e.target;
    if (!value || +value === settings[field]) return;
    updateSetting({ [field]: value });
  };
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          disabled={isUpdating}
          defaultValue={settings.minBookingLength}
          type="number"
          id="min-nights"
          onBlur={(e) => handleUpdate(e, `minBookingLength`)}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, `maxBookingLength`)}
          defaultValue={settings.maxBookingLength}
          type="number"
          id="max-nights"
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, `maxGuestsPerBooking`)}
          defaultValue={settings.maxGuestsPerBooking}
          type="number"
          id="max-guests"
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, `breakfastPrice`)}
          defaultValue={settings.breakfastPrice}
          type="number"
          id="breakfast-price"
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
