import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '700px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  buttonSignIn: {
    marginBottom: '10px',
    background: '#FF6D63',
    "&.MuiButton-contained": {
      color: "white"
    },
  },
  appBar: {
    position: 'static',
    borderRadius: 15,
    width: '100%',
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '4px 1px',
  },
  headingContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0px -100px',
  },
  heading: {
    color: '#FF6D63',
    fontFamily: '"Roboto", "Helvetica",serif',
    fontWeight: '600',
    textDecoration: 'none',
  },
  subHeading: {
    color: 'blue',
    fontStyle: 'italic',
    fontWeight: '500'
  },
  [theme.breakpoints.down('sm')]:{
    appBar: {
      padding: '4px',
    },
    heading:{
      fontSize: '20px',
      // marginRight: '40px',
    },
    subHeading: {
      fontSize: '14px'
    },
    image: {
      width: '120px',
      height: '100px',
      marginLeft: '5px',
    },
    toolbar: {
      width: "100px",
    }
  }
}));