import styled, { css } from "styled-components";

interface FormProps {
  type?: "modal" | "regular";
}

const Form = styled.form<FormProps>`
  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 1.2rem 2.2rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);

      @media screen and (min-width: 650px) {
        padding: 2.4rem 4rem;
      }
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 80rem;
    `}

    
  overflow: hidden;
  font-size: 1.4rem;
`;

Form.defaultProps = {
  type: "regular",
};

export default Form;
