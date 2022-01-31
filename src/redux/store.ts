import {createStore, combineReducers, applyMiddleware, Store} from 'redux';
import thunkMiddleware from 'redux-thunk'

import {reducer as launchSiteReducer} from './launch-site/reducer';

import {createWrapper} from 'next-redux-wrapper';
import {LaunchSiteState} from './launch-site/state';

export interface AppState {
  launchSite: LaunchSiteState
}


const initStore = (initialState: any) => {
  return createStore(combineReducers({
    launchSite: launchSiteReducer
  }), initialState )
}

export const wrapper = createWrapper<Store<AppState>>(initStore, {debug: true})
