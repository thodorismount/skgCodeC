import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
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
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import ManagePost from '../components/ManagePost';
import { connect } from 'react-redux';
import Like from '../components/LikeButton';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: '60%',
    marginBottom: '1.5rem',
    margin: '1rem'
    // marginLeft: '10%'
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  },
  titleFont: {
    fontSize: '1.25rem'
  },
  subheaderFont: {
    fontSize: '1rem',
    color: '#191919'
  }
}));

function PostCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Link
            to={`/userProfile/${props.user && props.user}`}
            style={{ textDecoration: 'none', color: '#000' }}
          >
            <Avatar
              aria-label='recipe'
              src='/static/images/girl_female_woman_avatar-512.png'
              className={classes.avatar}
            ></Avatar>
          </Link>
        }
        action={
          props.user === (props.authUser && props.authUser._id) ? (
            <ManagePost id = {props.id} />
          ) : null
        }
        title={
          <Link
            to={`/userProfile/${props.user && props.user}`}
            style={{ textDecoration: 'none', color: '#000' }}
          >
            {props.username}
          </Link>
        }
        subheader={`${props.location}, ${props.date}`}
        classes={{ title: classes.titleFont, subheader: classes.subheaderFont }}
        style={{ textTransform: 'capitalize' }}
      />
      <CardMedia className={classes.media} image={props.image} />
      <CardContent>
        <Typography variant='h6' component='p'>
          {props.caption}
        </Typography>
      </CardContent>
      <Divider variant='middle' />
      <CardActions disableSpacing>
        <IconButton onClick={() => props.like}
>
          <Like /> 
          {/* <Like like={false} */}
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <Typography paragraph>Comments...</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

const mapStateToProps = state => ({
  authUser: state.auth.user
});

export default connect(mapStateToProps)(PostCard);
