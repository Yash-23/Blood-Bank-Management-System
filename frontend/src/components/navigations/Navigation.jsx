import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';
import InfoIcon from '@material-ui/icons/Info';
import PhoneIcon from '@material-ui/icons/Phone';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Container from '@material-ui/core/Container';
import Tooltip from '@material-ui/core/Tooltip';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 0,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
}));

function ElevationScroll(props) {
    const { children } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

export default function Navigation(props) {
    const classes = useStyles();

    const [drawerState, setDrawerState] = useState();
    const [anchor, setAnchor] = useState(null);
    const { signOut, currentUser } = useAuth();
    const theme = useTheme();

    function handleProfileClick(e) {
        setAnchor(e.currentTarget);
    }

    function handleProfileItemClick() {
        setAnchor(null);
    }

    function handleProfileMenuClose() {
        setAnchor(null);
    }

    async function handleSignOut(e) {
        e.preventDefault();
        await signOut();
    }

    const handleDrawerOpen = () => {
        setDrawerState(true);
    };

    const handleDrawerClose = () => {
        setDrawerState(false);
    };

    return (
        <div className={classes.root}>
            <ElevationScroll {...props}>
                <AppBar>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="menu"
                            onClick={handleDrawerOpen}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {props.title}
                        </Typography>
                        {currentUser ? (
                            <>
                                <Tooltip title="Profile" aria-label="profile">
                                    <Avatar
                                        onClick={handleProfileClick}
                                        src={currentUser.photoURL}
                                    />
                                </Tooltip>
                                <Menu
                                    open={Boolean(anchor)}
                                    anchorEl={anchor}
                                    keepMounted
                                    onClose={handleProfileMenuClose}
                                >
                                    <MenuItem onClick={handleProfileItemClick}>Profile</MenuItem>
                                    <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <Button color="inherit" component={Link} to="/login">
                                Login
                            </Button>
                        )}
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <Toolbar />
            <Drawer
                open={drawerState}
                variant="persistent"
                anchor="left"
                className={classes.drawer}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem button component={Link} to="/">
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button component={Link} to="/donate-blood">
                        <ListItemIcon>
                            <FavoriteIcon />
                        </ListItemIcon>
                        <ListItemText primary="Donate Blood" />
                    </ListItem>
                    <ListItem button component={Link} to="/search-hospitals">
                        <ListItemIcon>
                            <LocalHospitalIcon />
                        </ListItemIcon>
                        <ListItemText primary="Search Hospitals" />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button component={Link} to="/about">
                        <ListItemIcon>
                            <InfoIcon />
                        </ListItemIcon>
                        <ListItemText primary="About us" />
                    </ListItem>
                    <ListItem button component={Link} to="/contact">
                        <ListItemIcon>
                            <PhoneIcon />
                        </ListItemIcon>
                        <ListItemText primary="Contact us" />
                    </ListItem>
                </List>
            </Drawer>
            <Container maxWidth="md">{props.children}</Container>
        </div>
    );
}
