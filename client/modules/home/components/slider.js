import React from 'react';
import { CardText } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import { styles, getSliderStyles } from './styles';

export default class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resizeHandler: this._updateDimensions.bind(this)
    };
  }

  componentWillMount() {
    this._updateDimensions();
  }

  componentDidMount() {
    window.addEventListener('resize', this.state.resizeHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.state.resizeHandler);
  }

  _updateDimensions() {
    this.setState({ height: document.documentElement.clientHeight });
  }

  _handleTouchTap() {
    this.props.navigate('login');
  }

  render() {
    return (
      <CardText style={getSliderStyles(this.state.height)}>
        <Paper
          onTouchTap={this._handleTouchTap.bind(this)}
          style={styles.slider.paper}
          zDepth={5}>
          <img src="http://www.euskal.org/templates/gk_game/images/logo.png" alt="Euskal logo"/>
        </Paper>
      </CardText>
    );
  }
}
