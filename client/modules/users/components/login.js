import React from 'react';
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import { capitalize, throttle } from 'lodash';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const styles = {
  card: {
    maxWidth: '800px',
    margin: '1em auto'
  }
};

export default class Login extends React.Component {

  constructor(props) {
    super(props);
  }

  _handleLogIn() {
    const isValid = () => this._validate();
    const userName = this.refs.user.getValue();
    const password = this.refs.password.getValue();
    if (isValid()) {
      this.props.logIn(userName, password);
    }
  }

  _validate() {
    const { inputs } = this.props;
    const inputValidations = inputs.map(input => this._checkInputAndSetError(input));

    return inputValidations.every(inputValidation => inputValidation === true);
  }

  _checkInputAndSetError({ref, errorText}) {
    const isValid = this._checkInput(ref);
    if (!isValid) {
      this._setInputError(ref, errorText);
    }
    return isValid;
  }

  _checkInput(ref) {
    return this.refs[ref].getValue() !== '';
  }

  _setInputError(ref, errorText) {
    this.refs[ref].setState({errorText});
  }

  _handleLogInWith(provider) {
    this.props.logInWith(provider);
  }

  _handleInputFocus(ref) {
    this._setInputError(ref, '');
    this.props.clearErrors();
  }

  _getProviderButton(provider, color) {
    return (
      <RaisedButton
        key={provider}
        backgroundColor={color}
        labelStyle={{color: 'white'}}
        label={`Log in with ${capitalize(provider)}`}
        labelPosition="after"
        onTouchTap={throttle(this._handleLogInWith).bind(this, provider)}
        icon={<FontIcon className={`fa fa-${provider}`} />}
      />
    );
  }

  render() {
    const { providers, inputs, error } = this.props;
    return (
      <Card style={styles.card}>
        <CardTitle
          title="Welcome to Euskal Videos"
          titleColor={'orange'}
          style={{textAlign: 'center'}}
        />
        <CardText style={{textAlign: 'center'}}>
          <img src="http://www.euskal.org/templates/gk_game/images/logo.png" alt="euskalMovies-logo"/>
        </CardText>
        <CardText>
          {
            inputs.map(input => (
              <TextField
                key={input.ref}
                ref={input.ref}
                type={input.type}
                floatingLabelText={input.label}
                floatingLabelFixed
                fullWidth
                onFocus={this._handleInputFocus.bind(this, input.ref)}
              />
            ))
          }
        </CardText>
        <CardText style={{textAlign: 'center', color: 'red'}}>
          {error}
        </CardText>
        <CardText style={{textAlign: 'center'}}>
          <RaisedButton
            label="Log In"
            onTouchTap={throttle(this._handleLogIn).bind(this)}
            primary/>
        </CardText>
        <CardActions style={{textAlign: 'center'}}>
          {
            providers.map(provider => this._getProviderButton(provider.provider, provider.color))
          }
        </CardActions>
      </Card>
    );
  }

}
