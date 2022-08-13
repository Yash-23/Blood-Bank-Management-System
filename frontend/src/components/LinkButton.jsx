import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    button: {
        textTransform: 'none',
        marginLeft: theme.spacing(-1),
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
}));

export default function LinkButton({ component: Component, children, ...rest }) {
    const classes = useStyles();
    return (
        <Button component={Component} className={classes.button} {...rest}>
            {children}
        </Button>
    );
}
