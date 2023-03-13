import React, { useEffect } from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Logout from '@mui/icons-material/MeetingRoom';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

// import UserServices from '../services/user';


export default function MenuAppBar({ auth, setAuth, open, setOpen}) {
    const navigate = useNavigate();
    

    // const [anchorEl, setAnchorEl] = useState(null);
    
    useEffect(() => {
        console.log("navbar auth")
    });
    
   
    const drawerWidth = 25;
    console.log(open)
    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
      })(({ theme, open }) => ({
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
          width: `calc(100% - ${drawerWidth}vh)`,
          marginLeft: `${drawerWidth}vh`,
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }),
      }));

    const logout = () => {
        console.log('logout')
        sessionStorage.clear();
        setAuth(false);
        if (open)
         setOpen(!open)
        navigate('/login')
    }    
    
    const handleDrawerOpen = () => {
        //getListClient();
        setOpen(!open)
    };

    return (
        <Box sx={{ flexGrow: 1 }} >
            <AppBar elevation={0} sx={{'background': '#D3D3D3', maxWidth:"100%"}} 
            position="sticky" open={open} >
                <Toolbar>
                    {/* {auth && (
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleDrawerOpen}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )} */}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign:"left"}}>
                        <img  src='/IoT-NGIN_logo_v1.png' alt='logo'></img>
                    </Typography>
                    {auth && (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={logout}
                                color="primary"
                            >
                                <Logout />
                            </IconButton>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
