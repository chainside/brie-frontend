import { createSelector } from "@reduxjs/toolkit";
import { Store } from "../saga";
import { DetailDossierStates } from "./detailsDossier.stm";
import { ComplianceForm, DdtForm, VatForm } from "../../../services/Dossier/api";



const selectDossierInfo = (store: Store) => store.detailDossier.context?.dossier
const selectDossierActionForm = (store: Store) => store.detailDossier.context?.actionForm
const selectDossierState = (store: Store) => store.detailDossier.state
const loginInfo = (store: Store) => store.login.context?.userInfo?.company
const disabledStore = (store: Store) => store.detailDossier.context?.actionForm
const actionFormStore = (store: Store) => store.detailDossier.context?.actionForm
const selectActionDocument = (store: Store) => store.detailDossier.context?.actionDocument
const selectDocuments = (store: Store) => store.detailDossier.context?.documents
const selectErrorUpload = (store: Store) => store.detailDossier.context?.errorUpload
const selectUploading = (store: Store) => store.detailDossier.context?.uploading
const selectCompletedAction = ((store: Store) => store.detailDossier.context?.completedAction)


export const dossierDetailState = createSelector(selectDossierState, (state) => state)
export const actionInfo = createSelector(selectDossierInfo, loginInfo, (dossier, info) => {
    return (dossier?.provider === info?.businessName)
})

export const errorUploadSelector = createSelector(selectErrorUpload, (error) => error)
export const uploadingSelector = createSelector(selectUploading, (uploading) => uploading)
export const completedAction = createSelector(selectCompletedAction, (action) => action)
export const documentsList = createSelector(selectDocuments, (docs) => docs)
export const dossierDetailInfo = createSelector(selectDossierInfo, (dossier) => dossier)
export const amountVATForm = createSelector(actionFormStore, (action) => (action as VatForm).amountVAT)
export const dossierDetailActionForm = createSelector(selectDossierActionForm, (action) => action)
export const dossierActionDocument = createSelector(selectActionDocument, (doc) => (doc))
export const disableDetailFormConfirmButton = createSelector(disabledStore, selectDossierState, selectActionDocument, (detailDossierActionForm, state, actionDocument) => {
    switch (state) {
        case DetailDossierStates.showDDT:
            return (
                !((detailDossierActionForm as DdtForm)?.carrierVAT.length === 11))
                || [(detailDossierActionForm as DdtForm)?.carrierName,
                (detailDossierActionForm as DdtForm)?.carrierVAT,
                (detailDossierActionForm as DdtForm)?.destinationAddress,
                (detailDossierActionForm as DdtForm)?.pickupAddress,
                (detailDossierActionForm as DdtForm)?.transportationMode,
                actionDocument?.document.name].includes("")
                || [
                    (detailDossierActionForm as DdtForm)?.expectedDeliveryDate,
                    (detailDossierActionForm as DdtForm)?.pickupDate
                ].includes(undefined)
        case DetailDossierStates.showCompliance:
            return (
                !(detailDossierActionForm as ComplianceForm).deliveredDate
                || (detailDossierActionForm as ComplianceForm).compliance === ""
                || actionDocument?.document.name === ""
            )
        case DetailDossierStates.showVAT:
            return (
                !(detailDossierActionForm as VatForm).amountVAT
                || !(detailDossierActionForm as VatForm).paymentDate
                || actionDocument?.document.name === ""
            )
        case DetailDossierStates.docsIntegration:
            return (
                actionDocument?.document.name === ""
                || actionDocument?.type === null
            )
        default:
            return true
    }
}
)
export const showBottomBarSelector = createSelector(selectDossierState, (state) => {
    if (![DetailDossierStates.failed, DetailDossierStates.loadDetail, DetailDossierStates.showDetail, DetailDossierStates.submitting].includes(state as DetailDossierStates)) {
        return true
    }
    else {
        return false
    }
})