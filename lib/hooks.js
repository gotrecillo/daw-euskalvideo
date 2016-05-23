import {Likes, Nominations} from './collections';

Likes.after.insert(function (userId, doc) {
  Nominations.update(
    {_id: doc.idNomination},
    {$inc: { likes: 1 }}
  );
});

Likes.after.remove(function (userId, doc) {
  Nominations.update(
    {_id: doc.idNomination},
    {$inc: { likes: -1 }}
  );
});

Likes.before.insert(function (userId, doc) {
  const {idNomination} = doc;
  const isLiked = Likes.findOne( { userId, idNomination } );
  const existsNomination = Nominations.findOne({_id: idNomination});
  if (isLiked || !existsNomination) {
    return false;
  }
});


Likes.before.remove(function (userId, doc) {
  const {idNomination} = doc;
  const isLiked = Likes.findOne( { userId, idNomination } );
  const existsNomination = Nominations.findOne({_id: idNomination});
  if (isLiked && existsNomination) {
    return true;
  }
  return false;
});
