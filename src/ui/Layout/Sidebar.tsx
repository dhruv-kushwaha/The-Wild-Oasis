import styled from "styled-components";
import tw from "twin.macro";
import Logo from "../Logo";
import MainNav from "../MainNav";
import { useSidebar } from "../../contexts/sidebarContext";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

// const StyledSidebar = styled.aside`
//   ${tw`border-red-400 border-r-8 bg-grey-0 row-[1/-1] py-[3.2rem] px-[2.4rem]`}
// `;

const StyledSidebar = styled.aside`
  ${tw`w-[28rem] h-[100vh] py-[3.2rem] px-[2.4rem] flex flex-col gap-[3.2rem] row-[2/-1] fixed bg-grey-0 border-grey-100 border-r-[1px] overflow-y-auto z-50 lg:row-[1/-1] lg:w-[26rem] lg:static`}
`;
/* ${tw`bg-yellow-500 row-[1/-1]`} */

// interface SidebarProps {}

function Sidebar() {
  const { isOpen, toggleSidebar } = useSidebar();

  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    // Function to update windowWidth state
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add event listener for window resize
    window.addEventListener("resize", updateWindowWidth);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);

  if ((windowWidth < 1024 && isOpen) || windowWidth >= 1024) {
    return (
      <StyledSidebar>
        {windowWidth < 1024 && (
          <span className="cursor-pointer">
            <AiOutlineClose size={32} onClick={toggleSidebar} />
          </span>
        )}

        <Logo />
        <MainNav />
      </StyledSidebar>
    );
  }

  return null;
}

export default Sidebar;
