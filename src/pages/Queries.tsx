import { useEffect, useRef, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { selectUser } from '../features/session/slice';
import {
  add,
  getAllQueries,
  getCustomerQueries,
  reply,
  resetError,
  selectError,
  selectLoading,
  selectQueries,
  tag,
} from '../features/query/slice';
import { selectTags } from '../features/tag/slice';

import { makeStyles } from '@material-ui/core/styles';

import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardHeader,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Input,
  Select,
  MenuItem,
  ListItemText,
  Checkbox,
} from '@material-ui/core';
import MaterialTable from 'material-table';
import Navbar from '../components/Navbar';

const useStyles = makeStyles({
  table: {
    margin: '1rem 0rem',
  },
  replies: {
    padding: '0.5rem',
  },
  reply: {
    maxWidth: '100%',
  },
});

function Queries() {
  const classes = useStyles();
  const tableRef = useRef();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const queries = useSelector(selectQueries);
  const tags = useSelector(selectTags);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const [replyDialogOpen, setReplyDialogOpen] = useState<boolean>(false);
  const [tagDialogOpen, setTagDialogOpen] = useState<boolean>(false);

  const { enqueueSnackbar } = useSnackbar();

  const showQueryErrors = useCallback(() => {
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
    showQueryErrors();
  }, [showQueryErrors]);

  const replyForm = useFormik({
    initialValues: {
      queryId: '',
      content: '',
    },
    validationSchema: Yup.object().shape({
      content: Yup.string().required('Reply content is required'),
    }),
    onSubmit: ({ queryId, content }, { resetForm }) => {
      try {
        dispatch(reply({ queryId, content }));
      } finally {
        setReplyDialogOpen(false);
        resetForm();
      }
    },
  });

  const tagForm = useFormik<{
    queryId: string;
    tags: Array<string>;
  }>({
    initialValues: {
      queryId: '',
      tags: [],
    },
    validationSchema: Yup.object().shape({
      tags: Yup.array().required('Reply content is required'),
    }),
    onSubmit: ({ queryId, tags }, { resetForm }) => {
      try {
        dispatch(tag({ queryId, tags }));
      } finally {
        setTagDialogOpen(false);
        resetForm();
      }
    },
  });

  const getQueries = useCallback(() => {
    dispatch(
      user?.role === 'customer' ? getCustomerQueries(user._id) : getAllQueries()
    );
  }, [user, dispatch]);

  useEffect(() => {
    getQueries();
  }, [getQueries]);

  return (
    <>
      <Navbar />
      <Dialog open={replyDialogOpen} onClose={() => setReplyDialogOpen(false)}>
        <DialogTitle>Reply</DialogTitle>
        <DialogContent>
          <form onSubmit={replyForm.handleSubmit}>
            <TextField
              fullWidth
              variant='filled'
              name='content'
              value={replyForm.values.content}
              onChange={replyForm.handleChange}
              onBlur={replyForm.handleBlur}
              error={!!replyForm.touched.content && !!replyForm.errors.content}
              helperText={replyForm.errors.content}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReplyDialogOpen(false)} color='primary'>
            Cancel
          </Button>
          <Button color='primary' onClick={() => replyForm.handleSubmit()}>
            Reply
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={tagDialogOpen} onClose={() => setTagDialogOpen(false)}>
        <DialogTitle>Tag</DialogTitle>
        <DialogContent>
          <form onSubmit={tagForm.handleSubmit}>
            <Select
              labelId='demo-mutiple-checkbox-label'
              id='demo-mutiple-checkbox'
              multiple
              name='tags'
              value={tagForm.values.tags}
              onChange={tagForm.handleChange}
              onBlur={tagForm.handleBlur}
              error={!!tagForm.touched.tags && !!tagForm.errors.tags}
              input={<Input fullWidth />}
              renderValue={(selected) =>
                (selected as Array<string>)
                  .map((tag) => tags.find((t) => t._id === tag)?.name)
                  .join(', ')
              }
            >
              {tags.map((tag) => (
                <MenuItem key={tag._id} value={tag._id}>
                  <Checkbox
                    checked={tagForm.values.tags.indexOf(tag._id) > -1}
                  />
                  <ListItemText primary={tag.name} />
                </MenuItem>
              ))}
            </Select>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTagDialogOpen(false)} color='primary'>
            Cancel
          </Button>
          <Button color='primary' onClick={() => tagForm.handleSubmit()}>
            Tag
          </Button>
        </DialogActions>
      </Dialog>
      <Container maxWidth='xl'>
        <div className={classes.table}>
          {!loading ? (
            <MaterialTable
              title='Queries'
              columns={[
                { title: 'Title', field: 'title', editable: 'onAdd' },
                { title: 'Subject', field: 'subject', editable: 'onAdd' },
                { title: 'Content', field: 'content', editable: 'onAdd' },
                user?.role !== 'customer'
                  ? {
                      title: 'Tags',
                      field: 'tags',
                      editable: 'never',
                      render: (rowData) =>
                        rowData.tags.map((t) => t.name).join(', '),
                    }
                  : {},
                user?.role !== 'customer'
                  ? {
                      title: 'Customer Name',
                      field: 'customerName',
                      defaultGroupOrder: 0,
                    }
                  : {},
              ]}
              tableRef={tableRef}
              data={queries.map((query) => ({
                id: query._id,
                title: query.title,
                subject: query.subject,
                content: query.content,
                replies: query.replies,
                tags: query.tags,
                customer: query.customer,
                customerId: query.customerId,
                customerName: `${query.customer.firstName} ${query.customer.lastName}`,
              }))}
              detailPanel={[
                {
                  tooltip: 'Replies',
                  render: (rowData) => (
                    <div className={classes.replies}>
                      <Grid container spacing={2}>
                        {rowData?.replies?.map((reply) => (
                          <Grid key={reply._id} item xs={12}>
                            <Card className={classes.reply}>
                              <CardHeader
                                subheader={`${reply.by.firstName} ${reply.by.lastName}`}
                              />
                              <CardContent>
                                <Typography>{reply.content}</Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                        ))}
                        <Grid item xs={12}>
                          <Grid item>
                            <Button
                              color='primary'
                              variant='contained'
                              onClick={() => {
                                replyForm.setFieldValue('queryId', rowData.id);
                                setReplyDialogOpen(true);
                              }}
                            >
                              Reply
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </div>
                  ),
                },
              ]}
              editable={{
                onRowAdd:
                  user?.role === 'customer'
                    ? async ({ title, subject, content }) => {
                        dispatch(add({ title, subject, content }));
                      }
                    : undefined,
              }}
              actions={[
                {
                  icon: 'refresh',
                  tooltip: 'Refresh Data',
                  isFreeAction: true,
                  onClick: () =>
                    dispatch(
                      user?.role === 'customer'
                        ? getCustomerQueries(user._id)
                        : getAllQueries()
                    ),
                },
                {
                  icon: 'tag',
                  tooltip: 'Tag',
                  hidden: user?.role === 'customer',
                  onClick: (_, rowData) => {
                    if (!Array.isArray(rowData)) {
                      tagForm.setFieldValue('queryId', rowData.id);
                      tagForm.setFieldValue(
                        'tags',
                        rowData.tags.map((t) => t._id)
                      );
                      setTagDialogOpen(true);
                    }
                  },
                },
              ]}
              options={{
                grouping: user?.role !== 'customer',
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

export default Queries;
