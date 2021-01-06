import React ,{ useState, useEffect }from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import { Form } from 'react-bootstrap';

    const columns = [ 
    // { 
    //     id: 'Picture', 
    //     label: 'Picture', 
    //     minWidth: 170 
    // },
    { 
        id: 'GID', 
        label: 'GID', 
        minWidth: 120 ,
        align: 'center',
    },
    { 
        id: 'PartCode', 
        label: 'Part Code', 
        minWidth: 170 
    },
    { 
        id: 'Values_number', 
        label: 'Values', 
        minWidth: 120 ,
        align: 'center',
    },
    {
        id: 'status',
        label: 'Status',
        minWidth: 150,
        align: 'center',
    },
    { 
        id: 'Date_time', 
        label: 'Date', 
        minWidth: 120 ,
        align: 'center',
    },
    ];

    const useStyles = makeStyles({
    root: {
      width: '100%',
      height: '100%',
    },
    container: {
      maxHeight: 1000,
    },
    txt: {
        margin: '20px'
    },
    scan: {
        height: 830
    }
  });

    function History() {
    const [data, setData] = useState([])
    const [q, setQ] = useState("")
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(12);

    useEffect(() => {
        fetch('http://localhost:3001/api/history')
        .then((response) => response.json())
        .then((json) => setData(json))
    },[]);

    function search(rows){
        return rows.filter((row) => 
            row.PartCode.toLowerCase().indexOf(q) > -1 || row.GID.toLowerCase().indexOf(q) > -1 
        )
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Form>
                            <Form.Group className={classes.txt} >
                                <Form.Control type="text" value={q} size="md" placeholder="Search" onChange={(e) => {setQ(e.target.value)}} />
                            </Form.Group>
                        </Form>
                        <Table stickyHeader aria-label="sticky table" >
                        <TableHead>
                            <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                                >
                                {column.label}
                                </TableCell>
                            ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {search(data).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                {columns.map((column) => {
                                    const value = row[column.id];
                                    return (
                                    <TableCell key={column.id} align={column.align}>
                                        {column.format && typeof value === 'number' ? column.format(value) : value}
                                    </TableCell>
                                    );
                                })}
                                </TableRow>
                            );
                            })}
                        </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 35, 100]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
            </Grid>
        </Grid>
    );
}

export default History
