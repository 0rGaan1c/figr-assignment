import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Unauthenticated/Home";
import CreateAccount from "./pages/Unauthenticated/CreateAccount";

const UnauthenticatedApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createaccount" element={<CreateAccount />} />
      </Routes>
    </Router>
  );
};

export default UnauthenticatedApp;
