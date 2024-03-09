import styled from "styled-components";
import tw from "twin.macro";

const StyledLogo = styled.div`
  ${tw`flex justify-center`}
`;

const Img = styled.img`
  ${tw`w-auto h-[9.6rem]`}
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src="/logo-light.png" alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
