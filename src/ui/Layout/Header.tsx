import styled from "styled-components";
import tw from "twin.macro";
import { GiHamburgerMenu } from "react-icons/gi";

import { useSidebar } from "../../contexts/sidebarContext";
import Logout from "../../features/authentication/Logout";

const StyledHeader = styled.header`
  ${tw`
  h-20
  px-[1.4rem] py-[0.6rem] 
  flex justify-between col-[1/-1] bg-grey-0 border-b-grey-100 border-b lg:px-[4.8rem] lg:py-[1.2rem]  lg:col-[2/-1] `}
`;
// ${tw`bg-green-500 `}

function Header() {
  const { toggleSidebar } = useSidebar();

  return (
    <StyledHeader>
      <span className="lg:hidden" onClick={toggleSidebar}>
        <GiHamburgerMenu size={32} />
      </span>
      <Logout />
    </StyledHeader>
  );
}

export default Header;
