import React, { Component, PropTypes } from 'react';
import { deepPurple900 } from 'material-ui/styles/colors';
import {Card, CardText} from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';

const styles = {
  cardText: { textAlign: 'center', margin: '1em 0 0 0' },
  card: { margin: '1em 0 0 0' }
};

export default class Spinner extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { style } = this.props;
    return (
      <Card style={Object.assign({}, styles.card, style)}>
        <CardText style={styles.cardText}>
          <CircularProgress color={deepPurple900} mode="indeterminate" size={2}/>
        </CardText>
      </Card>
    );
  }
}

Spinner.propTypes = {
  style: PropTypes.object
};
