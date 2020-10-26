import { Button, ButtonProps, Text } from "rebass";

export const BigButton: React.FC<
  ButtonProps & {
    color: string;
    onClick?: () => void;
    width?: string;
  }
> = ({ color, onClick, width, ...props }) => (
  <Button
    mr={2}
    py={4}
    mt={2}
    bg="white !important"
    flex="1"
    disabled={!onClick}
    onClick={onClick}
    width={width}
    {...props}
  >
    <Text fontSize={[3, 3, 4]} color={color}>
      {props.children}
    </Text>
  </Button>
);

export const BigGray: React.FC = (props) => (
  <BigButton color="gray" width="100%" mb={4}>
    {props.children}
  </BigButton>
);
