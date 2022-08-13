import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    logo: {
        width: ({ width }) => width,
        height: ({ height }) => height,
    },
    st0: {
        fill: '#FF4A4A',
    },
    st1: {
        fill: '#FF1F3D',
    },
}));

export default function LogoIcon({ width, height }) {
    const classes = useStyles({ width, height });

    return (
        <SvgIcon viewBox="0 0 512.147 512.147" className={classes.logo}>
            <g>
                <path
                    className={classes.st0}
                    d="M255.279,2.214c-1.796-2.993-6.151-2.942-7.876,0.092L103.426,255.522   c-14.992,26.472-22.873,50.283-22.873,80.721l0,0c0,97.149,78.583,175.904,175.52,175.904l0,0   c96.937,0,175.52-78.755,175.52-175.904l0,0c0-32.04-8.732-54.831-25.252-82.26L255.279,2.214z"
                />
                <path
                    className={classes.st1}
                    d="M406.341,253.983L255.279,2.214c-0.93-1.549-2.545-2.276-4.126-2.202v512.063   c1.635,0.045,3.274,0.072,4.92,0.072c96.937,0,175.52-78.755,175.52-175.904C431.593,304.203,422.861,281.412,406.341,253.983z"
                />
            </g>
        </SvgIcon>
    );
}
