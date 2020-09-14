// See here
// https://github.com/rebassjs/rebass/issues/755#issuecomment-587250893

import { InterpolationWithTheme } from "@emotion/core";

declare module "rebass" {
  interface FlexProps {
    as?: React.ElementType;
    css?: InterpolationWithTheme<any>;
  }
  interface BoxProps {
    as?: React.ElementType;
    css?: InterpolationWithTheme<any>;
  }
  interface TextProps {
    as?: React.ElementType;
    css?: InterpolationWithTheme<any>;
  }
  interface ButtonProps {
    as?: React.ElementType;
    css?: InterpolationWithTheme<any>;
  }
  interface CardProps {
    as?: React.ElementType;
    css?: InterpolationWithTheme<any>;
  }
}

declare module "react" {
  interface DOMAttributes<T> {
    css?: InterpolationWithTheme<any>;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      css?: InterpolationWithTheme<any>;
    }
  }
}
