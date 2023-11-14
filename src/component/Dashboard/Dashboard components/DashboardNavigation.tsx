
import css from "../Dashboard.module.css"
import React, { useMemo } from 'react';
import { DashboardStates, dashboardMachine } from "../../../store/stms/dasboard/dashboard.stm";
import { Dashboard } from "../Dashboard";
import { useStateMachine } from "../../../store/stms/useStateMachine";
import { useDashboard } from "../../../store/stms/dasboard/dashboard.hook";
import { GenericErrorPage } from "../../Login/GenericErrorPage/GenericErrorPage";
import { Pages } from "../../MainPanel/Pages";

const dashboardMap = {
    [DashboardStates.loadInfo]: <>loadInfo</>,
    [DashboardStates.errorInfo]: <><GenericErrorPage retrySelector={Pages.dashboard} /><Dashboard /></>,
    [DashboardStates.successInfo]: <Dashboard />,

}

export const DashboardNavigation = () => {
    const today = useMemo(() => new Date(), [])
    const oneYear = useMemo(() => new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()), [today])
    useStateMachine(dashboardMachine, {
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
        filter: {

            startCreationDateFilter: oneYear,
            endCreationDateFilter: today

        }
    })
    const { dashboardState } = useDashboard();

    return (
        <div className={css["dashboard-background"]}>
            {(dashboardState && dashboardMap[dashboardState]) ?? <></>}
        </div>
    )
}

