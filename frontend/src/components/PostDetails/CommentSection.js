import React, { useState, useRef} from "react";
import { Typography,TextField, Button } from "@material-ui/core";
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { commentPost } from "../../redux/actions/posts";

const CommentSection = ({post}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const user = JSON.parse(localStorage.getItem('profile'));
    const commentsRef = useRef();

    const handleClick = async () => {
        const final = `${user.result.name} : ${comment}`;
        const newComments = await dispatch(commentPost(final,post._id));
        setComments(newComments);
        setComment('');
        commentsRef.current.scrollIntoView({ behaviour: 'smooth' });
    }
    //console.log(post);
    return (
      <div>
        <div className={classes.commentsOuterContainer}>
          <div className={classes.commentsInnerContainer}>
            <Typography gutterBottom variant="h6">
              Comments
            </Typography>
            {comments.map((c, i) => (
              <Typography key={i} variant="subtitle1" gutterBottom>
                <strong>{c.split(': ')[0]}</strong>
                {c.split(':')[1]}
              </Typography>
            ))}
            <div ref={commentsRef}/>
          </div>
          {(user?.result?.name &&
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="h6">
              Write a Comment
            </Typography>
            <TextField
              fullWidth
              minRows={4}
              variant="outlined"
              label="Comment"
              multiline
              value={comment} onChange={(e) => setComment(e.target.value)}/>
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!comment}
              variant="contained"
              onClick={handleClick}
              color = "primary"
            >
              Comment
            </Button>
          </div>
          )}
        </div>
      </div>
    );
}

export default CommentSection;