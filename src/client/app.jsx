import { fetch } from 'whatwg-fetch';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import Report from './views/Report';
import ReportForm from './views/ReportForm';
import ReportList from './views/ReportList';
import Multiviews from './Multiviews';

console.log(fetch);
// import './main.scss';

// console.log(Report, ReportList);

class App extends Component {
  handleSelectedView = () => {
    console.log('yo here');
  }

  render() {
    return (
      <Multiviews
        onSelected={this.handleSelectedView}
        defaultView="reportForm"
        views={{
          reportForm: {
            name: 'New Report',
            view: () => <ReportForm title="New report" />,
          },
          reportList: {
            name: 'List of reports',
            view: () => <ReportList title="List of reports" />,
          },
        }}
      />
    );
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root'),
);
