import { StrictEffect } from '@redux-saga/types';
import { StateMachine, } from 'redux-sigma';
import { StateMachineNames } from '../StateMachinesNames';
import { call, put } from "typed-redux-saga/macro";
import { ChangeFilters, DashboardEvents, dashboardError, dashboardSuccess } from './dashboard.events';
import { DashboardInfoInterface } from '../../../services/Dashboard/api';
import { getDashboardInfo } from '../../../services/Dashboard/DashboardServices';
import { FilterDashboard } from '../../../types/types';
import { getCountries } from '../../../services/Company/CompanyServices';

interface Context {
  dashboardInfo?: DashboardInfoInterface,
  filter: FilterDashboard,
  coutries?: string[]
}



export enum DashboardStates {
  loadInfo = "load_dashboard_info",
  errorInfo = "error_dashboard_info",
  successInfo = "success_dashboard_info",

}

class DashboardMachine extends StateMachine<
  DashboardEvents,
  DashboardStates,
  StateMachineNames,
  Context
> {
  initialState = DashboardStates.loadInfo;

  name = StateMachineNames.dashboard;




  spec = {

    [DashboardStates.loadInfo]: {
      onEntry: this.getDashboardInfo,
      transitions: {
        [DashboardEvents.failure]: DashboardStates.errorInfo,
        [DashboardEvents.showInfo]: DashboardStates.successInfo
      },
    },
    [DashboardStates.errorInfo]: {
      transitions: {
        [DashboardEvents.retry]: DashboardStates.loadInfo
      }
    },
    [DashboardStates.successInfo]: {
      reactions: {
        [DashboardEvents.changeFilter]: this.filterDashboard,
      },
      transitions: {
        [DashboardEvents.failure]: DashboardStates.errorInfo
      },
    }

  };



  *getDashboardInfo(): Generator<StrictEffect, void> {
    try {


      const res = yield* call(getDashboardInfo, this.context.filter)
      if (!res) {
        yield* put(dashboardError())
      }
      else {
        yield* this.setContext(ctx => {
          ctx.dashboardInfo = res
        })


      }
      const coutries = yield* call(getCountries)
      if (!res) {
        yield* put(dashboardError())
      }
      else {
        yield* this.setContext(ctx => {
          ctx.coutries = coutries
        })

        yield* put(dashboardSuccess())
      }

    }

    catch (e) {
      yield* put(dashboardError())
    }
  }


  *filterDashboard(event: ChangeFilters): Generator<StrictEffect, void> {

    switch (event.payload.name) {
      case DashboardEvents.changeTimeFilter:
        yield* this.setContext(ctx => {
          ctx.filter.endCreationDateFilter = event.payload.value !== "0" ? new Date(event.payload.value.split(" - ")[1]) : undefined
          ctx.filter.startCreationDateFilter = event.payload.value !== "0" ? new Date(event.payload.value.split(" - ")[0]) : undefined
        })
        break
      case DashboardEvents.changeInCountryFilter:
        yield* this.setContext(ctx => {
          ctx.filter.entryCountry = event.payload.value !== "0" ? event.payload.value : undefined
        })
        break
      case DashboardEvents.changeOutCountryFilter:
        yield* this.setContext(ctx => {
          ctx.filter.destinationCountry = event.payload.value !== "0" ? event.payload.value : undefined
        })
        break
    }

    try {


      const res = yield* call(getDashboardInfo, this.context.filter)
      if (!res) {
        yield* put(dashboardError())
      }
      else {
        yield* this.setContext(ctx => {
          ctx.dashboardInfo = res
        })

      }
    }

    catch (e) {
      yield* put(dashboardError())
    }
  }
}

export const dashboardMachine = new DashboardMachine();
