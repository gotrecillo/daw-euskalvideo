export default {
  logIn({Meteor, LocalState, FlowRouter}, selector, password) {
    LocalState.set('LOGIN_ERROR', null);

    Meteor.loginWithPassword(selector, password, err => {
      if (err) {
        return LocalState.set('LOGIN_ERROR', 'Credenciales erroneas');
      }
      FlowRouter.go('/app');
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

    // We cant use callback when style is redirect
    // We use redirect style because mobile web browsers doesnt work otherwise
    providerMethod( err => {
      if (err) {
        return LocalState.set('LOGIN_ERROR', `Error en el login con ${provider}`);
      }
      // FlowRouter.go('/app');
    });
  },

  logout({Meteor, FlowRouter}) {
    Meteor.logout(() => {
      FlowRouter.go('/login');
    });
  },

  updateProfile({Meteor, LocalState}, imgUrl, displayName) {
    console.log('action');
    LocalState.set('UPDATED_PROFILE', false);
    Meteor.call('user.updateProfile', imgUrl, displayName, (err) => {
      if (err) {
        return LocalState.set('UPDATE_PROFILE_ERROR', 'Error al guardar los datos');
      }
      LocalState.set('UPDATED_PROFILE', true);
    });
  },

  clearErrors({LocalState}) {
    return LocalState.set('LOGIN_ERROR', null);
  }
};
