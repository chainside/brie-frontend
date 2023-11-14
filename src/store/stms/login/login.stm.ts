import { StrictEffect } from '@redux-saga/types';
import { call, put } from "typed-redux-saga/macro";
import { StateMachine, bindStm, } from 'redux-sigma';
import { LoginEvents, UserInfoEvent, alreadyLoggedAction, errorServerLoginAction, failedLoginAction, userLogoutError, userLogoutSuccess } from './login.events';
import { loginCallerMachine } from "./loginCallerMachine.stm"
import { UserinfoInterface } from '../../../services/Login/api';
import { StateMachineNames } from '../StateMachinesNames';
import { checkAuth, logout } from '../../../services/Login/LoginServices';

interface Context {
  userInfo?: UserinfoInterface,
}



export enum LoginStates {
  starting = "starting",
  notLogged = 'not_logged',
  logged = 'logged',
  serverError = 'server_error',
  userLoggingOut = "user_logging_out",
  genericServerError= "login_generic_server_error"

}






export class LoginStateMachine extends StateMachine<
  LoginEvents,
  LoginStates,
  StateMachineNames,
  Context
> {
  initialState = LoginStates.starting;

  name = StateMachineNames.login;




  spec = {

    [LoginStates.starting]: {

      onEntry: this.checkOldToken,
      transitions: {

        [LoginEvents.needLogin]: LoginStates.notLogged,
        [LoginEvents.alreadyLogged]: LoginStates.logged,
        [LoginEvents.serverError]: LoginStates.serverError

      },
    },

    [LoginStates.notLogged]: {
      subMachines: [bindStm(loginCallerMachine, this.buildContext)],
      transitions: {
        [LoginEvents.serverError]: LoginStates.serverError,
        [LoginEvents.needLogin]: LoginStates.notLogged,
        [LoginEvents.loginSuccess]: {
          target: LoginStates.logged,
          command: [this.setUserInfo]
        }
      }
    },
    [LoginStates.logged]: {
      transitions: {
        [LoginEvents.userLogout]: LoginStates.userLoggingOut,
        [LoginEvents.serverError]: LoginStates.serverError,
        [LoginEvents.genericServerError]: LoginStates.genericServerError,
        [LoginEvents.unauthorized]: LoginStates.notLogged,

      }
    },
    [LoginStates.userLoggingOut]: {
      onEntry: this.logout,
      transitions: {
        [LoginEvents.userLogoutSuccess]: LoginStates.notLogged,
        [LoginEvents.userLogoutError]: LoginStates.logged
      }
    },
    [LoginStates.serverError]: {
      transitions: {
        [LoginEvents.toLogin]: LoginStates.notLogged
      }
    },
    [LoginStates.genericServerError]: {
      transitions: {
        [LoginEvents.toLogin]: LoginStates.notLogged,
        [LoginEvents.retry]: LoginStates.logged,
      }
    }
    

  };



  *checkOldToken(): Generator<StrictEffect, void> {
    try {

      const res = yield* call(checkAuth)

      if (res.data.statusCode) {

        yield* put(failedLoginAction())

      }
      else {
        yield* this.setContext(ctx => {
          ctx.userInfo = res.data


        });
        yield* put(alreadyLoggedAction())

      }

    }


    catch (e) {
      yield* put(errorServerLoginAction())

    }
  }

  *setUserInfo(event: UserInfoEvent): Generator<StrictEffect, void> {
    yield* this.setContext(ctx => {
      ctx.userInfo = event.payload
    })
  }



  *logout(): Generator<StrictEffect, void> {
    try {
      const res = yield* call(logout)
      if (res.data.statusCode === 204) {
        yield* put(userLogoutSuccess())
      }
      else {
        yield* put(userLogoutError())
      }

    } catch (e) {
      yield* put(userLogoutError())
    }
  }

  buildContext() {
    return loginCallerMachine.context ?? {
      email: "",
      password: "",
      user: {
        data: {
          company: {
            id: "",
            name: "",
            vatNumber: "",
            codeEori: "",
            businessName: "",
            legalResidence: "",
          }
        }
      },
      rememberMe: false,
      loginError: false,

    };

  }


}

export const loginMachine = new LoginStateMachine();
