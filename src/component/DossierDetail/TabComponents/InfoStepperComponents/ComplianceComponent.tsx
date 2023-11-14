import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import css from "../../DossierDetail.module.css"
import { ValidCompliance } from '../../../../types/types';


interface Props {
    state?: string
}

export const ComplianceComponent = (props: Props) => {

    if (props.state === ValidCompliance.KO) {
        return <div className={css["menu-item-compliance"]}><CloseIcon color={"error"} /> Non conforme</div>
    }
    else if (props.state === ValidCompliance.OK) {
        return <div className={css["menu-item-compliance"]}><CheckIcon color={"success"} />Conforme</div>
    }
    else {
        return <></>
    }


}