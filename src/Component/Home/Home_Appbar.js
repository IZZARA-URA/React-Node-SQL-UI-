import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link, Switch, Route } from 'react-router-dom'


import History from '../History/History'
import Information from '../Information/Information'
import Register from '../Register/Register'
import Withdraw from '../Withdraw/Withdraw'
import Return from '../Return/Return'
import Search from '../Search/Search'


const drawerWidth = 340;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      justifyContent:'space-between'
    },
  },
  appBarContainer : {
    offset: theme.mixins.toolbar,
    padding : '10px 20px',
    marginBottom:'200px !important'
    , display : 'flex'
    , flexFlow : 'row nowrap'
    , justifyContent : 'space-between'
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  login: {
    display: 'flex',
    justifyContent:'flex-end',
   // flexGrow: 1,
  }
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List component="nav" aria-label="main mailbox folders">
            <ListItem button component={Link} to='/Search'>
                <ListItemIcon>

                </ListItemIcon>
                <ListItemText primary="SEARCH"/>
            </ListItem>
        </List>
      <Divider />
      <List>
        <List component="nav" aria-label="main mailbox folders">
            <ListItem button component={Link} to='/Register'>
                <ListItemIcon>

                </ListItemIcon>
                <ListItemText primary="REGISTER"/>
            </ListItem>
            <ListItem button component={Link} to='/Withdraw'>
                <ListItemIcon>

                </ListItemIcon>
                <ListItemText primary="WITHDRAW"/>
            </ListItem>
            <ListItem button component={Link} to='/Return'>
                <ListItemIcon>

                </ListItemIcon>
                <ListItemText primary="RETURN"/>
            </ListItem>
        </List>
      </List>
      <Divider />
      <List>
        <List component="nav" aria-label="main mailbox folders">
            <ListItem button component={Link} to='/History'>
                <ListItemIcon>

                </ListItemIcon>
                <ListItemText primary="HISTORY"/>
            </ListItem>
            <ListItem button component={Link} to='/Information'>
                <ListItemIcon>

                </ListItemIcon>
                <ListItemText primary="INFORMATION"/>
            </ListItem>
        </List>
      </List>
      <Divider />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBarContainer}>
        <h2>Project by U</h2>
        <h2>FACILITY STORE</h2>
        <Button color="inherit" onClick={props.handleClose}> Login </Button>
      </AppBar>

      
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>

        <Hidden xsDown implementation="css">
          <Drawer classes={{paper: classes.drawerPaper,}} variant="permanent" open>
            {drawer}
          </Drawer>
        </Hidden>
      </nav>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route path="/Search">
            <Search />
          </Route>
          <Route path="/Register">
            <Register />
          </Route>
          <Route path="/Withdraw">
            <Withdraw Usergid={props.Usergid}/>
          </Route>
          <Route path="/return">
            <Return Usergid={props.Usergid}/>
          </Route>
          <Route path="/History">
            <History />
          </Route>
          <Route path="/Infomation">
            <Information />
          </Route>
        </Switch>
      </main>

    </div>
  );
}

export default ResponsiveDrawer;