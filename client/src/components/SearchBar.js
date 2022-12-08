import { useHistory } from 'react-router-dom'
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'

import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import HomeIcon from '@mui/icons-material/Home';
import SortIcon from '@mui/icons-material/Sort';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';



function SearchBar() {
    // console.log("SearchBar")
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    
    const Search = styled('div')(({ theme }) => ({
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
      color: 'inherit',
      '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
      },
    }));

    const handleButton = () => {

      console.log("button clicked")
    
    }

    const handleSort = () => {
      store.sortList("s");
    }



    const [subject, setSubject] = useState(false);

    let option = "User Search"

    const handleKeydown = (event) => {
      if (event.key === 'Enter'){
        console.log("enter clicked")
        console.log(event.target.value)
        store.filterList(subject, event.target.value)
      }
    } 

    const [anchorE, setAnchorE] = React.useState(null);

    const handleClick = (event) => {
      setAnchorE(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorE(null);
    };
  
    const open = Boolean(anchorE);
    const id = open ? 'simple-popover' : undefined;

    return (
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: '#ff5722' }}>
        <Toolbar>
        <IconButton 
          ><Link to='/'><HomeIcon/></Link>
          </IconButton>

          <IconButton 
          variant="outlined"
          aria-label = "GroupsIcon"
          color='inherit'
          
          >
            <GroupsIcon onClick={() => {setSubject(false)}}/>
          </IconButton>

          <IconButton 
          variant="outlined"
          aria-label = "PersonIcon"
          color='inherit'
          
          >
            <PersonIcon onClick={() => {setSubject(true)}}/>
          </IconButton>

          <Search style={{ marginLeft: "auto" }}>
            <StyledInputBase
              placeholder={subject ? "User Search" : "Playlist Search"}
              inputProps={{ 'aria-label': 'search' }}
              onKeyDown = {handleKeydown}
              
            />
          </Search>

          <Typography style={{ marginLeft: "20%" }}>Sort By<Popover
        id={id}
        open={open}
        anchorEl={anchorE}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <List sx={{ p: 1,overflow: 'auto' }}>
          <Button onClick={()=>store.sortList("c")} style={{ background: '#ffc107' }} >Date Created</Button>
          <Button onClick={()=>store.sortList("e")} style={{ background: '#ffc107' }}>Date Edited</Button>
          <Button onClick={()=>store.sortList("a")} style={{ background: '#ffc107' }}>A-Z</Button>
        </List>
      </Popover><SortIcon onClick={handleClick}/></Typography>

        </Toolbar>
      </AppBar>
    </Box>
    )
}

export default SearchBar;