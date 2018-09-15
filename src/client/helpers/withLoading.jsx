import React, { Component } from 'react';
import { RequestController } from './RequestManager';

export default function withLoading(WrappedComponent) {
  return class extends Component {
    state = {
      loading: false,
      success: false,
    }

    componentWillUnmount() {
      if (this.state.loading) RequestController.abort();
    }

    startLoading = () => {
      this.setState({
        loading: true,
      });
    }

    stopLoading = (error) => {
      this.setState({
        loading: false,
        success: !error,
      });
    }

    render() {
      return (
        <WrappedComponent
          startLoading={this.startLoading}
          stopLoading={this.stopLoading}
          {...this.state}
        />
      );
    }
  };
}
