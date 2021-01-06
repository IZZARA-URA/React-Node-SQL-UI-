import React, { useState } from 'react'
import axios from 'axios'
import { Form, InputGroup, FormControl, Col } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import html2canvas from 'html2canvas'

import QRCode from "qrcode.react";

const useStyles = makeStyles((theme) => ({
    container:{
        display:'flex',
        justifyContent:'space-start'
    },
    form:{
        //height:'80vh',
        margin: '8px'
    },
    capQr:{
        width:'60vh',
        margin: '8px',
        padding:'50px'
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
    }
}))

function Register(props) {
    const classes = useStyles();

    const [PartCode, setPartCode] = useState("")
    const [Brand, setBrand] = useState("none")
    const [Location_at, setLocation] = useState(null)
    const [Description, setDescription] = useState("none")
    const [Values, setValues] = useState("1")
    const [dow, setDow] = useState(true)

    

    const handlerSubmit = (e) => {
        if(PartCode == "" && Location_at == null) {
            console.error();
            return alert("Error! => Part Code & Location should be not empty")
        } else {
            axios.post('http://localhost:3001/api/insert', {
            PartCode : PartCode,
            Brand : Brand,
            Location_at : Location_at,
            Values : Values,
            Description : Description,
        }).then(
            setDow(true),
            alert("successfull insert")
        )//.then(window.location.reload(false))
        }
    }

    const download = () => {
        if(PartCode == "" && Location_at == null) {
            console.error();
            return alert("Error! => Part Code & Location should be not empty")
        } else {
        html2canvas(document.querySelector(`#capture`)).then(canvas => {
            let dataURL = canvas.toDataURL('image/png');
            var link = document.createElement('a');
            link.download = `${PartCode}.png`;
            link.href = dataURL;
            link.click();
         }).then(setDow(false))
        }
    }

    const handleOnChange = event => {
        const { value } = event.target;
        setPartCode(event.target.value.toUpperCase())
      };

    return (
        <Grid container className={classes.container} >
            <Paper  elevation={3} className={classes.form}>
            <Grid item xs={12} >
                <div className={classes.A}>
                    <Form>
                    <h1> Register </h1>
                        <Form.Group >
                            <Form.Control type="text" size="md" placeholder="Part Code" onChange={handleOnChange} />
                        </Form.Group>
                        <Form.Group >
                            <Form.Control type="text" size="md" placeholder="Brand" onChange={(e) => setBrand(e.target.value.toUpperCase())}/>
                        </Form.Group>
                        <Form.Row>
                            <Form.Group as={Col}>
                                    <Form.Control type="text" size="md" placeholder="Location" onChange={(e) => setLocation(e.target.value.toUpperCase())}/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                    <Form.Control type="number" size="md" placeholder="Values" onChange={(e) => setValues(e.target.value)}/>
                            </Form.Group>
                        </Form.Row>
                        {/*
                        <Form.Group >
                            <Form.File id="img" custom label="Image" onChange={onChangePicture}/>
                        </Form.Group>
                        */}
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>Description</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl as="textarea" size="md" aria-label="With textarea" onChange={(e) => setDescription(e.target.value)}/>
                        </InputGroup>

                    </Form>
                </div>
            </Grid>
            </Paper>

            <Paper  elevation={3} className={classes.capQr}>
            <Grid item xs={12} >
                <div>
                    <Form style={{ margin: '20px',}}>
                    <h1> QR Code </h1>
                        <div id={`capture`} className={classes.capture}>
                            
                            <QRCode
                                id="qr-gen"
                                value={PartCode}
                                size={350}
                                level={"H"}
                                includeMargin={true}
                            />
                        <h3>{PartCode}</h3>
                        <h3 style={{color:'white'}}>TEXT</h3>
                        </div>
                            {dow ? (
                            <div>
                                <Form.Group className={classes.add}>
                                    <Button variant="contained" fullWidth color="Primary" onClick={download}>
                                        download
                                    </Button>
                                </Form.Group>
                            </div>) : (
                            <div>
                                <Form.Group className={classes.add}>
                                    <Button variant="contained" fullWidth color="Primary" onClick={handlerSubmit}>
                                        Register
                                    </Button>
                                </Form.Group>
                            </div>)}
                        </Form>
                </div>
            </Grid>
            </Paper>
        </Grid>
    )
}

export default Register



