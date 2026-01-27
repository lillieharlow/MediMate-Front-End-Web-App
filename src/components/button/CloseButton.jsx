import { StyledCloseButton } from "../../style/componentStyles";


export default function CloseButton({ onClick }) {
  return (
    <StyledCloseButton type="button" aria-label="Close" onClick={onClick}>
      ×
    </StyledCloseButton>
  );
}
