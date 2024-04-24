import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Authenticated/Home";
import Project from "./pages/Authenticated/Project";

const AuthenticatedApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<Project />} />
      </Routes>
    </Router>
  );
};

export default AuthenticatedApp;
