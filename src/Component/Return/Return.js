import React , { useState } from 'react'
import QrReader from 'react-qr-scanner'
import Button from '@material-ui/core/Button';
import Axios from 'axios'
import { Form } from 'react-bootstrap';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container:{
        display:'flex',
        justifyContent:'space-start'
    },
    form:{
        height:'100%',
        margin: '8px',
        padding:'12px',
        display:'flex',
        justifyContent:'space-around'
    },
    capQr:{
        width:'65vh',
        margin: 'auto',
        padding:'15px'
    },
    add: {
        '& > *': {
            padding: '10px',
            marginTop: '24px'},
    },
    Form: {
        marginTop: '16px'
    },
    A :{
        margin: '20px',
        display:'flex'
    },
    capture:{
        
        height:'440px',
        //backgroundColor:'green',
        borderStyle:'solid',
        borderRadius:'10px',
        borderBlockColor:''
    },
    rootBtn: {
        '& > *': {
          margin: theme.spacing(0.1),
        },display: 'flex',padding:'20px'
    },
}));
  
function Return(props) {
    const [result, setResult] = useState('No result')
    const [values, setValues] = useState('1')
    const classes = useStyles();

    const ToStore = (e) => {
        Axios.put('http://localhost:3001/api/updateToStore', {
          result: result,
          values: values,
         }).then(() => {
           console.log('to store')
         }).then(() => {
           setResult('OK!')
         }).then(window.location.reload(false))

         Axios.post('http://localhost:3001/api/historyToStore', {
          result: result,
          values: values,
          GID: props.Usergid,
        }).then(() => {
          console.log('History To Store')
        })
    }

    return (
        <Grid container>
            <h1>Return...</h1>
            <Grid container className={classes.container} >
                <Paper  elevation={3} className={classes.form}>
                    <Grid item xs={5} >
                    <QrReader
                    delay={4000}
                    onError={err => console.log(err)}
                    onScan={(data) => setResult(data)}
                    style={{ width: '100%'}}/>
                    </Grid>
                <Paper  elevation={3} className={classes.capQr} >
                    <Grid item xs={8} >
                        <div style={{display:'flex',justifyContent:'flex-start'}}>
                            <h3> PART CODE : {result} </h3>
                        </div>
                        <div className={classes.rootBtn}>
                            <Grid item={4}>
                                <Form > 
                                    <Form.Group>
                                        <Form.Control type="number" size="md" placeholder="Values" onChange={(e) => setValues(e.target.value)}/>
                                    </Form.Group>
                                </Form>
                            </Grid>
                            <Grid item={4}>
                                <Button  variant="contained" color="Primary" onClick={ToStore}> Return
                                </Button>
                            </Grid>
                        </div>
                    </Grid>
                </Paper>

                </Paper>
            </Grid>
        </Grid>

    )
}

export default Return


