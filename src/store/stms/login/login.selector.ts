import { createSelector } from "@reduxjs/toolkit";
import { Store } from "../saga";

const selectLoginState = (store: Store) => store.login.state
const selectLoginStore = (store: Store) => store.login.context
const selectLoginCallerStoree = (store: Store) => store.loginCaller.context
const selectLoginEmail = (store: Store) => store.loginCaller.context?.email
const selectLoginPassword = (store: Store) => store.loginCaller.context?.password
const selectUserInfo = (store: Store) => store.login.context?.userInfo
const selectSelf = (store: Store) => store

export const loginState = createSelector(selectLoginState, (state) => state)
export const UserInfoStore = createSelector(selectUserInfo, (info) => info)
export const subLoginUserInfoStore = createSelector(selectLoginCallerStoree, (context) => context?.user.data)
export const loginError = createSelector(selectLoginCallerStoree, (context) => context?.loginError)
export const loginDisabled = createSelector(selectLoginEmail, selectLoginPassword, (email, password) => email === "" || password === "")
export const rememberMe = createSelector(selectLoginCallerStoree, (context) => context?.rememberMe)
export const userCompany = createSelector(selectLoginStore, (context) => context?.userInfo?.company)

export const loginStore = createSelector(selectSelf, (store) => store.login.context)
