import { combineReducers } from 'redux';
import { SagaTester } from '@moveaxlab/redux-saga-tester';
import { stateMachineStarterSaga } from 'redux-sigma';
import { DashboardStates, dashboardMachine } from '../dashboard.stm';
import axiosInstance from '../../../../services/axiosConfig';
import waitForExpect from 'wait-for-expect';
import { mockDashboardInfo, mockErr } from './dashboard.mock';
import { DashboardEvents, changeFilterAction, dashboardError, dashboardSuccess } from '../dashboard.events';
jest.mock('../../../../services/axiosConfig')

describe("Dashboard info", () => {

  const reducers = combineReducers({
    dashboardMachine: dashboardMachine.stateReducer,
  });
  const tester = new SagaTester({ reducers });

  const mockedAxios = jest.mocked(axiosInstance, true);

  tester.start(stateMachineStarterSaga, dashboardMachine);
  test('Failing dashboard info loading', async () => {
    mockedAxios.mockRejectedValue(mockErr);
    tester.dispatch(dashboardMachine.start({
      dashboardInfo: {
        count: 0,
        closed: 0,
        deliveredTotal: 0,
        avgTime: 0,
        prwsYearCount: 0,
        prwsYearClosed: 0,
        prwsYearDeliveredTotal: 0,
        prwsYearAvgTime: 0,
        tradeTrends: [],
        quantityTrends: [],
        categoryTrends: []
      },
      filter: {}
    }));
    await waitForExpect(() => {
      tester.dispatch(dashboardError())
      waitForExpect(() => { expect(tester.getState().dashboardMachine.state).toBe(DashboardStates.errorInfo); });
    })
    tester.dispatch(dashboardMachine.stop());
  });

  test('Dashboard info succesfully loading', async () => {
    tester.dispatch(dashboardMachine.stop());
    mockedAxios.mockResolvedValue(mockDashboardInfo);
    tester.dispatch(dashboardMachine.start({
      dashboardInfo: {
        count: 0,
        closed: 0,
        deliveredTotal: 0,
        avgTime: 0,
        prwsYearCount: 0,
        prwsYearClosed: 0,
        prwsYearDeliveredTotal: 0,
        prwsYearAvgTime: 0,
        tradeTrends: [],
        quantityTrends: [],
        categoryTrends: []
      },
      filter: {}
    }));
    await waitForExpect(() => {
      tester.dispatch(dashboardSuccess())
      expect(tester.getState().dashboardMachine.state).toBe(DashboardStates.successInfo)
    })
  });

  test('Dashboard changing filters', async () => {
    mockedAxios.mockResolvedValue(mockDashboardInfo);
    tester.dispatch(changeFilterAction({
      name: DashboardEvents.changeInCountryFilter,
      value: "IT"
    }))
    tester.dispatch(changeFilterAction({
      name: DashboardEvents.changeOutCountryFilter,
      value: "DE"
    }))
    tester.dispatch(changeFilterAction({
      name: DashboardEvents.changeTimeFilter,
      value: "Tue Mar 07 2023 00:00:00 GMT+0100 (Central European Standard Time) - Thu Sep 07 2023 15:13:01 GMT+0200 (Central European Summer Time)"
    }))
    await waitForExpect(() => {
      expect(tester.getState().dashboardMachine.context?.filter.entryCountry).toBe("IT")
      expect(tester.getState().dashboardMachine.context?.filter.destinationCountry).toBe("DE")
      expect(tester.getState().dashboardMachine.context?.filter.startCreationDateFilter).toStrictEqual(new Date("Tue Mar 07 2023 00:00:00 GMT+0100 (Central European Standard Time)"))
      expect(tester.getState().dashboardMachine.context?.filter.endCreationDateFilter).toStrictEqual(new Date("Thu Sep 07 2023 15:13:01 GMT+0200 (Central European Summer Time)"))
    })
  });

  afterAll(() => {
    tester.dispatch(dashboardMachine.stop());
  })

})

