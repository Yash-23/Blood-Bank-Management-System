import React, { useRef, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LogInError } from '../../models/authError';
import ErrorTextField from '../ErrorTextField';
import LoadingButton from '../LoadingButton';
import GoogleIcon from '../../icons/GoogleIcon';
import LinkButton from '../LinkButton';

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
    loginButtonsGrid: {
        padding: theme.spacing(3, 0, 2),
    },
}));

export default function LogIn() {
    const classes = useStyles();

    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState(new LogInError());
    const [loadingLogIn, setLoadingLogIn] = useState(false);
    const { logIn, signInWithGoogle } = useAuth();
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        const tempError = new LogInError();
        let isError = false;
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
        setLoadingLogIn(true);
        try {
            setError(new LogInError());
            await logIn(emailRef.current.value, passwordRef.current.value);
            history.push('/');
        } catch (e) {
            console.log(e);
            const err = new LogInError();
            err.logInError.isError = true;
            err.logInError.message = e.message;
            setError(err);
        }
        setLoadingLogIn(false);
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
                    Log in
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleLogin}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                error={error.emailError}
                                variant="outlined"
                                fullWidth
                                inputRef={emailRef}
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                        </Grid>

                        {error.emailError && (
                            <ErrorTextField description="Enter an email address" />
                        )}
                        <Grid item xs={12}>
                            <TextField
                                error={error.passwordError}
                                variant="outlined"
                                fullWidth
                                inputRef={passwordRef}
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>

                        {error.passwordError && (
                            <ErrorTextField description="Enter your password" />
                        )}
                        <Grid container item xs={12} alignItems="center">
                            <Link
                                variant="body2"
                                underline="none"
                                component={RouterLink}
                                to="/forgot-password"
                            >
                                Forgot password?
                            </Link>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} className={classes.loginButtonsGrid}>
                        <Grid item xs={12} sm={6}>
                            <LoadingButton title="Log In" loading={loadingLogIn} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <LoadingButton title="Log In as Org" loading={false} />
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
                        <Grid container justify="flex-end" item>
                            <Link
                                variant="body2"
                                underline="none"
                                component={RouterLink}
                                to="/signup"
                            >
                                {"Don't have an account? Sign Up"}
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
