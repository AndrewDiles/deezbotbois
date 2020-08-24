// SETTINGS ACTIONS
// setting url:
export const updateUrl = (url) => ({
  type: 'URL_UPDATE',
  url: url
});
// setting nav bar location:
export const setNavLocation = (navLocation) => ({
  type: 'SET_NAV_LOCATION',
  navLocation: navLocation
});
// setting cell size:
export const setCellSize = (size) => ({
  type: 'SET_CELL_SIZE',
  size: size
});
// activating user tab in nav bar:
export const activateProfileTab = () => ({
  type: 'ACTIVATE_PROFILE_TAB',
});
// deactivating user tab in nav bar:
export const deactivateProfileTab = () => ({
  type: 'DEACTIVATE_PROFILE_TAB',
});
// hovering over user tab in nav bar:
export const hoverProfileTab = () => ({
  type: 'HOVER_PROFILE_TAB',
});
// communicating with server:
export const communicating = () => ({
  type: 'BEGIN_COMMUNICATING_WITH_SERVER',
});
// server communications successful:
export const communicationsSuccessful = () => ({
  type: 'COMMUNICATIONS_WITH_SERVER_SUCCESSFUL',
});
// server communications failed:
export const communicationsFailed = (error) => ({
  type: 'COMMUNICATIONS_WITH_SERVER_FAILURE',
  error: error
});

// USER ACTIONS
// receiving user info from server:
export const receiveUserInfo = (userInfo) => ({
  type: 'RECEIVE_USER_INFO',
  userInfo: userInfo
});
export const logOut = () => ({
	type: 'LOG_OUT'
});
// update user's nav location preference:
export const updateNavPref = (navLocation) => ({
  type: 'UPDATE_NAV_LOCATION_PREFERENCE',
  navLocation: navLocation
});
export const increaseBitCount = (bitIncrease, currentTime) => ({
  type: 'INCREASE_BIT_COUNT',
	bitIncrease: bitIncrease,
	currentTime: currentTime,
});
export const replaceUserInfo = (newUserInfo) => ({
	type: 'REPLACE_USER_INFO',
	newUserInfo: newUserInfo,
});