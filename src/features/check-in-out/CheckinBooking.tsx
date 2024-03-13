import styled from "styled-components";
import BookingDataBox from "../bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import {
  ExtraBreakfastType,
  TFullBookingType,
} from "../../schema/bookingSchema";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState<boolean>(false);
  const [addBreakfast, setAddBreakfast] = useState<boolean>(false);

  const moveBack = useMoveBack();

  const { booking: booking, isLoading } = useBooking();
  const { settings, isLoading: isLoadingSettings } = useSettings();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
    // setAddBreakfast(booking?.hasBreakfast ? true : false);
  }, [booking?.isPaid, booking?.hasBreakfast]);

  const { checkin, isCheckingin } = useCheckin();

  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guest,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking as TFullBookingType;

  const optionalBreakfastPrice =
    numGuests * numNights * (settings?.breakfastPrice ?? 20);

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} as ExtraBreakfastType });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking as TFullBookingType} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            id="add-breakfast"
            disabled={hasBreakfast}
          >
            Want to add Breakfast for {formatCurrency(optionalBreakfastPrice)}
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          id="confirm-paid"
          disabled={confirmPaid || isCheckingin}
        >
          I confirm that {guest.fullName} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(totalPrice + optionalBreakfastPrice)}
              (${formatCurrency(totalPrice)} +
              ${formatCurrency(optionalBreakfastPrice)})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingin}>
          Check in booking #{bookingId}
        </Button>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
