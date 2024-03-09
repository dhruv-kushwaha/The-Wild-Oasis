import styled, { keyframes } from "styled-components";
import tw from "twin.macro";

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const Spinner = styled.div`
  margin: 10rem auto;

  width: 6.4rem;
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(farthest-side, var(--color-brand-600) 94%, #0000) top/10px
      10px no-repeat,
    conic-gradient(#0000 30%, var(--color-brand-600));
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 10px), #000 0);
  /* animation: ${rotate} 1.5s infinite linear; */

  ${tw` animate-spin-slow`}
`;

export default Spinner;
