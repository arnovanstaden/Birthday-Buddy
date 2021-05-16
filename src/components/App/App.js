import { useEffect } from "react";
import { registerServiceWorker, requestNotificationPermission } from "../../utils/pwa";

// Components
import AppWrap from "./AppWrap";

// Styles, Fonts, Icons
import "../../styles/global.scss";
import "../../assets/icons/style.css";
import "typeface-rubik";

function App() {
  useEffect(() => {
    registerServiceWorker();
    requestNotificationPermission();
  }, [])
  return (
    <AppWrap>
      <div className="App">
      </div>
    </AppWrap>
  );
}

export default App;
