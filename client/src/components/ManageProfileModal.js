import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import CreateSelectCountries from './selectCountry';
import MapsSelector from './MapsSelector';
import CreateUploadImage from './uploadImage';
import Alert from './Alerts/Alert';

//MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import Fab from '@material-ui/core/Fab';
import CreateDatePicker from '../components/DatePicker';
import CreateGenderSelector from '../components/GenderSelector';
// import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DialogActions from '@material-ui/core/DialogActions';
import { Link, withRouter } from 'react-router-dom';
import { createProfile } from '../actions/profile';
import { create } from 'lodash';
import { connect } from 'react-redux';

const styles = {
  button: {
    margin: '10px 10px'
  },
  pageTitle: {
    margin: '10px'
  },
  form: {
    alignItems: 'center'
  }
};

const ManageProfileModal = props => {
  const [formData, setFormData] = useState({
    visitedCountries: '',
    interests: '',
    location: ''
  });

  const onSubmit = e => {
    e.preventDefault();
    props.createProfile(formData, props.history);
    window.location.reload(false);
  };

  let testOpen = props.open;
  const [open, setOpen] = useState({ testOpen });

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleAutocomplete = v => {
    let t = v.map(val => val.label);
    setFormData({ ...formData, visitedCountries: t.join(',') });
  };

  const handleLocationChange = v => {
    setFormData({ ...formData, location: v.terms[0].value });
  };

  const handleTextField = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { classes } = props;
  return (
    <Fragment>
      <IconButton
        color='primary'
        title='Manage account'
        component='span'
        onClick={handleToggle}
      >
        <SettingsIcon fontSize='large' />
      </IconButton>
      <Dialog
        open={!open}
        onClose={handleToggle}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Manage account</DialogTitle>
        <DialogContent>
          <Alert />
          <form className={classes.form} onSubmit={e => onSubmit(e)}>
            <TextField
              id='firstName'
              label='First name'
              variant='outlined'
              onChange={handleTextField}
              value={formData.firstName}
              margin='normal'
              autoFocus
              name='firstName'
              className={classes.textField}
              style={{ width: '80%' }}
            />
            <TextField
              id='lastName'
              label='Last name'
              variant='outlined'
              onChange={handleTextField}
              value={formData.firstName}
              margin='normal'
              autoFocus
              name='firstName'
              className={classes.textField}
              fullWidth
            />
            <TextField
              id='firstName'
              label='First name'
              variant='outlined'
              onChange={handleTextField}
              value={formData.firstName}
              margin='normal'
              autoFocus
              name='firstName'
              className={classes.textField}
              fullWidth
            />
            <table>
              <tbody>
                <tr>
                  <td>
                    <CreateDatePicker
                      onChange={value =>
                        setFormData({ ...formData, birthDate: value })
                      }
                    />
                  </td>
                  <td>
                    <CreateGenderSelector
                      onChange={value =>
                        setFormData({ ...formData, gender: value })
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.button}
            size='medium'
          >
            Submit
          </Button>
          <Button
            color='primary'
            variant='outlined'
            size='medium'
            onClick={handleToggle}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

ManageProfileModal.propTypes = {
  classes: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired
};

export default connect(null, { createProfile })(
  withStyles(styles)(withRouter(ManageProfileModal))
);