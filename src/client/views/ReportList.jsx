import React from 'react';
import PropTypes from 'prop-types';

const ReportList = ({ title }) => (
  <h1>{title}</h1>
);

ReportList.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ReportList;
