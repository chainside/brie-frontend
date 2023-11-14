import { createAction } from "@reduxjs/toolkit";
import { DocTypes } from "../../../types/types";

export enum DetailDossierEvents {
    failed = "detail_dossier_failed_event",
    success = "detail_dossier_success_event",
    toChangeAction = "detail_dossier_to_change_action",
    toDetail = "detail_dossier_to_detail",
    submitting = "detail_dossier_submitting",
    changeDdt = "detail_dossier_change_ddt_form",
    changeCompliance = 'detail_dossier_change_compliance',
    changeVat = 'detail_dossier_change_vat_form',
    changeTransport = "detail_dossier_change_transport",
    changeCarrierName = "detail_dossier_change_carrier_name",
    changeCarrierVAT = "detail_dossier_change_carrier_vat",
    changePickupDate = "detail_dossier_change_pickup_date",
    changeExpectedDeliveryDate = "detail_dossier_change_expected_delivery_date",
    changePickupAddress = "detail_dossier_change_pisckup_address",
    changeDestinationAddress = "detail_dossier_change_destination_address",
    changetransportationMode = "detail_dossier_change_transport_type",
    changeComplianceField = "detail_dossier_change_compliance_field",
    changeNote = "detail_dossier_change_note",
    changeDeliveredDate = "detail_dossier_change_delivered_date",
    changePaymentDate = "detail_dossier_change_payment_date",
    changeDocument = "detail_dossier_change_document_id",
    changeAmount = "detail_dossier_change_amount",
    changeDdtDocument = "detail_dossier_change_ddt_document",
    changeVatDocument = "detail_dossier_change_vat_document",
    changeDoc = "detail_dossier_change_doc_form",
    changeDocIntegration = "detail_dossier_change_document_integration",
    changeDocIntegrationType = "detail_dossier_change_document_integration_type",
    downloadDoc = "detail_dossier_download_document",
    resetErrors = "detail_dossier_reset_errors",
    retry = "detail_dossier_retry",
    removeCompletedAction = "detail_dossier_remove_completed_action"
}


export const successDetailDossierAction = createAction(DetailDossierEvents.success)
export const failedDetailDossierAction = createAction(DetailDossierEvents.failed)
export const toChangeActionAction = createAction(DetailDossierEvents.toChangeAction)
export const toDetailDossierAction = createAction(DetailDossierEvents.toDetail)
export const downloadAction = createAction<string>(DetailDossierEvents.downloadDoc)
export const submittingAction = createAction(DetailDossierEvents.submitting)
export const changeDdtFormAction = createAction<{ name: DetailDossierEvents, value: string | Date | File }>(DetailDossierEvents.changeDdt)
export const changeVatFormAction = createAction<{ name: DetailDossierEvents, value: string | Date | number | File }>(DetailDossierEvents.changeVat)
export const changeComplianceFormAction = createAction<{ name: DetailDossierEvents, value: string | Date | File }>(DetailDossierEvents.changeCompliance)
export const changeDocAction = createAction<{ name: DetailDossierEvents, value: File | DocTypes }>(DetailDossierEvents.changeDoc)
export const resetErrorsAction = createAction(DetailDossierEvents.resetErrors)
export const retryAction = createAction(DetailDossierEvents.retry)
export const removeCompletedActionAction = createAction(DetailDossierEvents.removeCompletedAction)


export type changeDdtFormEvent = ReturnType<typeof changeDdtFormAction>
export type changeComplianceFormEvent = ReturnType<typeof changeComplianceFormAction>
export type changeVatFormEvent = ReturnType<typeof changeVatFormAction>
export type changeDocEvent = ReturnType<typeof changeDocAction>
export type downloadEvent = ReturnType<typeof downloadAction>







