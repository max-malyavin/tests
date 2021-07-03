export const userSelectors = {
  isLoading(state) {
    return state.user.isLoading;
  },
  userData(state) {
    return state.user.data;
  },
};
