import { Typography, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import css from "./Header.module.css"
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState, useCallback } from 'react';
import { Pages } from "../MainPanel/Pages";
import classnames from "classnames";
import { CustomDialog } from "../Dialog/Dialog";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { ValidCategories, validCategoriesMap } from "../../types/types";
import { DetailDossierStates } from "../../store/stms/detailDossier/detailsDossier.stm";
import { useDetailsDossier } from "../../store/stms/detailDossier/detailsDossier.hook";


const headerMap = {
    [Pages.dashboard]: "Dashboard",
    [Pages.company]: "Impresa di appartenenza",
    [Pages.pr42]: "Lista Pratiche",
    [Pages.newPr42]: "Nuova pratica del Regime 42",
    [Pages.prd4Details]: "Lista Pratiche ",
    [Pages.notFoundPages]: "",
    [Pages.profile]: "",
    [Pages.all]: "",
    [Pages.profileUser]: "",
    [Pages.login]: ""
}

export const Header = () => {
    const [openModal, setOpenModal] = useState(false)
    const modalClose = useCallback(() => { setOpenModal(false) }, [])
    const modalOpen = useCallback(() => { setOpenModal(true) }, [])
    const location = useLocation()
    const navigate = useNavigate()
    const createPaperwork = useCallback(() => { navigate('/pr42/new') }, [])
    const { detailDossierState } = useDetailsDossier()
    const { toDetail } = useDetailsDossier()
    const exitPaperwork = useCallback(() => {
        if ([DetailDossierStates.showDDT, DetailDossierStates.showCompliance, DetailDossierStates.showVAT].includes(detailDossierState as DetailDossierStates)) {
            toDetail()
        }
        else {
            navigate('/pr42')
        }
        modalClose()
    }, [detailDossierState])
    const { detailDossierInfo } = useDetailsDossier()

    const headerText = headerMap[location.pathname as Pages] ?? Pages.notFoundPages


    if (location.pathname === Pages.login || location.pathname === Pages.notFoundPages) {
        return <></>
    }
    else {
        return (
            <div className={classnames({
                [css["header-background"]]: true,
                [css["header-margin"]]: location.pathname === Pages.newPr42 || (detailDossierState && detailDossierState !== DetailDossierStates.showDetail && detailDossierState !== DetailDossierStates.failed),
                [css["header-background-justify-content"]]: true,
                [css["header-change-background-color"]]:
                    [DetailDossierStates.showDDT, DetailDossierStates.showCompliance, DetailDossierStates.showVAT, DetailDossierStates.docsIntegration].includes(detailDossierState as DetailDossierStates) ||
                    location.pathname === Pages.newPr42

            })} >
                {
                    detailDossierState && detailDossierState !== DetailDossierStates.showDetail && detailDossierState !== DetailDossierStates.failed && detailDossierState !== DetailDossierStates.loadDetail ?
                        <Typography variant="h3" color={"white"}>Compila richiesta</Typography>
                        : <></>
                }
                {
                    detailDossierState && detailDossierState === DetailDossierStates.failed &&
                    <div className={css['header-pr-details']}>
                        <Typography variant="h4" color={"#B7C4FF"} onClick={exitPaperwork} className={css['clickable']}>
                            {headerMap[Pages.prd4Details]}
                        </Typography>
                        < KeyboardArrowRightIcon color="info" />
                        <Typography variant={"h4"}>Id {location.pathname.split('/')[3]?.substring(0, 6)} - {location.state?.category ? validCategoriesMap[location.state.category as ValidCategories] : ""}</Typography>
                    </div>
                }
                {
                    detailDossierInfo && detailDossierInfo.id !== "" && location.pathname.includes(Pages.prd4Details) && detailDossierState === DetailDossierStates.showDetail ?
                        <div className={css['header-pr-details']}>
                            <Typography variant="h4" color={"#B7C4FF"} onClick={exitPaperwork} className={css['clickable']}>
                                {headerMap[Pages.prd4Details]}
                            </Typography>
                            < KeyboardArrowRightIcon color="info" />
                            <Typography variant={"h4"}>Id {detailDossierInfo.id.substring(0, 6)} - {validCategoriesMap[detailDossierInfo.category!]}</Typography>
                        </div> :
                        <Typography variant="h4" color={"whie"}>{headerText}</Typography>
                }
                {
                    location.pathname === Pages.pr42 ?
                        <Button color="warning" variant="contained" onClick={createPaperwork}>
                            <AddIcon color="info" />
                            <Typography>CREA NUOVA PRATICA</Typography>
                        </Button>
                        :
                        <></>
                }
                {
                    location.pathname === Pages.newPr42 ||
                        [DetailDossierStates.showDDT, DetailDossierStates.showCompliance, DetailDossierStates.showVAT, DetailDossierStates.docsIntegration].includes(detailDossierState as DetailDossierStates)
                        ?
                        <CloseIcon onClick={modalOpen} color="info" className={css["clickable"]} />
                        :
                        <></>
                }


                <CustomDialog onConfirm={exitPaperwork} open={openModal} onClose={modalClose}
                    title='Sei sicuro di voler lasciare questa pagina? '
                    text="Se confermi, tutti i dati inseriti non potranno essere salvati ed andranno persi." />
            </div >
        )
    }
}

