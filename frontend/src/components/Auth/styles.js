import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#FF6D63',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
      margin: '10px 0',
      backgroundColor: '#FF6D63',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#e35840',
    },
    // margin: theme.spacing(3, 0, 2),
  },
  googleButton: {
      background: "primary",
      marginBottom: theme.spacing(2),
  },
}));


