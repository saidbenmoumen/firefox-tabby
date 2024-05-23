import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { isValidElement, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { type VariantProps } from "tailwind-variants";
import { tvStyles } from "./Button.styles";
import { StyleKeys } from "./Button.types";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons/faCircleNotch";

interface ButtonProps
  extends Omit<React.ComponentPropsWithoutRef<"button">, "color">,
    VariantProps<typeof tvStyles> {
  loading?: boolean;
  loadingText?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  classNames?: Partial<Record<StyleKeys, string>>;
  styles?: Partial<Record<StyleKeys, React.CSSProperties>>;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      loading = false,
      loadingText,
      classNames,
      className,
      style,
      styles,
      disabled,
      variant,
      size = "sm",
      color,
      left,
      right,
      rounded,
      outlined,
      children,
      isIcon: _isIcon,
      justify,
      readonly,

      type = "button",
      ...props
    }: ButtonProps,
    forwardedRef
  ) => {
    const isIcon = useMemo(
      () =>
        _isIcon ||
        (isValidElement(children) &&
          children.type === FontAwesomeIcon &&
          !left &&
          !right),
      [_isIcon, children, left, right]
    );

    return (
      <button
        ref={forwardedRef}
        className={twMerge(
          tvStyles({
            variant,
            color,
            size,
            outlined,
            rounded,
            isIcon,
            justify,
            loading,
            disabled,
            readonly,
            class: "",
          }),
          className,
          classNames?.root
        )}
        style={{
          ...style,
          ...styles?.root,
        }}
        disabled={disabled}
        {...props}
      >
        {(!isIcon && loading) || left ? (
          <div
            className={twMerge(
              "flex items-center justify-start gap-2",
              classNames?.left
            )}
            style={styles?.left}
          >
            {!isIcon && loading ? (
              <FontAwesomeIcon
                icon={faCircleNotch}
                spin
                className={classNames?.loadingIcon}
                style={styles?.loadingIcon}
              />
            ) : (
              left
            )}
          </div>
        ) : null}
        <div className={twMerge(classNames?.content)} style={styles?.content}>
          {loading && loadingText ? (
            loadingText
          ) : loading && isIcon ? (
            <FontAwesomeIcon
              icon={faCircleNotch}
              spin
              className={classNames?.loadingIcon}
              style={styles?.loadingIcon}
            />
          ) : (
            children
          )}
        </div>
        {right && (
          <div
            className={twMerge(
              "flex items-center justify-end",
              classNames?.right
            )}
            style={styles?.right}
          >
            {right}
          </div>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
