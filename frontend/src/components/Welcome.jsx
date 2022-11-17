import { Component } from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

class Welcome extends Component{
    render() {
        return(
            <div>
                <div style={{marginTop: "10%", marginLeft:"40%"}}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            '& > :not(style)': {
                                m: 1,
                                width: 258,
                                height: 100,
                            },
                        }}
                    >
                        <Paper elevation={3}> <h2 style={{ padding:"4%"}}> Please Login ..!</h2></Paper>
                       
                    </Box>
                </div>

            </div>
        )
    }
}

export default Welcome;