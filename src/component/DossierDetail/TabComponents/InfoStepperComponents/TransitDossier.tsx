import { Typography } from '@mui/material';
import * as React from 'react';
import css from "../../DossierDetail.module.css"
import { useDetailsDossier } from '../../../../store/stms/detailDossier/detailsDossier.hook';
import { showDate, validTransportsMap } from '../../../../types/types';


export const TransitDossier = () => {
    const { detailDossierInfo } = useDetailsDossier()
    return <div>
        <div className={css["tab-info-section"]}>
            <div className={css["tab-info-row"]}>
                <div className={css["tab-info-row-item"]}>
                    <Typography variant="subtitle2" color={'#C8C6CA99'} marginTop={'8px'}>
                        Modalità di trasporto
                    </Typography>
                    <Typography variant="subtitle1" marginTop={'8px'}>
                        {validTransportsMap[detailDossierInfo!.transportationMode!] ?? "-"}
                    </Typography>
                </div>

                <div className={css["tab-info-row-item"]}>
                    <Typography variant="subtitle2" color={'#C8C6CA99'} marginTop={'8px'}>
                        Trasportatore
                    </Typography>
                    <Typography variant="subtitle1" marginTop={'8px'}>
                        {detailDossierInfo?.carrierName ?? "-"}
                    </Typography>
                </div>

                <div className={css["tab-info-row-item"]}>
                    <Typography variant="subtitle2" color={'#C8C6CA99'} marginTop={'8px'}>
                        P. Iva (Trasportatore)
                    </Typography>
                    <Typography variant="subtitle1" marginTop={'8px'}>
                        {detailDossierInfo?.carrierVAT ?? "-"}
                    </Typography>
                </div>
            </div>

            <div className={css["tab-info-row"]}>
                <div className={css["tab-info-row-item"]}>
                    <Typography variant="subtitle2" color={'#C8C6CA99'} marginTop={'8px'}>
                        Data di ritiro merce
                    </Typography>
                    <Typography variant="subtitle1" marginTop={'8px'}>
                        {showDate(detailDossierInfo?.pickupDate) ?? "-"}
                    </Typography>
                </div>

                <div className={css["tab-info-row-item"]}>
                    <Typography variant="subtitle2" color={'#C8C6CA99'} marginTop={'8px'}>
                        Indirizzo di ritiro
                    </Typography>
                    <Typography variant="subtitle1" marginTop={'8px'}>
                        {detailDossierInfo?.pickupAddress ?? "-"}
                    </Typography>
                </div>

            </div>

            <div className={css["tab-info-row"]}>
                <div className={css["tab-info-row-item"]}>
                    <Typography variant="subtitle2" color={'#C8C6CA99'} marginTop={'8px'}>
                        Data prevista consegna merce
                    </Typography>
                    <Typography variant="subtitle1" marginTop={'8px'}>
                        {showDate(detailDossierInfo?.expectedDeliveryDate) ?? "-"}
                    </Typography>
                </div>

                <div className={css["tab-info-row-item"]}>
                    <Typography variant="subtitle2" color={'#C8C6CA99'} marginTop={'8px'}>
                        Indirizzo di consegna
                    </Typography>
                    <Typography variant="subtitle1" marginTop={'8px'}>
                        {detailDossierInfo?.destinationAddress ?? "-"}
                    </Typography>
                </div>
            </div>
        </div>


    </div>
}

