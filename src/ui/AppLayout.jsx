import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "./Header";
import { styled } from "styled-components";
import { BookingFormProvider } from "../Contexts/BookingFormContext";

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
  -ms-overflow-style: none; // IE 10+
  scrollbar-width: none; // Firefox
  &::-webkit-scrollbar {
    display: none; // Safari and Chrome
  }
`;
const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
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
    <StyledAppLayout>
      <Header />
      <SideBar />
      <Main>
        <BookingFormProvider>
          <Container>
            <Outlet />
          </Container>
        </BookingFormProvider>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
