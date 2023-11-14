import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { NavigationPanel } from "../NavigationPanel/NavigationPanel";
import { Header } from "../Header/Header";
import React from 'react';
import { Company } from "../Profile/Company";
import { Pages } from "./Pages";
import css from "./MainPanel.module.css"
import { Dossier } from "../Dossier/Dossier";
import { NewDossier } from "../NewDossier/NewDossier";
import { DossierDetailComponent } from "../DossierDetail/DossierDetailComponent";
import { DashboardNavigation } from "../Dashboard/Dashboard components/DashboardNavigation";


export function MainPanel() {
    return (

        <BrowserRouter>
            <div className={css["main-panel-container"]}>
                <NavigationPanel />
                <div className={css["no-nav-container"]}>
                    <Header />
                    <div className={css["scrollable-panel"]}>
                        <Routes>
                            <Route path={Pages.dashboard} element={<DashboardNavigation />} />
                            <Route path={Pages.pr42} element={<div className={css["scrollable-panel-paperworks-list"]}><Dossier /></div>} />
                            <Route path={Pages.prd4Details + "/:id"} element={<DossierDetailComponent />} />
                            <Route path={Pages.profile} element={<div>profile</div>} />
                            <Route path={Pages.profileUser} element={<div>user</div>} />
                            <Route path={Pages.company} element={<Company />} />
                            <Route path={Pages.all} element={<Navigate to={Pages.dashboard} />} />
                            <Route path={Pages.newPr42} element={<NewDossier />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}