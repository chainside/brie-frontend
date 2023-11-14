import { Card, Typography } from "@mui/material"
import React, { useMemo } from "react"
import css from '../Dashboard.module.css'
import { createDataForHistogram } from "../../../utils/utils";
import { useDashboard } from "../../../store/stms/dasboard/dashboard.hook";
import { RenderBarChart } from "./Charts/RenderBarChart";


export const HistogramChart = () => {
    const { dashboardInfo, dashboardFilter } = useDashboard()
    const customData = useMemo(() => createDataForHistogram(dashboardInfo?.tradeTrends!, dashboardFilter?.startCreationDateFilter!, dashboardFilter?.endCreationDateFilter!), [dashboardInfo?.tradeTrends])
    return (
        <Card className={css['histogram-card-style']} >
            <Typography variant='h6' color={'#C8C6CA'} fontWeight={"500"} fontSize={"16px"}>Andamento scambi commerciali</Typography>
            <RenderBarChart data={customData} dashboardFilter={dashboardFilter} />
        </Card >
    )
}
