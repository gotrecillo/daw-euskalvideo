export default {
  logIn({Meteor, LocalState, FlowRouter}, selector, password) {
    LocalState.set('LOGIN_ERROR', null);

    Meteor.loginWithPassword(selector, password, err => {
      if (err) {
        return LocalState.set('LOGIN_ERROR', 'Credenciales erroneas');
      }
      FlowRouter.go('/');
    });
  },

  logInWith({Meteor, LocalState, FlowRouter}, provider) {
    LocalState.set('LOGIN_ERROR', null);

    const loginMethods = {
      twitter: Meteor.loginWithTwitter,
      facebook: Meteor.loginWithFacebook,
      google: Meteor.loginWithGoogle
    };

    const providerMethod = loginMethods[provider];

    providerMethod( err => {
      if (err) {
        return LocalState.set('LOGIN_ERROR', `Error en el login con ${provider}`);
      }
      FlowRouter.go('/');
    });
  },

  logout({Meteor}) {
    Meteor.logout();
  },

  clearErrors({LocalState}) {
    return LocalState.set('LOGIN_ERROR', null);
  }
};