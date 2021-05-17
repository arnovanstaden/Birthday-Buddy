import { useEffect } from "react";
import { registerServiceWorker, requestNotificationPermission } from "../../utils/pwa";
import { initializeNotifications } from "../../utils/notifications";

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
    initializeNotifications()
  }, [])
  return (
    <AppWrap>
      <div className="App">
      </div>
    </AppWrap>
  );
}

export default App;
