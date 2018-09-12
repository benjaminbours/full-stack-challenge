import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  viewContainer: {
    width: '90%',
    margin: '30px auto',
  },
});

class Multiviews extends Component {
  static propTypes = {
    defaultView: PropTypes.string.isRequired,
    onSelected: PropTypes.func.isRequired,
    views: PropTypes.objectOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      view: PropTypes.func.isRequired,
    })).isRequired,
    classes: PropTypes.object.isRequired,
  };

  state = {
    currentView: this.props.defaultView,
  }

  handleChangeView = (slug) => {
    const { onSelected } = this.props;

    onSelected();

    this.setState({
      currentView: slug,
    });
  }

  render() {
    const { views, classes } = this.props;
    const { currentView } = this.state;

    const arrViews = Object.entries(views);

    let index;

    const links = arrViews.map((item, i) => {
      const slug = item[0];
      const { name } = item[1];
      if (slug === currentView) index = i;
      return (
        <Tab
          onClick={() => this.handleChangeView(slug)}
          key={slug}
          label={name}
        />
      );
    });

    const View = views[currentView].view;

    return (
      <>
        <AppBar position="static">
          <Tabs value={index}>
            {links}
          </Tabs>
        </AppBar>
        <div className={classes.viewContainer}>
          <View />
        </div>
      </>
    );
  }
}

export default withStyles(styles)(Multiviews);
