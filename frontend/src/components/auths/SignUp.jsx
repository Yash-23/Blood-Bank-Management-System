import React, { useEffect, useRef, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Container from '@material-ui/core/Container';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { SignUpError } from '../../models/authError';
import ErrorTextField from '../ErrorTextField';
import LoadingButton from '../LoadingButton';
import LinkButton from '../LinkButton';
import GoogleIcon from '../../icons/GoogleIcon';
import User from '../../models/user';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    wrapper: {
        padding: theme.spacing(3, 0, 2),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
    },
    signUpButtonGrid: {
        padding: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp() {
    const classes = useStyles();

    const fNameRef = useRef();
    const lNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState(new SignUpError());
    const [loadingSignUp, setLoadingSingUp] = useState(false);
    const { currentUser, signUp, signInWithGoogle, dbUserCreate } = useAuth();
    const history = useHistory();

    useEffect(async () => {
        if (currentUser) {
            await dbUserCreate(
                new User(
                    {
                        uid: currentUser.userId,
                        email: currentUser.emailAddress,
                        phoneNumber: currentUser.phoneNumber,
                        metadata: {
                            creationTime: currentUser.dateOfEntry,
                        },
                    },
                    fNameRef.current.value,
                    lNameRef.current.value,
                ),
            );
            history.push('/');
        }
    }, [currentUser]);

    async function handleSignUp(e) {
        e.preventDefault();

        const tempError = new SignUpError();
        let isError = false;
        if (!fNameRef.current.value) {
            tempError.fNameError = true;
            isError = true;
        }
        if (!lNameRef.current.value) {
            tempError.lNameError = true;
            isError = true;
        }
        if (!emailRef.current.value) {
            tempError.emailError = true;
            isError = true;
        }
        if (!passwordRef.current.value) {
            tempError.passwordError = true;
            isError = true;
        }
        if (isError) {
            setError(tempError);
            for (const errorKey in tempError) {
                // eslint-disable-next-line no-prototype-builtins
                if (tempError.hasOwnProperty(errorKey))
                    if (tempError[errorKey]) {
                        const id = errorKey.replace('Error', '');
                        document.getElementById(id).focus();
                        break;
                    }
            }
            return;
        }
        setLoadingSingUp(true);
        try {
            setError(new SignUpError());
            await signUp(
                emailRef.current.value,
                passwordRef.current.value,
                fNameRef.current.value,
                lNameRef.current.value,
            );
        } catch (e) {
            console.log(e);
            const err = new SignUpError();
            err.signUpError.isError = true;
            err.signUpError.message = e.message;
            setError(err);
        }
        setLoadingSingUp(false);
    }

    async function handleGoogleSign() {
        await signInWithGoogle();
        history.push('/');
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSignUp}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={error.fNameError}
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                inputRef={fNameRef}
                                fullWidth
                                id="fName"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={error.lNameError}
                                variant="outlined"
                                inputRef={lNameRef}
                                fullWidth
                                id="lName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                            />
                        </Grid>
                        {error.fNameError && error.lNameError ? (
                            <ErrorTextField description="Enter first name and surname" />
                        ) : error.fNameError ? (
                            <ErrorTextField description="Enter first name" />
                        ) : error.lNameError ? (
                            <ErrorTextField description="Enter last name" />
                        ) : null}
                        <Grid item xs={12}>
                            <TextField
                                error={error.emailError}
                                variant="outlined"
                                inputRef={emailRef}
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        {error.emailError && (
                            <ErrorTextField description="Enter an email address" />
                        )}
                        <Grid item xs={12}>
                            <TextField
                                error={error.passwordError}
                                variant="outlined"
                                inputRef={passwordRef}
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                        {error.emailError && <ErrorTextField description="Enter a password" />}
                        <Grid item xs={12}>
                            <Link
                                variant="body2"
                                underline="none"
                                component={RouterLink}
                                to="signup-org"
                            >
                                Create an account as Org
                            </Link>
                        </Grid>
                    </Grid>
                    <Grid container className={classes.signUpButtonGrid}>
                        <Grid item xs={12}>
                            <LoadingButton title="Sign Up" loading={loadingSignUp} />
                        </Grid>
                    </Grid>
                    <Grid container justify="flex-start" direction="column" spacing={2}>
                        <Grid item>
                            <Button
                                fullWidth
                                color="primary"
                                variant="contained"
                                onClick={handleGoogleSign}
                                startIcon={<GoogleIcon />}
                            >
                                Sign In with Google
                            </Button>
                        </Grid>
                        <Grid container item justify="flex-end">
                            <Link
                                variant="body2"
                                underline="none"
                                component={RouterLink}
                                to="/login"
                            >
                                Already have an account? Log in
                            </Link>
                        </Grid>
                        <Grid item>
                            <LinkButton component={RouterLink} to="/">
                                Cancel
                            </LinkButton>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
