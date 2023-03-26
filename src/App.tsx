import Calculator from "./components/Calculator/Calculator";
import "./global.scss";
import { useTheme } from "./shared/ThemeContext";

function App() {
  const { darkMode } = useTheme();

  return (
    <div className={darkMode ? "theme-dark" : "theme-light"}>
      <div className="main-wrapper">
        <div className="main-container ">
          <h1 className="brand-title">Calculator</h1>
          <h3 className="brand-desc">Front-end evaluation project</h3>
          <Calculator />
        </div>
      </div>
    </div>
  );
}

export default App;
