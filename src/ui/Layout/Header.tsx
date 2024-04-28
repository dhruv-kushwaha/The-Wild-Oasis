import styled from "styled-components";
// import tw from "twin.macro";
import { GiHamburgerMenu } from "react-icons/gi";

import { useSidebar } from "../../contexts/sidebarContext";
import HeaderMenu from "../HeaderMenu";
import UserAvatar from "../../features/authentication/UserAvatar";

/* ${tw`
h-20
px-[1.4rem] py-[0.6rem] 
flex justify-between col-[1/-1] bg-grey-0 border-b-grey-100 border-b lg:px-[4.8rem] lg:py-[1.2rem]  lg:col-[2/-1] `} */

const StyledHeader = styled.header`
  /* height: 20px; */
  background-color: var(--color-grey-0);
  padding: 1.2rem 1.2rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: grid;
  /* gap: 2.4rem; */
  align-items: center;
  justify-content: space-between;
  grid-template-columns: 0.25fr 1fr;
  transition: all 300ms ease;

  @media screen and (min-width: 650px) {
    padding-inline: 3.2rem;
  }

  @media screen and (min-width: 1025px) {
    padding-inline: 4.8rem;
    grid-template-columns: 1fr;
  }
`;

const UserHeaderContainer = styled.div`
  justify-self: flex-end;
  display: flex;
  gap: 2rem;
`;

const HamburgerContainer = styled.span`
  @media screen and (min-width: 1024px) {
    display: none;
  }
`;

function Header() {
  const { toggleSidebar } = useSidebar();

  return (
    <StyledHeader>
      <HamburgerContainer onClick={toggleSidebar}>
        <GiHamburgerMenu size={32} />
      </HamburgerContainer>
      <UserHeaderContainer>
        <UserAvatar />
        <HeaderMenu />
      </UserHeaderContainer>
    </StyledHeader>
  );
}

export default Header;
