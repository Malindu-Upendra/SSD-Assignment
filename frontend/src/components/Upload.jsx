import React,{ Component } from "react";
import Box from "@mui/material/Box";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import Divider from "@mui/material/Divider";
import RenderOnRole from "./utils/RenderOnRole";
import CryptoJS from "crypto-js";

class UploadMessage extends Component {
  constructor(props) {
    super(props);
    this.state = { description: "", type: "" };
    this.fileInput = React.createRef()
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, type: "message" });
  };

  onSubmit = (event) => {
    event.preventDefault();
    // const data = {
    //   description: this.state.description,
    //   type: this.state.type,
    // };

    //Encrtypt
    const ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify(this.state.description),
      "secret key 123"
    ).toString();

    console.log("encrypted Data")
    console.log(ciphertext);

    
    // Decrypt
    var bytes = CryptoJS.AES.decrypt(ciphertext, "secret key 123");
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    console.log("decypted Data")
    console.log(decryptedData);
    // this.props.onAdd(data);

    // const date = {

    // }
    
  };

  handleFile = () => {
      this.setState({description:this.fileInput.current.files[0].name})
  }

  render() {
    return (
      <div>
        <div style={{ fontSize: "25px", fontWeight: "bold", marginTop: "2%" }}>
          <Divider textAlign="left" style={{ marginTop: "2.8%" }}>
            Send Data
          </Divider>
        </div>
        <div style={{ marginTop: "6%" }}>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { width: 600, height: 250, maxWidth: "100%" },
            }}
            noValidate
            autoComplete="off"
          >
            <Paper elevation={3}>
              <div>
                <FormControl style={{ marginTop: "10%", width: "70%" }}>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Description
                  </InputLabel>
                  <OutlinedInput
                    // id="outlined-adornment-amount"
                    // value={values.amount}
                    name="description"
                    value={this.state.description}
                    onChange={this.handleChange}
                    label="Description"
                  />
                </FormControl>
                <Stack
                  direction="row"
                  spacing={2}
                  style={{ marginTop: "10%", marginLeft: "31%" }}
                >
                  <RenderOnRole roles={"manager"}>
                    <Button
                      variant="contained"
                      component="label"
                      endIcon={<CloudUploadIcon />}
                    >
                      Upload
                      <input hidden accept="image/*" ref={this.fileInput} onChange={this.handleFile} multiple type="file" />
                    </Button>
                  </RenderOnRole>
                  <Button
                    variant="contained"
                    onClick={this.onSubmit}
                    endIcon={<SendIcon />}
                  >
                    Send
                  </Button>
                </Stack>
              </div>
            </Paper>
          </Box>
        </div>
      </div>
    );
  }
}

export default UploadMessage;
