import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import CreateformDialog from '../components/FormDialog';
import $ from 'jquery';
import '../re.css';
//MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';

// R.E. Components
import LoginAlert from '../components/Alerts/LoginAlert';

// Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; //type-checking variables
import { login } from '../actions/auth';
import { loginAlert } from '../actions/loginAlert';

// initialize MUI styles
const styles = {
  form: {
    textAlign: 'center'
  },
  pageTitle: {
    margin: '10px auto auto auto'
  },
  textField: {
    margin: '15px auto auto auto'
  },
  button: {
    margin: '10px 10px'
  },
  logo: {
    margin: '300px',
    height: 'auto',
    width: 'auto'
  },
  card: {
    padding: '10px',
    marginTop: '180px',
    backgroundColor: '#F0F2F5'
  }
};

const Login = props => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    var contents = $('#appbar')[0];
    contents.style.display = 'none';
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    props.login(loginData.email, loginData.password);
    setLoginData({});
  };

  const handleChange = event => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
  };

  const { classes } = props;

  if (props.isAuthenticated) {
    props.history.push('/home');
  }
  // Redirect if successfully logged in

  return (
    <Grid container className={classes.form}>
      <Grid item xs={6}>
        <img
          src='static/images/logo.png'
          width='180'
          height='180'
          style={{ marginTop: '250px' }}
        />
      </Grid>
      <Grid item xs={3}>
        <Card className={classes.card}>
          <LoginAlert />
          <Typography varient='h1' className={classes.pageTitle}>
            Please Login or Sign up
          </Typography>

          <form noValidate onSubmit={handleSubmit}>
            <TextField
              id='email'
              name='email'
              type='email'
              label='Email'
              variant='outlined'
              className={classes.textField}
              // helperText={errors.email}
              // error={errors.email ? true: false}
              value={loginData.email || ''}
              onChange={e => handleChange(e)}
              fullWidth
            />
            <TextField
              id='password'
              name='password'
              type='password'
              label='Password'
              variant='outlined'
              className={classes.textField}
              // helperText={errors.password}
              // error={errors.password ? true: false}
              value={loginData.password || ''}
              onChange={e => handleChange(e)}
              fullWidth
            />
            <Button
              type='submit'
              size='large'
              variant='contained'
              color='primary'
              className={classes.button}
            >
              Login
            </Button>
            <Divider variant='middle' className={classes.divider} />
          </form>
          <CreateformDialog />
        </Card>
      </Grid>

      <Grid item sm />
    </Grid>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  loginAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login, loginAlert })(
  withStyles(styles)(Login)
);
