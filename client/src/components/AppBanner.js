import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'
import logo from './loigo.png'

// import EditToolbar from './EditToolbar'

import AccountCircle from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function AppBanner() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    // console.log("AppBanner")

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleMenuClose();
        auth.logoutUser();
    }

    const handleHouseClick = () => {
        store.closeCurrentList();
    }


    const handleGuest = () => {
        
    }

    const handleLogin = () => {
        
    }

    const handleSignIn = () => {
        
    }

    const menuId = 'primary-search-account-menu';
    const loggedOutMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}><Link to='/login/'>Login</Link></MenuItem>
            <MenuItem onClick={handleMenuClose}><Link to='/register/'>Create New Account</Link></MenuItem>
        </Menu>
    );
    const loggedInMenu = 
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>        

    let editToolbar = "";
    let menu = loggedOutMenu;
    if (auth.loggedIn) {
        menu = loggedInMenu;
    }
    
    function getAccountMenu(loggedIn) {
        let userInitials = auth.getUserInitials();
        console.log("userInitials: " + userInitials);
        if (loggedIn) 
            return <div>{userInitials}</div>;
        else
            return <div />;
    }

    let logoutBar = (
    <Box sx={{ height: "90px", display: { xs: 'none', md: 'flex' } }}>
                        
        <Button variant="outlined"
            color='inherit'
        >
            <Link onClick={handleGuest} style={{ textDecoration: 'none', color: 'white' }} to='/user/'>Guest</Link>
        </Button>
        <Button variant="outlined"
            color='inherit'
        >
            <Link onClick={handleSignIn} style={{ textDecoration: 'none', color: 'white' }} to='/register/'>SignUp</Link>
        </Button><Button variant="outlined"
            color='inherit'
        >
            <Link onClick={handleLogin} style={{ textDecoration: 'none', color: 'white' }} to='/login/'>LogIn</Link>
        </Button>
    </Box>);
    let loginBar = (
        <IconButton>user</IconButton>
    );

    let bar = logoutBar;
    if (auth.loggedIn) {
        bar = loginBar;
    }


    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography                        
                        variant="h4"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}                        
                    >
                        {/* <Link onClick={handleHouseClick} style={{ textDecoration: 'none', color: 'white' }} to='/'></Link> */}
                    <img src = {logo}/>
                    </Typography>
                    <Box sx={{ flexGrow: 1 }}>{editToolbar}</Box>
                    {bar}
                </Toolbar>
            </AppBar>
            {
                menu
            }
        </Box>
    );
}