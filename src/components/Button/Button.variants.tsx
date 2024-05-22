export const variants = {
  solid: {
    primary:
      "bg-primary-900 border-primary-900 active:bg-primary-950 active:border-primary-950 text-white",
    gray: "bg-primary-500 border-primary-500 active:bg-primary-600 active:border-primary-600 text-white",
    white:
      "bg-white border-white active:bg-primary-100 active:border-primary-100 text-primary-900",
    green:
      "bg-emerald-500 border-emerald-500 active:bg-emerald-600 active:border-emerald-600 text-white",
    red: "bg-red-500 border-red-500 active:bg-red-600 active:border-red-600 text-white",
  },
  light: {
    primary:
      "bg-primary-500/10 hover:bg-primary-500/15 active:bg-primary-500/20 border-primary-800 text-primary-900",
    gray: "bg-primary-500/10 hover:bg-primary-500/15 active:bg-primary-500/20 border-primary-500 text-primary-500",
    white:
      "bg-white/10 hover:bg-white-500/15 active:bg-white/20 border-white text-white",
    green:
      "bg-emerald-500/10 hover:bg-emerald-500/15 active:bg-emerald-500/20 border-emerald-500 text-emerald-500",
    red: "bg-red-500/10 hover:bg-red-500/15 active:bg-red-500/20 border-red-500 text-red-500",
  },
  subtle: {
    primary:
      "bg-transparent hover:bg-primary-500/5 active:bg-primary-500/10 border-primary-400 text-primary-200 shadow-primary-900/10",
    gray: "bg-transparent hover:bg-primary-500/5 active:bg-primary-500/10 border-primary-400 text-primary-500",
    white:
      "bg-transparent hover:bg-white/5 active:bg-white/10 border-white text-white",
    green:
      "bg-transparent hover:bg-emerald-500/5 active:bg-emerald-500/10 border-emerald-500 text-emerald-500",
    red: "bg-transparent hover:bg-red-500/5 active:bg-red-500/10 border-red-500 text-red-500",
  },
} as const;
