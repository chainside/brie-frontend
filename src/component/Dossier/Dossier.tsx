
import { useSelector } from "react-redux";
import { DossierStates, dossierMachine } from "../../store/stms/dossier/dossier.stm";
import { useStateMachine } from "../../store/stms/useStateMachine";
import css from "./Dossier.module.css"
import React from 'react';
import { dossierState } from "../../store/stms/dossier/dossier.selector";
import { DossierList } from "./DossierList";
import { GenericErrorPage } from "../Login/GenericErrorPage/GenericErrorPage";
import { Pages } from "../MainPanel/Pages";

const dossierMap = {
    [DossierStates.loadList]: <>loadlist</>,
    [DossierStates.failure]: <><DossierList /><GenericErrorPage retrySelector={Pages.pr42} /></>,
    [DossierStates.showList]: <DossierList />,

}

export const Dossier = () => {
    useStateMachine(dossierMachine, {
        dossierList: [],
        count: 0,
        filters: { skip: 0, max: 20, orderBy: { column: "creation_date", direction: "DESC" } },
        page: 0,

    })
    const state = useSelector(dossierState);

    return (
        <div className={css["paperwork-background"]}>
            {(state && dossierMap[state]) ?? <></>}
        </div>
    )
}

