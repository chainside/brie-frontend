import { createSelector } from "@reduxjs/toolkit";
import { Store } from "../saga";

const selectDossierState = (store: Store) => store.dossier.state
const selectCreateDossierState = (store: Store) => store.createDossier.state
const selectDossierList = (store: Store) => store.dossier.context?.dossierList
const selectCreateDossierInfo = (store: Store) => store.createDossier.context?.dossier
const selectCompanyList = (store: Store) => store.createDossier.context?.companyList
const selectCurrentPage = (store: Store) => store.dossier.context?.page
const selectTotalDossier = (store: Store) => store.dossier.context?.count
const selectFilters = (store: Store) => store.dossier.context?.filters
const selectCreateDossierid = (store: Store) => store.createDossier.context?.dossier.id
const selectMaxPage = (store: Store) => store.createDossier.context?.maxStep
const selectCurrentDoc = (store: Store) => store.createDossier.context?.selectedDocument
const selectDocumentList = (store: Store) => store.createDossier.context?.documents
const selectErrorUpload = (store: Store) => store.createDossier.context?.errorUpload
const selectUploading = (store: Store) => store.createDossier.context?.uploading

export const getCompanies = createSelector(selectCompanyList, (list) => list)
export const filters = createSelector(selectFilters, (filters) => filters ?? { max: 0, skip: 0 })
export const totalDossier = createSelector(selectTotalDossier, (total) => total ?? 0)
export const dossierState = createSelector(selectDossierState, (state) => state)
export const createDossierState = createSelector(selectCreateDossierState, (state) => state)
export const dossierInfo = createSelector(selectCreateDossierInfo, (info) => info)
export const documentList = createSelector(selectDocumentList, (docs) => docs)
export const dossierList = createSelector(selectDossierList, (dossierList) => dossierList ?? [])


export const dossierPagelist = createSelector(selectCurrentPage, (page) => page ?? 0)
export const maxPage = createSelector(selectMaxPage, (page) => page ?? 0)
export const currentDoc = createSelector(selectCurrentDoc, (doc) => doc)
export const errorUploadSelector = createSelector(selectErrorUpload, (error) => error)
export const uploadingSelector = createSelector(selectUploading, (uploading) => uploading)
export const createDossierId = createSelector(selectCreateDossierid, (id) => id)
