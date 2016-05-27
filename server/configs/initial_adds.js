import {Messages} from '/lib/collections';

export default function () {
  if (!Messages.findOne()) {
    for (let lc = 1; lc <= 5; lc++) {
      const date = new Date();
      const text = `This is the message text: ${lc}`;
      const creator = 'server';
      Messages.insert({text, creator, createdAt: date});
    }
  }
}
