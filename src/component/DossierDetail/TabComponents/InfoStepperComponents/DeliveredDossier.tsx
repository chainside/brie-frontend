import { Typography } from '@mui/material';
import * as React from 'react';
import css from "../../DossierDetail.module.css"
import { useDetailsDossier } from '../../../../store/stms/detailDossier/detailsDossier.hook';
import { showDate } from '../../../../types/types';
import { ComplianceComponent } from './ComplianceComponent';


export const DeliveredDossier = () => {
    const { detailDossierInfo } = useDetailsDossier()

    return <div>
        <div className={css["tab-info-section"]}>
            <div className={css["tab-info-row"]}>
                <div className={css["tab-info-row-item"]}>
                    <Typography variant="subtitle2" color={'#C8C6CA99'} marginTop={'8px'}>
                        Data consegna merce
                    </Typography>
                    <Typography variant="subtitle1" marginTop={'8px'}>
                        {showDate(detailDossierInfo?.deliveredDate) ?? "-"}
                    </Typography>
                </div>

                <div className={css["tab-info-row-item"]}>
                    <Typography variant="subtitle2" color={'#C8C6CA99'} marginTop={'8px'}>
                        Stato merce
                    </Typography>
                    <Typography variant="subtitle1" marginTop={'8px'}>
                        {detailDossierInfo?.compliance ? <ComplianceComponent state={detailDossierInfo?.compliance} /> : "-"}
                    </Typography>
                </div>

                <div className={css["tab-info-row-item"]}>
                    <Typography variant="subtitle2" color={'#C8C6CA99'} marginTop={'8px'}>
                        Note
                    </Typography>
                    <Typography variant="subtitle1" marginTop={'8px'}>
                        {detailDossierInfo?.note ?? "-"}
                    </Typography>
                </div>
            </div>

            <div className={css["tab-info-row"]}>
                <div className={css["tab-info-row-item"]}>
                    <Typography variant="subtitle2" color={'#C8C6CA99'} marginTop={'8px'}>
                        Data approvazione DDT
                    </Typography>
                    <Typography variant="subtitle1" marginTop={'8px'}>
                        {showDate(detailDossierInfo?.ddtApproveDate) ?? "-"}
                    </Typography>
                </div>
            </div>
        </div>
    </div>
}

