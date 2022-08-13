import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    buttonProgress: {
        position: 'absolute',
    },
}));

export default function LoadingButton({ title, loading, ...rest }) {
    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <Button
                {...rest}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
            >
                {title}
            </Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
    );
}
