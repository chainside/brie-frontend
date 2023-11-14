import { Card, Typography } from "@mui/material"
import React, { useMemo } from "react"
import css from '../Dashboard.module.css'
import { getMonthDifference, getTicks, } from "../../../utils/utils";
import { useDashboard } from "../../../store/stms/dasboard/dashboard.hook";
import { RenderAreaChart } from "./Charts/RenderAreaChart";



export const AreaChartComponent = () => {
    const { dashboardInfo, dashboardFilter } = useDashboard()
    const endDate = useMemo(() => dashboardInfo?.quantityTrends && dashboardInfo?.quantityTrends.length > 0 ? new Date(dashboardInfo?.quantityTrends[dashboardInfo?.quantityTrends.length - 1].ms!) : new Date(), [dashboardInfo])
    const tickSize = useMemo(() => dashboardFilter?.startCreationDateFilter && getMonthDifference(dashboardFilter?.startCreationDateFilter, new Date()) ? getMonthDifference(dashboardFilter?.startCreationDateFilter, new Date()) + 1 : 12, [dashboardInfo])
    const ticks = useMemo(() => getTicks(dashboardInfo?.quantityTrends && dashboardInfo?.quantityTrends.length > 0 ? new Date(dashboardInfo?.quantityTrends[0].ms!) : new Date(), endDate, tickSize), [dashboardInfo])


    return (
        <Card className={css['histogram-card-style']} >
            <Typography variant='h6' color={'#C8C6CA'} fontWeight={"500"} fontSize={"16px"}>Quantità merce trasportata</Typography>
            <RenderAreaChart ticks={ticks} quantityTrends={dashboardInfo?.quantityTrends} />
        </Card >
    )
}
