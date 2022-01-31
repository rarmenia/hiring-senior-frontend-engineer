import { LaunchSiteState } from "./state";

export const SET_LAUNCH_SITE = '[Launch Site] set';

// @ts-ignore
export const setLaunchSite = (newState: LaunchSiteState) => {
  return {type: SET_LAUNCH_SITE, newState}
};


export type LaunchSiteActions = typeof SET_LAUNCH_SITE;
