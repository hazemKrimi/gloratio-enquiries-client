import { useState, useEffect, useCallback } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';

import {
  resetError,
  selectError,
  selectLoading,
  selectUser,
  edit,
  remove,
} from '../features/session/slice';

import { UserEditInput } from '../features/user/types';

import {
  Container,
  Toolbar,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import Navbar from '../components/Navbar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '1rem 0rem',
    },
    paper: {
      width: '100%',
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.shape.borderRadius,
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    grow: {
      flexGrow: 1,
    },
  })
);

const Settings: React.FC = () => {
  const classes = useStyles();
  const [dialog, setDialog] = useState<boolean>(false);

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const { enqueueSnackbar } = useSnackbar();

  const showEditErrors = useCallback(() => {
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
    showEditErrors();
  }, [showEditErrors]);

  const form = useFormik<Omit<UserEditInput, 'id'>>({
    initialValues: {
      firstName: user?.firstName as string,
      lastName: user?.lastName as string,
      email: user?.email as string,
      password: '',
      phone: user?.phone as string,
      address: user?.address as string,
      city: user?.city as string,
      country: user?.country as string,
      zip: user?.zip as number,
      role: 'customer',
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('First name is required'),
      email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
      password: Yup.string().min(6, 'Password is 6 caracters minimum'),
      phone: Yup.string().required('Phone is required'),
      address: Yup.string().required('Address is required'),
      city: Yup.string().required('City is required'),
      country: Yup.string().required('Country is required'),
      zip: Yup.number().required('Zip is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      try {
        dispatch(edit({ id: user?._id as string, ...values }));
      } finally {
        resetForm();
      }
    },
  });

  return (
    <>
      <Navbar />
      <Container maxWidth='xl' className={classes.root}>
        <Toolbar variant='dense' disableGutters={true}>
          <Typography gutterBottom variant='h4' component='h4'>
            Settings
          </Typography>
          <div className={classes.grow}></div>
        </Toolbar>
        <div className={classes.paper}>
          <Typography gutterBottom variant='h5' component='h5'>
            Profile
          </Typography>
          <form onSubmit={form.handleSubmit}>
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              id='firstName'
              label='First Name'
              name='firstName'
              autoComplete='firstName'
              value={form.values.firstName}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={!!form.touched.firstName && !!form.errors.firstName}
              helperText={form.touched.firstName && form.errors.firstName}
            />
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              id='lastName'
              label='Last Name'
              name='lastName'
              autoComplete='lastName'
              value={form.values.lastName}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={!!form.touched.lastName && !!form.errors.lastName}
              helperText={form.touched.lastName && form.errors.lastName}
            />
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              id='email'
              label='Email'
              name='email'
              autoComplete='email'
              value={form.values.email}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={!!form.touched.email && !!form.errors.email}
              helperText={form.touched.email && form.errors.email}
            />
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              name='password'
              label='New Password'
              type='password'
              id='Password'
              value={form.values.password}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={!!form.touched.password && !!form.errors.email}
              helperText={form.touched.password && form.errors.password}
            />
            <TextField
              variant='outlined'
              margin='normal'
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
            <TextField
              variant='outlined'
              margin='normal'
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
            <TextField
              variant='outlined'
              margin='normal'
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
            <TextField
              variant='outlined'
              margin='normal'
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
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
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
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              disabled={loading}
              className={classes.submit}
            >
              Update profile
            </Button>
          </form>
        </div>
        <div className={classes.paper}>
          <Typography gutterBottom variant='h5' component='h5'>
            Danger
          </Typography>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='secondary'
            className={classes.submit}
            onClick={() => setDialog(true)}
          >
            Delete account
          </Button>
        </div>
        <Dialog open={dialog} onClose={() => setDialog(false)}>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You will not be able to recover the account
            </DialogContentText>
            <DialogActions>
              <Button onClick={() => setDialog(false)} color='secondary'>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  dispatch(remove(user?._id as string));
                  setDialog(false);
                }}
                color='secondary'
              >
                Delete
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </Container>
    </>
  );
};

export default Settings;
