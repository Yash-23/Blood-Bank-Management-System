import React from 'react';
import { createMuiTheme, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { grey } from '@material-ui/core/colors';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavRoute from './custom-routes/NavRoute';
import Home from './Home';
import SignUp from './auths/SignUp';
import SignUpOrg from './auths/SignUpOrg';
import LogIn from './auths/LogIn';
import ForgotPassword from './auths/ForgotPassword';
import { AuthProvider } from '../contexts/AuthContext';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: grey[900],
        },
        secondary: {
            main: '#ffffff',
        },
    },
    typography: {
        h1: {
            fontFamily: 'Poppins',
        },
        h2: {
            fontFamily: 'Poppins',
        },
        h3: {
            fontFamily: 'Poppins',
        },
        h4: {
            fontFamily: 'Poppins',
        },
    },
});

function App() {
    return (
        <BrowserRouter>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <AuthProvider>
                    <Switch>
                        <NavRoute exact path="/" component={Home} />
                        <Route path="/signup" component={SignUp} />
                        <Route path="/signup-org" component={SignUpOrg} />
                        <Route path="/login" component={LogIn} />
                        <Route path="/forgot-password" component={ForgotPassword} />
                    </Switch>
                </AuthProvider>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
