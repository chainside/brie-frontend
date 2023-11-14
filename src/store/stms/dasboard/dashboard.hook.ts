import { useDispatch, useSelector } from "react-redux";
import { dashboardCountriesSelector, dashboardFilterSelector, dashboardInfoSelector, dashboardStateSelector } from "./dashboard.selector";
import { SelectChangeEvent } from "@mui/material";
import { useCallback } from "react";
import { DashboardEvents, changeFilterAction, dashboardRetryAction } from "./dashboard.events";


export const useDashboard = () => {
    const dispatch = useDispatch();

    const dashboardFilter = useSelector(dashboardFilterSelector);
    const dashboardInfo = useSelector(dashboardInfoSelector);
    const dashboardState = useSelector(dashboardStateSelector);
    const countries = useSelector(dashboardCountriesSelector);
    const retryDashboard = useCallback(() => {
        dispatch(dashboardRetryAction())
    }, [dispatch])
    return { dashboardInfo, dashboardState, dashboardFilter, countries, retryDashboard }
}

export const useDashboardFilter = () => {
    const dispatch = useDispatch();

    const changeTimespan = useCallback((e: SelectChangeEvent<string>) => {

        dispatch(changeFilterAction({ name: DashboardEvents.changeTimeFilter, value: e.target.value as string }));
    }, [dispatch]);

    const changeInCountry = useCallback((e: SelectChangeEvent<string>) => {
        dispatch(changeFilterAction({ name: DashboardEvents.changeInCountryFilter, value: e.target.value as string }));
    }, [dispatch]);

    const changeOutCountry = useCallback((e: SelectChangeEvent<string>) => {
        dispatch(changeFilterAction({ name: DashboardEvents.changeOutCountryFilter, value: e.target.value as string }));
    }, [dispatch]);



    return { changeTimespan, changeInCountry, changeOutCountry }
}



