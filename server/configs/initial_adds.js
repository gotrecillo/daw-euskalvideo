import {Posts, Videos} from '/lib/collections';

export default function () {
  if (!Posts.findOne()) {
    for (let lc = 1; lc <= 5; lc++) {
      const title = `This is the post title: ${lc}`;
      const content = `Post ${lc}'s content is great!`;
      Posts.insert({title, content});
    }
  }

  if (!Videos.findOne()) {
    for (let lc = 1; lc <= 5; lc++) {
      const title = `This is the video title: ${lc}`;
      const url = `this is the video url`;
      const featured = 1;
      Videos.insert({title, url, featured});
    }
  }
}
