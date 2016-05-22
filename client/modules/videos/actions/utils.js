import { has, get } from 'lodash';

export const getThumbnailUrl = snippet => {
  const thumbnails = [ 'thumbnails.high.url', 'thumbnails.medium.url', 'thumbnails.default.url' ];
  return thumbnails.reduce((prev, curr) => {
    if (prev) {
      return prev;
    }
    return has(snippet, curr) ? get(snippet, curr, false) : false;
  }, false);
};

export const videoFormater = video => {
  const { snippet } = video;
  const formatedVideo = {};
  formatedVideo.id = video.id.videoId;
  formatedVideo.description = snippet.description;
  formatedVideo.title = snippet.title;
  formatedVideo.image = getThumbnailUrl(snippet);
  return formatedVideo;
};
