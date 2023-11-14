import React from "react"
import css from "../../DossierDetail.module.css"
import { Typography } from "@mui/material"
import { codeTranslator } from "../../../../utils/utils"
import { showDate, toEuro, validCategoriesMap } from "../../../../types/types"
import { DossierInterface } from "../../../../services/Dossier/api"

interface Props {
    dossier: DossierInterface | undefined
}

export const StartedDossierInfo = (props: Props) => {
    return (
        <>
            <div className={css["tab-info-row"]}>
                <div className={css["tab-info-row-item"]}>
                    <Typography variant="subtitle2" color={'#C8C6CA99'} marginTop={'8px'}>
                        Paese di ingresso
                    </Typography>
                    <Typography variant="subtitle1" marginTop={'8px'}>
                        {codeTranslator(props.dossier?.company.legalResidence.split(",")[2])}
                    </Typography>
                </div>

                <div className={css["tab-info-row-item"]}>
                    <Typography variant="subtitle2" color={'#C8C6CA99'} marginTop={'8px'}>
                        Cod. EORI (Importatore)
                    </Typography>
                    <Typography variant="subtitle1" marginTop={'8px'}>
                        {props.dossier?.company.codeEori}
                    </Typography>
                </div>

                <div className={css["tab-info-row-item"]}>
                    <Typography variant="subtitle2" color={'#C8C6CA99'} marginTop={'8px'}>
                        P. Iva (Importatore)
                    </Typography>
                    <Typography variant="subtitle1" marginTop={'8px'}>
                        {props.dossier?.company.vatNumber}
                    </Typography>
                </div>
            </div>

            <div className={css["tab-info-row"]}>
                <div className={css["tab-info-row-item"]}>
                    <Typography variant="subtitle2" color={'#C8C6CA99'} marginTop={'8px'}>
                        Paese di destinazione
                    </Typography>
                    <Typography variant="subtitle1" marginTop={'8px'}>
                        {codeTranslator(props.dossier?.transfereeCompany.legalResidence.split(",")[2])}
                    </Typography>
                </div>

                <div className={css["tab-info-row-item"]}>
                    <Typography variant="subtitle2" color={'#C8C6CA99'} marginTop={'8px'}>
                        Cod. EORI (Cessionario)
                    </Typography>
                    <Typography variant="subtitle1" marginTop={'8px'}>
                        {props.dossier?.transfereeCompany.codeEori}
                    </Typography>
                </div>

                <div className={css["tab-info-row-item"]}>
                    <Typography variant="subtitle2" color={'#C8C6CA99'} marginTop={'8px'}>
                        P. Iva (Cessionario)
                    </Typography>
                    <Typography variant="subtitle1" marginTop={'8px'}>
                        {props.dossier?.transfereeCompany.vatNumber}
                    </Typography>
                </div>
            </div>

            <div className={css["tab-info-row"]}>
                <div className={css["tab-info-row-item"]}>
                    <Typography variant="subtitle2" color={'#C8C6CA99'} marginTop={'8px'}>
                        Tipologia di merce
                    </Typography>
                    <Typography variant="subtitle1" marginTop={'8px'}>
                        {validCategoriesMap[props.dossier!.category!]}
                    </Typography>
                </div>

                <div className={css["tab-info-row-item"]}>
                    <Typography variant="subtitle2" color={'#C8C6CA99'} marginTop={'8px'}>
                        Peso (t)
                    </Typography>
                    <Typography variant="subtitle1" marginTop={'8px'}>
                        {props.dossier?.ton}
                    </Typography>
                </div>

                <div className={css["tab-info-row-item"]}>
                    <Typography variant="subtitle2" color={'#C8C6CA99'} marginTop={'8px'}>
                        Quantità (colli)
                    </Typography>
                    <Typography variant="subtitle1" marginTop={'8px'}>
                        {props.dossier?.parcels}
                    </Typography>
                </div>

                <div className={css["tab-info-row-item"]}>
                    <Typography variant="subtitle2" color={'#C8C6CA99'} marginTop={'8px'}>
                        Valore (€)
                    </Typography>
                    <Typography variant="subtitle1" marginTop={'8px'}>
                        {toEuro(Number(props.dossier?.amount))}
                    </Typography>
                </div>
            </div>

            <div className={css["tab-info-row"]}>
                <div className={css["tab-info-row-item"]}>
                    <Typography variant="subtitle2" color={'#C8C6CA99'} marginTop={'8px'}>
                        Data sdoganamento merci
                    </Typography>
                    <Typography variant="subtitle1" marginTop={'8px'}>
                        {showDate(props.dossier?.customsClearaceDate) ?? "-"}
                    </Typography>
                </div>

            </div>
        </>
    )
}