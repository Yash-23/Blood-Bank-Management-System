import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { red, deepOrange, blue } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    bloodGrp: {
        marginRight: theme.spacing(2),
    },
    'blood-bank': {
        marginRight: theme.spacing(2),
        textTransform: 'uppercase',
        color: deepOrange[500],
    },
    emergency: {
        marginRight: theme.spacing(2),
        textTransform: 'uppercase',
        color: red[500],
    },
    others: {
        marginRight: theme.spacing(2),
        textTransform: 'uppercase',
        color: blue[500],
    },
}));

export default function HospitalSearchElement({ hospital }) {
    const classes = useStyles();
    const [openDialog, setOpenDialog] = useState(false);

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    return (
        <div>
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {hospital.county}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {hospital.name}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {hospital.state}
                    </Typography>
                    <Typography variant="body2" component="p">
                        Bed count: {` ${hospital.hospitalBedCount}`}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={handleOpenDialog}>
                        Show More
                    </Button>
                </CardActions>
            </Card>
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="lg">
                <DialogTitle id="alert-dialog-title">{hospital.name}</DialogTitle>
                <DialogContent>
                    <DialogContentText>Phone: {hospital.phoneNumber}</DialogContentText>
                    <DialogContentText>Zip: {hospital.zip}</DialogContentText>
                    <DialogContentText>
                        {hospital.bloodBank.map((b) => (
                            <span className={classes.bloodGrp} key={b}>
                                {b}
                            </span>
                        ))}
                    </DialogContentText>
                    <DialogContentText>
                        {hospital.availableServices.map((a) => (
                            <span className={classes[a]} key={a}>
                                {a.replace('-', ' ')}
                            </span>
                        ))}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
