export function getStylesCompoundVariants<
  T extends Record<string, Record<string, any>>,
>(
  styles: T
): {
  compoundVariants: CompoundStyle<T>[]
  variant: Record<keyof T, any>
  color: Record<keyof T[keyof T], any>
} {
  const compoundVariants: CompoundStyle<T>[] = (
    Object.keys(styles) as Array<keyof T>
  ).reduce((acc: CompoundStyle<T>[], variant: keyof T) => {
    const variantObject = styles[variant]
    const compoundStyles = (
      Object.keys(variantObject) as Array<keyof typeof variantObject>
    ).reduce((prev: CompoundStyle<T>[], color: keyof typeof variantObject) => {
      const className = variantObject[color]
      return [
        ...prev,
        {
          color,
          variant,
          class: className,
        } as CompoundStyle<T>,
      ]
    }, [])
    return [...acc, ...compoundStyles]
  }, [])

  const variant = (Object.keys(styles) as Array<keyof typeof styles>).reduce(
    (acc, variant) => ({
      ...acc,
      [variant]: '',
    }),
    {}
  ) as Record<keyof T, any>

  const color = Object.keys(styles[Object.keys(styles)[0]]).reduce(
    (acc, color) => ({
      ...acc,
      [color]: '',
    }),
    {}
  ) as Record<keyof T[keyof T], any>

  return {
    compoundVariants,
    variant,
    color,
  }
}

type CompoundStyle<T> = {
  variant: keyof T
  color: keyof T[keyof T]
  class: any
}
