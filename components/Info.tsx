import { Card, CardProps } from "components/ui";
import { cn } from "util/cn";

const typeColors: Record<string, string> = {
  important: "border-l-danger",
  info: "border-l-primary",
  light: "border-l-highlight",
  default: "border-l-gray",
  success: "border-l-success",
};

/**
 *
 * @param type: important | info | light | default
 */
export const Info: React.FC<
  React.PropsWithChildren<CardProps & { type?: string }>
> = ({ type = "default", className, children, ...props }) => (
  <Card
    className={cn(
      "py-2 my-8 px-8 text-base border-l-[10px] border-l-solid",
      typeColors[type],
      className
    )}
    {...props}
  >
    {children}
  </Card>
);
