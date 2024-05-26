import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow";
import Form from "../../ui/Form";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Spinner from "../../ui/Spinner";
import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import { useBookingFormInfo } from "../../Contexts/BookingFormContext";
import { useSettings } from "../settings/useSettings";
import { useGetCabinInfo } from "../cabins/useGetCabinInfo";
import { useSearchParams } from "react-router-dom";

function BookingInfoForm({
  defaultValues = {},
  onSubmit,
  isLoading,
  onCloseModal,
  setFormStep,
  edit = false,
}) {
  const { settings } = useSettings();
  const { bookingInfo, setBookingInfo } = useBookingFormInfo();
  const {
    formState: { errors },
    register,
    handleSubmit,
    setError,
    getValues,
    watch,
    reset,
  } = useForm({
    defaultValues: defaultValues || bookingInfo,
    criteriaMode: "all",
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const { isGettingCabinInfo, cabinInfo, refetch, cabinInfoError } =
    useGetCabinInfo();

  const startDateValue = new Date(watch("startDate"));
  const endDateValue = new Date(watch("endDate"));
  const numNights =
    (endDateValue.getTime() - startDateValue.getTime()) / (1000 * 3600 * 24);
  const handleBackClick = () => {
    setBookingInfo(getValues());
    setFormStep(1);
  };
  const numGuests = watch("numGuests");
  const hasBreakfast = watch("hasBreakfast");
  const cabinPrice =
    cabinInfo && numNights && +cabinInfo.regularPrice * numNights;
  const extrasPrice =
    settings && hasBreakfast
      ? numGuests * numNights * settings.breakfastPrice
      : 0;
  const totalPrice = cabinPrice + extrasPrice;

  const checkCabinInfo = async (cabinName) => {
    if (!cabinName || cabinName === null) return;
    if (cabinName === cabinInfo?.name) return;
    if (searchParams.get("cabinName") === cabinName) return;
    searchParams.set("cabinName", cabinName);
    setSearchParams(searchParams);
    if (
      cabinName !== bookingInfo?.cabinId ||
      cabinName !== defaultValues.cabinId
    )
      reset({
        startDate: "",
        endDate: "",
        numGuests: "",
        hasBreakfast: "",
        isPaid: "",
        observations: "",
      });
  };
  const closeModal = () => {
    searchParams.delete("cabinName");
    setSearchParams(searchParams);
    onCloseModal?.();
  };
  useEffect(() => {
    refetch({ throwOnError: true });
  }, [refetch]);

  useEffect(() => {
    if (cabinInfoError && !cabinInfoError?.message?.includes(`["cabin",null]`))
      setError("cabinId", {
        message: "Couldn't Find Cabin, Please Try Again",
      });
  }, [setError, cabinInfoError]);

  useEffect(() => {
    if (edit) {
      searchParams.set("cabinName", defaultValues.cabinId);
      setSearchParams(searchParams);
    }
  }, []);

  return (
    <Form
      type={`modal`}
      onSubmit={handleSubmit((values) => {
        delete values.cabinId;
        const bookingInfoObj = {
          ...values,
          hasBreakfast: !!values.hasBreakfast,
          isPaid: !!values.isPaid,
          numNights,
          numGuests: +numGuests,
          status: `unconfirmed`,
          cabinId: cabinInfo.id,
          totalPrice,
          extrasPrice,
          cabinPrice,
        };
        onSubmit(bookingInfoObj);
      })}
    >
      <FormRow label="Cabin Id" error={errors?.cabinId?.message}>
        <Input
          autoFocus={!edit}
          name="cabinId"
          type="text"
          id="cabinId"
          {...register(`cabinId`, {
            required: `Please Enter Cabin Id`,
            onBlur: (e) => checkCabinInfo(e.target.value),
          })}
        />
      </FormRow>
      {isGettingCabinInfo && <Spinner type="small" />}
      <FormRow label="Start Date" error={errors?.startDate?.message}>
        <Input
          name="startDate"
          disabled={isLoading || !cabinInfo}
          type="date"
          id="startDate"
          {...register(`startDate`, {
            required: `Please Enter Start Date`,
          })}
        />
      </FormRow>
      <FormRow label="End Date" error={errors?.endDate?.message}>
        <Input
          min={watch("startDate") || undefined}
          name="endDate"
          disabled={isLoading || !cabinInfo}
          type="date"
          id="endDate"
          {...register(`endDate`, { required: `Please Enter End Date` })}
        />
      </FormRow>
      <FormRow label="Number of Nights">
        <p>{isNaN(numNights) || numNights < 0 ? `` : numNights}</p>
      </FormRow>
      <FormRow label="Number of Guests" error={errors?.numGuests?.message}>
        <Input
          required
          min={1}
          max={+cabinInfo?.maxCapacity || 8}
          disabled={!cabinInfo || isLoading}
          name="numGuests"
          type="number"
          id="numGuests"
          {...register(`numGuests`)}
        />
      </FormRow>
      <FormRow
        label="BreakFast Included?"
        error={errors?.hasBreakfast?.message}
      >
        <Input
          disabled={isLoading || !cabinInfo}
          name="hasBreakfast"
          type="checkbox"
          id="hasBreakfast"
          {...register(`hasBreakfast`)}
        />
      </FormRow>
      <FormRow label="Paid?" error={errors?.isPaid?.message}>
        <Input
          disabled={isLoading || !cabinInfo}
          name="isPaid"
          type="checkbox"
          id="isPaid"
          {...register(`isPaid`)}
        />
      </FormRow>
      <FormRow label="Total Price" error={errors?.observations?.message}>
        <p>{totalPrice ? formatCurrency(totalPrice) : ``}</p>
      </FormRow>
      <FormRow label="Observations" error={errors?.name?.message}>
        <Textarea
          name="observations"
          disabled={isLoading || !cabinInfo}
          id="observations"
          {...register(`observations`)}
        />
      </FormRow>
      <FormRow>
        {!edit && (
          <Button
            className="stickToLeft"
            onClick={handleBackClick}
            variation="secondary"
            type="button"
            disabled={isLoading}
          >
            Back
          </Button>
        )}
        <Button
          onClick={closeModal}
          variation="secondary"
          type="reset"
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading || !cabinInfo}>
          {isLoading ? `Loading...` : edit ? "Update Booking" : `Add Booking`}
        </Button>
      </FormRow>
    </Form>
  );
}

export default BookingInfoForm;
