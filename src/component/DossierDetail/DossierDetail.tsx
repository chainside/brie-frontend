import React, { useCallback, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { InfoStepper } from './TabComponents/InfoStepper';
import css from './DossierDetail.module.css'
import { CustomTabPanel } from './CustomTabPanel';
import { Badge, Typography } from '@mui/material';
import { ActionComponent } from './TabComponents/ActionComponents/ActionComponent';
import { useDetailsDossier } from '../../store/stms/detailDossier/detailsDossier.hook';
import { DocumentList } from './TabComponents/DocumentList/DocumentList';

export const DossierDetail = () => {
    const [value, setValue] = useState(0);
    const { detailDossierInfo, action } = useDetailsDossier()
    const handleChange = useCallback((event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }, []);
    return (
        <Box className={css['detail-box-external']}>
            <Box className={css['detail-header-selector']}>
                <div className={css["fixed-detail-tab-header"]}>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label={<Typography variant='h5'>Informazioni</Typography>} />
                        <Tab label={
                            <div className={css['tab-badge-container']}>
                                <Typography variant='h5'>Azione richiesta </Typography>
                                {action && <Badge variant="dot" color='error' className={css['badge-positioning']} />}
                            </div>
                        } />
                        <Tab label={<Typography variant='h5'>Documenti</Typography>} />
                    </Tabs>
                </div>
            </Box>
            {
                !(!detailDossierInfo || detailDossierInfo.id === "") &&
                <>
                    <CustomTabPanel value={value} index={0}>
                        <InfoStepper></InfoStepper>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <ActionComponent></ActionComponent>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        <DocumentList></DocumentList>
                    </CustomTabPanel>
                </>
            }
        </Box >
    );
}

