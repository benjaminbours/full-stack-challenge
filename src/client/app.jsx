import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Typography from '@material-ui/core/Typography';
import { ReportForm, ReportList } from './views';
import Multiviews from './comps/Multiviews';

/**
 * message to display for the user if his device is not GPS capable.
 */
const messageNoGps = "Sorry, this device can't get GPS coordinate.";

/**
 * The app container
 */
export default class App extends Component {
  /**
   * Check the geolocation capability of the device.
   */
  constructor(props) {
    super(props);
    if ('geolocation' in navigator) {
      this.state.noGps = false;
    }
  }

  /**
   * @type {object}
   * @property {boolean} noGps is geolocalisation is impossible ?
   */
  state = {
    noGps: true,
  }

  /**
   * Callback function trigger when the view change
   */
  handleSelectedView = () => {
    // console.log('yo here');
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const { noGps } = this.state;
    return (
      <div>
        <Multiviews
          onSelected={this.handleSelectedView}
          defaultView="reportForm"
          views={{
            reportForm: {
              name: 'New Report',
              view: () => <ReportForm />,
            },
            reportList: {
              name: 'List of reports',
              view: () => <ReportList />,
            },
          }}
        />
        {noGps && (
          <Typography>
            {messageNoGps}
          </Typography>
        )}
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root'),
);
