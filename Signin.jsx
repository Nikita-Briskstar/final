import * as React from 'react';
import Box from '@mui/material/Box';
import Header1 from '../components/layout/Header/Header1';
import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from 'react';
import { useEffect } from 'react';
import MetaData from './layout/MetaData';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]


const Signin = () => {

    const initialValue = { email: '', password: "" };
    const [formValue, setformValue] = useState(initialValue);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setformValue({ ...formValue, [name]: value });
    }

    // [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]


    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValue));
        setIsSubmit(true);
    }

    // [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]



    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValue);
            let emailData = formValue.email;
            let passwordData = formValue.password;
            console.log(emailData);
            console.log(passwordData);
            let getStoreValueEmail = localStorage.getItem('email')
            console.log(getStoreValueEmail);
            let getStoreValuePassword = localStorage.getItem('password')
            console.log(getStoreValuePassword);
            if (emailData === getStoreValueEmail && passwordData === getStoreValuePassword) {
                setIsSubmit(true);
                console.log('email and password not matched to registration email and password')
            } else {
                setIsSubmit(true);
                console.log('successfully login to dashboard')
                navigate('/dashboard')
            }
        }
        else {
            console.log('error msg passed')
        }
    }, [formErrors, formValue, isSubmit, navigate])


    // [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]

    const validate = (values) => {
        const errors = {}
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!values.email) {
            errors.email = "email is required***";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!!! Please use test@example.com";
        }
        if (!values.password) {
            errors.password = "password is required***";
        } else if (values.password.length < 5) {
            errors.password = "Password must be more than 5 characters";
        } else if (values.password.length > 12) {
            errors.password = "Password cannot exceed more than 12 characters";
        }
        return errors;
    };

    // [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]


    return (
        <>
            <MetaData title="Minimal UI|Login Page" />
            <Box>
                <Header1 /><br></br>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={0}>
                        <Grid item xs={5}>
                            <Item>
                                <Typography variant='h3' sx={{ color: 'black', fontSize: '42px', marginBottom: '20px', fontFamily: "'Noto Serif Georgian', serif", padding: '5px 5px', textAlign: 'left', marginLeft: '61px' }}>Hi, Welcome Back</Typography>
                                <img src='https://minimals.cc/assets/illustrations/illustration_login.png   ' alt='login' style={{ display: 'block', height: '50%', width: '580px' }}></img>
                            </Item>
                        </Grid>
                        <Grid item xs={7}>
                            <Item >
                                <Grid sx={{ textAlign: 'left', marginLeft: '170px' }}>
                                    <Grid sx={{ marginTop: '25px' }}>
                                        <Typography sx={{ fontSize: '25px', color: 'black', fontWeight: 'bold' }}>Sign in to Minimal</Typography>
                                        <Typography sx={{ fontSize: '18px', marginBottom: '30px' }}>Enter your details below.</Typography>
                                    </Grid>
                                    <Grid sx={{ marginBottom: '15px', marginRight: '148x' }}>
                                        <Typography variant='contained' >Use email : <strong>demo@minimals.cc</strong> / password : <strong>demo1234</strong></Typography>
                                    </Grid>
                                    <form onSubmit={handleSubmit}>
                                        <Grid sx={{ marginBottom: '15px', marginRight: '148px' }}>
                                            <TextField type="email" name='email' label="Email address" fullWidth value={formValue.email} onChange={handleChange} placeholder='Email Address'>Email address</TextField>
                                            <Typography style={{ color: 'red' }}>{formErrors.email}</Typography>
                                        </Grid>
                                        <Grid sx={{ marginBottom: '15px', marginRight: '148px' }}>
                                            <TextField type="password" label="Password" name="password" fullWidth value={formValue.password} onChange={handleChange} placeholder="password"> Password </TextField>
                                            <Typography style={{ color: 'red' }}>{formErrors.password}</Typography>
                                        </Grid>
                                        <Grid sx={{ marginBottom: '20px' }}>
                                            <FormControlLabel
                                                value="end"
                                                control={<Checkbox color="success" />}
                                                label="Remember me"
                                                labelPlacement="end"
                                            />
                                            <Link to='/forgot' style={{ marginLeft: '173px', color: '#2bb72b', fontWeight: '600' }}>Forgot Password?</Link>
                                        </Grid>
                                        <Button type='submit' variant='contained' color='success' sx={{ marginBottom: '120px', width: '76%' }}>Login</Button>
                                    </form>
                                </Grid>
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}

export default Signin;