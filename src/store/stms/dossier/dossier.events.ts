import { createAction } from "@reduxjs/toolkit";
import { Company } from "../../../services/Company/api";
import { DossierInterface } from "../../../services/Dossier/api";
import { DocTypes, ValidCategories } from "../../../types/types";


export enum DossierEvents {
    failed = "dossier_failed_event",
    success = "dossier_success_event",
    start = "dossier_start",
    stopCreation = "dossier_stop_creation",
    completeCreation = "dossier_complete_creation",
    exitDetail = "dossier_exit_detail",
    changeSkipMax = "dossier_change_skip_max",
    updatePage = "dossier_update_age",
    changeFilter = "dossier_change_filter",
    changeTimespan = "dossier_change_timespan",
    changePhase = "dossier_change_phase",
    changeCreatedBy = "dossier_change_created_by",
    changeSortTableFilters = "dossier_change_sort_table_filters",
    retryLoading = "dossier_retry_loading"
}

export enum CreateDossierMachineEvents {
    failedEvent = "create_dossier_failed_event",
    successEvent = "create_dossier_success_event",
    toS1 = "create_dossier_to_s1",
    toS2 = "create_dossier_to_s2",
    toS3 = "create_dossier_to_s3",
    toS4 = "create_dossier_to_s4",
    submitting = "create_dossier_submitting",
    exit = "create_dossier_exit",
    completeCreation = "create_dossier_complete_creation",
    errorCreation = "create_dossier_error_creation",
    chooseTransfereeCompany = "create_dossier_choose_company",
    changeValue = "create_dossier_change_value",
    changeTon = "create_dossier_change_ton",
    changeParcels = "create_dossier_change_parcels",
    changeAmount = "create_dossier_change_amount",
    changeCategory = "create_dossier_change_category",
    changeStep2 = "create_dossier_change_stepProductInfo",
    changeCompanyList = 'create_dossier_change_company_list',
    retry = "create_dossier_retry",
    changeDocumentAction = "create_dossier_change_documents",
    changeDocument = "create_dossier_change_document",
    changeDocumentType = "create_dossier_change_document_type",
    updateDocumentList = "create_dossier_update_document_list",
    removeDocument = "create_dossier_remove_document",
    errorUpload = "create_dossier_error_upload",
    resetErrors = "create_dossier_reset_errors"
}


export const completeCreationAction = createAction<DossierInterface>(CreateDossierMachineEvents.completeCreation)
export const changeSkipMaxFilters = createAction<{ name: DossierEvents, skip: number, max: number }>(DossierEvents.changeSkipMax)
export const changeFilters = createAction<{ name: DossierEvents, value: string }>(DossierEvents.changeFilter)
export const sortTableFilters = createAction<{ column: string, direction: string }>(DossierEvents.changeSortTableFilters)


export const toStep1CreationAction = createAction(CreateDossierMachineEvents.toS1)
export const toStep2CreationAction = createAction(CreateDossierMachineEvents.toS2)
export const toStep3CreationAction = createAction(CreateDossierMachineEvents.toS3)
export const toStep4CreationAction = createAction(CreateDossierMachineEvents.toS4)
export const toSubmittingCreationAction = createAction(CreateDossierMachineEvents.submitting)
export const changeStep2Action = createAction<{ name: CreateDossierMachineEvents, value: string | number | ValidCategories }>(CreateDossierMachineEvents.changeStep2)
export const retryAction = createAction(CreateDossierMachineEvents.retry)
export const chooseTransfereeCompanyAction = createAction<Company | null>(CreateDossierMachineEvents.chooseTransfereeCompany)
export const changeCompanyListAction = createAction<string | null>(CreateDossierMachineEvents.changeCompanyList)
export const errorDuringDossierCreationAction = createAction(CreateDossierMachineEvents.errorCreation)
export const errorDuringUploadAction = createAction(CreateDossierMachineEvents.errorUpload)
export const resetErrorsAction = createAction(CreateDossierMachineEvents.resetErrors)


export const changeDocumentAction = createAction<{ name: CreateDossierMachineEvents, value?: File | DocTypes | null | number }>(CreateDossierMachineEvents.changeDocumentAction)


export const dossierError = createAction(DossierEvents.failed)
export const dossierSuccess = createAction(DossierEvents.success)
export const updatePage = createAction<number>(DossierEvents.updatePage)
export const retryLoadingAction = createAction(DossierEvents.retryLoading)


export type ChangeTransfereeCompanyEvent = ReturnType<typeof chooseTransfereeCompanyAction>
export type changeCompanyList = ReturnType<typeof changeCompanyListAction>
export type changeDocument = ReturnType<typeof changeDocumentAction>
export type ChangeStep2Event = ReturnType<typeof changeStep2Action>
export type ChangeDossierListPage = ReturnType<typeof updatePage>
export type ChangeFilters = ReturnType<typeof changeFilters>
export type ChangeSkipMaxFilters = ReturnType<typeof changeSkipMaxFilters>
export type SortTable = ReturnType<typeof sortTableFilters>

