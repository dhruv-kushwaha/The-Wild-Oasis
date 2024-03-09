import styled, { css } from "styled-components";
import tw from "twin.macro";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      ${tw`text-[3rem] font-semibold`}
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      ${tw`font-semibold text-[2rem]`}
    `}
    
    ${(props) =>
    props.as === "h3" &&
    css`
      ${tw`font-semibold text-[2rem]`}
    `}
`;

export default Heading;
