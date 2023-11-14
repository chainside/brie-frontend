import { Typography } from '@mui/material';
import * as React from 'react';
import css from "../../DossierDetail.module.css"
import { useDetailsDossier } from '../../../../store/stms/detailDossier/detailsDossier.hook';
import { showDate, toEuro } from '../../../../types/types';


export const ClosedDossier = () => {
    const { detailDossierInfo } = useDetailsDossier()


    return <div>
        <div className={css["tab-info-section"]}>
            <div className={css["tab-info-row"]}>
                <div className={css["tab-info-row-item"]}>
                    <Typography variant="subtitle2" color={'#C8C6CA99'} marginTop={'8px'}>
                        Importo Iva (€)
                    </Typography>
                    <Typography variant="subtitle1" marginTop={'8px'}>
                        {detailDossierInfo?.amountVAT ? toEuro(detailDossierInfo?.amountVAT) : "-"}
                    </Typography>
                </div>

                <div className={css["tab-info-row-item"]}>
                    <Typography variant="subtitle2" color={'#C8C6CA99'} marginTop={'8px'}>
                        Data pagamento giustificativo
                    </Typography>
                    <Typography variant="subtitle1" marginTop={'8px'}>
                        {showDate(detailDossierInfo?.paymentDate) ?? "-"}
                    </Typography>
                </div>
            </div>

            <div className={css["tab-info-row"]}>
                <div className={css["tab-info-row-item"]}>
                    <Typography variant="subtitle2" color={'#C8C6CA99'} marginTop={'8px'}>
                        Data approvazione e chiusura pratica
                    </Typography>
                    <Typography variant="subtitle1" marginTop={'8px'}>
                        {showDate(detailDossierInfo?.closingDate) ?? "-"}
                    </Typography>
                </div>
            </div>
        </div>
    </div>
}

