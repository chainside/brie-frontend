
import css from "./DetailDossierBottomBar.module.css"
import React, { useCallback, useState, } from 'react';
import { Button, CircularProgress } from "@mui/material";
import classnames from 'classnames'
import { useDetailsDossier } from "../../../../store/stms/detailDossier/detailsDossier.hook";
import { CustomDialog } from "../../../Dialog/Dialog";
export const DetailDossierBottomBar = () => {
    const [openModal, setOpenModal] = useState(false)
    const modalClose = useCallback(() => { setOpenModal(false) }, [])
    const modalOpen = useCallback(() => { setOpenModal(true) }, [])
    const { disableConfirmButton } = useDetailsDossier()
    const { toDetail, toSubmitting, errorUpload, uploading } = useDetailsDossier()

    const exitPaperwork = useCallback(() => {
        toDetail()
        modalClose()
    }, [])

    return (

        <div >

            <div className={css["detail-dossier-bottom-bar"]}>

                <Button
                    className={classnames({
                        [css["bottom-button"]]: true,
                        [css["button-cancel"]]: true
                    })}
                    variant="outlined"
                    color="primary"

                    onClick={modalOpen}>Cancella</Button>

                {
                    !errorUpload ?

                        <Button
                            className={classnames({
                                [css["bottom-button"]]: true,
                                [css["button-confirm-create"]]: true
                            })}
                            variant="contained"
                            color="primary"
                            disabled={disableConfirmButton}
                            onClick={toSubmitting}>
                            Conferma ed invia
                            {uploading ?
                                <CircularProgress
                                    color={"warning"}
                                    variant="indeterminate"
                                    style={{}}
                                    size={15}
                                    thickness={4}

                                    value={100}
                                /> : <></>}
                        </Button>
                        :
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={toSubmitting}
                            className={classnames({
                                [css["bottom-button"]]: true,
                                [css["button-confirm-create"]]: true
                            })}

                        >Riprova
                        </Button>
                }
            </div>


            <CustomDialog onConfirm={exitPaperwork} open={openModal} onClose={modalClose}
                title='Sei sicuro di voler lasciare questa pagina? '
                text="Se confermi, tutti i dati inseriti non potranno essere salvati ed andranno persi." />
        </div>

    )
}

