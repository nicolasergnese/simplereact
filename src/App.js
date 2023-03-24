import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import SignUp from './pages/sing_up';
import Container from '@mui/material/Container';
//import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Navbar from './pages/navbar';
//import Footer from './pages/footer';
import PrivateRoute from './utils/PrivateRoute';
//import Drawer from './pages/drawer';
import { styled } from '@mui/material/styles';
import './App.css';



function App() {
  const drawerWidth = 20;
  const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      // paddingTop: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
        //marginLeft: `-${drawerWidth}vh`,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: `${drawerWidth}vh`,
      }),
    }),
  );
  const [open, setOpen] = useState(false);
  const [auth, setAuth] = useState(false);
  function PageNotFound() {
    return (
      <Box sx={{ flexGrow: 1, textAlign: "center" }}>

        <Container maxWidth="xl">
          <Typography variant="h2">
            404 Page not found
          </Typography>
        </Container>
      </Box>

    );
  }
  return (
    <BrowserRouter>
      <Navbar auth={auth} setAuth={setAuth} open={open} setOpen={setOpen}/>
      <Main open={open}>
        {/* <Drawer open={open} setOpen={setOpen} /> */}
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute token={setAuth}>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />}>
          </Route>
          <Route path="/sign_up" element={<SignUp />}>
          </Route>
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Main>
      {/* <Footer open={open}/> */}
    </BrowserRouter>


  );
}

export default App;
