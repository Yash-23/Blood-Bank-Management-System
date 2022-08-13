import React, { useEffect, useRef, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Tooltip from '@material-ui/core/Tooltip';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SearchIcon from '@material-ui/icons/Search';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import LogoIcon from '../icons/LogoIcon';
import { useAuth } from '../contexts/AuthContext';
import BloodTypeIcon from '../icons/BloodTypeIcon';
import EmergencyBorderIcon from '../icons/EmergencyBorderIcon';
import EmergencyIcon from '../icons/EmergencyIcon';
import BackendApi from '../apis/backendApi';
import HospitalSearchElement from './HospitalSearchElement';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(3, 0, 0),
    },
    logoTitle: {
        marginLeft: theme.spacing(2),
        color: '#FF1F3D',
    },
    search: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 500,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));
export default function Home() {
    const classes = useStyles();
    const { currentUser, dbUserGet } = useAuth();
    const searchRef = useRef();
    const [bloodGroup, setBloodGroup] = useState('');
    const [hospitals, setHospitals] = useState([]);
    const [emergency, setEmergency] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (currentUser) dbUserGet(currentUser.userId);
    }, []);

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleBloodGroupMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleBloodGroupMenuClose = () => {
        setAnchorEl(null);
    };

    const handleBloodGroupSelect = (e) => {
        setBloodGroup(e.target.textContent !== bloodGroup ? e.target.textContent : '');
        setAnchorEl(null);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        BackendApi({
            method: 'GET',
            url: '/api/blood',
            params: {
                zip: searchRef.current.value,
                blood: bloodGroup,
                emg: emergency,
            },
        })
            .then(({ data }) => {
                setHospitals(data);
            })
            .catch((e) => {
                console.log(e);
                setError('Something went wrong!');
                setOpenDialog(true);
            });
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item container xs={12} sm={4} spacing={2} justify="center">
                    <Grid container justify="flex-end" item xs={2}>
                        <LogoIcon width={50} height={50} />
                    </Grid>
                    <Grid container item xs={10} alignItems="center">
                        <Typography variant="h4" className={classes.logoTitle}>
                            Red
                        </Typography>
                        <Typography variant="h4">bank</Typography>
                    </Grid>
                </Grid>
                <Grid item container xs={12} sm={8} justify="center">
                    <Paper component="form" className={classes.search} onSubmit={handleSearch}>
                        <InputBase
                            className={classes.input}
                            inputRef={searchRef}
                            inputMode="numeric"
                            placeholder="Search blood banks by zip code"
                        />
                        <Tooltip title="Search" aria-label="search">
                            <IconButton
                                type="submit"
                                className={classes.iconButton}
                                aria-label="search"
                            >
                                <SearchIcon />
                            </IconButton>
                        </Tooltip>
                        <Divider className={classes.divider} orientation="vertical" />
                        <Tooltip title="Blood Group" aria-label="blood group">
                            <IconButton
                                className={classes.iconButton}
                                aria-label="directions"
                                onClick={handleBloodGroupMenu}
                            >
                                <BloodTypeIcon color={bloodGroup ? 'primary' : 'inherit'} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleBloodGroupMenuClose}
                        >
                            {['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'].map((g) => (
                                <MenuItem
                                    key={g}
                                    selected={g === bloodGroup}
                                    value={g}
                                    onClick={handleBloodGroupSelect}
                                >
                                    {g}
                                </MenuItem>
                            ))}
                        </Menu>
                        <Divider className={classes.divider} orientation="vertical" />
                        <Tooltip title="Emergency" aria-label="emergency">
                            <Checkbox
                                icon={<EmergencyBorderIcon />}
                                checkedIcon={<EmergencyIcon />}
                                name="checkedH"
                                color="primary"
                                onChange={(e) => setEmergency(e.target.checked)}
                            />
                        </Tooltip>
                    </Paper>
                </Grid>
                <Grid item container xs={12}>
                    {hospitals.map((h) => (
                        <Grid key={h.hospitalId} item xs={12} sm={6}>
                            <Container maxWidth="xs" component={Box} mb={2} mt={2}>
                                <HospitalSearchElement hospital={h} />
                            </Container>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="lg">
                <DialogTitle id="alert-dialog-title">Error</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{error}</DialogContentText>
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
