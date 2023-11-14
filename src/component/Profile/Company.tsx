import { Avatar, Divider, Typography } from "@mui/material"
import css from "./Company.module.css"
import BusinessIcon from '@mui/icons-material/Business';
import React from 'react';
import { useSelector } from "react-redux";
import { userCompany } from "../../store/stms/login/login.selector";
import { validCommoditiesSectorMap, validLegalFormsMap } from "../../types/types";

export const Company = () => {
    const company = useSelector(userCompany);

    return (
        <div className={css["company-background"]}>
            {/* nome */}
            <div className={css["company-name-main-container"]}>
                <Avatar className={css["company-avatar"]}>
                    <BusinessIcon className={css["company-icon"]} />
                </Avatar>
                <div className={css["company-header-container"]}>
                    <Typography variant='h3' marginTop={"-5px"}>
                        {company?.businessName}
                    </Typography>
                    <Typography variant='subtitle1' color={"#C8C6CADE"}>
                        {company?.legalResidence}
                    </Typography>
                </div>
            </div>
            <Divider className={css["company-divider"]} />
            {/* dati */}
            <div className={css["company-container-external"]}>
                <Typography variant="h6">
                    Dati identificativi
                </Typography>
                <div className={css["company-data-main-container"]}>
                    <div className={css["company-row-spacing-container"]}>
                        <Typography variant="subtitle2" color={'#C8C6CA99'} marginBottom={'8px'}>
                            Ragione Sociale
                        </Typography>
                        <Typography variant="subtitle1">
                            {company?.businessName}
                        </Typography>
                    </div>
                    <div className={css["company-rows-container"]}>
                        <div className={css["company-typo-container"]}>
                            <Typography variant="subtitle2" color={'#C8C6CA99'} marginBottom={'8px'}>
                                Cod. EORI
                            </Typography>
                            <Typography variant="subtitle1">
                                {company?.codeEori}
                            </Typography>
                        </div>
                        <div className={css["company-typo-container"]}>
                            <Typography variant="subtitle2" color={'#C8C6CA99'} marginBottom={'8px'}>
                                Partita IVA
                            </Typography>
                            <Typography variant="subtitle1">
                                {company?.vatNumber}
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
            <Divider className={css["company-divider"]} />
            {/* sede */}
            <div className={css["company-container-external"]}>
                <Typography variant="h6">
                    Sede
                </Typography>
                <div className={css["company-rows-container"]}>
                    <div className={css["company-typo-container"]}>
                        <Typography variant="subtitle2" color={'#C8C6CA99'} marginBottom={'8px'}>
                            Indirizzo
                        </Typography>
                        <Typography variant="subtitle1">
                            {company?.legalResidence.split(",")[0]}
                        </Typography>
                    </div>
                    <div className={css["company-typo-container"]}>
                        <Typography variant="subtitle2" color={'#C8C6CA99'} marginBottom={'8px'}>
                            Città
                        </Typography>
                        <Typography variant="subtitle1">
                            {company?.legalResidence.split(",")[1]}
                        </Typography>
                    </div>
                    <div className={css["company-typo-container"]}>
                        <Typography variant="subtitle2" color={'#C8C6CA99'} marginBottom={'8px'}>
                            Paese
                        </Typography>
                        <Typography variant="subtitle1">
                            {company?.legalResidence.split(",")[2]}
                        </Typography>
                    </div>
                </div>
            </div>
            <Divider className={css["company-divider"]} />
            {/* struttura */}
            <div className={css["company-container-external"]}>
                <Typography variant="h6">
                    Struttura
                </Typography>
                <div className={css["company-rows-container"]}>
                    <div className={css["company-typo-container"]}>
                        <Typography variant="subtitle2" color={'#C8C6CA99'} marginBottom={'8px'}>
                            Forma Giuridica
                        </Typography>
                        <Typography variant="subtitle1">
                            {validLegalFormsMap[company?.legalForm!]}
                        </Typography>
                    </div>
                    <div className={css["company-typo-container"]}>
                        <Typography variant="subtitle2" color={'#C8C6CA99'} marginBottom={'8px'}>
                            Settore merceologico
                        </Typography>
                        <Typography variant="subtitle1">

                            {validCommoditiesSectorMap[company?.commoditiesSector!]}
                        </Typography>
                    </div>
                </div>
            </div>
        </div >
    )
}