import React, {useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate} from "react-router-dom"

const defaultTheme = createTheme();

export default function LogIn() {
    const [credentials,setCredentials] = useState({email: "", password: ""})
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3002/auth/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            });
            const json = await response.json();
            console.log(json);
            navigate("/home")
        } catch (error) {
            console.log(error)
        }
    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div class="mx-40 my-40 md:max-w-8xl">
            <div style={{ display: "flex" }}>
                <div>
                    <img class="h-48 w-full object-cover md:h-96 md:w-30" src="./logo/logo-no-background.png" alt="logo" />
                </div>
                <div className="ml-10">
                    <ThemeProvider theme={defaultTheme}>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <Box
                                sx={{
                                    marginTop: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        onChange={onChange}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        onChange={onChange}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox value="remember" color="primary" />}
                                        label="Remember me"
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2, borderRadius: "10px" }}
                                    >
                                        Log In
                                    </Button>
                                    <Grid container justifyContent={'flex-end'}>
                                        <Grid item>
                                            <Link href="/signup" variant="body2">
                                                {"Don't have an account? Sign Up"}
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Container>
                    </ThemeProvider>
                </div>
            </div>
        </div>

    );
}