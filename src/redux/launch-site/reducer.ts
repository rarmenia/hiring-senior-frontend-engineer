import {LaunchSiteState} from './state';
import {SET_LAUNCH_SITE} from './actions';
import {AnyAction} from 'redux';

export const initialState: LaunchSiteState = {
  launchSite: undefined,
}

export const reducer = (state: LaunchSiteState = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_LAUNCH_SITE:
      return action.newState;
    default:
      return state;
  }
}
