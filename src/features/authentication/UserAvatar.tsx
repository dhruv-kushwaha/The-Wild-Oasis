import styled from "styled-components";
import { useUser } from "./useUser";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

interface UserAvatarProps {}

function UserAvatar() {
  const { user } = useUser();

  return (
    <StyledUserAvatar>
      <Avatar
        // src={user?.avatar ?? "default-user.jpg"}
        src={
          user?.avatar
            ? typeof user.avatar === "string"
              ? user.avatar
              : "default-user.jpg"
            : "default-user.jpg"
        }
        alt={`Avatar of ${user?.name}`}
      />
      <span>{user?.name}</span>
    </StyledUserAvatar>
  );
}

export default UserAvatar;
