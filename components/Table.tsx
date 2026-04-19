import { useRouter } from "next/router";
import { Flex, Image, Text, Box, useColorMode } from "components/ui";
import { Center } from "./Learning";

export const Table: React.FC<
  React.PropsWithChildren<
    React.HTMLAttributes<HTMLDivElement> & { fontSize?: string | string[] }
  >
> = ({ id, children, className, ...props }) => {
  return (
    <div
      id={id}
      className={`text-sm sm:text-base border-b-2 border-t-2 border-current ${
        className ?? ""
      }`}
      {...props}
    >
      {children}
    </div>
  );
};

export const TR: React.FC<
  React.PropsWithChildren<
    React.HTMLAttributes<HTMLDivElement> & { href?: string; noHover?: boolean }
  >
> = ({ href, noHover, className, ...props }) => {
  const router = useRouter();
  return (
    <Flex
      className={`flex-row justify-between items-center flex-nowrap min-h-10 py-1 border-b border-gray ${
        noHover ? "" : "hover:bg-primary hover:text-white"
      } ${href ? "cursor-pointer" : ""} ${className ?? ""}`}
      onClick={href ? () => router.push(href) : undefined}
      {...props}
    >
      {props.children}
    </Flex>
  );
};

export const TD: React.FC<
  React.PropsWithChildren<
    React.HTMLAttributes<HTMLDivElement> & {
      smHide?: boolean;
      flexy?: boolean;
      fixed?: boolean;
      width?: number | string;
      textAlign?: string;
    }
  >
> = ({
  flexy,
  smHide,
  fixed,
  children,
  className,
  width,
  textAlign,
  ...props
}) => (
  <div
    {...props}
    className={`px-2 ${smHide ? "hidden sm:block" : "block"} ${
      flexy ? "grow min-w-0" : "grow-0"
    } ${fixed ? "shrink-0" : "shrink"} ${className ?? ""}`}
    style={{ width: width as any, textAlign: textAlign as any }}
  >
    <Text className="whitespace-nowrap overflow-hidden text-ellipsis">
      {children}
    </Text>
  </div>
);

export const TDImage: React.FC<
  React.PropsWithChildren<
    Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> & {
      src?: string;
      smHide?: boolean;
      light?: boolean;
      mr?: number | string;
      ml?: number | string;
    }
  >
> = ({ smHide, light, className, mr, ml, ...props }) => {
  const [colorMode] = useColorMode();
  const dark = colorMode === "dark";
  return (
    <Image
      className={`self-center mx-2 shrink-0 ${
        smHide ? "hidden sm:block" : "block"
      } ${dark || light ? "invert" : ""} ${className ?? ""}`}
      style={{
        marginRight:
          mr !== undefined
            ? typeof mr === "number"
              ? `${mr * 4}px`
              : mr
            : undefined,
        marginLeft:
          ml !== undefined
            ? typeof ml === "number"
              ? `${ml * 4}px`
              : ml
            : undefined,
      }}
      alt=""
      {...props}
    />
  );
};

export const TDIcon: React.FC<
  React.PropsWithChildren<
    React.HTMLAttributes<HTMLDivElement> & { smHide?: boolean }
  >
> = ({ smHide, children, className, ...props }) => (
  <div
    className={`mx-2 shrink-0 grow-0 ${
      smHide ? "hidden sm:block" : "block"
    } ${props.onClick ? "cursor-pointer" : ""} ${className ?? ""}`}
    {...props}
  >
    <Center>{children}</Center>
  </div>
);

export const OneRowTable: React.FC<
  React.PropsWithChildren<{ text?: string }>
> = ({ text, children }) => (
  <Table>
    <TR>
      <TD>{text ? text : children}</TD>
    </TR>
  </Table>
);
