import * as React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export default function BottomAppBar({open}) {
    const drawerWidth = 10;
    console.log(open)
    React.useEffect(() => {
		
    }, []);
    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
      })(({ theme, open }) => ({
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
          width: `calc(100% - ${drawerWidth}vh)`,
          marginLeft: `calc(100% - ${drawerWidth})vh`,
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }),
      }));
    return (
        <Box sx={{ flexGrow: 1}} >
            <AppBar style={{'background': 'linear-gradient(to right, #1A88C9, #2AB683)'}} position="sticky" sx={{ top: 0, bottom: 0 }} open={open}>
                <Container  maxWidth="xl">
                    <Grid style={{padding:"8px",alignItems:"center"}} container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <Typography  variant="body2" component="div" >
                                <p>Copyright MATRYCS Consortium @2022 All rights reserved</p>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={1}>
                            <Typography component="div" >
                                <img src='/european-union.png' alt='european flag' style={{marginTop:"8px"}} ></img>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <Typography  variant="body2" component="div" >
                                <p>Co-funded by the Horizon 2020 Framework Programme of the European Union Under grant agreement No 101000158</p>
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </AppBar>
        </Box>
    );
}
