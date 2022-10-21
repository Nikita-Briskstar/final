import { useForm } from "react-hook-form";
import * as React from 'react';
import Box from '@mui/material/Box';
import Header from './layout/Header/Header';
import { styled } from '@mui/material/styles';
import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { useState } from "react";
import { useEffect } from "react";
import MetaData from './layout/MetaData';
import axios from 'axios';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
export default function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        setFormErrors(validate(formValues));
        const res = await axios.post("http://localhost:4000/api/v1/register", user);
        console.log(res.data.errors)
        console.log(data);
        console.log(res.data.user);
        if (res.data.errors) {
            window.alert("invalid registation.......");
            console.log("invalid registration...........");
        } else {
            window.alert("Registration Successfully")
            console.log("Registration Successfully")
        }
        // window.alert("Registration Successfully")
        // console.log("Registration Successfully")

    }

    const [user, setUser] = useState({
        firstname: '', lastname: '', email: '', password: ''
    })

    const [formValues, setFormValues] = useState(user);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit] = useState(false);


    const handleInputs = (e) => {

        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        setUser({ ...user, [name]: value });
        console.log(setUser);

    }
    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
            let storeValueEmail = localStorage.setItem('email', JSON.stringify(formValues.email));
            console.log(storeValueEmail);
            let storeValuePassword = localStorage.setItem('password', JSON.stringify(formValues.password));
            console.log(storeValuePassword);
        }

    }, [formErrors, formValues, isSubmit])



    const validate = (values) => {
        const errors = {}
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if (!values.firstname) {
            errors.firstname = "First name is required***";
        } else if (values.firstname.length <= 2) {
            errors.firstname = 'First name must be more than 2 characters';
        } else if (values.firstname.length > 7) {
            errors.firstname = 'First name cannot exceed more than 7 characters';
        }
        if (!values.lastname) {
            errors.lastname = "Last name is required***";
        } else if (values.lastname.length <= 2) {
            errors.lastname = 'Last name must be more than 2 characters';
        } else if (values.lastname.length > 7) {
            errors.lastname = 'Last name cannot exceed more than 7 characters';
        }
        if (!values.email) {
            errors.email = "Email is required***";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!!! Please use test@example.com";
        }
        if (!values.password) {
            errors.password = "Password is required***";
        } else if (values.password.length < 8) {
            errors.password = "Password must be greater than 8 characters";
        } else if (values.password.length > 12) {
            errors.password = "Password cannot exceed more than 12 characters";
        }

        return errors;
    };




    // console.log(watch("example"));

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <>
            <MetaData title="Minimal UI|Signup Page" />
            <Box>
                <Header /><br></br>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={0}>
                        <Grid item xs={5}>
                            <Item>
                                <Typography variant='h3' sx={{ color: 'black', fontSize: '42px', marginBottom: '20px', fontFamily: "'Noto Serif Georgian', serif", padding: '5px 5px', textAlign: 'left', marginLeft: '61px' }}>Manage the job more effectively with Minimal</Typography>
                                <img src='https://minimals.cc/assets/illustrations/illustration_register.png' alt='register' style={{ display: 'block', height: '50%', width: '490px' }}></img>
                            </Item>
                        </Grid>
                        <Grid item xs={7}>
                            <Item >

                                <Grid sx={{ textAlign: 'left', marginLeft: '170px' }}>
                                    <Grid>
                                        <Typography sx={{ fontSize: '25px', color: 'black', fontWeight: 'bold', marginTop: '20px' }}>Get started absolutely free.</Typography>
                                        <Typography sx={{ fontSize: '18px', marginBottom: '30px' }}>Free forever. No credit card needed.</Typography>
                                    </Grid>
                                    <form onSubmit={handleSubmit(onSubmit)}>

                                        <Grid sx={{ marginBottom: '15px', marginRight: '148px' }}>
                                            <TextField placeholder='First name' label="First name" fullWidth name="firstname" {...register("firstname", { required: true })} onChange={handleInputs} sx={{ paddingRight: '15px', borderRadius: '10px' }}>First Name</TextField>

                                            <Typography style={{ color: 'red' }}>{errors.firstname && <span>firstname is required...</span>}</Typography>
                                        </Grid>

                                        <Grid sx={{ marginBottom: '15px', marginRight: '148px' }}>
                                            <TextField placeholder='Last name' label="Last name" fullWidth name="lastname" {...register("lastname", { required: true })} onChange={handleInputs} sx={{ paddingRight: '15px', borderRadius: '10px' }}>Last Name</TextField>
                                            <Typography style={{ color: 'red' }}>{errors.lastname && <span>lastname is required...</span>}</Typography>
                                        </Grid>

                                        <Grid sx={{ marginBottom: '15px', marginRight: '148px' }}>
                                            <TextField placeholder='Email' label="Email" type="email" fullWidth name="email" {...register("email", { required: true })} onChange={handleInputs} sx={{ paddingRight: '15px', borderRadius: '10px' }}>Email</TextField>
                                            <Typography style={{ color: 'red' }}>{errors.email && <span>email is required...</span>}</Typography>
                                        </Grid>

                                        <Grid sx={{ marginBottom: '15px', marginRight: '148px' }}>
                                            <TextField placeholder='Password' label="Password" fullWidth type="password" name="password" {...register("password", { required: true })} onChange={handleInputs} sx={{ paddingRight: '15px', borderRadius: '10px' }}>Password</TextField>
                                            <Typography style={{ color: 'red' }}>{errors.password && <span>password is required...</span>}</Typography>
                                        </Grid>

                                        <Button type='submit' variant='contained' color='success' sx={{ marginBottom: '15px', width: '76%' }}>Register</Button>
                                        <Typography sx={{ marginBottom: '98px', marginLeft: '38px', fontSize: '13px' }}>By registering, I agree to Minimal Terms of Service and Privacy Policy. </Typography>
                                    </form>
                                </Grid>
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
}