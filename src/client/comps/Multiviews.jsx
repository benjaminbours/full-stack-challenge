import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';

/**
 * JSS style
 */
const styles = () => ({
  viewContainer: {
    width: '90%',
    margin: '30px auto',
  },
});

/**
 * Handle the responsability to manage the views and the links between them.
 * @reactProps {string} defaultView - A key to display one of the views params.
 * @reactProps {function} onSelected - A callback function trigger when the view change.
 * @reactProps {object} views - The list of views. Each view should have a name and a Component.
 * @reactProps {object} classes - The JSS classes.
 */
class Multiviews extends Component {
  /**
   * propTypes
   */
  static propTypes = {
    defaultView: PropTypes.string.isRequired,
    onSelected: PropTypes.func.isRequired,
    views: PropTypes.objectOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      view: PropTypes.func.isRequired,
    })).isRequired,
    classes: PropTypes.object.isRequired,
  };

  /**
   * @type {object}
   * @property {string} currentView The slug of the current view.
   */
  state = {
    currentView: this.props.defaultView,
  }

  /**
   * Update the current view
   * @param {string} slug The key of the view clicked
   */
  handleChangeView = (slug) => {
    const { onSelected } = this.props;

    onSelected();

    this.setState({
      currentView: slug,
    });
  }

  /**
   * render
   * @return {ReactElement} markup
   */
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
      <div>
        <AppBar position="static">
          <Tabs value={index}>
            {links}
          </Tabs>
        </AppBar>
        <div className={classes.viewContainer}>
          <View />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Multiviews);
