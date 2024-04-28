import styled, { css } from "styled-components";
// import tw from "twin.macro";
import Logo from "../Logo";
import MainNav from "../MainNav";
import { useSidebar } from "../../contexts/sidebarContext";
import { AiOutlineClose } from "react-icons/ai";
import Uploader from "../../data/Uploader";

interface StyledSidebarProps {
  $isopen: string;
}

/* ${tw`w-[28rem] h-[100vh] py-[3.2rem] px-[2.4rem] flex flex-col gap-[3.2rem] row-[2/-1] fixed bg-grey-0 border-grey-100 border-r-[1px] overflow-y-auto z-50 lg:row-[1/-1] lg:w-[26rem] lg:static`} */

const StyledSidebar = styled.aside<StyledSidebarProps>`
  width: 28rem;
  height: 100vh;
  padding: 3.2rem 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  grid-row: 2/-1;
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: 1px;
  overflow-y: auto;
  z-index: 50;
  transition: transform 300ms ease-in-out;

  ${(props) =>
    props.$isopen === "true"
      ? css`
          transform: translateX(0);
        `
      : css`
          transform: translateX(-100%);
        `}

  @media screen and (min-width: 1024px) {
    grid-row: 1/-1;
    width: 26rem;
    position: relative;
    transform: translateX(0);
  }
`;

const CloseSVGContainer = styled.span`
  cursor: pointer;

  @media all and (min-width: 1024px) {
    display: none;
  }
`;

function Sidebar() {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <StyledSidebar $isopen={isOpen.toString()}>
      {/* {window.innerWidth < 1024 && (
       
      )} */}
      <CloseSVGContainer>
        <AiOutlineClose size={32} onClick={toggleSidebar} />
      </CloseSVGContainer>

      <Logo />
      <MainNav />

      <Uploader />
    </StyledSidebar>
  );
}

export default Sidebar;
