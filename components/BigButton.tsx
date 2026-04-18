import { Button } from "components/ui";

export const BigButton: React.FC<React.PropsWithChildren<{
  color: string;
  onClick?: () => void;
  width?: string;
  className?: string;
}>> = ({ color, onClick, width, className, ...props }) => (
  <Button
    className={`bg-white! flex-1 ${className ?? ""}`}
    style={{ width }}
    disabled={!onClick}
    onClick={onClick}
  >
    <span className="text-base sm:text-lg" style={{ color }}>
      {props.children}
    </span>
  </Button>
);

export const BigGray: React.FC<React.PropsWithChildren<unknown>> = (props) => (
  <BigButton color="gray" width="100%" className="my-1">
    {props.children}
  </BigButton>
);
