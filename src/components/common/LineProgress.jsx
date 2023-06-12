import React, { Component } from 'react';
import { withStyles } from '@mui/styles';
import { LinearProgress } from '@mui/material';

class ColoredLinearProgress extends Component {
  render() {
    const { classes } = this.props;
    return (
      <LinearProgress
        {...this.props}
        classes={{
          colorPrimary: classes.colorPrimary,
          barColorPrimary: classes.barColorPrimary,
          top:classes.top
        }}
        style={{ 
          top: 0,
          width: "100%",
          zIndex: 99999,
          position: "fixed",
       }}
      />
    );
  }
}

const styles = {
  colorPrimary: {
    backgroundColor: '#000000'
  },
  barColorPrimary: {
    backgroundColor: '#03a9f4'
  },
    // top:{
    //   position:"fixed",
    //   top:0
    // }

};

export default withStyles(styles)(ColoredLinearProgress);