import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  appBar: {
    borderRadius: 15,
    margin: '10px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
  },
  image: {
    marginLeft: '15px',
  },
  textfeild:{
      alignContent:'center',
      width:'650px',
      height:'650px',
      marginTop:'30px'
  },
  input:{
    width:'650px',
    height:'250px',
    marginTop:'30px'
    },
    textArea:{
        marginTop:'20px',
        padding:'10px',
        fontSize:'20px'
    },
    button:{
        marginTop:'10px'
    }
}));