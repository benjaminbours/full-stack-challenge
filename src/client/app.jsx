import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Typography from '@material-ui/core/Typography';
import { ReportForm, ReportList } from './views';
import Multiviews from './Multiviews';

class App extends Component {
  constructor(props) {
    super(props);
    if ('geolocation' in navigator) {
      this.state.noGps = false;
    }
  }

  state = {
    noGps: true,
  }

  handleSelectedView = () => {
    // console.log('yo here');
  }

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
            {"Sorry, this device can't get GPS coordinate."}
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
