import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

// Custom theme configuration
const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.50",
        color: "gray.900",
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      },
    },
  },
  fonts: {
    heading: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    body: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  colors: {
    brand: {
      50: "#e6f3ff",
      100: "#b3d9ff",
      200: "#80bfff",
      300: "#4da6ff",
      400: "#1a8cff",
      500: "#0066cc",
      600: "#004d99",
      700: "#003366",
      800: "#001a33",
      900: "#000d1a",
    },
    social: {
      facebook: "#1877f2",
      twitter: "#1da1f2",
      instagram: "#e4405f",
      linkedin: "#0077b5",
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "lg",
        fontWeight: "medium",
        _focus: {
          boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.6)",
        },
      },
      variants: {
        social: {
          bg: "white",
          border: "1px solid",
          borderColor: "gray.200",
          color: "gray.700",
          _hover: {
            bg: "gray.50",
            borderColor: "gray.300",
            transform: "translateY(-1px)",
            boxShadow: "md",
          },
          _active: {
            transform: "translateY(0)",
          },
          transition: "all 0.2s",
        },
        ghost: {
          _hover: {
            bg: "gray.100",
          },
        },
      },
      defaultProps: {
        colorScheme: "blue",
      },
    },
    Input: {
      baseStyle: {
        field: {
          borderRadius: "lg",
          _focus: {
            boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.6)",
          },
        },
      },
      variants: {
        social: {
          field: {
            bg: "gray.50",
            border: "none",
            _hover: {
              bg: "gray.100",
            },
            _focus: {
              bg: "white",
              border: "2px solid",
              borderColor: "blue.400",
            },
          },
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: "xl",
          boxShadow: "sm",
          border: "1px solid",
          borderColor: "gray.100",
          _hover: {
            boxShadow: "md",
            transform: "translateY(-1px)",
          },
          transition: "all 0.2s",
        },
      },
    },
    Avatar: {
      baseStyle: {
        container: {
          border: "2px solid",
          borderColor: "white",
          boxShadow: "sm",
        },
      },
    },
  },
  shadows: {
    outline: "0 0 0 3px rgba(66, 153, 225, 0.6)",
  },
});

const SocialThemeProvider = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export default SocialThemeProvider;
