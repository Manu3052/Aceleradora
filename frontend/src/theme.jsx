import { createTheme } from "@mui/material";
import { blue, deepOrange, green, grey, purple } from '@mui/material/colors'

const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: grey[900]
      },
      charts: {
        titleColor: "#F5F5F5",
        purple: {
          main: purple[300]
        },
        deepOrange: {
          main: deepOrange[300]
        },
        blue: {
          main: blue[300]
        },
        green: {
          main: green["A400"]
        }
      },
      background: {
        default: "#2b2b35"
      }
    },
    typography: {
        allVariants: {
          fontFamily: "Lato"
      }
    }
});

export default theme;
