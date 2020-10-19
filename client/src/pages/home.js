import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Create from '@material-ui/icons/Create';

export class home extends Component {
    render() {
        return (
            <Grid container spacing={16}>
             <Grid item sm={8} xs={12}>
                <p>Posts...</p>
            </Grid>
             <Grid item sm={4} xs={12}>
                 <Button color='inherit' variant="outlined" >
                 <Create /> &nbsp; Create Post
                 </Button>
             </Grid>
            </Grid>
        )
    }
}

export default home