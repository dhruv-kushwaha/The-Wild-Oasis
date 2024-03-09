import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";
import tw from "twin.macro";

const StyledAppLayout = styled.div`
  ${tw`grid h-[100dvh] lg:grid-cols-[26rem 1fr] grid-rows-[auto 1fr]`}/* TODO: Sidebar responsive */
`;
// ${tw`grid grid-cols-[26rem 1fr] h-screen grid-rows-[auto 1fr] `}

const Main = styled.main`
  ${tw`bg-grey-50 pt-[1.5rem] pb-[2rem] px-[2.4rem] lg:pt-[4rem] lg:pb-[4.8rem] lg:px-[6.4rem] overflow-auto`}
`;
/* ${tw`bg-red-500 `} */

const Container = styled.div`
  ${tw`
      max-w-[120rem] my-0 mx-auto flex flex-col gap-[3.2rem]
  `}
`;

function AppLayout() {
  return (
    <>
      <StyledAppLayout>
        <Header />
        <Sidebar />
        <Main>
          <Container>
            <Outlet />
          </Container>
        </Main>
      </StyledAppLayout>
    </>
  );
}

export default AppLayout;
