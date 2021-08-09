// @ts-nocheck
// See here
// https://github.com/rebassjs/rebass/issues/755#issuecomment-587250893

import { InterpolationWithTheme } from "@emotion/core";
import {
  BoxProps as BoxP,
  ButtonProps as ButtonP,
  FlexProps as FlexP,
  LinkProps as LinkP,
  TextProps as TextP,
  CardProps as CardP,
  HeadingProps as HeadingP,
  ImageProps as ImageP,
} from "rebass";
import {
  // FormProps as FormP,
  InputProps as InputP,
  LabelProps as LabelP,
  TextareaProps as TextareaP,
} from "@rebass/forms";

declare module "rebass" {
  interface BoxProps extends BoxP {
    as?: React.ElementType;
    textAlign?: string | string[];
    className?: string;
    id?: string;
    fontWeight?: string;
    fontStyle?: string;
    fontSize?: string | number | Array<string | number>;
    lineHeight?: string | number | Array<string | number>;
    css?: InterpolationWithTheme<any>;
  }
  interface ButtonProps extends ButtonP {
    as?: React.ElementType;
    textAlign?: string;
    css?: InterpolationWithTheme<any>;
  }
  interface FlexProps extends FlexP {
    as?: React.ElementType;
    textAlign?: string | string[];
    className?: string;
    id?: string;
    fontWeight?: string;
    fontSize?: string | number | Array<string | number>;
    lineHeight?: string | number | Array<string | number>;
    css?: InterpolationWithTheme<any>;
  }
  interface CardProps extends CardP {
    as?: React.ElementType;
    className?: string;
    id?: string;
    fontWeight?: string;
    fontStyle?: string;
    fontSize?: string | number | Array<string | number>;
    css?: InterpolationWithTheme<any>;
  }
  interface LinkProps extends LinkP {
    fontWeight?: string;
    css?: InterpolationWithTheme<any>;
  }
  interface TextProps extends TextP {
    as?: React.ElementType;
    css?: InterpolationWithTheme<any>;
  }
  interface HeadingProps extends HeadingP {
    as?: React.ElementType;
    css?: InterpolationWithTheme<any>;
  }
  interface ImageProps extends ImageP {
    css?: InterpolationWithTheme<any>;
  }
}

/* Required only if @rebass/forms is used */
declare module "@rebass/forms" {
  /* interface FormProps extends FormP {
    css?: InterpolationWithTheme<any>;
  } */
  interface InputProps extends InputP {
    css?: InterpolationWithTheme<any>;
  }
  interface LabelProps extends LabelP {
    css?: InterpolationWithTheme<any>;
  }
  interface TextareaProps extends TextareaP {
    css?: InterpolationWithTheme<any>;
  }
}
