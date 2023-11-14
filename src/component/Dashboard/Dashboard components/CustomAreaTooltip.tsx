import { Typography } from '@mui/material';
import { TooltipProps } from 'recharts';
import {
    ValueType,
    NameType,
} from 'recharts/types/component/DefaultTooltipContent';
import { formatTime } from '../../../types/types';
import { useMemo } from 'react';
import css from '../Dashboard.module.css'



export const CustomAreaTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
    const date = useMemo(() => new Date(payload && payload[0] ? payload[0].payload["ms"] : 0), [payload])
    if (active && payload && payload[0]) {
        return (
            <div className={css["area-tooltip"]}>
                <div className={css["chart-around-row"]}>
                    <Typography variant='subtitle2' color={'#C8C6CA99'} fontWeight={"400"} fontSize={9}>Data: </Typography>
                    <Typography variant='h6' color={'#C8C6CA'} fontWeight={"400"} fontSize={9} marginLeft={1}>{formatTime(date, true)}</Typography>

                </div>

                <div className={css["chart-between-row"]}>

                    <Typography variant='subtitle2' color={'#C8C6CA99'} fontWeight={"400"} fontSize={9}>Qtà: </Typography>
                    <Typography variant='h6' color={'#C8C6CA'} fontWeight={"400"} fontSize={9} marginLeft={1}>{payload[0].value} </Typography>

                </div>

            </div>
        );
    }

    return null;
};