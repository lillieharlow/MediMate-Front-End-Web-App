import styled from "styled-components";

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

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  > label {
    font-weight: bold;
  }
`;

export const FormErrorSpan = styled.span`
  color: green;
  &.error {
    color: red;
  }
`;

export const ColoredButton = styled.button`
  background-color: ${({ $bg }) => $bg || "#008533"};
  color: ${({ $color }) => $color || "#fff"};
  font-weight: bold;
  border: 2px solid #000000;
  border-radius: 6px;
  box-shadow: 3px 3px 8px #0000002e;
  padding: 0.5rem 1.5rem;
  cursor: pointer;
  transition:
    box-shadow 0.2s,
    transform 0.2s;
  outline: none;
  &:hover {
    box-shadow: 8px 8px 16px #00000038;
    transform: translate(2px, 2px);
    outline: none;
  }
`;

export const NameBox = styled.div`
  background: ${({ $bg }) => $bg || "#80d09e"};
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #000000;
  border-radius: 24px;
  margin-top: 0;
  margin-right: 0;
  margin-bottom: 0.5rem;
  margin-left: 0;
  width: fit-content;
  min-width: 320px;
  max-width: 400px;
  padding: 0.3rem 2.5rem;
  font-weight: bold;
  font-size: 1.1rem;
`;

export const PatientListActions = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 0.8rem;
  margin-bottom: 0.5rem;
`;

export const ListSeparator = styled.hr`
  border: none;
  border-bottom: 1px solid #e0e0e0;
  width: 100%;
  margin: 0.05rem 0 0.05rem 0;
`;
