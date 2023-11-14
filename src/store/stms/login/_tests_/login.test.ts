import { combineReducers } from 'redux';
import { SagaTester } from '@moveaxlab/redux-saga-tester';
import { stateMachineStarterSaga } from 'redux-sigma';
import { LoginStates, loginMachine } from '../login.stm';
import { LoginEvents, doLoginAction } from '../login.events';

import { mock, mockErr, notAuthResp } from './login.mock';
import { SubLoginStates, loginCallerMachine } from '../loginCallerMachine.stm';
import axiosInstance from '../../../../services/axiosConfig';
jest.mock('../../../../services/axiosConfig')


describe("Login flow, user not already logged", () => {


  const reducers = combineReducers({
    loginStateMachine: loginMachine.stateReducer,
    loginSubStateMachine: loginCallerMachine.stateReducer
  });
  const tester = new SagaTester({ reducers });

  const mockedAxios = jest.mocked(axiosInstance, true);

  tester.start(stateMachineStarterSaga, loginMachine, loginCallerMachine);
  test('Login state moves to logging', async () => {

    mockedAxios.mockResolvedValue(notAuthResp);

    tester.dispatch(loginMachine.start({}));

    await tester.waitFor(LoginEvents.needLogin);

    expect(tester.getState().loginStateMachine.state).toEqual(LoginStates.notLogged);

    mockedAxios.mockResolvedValue(mock);
    tester.dispatch(doLoginAction());

    expect(tester.getState().loginSubStateMachine.state).toEqual(SubLoginStates.logging);

  });

  test('Login state moves to logged', async () => {
    await tester.waitFor(LoginEvents.loginSuccess);
    expect(tester.getState().loginStateMachine.state).toEqual(LoginStates.logged);
  });

  test('Login context updated correctly', async () => {
    await tester.waitFor(LoginEvents.loginSuccess);
    expect(tester.getState().loginStateMachine.context?.userInfo).toBeDefined();
    expect(tester.getState().loginStateMachine.context?.userInfo?.company).toBe(mock.data.company);
    expect(tester.getState().loginStateMachine.context?.userInfo?.email).toBe("rick.doe@gmail.com");
    expect(tester.getState().loginStateMachine.context?.userInfo?.firstName).toBe("Rick");
    expect(tester.getState().loginStateMachine.context?.userInfo?.lastName).toBe("Doe");
    expect(tester.getState().loginStateMachine.context?.userInfo?.id).toBe("c7f73f4e-9dde-47c1-8063-a4f7d3a5ed13");
  });

  afterAll(() => {
    tester.dispatch(loginMachine.stop());
  })


})

describe("Login flow error", () => {

  const reducers = combineReducers({
    loginStateMachine: loginMachine.stateReducer,
    loginSubStateMachine: loginCallerMachine.stateReducer
  });
  const tester = new SagaTester({ reducers });

  const mockedAxios = jest.mocked(axiosInstance, true);

  tester.start(stateMachineStarterSaga, loginMachine, loginCallerMachine);
  test('Login state moves to logging', async () => {
    mockedAxios.mockResolvedValue(notAuthResp);

    tester.dispatch(loginMachine.start({}));

    await tester.waitFor(LoginEvents.needLogin);

    expect(tester.getState().loginStateMachine.state).toEqual(LoginStates.notLogged);

    mockedAxios.mockRejectedValue(mockErr)

    tester.dispatch(loginMachine.start({}));

    tester.dispatch(doLoginAction());

    expect(tester.getState().loginSubStateMachine.state).toEqual(SubLoginStates.logging);

  });

  test('Login state moves to starting, after failure', async () => {
    await tester.waitFor(LoginEvents.needLogin);
    expect(tester.getState().loginSubStateMachine.state).toEqual(SubLoginStates.starting);
    expect(tester.getState().loginStateMachine.state).toEqual(LoginStates.notLogged);
  });

  test('Login context updated correctly', async () => {
    await tester.waitFor(LoginEvents.needLogin);
    expect(tester.getState().loginSubStateMachine.context?.loginError).toBe(true);
  });


})