export default {
  createMessage({Meteor, LocalState}, message) {
    LocalState.set('SEND_MESSAGE_ERROR', null);
    Meteor.call('message.create', message, err => {
      if (err) {
        return LocalState.set('SEND_MESSAGE_ERROR', 'Error al guardar el mensaje');
      }
    });
  },

  clearErrors({LocalState}) {
    return LocalState.set('SEND_MESSAGE_ERROR', null);
  }
};
