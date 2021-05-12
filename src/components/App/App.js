import { useEffect } from "react";
import { registerServiceWorker } from "../../utils/pwa";

// Components
import AppWrap from "./AppWrap";

// Styles, Fonts, Icons
import "../../styles/global.scss";
import "typeface-rubik";

function App() {
  useEffect(() => {
    registerServiceWorker();
  }, [])
  return (
    <AppWrap>
      <div className="App">
      </div>
    </AppWrap>
  );
}

export default App;
