import React, {useState,useEffect} from 'react'
import { TextField, Paper, Button, Typography } from '@material-ui/core';
import FileBase from 'react-file-base64';
import useStyles from "./styles";
import { useDispatch,useSelector } from 'react-redux';
import { createPost,updatePost } from '../../redux/actions/posts';
import { useNavigate } from 'react-router';
const Form = ({ currentId, setCurrentId}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));

  const [postData, setPostData] = useState({
   title: '', message: '', tags: '', selectedFile: ''
  })

  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));

  useEffect(() => {
    if(post){
      setPostData(post);
    }
  }, [post]);

  const submitHandler = async (e)=>{
    e.preventDefault();
    if(currentId){
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
      clear();
    }else{
      dispatch(createPost({ ...postData, name: user?.result?.name },navigate));
      clear();
    }
    //     if (currentId === 0) {
    //   dispatch(createPost({ ...postData, name: user?.result?.name }));
    //   clear();
    // } else {
    //   dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
    //   clear();
    // }
  }
  const clear = ()=>{
    setCurrentId(0);
    setPostData({ title: '', message: '', tags: '', selectedFile: '' });
  }

  if(!user?.result?.name){
    return(
      <Paper className= {classes.paper}>
        <Typography variant="h6" align = "center"> Please Sign In to show your Nazariya and like others too! </Typography>
      </Paper>
    )
  }
  return (
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete = "off" noValidate className= {`${classes.form} ${classes.root}`} onSubmit={submitHandler}>
        <Typography variant='h6' className={classes.formHeading} style={{fontWeight: 600}}>{currentId ? `Editing ${post.title}` : 'Creating a Memory'}</Typography>
        {/* <TextField name='creator' style={{margin: '5px 0px'}} variant='outlined'  label="Creator" fullWidth value={postData.creator} onChange={(e)=>setPostData({...postData,creator: e.target.value})}/> */}
        <TextField name='title' style={{margin: '5px 0px'}} variant='outlined'  label="Title" fullWidth value={postData.title} onChange={(e)=>setPostData({...postData,title: e.target.value})}/>
        <TextField name='message' style={{margin: '5px 0px'}} multiline minRows={4} variant='outlined'  label="Message" fullWidth value={postData.message} onChange={(e)=>setPostData({...postData,message: e.target.value})}/>
        <TextField name='tags' style={{margin: '5px 0px'}} variant='outlined'  label="Tags(Comma seperated)" fullWidth value={postData.tags} onChange={(e)=>setPostData({...postData,tags: e.target.value.split(',')})}/>
        <div className={classes.fileInput}>
          <FileBase type= "file" multiple={false} onDone={({base64})=>setPostData({...postData,selectedFile: base64})}/>
        </div>
        <Button color="secondary" className={classes.buttonSubmit} variant = "contained" size='large' fullWidth type="submit">Submit</Button>
        <Button variant="contained" color="primary" size="medium"  fullWidth onClick={clear}>Clear</Button>
      </form>
    </Paper>
  )
}

export default Form;