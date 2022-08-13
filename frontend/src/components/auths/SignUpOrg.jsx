import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Container from '@material-ui/core/Container';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { SignUpError } from '../../models/authError';
import ErrorTextField from '../ErrorTextField';
import LoadingButton from '../LoadingButton';
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
    signUpAsOrgButtonContainer: {
        padding: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp() {
    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(new SignUpError());
    const [loadingSignUp, setLoadingSingUp] = useState(false);
    const { signUp } = useAuth();
    const history = useHistory();

    async function handleSignUp(e) {
        e.preventDefault();

        const tempError = new SignUpError();
        let isError = false;

        if (!email) {
            tempError.emailError = true;
            isError = true;
        }
        if (!password) {
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
            await signUp(email, password);
            history.push('/');
        } catch (e) {
            tempError.signUPError = true;
        }
        setLoadingSingUp(false);
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up as Org
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSignUp}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                error={error.emailError}
                                variant="outlined"
                                value={email}
                                onChange={(value) => {
                                    setEmail(value.target.value);
                                }}
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
                                value={password}
                                onChange={(value) => {
                                    setPassword(value.target.value);
                                }}
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                        {error.emailError && <ErrorTextField description="Enter a password" />}
                    </Grid>
                    <Grid container className={classes.signUpAsOrgButtonContainer}>
                        <Grid item xs={12}>
                            <LoadingButton title="Sign Up as Org" loading={loadingSignUp} />
                        </Grid>
                    </Grid>
                    <Grid container justify="flex-start" direction="column" spacing={2}>
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
