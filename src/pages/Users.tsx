import { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useLocation, Navigate } from 'react-router-dom';

import { selectUser } from '../features/session/slice';
import {
  getAllUsers,
  selectUsers,
  selectLoading,
  selectError,
  resetError,
  add,
  remove,
  edit,
} from '../features/user/slice';

import { makeStyles } from '@material-ui/core/styles';

import { Container, CircularProgress } from '@material-ui/core';
import MaterialTable from 'material-table';
import Navbar from '../components/Navbar';

const useStyles = makeStyles({
  table: {
    margin: '1rem 0rem',
  },
});

function Users() {
  const classes = useStyles();
  const tableRef = useRef();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const location = useLocation();
  const users = useSelector(selectUsers);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const { enqueueSnackbar } = useSnackbar();

  const showUsersErrors = useCallback(() => {
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
    showUsersErrors();
  }, [showUsersErrors]);

  const getUsers = useCallback(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (user?.role === 'customer') {
    return <Navigate to='/queries' state={{ from: location }} replace />;
  }

  return (
    <>
      <Navbar />
      <Container maxWidth='xl'>
        <div className={classes.table}>
          {!loading ? (
            <MaterialTable
              title='Users'
              columns={[
                { title: 'Id', field: 'id', editable: 'never' },
                { title: 'First Name', field: 'firstName' },
                { title: 'Last Name', field: 'lastName' },
                { title: 'Email', field: 'email' },
                {
                  title: 'Password',
                  field: 'password',
                  editable: 'onAdd',
                  hidden: true,
                },
                { title: 'Phone', field: 'phone' },
                { title: 'Address', field: 'address' },
                { title: 'City', field: 'city' },
                { title: 'Country', field: 'country' },
                { title: 'Zip', field: 'zip', type: 'numeric' },
                {
                  title: 'Role',
                  field: 'role',
                  lookup: { customer: 'Customer', user: 'User' },
                },
              ]}
              tableRef={tableRef}
              data={users?.map((user) => ({
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
                phone: user.phone,
                address: user.address,
                city: user.city,
                country: user.country,
                zip: user.zip,
                role: user.role,
              }))}
              editable={{
                onRowAdd: async ({ id, ...values }) => {
                  dispatch(add({ ...values, password: '123456' }));
                },
                onRowUpdate: async (values) => {
                  dispatch(edit(values));
                },
                onRowDelete: async ({ id }) => {
                  dispatch(remove(id));
                },
              }}
            />
          ) : (
            <div
              style={{
                display: 'grid',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh',
              }}
            >
              <CircularProgress />
            </div>
          )}
        </div>
      </Container>
    </>
  );
}

export default Users;
