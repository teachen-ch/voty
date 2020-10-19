// See here
// https://github.com/rebassjs/rebass/issues/755#issuecomment-587250893

import { InterpolationWithTheme } from "@emotion/core";

declare module "rebass" {
  interface FlexProps {
    as?: React.ElementType;
    textAlign?: string;
    css?: InterpolationWithTheme<any>;
  }
  interface BoxProps {
    as?: React.ElementType;
    textAlign?: string;
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
