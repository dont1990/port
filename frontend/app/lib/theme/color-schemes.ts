export const colorSchemes = {
  blue: {
    name: "Ocean Blue",
    primary: "214 100% 50%", // Blue
    primaryForeground: "0 0% 100%",
    secondary: "214 32% 91%",
    accent: "214 32% 91%",
    muted: "214 32% 91%",
    gradient: "from-blue-500 to-cyan-500",
    description: "Cool and professional ocean vibes",
  },
  purple: {
    name: "Royal Purple",
    primary: "262 83% 58%", // Purple
    primaryForeground: "0 0% 100%",
    secondary: "262 32% 91%",
    accent: "262 32% 91%",
    muted: "262 32% 91%",
    gradient: "from-purple-500 to-pink-500",
    description: "Elegant and creative royal theme",
  },
  green: {
    name: "Forest Green",
    primary: "142 76% 36%", // Green
    primaryForeground: "0 0% 100%",
    secondary: "142 32% 91%",
    accent: "142 32% 91%",
    muted: "142 32% 91%",
    gradient: "from-green-500 to-emerald-500",
    description: "Natural and calming forest theme",
  },
  orange: {
    name: "Sunset Orange",
    primary: "25 95% 53%", // Orange
    primaryForeground: "0 0% 100%",
    secondary: "25 32% 91%",
    accent: "25 32% 91%",
    muted: "25 32% 91%",
    gradient: "from-orange-500 to-red-500",
    description: "Warm and energetic sunset vibes",
  },
  pink: {
    name: "Cherry Blossom",
    primary: "330 81% 60%", // Pink
    primaryForeground: "0 0% 100%",
    secondary: "330 32% 91%",
    accent: "330 32% 91%",
    muted: "330 32% 91%",
    gradient: "from-pink-500 to-rose-500",
    description: "Soft and romantic cherry theme",
  },
  teal: {
    name: "Tropical Teal",
    primary: "173 80% 40%", // Teal
    primaryForeground: "0 0% 100%",
    secondary: "173 32% 91%",
    accent: "173 32% 91%",
    muted: "173 32% 91%",
    gradient: "from-teal-500 to-cyan-500",
    description: "Fresh and modern tropical theme",
  },
  indigo: {
    name: "Midnight Indigo",
    primary: "239 84% 67%", // Indigo
    primaryForeground: "0 0% 100%",
    secondary: "239 32% 91%",
    accent: "239 32% 91%",
    muted: "239 32% 91%",
    gradient: "from-indigo-500 to-purple-500",
    description: "Deep and mysterious midnight theme",
  },
  amber: {
    name: "Golden Amber",
    primary: "45 93% 47%", // Amber
    primaryForeground: "0 0% 0%",
    secondary: "45 32% 91%",
    accent: "45 32% 91%",
    muted: "45 32% 91%",
    gradient: "from-amber-500 to-yellow-500",
    description: "Rich and luxurious golden theme",
  },
}

export type ColorScheme = keyof typeof colorSchemes
