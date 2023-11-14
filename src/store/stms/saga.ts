import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { loginMachine } from "./login/login.stm";
import { rootReducer } from "./store";
import { stateMachineStarterSaga } from "redux-sigma";
import { StrictEffect, put } from "redux-saga/effects";
import { stateMachines } from "./stms";


const sagaMiddleware = createSagaMiddleware();
export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

export type Store = ReturnType<typeof rootReducer>;
sagaMiddleware.run(stateMachineStarterSaga, ...stateMachines);

function* rootSaga(): Generator<StrictEffect, void> {

    yield put(loginMachine.start({}))
}

sagaMiddleware.run(rootSaga);