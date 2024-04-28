import styled from "styled-components";
import { useDarkMode } from "../contexts/DarkModeContext";

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
  const { isDarkMode } = useDarkMode();

  const src = isDarkMode ? "/logo-dark.png" : "/logo-light.png";
  return (
    <StyledLogo>
      <Img src={src} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
