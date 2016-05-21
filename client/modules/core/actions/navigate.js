export default {
  navigate({FlowRouter}, path) {
    FlowRouter.go(`/${path}`);
  }
};
