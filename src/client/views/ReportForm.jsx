import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

// if ('geolocation' in navigator) {
//   navigator.geolocation.getCurrentPosition((position) => {
//     console.log(position);
//   });
// } else {
//   alert("Le service de géolocalisation n'est pas disponible sur votre ordinateur.");
// }

const styles = () => ({
  input: {
    width: '100%',
  },
});

class ReportForm extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  test = 'yo';

  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <TextField
            id="title"
            label="Titre"
            // value={this.state.name}
            value="yo"
            className={classes.input}
          // onChange={this.handleChange('name')}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="time"
            label="Heure"
            type="time"
            defaultValue="07:30"
            className={classes.input}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(ReportForm);
