export const selectUser = (state) => state.auth.user;
export const selectLocation = (state) => state.auth.user.location;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;
export const selectIsError = (state) => state.auth.isError;
