import css from "./Dossier.module.css"
import React, { useMemo } from 'react';
import { FilterSelect, SelectItem } from "./FilterSelect";
import { FilterTypes, formatTime } from "../../types/types";
import { useSelector } from "react-redux";
import { UserInfoStore } from "../../store/stms/login/login.selector";



export function DossierFiltersList() {

    const userInfo = useSelector(UserInfoStore);

    const CreatedBy: SelectItem[] = useMemo(() => [
        { name: "Tutti", value: "0" },
        { name: "Create da me", value: userInfo?.company.id ? userInfo?.company.id : "0" },
        { name: "Create da altri", value: userInfo?.company.id ? "!" + userInfo?.company.id : "0" }
    ], [userInfo?.company.id])

    const TimeInterval: SelectItem[] = useMemo(() => {
        const oneWeek = new Date(Date.now() - (7 * 24 * 60 * 60 * 1000))
        const twoWeek = new Date(Date.now() - (14 * 24 * 60 * 60 * 1000))
        const today = new Date()
        const oneMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())
        return [
            { name: "Tutto il periodo", value: "0" },
            { name: "Ultima settimana (" + formatTime(oneWeek) + " - " + formatTime(today) + ")", value: oneWeek + " - " + today },
            { name: "Ultime 2 settimane (" + formatTime(twoWeek) + " - " + formatTime(today) + ")", value: twoWeek + " - " + today },
            { name: "Ultimo mese (" + formatTime(oneMonth) + " - " + formatTime(today) + ")", value: oneMonth + " - " + today },
        ]
    }, [])

    const PhasePaperwork: SelectItem[] = useMemo(() => [
        { name: "Tutte le fasi", value: "0" },
        { name: "Pratica avviata", value: "START" },
        { name: "Merce in transito", value: "TRANSIT" },
        { name: "Merce consegnata", value: "DELIVERED" },
        { name: "Chiusura pratica", value: "CLOSE" },
    ], [])


    return (
        <div className={css["filter-container"]} >
            <FilterSelect items={TimeInterval} label={FilterTypes.TIME_INTERVAL}></FilterSelect>
            <FilterSelect items={PhasePaperwork} label={FilterTypes.PHASE}></FilterSelect>
            <FilterSelect items={CreatedBy} label={FilterTypes.CREATED_BY}></FilterSelect>
        </div>
    )
}
