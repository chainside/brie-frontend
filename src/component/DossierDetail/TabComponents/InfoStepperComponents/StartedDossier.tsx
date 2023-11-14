import { Typography } from '@mui/material';
import * as React from 'react';
import css from "../../DossierDetail.module.css"
import { formatTime } from '../../../../types/types';
import { useCallback, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { StartedDossierInfo } from './StartedDossierInfo';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDetailsDossier } from '../../../../store/stms/detailDossier/detailsDossier.hook';

export const StartedDossier = () => {
    const { detailDossierInfo } = useDetailsDossier()
    const [moreInfo, setMoreInfo] = useState(false)
    const showMoreInfo = useCallback(() => {
        setMoreInfo(true)
    }, [])

    const hideMoreInfo = useCallback(() => {
        setMoreInfo(false)
    }, [])

    return <div>
        <div className={css["tab-info-section"]}>
            <div className={css["tab-info-row"]}>
                <div className={css["tab-info-row-item"]}>
                    <Typography variant="subtitle2" color={'#C8C6CA99'} marginTop={'8px'}>
                        Data creazione pratica
                    </Typography>
                    <Typography variant="subtitle1" marginTop={'8px'}>
                        {formatTime(new Date(detailDossierInfo!.creationDate))}
                    </Typography>
                </div>

                <div className={css["tab-info-row-item"]}>
                    <Typography variant="subtitle2" color={'#C8C6CA99'} marginTop={'8px'}>
                        Importatore
                    </Typography>
                    <Typography variant="subtitle1" marginTop={'8px'}>
                        {detailDossierInfo?.company.businessName}
                    </Typography>
                </div>

                <div className={css["tab-info-row-item"]}>
                    <Typography variant="subtitle2" color={'#C8C6CA99'} marginTop={'8px'}>
                        Cessionario
                    </Typography>
                    <Typography variant="subtitle1" marginTop={'8px'}>
                        {detailDossierInfo?.transfereeCompany.businessName}
                    </Typography>
                </div>
            </div>

            {moreInfo ?
                <div>
                    <StartedDossierInfo dossier={detailDossierInfo} />
                    <Typography
                        className={css["cursor-pointer"]}
                        variant="h6"
                        color={'#B7C4FF'}
                        marginTop={'20px'}
                        width={"fit-content"}
                        display={'flex'}
                        alignItems={'center'}
                        onClick={hideMoreInfo}>
                        <RemoveIcon fontSize="small" className={css["icon-margin"]} />
                        Visualizza meno informazioni
                    </Typography>
                </div>
                :
                <div>
                    <Typography
                        className={css["cursor-pointer"]}
                        variant="h6"
                        color={'#B7C4FF'}
                        marginTop={'20px'}
                        width={"fit-content"}
                        display={'flex'}
                        alignItems={'center'}
                        onClick={showMoreInfo}>
                        <AddIcon fontSize="small" className={css["icon-margin"]} />
                        Visualizza più informazioni
                    </Typography>
                </div>
            }

        </div>


    </div >
}

