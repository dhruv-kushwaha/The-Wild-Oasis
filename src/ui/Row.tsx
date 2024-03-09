import styled, { css } from "styled-components";
import tw from "twin.macro";

interface RowProps {
  type?: "horizontal" | "vertical";
}

const Row = styled.div<RowProps>`
  ${tw`flex`}

  ${(props) =>
    props.type === "horizontal" &&
    css`
      ${tw`items-center justify-between`}
    `}


  ${(props) =>
    props.type === "vertical" &&
    css`
      ${tw`flex-col gap-[1.6rem]`}
    `}
`;

Row.defaultProps = {
  type: "vertical",
};

export default Row;
