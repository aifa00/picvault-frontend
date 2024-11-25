import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserProvider } from "./contexts/UserContext";
import { AlertProvider } from "./contexts/AlertContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <UserProvider>
    <AlertProvider>
      <App />
    </AlertProvider>
  </UserProvider>
);
