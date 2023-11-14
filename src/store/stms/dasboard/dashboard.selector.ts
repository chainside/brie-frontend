import { createSelector } from "@reduxjs/toolkit";
import { Store } from "../saga";

const selectDashboardStore = (store: Store) => store.dashboard.context
const selectDashboardState = (store: Store) => store.dashboard.state


export const dashboardInfoSelector = createSelector(selectDashboardStore, (ctx) => ctx?.dashboardInfo)
export const dashboardStateSelector = createSelector(selectDashboardState, (state) => state)
export const dashboardFilterSelector = createSelector(selectDashboardStore, (ctx) => ctx?.filter)
export const dashboardCountriesSelector = createSelector(selectDashboardStore, (ctx) => ctx?.coutries)

