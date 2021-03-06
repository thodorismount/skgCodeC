import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import LoginAlert from './Alerts/LoginAlert';
import { updateAccount } from '../actions/profile';

//MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import EditBirthDate from './EditBirthDate';
import GenderSelector from '../components/GenderSelector';
import DeleteAccountModal from '../components/DeleteAccountModal';
import ChangePasswordModal from './ChangePasswordModal';
import moment from 'moment';
import Tooltip from '@material-ui/core/Tooltip';

import DialogActions from '@material-ui/core/DialogActions';
import { withRouter } from 'react-router-dom';
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
    password: '',
    firstName: props.firstName ? props.firstName : '',
    lastName: props.lastName ? props.lastName : '',
    birthDate: props.birthDate ? props.birthDate : '',
    gender: props.gender ? props.gender : ''
  });

  const onSubmit = e => {
    e.preventDefault();
    props.updateAccount(formData);
  };

  let testOpen = props.open;
  const [open, setOpen] = useState({ testOpen });

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleTextField = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { classes } = props;
  return (
    <Fragment>
      <Tooltip title='Manage account'>
        <IconButton
          color='primary'
          component='span'
          onClick={handleToggle}
          style={{
            position: 'absolute',
            left: '80%',
            top: '1%'
          }}
        >
          <SettingsIcon fontSize='large' />
        </IconButton>
      </Tooltip>

      <Dialog
        open={!open}
        onClose={handleToggle}
        aria-labelledby='form-dialog-title'
      >
        <form className={classes.form} onSubmit={e => onSubmit(e)}>
          <DialogTitle id='form-dialog-title'>
            <div
              style={{
                fontFamily: 'Bahnschrift Condensed',
                fontSize: '1.5rem'
              }}
            >
              Manage account
            </div>
          </DialogTitle>
          <DialogContent>
            <LoginAlert />
            <DialogContentText>
              <div
                style={{
                  fontFamily: 'Bahnschrift Condensed',
                  fontSize: '1.2rem'
                }}
              >
                Fill in your password first to edit your account details
              </div>
            </DialogContentText>
            <TextField
              id='confirmPassword'
              label='Enter your password'
              variant='outlined'
              type='password'
              autoComplete='new-password' //to disable autocomplete
              onChange={handleTextField}
              value={formData.password}
              margin='normal'
              name='password'
              autoFocus
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
              name='firstName'
              className={classes.textField}
              fullWidth
              type='text'
            />
            <TextField
              id='lastName'
              label='Last name'
              variant='outlined'
              onChange={handleTextField}
              value={formData.lastName}
              margin='normal'
              name='lastName'
              className={classes.textField}
              fullWidth
              type='text'
            />

            <table>
              <tbody>
                <tr>
                  <td>
                    <EditBirthDate
                      onChange={value =>
                        setFormData({
                          ...formData,
                          birthDate: moment(value).format('MM-DD-YYYY')
                        })
                      }
                      getDate={moment(formData.birthDate).format('DD-MM-YYYY')}
                    />
                  </td>
                  <td>
                    <GenderSelector
                      onChange={value =>
                        setFormData({ ...formData, gender: value })
                      }
                      gender={formData.gender}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <ChangePasswordModal />
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </DialogContent>
          <DialogActions>
            <DeleteAccountModal />
            <div style={{ flex: '1 0 0' }} />

            <Button
              color='primary'
              variant='outlined'
              size='medium'
              onClick={handleToggle}
              style={{
                fontFamily: 'Bahnschrift Condensed',
                fontSize: '1.1rem'
              }}
            >
              Cancel
            </Button>

            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.button}
              size='medium'
              style={{
                fontFamily: 'Bahnschrift Condensed',
                fontSize: '1.1rem'
              }}
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  );
};

ManageProfileModal.propTypes = {
  classes: PropTypes.object.isRequired,
  updateAccount: PropTypes.func.isRequired
};

export default connect(null, { updateAccount })(
  withStyles(styles)(withRouter(ManageProfileModal))
);
