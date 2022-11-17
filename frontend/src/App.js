import "./App.css";
import Header from "./components/Header";
import keycloak from "./keycloak";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import LoggedInContent from "./components/LoggedInContent";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <ReactKeycloakProvider authClient={keycloak}>
      <div className="App">
        <Header />
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<LoggedInContent />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ReactKeycloakProvider>
  );
}

export default App;
