import React from 'react';
import Grid from '@material-ui/core/Grid';
import ErrorIcon from '@material-ui/icons/Error';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    error: {
        marginTop: theme.spacing(-2),
    },
}));

export default function ErrorTextField({ description }) {
    const classes = useStyles();

    return (
        <Grid container className={classes.error} item spacing={1} alignItems="center">
            <Grid item xs="auto">
                <ErrorIcon style={{ fontSize: 15 }} color="error" />
            </Grid>
            <Grid item xs="auto">
                <Typography variant="caption" display="block" gutterBottom color="error">
                    {description}
                </Typography>
            </Grid>
        </Grid>
    );
}
