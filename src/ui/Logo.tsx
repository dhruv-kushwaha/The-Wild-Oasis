import styled from "styled-components";

/* ${tw`flex justify-center`} */
const StyledLogo = styled.div`
  display: flex;
  justify-content: center;
`;

const Img = styled.img`
  width: auto;
  height: 9.6rem;
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src="/logo-light.png" alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
