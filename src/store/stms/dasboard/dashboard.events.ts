import { createAction } from "@reduxjs/toolkit";

export enum DashboardEvents {
    failure = "dashboard_failure_event",
    showInfo = "dashboard_show_info_event",
    changeTimeFilter = "dashboard_change_time_filter",
    changeInCountryFilter = "dashboard_change_in_country",
    changeOutCountryFilter = "dashboard_change_out_country",
    changeFilter = "dashboard_change_filter",
    retry = "dashboard_retry"
}

export const changeFilterAction = createAction<{ name: DashboardEvents, value: string }>(DashboardEvents.changeFilter)
export const dashboardError = createAction(DashboardEvents.failure)
export const dashboardSuccess = createAction(DashboardEvents.showInfo)
export const dashboardRetryAction = createAction(DashboardEvents.retry)
export type ChangeFilters = ReturnType<typeof changeFilterAction>