import Messages from "./Messages";
import UploadMessage from "./Upload";
import Welcome from "./Welcome";
import { Grid } from "@mui/material";
import { useKeycloak } from "@react-keycloak/web";
import { useEffect, useState } from "react";
import axios from 'axios';

function LoggedInContent() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [messages, setMessages] = useState([{ description:"first message" , type:"message"}]);

  const { keycloak } = useKeycloak();

  useEffect(() => {
    setLoggedIn(keycloak.authenticated);
    // axios.get("https://localhost:5000/").then(response => {
    //   console.log(response.data);
    // })
  }, [loggedIn, keycloak]);

  const sendMessages = (value) => {
    messages.push(value);
    console.log(messages);
  }

  return (
    <>
      {keycloak.authenticated && (
        <Grid sx={{ flexGrow: 1 }} container spacing={2}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={5}>
              <Grid key={1} item>
                <Messages values={messages} sx={{ width: "50%" }} />
              </Grid>
              <Grid key={0} item>
                <UploadMessage onAdd={sendMessages} sx={{ width: "50%" }} />
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
