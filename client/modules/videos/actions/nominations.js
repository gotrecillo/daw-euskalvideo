export default {
  createNomination({Meteor, LocalState}, title, youtubeId, comment) {
    LocalState.set('CREATE_NOMINATION_ERROR', null);
    LocalState.set('CREATED_NOMINATION', null);

    Meteor.call('nominations.create', title, youtubeId, comment, (err) => {
      if (err) {
        return LocalState.set('CREATE_NOMINATION_ERROR', 'Error al crear la nominacion');
      }
      LocalState.set('CREATED_NOMINATION', true);
    });
  },

  clearCreatedNominationFlag({LocalState}) {
    return LocalState.set('CREATED_NOMINATION', null);
  },

  clearErrors({LocalState}) {
    LocalState.set('CREATED_NOMINATION', null);
    return LocalState.set('CREATE_COMMENT_ERROR', null);
  }
};
