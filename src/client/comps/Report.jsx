import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  root: {
    boxShadow: '0px 1px 2px 1px grey',
    margin: '20px 0',
    flexDirection: 'column',
  },
});

const Report = ({
  title,
  time,
  distance,
  classes,
}) => {
  const timeObj = new Date(time);
  return (
    <ListItem className={classes.root}>
      <Typography>{`Title: ${title}`}</Typography>
      <Typography>{`Distance: ${distance} km`}</Typography>
      <Typography>{`Date: ${timeObj.getDay()}/${timeObj.getMonth()}/${timeObj.getFullYear()} ${timeObj.getHours()}h${timeObj.getMinutes()}min`}</Typography>
    </ListItem>
  );
};

Report.propTypes = {
  // id: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  distance: PropTypes.number.isRequired,
};

export default withStyles(styles)(Report);
