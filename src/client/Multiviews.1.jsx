import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Multiviews extends Component {
  static propTypes = {
    defaultView: PropTypes.string.isRequired,
    onSelected: PropTypes.func.isRequired,
    views: PropTypes.objectOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      view: PropTypes.func.isRequired,
    })).isRequired,
  };

  state = {
    currentView: this.props.defaultView,
  }

  handleChangeView = (slug) => {
    const { onSelected } = this.props;
    // console.log(slug);

    onSelected();

    this.setState({
      currentView: slug,
    });
  }

  render() {
    const { views } = this.props;
    const { currentView } = this.state;

    const arrViews = Object.entries(views);

    const links = arrViews.map((item) => {
      const slug = item[0];
      const { name } = item[1];
      return (
        <li key={slug}>
          <button type="button" onClick={() => this.handleChangeView(slug)}>
            {name}
          </button>
        </li>
      );
    });

    const View = views[currentView].view;

    return (
      <div>
        <ul className="nav-list">
          {links}
        </ul>
        <View />
      </div>
    );
  }
}
