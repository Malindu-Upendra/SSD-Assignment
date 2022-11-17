import jwt_decode from "jwt-decode";
import { useKeycloak } from "@react-keycloak/web";

const RenderOnRole = ({ roles, children }) => {
  const { keycloak } = useKeycloak();
  let user = '';
 
  if (keycloak.authenticated) {
    var decoded = jwt_decode(keycloak.token);
    user = decoded.roles[0]
  }

  return keycloak.authenticated && roles ===  user ? children : null;

};

export default RenderOnRole;
