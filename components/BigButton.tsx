import { Button, ButtonProps } from "rebass";

export const BigButton: React.FC<
  ButtonProps & {
    color: string;
    onClick?: () => void;
    width?: string;
  }
> = ({ color, onClick, width, ...props }) => (
  <Button
    sx={{ border: "5px solid", borderColor: color }}
    fontSize={[3, 3, 4]}
    bg="white"
    color={color}
    mr={2}
    py={4}
    flex="1"
    disabled={!onClick}
    onClick={onClick}
    width={width}
    {...props}
  >
    {props.children}
  </Button>
);
