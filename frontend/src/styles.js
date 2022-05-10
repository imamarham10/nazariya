import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
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
        width: '70px',
        height: '70px',
        marginLeft: '40px',
      },
      mainContainer: {
        flexDirection: 'column-reverse',
      }
    }

  }));