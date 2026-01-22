import styled from "styled-components";

export const DashboardCardRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 2rem;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
`;

export const Card = styled.div`
  flex: 1 1 350px;
  min-width: 300px;
  max-width: 600px;
  width: 100%;
  height: 60vh;
  max-height: 70vh;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1.5rem;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 1rem;
  @media (max-width: 900px) {
    width: 90vw;
    min-width: unset;
    max-width: 98vw;
    margin: 0;
  }
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
