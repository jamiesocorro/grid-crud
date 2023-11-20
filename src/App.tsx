import React, { useMemo } from "react";
import "./App.css";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { green, purple } from "@mui/material/colors";
import { UserGrid } from "./components/UserGrid/UserGrid";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "dark",
          primary: purple,
          secondary: green,
        },
      }),
    [prefersDarkMode]
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserGrid></UserGrid>
    </ThemeProvider>
  );
}

export default App;
