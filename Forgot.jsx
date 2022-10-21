import * as React from 'react';
import Box from '@mui/material/Box';
import Header2 from '../components/layout/Header/Header2';
import { Button, Typography } from '@mui/material';
import { Grid, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import MetaData from './layout/MetaData';




const Forgot = () => {


    const initialValue = { email: '' };
    const [formValues, setFormValues] = useState(initialValue);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    }
    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            //   console.log(formValues);
        }

    }, [formErrors, isSubmit])
    const validate = (values) => {
        // console.log(values)
        const errors = {}
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!values.email) {
            errors.email = "email is required***";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!!! Please use test@example.com";
        }
        return errors;
    }





    return (
        <>
            <MetaData title="Minimal UI|Forgot Page" />
            <Box>
                <Header2 /><br></br>
                <Box textAlign="center" >
                    <Typography variant='h1' sx={{ fontSize: '40px', fontWeight: " 600", marginTop: '100px' }}>Forgot your password?</Typography>
                    <Typography sx={{ color: 'gray', marginTop: '20px' }}>Please enter the email address associated with your account and <br></br> We will email you a link to reset your password.</Typography>
                    {Object.keys(formErrors).length === 0 && isSubmit ? (alert('sent a request successfully...!!!')
                    ) : (console.log("Error"))}
                    <form onSubmit={handleSubmit}>
                        <Grid>
                            <TextField type="email" label="Email address" name='email' value={formValues.email} onChange={handleChange} placeholder='Email Address' sx={{ marginTop: '20px', width: '35%' }}>Email address</TextField>
                            <Typography style={{ color: 'red', textAlign: 'left', marginLeft: '437px' }}>{formErrors.email}</Typography>
                        </Grid>
                        <Grid>
                            <Button variant='contained' type='submit' color='success' sx={{ marginTop: '20px', width: '35%', fontWeight: '600' }}>Send Request</Button>
                        </Grid>
                        <Grid>
                            <Button component={Link} to='/signin' variant='contained' color="success" sx={{ marginTop: '5px', backgroundColor: '#cddbcd', color: 'green', fontWeight: '700', width: '35%' }}>Back</Button>
                        </Grid>
                    </form>

                </Box>
            </Box>


        </>
    )
}

export default Forgot;