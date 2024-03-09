import styled, { css } from "styled-components";
import tw from "twin.macro";

const sizes = {
  small: tw`text-center font-semibold uppercase text-[1.2rem] px-[0.4rem] py-[0.8rem]`,
  medium: tw`font-medium text-[1.4rem] px-[1.2rem] py-[1.6rem]`,
  large: tw`font-medium text-[1.6rem] px-[1.2rem] py-[2.4rem]`,
};

const variations = {
  primary: css`
    ${tw`bg-brand-600 text-brand-50`}

    &:hover {
      ${tw`bg-brand-700`}
    }
  `,
  secondary: css`
    ${tw`border-grey-200 border-solid bg-grey-0 text-grey-600 border-[1px]`}
    /* color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200); */

    &:hover {
      ${tw`bg-grey-50`}/* background-color: var(--color-grey-50); */
    }
  `,
  danger: css`
    ${tw`bg-red-700 text-red-100`}

    /* color: var(--color-red-100);
    background-color: var(--color-red-700); */

    &:hover {
      ${tw`bg-red-800`}/* background-color: var(--color-red-800); */
    }
  `,
};

interface ButtonStyleProps {
  $variation?: "primary" | "secondary" | "danger";
  $size?: "small" | "medium" | "large";
}

const Button = styled.button<ButtonStyleProps>`
  ${tw`rounded-sm border-none shadow-sm`}

  ${(props) => sizes[props.$size ?? "medium"]}
  ${(props) => variations[props.$variation ?? "primary"]}
`;
Button.defaultProps = {
  $variation: "primary",
  $size: "medium",
};

export default Button;
