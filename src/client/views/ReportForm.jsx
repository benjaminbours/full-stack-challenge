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

class ReportForm extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired,
    startLoading: PropTypes.func.isRequired,
    stopLoading: PropTypes.func.isRequired,
  };

  state = JSON.parse(JSON.stringify(defaultFields));

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
    console.log(content);
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

  handleChangeForm = name => (e) => {
    this.setState({
      [name]: {
        value: e.target.value,
        error: false,
      },
    });
  }

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
            label="Titre"
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
            label="Heure"
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

const ReportFormStyled = withStyles(styles)(ReportForm);
export default withLoading(ReportFormStyled);
