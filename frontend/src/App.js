import { ThemeProvider } from '@emotion/react';
import './App.css';
import { SideNavBar } from './components/assets/SideBar';

const darkTheme = createTheme({
  palette:{}
})

function App() {
  return (
    <ThemeProvider theme={darkTheme}>

      <SideNavBar />
    </ThemeProvider>
  );
}

export default App;
