/*
ActionButton component
- Generic styled button for all actions in the app
- Accepts $bg and $color props for changing colors
- Accepts children for button text/content
*/

import { ColoredButton } from "../../style/componentStyles";

function ActionButton({ children, onClick, bg, color, ...props }) {
  return (
    <ColoredButton $bg={bg} $color={color} onClick={onClick} {...props}>
      {children}
    </ColoredButton>
  );
}

export default ActionButton;
