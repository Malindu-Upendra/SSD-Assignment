import jwt_decode from "jwt-decode";
import { useKeycloak } from "@react-keycloak/web";
import { useEffect } from "react";

const RenderOnRole = ({ roles, children }) => {
  const { keycloak } = useKeycloak();
  let user = '';

  // useEffect(()=>{
  //   axios.post(
  //     'https://localhost:5000/createUser',user,
  //     {
  //       headers: {
  //         Authorization:keycloak.token,
  //       },
  //     }
  //   );
  // })
 
  if (keycloak.authenticated) {
    var decoded = jwt_decode(keycloak.token);
    user = decoded.roles[0]
  }

  return keycloak.authenticated && roles ===  user ? children : null;

};

export default RenderOnRole;
