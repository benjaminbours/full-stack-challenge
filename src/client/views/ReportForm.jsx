import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckIcon from '@material-ui/icons/Check';
import SendIcon from '@material-ui/icons/Send';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import green from '@material-ui/core/colors/green';
import RequestManager from '../helpers/RequestManager';
import withLoading from '../helpers/withLoading';
import PositionManager from '../helpers/PositionManager';

/**
 * JSS style
 */
const styles = () => ({
  input: {
    width: '100%',
  },
  containerButton: {
    position: 'relative',
    display: 'inline-block',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -12,
    marginTop: -12,
  },
  icon: {
    marginLeft: 10,
  },
});

const defaultFields = {
  title: {
    value: '',
    error: false,
    message: '',
  },
  time: {
    value: '',
    error: false,
    message: '',
  },
};

/**
 * View that display a report list
 * @reactProps {object} classes - The JSS classes.
 * @reactProps {boolean} loading - Is this component is loading ?.
 * @reactProps {boolean} success - Is this component has loaded with success ?.
 * @reactProps {function} startLoading - Function trigger when the list is fetch.
 * @reactProps {function} stopLoading - Function trigger when the list has fetched.
 */
class ReportForm extends Component {
  /**
   * propTypes
   */
  static propTypes = {
    classes: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired,
    startLoading: PropTypes.func.isRequired,
    stopLoading: PropTypes.func.isRequired,
  };

  /**
   * @type {object}
   * @property {{ value: string, error: boolean, message: string}} [slug] Object of field object.
   */
  state = JSON.parse(JSON.stringify(defaultFields));

  /**
   * Handle the submit of the form, manage the error if there are some,
   * or display indication of successfull request. Responsabilities
   * of this function can be segmented.
   */
  handleSubmitForm = async () => {
    let fields = this.state;
    const {
      startLoading,
      stopLoading,
      loading,
    } = this.props;

    if (loading) {
      return;
    }
    startLoading();
    const coordinate = await PositionManager.loadPosition();

    const keys = Object.keys(fields);
    const report = keys.reduce((object, item) => {
      const reportObject = object;
      reportObject[item] = fields[item].value;
      return reportObject;
    }, {});
    report.coordinate = coordinate;

    const content = await RequestManager.postNewReport(report);
    stopLoading(content.isJoi);

    if (content.isJoi) {
      for (let i = 0; i < content.details.length; i += 1) {
        const { message, context } = content.details[i];
        if (fields[context.key]) {
          fields[context.key].error = true;
          fields[context.key].message = message;
        }
      }
    } else {
      fields = JSON.parse(JSON.stringify(defaultFields));
    }

    this.setState({ ...fields });
  }

  /**
   * Update the fields value
   * @param {string} name The slug of the field
   * @param {SytheticEvent} e
   */
  handleChangeForm = name => (e) => {
    this.setState({
      [name]: {
        value: e.target.value,
        error: false,
      },
    });
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const {
      classes,
      loading,
      success,
    } = this.props;

    const { title, time } = this.state;

    const buttonClass = classNames({
      [classes.buttonSuccess]: success,
    });

    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <TextField
            id="title"
            label="Title"
            value={title.value}
            error={title.error}
            helperText={title.message}
            required
            className={classes.input}
            onChange={this.handleChangeForm('title')}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="time"
            label="Time"
            type="datetime-local"
            value={time.value}
            error={time.error}
            helperText={time.message}
            required
            className={classes.input}
            onChange={this.handleChangeForm('time')}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <div className={classes.containerButton}>
            <Button
              color="primary"
              variant="contained"
              onClick={this.handleSubmitForm}
              disabled={loading}
              className={buttonClass}
            >
              Send
              {success ? (
                <CheckIcon className={classes.icon} />
              ) : (
                <SendIcon className={classes.icon} />
              )}
            </Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default withLoading(
  withStyles(styles)(ReportForm),
);
