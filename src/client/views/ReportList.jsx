import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Report from '../comps/Report';
import RequestManager from '../helpers/RequestManager';
import PositionManager from '../helpers/PositionManager';
import withLoading from '../helpers/withLoading';

/**
 * JSS style
 */
const styles = () => ({
  buttonProgress: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    marginLeft: -12,
    marginTop: -12,
  },
});

/**
 * View that display a report list
 * @reactProps {object} classes - The JSS classes.
 * @reactProps {boolean} loading - Is this component is loading ?.
 * @reactProps {boolean} success - Is this component has loaded with success ?.
 * @reactProps {function} startLoading - Function trigger when the list is fetch.
 * @reactProps {function} stopLoading - Function trigger when the list has fetched.
 */
class ReportList extends Component {
  /**
   * propTypes
   */
  static propTypes = {
    classes: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired,
    startLoading: PropTypes.func.isRequired,
    stopLoading: PropTypes.func.isRequired,
  };

  /**
   * @type {object}
   * @property {array} items An array of report to display.
   */
  state = {
    items: [],
  }

  /**
   * Constructor trigger getReports
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.getReports();
  }

  /**
   * Fetch reports from server api.
   */
  getReports = async () => {
    const { startLoading, stopLoading } = this.props;
    startLoading();
    const coordinate = await PositionManager.loadPosition();
    const items = await RequestManager.getReportList(coordinate);
    console.log(items);
    this.setState({ items });
    stopLoading();
  }

  /**
   * Sort reports by time
   */
  handleSortByTime = () => {
    const { items } = this.state;
    const newItems = items.sort((a, b) => {
      const aTime = new Date(a.time).getTime();
      const bTime = new Date(b.time).getTime();
      return aTime - bTime;
    });
    this.setState({
      items: newItems,
    });
  }

  /**
   * Sort reports by distance
   */
  handleSortByDistance = () => {
    const { items } = this.state;
    const newItems = items.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
    this.setState({
      items: newItems,
    });
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const { classes, loading } = this.props;
    const { items } = this.state;

    return (
      <div className={classes.root}>
        <Grid container spacing={16}>
          <Grid item xs={6}>
            <Button
              color="primary"
              variant="contained"
              onClick={this.handleSortByTime}
            >
              By time
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              color="primary"
              variant="contained"
              onClick={this.handleSortByDistance}
            >
              By distance
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          <List>
            {items.map(item => (
              <Report key={item.id} {...item} />
            ))}
            {!loading && items.length === 0 && (
              <Typography>Sorry, no report around 10km</Typography>
            )}
          </List>
        </Grid>
      </div>
    );
  }
}

export default withLoading(
  withStyles(styles)(ReportList),
);
