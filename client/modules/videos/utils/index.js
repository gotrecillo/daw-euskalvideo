export const formatNomination = nomination => {
  return Object.assign({}, nomination, {
    id: nomination.youtubeId,
    description: nomination.comment
  });
};
