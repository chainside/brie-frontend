
import { IconButton } from "@mui/material"
import css from "./NavigationPanel.module.css"
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import DomainIcon from '@mui/icons-material/Domain';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { ProfilePopoverButton } from "./ProfilePopoverButton/ProfilePopoverButton";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useCallback } from "react";
import classnames from 'classnames'

import { Pages } from "../MainPanel/Pages";
import { DetailDossierStates } from "../../store/stms/detailDossier/detailsDossier.stm";
import { useDetailsDossier } from "../../store/stms/detailDossier/detailsDossier.hook";

export const NavigationPanel = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const toDashboard = useCallback(() => { navigate("/") }, [])
    const toPr42 = useCallback(() => { navigate("/pr42") }, [])
    const toCompany = useCallback(() => { navigate("/company") }, [])
    const { detailDossierState } = useDetailsDossier()

    if (location.pathname === Pages.login || location.pathname === Pages.notFoundPages || location.pathname === Pages.newPr42
        || detailDossierState === DetailDossierStates.showDDT || detailDossierState === DetailDossierStates.showCompliance
        || detailDossierState === DetailDossierStates.showVAT || detailDossierState === DetailDossierStates.docsIntegration) {
        return <></>
    }
    else {
        return (
            <div className={css["navigation-container"]}>
                <div className={css["dashboard-menu-container"]}>
                    <div className={css["dashboard-buttons-container"]}>
                        <IconButton
                            aria-label="stats"
                            className={classnames({
                                [css["dashboard-disabled-button"]]: location.pathname !== Pages.dashboard,
                                [css["dashboard-enabled-button"]]: location.pathname === Pages.dashboard
                            })}
                            onClick={toDashboard}>
                            <QueryStatsIcon
                                className={classnames({
                                    [css["dashboard-disabled-button"]]: location.pathname !== Pages.dashboard,
                                    [css["dashboard-enabled-button"]]: location.pathname === Pages.dashboard
                                })}
                            ></QueryStatsIcon>
                        </IconButton>
                        <IconButton
                            aria-label="article"
                            className={classnames({
                                [css["dashboard-disabled-button"]]: location.pathname !== Pages.pr42 || location.pathname.includes(Pages.prd4Details),
                                [css["dashboard-enabled-button"]]: location.pathname === Pages.pr42 || location.pathname.includes(Pages.prd4Details)
                            })}
                            onClick={toPr42}>
                            <ArticleOutlinedIcon
                                className={classnames({
                                    [css["dashboard-disabled-button"]]: location.pathname !== Pages.pr42,
                                    [css["dashboard-enabled-button"]]: location.pathname === Pages.pr42
                                })}
                            ></ArticleOutlinedIcon>
                        </IconButton>
                        <IconButton
                            aria-label="domain"
                            className={classnames({
                                [css["dashboard-disabled-button"]]: location.pathname !== Pages.company,
                                [css["dashboard-enabled-button"]]: location.pathname === Pages.company
                            })}
                            onClick={toCompany}>
                            <DomainIcon
                                className={classnames({
                                    [css["dashboard-disabled-button"]]: location.pathname !== Pages.company,
                                    [css["dashboard-enabled-button"]]: location.pathname === Pages.company
                                })}>
                            </DomainIcon>
                        </IconButton>

                    </div>


                    <ProfilePopoverButton></ProfilePopoverButton>

                </div>
            </div >
        )
    }
}

