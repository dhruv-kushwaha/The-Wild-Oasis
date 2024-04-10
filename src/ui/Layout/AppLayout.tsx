import { Outlet } from "react-router-dom";
// import Sidebar from "./Sidebar";
import Sidebar1 from "./Sidebar copy";
import Header from "./Header";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  /* TODO: Sidebar responsive */
  /* position: relative; */

  display: grid;
  height: 100vh;
  grid-template-rows: auto 1fr;

  @media screen and (min-width: 1024px) {
    grid-template-columns: 26rem 1fr;
  }
`;
// ${tw`grid grid-cols-[26rem 1fr] h-screen grid-rows-[auto 1fr] `}

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding-top: 1.5rem;
  padding-bottom: 2rem;
  padding-inline: 2.4rem;
  overflow: auto;

  @media screen and (min-width: 1024px) {
    padding-top: 4rem;
    padding-bottom: 4.8rem;
    padding-inline: 6.4rem;
  }
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout() {
  return (
    <>
      <StyledAppLayout>
        <Header />
        <Sidebar1 />
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
