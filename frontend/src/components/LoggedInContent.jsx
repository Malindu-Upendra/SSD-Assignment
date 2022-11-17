import Messages from "./Messages";
import UploadMessage from "./Upload";
import Welcome from "./Welcome";
import { Grid } from "@mui/material";
import { useKeycloak } from "@react-keycloak/web";
import { useEffect, useState } from "react";

function LoggedInContent() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [messages, setMessages] = useState([
    { description: "first message", type: "message" },
  ]);

  const { keycloak } = useKeycloak();

  useEffect(() => {
    setLoggedIn(keycloak.authenticated);
  }, [loggedIn, keycloak]);

  const sendMessages = (value) => {
    messages.push(value);
    console.log(messages);
  };

  return (
    <>
      {keycloak.authenticated && (
        <Grid sx={{ flexGrow: 1 }} container spacing={2}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={5}>
              <Grid key={1} item>
                <Messages
                  username={keycloak.idTokenParsed.preferred_username}
                  token={keycloak.token}
                  sx={{ width: "50%" }}
                />
              </Grid>
              <Grid key={0} item>
                <UploadMessage
                  onAdd={sendMessages}
                  name={keycloak.tokenParsed.name}
                  username={keycloak.idTokenParsed.preferred_username}
                  token={keycloak.token}
                  sx={{ width: "50%" }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
      {!keycloak.authenticated && <Welcome />}
    </>
  );
}

export default LoggedInContent;
