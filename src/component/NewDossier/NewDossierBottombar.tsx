
import { useSelector } from "react-redux";
import css from "./NewDossier.module.css"
import React, { useCallback, useMemo, useState, } from 'react';
import { createDossierState, } from "../../store/stms/dossier/dossier.selector";
import { CreateDossierMachineStates } from "../../store/stms/dossier/createDossierMachine.stm";
import { Button, CircularProgress } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useCreateDossier } from "../../store/stms/dossier/dossier.hook";
import { StepDossierCreation } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { CustomDialog } from "../Dialog/Dialog";
import classnames from 'classnames'

export const NewDossierBottomBar = () => {
    const [openModal, setOpenModal] = useState(false)
    const modalClose = useCallback(() => { setOpenModal(false) }, [])
    const modalOpen = useCallback(() => { setOpenModal(true) }, [])

    const state = useSelector(createDossierState);
    const { goToStep, dossier, documents, uploading } = useCreateDossier()

    const disabled: boolean = useMemo(() => {
        switch (state) {
            case CreateDossierMachineStates.stepSelectCompany:
                return (dossier?.transfereeCompany.id === '' ? true : false)
            case CreateDossierMachineStates.stepDocument:
                return (documents?.length ? documents.length < 1 : true)
            case CreateDossierMachineStates.stepProductInfo:
                return (dossier?.category == null || [dossier?.amount, dossier?.ton, dossier?.parcels].includes(0))
            default:
                return false;
        }
    }, [dossier, state, documents])

    const forwardStep = useCallback(() => {
        const stepIndex = StepDossierCreation.indexOf(state!)
        goToStep(stepIndex + 1)
    }, [state])

    const backwardStep = useCallback(() => {
        const stepIndex = StepDossierCreation.indexOf(state!)
        goToStep(stepIndex - 1)
    }, [state])

    const navigate = useNavigate()
    const exitPaperwork = useCallback(() => {
        navigate('/pr42')
        modalClose()
    }, [])
    const { toSubmitting } = useCreateDossier()

    return (

        <div className={css["new-dossier-bottom-bar"]}>

            {
                state !== CreateDossierMachineStates.stepSelectCompany ?

                    <Button
                        className={css["bottom-button"]}
                        variant="outlined"
                        color="primary"
                        onClick={backwardStep}>
                        <ArrowBackIcon fontSize="small" className={css["left-icon"]} /> Torna allo step precedente</Button>
                    :
                    <div ></div>


            }


            {
                state !== CreateDossierMachineStates.stepRecap ?
                    <div>
                        <Button
                            className={css["bottom-button"]}
                            variant="contained"
                            color="primary"
                            disabled={disabled}
                            onClick={forwardStep}>Vai allo step successivo <ArrowForwardIcon fontSize="small" className={css["right-icon"]} /></Button></div>

                    :
                    <div className={css["new-dossier-bottom-bar-stepRecap"]}>

                        <Button
                            className={classnames({
                                [css["bottom-button"]]: true,
                                [css["button-cancel"]]: true
                            })}
                            variant="outlined"
                            color="primary"

                            onClick={modalOpen}>Cancella</Button>

                        <Button
                            className={classnames({
                                [css["bottom-button"]]: true,
                                [css["button-confirm-create"]]: true
                            })}
                            variant="contained"
                            color="primary"
                            disabled={disabled}
                            onClick={toSubmitting}>Conferma ed invia
                            {uploading ?
                                <CircularProgress
                                    color={"warning"}
                                    variant="indeterminate"
                                    style={{}}
                                    size={15}
                                    thickness={4}

                                    value={100}
                                /> : <></>}</Button>
                    </div>
            }

            <CustomDialog onConfirm={exitPaperwork} open={openModal} onClose={modalClose}
                title='Sei sicuro di voler lasciare questa pagina? '
                text="Se confermi, tutti i dati inseriti non potranno essere salvati ed andranno persi." />

        </div>

    )
}

