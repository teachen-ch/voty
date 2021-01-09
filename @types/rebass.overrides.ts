// See here
// https://github.com/rebassjs/rebass/issues/755#issuecomment-587250893

import { InterpolationWithTheme } from "@emotion/core";

declare module "rebass" {
  interface FlexProps {
    as?: React.ElementType;
    textAlign?: string | string[];
    className?: string;
    id?: string;
    fontWeight?: string;
    fontSize?: string | number | Array<string | number>;
    css?: InterpolationWithTheme<FlexProps>;
  }
  interface BoxProps {
    as?: React.ElementType;
    textAlign?: string | string[];
    className?: string;
    id?: string;
    fontWeight?: string;
    fontSize?: string | number | Array<string | number>;
    css?: InterpolationWithTheme<BoxProps>;
  }
  interface TextProps {
    as?: React.ElementType;
    css?: InterpolationWithTheme<TextProps>;
  }
  interface ImageProps {
    css?: InterpolationWithTheme<ImageProps>;
  }
  interface HeadingProps {
    css?: InterpolationWithTheme<HeadingProps>;
  }
  interface ButtonProps {
    as?: React.ElementType;
    textAlign?: string;
    css?: InterpolationWithTheme<ButtonProps>;
  }
  interface CardProps {
    as?: React.ElementType;
    className?: string;
    id?: string;
    css?: InterpolationWithTheme<CardProps>;
  }
}

declare module "react" {
  // TODO: not sure if I need to import T here
  // eslint-disable-next-line
  interface DOMAttributes<T> {
    css?: InterpolationWithTheme<any>;
  }
}

// TODO: Not sure how to fix this linting error
declare global {
  // eslint-disable-next-line
  namespace JSX {
    interface IntrinsicAttributes {
      css?: InterpolationWithTheme<any>;
    }
  }
}
