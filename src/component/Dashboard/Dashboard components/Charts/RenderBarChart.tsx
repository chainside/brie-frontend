import { TradeTrendsInterface } from "../../../../services/Dashboard/api";
import { FilterDashboard } from "../../../../types/types";
import { DataHistogramChartXFormater, DataHistogramChartYFormater } from "../../../../utils/utils";
import css from "../../Dashboard.module.css"
import { CustomHistogramTooltip } from "../CustomHistogramTooltip";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface Props {
    data: TradeTrendsInterface[]
    dashboardFilter: FilterDashboard | undefined
}

export const RenderBarChart = (props: Props) => {
    return (
        <div className={css["barchart-graphic"]} >
            <ResponsiveContainer width="100%" height="90%">
                <BarChart data={props.data} >
                    <CartesianGrid horizontal={true} vertical={false} stroke="#C8C6CA65" />
                    <XAxis tickMargin={10} fontSize={9} dataKey={"ms"} tickFormatter={DataHistogramChartXFormater(props.dashboardFilter?.startCreationDateFilter!, props.dashboardFilter?.endCreationDateFilter!)} />
                    <YAxis tickMargin={10} fontWeight={500} fontSize={9} axisLine={false} tickCount={8} tickFormatter={DataHistogramChartYFormater} />
                    <Bar dataKey="count" barSize={32} fill="#87BFFF" focusable={false} />
                    <Tooltip
                        contentStyle={{ backgroundColor: "#343438", borderRadius: "4px", borderColor: "#343438" }}
                        cursor={{ fill: '#00000000' }}
                        content={<CustomHistogramTooltip />} />

                </BarChart>
            </ResponsiveContainer >
        </div >
    )
};
