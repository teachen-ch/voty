declare module "@rebass/forms" {
  import * as React from "react";
  import { BoxKnownProps } from "rebass";
  import * as StyledComponents from "styled-components";

  interface BoxKnownProps
    extends Rebass.BaseProps,
      StyledSystem.SpaceProps,
      StyledSystem.LayoutProps,
      StyledSystem.FontSizeProps,
      StyledSystem.FontWeightProps,
      StyledSystem.ColorProps,
      StyledSystem.FlexProps,
      StyledSystem.OrderProps,
      StyledSystem.AlignSelfProps,
      Rebass.SxProps {
    variant?: StyledSystem.ResponsiveValue<string> | undefined;
    tx?: string | undefined;
  }

  interface LabelKnownProps
    extends BoxKnownProps,
      StyledSystem.FlexWrapProps,
      StyledSystem.FlexDirectionProps,
      StyledSystem.AlignItemsProps,
      StyledSystem.JustifyContentProps {}

  export interface LabelProps
    extends LabelKnownProps,
      Omit<
        React.LabelHTMLAttributes<HTMLLabelElement>,
        keyof LabelKnownProps
      > {}

  export const Label: React.ComponentType<LabelProps>;

  export interface InputProps
    extends BoxKnownProps,
      Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof BoxKnownProps> {}

  export const Input: React.ComponentType<InputProps>;

  export interface SelectProps
    extends BoxKnownProps,
      Omit<
        React.SelectHTMLAttributes<HTMLSelectElement>,
        keyof BoxKnownProps
      > {}

  export const Select: React.ComponentType<SelectProps>;

  export interface TextareaProps
    extends BoxKnownProps,
      Omit<
        React.TextareaHTMLAttributes<HTMLTextAreaElement>,
        keyof BoxKnownProps
      > {}

  export const Textarea: React.ComponentType<TextareaProps>;

  export interface RadioProps
    extends BoxKnownProps,
      Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof BoxKnownProps> {}

  export const Radio: React.ComponentType<RadioProps>;

  export interface SliderProps
    extends BoxKnownProps,
      Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof BoxKnownProps> {}

  export const Slider: React.ComponentType<SliderProps>;

  export interface CheckboxProps
    extends BoxKnownProps,
      Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof BoxKnownProps> {}

  export const Checkbox: React.ComponentType<CheckboxProps>;

  export interface SwitchProps
    extends BoxKnownProps,
      Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BoxKnownProps> {
    checked?: boolean | undefined;
  }

  export const Switch: React.ComponentType<SwitchProps>;

  // The following overrides are concering this issue:
  // https://github.com/rebassjs/rebass/issues/755#issuecomment-587250893

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
