import { useCookies } from "react-cookie";
import AuthenticatedApp from "./Authenticated";
import UnauthenticatedApp from "./Unauthenticated";

function App() {
  const [cookies] = useCookies(["authToken"]);
  return cookies.authToken ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

export default App;
