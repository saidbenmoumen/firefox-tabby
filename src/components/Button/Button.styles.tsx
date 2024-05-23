import { getStylesCompoundVariants } from "../../utils/getStylesCompoundVariants";
import { tv } from "tailwind-variants";
import { variants } from "./Button.variants";

const { compoundVariants, variant, color } =
  getStylesCompoundVariants(variants);

export const tvStyles = tv({
  base: ["flex items-center outline-none"],
  compoundVariants,
  variants: {
    variant,
    color,
    size: {
      xl: "min-h-[60px] min-w-[60px] gap-[8px] px-[24px] py-[8px] text-[20px]", // 60
      lg: "min-h-[50px] min-w-[50px] gap-[8px] px-[20px] py-[7px] text-[18px]", // 50
      md: "min-h-[42px] min-w-[42px] gap-[8px] px-[16px] py-[6px] text-[16px]", // 42
      sm: "min-h-[36px] min-w-[36px] gap-[8px] px-[12px] py-[6px] text-[14px]", // 36
      xs: "min-h-[30px] min-w-[30px] gap-[8px] px-[8px] py-[5px] text-[12px]", // 30
      '2xs': "min-h-[24px] min-w-[24px] gap-[8px] px-[8px] py-[4px] text-[10px]", // 24
    },
    justify: {
      between: "justify-between",
      center: "justify-center",
      around: "justify-around",
      start: "justify-start",
      end: "justify-end",
    },
    isIcon: {
      true: "aspect-square gap-0 px-0",
    },
    disabled: {
      true: "disabled:border-gray-400/10 disabled:bg-gray-400/10 disabled:text-gray-400/30",
    },
    readonly: {
      true: "pointer-events-none",
    },
    outlined: {
      solid: "border !border-opacity-100",
      light: "border border-opacity-20",
      none: "",
    },
    rounded: {
      true: "rounded-full",
      false: "rounded",
    },
    loading: {
      true: "pointer-events-none",
    },
  },
  defaultVariants: {
    color: "primary",
    variant: "subtle",
    size: "sm",
    justify: "center",
    outlined: "light",
  },
});
