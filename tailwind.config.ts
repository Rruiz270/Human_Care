import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Warm Earth Tones
        copper: {
          DEFAULT: "#C4956A",
          light: "#D4AD85",
          dark: "#A67B52",
          glow: "rgba(196,149,106,0.25)",
        },
        sage: {
          DEFAULT: "#8B9E7C",
          light: "#A3B596",
          dark: "#6E8160",
        },
        cream: {
          DEFAULT: "#F5F0E8",
          light: "#FAF8F4",
          dark: "#E8E0D4",
        },
        // Tech Accents
        glow: {
          green: "#A4DF00",
          blue: "#6CCFF6",
          amber: "#F0A830",
        },
        // RPG Colors
        rpg: {
          health: "#EF4444",
          "health-full": "#22C55E",
          energy: "#F59E0B",
          "energy-full": "#22C55E",
          xp: "#6CCFF6",
        },
        // Glass
        glass: {
          bg: "rgba(245,240,232,0.65)",
          border: "rgba(196,149,106,0.25)",
        },
        // Base
        dark: "#1A1A2E",
        "dark-soft": "#2D2D44",
      },
      fontFamily: {
        "space-grotesk": ["SpaceGrotesk_700Bold"],
        "space-grotesk-medium": ["SpaceGrotesk_500Medium"],
        inter: ["Inter_400Regular"],
        "inter-medium": ["Inter_500Medium"],
        "inter-semibold": ["Inter_600SemiBold"],
        "inter-bold": ["Inter_700Bold"],
        "space-mono": ["SpaceMono_400Regular"],
        "space-mono-bold": ["SpaceMono_700Bold"],
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
      },
    },
  },
  plugins: [],
};

export default config;
