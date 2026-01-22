import styled from "styled-components";

export const Card = styled.div`
  border: 1px black solid;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DashboardCardRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  > label {
    font-weight: bold;
  }
`;

export const StyledInput = styled.input`
  padding: 0.2rem;
  border-radius: 4px;
  outline: none;
  border: 1px solid rgba(204, 204, 204, 0.5);

  &:focus {
    border: 1.5px solid rgba(0, 123, 255, 0.5);
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
    color: black;
  }
`;

export const FormErrorSpan = styled.span`
  color: green;
  &.error {
    color: red;
  }
`;
