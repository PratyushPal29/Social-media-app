import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Dropzone from "react-dropzone";
import { useTheme } from '@mui/material';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function SignUp() {

    const theme = useTheme(); // Correctly invoke the useTheme hook to get the theme object
    const { palette } = theme;
    const navigate = useNavigate()

    const [credentials, setCredentials] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        location: "",
        occupation: "",
        picturePath: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3002/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName: credentials.firstName,
                    lastName: credentials.lastName,
                    email: credentials.email,
                    password: credentials.password,
                    picturePath: credentials.picturePath,
                    friends: [],
                    location: credentials.location,
                    occupation: credentials.occupation
                }),
            });
            const json = await response.json();
            console.log(json);
            navigate("/home")
        } catch (error) {
            console.log(error)
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div class="mx-40 my-32 md:max-w-8xl">
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
                                <Box component="form" noValidate onSubmit={handleSubmit} >
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                autoComplete="given-name"
                                                name="firstName"
                                                required
                                                fullWidth
                                                id="firstName"
                                                label="First Name"
                                                onChange={onChange}
                                                autoFocus
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="lastName"
                                                label="Last Name"
                                                name="lastName"
                                                autoComplete="family-name"
                                                onChange={onChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="email"
                                                label="Email Address"
                                                type="email"
                                                name="email"
                                                autoComplete="email"
                                                onChange={onChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                name="password"
                                                label="Password"
                                                type="password"
                                                id="password"
                                                autoComplete="new-password"
                                                onChange={onChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Box
                                                gridColumn="span 4"
                                                border={`1px solid `}
                                                borderRadius="5px"
                                                p="1rem"
                                            >
                                                <Dropzone
                                                    acceptedFiles=".jpg,.jpeg,.png"
                                                    multiple={false}
                                                    name="picturePath"
                                                    type="file"
                                                    onChange={(e) => {
                                                        setCredentials({...credentials, [e.target.name
                                                        ]: e.target.files[0]})
                                                    }}
                                                >
                                                    {({ getRootProps, getInputProps }) => (
                                                        <Box
                                                            {...getRootProps()}
                                                            border={`2px dashed ${palette.primary.main}`}
                                                            p="1rem"
                                                            sx={{ "&:hover": { cursor: "pointer" } }}
                                                        >
                                                            <input {...getInputProps()} />
                                                            {/* {!values.picture ? (
                                                            <p>Add Picture Here</p>
                                                        ) : (
                                                            <>
                                                                <Typography>{values.picture.name}</Typography>
                                                                <EditOutlinedIcon />
                                                            </>
                                                        )} */}
                                                            <p>Add Picture Here</p>
                                                        </Box>
                                                    )}
                                                </Dropzone>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                name="location"
                                                label="Location"
                                                id="location"
                                                onChange={onChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                name="occupation"
                                                label="Occupation"
                                                id="occupation"
                                                onChange={onChange}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Sign Up
                                    </Button>
                                    <Grid container justifyContent="flex-end">
                                        <Grid item>
                                            <Link href="/" variant="body2">
                                                Already have an account? Log in
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