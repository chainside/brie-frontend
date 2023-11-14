import React from "react"
import css from './Dashboard.module.css'
import { CustomCard } from "./Dashboard components/CustomCard"
import { DashboardFilters } from "./Dashboard components/DashboardFilters"
import { useDashboard } from "../../store/stms/dasboard/dashboard.hook"
import { HistogramChart } from "./Dashboard components/HistogramChart"
import { PieChartComponent } from "./Dashboard components/PieChart"
import { AreaChartComponent } from "./Dashboard components/AreaChartComponent"
import { DashboardStates } from "../../store/stms/dasboard/dashboard.stm"
import Typography from "@mui/material/Typography"

export const Dashboard = () => {
    const { dashboardInfo, dashboardState } = useDashboard()

    return (
        <div className={css['main-dasboard-container']}>
            <DashboardFilters />
            {dashboardState !== DashboardStates.errorInfo &&
                dashboardInfo?.count !== 0 ?
                <>
                    <div className={css['card-row-container']}>
                        <CustomCard title="Pratiche totali" value={(dashboardInfo?.count ?? 0).toLocaleString()} />
                        <CustomCard title="Pratiche chiuse con successo" value={(dashboardInfo?.closed ?? 0).toLocaleString()} />
                        <CustomCard title="Merce trasportata" value={(dashboardInfo?.deliveredTotal ?? 0).toLocaleString() + "t"} />
                        <CustomCard title="Durata media pratica" value={(dashboardInfo?.avgTime ?? 0).toLocaleString() + " giorni"} />
                    </div>
                    <div className={css["graphic-row"]}>
                        <HistogramChart></HistogramChart>
                        <PieChartComponent></PieChartComponent>
                    </div>
                    <div className={css["graphic-row"]}>
                        <AreaChartComponent></AreaChartComponent>
                    </div>
                </>
                :
                <div >
                    <Typography variant="subtitle2" color={'#C8C6CA99'} marginTop={'8px'} textAlign={"center"} >
                        Nessuna pratica trovata
                    </Typography>
                </div>
            }
        </div>
    )
}