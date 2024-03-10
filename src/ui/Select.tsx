import { ChangeEvent } from "react";
import styled from "styled-components";

interface StyledSelectProps {
  type?: "white";
}

const StyledSelect = styled.select<StyledSelectProps>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

interface SelectProps {
  value: string;
  selectOptions: {
    value: string;
    label: string;
  }[];
  type?: "white";
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

function Select({ value, selectOptions, onChange, ...props }: SelectProps) {
  return (
    <StyledSelect value={value} onChange={onChange} {...props}>
      {selectOptions.map((option) => (
        <option value={option.value}>{option.label}</option>
      ))}
    </StyledSelect>
  );
}

export default Select;
