import React, {useState,useEffect} from 'react'
import { TextField, Paper, Button, Typography } from '@material-ui/core';
import FileBase from 'react-file-base64';
import useStyles from "./styles";
import { useDispatch,useSelector } from 'react-redux';
import { createPost,updatePost } from '../../redux/actions/posts';
const Form = ({ currentId, setCurrentId}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [postData, setPostData] = useState({
    creator: '', title: '', message: '', tags: '', selectedFile: ''
  })
  const post = useSelector((state)=> currentId? state.posts.find((p)=>p._id === currentId):null);
  useEffect(() => {
    if(post){
      setPostData(post);
    }
  }, [post]);
  const submitHandler = async (e)=>{
    e.preventDefault();
    if(currentId){
      dispatch(updatePost(currentId,postData));
      clear();
    }else{
      dispatch(createPost(postData));
      clear();
    }
  }
  const clear = ()=>{
    setCurrentId(0);
    setPostData({ creator:'', title: '', message: '', tags: '', selectedFile: '' });
  }
  return (
    <Paper className={classes.paper}>
      <form autoComplete = "off" noValidate className= {`${classes.form} ${classes.root}`} onSubmit={submitHandler}>
        <Typography variant='h6' className={classes.formHeading} style={{fontWeight: 600}}>{currentId ? `Editing ${post.title}` : 'Creating a Memory'}</Typography>
        <TextField name='creator' style={{margin: '5px 0px'}} variant='outlined'  label="Creator" fullWidth value={postData.creator} onChange={(e)=>setPostData({...postData,creator: e.target.value})}/>
        <TextField name='title' style={{margin: '5px 0px'}} variant='outlined'  label="Title" fullWidth value={postData.title} onChange={(e)=>setPostData({...postData,title: e.target.value})}/>
        <TextField name='message' style={{margin: '5px 0px'}} variant='outlined'  label="Message" fullWidth value={postData.message} onChange={(e)=>setPostData({...postData,message: e.target.value})}/>
        <TextField name='tags' style={{margin: '5px 0px'}} variant='outlined'  label="Tags" fullWidth value={postData.tags} onChange={(e)=>setPostData({...postData,tags: e.target.value.split(',')})}/>
        <div className={classes.fileInput}>
          <FileBase type= "file" multiple={false} onDone={({base64})=>setPostData({...postData,selectedFile: base64})}/>
        </div>
        <Button color="secondary" className={classes.buttonSubmit} variant = "contained" size='large' fullWidth type="submit">Submit</Button>
        <Button variant="contained" color="primary" size="medium"  fullWidth onClick={clear}>Clear</Button>
      </form>
    </Paper>
  )
}

export default Form