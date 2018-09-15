import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

/**
 * JSS style
 */
const styles = () => ({
  root: {
    boxShadow: '0px 1px 2px 1px grey',
    margin: '20px 0',
    flexDirection: 'column',
  },
});

/**
 * Controlled component, display the report's data.
 * @reactProps {object} classes - The JSS classes.
 * @reactProps {string} title - The title.
 * @reactProps {string} time - The date time string.
 * @reactProps {number} distance - the distance beetween the user and the report in km.
 */
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
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  distance: PropTypes.number.isRequired,
};

export default withStyles(styles)(Report);
