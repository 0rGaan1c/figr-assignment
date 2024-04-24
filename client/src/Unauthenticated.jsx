import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateAccount from "./pages/Unauthenticated/CreateAccount";

const UnauthenticatedApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateAccount />} />
      </Routes>
    </Router>
  );
};

export default UnauthenticatedApp;
