import { fetch } from 'whatwg-fetch';
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckIcon from '@material-ui/icons/Check';
import SendIcon from '@material-ui/icons/Send';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import green from '@material-ui/core/colors/green';

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
  };

  state = {
    loading: false,
    noGps: false,
    success: false,
    fields: JSON.parse(JSON.stringify(defaultFields)),
  }

  handleSubmitForm = async () => {
    if ('geolocation' in navigator) {
      let { loading, fields, success } = this.state;

      if (loading) {
        return;
      }

      this.setState({
        loading: true,
      });

      const coordinate = await this.loadPosition();

      const keys = Object.keys(fields);
      const report = keys.reduce((object, item) => {
        const reportObject = object;
        reportObject[item] = fields[item].value;
        return reportObject;
      }, {});
      report.coordinate = coordinate;

      const response = await fetch(`${window.location.origin}/report`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(report),
      });
      const content = await response.json();

      if (content.isJoi) {
        for (let i = 0; i < content.details.length; i += 1) {
          const { message, context } = content.details[i];
          if (fields[context.key]) {
            fields[context.key].error = true;
            fields[context.key].message = message;
          }
        }
        loading = false;
      } else {
        loading = false;
        success = true;
        fields = JSON.parse(JSON.stringify(defaultFields));
      }

      this.setState({ fields, loading, success });
    } else {
      this.setState({
        noGps: true,
      });
    }
  }

  loadPosition = async () => {
    try {
      const position = await this.getCurrentPosition();
      const { latitude, longitude } = position.coords;
      return { latitude, longitude };
    } catch (error) {
      return error;
    }
  }

  getCurrentPosition = (options = {}) => new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  })

  handleChangeForm = name => (e) => {
    const { fields } = this.state;
    fields[name] = {
      value: e.target.value,
      error: false,
    };
    this.setState({ fields });
  }

  render() {
    const { classes } = this.props;
    const { loading, noGps, success } = this.state;
    const { title, time } = this.state.fields;

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
            type="time"
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
        {noGps && (
          <Grid item xs={12}>
            <Typography>
              {"Sorry, this device can't get GPS coordinate."}
            </Typography>
          </Grid>
        )}
      </Grid>
    );
  }
}

export default withStyles(styles)(ReportForm);
