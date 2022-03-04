import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { resetUser, selectUser } from '../features/session/slice';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            Gloratio Enquiries
          </Typography>
          <>
            <Button color='inherit' onClick={() => navigate('/queries')}>
              Queries
            </Button>
            {user?.role === 'admin' && (
              <Button color='inherit' onClick={() => navigate('/users')}>
                Users
              </Button>
            )}
            {user?.role !== 'customer' && (
              <Button color='inherit' onClick={() => navigate('/tags')}>
                Tags
              </Button>
            )}
            <Button
              color='inherit'
              onClick={() => {
                dispatch(resetUser());
              }}
            >
              Logout
            </Button>
          </>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
