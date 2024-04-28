import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { TFullBookingType } from "../../schema/bookingSchema";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "../check-in-out/useDeleteBooking";
import Empty from "../../ui/Empty";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const { checkout: checkoutBooking, isCheckingout } = useCheckout();
  const navigate = useNavigate();
  // const { status } = booking;

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    checkedIn: "green",
    checkedOut: "silver",
  };

  if (isLoading) return <Spinner />;

  if (!booking) return <Empty resourceName="booking" />;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{booking?.id}</Heading>
          <Tag type={statusToTagName[booking?.status ?? "unconfirmed"]}>
            {booking?.status.replace("checked", "checked ")}
          </Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking as TFullBookingType} />

      <ButtonGroup>
        {booking?.status === "checkedIn" && (
          <Button
            onClick={() => {
              checkoutBooking(booking.id);
            }}
            disabled={isCheckingout}
          >
            Check Out
          </Button>
        )}

        {booking?.status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${booking?.id}`)}>
            Check In
          </Button>
        )}
        <Modal>
          <Modal.Open opens="delete-booking">
            <Button $variation="danger" disabled={isDeleting}>
              Delete Booking
            </Button>
          </Modal.Open>

          <Modal.Window name="delete-booking">
            <ConfirmDelete
              onConfirm={() => {
                deleteBooking(booking.id, {
                  onSuccess: () => navigate(-1),
                });
              }}
              disabled={isDeleting}
              resourceName={`booking #${booking.id}`}
            />
          </Modal.Window>
        </Modal>

        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
