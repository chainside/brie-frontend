import css from "../../Dashboard.module.css"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CustomAreaTooltip } from "../CustomAreaTooltip";
import { QuantityTrendsInterface } from "../../../../services/Dashboard/api";
import { DataAreaChartXFormater, DataAreaChartYFormater } from "../../../../utils/utils";

interface Props {
    quantityTrends: QuantityTrendsInterface[] | undefined
    ticks: number[]
}

export const RenderAreaChart = (props: Props) => {
    return (
        <div className={css["area-graphic"]} >
            <ResponsiveContainer minWidth="100%" height="90%">
                <AreaChart data={props.quantityTrends}  >
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#8DDBE0" stopOpacity={0.3} />
                            <stop offset="100%" stopColor="#8DDBE0" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid horizontal={true} vertical={true} stroke="#C8C6CA65" />
                    <XAxis type="number" scale={"time"} domain={["dataMin", "dataMax"]} ticks={props.ticks} dataKey="ms" tickMargin={10} fontSize={9} tickFormatter={DataAreaChartXFormater} />
                    <YAxis tickMargin={10} fontWeight={500} fontSize={9} axisLine={false} tickCount={8} tickFormatter={DataAreaChartYFormater} />
                    <Area activeDot={false} type="monotone" dataKey="count" strokeWidth={3} stroke="#8DDBE0" fillOpacity={1} fill="url(#colorUv)" />
                    <Tooltip
                        contentStyle={{ backgroundColor: "#343438", borderRadius: "4px", borderColor: "#343438" }}
                        cursor={false}
                        content={<CustomAreaTooltip />}/>
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
};
