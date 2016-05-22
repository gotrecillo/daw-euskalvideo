export default {
  createNomination({Meteor, LocalState}, title, youtubeId, image, comment) {
    LocalState.set('CREATE_NOMINATION_ERROR', null);
    LocalState.set('CREATED_NOMINATION', null);

    Meteor.call('nominations.create', title, youtubeId, image, comment, (err) => {
      if (err) {
        return LocalState.set('CREATE_NOMINATION_ERROR', 'Error al crear la nominacion');
      }
      LocalState.set('CREATED_NOMINATION', true);
    });
  },

  loadMoreNominations({LocalState}) {
    const nominationsShown = LocalState.get('NOMINATIONS_SHOWN') || 10;
    LocalState.set('NOMINATIONS_SHOWN', nominationsShown + 10);
  },

  clearCreatedNominationFlag({LocalState}) {
    return LocalState.set('CREATED_NOMINATION', null);
  },

  clearErrors({LocalState}) {
    LocalState.set('NOMINATIONS_SHOWN', 10);
    LocalState.set('CREATED_NOMINATION', null);
    return LocalState.set('CREATE_COMMENT_ERROR', null);
  }
};
