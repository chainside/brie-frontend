import css from '../Dashboard.module.css'
import React, { useMemo } from 'react';

import { FilterTypes, formatTime } from "../../../types/types";
import { DashboardFilterSelect, SelectItem } from './DashboardFilterSelect';
import { useDashboard } from '../../../store/stms/dasboard/dashboard.hook';
import { codeTranslator } from '../../../utils/utils';



export const DashboardFilters = () => {
    const { countries } = useDashboard()

    const TimeInterval: SelectItem[] = useMemo(() => {
        const today = new Date()
        const threeMonth = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate())
        const sixMonth = new Date(today.getFullYear(), today.getMonth() - 6, today.getDate())
        const oneYear = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())
        return [
            { name: "Ultimi 3 mesi (" + formatTime(threeMonth) + " - " + formatTime(today) + ")", value: threeMonth + " - " + today },
            { name: "Ultimi 6 mesi (" + formatTime(sixMonth) + " - " + formatTime(today) + ")", value: sixMonth + " - " + today },
            { name: "Ultimo anno (" + formatTime(oneYear) + " - " + formatTime(today) + ")", value: oneYear + " - " + today },
        ]
    }, [])
    const Country: SelectItem[] = useMemo(() => {
        let c: SelectItem[] = []
        c.push({ name: "Tutti i Paesi Europei", value: "0" })
        if (countries) {
            countries.forEach(element => {
                c.push({ name: codeTranslator(element), value: element })
            });
        }
        return c
    }, [countries])


    return (
        <div className={css["filter-container"]} >
            <DashboardFilterSelect items={TimeInterval} label={FilterTypes.TIME_INTERVAL}></DashboardFilterSelect>
            <DashboardFilterSelect items={Country} label={FilterTypes.IN_COUNTRY}></DashboardFilterSelect>
            <DashboardFilterSelect items={Country} label={FilterTypes.OUT_COUNTRY}></DashboardFilterSelect>
        </div>
    )
}
