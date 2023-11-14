import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SubLoginEvents, changeAction, doLoginAction, retryAction, toLoginAction, userLogout } from "./login.events";
import {loginDisabled, loginError, rememberMe, UserInfoStore} from "./login.selector";



export const useLogin = () => {
    const dispatch = useDispatch();

    const password = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeAction({ name: SubLoginEvents.changePassword, value: e.target.value }));
    }, [dispatch]);

    const email = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeAction({ name: SubLoginEvents.changedEmail, value: e.target.value }));
    }, [dispatch]);

    const remember = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeAction({ name: SubLoginEvents.changeRemember, value: e.target.checked }));
    }, [dispatch]);

    const toLogin = useCallback(() => {
        dispatch(toLoginAction());
    }, [dispatch]);

    const doLogin = useCallback(() => {
        dispatch(doLoginAction());
    }, [dispatch]);

    const logoutUser = useCallback(() => {
        dispatch(userLogout());
    }, [dispatch]);

    const retryLogin = useCallback(() => {
        dispatch(retryAction());
    }, [dispatch]);



    const error = useSelector(loginError);
    const disabled = useSelector(loginDisabled);
    const rememberCheck = useSelector(rememberMe)
    const userInfo = useSelector(UserInfoStore);

    return { password, email, remember, toLogin, doLogin, logoutUser, retryLogin, error, disabled, rememberCheck, userInfo }
}