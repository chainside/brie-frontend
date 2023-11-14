import { PieChart, Pie, Cell, Label } from 'recharts';
import css from "../../Dashboard.module.css"
import { COLORS } from '../../../../utils/utils';
import { DashboardInfoInterface } from '../../../../services/Dashboard/api';

interface Props {
    dashboardInfo: DashboardInfoInterface | undefined
}


export const RenderPieChart = (props: Props) => {
    return (
        <div className={css["pie-graphic"]}>

            <PieChart width={300} height={408}>

                <Pie
                    data={props.dashboardInfo?.categoryTrends}
                    cx={130}
                    cy={170}
                    innerRadius={90}
                    outerRadius={105}
                    paddingAngle={2}
                    dataKey="perc"
                    stroke="none"
                    className={css["pie-chart"]}

                >

                    {props.dashboardInfo?.categoryTrends.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}

                    <Label width={200} position="centerTop" fontSize={12} value={"Totale Scambi"} fontFamily='Noto Sans' className={css["label-top"]} />
                    <Label width={80} position="centerBottom" fontSize={22} fill="#C8C6CA" fontFamily='Noto Sans' value={(props.dashboardInfo?.count ?? 0).toLocaleString().replaceAll(",", ".")} />

                </Pie>
            </PieChart>
        </div >
    );
}