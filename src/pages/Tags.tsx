import { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useLocation, Navigate } from 'react-router-dom';

import { selectUser } from '../features/session/slice';
import {
  add,
  getAllTags,
  remove,
  resetError,
  selectError,
  selectLoading,
  selectTags,
} from '../features/tag/slice';

import { makeStyles } from '@material-ui/core/styles';

import { Container, CircularProgress } from '@material-ui/core';
import MaterialTable from 'material-table';
import Navbar from '../components/Navbar';

const useStyles = makeStyles({
  table: {
    margin: '1rem 0rem',
  },
});

function Tags() {
  const classes = useStyles();
  const tableRef = useRef();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const location = useLocation();
  const tags = useSelector(selectTags);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const { enqueueSnackbar } = useSnackbar();

  const showTagErrors = useCallback(() => {
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
    showTagErrors();
  }, [showTagErrors]);

  const getTags = useCallback(() => {
    dispatch(getAllTags());
  }, [dispatch]);

  useEffect(() => {
    getTags();
  }, [getTags]);

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
              title='Tags'
              columns={[
                { title: 'Id', field: 'id', editable: 'never' },
                { title: 'Name', field: 'name' },
              ]}
              tableRef={tableRef}
              data={tags.map((tag) => ({
                id: tag._id,
                name: tag.name,
              }))}
              editable={{
                onRowAdd: async ({ name }) => {
                  dispatch(add(name));
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

export default Tags;
