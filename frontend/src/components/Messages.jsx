import { Component } from "react";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import RenderOnRole from "./utils/RenderOnRole";
import axios from "axios";
import CryptoJS from "crypto-js";

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] , buttonClicked : false};
  }

  componentDidMount = () => {
    //this.setState({ messages[0].user = this.state.Keycloak.tokenParsed.name})
    axios.get(`https://localhost:5000/retrieveMessages/${ this.props.username}`,{headers:{Authorization:this.props.token,}}).then(response => {
      console.log(response.data.data)
      this.setState({messages : response.data.data})
    })
  };

  updateData = () => {
    axios.get(`https://localhost:5000/retrieveMessages/${ this.props.username}`,{headers:{Authorization:this.props.token,}}).then(response => {
      console.log(response.data.data)
      this.setState({messages : response.data.data})
    })
  }

  handleButtonClick = () => {
    this.setState(prevState => ({
      buttonClicked: !prevState.buttonClicked
    }))
  }

  returnDecryptedValue = (value) => {
    var bytes = CryptoJS.AES.decrypt(value, "secret key 123");
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)).toString();
    console.log(decryptedData)
    return decryptedData
  }

  render() {
    return (
      <div>
        <div
          style={{ fontSize: "25px", fontWeight: "bold", marginTop: "2.8%" }}
        >
          <Divider textAlign="left" style={{ marginTop: "2%" }}>
            Retreive Data{" "}
            <Button
              variant="contained"
              startIcon={<DeleteIcon />}
              style={{
                background: "green",
              }}
              onClick={this.updateData}
            >
              Fetch
            </Button>
          </Divider>
        </div>

        <div style={{ marginTop: "6%", marginBottom: "5%" }}>
          {this.state.messages.map((message, index) => (
            <Card
              key={index}
              sx={{ maxWidth: 945 }}
              elevation={3}
              style={{ marginBottom: "20px", width: "600px" }}
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {message.type}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {this.state.buttonClicked ? this.returnDecryptedValue(message.description) : message.description }
                </Typography>
              </CardContent>
              <CardActions>
                <RenderOnRole roles={"manager"}>
                  <Button
                    variant="contained"
                    onClick={this.handleButtonClick}
                    style={{
                      background: "red",
                      marginLeft: "45%",
                      marginBottom: "2%",
                    }}
                  >
                    {this.state.buttonClicked  ? "Encrypt" : "Decrypt"}
                  </Button>
                </RenderOnRole>
              </CardActions>
            </Card>
          ))}
        </div>
      </div>
    );
  }
}

export default Messages;
