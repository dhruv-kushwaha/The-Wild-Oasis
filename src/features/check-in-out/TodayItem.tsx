import styled from "styled-components";
import { TStaysAfterDateType } from "../../schema/bookingSchema";
import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";
import CheckoutButton from "./CheckoutButton";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

interface TodayItemProps {
  activity: TStaysAfterDateType;
}

function TodayItem({ activity }: TodayItemProps) {
  const { id, status, guest, numNights } = activity;

  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checkedIn" && <Tag type="blue">Departing</Tag>}

      <Flag src={guest.countryFlag} alt={`Flag of ${guest.nationality}`} />
      <Guest>{guest.fullName}</Guest>

      <div>{numNights} nights</div>

      {status === "unconfirmed" && (
        <Button
          $size="small"
          $variation="primary"
          as={Link}
          to={`/checkin/${id}`}
        >
          Check in
        </Button>
      )}
      {status === "checkedIn" && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
}

export default TodayItem;
