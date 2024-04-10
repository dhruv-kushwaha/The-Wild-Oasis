import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";

const LoginLayout = styled.main`
  min-height: 100dvh;
  display: grid;
  grid-template-columns: 28rem;
  align-content: center;
  justify-content: center;
  gap: 2rem;
  background-color: var(--color-grey-50);

  @media screen and (min-width: 650px) {
    gap: 3.2rem;
    grid-template-columns: 48rem;
  }
`;

function Login() {
  return (
    <LoginLayout>
      <Logo />

      <Heading as="h4">Log in to your account</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
