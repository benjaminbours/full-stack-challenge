// export default class Report extends React.Component
import React from 'react';
import PropTypes from 'prop-types';

const Report = ({
  id, title, time, position,
}) => (
  <div id={id} className="report">
    <h2>{title}</h2>
    <span className="time">{time}</span>
    <div className="position">
      <p>{`Latitude: ${position.x}`}</p>
      <p>{`Longitude: ${position.y}`}</p>
    </div>
  </div>
);

Report.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.instanceOf(Date).isRequired,
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
};

export default Report;
