import React, { useState } from 'react';
import { Button, Container, CssBaseline, Link, TextField, Typography, Alert } from "@mui/material";
import { Formik } from "formik";
import * as Yup from 'yup';
import { useStyles } from "../../Styles/styles";
import axios from '../../axios';

const Login = (props) => {
    const styles = useStyles();
    
    const [errorMessage, setErrorMessage] = useState("");

    const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/

    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid Email')
            .required('Required'),
        password: Yup.string()
            .required('Please enter your Password')
            .matches(
                passwordRegEx,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            )
    });

    const serverLogin = (values, history) => {
        axios.post('/login', values)
            .then(res => {
                console.log(res.data);
                history.push("/home");
            }).catch(err => {
                console.log(err.response.data);
                setErrorMessage(err.response.data.message);
            });
    }
    
    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            validationSchema={LoginSchema}
            onSubmit={(values) => {
                serverLogin(values, props.history);
            }}>
                {(formik) => {
                    return (
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <div className={styles.paper}>
                                <Typography component="h1" variant="h5" className="text">
                                    Sign In
                                </Typography>
                                <form className={styles.form} onSubmit={formik.handleSubmit}>
                                    <TextField
                                        name="email"
                                        label="Email Address"
                                        id="email"
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        autoComplete="email"
                                        autoFocus
                                        onChange={formik.handleChange}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                    />
                                    <TextField
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        autoComplete="current-password"
                                        onChange={formik.handleChange}
                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                        helperText={formik.touched.password && formik.errors.password}
                                    />
                                    <div className={styles.submit}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            classes={styles.submit}>
                                        Sign In
                                        </Button>
                                    </div>
                                    <div className={styles.link}>
                                        <Link href="/signup" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </div>
                                    { errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null }
                                </form>
                            </div>
                        </Container>
                    );
                }}
            
        </Formik>
        
    )
}

export default Login;