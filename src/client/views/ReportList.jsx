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

const styles = () => ({
  buttonProgress: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    marginLeft: -12,
    marginTop: -12,
  },
});

class ReportList extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired,
    startLoading: PropTypes.func.isRequired,
    stopLoading: PropTypes.func.isRequired,
  };

  state = {
    items: [],
  }

  constructor(props) {
    super(props);
    this.getReports();
  }


  getReports = async () => {
    const { startLoading, stopLoading } = this.props;
    startLoading();
    const coordinate = await PositionManager.loadPosition();
    const items = await RequestManager.getReportList(coordinate);
    console.log(items);
    this.initialItems = items;
    this.setState({ items });
    stopLoading();
  }

  handleByTime = () => {
    const { items } = this.state;
    const newItems = items.sort((a, b) => {
      const aSplit = a.time.split(':');
      const bSplit = b.time.split(':');
      return (parseFloat(aSplit[0] * 10) - parseFloat(bSplit[0] * 10)
        + (parseFloat(aSplit[1]) - parseFloat(bSplit[1])));
    });
    this.setState({
      items: newItems,
    });
  }

  handleByDistance = () => {
    const { items } = this.state;
    const newItems = items.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
    this.setState({
      items: newItems,
    });
  }

  initialItems;

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
              onClick={this.handleByTime}
            >
              By time
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              color="primary"
              variant="contained"
              onClick={this.handleByDistance}
            >
              By distance
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          <List>
            {items.map(item => (
              <Report key={item.title} {...item} />
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

const ReportListStyled = withStyles(styles)(ReportList);
export default withLoading(ReportListStyled);
