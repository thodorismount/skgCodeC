import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SendIcon from '@material-ui/icons/Send';
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';
import Divider from '@material-ui/core/Divider';
import ManagePost from '../components/ManagePost';
import { connect } from 'react-redux';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { addLike, removeLike, addComment } from '../actions/post';
import CommentItem from './posts/CommentItem';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import '../re.css';

import defaultAvatar from '../components/empty_avatar.png';
const useStyles = makeStyles(theme => ({
  root: {
    minWidth: '60%',
    marginBottom: '1.5rem',
    margin: '1rem',
    fontFamily: 'Bahnschrift Condensed'
    // marginLeft: '10%'
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    // marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    backgroundColor: '#F0F2F5'
  },
  titleFont: {
    fontSize: '1.5rem',
    fontFamily: 'Bahnschrift Condensed'
  },
  subheaderFont: {
    fontSize: '1rem',
    color: '#191919',
    fontFamily: 'Bahnschrift Condensed'
  },
  button: {
    marginTop: '1rem',
    paddingLeft: '0.5rem'
  },
  textfield: {
    margin: '1rem 1.5rem',
    marginLeft: '0',
    fontFamily: 'Bahnschrift Condensed'
  }
}));

function PostCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [state, setState] = useState({});
  const [disabled, setDisabled] = useState({ disabled: false });

  const checkLiked = () => {
    if (props.likes && props.likes.length > 0) {
      for (let i = 0; i < props.likes.length; i++) {
        if (props.likes[i].user === (props.authUser && props.authUser._id)) {
          setState({ liked: true });
          break;
        } else {
          setState({ liked: false });
        }
      }
    } else {
      setState({ liked: false });
    }
  };

  useEffect(() => {
    checkLiked();
  }, []);

  const handleLike = () => {
    setDisabled({ disabled: true });
    setInterval(() => {
      setDisabled({ disabled: false });
    }, 4000);
    props.addLike(props.id);
    setState({ liked: true });
  };

  const handleUnlike = () => {
    setDisabled({ disabled: true });
    setInterval(() => {
      setDisabled({ disabled: false });
    }, 4000);
    props.removeLike(props.id);
    setState({ liked: false });
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const commentSubmit = e => {
    e.preventDefault();
    console.log(formData.text);
    props.addComment(props.id, formData);
    setFormData({ text: '' });
  };

  const [formData, setFormData] = useState({ text: '' });

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Link href={`/userProfile/${props.user && props.user}`}>
            <Avatar
              aria-label='recipe'
              src={`${props.avatar ? props.avatar : defaultAvatar}`}
              className={classes.avatar}
            ></Avatar>
          </Link>
        }
        action={
          props.user === (props.authUser && props.authUser._id) ? (
            <ManagePost
              id={props.id}
              image={props.image}
              text={props.caption}
              location={props.location}
            />
          ) : null
        }
        title={
          <Link
            href={`/userProfile/${props.user && props.user}`}
            color='inherit'
            style={{ fontFamily: 'Bahnschrift Condensed' }}
          >
            {props.username}
          </Link>
        }
        subheader={`${props.location}, ${props.date}`}
        classes={{ title: classes.titleFont, subheader: classes.subheaderFont }}
        style={{
          textTransform: 'capitalize',
          fontFamily: 'Bahnschrift Condensed'
        }}
      />
      <CardMedia className={classes.media} image={props.image} />
      <CardContent>
        <Typography
          variant='h6'
          component='p'
          style={{ fontFamily: 'Bahnschrift Condensed' }}
        >
          {props.caption}
        </Typography>
      </CardContent>
      <Divider variant='middle' />
      <CardActions disableSpacing>
        {/* like buttons  */}
        {!state.liked ? (
          <IconButton onClick={handleLike} disabled={disabled.disabled}>
            <FavoriteBorder style={{ color: '#000' }} />
          </IconButton>
        ) : (
          <IconButton onClick={handleUnlike} disabled={disabled.disabled}>
            <Favorite style={{ color: 'rgba(238,1,1,1)' }} />
          </IconButton>
        )}

        {props.likes && props.likes.length > 0 ? (
          <Typography
            variant='h5'
            color='textPrimary'
            style={{ fontFamily: 'Bahnschrift Condensed' }}
          >
            {props.likes && props.likes.length}
          </Typography>
        ) : (
          <div />
        )}
        <Divider
          orientation='vertical'
          flexItem
          style={{ marginLeft: '12px' }}
        />
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ModeCommentOutlinedIcon style={{ color: 'black' }} />
        </IconButton>
        {props.comments && props.comments.length > 0 ? (
          <Typography
            variant='h5'
            color='textPrimary'
            style={{ fontFamily: 'Bahnschrift Condensed' }}
          >
            {props.comments && props.comments.length}
          </Typography>
        ) : (
          <div />
        )}
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          {props.comments && props.comments.length > 0 ? (
            <List
              dense={true}
              className='raised'
              style={{
                backgroundColor: 'rgba(240, 242, 245, 40%)',
                borderRadius: '2%'
              }}
            >
              {props.comments &&
                props.comments.length > 0 &&
                props.comments.map(comment => (
                  <CommentItem
                    key={comment._id}
                    comment={comment}
                    postId={props.id}
                  />
                ))}
            </List>
          ) : (
            <div />
          )}
          <form
            id='comment-input'
            onSubmit={commentSubmit}
            // style={{ paddingBottom: '1rem' }}
          >
            <TextField
              fullWidth
              className={classes.textfield}
              id='comments'
              value={formData.text}
              name='comments'
              multiline
              rows={1}
              margin='normal'
              variant='outlined'
              placeholder='Add a comment'
              label='Comment'
              onChange={e => setFormData({ text: e.target.value })}
              required
              rowsMax={5}
              InputLabelProps={{ required: false }}
            />

            <IconButton
              type='submit'
              justify='right'
              variant='contained'
              color='primary'
              size='medium'
              disabled={formData.text.trim() === ''}
            >
              <SendIcon fontSize='large' />
            </IconButton>
          </form>
        </CardContent>
      </Collapse>
    </Card>
  );
}

const mapStateToProps = state => ({
  authUser: state.auth.user
});

export default connect(mapStateToProps, { addLike, removeLike, addComment })(
  PostCard
);
