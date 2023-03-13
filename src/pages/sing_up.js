import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
    Container,
    Button,
    Grid,
    Paper,
    TextField,
    IconButton,
    InputAdornment,
    Typography
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React, { useState, useEffect } from "react";
import UserService from '../services/user';
import { omit } from 'lodash';
// import { ACCESS_TOKEN_NAME, USERNAME } from '../constants/apiConstants';
import './login.css';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    useEffect(() => {

    }, []);
    //console.log(props)
    const history = useNavigate();
    const [values, setValues] = useState({
        email: "",
        password: "",
        lastName: "",
        firstName: "",
        showPass: false,
        successMessage: null,
    });
    const [errors, setErrors] = useState({});

    const handlePassVisibilty = () => {
        setValues({
            ...values,
            showPass: !values.showPass,
        });
    };
    const handleChange = (e) => {
        //To stop default events    
        e.persist();
        const { id, value } = e.target
        validate(id, value);

        setValues({
            ...values,
            [id]: value,
        })
        console.log(values)
        // setState(prevState => ({
        //     ...prevState,
        //     [id]: value
        // }))
        //setState({disabled:false})
    }
    const validate = (name, value) => {
        //A function to validate each input values
        switch (name) {
            case 'email':
                if (value.length <= 0) {
                    // we will set the error state
                    setErrors({
                        ...errors,
                        email: '*required',
                        // disabledUsername:true
                    })
                } else {
                    // set the error state empty or remove the error for username input
                    //omit function removes/omits the value from given object and returns a new object
                    let newObj = omit(errors, "email");
                    //setState({disabledUsername:false})
                    setErrors(newObj);

                }
                break;

            case 'password':
                if (value.length <= 0) {
                    setErrors({
                        ...errors,
                        password: '*required',
                        // disabledPassword:true
                    })
                } else {
                    let newObj = omit(errors, "password");
                    //setState({disabledPassword:false})
                    setErrors(newObj);
                }
                break;
            case 'lastName':
                if (value.length <= 0) {
                    // we will set the error state
                    setErrors({
                        ...errors,
                        lastName: '*required',
                        // disabledUsername:true
                    })
                } else {
                    // set the error state empty or remove the error for username input
                    //omit function removes/omits the value from given object and returns a new object
                    let newObj = omit(errors, "lastName");
                    //setState({disabledUsername:false})
                    setErrors(newObj);

                }
                break;

            case 'firstName':
                if (value.length <= 0) {
                    // we will set the error state
                    setErrors({
                        ...errors,
                        firstName: '*required',
                        // disabledUsername:true
                    })
                } else {
                    // set the error state empty or remove the error for username input
                    //omit function removes/omits the value from given object and returns a new object
                    let newObj = omit(errors, "firstName");
                    //setState({disabledUsername:false})
                    setErrors(newObj);

                }
                break;

            default:
                break;
        }
    }
    // function isValidEmail(email) {
    // 	const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    // 	return expression.test(String(email).toLowerCase());
    //   }
    const handleSubmitClick = (e) => {
        console.log("send data")
        e.preventDefault();
        if (Object.keys(errors).length === 0 && Object.keys(values).length !== 0) {
            const payload = {
                "email": values.email,
                "password": values.password,
                "lastName": values.lastName,
                "firstName": values.firstName
            }

            UserService.sing_up(payload)
                .then((response) => {
                    console.log(response)
                    if (response.status !== 200 || response.status !== 201)
                        setValues({
                            ...values,
                            successMessage: response.data.message,
                        })

                })
                .catch(function (error) {
                    console.log(error);
                    setValues({
                        ...values,
                        successMessage: "errors",
                    })
                    //props.showError("Username does not exists");
                });
        }
        else {

        }


    }
    const redirectToHome = () => {
        console.log("redirect")
        history('/')
        //this.props.history.push('/')
    }


    return (

        <Container style={{ marginTop: "20vh", minHeight: "71.4vh" }} maxWidth="sm">
            <Grid
                container
                spacing={2}
                direction="column"
                justifyContent="center"
                style={{ 'alignItems': 'center' }}
            >
                <Avatar style={{ 'background': 'linear-gradient(to right, #1A88C9, #2AB683)' }} >
                    <LockOutlinedIcon />
                </Avatar>
                <Paper elelvation={2} sx={{ boxShadow: "none", padding: 5 }}>
                    <form>
                        <Grid container direction="column" spacing={2} >
                            <Grid item >
                                <TextField
                                    type="text"
                                    fullWidth
                                    label="First Name"
                                    placeholder="Enter your First Name"
                                    variant="outlined"
                                    focused
                                    required
                                    id="firstName"
                                    value={values.firstName}
                                    onChange={handleChange}
                                />
                                {
                                    errors.firstName && <span className="danger">{errors.firstName}</span>

                                }
                            </Grid>

                            <Grid item >
                                <TextField
                                    type="text"
                                    fullWidth
                                    label="Last Name"
                                    placeholder="Enter your Last Name"
                                    variant="outlined"
                                    focused
                                    required
                                    id="lastName"
                                    value={values.lastName}
                                    onChange={handleChange}
                                />
                                {
                                    errors.lastName && <span className="danger">{errors.lastName}</span>

                                }
                            </Grid>

                            <Grid item >
                                <TextField
                                    type="email"
                                    fullWidth
                                    label="Email"
                                    placeholder="Enter your email"
                                    variant="outlined"
                                    focused
                                    required
                                    id="email"
                                    value={values.email}
                                    onChange={handleChange}
                                />
                                {
                                    errors.email && <span className="danger">{errors.email}</span>

                                }
                            </Grid>

                            <Grid item>
                                <TextField
                                    type={values.showPass ? "text" : "password"}
                                    fullWidth
                                    label="Password"
                                    placeholder="Enter your password"
                                    variant="outlined"
                                    required
                                    id="password"
                                    focused
                                    value={values.password}
                                    onChange={handleChange}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={handlePassVisibilty}
                                                    aria-label="toggle password"
                                                    edge="end"
                                                >
                                                    {values.showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                {
                                    errors.password && <span className="danger">{errors.password}</span>

                                }
                            </Grid>
                            <Grid item>
                                <Button onClick={handleSubmitClick}
                                    style={{ 'background': 'linear-gradient(to right, #1A88C9, #2AB683)' }}
                                    disabled={!values.lastName || !values.firstName || !values.email || !values.password} type="submit" fullWidth variant="contained">
                                    Sign Up
                                </Button>
                            </Grid>
                            <Grid item sx={{textAlign:"center"}}>
                                <Typography><a href="/">Sing In</a></Typography>
                            </Grid>

                            {values.successMessage && (
                                <Grid item>
                                    <div className="alert alert-success" style={{ maxWidth: "100%", display: values.successMessage ? 'block' : 'none' }} role="alert">
                                        {values.successMessage}
                                    </div>
                                </Grid>
                            )}
                        </Grid>
                    </form>
                </Paper>
            </Grid>
        </Container>

    );
};
export default SignUp;