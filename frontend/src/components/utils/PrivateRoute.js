import { useKeycloak } from "@react-keycloak/web";

const PrivateRoute = ({ children }) => {
  const { keycloak } = useKeycloak();

  const isLoggedIn = keycloak.authenticated;

  let component = children;

  return isLoggedIn ? component : null;
};

export default PrivateRoute;

