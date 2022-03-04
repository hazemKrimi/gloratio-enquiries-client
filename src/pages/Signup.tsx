import { useEffect, useCallback } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';
import * as Yup from 'yup';

import {
  resetError,
  selectError,
  selectLoading,
  signup,
} from '../features/session/slice';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const { enqueueSnackbar } = useSnackbar();

  const showSignupErrors = useCallback(() => {
    if (error) {
      enqueueSnackbar(error, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
        autoHideDuration: 2000,
      });

      setTimeout(() => dispatch(resetError()), 2000);
    }
  }, [enqueueSnackbar, dispatch, error]);

  useEffect(() => {
    showSignupErrors();
  }, [showSignupErrors]);

  const form = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phone: '',
      address: '',
      city: '',
      country: '',
      zip: undefined,
      role: 'customer',
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('First name is required'),
      email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password is 6 caracters minimum'),
      phone: Yup.string().required('Phone is required'),
      address: Yup.string().required('Address is required'),
      city: Yup.string().required('City is required'),
      country: Yup.string().required('Country is required'),
      zip: Yup.number().required('Zip is required'),
    }),
    onSubmit: ({ ...values }, { resetForm }) => {
      try {
        dispatch(signup({ ...values }));
      } finally {
        resetForm();
      }
    },
  });

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={form.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='given-name'
                name='firstName'
                required
                fullWidth
                id='firstName'
                label='First Name'
                value={form.values.firstName}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={!!form.touched.firstName && !!form.errors.firstName}
                helperText={form.touched.firstName && form.errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id='lastName'
                label='Last Name'
                name='lastName'
                value={form.values.lastName}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={!!form.touched.lastName && !!form.errors.lastName}
                helperText={form.touched.lastName && form.errors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                value={form.values.email}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={!!form.touched.email && !!form.errors.email}
                helperText={form.touched.email && form.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='new-password'
                value={form.values.password}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={!!form.touched.password && !!form.errors.email}
                helperText={form.touched.password && form.errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='phone'
                label='Phone'
                name='phone'
                autoComplete='phone'
                value={form.values.phone}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={!!form.touched.phone && !!form.errors.phone}
                helperText={form.touched.phone && form.errors.phone}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='address'
                label='Address'
                name='address'
                autoComplete='address'
                value={form.values.address}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={!!form.touched.address && !!form.errors.address}
                helperText={form.touched.address && form.errors.address}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='city'
                label='City'
                name='city'
                autoComplete='city'
                value={form.values.city}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={!!form.touched.city && !!form.errors.city}
                helperText={form.touched.city && form.errors.city}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='country'
                label='Country'
                name='country'
                autoComplete='country'
                value={form.values.country}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={!!form.touched.country && !!form.errors.country}
                helperText={form.touched.country && form.errors.country}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type='number'
                id='zip'
                label='Zip'
                name='zip'
                autoComplete='zip'
                value={form.values.zip}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={!!form.touched.zip && !!form.errors.zip}
                helperText={form.touched.zip && form.errors.zip}
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            disabled={loading}
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Signup
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link to='/login'>Already have an account? Login</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
