import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DetailDossierEvents, changeComplianceFormAction, changeDdtFormAction, changeDocAction, changeVatFormAction, downloadAction, removeCompletedActionAction, resetErrorsAction, retryAction, submittingAction, toChangeActionAction, toDetailDossierAction } from "./detailsDossier.events";
import { actionInfo, amountVATForm, disableDetailFormConfirmButton, dossierDetailActionForm, dossierDetailInfo, dossierDetailState, documentsList, dossierActionDocument, errorUploadSelector, uploadingSelector, completedAction } from "./detailsDossier.selector";
import { SelectChangeEvent } from "@mui/material";
import { reg } from "../../../utils/utils";
import { DocTypes } from "../../../types/types";

export const useDdtForm = () => {
    const dispatch = useDispatch()
    const changeTransport = useCallback((e: SelectChangeEvent<HTMLInputElement>) => {
        dispatch(changeDdtFormAction({ name: DetailDossierEvents.changetransportationMode, value: e.target.value as string }));
    }, [dispatch]);

    const changeCarrierName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeDdtFormAction({ name: DetailDossierEvents.changeCarrierName, value: e.target.value as string }));
    }, [dispatch]);

    const changeCarrierVAT = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeDdtFormAction({ name: DetailDossierEvents.changeCarrierVAT, value: e.target.value as string }));
    }, [dispatch]);

    const changePickupDate = useCallback((e: Date | null) => {
        dispatch(changeDdtFormAction({ name: DetailDossierEvents.changePickupDate, value: e?.toISOString() ?? "" }));
    }, [dispatch]);

    const changeExpectedDeliveryDate = useCallback((e: Date | null) => {
        dispatch(changeDdtFormAction({ name: DetailDossierEvents.changeExpectedDeliveryDate, value: e?.toISOString() ?? "" }));
    }, [dispatch]);

    const changePickupAddress = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeDdtFormAction({ name: DetailDossierEvents.changePickupAddress, value: e.target.value as string }));
    }, [dispatch]);

    const changeDestinationAddress = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeDdtFormAction({ name: DetailDossierEvents.changeDestinationAddress, value: e.target.value as string }));
    }, [dispatch]);

    const changeDdtDocument = useCallback((file: File) => {
        dispatch(changeDdtFormAction({ name: DetailDossierEvents.changeDdtDocument, value: file as File }));
    }, [dispatch]);

    return { changeCarrierName, changeCarrierVAT, changePickupDate, changeExpectedDeliveryDate, changePickupAddress, changeDestinationAddress, changeTransport, changeDdtDocument }
}

export const useComplianceForm = () => {
    const dispatch = useDispatch()
    const changeComplianceField = useCallback((e: SelectChangeEvent<HTMLInputElement>) => {
        dispatch(changeComplianceFormAction({ name: DetailDossierEvents.changeComplianceField, value: e.target.value as string }));
    }, [dispatch]);

    const changeNote = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeComplianceFormAction({ name: DetailDossierEvents.changeNote, value: e.target.value as string }));
    }, [dispatch]);

    const changeDeliveredDate = useCallback((e: Date | null) => {
        dispatch(changeComplianceFormAction({ name: DetailDossierEvents.changeDeliveredDate, value: e?.toISOString() ?? "" }));
    }, [dispatch]);

    const changeDdtDocument = useCallback((file: File) => {
        dispatch(changeComplianceFormAction({ name: DetailDossierEvents.changeDdtDocument, value: file as File }));
    }, [dispatch]);
    return { changeComplianceField, changeNote, changeDeliveredDate, changeDdtDocument }
}

export const useVatForm = () => {
    const dispatch = useDispatch()
    const changeVatDocument = useCallback((file: File) => {
        dispatch(changeVatFormAction({ name: DetailDossierEvents.changeVatDocument, value: file as File }));
    }, [dispatch]);

    const changeAmount = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.value === "" || reg.test(e.target.value)) {
            dispatch(changeVatFormAction({ name: DetailDossierEvents.changeAmount, value: e.target.value as string }));
        }

    }, [dispatch]);


    const changePaymentDate = useCallback((e: Date | null) => {
        dispatch(changeVatFormAction({ name: DetailDossierEvents.changePaymentDate, value: e?.toISOString() ?? "" }));
    }, [dispatch]);

    const amout = useSelector(amountVATForm)


    return { changeVatDocument, changeAmount, changePaymentDate, amout }
}

export const useChangeDocForm = () => {
    const dispatch = useDispatch()
    const changeDocument = useCallback((file: File) => {
        dispatch(changeDocAction({ name: DetailDossierEvents.changeDocIntegration, value: file as File }));
    }, [dispatch]);
    const changeDocumentType = useCallback((e: SelectChangeEvent<HTMLInputElement>) => {
        dispatch(changeDocAction({ name: DetailDossierEvents.changeDocIntegrationType, value: e.target.value as DocTypes }));
    }, [dispatch]);
    return { changeDocument, changeDocumentType }
}


export const useDetailsDossier = () => {
    const dispatch = useDispatch();

    const toChangeAction = useCallback(() => {
        dispatch(toChangeActionAction());
    }, [dispatch]);

    const toDetail = useCallback(() => {
        dispatch(toDetailDossierAction());
    }, [dispatch]);

    const detailDossierInfo = useSelector(dossierDetailInfo)
    const detailDossierState = useSelector(dossierDetailState)
    const toSubmitting = useCallback(() => {
        dispatch(submittingAction());
    }, [dispatch]);
    const detailDossierActionForm = useSelector(dossierDetailActionForm)
    const action = useSelector(actionInfo)
    const disableConfirmButton = useSelector(disableDetailFormConfirmButton)
    const documents = useSelector(documentsList)
    const actionDocument = useSelector(dossierActionDocument)
    const downloadDocument = useCallback((id: string) => {
        dispatch(downloadAction(id));
    }, [dispatch]);

    const resetErrors = useCallback(() => {
        dispatch(resetErrorsAction());
    }, [dispatch]);

    const retryDetail = useCallback(() => {
        dispatch(retryAction());
    }, [dispatch])

    const showCompletedAction = useSelector(completedAction)
    const removeCompletedAction = useCallback(() => {
        dispatch(removeCompletedActionAction())
    }, [dispatch])

    const errorUpload = useSelector(errorUploadSelector)
    const uploading = useSelector(uploadingSelector)

    return { toChangeAction, toDetail, detailDossierInfo, detailDossierState, toSubmitting, detailDossierActionForm, disableConfirmButton, action, documents, actionDocument, downloadDocument, errorUpload, uploading, resetErrors, retryDetail, showCompletedAction, removeCompletedAction }
}