import React from 'react';
import ReactDOM from 'react-dom';
import Report from './views/Report';
import ReportList from './views/ReportList';

console.log(Report, ReportList);

class App extends React.Component {
  message = 'Comment ça va ?';

  render() {
    return (
      <h1>{this.message}</h1>
    );
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root'),
);
