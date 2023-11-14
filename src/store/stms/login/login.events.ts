import { createAction } from "@reduxjs/toolkit";
import { UserinfoInterface } from "../../../services/Login/api";


export enum LoginEvents {
    needLogin = "login_need_login",
    alreadyLogged = "login_already_logged",
    loginSuccess = "login_success",
    loginError = "login_error",
    serverError = "login_server_error",
    toLogin = "login_to_login",
    userLogout = "login_user_logout",
    userLogoutError = "login_user_logout_error",
    userLogoutSuccess = "login_user_logout_success",
    unauthorized = "login_unauthorized",
    retry="login_retry",
    genericServerError="generic_server_error",
    



}

export enum SubLoginEvents {
    failedEvent = 'login_caller_failed_event',
    changedEmail = 'login_caller_changed_email',
    changePassword = 'login_caller_change_password',
    doLogin = 'login_caller_do_login',
    changeRemember = "login_caller_change_remember",
    changedAction = "login_caller_change_action"

}


export const doLoginAction = createAction(SubLoginEvents.doLogin)
export const successLoginAction = createAction<UserinfoInterface>(LoginEvents.loginSuccess)
export const failedLoginAction = createAction(LoginEvents.needLogin)
export const alreadyLoggedAction = createAction(LoginEvents.alreadyLogged)
export const errorServerLoginAction = createAction(LoginEvents.serverError)
export const unauthorizedServerLoginAction = createAction(LoginEvents.unauthorized)
export const toLoginAction = createAction(LoginEvents.toLogin)
export const userLogout = createAction(LoginEvents.userLogout)
export const retryAction = createAction(LoginEvents.retry)
export const genericError = createAction(LoginEvents.genericServerError)
export const userLogoutError = createAction(LoginEvents.userLogoutError)
export const userLogoutSuccess = createAction(LoginEvents.userLogoutSuccess)
export const changeAction = createAction<{ name: SubLoginEvents, value: string | boolean }>(SubLoginEvents.changedAction)


export type UserInfoEvent = ReturnType<typeof successLoginAction>

export type ChangeEvent = ReturnType<typeof changeAction>
