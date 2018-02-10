import React, { Component } from 'react';
import { withStyles, Grid } from 'material-ui';
import Page from '../../components/Page';

import VerifyEmailCard from './VerifyEmailCard';
import AddFirstStellarAccountCard from './AddFirstStellarAccountCard';

import { inject, observer } from 'mobx-react';

const styles = theme => ({});

@inject('rootStore')
@observer
class DashboardPage extends Component {
  verifyEmailCard() {
    if (this.props.rootStore.sessionStore.currentUser.hasVerifiedEmail) {
      return null;
    }

    return (
      <Grid item sm={12} md={9}>
        <VerifyEmailCard />
      </Grid>
    );
  }

  addFirstStellarAccountCard() {
    return (
      <Grid item sm={12} md={9}>
        <AddFirstStellarAccountCard />
      </Grid>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <Page>
        <Grid container spacing={24} justify="space-around">
          {this.verifyEmailCard()}
          {this.addFirstStellarAccountCard()}
        </Grid>
      </Page>
    );
  }
}

export default withStyles(styles)(DashboardPage);
