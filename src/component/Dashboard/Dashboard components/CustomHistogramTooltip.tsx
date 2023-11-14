import { Typography } from '@mui/material';
import { TooltipProps } from 'recharts';
import {
    ValueType,
    NameType,
} from 'recharts/types/component/DefaultTooltipContent';
import css from '../Dashboard.module.css'
import { useMemo } from 'react';
import { useDashboard } from '../../../store/stms/dasboard/dashboard.hook';
import { differenceInMonths } from 'date-fns';
import { month } from '../../../utils/utils';


export const CustomHistogramTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
    const { dashboardFilter } = useDashboard()
    const date = useMemo(() => new Date(label), [label])

    if (active && payload && payload[0]) {
        return (
            <div className={css["histogram-tooltip"]}>
                <div className={css["chart-around-row"]}>
                    <Typography variant='subtitle2' color={'#C8C6CA99'} fontWeight={"400"} fontSize={9}>Data: </Typography>
                    {
                        differenceInMonths(new Date(dashboardFilter?.endCreationDateFilter!), new Date(dashboardFilter?.startCreationDateFilter!)) <= 3 ?
                            <Typography color={'#C8C6CA'} fontWeight={"400"} fontSize={9} marginLeft={1}>{date.getDate() + " " + month[date.getMonth()] + " " + date.getFullYear()}</Typography>
                            :
                            <Typography color={'#C8C6CA'} fontWeight={"400"} fontSize={9} marginLeft={1}>{month[date.getMonth()]}</Typography>

                    }

                </div>

                <div className={css["chart-between-row"]}>

                    <Typography variant='subtitle2' color={'#C8C6CA99'} fontWeight={"400"} fontSize={9}>Totale scambi: </Typography>
                    <Typography color={'#C8C6CA'} fontWeight={"400"} fontSize={9} marginLeft={1}>{payload[0].value}</Typography>

                </div>

            </div>
        );
    }

    return null;
};