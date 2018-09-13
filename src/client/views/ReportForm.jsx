import { fetch } from 'whatwg-fetch';
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

console.log(fetch);

const styles = () => ({
  input: {
    width: '100%',
  },
});

class ReportForm extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  state = {
    title: '',
    time: '07:30',
  }

  handleSubmitForm = async () => {
    if ('geolocation' in navigator) {
      const coordinate = await this.loadPosition();
      // const { title, time } = this.state;
      const report = {
        ...this.state,
        coordinate,
      };
      console.log(report);
      const response = await fetch(`${window.location.origin}/report`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(report),
      });
      const content = await response.json();
      console.log(content);
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
    this.setState({
      [name]: e.target.value,
    });
  }

  render() {
    const {
      classes,
    } = this.props;

    const { title, time } = this.state;

    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <TextField
            id="title"
            label="Titre"
            value={title}
            className={classes.input}
            onChange={this.handleChangeForm('title')}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="time"
            label="Heure"
            type="time"
            value={time}
            className={classes.input}
            onChange={this.handleChangeForm('time')}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={this.handleSubmitForm}>
            Send
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(ReportForm);
