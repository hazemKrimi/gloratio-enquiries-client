import { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useLocation, Navigate } from 'react-router-dom';

import { selectUser } from '../features/session/slice';
import {
  add,
  getAllMeetings,
  resetError,
  selectError,
  selectLoading,
  selectMeetings,
} from '../features/meeting/slice';

import { makeStyles } from '@material-ui/core/styles';

import { Container, CircularProgress } from '@material-ui/core';
import MaterialTable from 'material-table';
import Navbar from '../components/Navbar';

const useStyles = makeStyles({
  table: {
    margin: '1rem 0rem',
  },
});

function Meetings() {
  const classes = useStyles();
  const tableRef = useRef();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const location = useLocation();
  const meetings = useSelector(selectMeetings);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const { enqueueSnackbar } = useSnackbar();

  const showMeetingErrors = useCallback(() => {
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
    showMeetingErrors();
  }, [showMeetingErrors]);

  const getMeetings = useCallback(() => {
    dispatch(getAllMeetings());
  }, [dispatch]);

  useEffect(() => {
    getMeetings();
  }, [getMeetings]);

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
              title='Meetings'
              columns={[
                { title: 'Id', field: 'id', editable: 'never' },
                { title: 'Date', field: 'date', type: 'date' },
                { title: 'Subject', field: 'subject' },
                { title: 'Notes', field: 'notes' },
              ]}
              tableRef={tableRef}
              data={meetings?.map((meeting) => ({
                id: meeting._id,
                date: meeting.date,
                subject: meeting.subject,
                notes: meeting.notes,
              }))}
              editable={{
                onRowAdd: async ({ date, subject, notes }) => {
                  dispatch(add({ date, subject, notes }));
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

export default Meetings;
