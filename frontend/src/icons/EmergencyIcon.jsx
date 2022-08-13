import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    emg: {
        width: (props) => props.width,
        height: (props) => props.height,
    },
});

export default function EmergencyIcon(props) {
    const classes = useStyles(props);
    return (
        <SvgIcon
            className={classes.emg}
            xmlns="http://www.w3.org/2000/svg"
            enableBackground="new 0 0 24 24"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
        >
            <rect fill="none" height="24" width="24" />
            <polygon points="20.79,9.23 18.79,5.77 14,8.54 14,3 10,3 10,8.54 5.21,5.77 3.21,9.23 8,12 3.21,14.77 5.21,18.23 10,15.46 10,21 14,21 14,15.46 18.79,18.23 20.79,14.77 16,12" />
        </SvgIcon>
    );
}
