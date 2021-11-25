import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { SnackbarProvider } from 'notistack';
import { useSelector } from "react-redux";
import { AppBar, Box, Button, CircularProgress, Toolbar, Typography } from "@mui/material";

import './App.css';

import { CreateBriefPage } from "./pages/CreateBrief/CreateBriefPage";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";

import { AppState } from "./store/rootStore";

export default function App() {
    const isLoading = useSelector<AppState, boolean>(state => state.app.isLoading);

    if (isLoading) {
        return <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100vw' }}>
            <CircularProgress size={80} />
        </Box>
    }

      return (
          <Router>
              <SnackbarProvider maxSnack={3}>
                  <Box sx={{ flexGrow: 1 }}>
                      <AppBar position="static">
                          <Toolbar>
                              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                  News
                              </Typography>
                              <Box sx={{ marginLeft: 2 }}>
                                  <Link to="/">
                                      <Button color="inherit">Home</Button>
                                  </Link>
                              </Box>
                              <Box sx={{ marginLeft: 2 }}>
                                  <Link to="/login">
                                      <Button color="inherit">Log In</Button>
                                  </Link>
                              </Box>
                              <Box sx={{ marginLeft: 2 }}>
                                  <Link to="/create-brief">
                                      <Button variant="contained">Create Brief</Button>
                                  </Link>
                              </Box>
                          </Toolbar>
                      </AppBar>
                  </Box>

                  <div className="container">
                      <Switch>
                          <Route path="/create-brief">
                              <CreateBriefPage />
                          </Route>
                          <Route path="/login">
                              <Login />
                          </Route>
                          <Route path="/">
                              <Home />
                          </Route>
                      </Switch>
                  </div>
              </SnackbarProvider>
          </Router>
      );
}
