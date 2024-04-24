import AuthenticatedApp from "./Authenticated";
import UnauthenticatedApp from "./Unauthenticated";

function App() {
  const user = true;
  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

export default App;
