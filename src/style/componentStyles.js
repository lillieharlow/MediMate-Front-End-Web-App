// Ensure dashboard-card-content fills the card and has no padding for full-width row highlights
import styled from "styled-components";

export const Card = styled.div`
  flex: 1 1 350px;
  min-width: 300px;
  max-width: 600px;
  width: auto;
  height: 60vh;
  max-height: 70vh;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1.5rem 2.5rem;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  @media (max-width: 900px) {
    width: 90vw;
    min-width: unset;
    max-width: 98vw;
    margin: 0 1rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  @media (max-width: 600px) {
    padding-left: 1rem;
    padding-right: 1rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
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
  @media (max-width: 1040px) {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
`;

export const DashboardCardContent = styled.div`
  width: 100%;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
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
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
  min-width: 320px;
  max-width: 400px;
  padding: 0.3rem 2.5rem;
  font-weight: bold;
  font-size: 1.1rem;
`;

export const NameBoxRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ $selected }) => ($selected ? "#acacacba" : "transparent")};
  margin-bottom: 0.6rem;
  box-sizing: border-box;
  padding-left: 0;
  padding-right: 0;
  transition: background 0.2s;
  width: calc(100% + 5rem);
  margin-left: -2.5rem;
  margin-right: -2.5rem;
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
  margin: 1.2rem 0 0.05rem 0;
`;

export const StyledLabel = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: 500;
  min-width: 110px;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

export const StyledSelect = styled.select`
  flex: 1 1 0;
  min-width: 120px;
  padding: 0.4rem 0.7rem;
  border-radius: 6px;
  border: 1px solid #cccccc;
  font-size: 1rem;
`;

export const StyledTextarea = styled.textarea`
  min-width: 120px;
  max-width: 400px;
  width: 100%;
  padding: 0.4rem 0.7rem;
  border-radius: 6px;
  border: 1px solid #cccccc;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  margin-top: 0.3rem;
`;