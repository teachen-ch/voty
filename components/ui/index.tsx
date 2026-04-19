/* eslint-disable react/display-name */
import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "util/cn";

// ─── Polymorphic base ────────────────────────────────────────────────────────

type AsProp<C extends React.ElementType> = { as?: C };
type PolymorphicProps<
  C extends React.ElementType,
  ExtraProps = object
> = ExtraProps &
  AsProp<C> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof (ExtraProps & AsProp<C>)> & {
    className?: string;
    children?: React.ReactNode;
  };

// ─── Box ─────────────────────────────────────────────────────────────────────

export type BoxProps<C extends React.ElementType = "div"> = PolymorphicProps<C>;

export const Box = React.forwardRef<
  HTMLElement,
  PolymorphicProps<React.ElementType>
>(({ as: Tag = "div", className, children, ...props }, ref) => (
  <Tag ref={ref} className={cn(className)} {...props}>
    {children}
  </Tag>
)) as <C extends React.ElementType = "div">(
  props: PolymorphicProps<C> & { ref?: React.Ref<HTMLElement> }
) => React.ReactElement | null;
(Box as React.FC).displayName = "Box";

// ─── Flex ─────────────────────────────────────────────────────────────────────

export type FlexProps<
  C extends React.ElementType = "div"
> = PolymorphicProps<C>;

export const Flex = React.forwardRef<
  HTMLElement,
  PolymorphicProps<React.ElementType>
>(({ as: Tag = "div", className, children, ...props }, ref) => (
  <Tag ref={ref} className={cn("flex", className)} {...props}>
    {children}
  </Tag>
)) as <C extends React.ElementType = "div">(
  props: PolymorphicProps<C> & { ref?: React.Ref<HTMLElement> }
) => React.ReactElement | null;
(Flex as React.FC).displayName = "Flex";

// ─── Text ─────────────────────────────────────────────────────────────────────

const textVariants = cva("", {
  variants: {
    variant: {
      fielderror:
        "text-sm font-semibold text-white bg-gray-600 mt-[-8px] px-3 py-1",
      semi: "font-semibold",
      bold: "font-semibold",
      caps: "uppercase tracking-widest",
      inline: "inline-block",
      link:
        "inline-block text-inherit no-underline cursor-pointer hover:underline",
      panelheading:
        "font-semibold text-blue2 mt-8 pb-1 mb-2 border-b-2 border-blue2",
    },
  },
});

type TextVariants = VariantProps<typeof textVariants>;

export type TextProps<C extends React.ElementType = "div"> = PolymorphicProps<
  C,
  TextVariants
>;

export const Text = React.forwardRef<
  HTMLElement,
  PolymorphicProps<React.ElementType, TextVariants>
>(({ as: Tag = "div", variant, className, children, ...props }, ref) => (
  <Tag
    ref={ref}
    className={cn(textVariants({ variant }), className)}
    {...props}
  >
    {children}
  </Tag>
)) as <C extends React.ElementType = "div">(
  props: TextProps<C> & { ref?: React.Ref<HTMLElement> }
) => React.ReactElement | null;
(Text as React.FC).displayName = "Text";

// ─── Heading ──────────────────────────────────────────────────────────────────

const headingVariants = cva("font-heading leading-heading", {
  variants: {
    variant: {
      default: "font-semibold mt-8 mb-[0.5em]",
      panelheading:
        "font-semibold text-blue2 mt-8 pb-1 mb-2 border-b-2 border-blue2",
    },
  },
  defaultVariants: { variant: "default" },
});

type HeadingVariants = VariantProps<typeof headingVariants>;

export type HeadingProps<C extends React.ElementType = "h2"> = PolymorphicProps<
  C,
  HeadingVariants
>;

export const Heading = React.forwardRef<
  HTMLElement,
  PolymorphicProps<React.ElementType, HeadingVariants>
>(({ as: Tag = "h2", variant, className, children, ...props }, ref) => (
  <Tag
    ref={ref}
    className={cn(headingVariants({ variant }), className)}
    {...props}
  >
    {children}
  </Tag>
)) as <C extends React.ElementType = "h2">(
  props: HeadingProps<C> & { ref?: React.Ref<HTMLElement> }
) => React.ReactElement | null;
(Heading as React.FC).displayName = "Heading";

// ─── Button ───────────────────────────────────────────────────────────────────

const buttonVariants = cva(
  "inline-flex items-center justify-center cursor-pointer font-semibold rounded-card min-h-[40px] leading-none font-body text-base disabled:cursor-default disabled:bg-white disabled:text-gray-400",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white px-4",
        secondary: "bg-darkgray text-white px-4",
        text:
          "bg-transparent text-inherit underline border-0 p-0 m-0 font-normal min-h-0 rounded-none w-full sm:w-auto text-left",
        muted: "bg-white text-gray-600 rounded-none font-semibold px-4",
      },
    },
    defaultVariants: { variant: "primary" },
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    >
      {children}
    </button>
  )
);
Button.displayName = "Button";

// ─── Card ─────────────────────────────────────────────────────────────────────

export type CardProps = PolymorphicProps<"div">;

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ as: Tag = "div", className, children, ...props }, ref) => (
    <Tag
      ref={ref}
      className={cn("p-4 my-4 bg-white text-black shadow-card", className)}
      {...props}
    >
      {children}
    </Tag>
  )
);
Card.displayName = "Card";

// ─── Link ─────────────────────────────────────────────────────────────────────

export type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href?: string;
};

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, children, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(
        "text-inherit no-underline cursor-pointer hover:underline",
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
);
Link.displayName = "Link";

// ─── Grid ─────────────────────────────────────────────────────────────────────

export type GridProps = React.HTMLAttributes<HTMLDivElement> & {
  columns?: number | string;
  gap?: number | string;
};

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ columns, gap = 2, className, style, children, ...props }, ref) => {
    const gridStyle: React.CSSProperties = {
      display: "grid",
      gap: typeof gap === "number" ? `${gap * 4}px` : gap,
      ...(columns
        ? {
            gridTemplateColumns:
              typeof columns === "number" ? `repeat(${columns}, 1fr)` : columns,
          }
        : {}),
      ...style,
    };
    return (
      <div ref={ref} className={cn(className)} style={gridStyle} {...props}>
        {children}
      </div>
    );
  }
);
Grid.displayName = "Grid";

// ─── Spinner ──────────────────────────────────────────────────────────────────

export type SpinnerProps = {
  size?: number;
  color?: string;
  className?: string;
};

export const Spinner: React.FC<SpinnerProps> = ({
  size = 20,
  color = "currentColor",
  className,
}) => (
  <svg
    className={cn("animate-spin", className)}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2.5}
    strokeLinecap="round"
  >
    <path d="M12 2a10 10 0 0 1 10 10" />
  </svg>
);

// ─── Image (rebass compat shim — prefer next/image directly) ──────────────────

type StaticImgData = { src: string; width?: number; height?: number };
export type ImageProps = Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  "src"
> & {
  src?: string | StaticImgData;
};

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, alt = "", src, width, height, ...props }, ref) => {
    const isStatic = typeof src === "object" && src !== null;
    const resolvedSrc = isStatic
      ? (src as StaticImgData).src
      : (src as string | undefined);
    const resolvedWidth =
      width ?? (isStatic ? (src as StaticImgData).width : undefined);
    const resolvedHeight =
      height ?? (isStatic ? (src as StaticImgData).height : undefined);
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        ref={ref}
        className={cn("max-w-full", className)}
        alt={alt}
        src={resolvedSrc}
        width={resolvedWidth}
        height={resolvedHeight}
        {...props}
      />
    );
  }
);
Image.displayName = "Image";

// ─── useColorMode — localStorage-backed stub replacing theme-ui ───────────────

export function useColorMode(): [string, (mode: string) => void] {
  const [mode, setModeState] = React.useState("light");

  React.useEffect(() => {
    const stored = localStorage.getItem("darkmode");
    if (stored === "true") setModeState("dark");
  }, []);

  const setMode = React.useCallback((next: string) => {
    setModeState(next);
    localStorage.setItem("darkmode", next === "dark" ? "true" : "false");
  }, []);

  return [mode, setMode];
}

// ─── Label ────────────────────────────────────────────────────────────────────

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, ...props }, ref) => (
    <label
      ref={ref}
      className={cn("text-left text-base sm:text-lg", className)}
      {...props}
    >
      {children}
    </label>
  )
);
Label.displayName = "Label";

// ─── Input ────────────────────────────────────────────────────────────────────

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "block w-full font-body text-gray-600 bg-white border-none outline-none rounded-card px-3 h-10 text-lg placeholder:text-[#ccc] focus:outline-none",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

// ─── Textarea ─────────────────────────────────────────────────────────────────

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "w-full bg-white text-gray-600 border-none outline-none text-lg px-3 mb-3 placeholder:text-[#ccc] focus:outline-none",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

// ─── Select ───────────────────────────────────────────────────────────────────

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "appearance-none w-full font-body text-gray-600 bg-white border-none h-10 rounded-card px-3 text-base focus:outline-none",
        className
      )}
      style={{
        background: "url('/images/icon_dropdown.svg') 98% / 3% no-repeat #fff",
      }}
      {...props}
    >
      {children}
    </select>
  )
);
Select.displayName = "Select";

// ─── Checkbox ─────────────────────────────────────────────────────────────────

export type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      type="checkbox"
      className={cn("cursor-pointer", className)}
      {...props}
    />
  )
);
Checkbox.displayName = "Checkbox";

// ─── Radio ────────────────────────────────────────────────────────────────────

export type RadioProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      type="radio"
      className={cn(
        "appearance-none cursor-pointer align-middle relative w-5 h-5 border-2 border-current rounded-full",
        "checked:before:content-[''] checked:before:absolute checked:before:inset-0.5 checked:before:rounded-full checked:before:bg-current",
        className
      )}
      {...props}
    />
  )
);
Radio.displayName = "Radio";
