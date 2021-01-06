import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home_AppBar from './Home_Appbar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { Form, Col } from 'react-bootstrap';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';

import Users  from './UserStore'
import logo from './segate.png'

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function Home() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [Usergid, setUsergid] = useState('')
  const [Userpassword, setUserpassword] = useState('')
  
  const login = ()  => {
    for (var i = 0 ; i < Users.length; i++){
      if(Users[i].GID == Usergid && Users[i].Password == Userpassword){
        setOpen(false);
      } else if (Usergid == 'admin' && Userpassword == 'admin') {
        setOpen(false);
      } else {
        alert("GID or Password Error!")
      }
    }
  }

  const handleClose = () => {
    setOpen(true);
  };

  return (
    <BrowserRouter>
      <Switch>
        <div>
          <Grid >
            <Home_AppBar handleClose={handleClose} Usergid={Usergid}/>
          </Grid>

          <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton edge="start" color="inherit"  aria-label="close"></IconButton>
                <Typography variant="h6" className={classes.title}>FACILITY STORE</Typography>
                <Button autoFocus color="inherit" o></Button>
              </Toolbar>
            </AppBar>

              <Grid item xs={12} style={{display:'flex' , justifyContent:'space-around',alignItems:'center'}}>
                <Paper>
                  <Grid item xs={12} style={{padding: '5vh',paddingTop:'5vh'}}>
                      <img src={logo}/>
                      <h2>Welcome to store</h2>
                      <Form >
                          <Form.Group >
                              <Form.Control type="text" size="md" placeholder="GID"  onChange={(e) => { setUsergid(e.target.value)}}/>
                          </Form.Group>
                          <Form.Group >
                              <Form.Control type="password" size="md" placeholder="Password"  onChange={(e) => { setUserpassword(e.target.value)}}/>
                          </Form.Group>
                          <Form.Group >
                            <Button variant="contained" fullWidth color="Primary" onClick={login}>
                              Login
                            </Button>
                          </Form.Group>
                      </Form>
                  </Grid>
                  <Grid item xs={12}>
                  </Grid>
              </Paper>
            </Grid>
          </Dialog>

        </div>
      </Switch>
    </BrowserRouter>
  );
}