import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import './App.css';

import CreateBriefPage from "./pages/CreateBrief/CreateBriefPage";
import { Home } from "./pages/Home/Home";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

function App() {
      return (
          <Router>
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
                      <Route path="/">
                          <Home />
                      </Route>
                  </Switch>
              </div>
          </Router>
      );
}

export default App;
