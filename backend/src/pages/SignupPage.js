import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Header from "../component/Header";
import axios from "axios";
import {useDispatch} from "react-redux";
import {login} from "../reducer/userReducer";
import {useNavigate} from "react-router-dom";
import {Modal} from "@mui/joy";
import {apiPrefix, ModalStyle} from "../constants";

const defaultTheme = createTheme();

export default function SignUp() {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [isErrorModalOpen, setIsErrorModalOpen] = React.useState(false);
    const [errMessage, setErrMessage] = React.useState("");


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        axios.post(apiPrefix + 'user/signup', {
            username: data.get('username'),
            password: data.get('password'),
            displayName: data.get('displayName'),
        })
            .then(response => {
                dispatch(login(data.get('username')))
                navigate("/")
            })
            .catch(error => {
                setIsErrorModalOpen(true);
                setErrMessage(error.response.data)
            });
    };
    const handleErrorModalClose = () => {
        setIsErrorModalOpen(false)
    };


    return (
        <div>
            <div>
                <Modal
                    open={isErrorModalOpen}
                    onClose={handleErrorModalClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={ModalStyle}>
                        <div style={{textAlign: "center"}}>
                            <Typography id="modal-modal-description" sx={{mt: 2}}>
                                {errMessage}
                            </Typography>
                        </div>
                        <div style={{textAlign: "center", marginTop: "5px"}}><Button
                            onClick={handleErrorModalClose}> close</Button></div>
                    </Box>
                </Modal>
            </div>
            <Header/>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign Up
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="displayName"
                                label="displayName"
                                id="displayName"
                                autoComplete="displayName"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="password"
                                type="password"
                                id="password"
                                autoComplete="password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Sign Up
                            </Button>
                            <Grid container>
                                <Link href="/signin" variant="body2">
                                    {"Already have an account? Sign in"}
                                </Link>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    );
}