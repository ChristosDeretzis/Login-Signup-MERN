import React, { useState } from 'react';
import { Button, Container, CssBaseline, Grid, Link, TextField, Typography, Alert } from "@mui/material";
import { Formik } from "formik";
import * as Yup from 'yup';
import { useStyles } from "../../Styles/styles";
import axios from '../../axios';  



const SignUp = (props) => {
    const styles = useStyles();

    const [errorMessage, setErrorMessage] = useState("");

    const INITIAL_VALUES = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repeatPassword: '',
    }
    
    const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    
    const SignUpSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('Please Enter the First Name')
            .min(2, 'First Name too short')
            .max(40, 'First Name too long'),
        lastName: Yup.string()
            .required('Please Enter the Last Name')
            .min(2, 'Last Name too short')
            .max(40, 'Last Name too long'),
        email: Yup.string()
            .email('Invalid Email')
            .required('Please enter your Email'),
        phone: Yup.string()
            .required('Please enter your Phone Number')
            .matches(phoneRegExp, 'Please enter a valid Phone Number'),
        password: Yup.string()
            .required('Please enter your Password')
            .matches(
                passwordRegEx,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            ),
        repeatPassword: Yup.string()
            .required('Please enter your Password Again')
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
    });
    
    const serverSignUp = async (values, history) => {
        await axios.post('/signup', {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            phone: values.phone,
            password: values.password
        }).then(res => {
                console.log(res.data);
                history.push("/home");
            }).catch(err => {
                console.log(err.response.data);
                setErrorMessage(err.response.data.message);
            });
    }

    return (
        <Formik
            initialValues = {INITIAL_VALUES}
            validationSchema= {SignUpSchema}
            onSubmit={values => {
                console.log(values);
                serverSignUp(values,props.history);
            }}>
            {(formik) => {
                return (
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className={styles.paper}>
                            <Typography component="h1" variant="h5" className="text">
                                Sign Up
                            </Typography>
                            <form className={styles.form} onSubmit={formik.handleSubmit}>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                    <TextField
                                        name="firstName"
                                        label="First Name"
                                        id="firstName"
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        size="small"
                                        onChange={formik.handleChange}
                                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                        helperText={formik.touched.firstName && formik.errors.firstName}
                                    />
                                    </Grid>
                                    <Grid item xs={6}>
                                    <TextField
                                        name="lastName"
                                        label="Last Name"
                                        id="lastName"
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        size="small"
                                        onChange={formik.handleChange}
                                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                        helperText={formik.touched.lastName && formik.errors.lastName}
                                    />
                                    </Grid>
                                </Grid>
                                <TextField
                                    name="email"
                                    label="Email Address"
                                    id="email"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    autoFocus
                                    size="small"
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                 />
                                 <TextField
                                    name="phone"
                                    label="Phone Number"
                                    id="phone"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    size="small"
                                    onChange={formik.handleChange}
                                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                                    helperText={formik.touched.phone && formik.errors.phone}
                                 />
                                <TextField
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    size="small"
                                    autoComplete="current-password"
                                    onChange={formik.handleChange}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                />
                                <TextField
                                    name="repeatPassword"
                                    label="Repeat Password"
                                    type="password"
                                    id="repeatPassword"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    size="small"
                                    onChange={formik.handleChange}
                                    error={formik.touched.repeatPassword && Boolean(formik.errors.repeatPassword)}
                                    helperText={formik.touched.repeatPassword && formik.errors.repeatPassword}
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
                                        {"Already have an account? Sign In"}
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

export default SignUp;