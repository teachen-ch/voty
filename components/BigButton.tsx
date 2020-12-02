import { Button, ButtonProps, Text } from "rebass";

export const BigButton: React.FC<
  ButtonProps & {
    color: string;
    onClick?: () => void;
    width?: string;
  }
> = ({ color, onClick, width, ...props }) => (
  <Button
    bg="white !important"
    flex="1"
    disabled={!onClick}
    onClick={onClick}
    width={width}
    {...props}
  >
    <Text fontSize={[2, 2, 3]} color={color}>
      {props.children}
    </Text>
  </Button>
);

export const BigGray: React.FC = (props) => (
  <BigButton color="gray" width="100%" my={1}>
    {props.children}
  </BigButton>
);
