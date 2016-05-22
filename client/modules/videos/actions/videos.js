import { videoFormater } from './utils';

export default {
  searchInYoutube({LocalState, Youtube}, term) {
    LocalState.set('SEARCHED_VIDEOS', null);
    LocalState.set('SEARCHING_VIDEOS', true);
    LocalState.set('SEARCHING_ERROR', null);

    if (term.length === 0) {
      LocalState.set('SEARCHING_VIDEOS', false);
      return LocalState.set('SEARCHING_ERROR', null);
    }

    Youtube.search(term, 10, function (error, result) {
      if (error) {
        LocalState.set('SEARCHING_VIDEOS', false);
        return LocalState.set('SEARCHING_ERROR', 'Error en la busqueda');
      }
      const items = result.items;
      const videos = items
                      .filter(item => item.id.kind === 'youtube#video' )
                      .map(videoFormater);

      LocalState.set('SEARCHED_VIDEOS', videos);
      LocalState.set('SEARCHING_VIDEOS', false);
    });

  },

  clearErrors({LocalState}) {
    LocalState.set('SEARCHING_ERROR', null);
    LocalState.set('SEARCHING_VIDEOS', false);
    return LocalState.set('SEARCHED_VIDEOS', []);
  }
};
