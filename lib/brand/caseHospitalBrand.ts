export const caseHospitalBrand = {
  logoSource:
    "Faithful SVG recreation based on the FAQ cover and loyalty-card PDF references in the project root.",
  tokens: {
    brand: {
      primary: "#008060",
      primaryDeep: "#007858",
      accent: "#2AB460",
    },
    surface: {
      base: "#FAFAFC",
      muted: "#F0F0EC",
      elevated: "#FFFFFF",
    },
    border: {
      default: "#D8E4E4",
      strong: "#B4E4C6",
    },
    text: {
      primary: "#111111",
      secondary: "#6C6C6C",
      inverse: "#FFFFFF",
    },
    interactive: {
      primary: "#008060",
      primaryHover: "#007858",
      focus: "#2AB460",
    },
    state: {
      success: "#0F9D58",
      warning: "#C98A19",
      destructive: "#B42318",
    },
  },
} as const

export type CaseHospitalBrand = typeof caseHospitalBrand
