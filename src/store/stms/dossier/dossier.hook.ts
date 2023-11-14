import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Company } from "../../../services/Company/api";
import { currentDoc, documentList, dossierInfo, errorUploadSelector, uploadingSelector } from "./dossier.selector";
import { SelectChangeEvent } from "@mui/material";
import { reg } from "../../../utils/utils";
import { DocTypes } from "../../../types/types";
import { changeFilters, DossierEvents, changeSkipMaxFilters, updatePage, toStep1CreationAction, toStep2CreationAction, toStep3CreationAction, toStep4CreationAction, toSubmittingCreationAction, chooseTransfereeCompanyAction, changeStep2Action, CreateDossierMachineEvents, changeCompanyListAction, retryAction, changeDocumentAction, sortTableFilters, resetErrorsAction, retryLoadingAction } from "./dossier.events";


export const useDossierFilter = () => {
    const dispatch = useDispatch();

    const changeTimespan = useCallback((e: SelectChangeEvent<string>) => {
        dispatch(changeFilters({ name: DossierEvents.changeTimespan, value: e.target.value }));
    }, [dispatch]);

    const changePhase = useCallback((e: SelectChangeEvent<string>) => {
        dispatch(changeFilters({ name: DossierEvents.changePhase, value: e.target.value }));
    }, [dispatch]);

    const changeCreatedBy = useCallback((e: SelectChangeEvent<string>) => {
        dispatch(changeFilters({ name: DossierEvents.changeCreatedBy, value: e.target.value }));
    }, [dispatch]);

    const changeSkipMax = useCallback((skip: number, max: number) => {
        dispatch(changeSkipMaxFilters({ name: DossierEvents.changeSkipMax, skip: skip, max: max }));
    }, [dispatch]);

    const changeTableSort = useCallback((column: string, direction: string) => {
        dispatch(sortTableFilters({ column: column, direction: direction }));
    }, [dispatch]);

    const changePageNumber = useCallback((page: number) => {
        dispatch(updatePage(page));
    }, [dispatch]);



    return { changeTimespan, changePhase, changeCreatedBy, changeSkipMax, changePageNumber, changeTableSort }

}



export const useCreateDossier = () => {
    const dispatch = useDispatch();

    const goToStep = useCallback((step: number) => {
        switch (step) {
            case 0:
                dispatch(toStep1CreationAction());
                break;
            case 1:
                dispatch(toStep2CreationAction());
                break;
            case 2:
                dispatch(toStep3CreationAction());
                break;
            case 3:
                dispatch(toStep4CreationAction());
                break;
            case 4:
                dispatch(toSubmittingCreationAction());
                break;
            default:
                break;
        }

    }, [dispatch]);

    const toSubmitting = useCallback(() => {
        dispatch(toSubmittingCreationAction());
    }, [dispatch]);

    const chooseCompany = useCallback((e: React.SyntheticEvent<Element, Event>, value: Company | null) => {
        dispatch(chooseTransfereeCompanyAction(value));
    }, [dispatch]);

    const changeCategory = useCallback((e: SelectChangeEvent<string>) => {
        dispatch(changeStep2Action({ name: CreateDossierMachineEvents.changeCategory, value: e.target.value }));
    }, [dispatch]);

    const changeTon = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "" || reg.test(e.target.value)) {
            dispatch(changeStep2Action({ name: CreateDossierMachineEvents.changeTon, value: e.target.value }));
        }
    }, [dispatch]);

    const changeAmount = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "" || reg.test(e.target.value)) {
            dispatch(changeStep2Action({ name: CreateDossierMachineEvents.changeAmount, value: e.target.value }));
        }
    }, [dispatch]);

    const changeParcels = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "" || reg.test(e.target.value)) {
            dispatch(changeStep2Action({ name: CreateDossierMachineEvents.changeParcels, value: e.target.value }));
        }
    }, [dispatch]);

    const dossier = useSelector(dossierInfo);

    const tempDocument = useSelector(currentDoc)

    const updateCompanyList = useCallback((e: React.SyntheticEvent<Element, Event>, value: string | null) => {
        dispatch(changeCompanyListAction(value));
    }, [dispatch]);

    const changeDoc = useCallback((file: File) => {
        dispatch(changeDocumentAction({ name: CreateDossierMachineEvents.changeDocument, value: file }));
    }, [dispatch]);

    const changeDocType = useCallback((type: DocTypes | null) => {
        dispatch(changeDocumentAction({ name: CreateDossierMachineEvents.changeDocumentType, value: type }));
    }, [dispatch])

    const clearTempDoc = useCallback(() => {
        changeDoc(new File([], ""))
        changeDocType(null)
    }, [dispatch])

    const retry = useCallback(() => {
        dispatch(retryAction());
    }, [dispatch]);

    const retryLoading = useCallback(() => {
        dispatch(retryLoadingAction());
    }, [dispatch]);

    const resetErrors = useCallback(() => {
        dispatch(resetErrorsAction());
    }, [dispatch]);

    const updateDocuments = useCallback(() => {
        dispatch(changeDocumentAction({ name: CreateDossierMachineEvents.updateDocumentList }));
    }, [dispatch])

    const removeDoc = useCallback((index: number) => {
        return () => dispatch(changeDocumentAction({ name: CreateDossierMachineEvents.removeDocument, value: index }))
    }, [dispatch])

    const documents = useSelector(documentList)
    const errorUpload = useSelector(errorUploadSelector)
    const uploading = useSelector(uploadingSelector)

    return { goToStep, toSubmitting, chooseCompany, changeAmount, changeParcels, changeTon, changeCategory, retry, updateCompanyList, resetErrors, dossier, changeDoc, changeDocType, tempDocument, clearTempDoc, updateDocuments, removeDoc, documents, errorUpload, uploading, retryLoading }
}

