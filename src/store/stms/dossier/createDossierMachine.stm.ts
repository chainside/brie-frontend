
import { StateMachine, last } from 'redux-sigma';
import { StrictEffect } from '@redux-saga/types';
import { call, put, delay } from "typed-redux-saga/macro";
import { StateMachineNames } from '../StateMachinesNames';
import { Company } from '../../../services/Company/api';
import { DocumentInterface, DossierInterface } from '../../../services/Dossier/api';
import { ChangeStep2Event, ChangeTransfereeCompanyEvent, CreateDossierMachineEvents, completeCreationAction, errorDuringDossierCreationAction, changeDocument, changeCompanyList } from './dossier.events';
import { createDossier, getCompanies, uploadDoc } from '../../../services/Dossier/DossierServices';
import { DocTypes, ValidCategories } from '../../../types/types';

interface Context {
    dossier: DossierInterface;
    companyList: Company[];
    maxStep: number;
    selectedDocument: DocumentInterface
    documents: DocumentInterface[],
    errorUpload: boolean,
    uploading: boolean
}

export enum CreateDossierMachineStates {
    stepSelectCompany = 'stepSelectCompany',
    stepProductInfo = 'stepProductInfo',
    stepDocument = 'stepDocument',
    stepRecap = 'stepRecap',
    submitting = 'submitting',
    submittingSuccess = 'success',
    submittingError = 'submitting_error',
}


class CreateDossierMachine extends StateMachine<
    CreateDossierMachineEvents,
    CreateDossierMachineStates,
    StateMachineNames,
    Context
>  {
    initialState = CreateDossierMachineStates.stepSelectCompany;

    name = StateMachineNames.createPaperwork;


    spec = {

        [CreateDossierMachineStates.stepSelectCompany]: {

            reactions: {

                [CreateDossierMachineEvents.chooseTransfereeCompany]: this.chooseTransfereeCompany,
                [CreateDossierMachineEvents.changeCompanyList]: last(this.changeCompanyList)
            },
            transitions: {
                [CreateDossierMachineEvents.toS2]: CreateDossierMachineStates.stepProductInfo,
                [CreateDossierMachineEvents.toS3]: CreateDossierMachineStates.stepDocument,
                [CreateDossierMachineEvents.toS4]: CreateDossierMachineStates.stepRecap,
            }
        },
        [CreateDossierMachineStates.stepProductInfo]: {
            onEntry: this.updateMaxPage2,
            reactions: {
                [CreateDossierMachineEvents.changeStep2]: this.changeAction
            },
            transitions: {
                [CreateDossierMachineEvents.toS1]: CreateDossierMachineStates.stepSelectCompany,
                [CreateDossierMachineEvents.toS3]: CreateDossierMachineStates.stepDocument,
                [CreateDossierMachineEvents.toS4]: CreateDossierMachineStates.stepRecap,
            }

        },
        [CreateDossierMachineStates.stepDocument]: {
            onEntry: this.updateMaxPage3,
            reactions: {
                [CreateDossierMachineEvents.changeDocumentAction]: this.changeDocumentAction,
                [CreateDossierMachineEvents.errorUpload]: this.setErrorUpload,
                [CreateDossierMachineEvents.resetErrors]: this.resetErrors

            },
            transitions: {
                [CreateDossierMachineEvents.toS1]: CreateDossierMachineStates.stepSelectCompany,
                [CreateDossierMachineEvents.toS2]: CreateDossierMachineStates.stepProductInfo,
                [CreateDossierMachineEvents.toS4]: CreateDossierMachineStates.stepRecap,

            }
        },
        [CreateDossierMachineStates.stepRecap]: {
            onEntry: this.updateMaxPage4,
            reactions: {
                [CreateDossierMachineEvents.submitting]: this.completeCreation,


            },
            transitions: {
                [CreateDossierMachineEvents.toS1]: CreateDossierMachineStates.stepSelectCompany,
                [CreateDossierMachineEvents.toS2]: CreateDossierMachineStates.stepProductInfo,
                [CreateDossierMachineEvents.toS3]: CreateDossierMachineStates.stepDocument,
                [CreateDossierMachineEvents.errorCreation]: CreateDossierMachineStates.submittingError,
                [CreateDossierMachineEvents.completeCreation]: CreateDossierMachineStates.submittingSuccess,
            }

        },
        [CreateDossierMachineStates.submitting]: {
            onEntry: this.completeCreation,
            transitions: {
                [CreateDossierMachineEvents.completeCreation]: CreateDossierMachineStates.submittingSuccess,
                [CreateDossierMachineEvents.errorCreation]: CreateDossierMachineStates.submittingError

            }
        },
        [CreateDossierMachineStates.submittingSuccess]: {},
        [CreateDossierMachineStates.submittingError]: {
            transitions: {
                [CreateDossierMachineEvents.retry]: CreateDossierMachineStates.stepRecap,
            }
        },




    };

    *changeDocumentAction(event: changeDocument): Generator<StrictEffect, void> {
        switch (event.payload.name) {
            case CreateDossierMachineEvents.changeDocument:
                return yield* this.setContext((ctx) => {
                    ctx.selectedDocument.document = event.payload.value as File
                })
            case CreateDossierMachineEvents.changeDocumentType:
                return yield* this.setContext((ctx) => {
                    ctx.selectedDocument.type = event.payload.value as DocTypes
                })
            case CreateDossierMachineEvents.updateDocumentList:
                {
                    yield* this.setContext((ctx) => {
                        ctx.uploading = true
                        ctx.errorUpload = false
                    })

                    const docId = yield* call(uploadDoc, this.context.selectedDocument)
                    if (docId) {
                        return yield* this.setContext((ctx) => {
                            ctx.selectedDocument.id = docId.id
                            ctx.documents.push(ctx.selectedDocument)
                            ctx.uploading = false
                        })
                    }
                    else {
                        return yield* this.setContext((ctx) => {
                            ctx.errorUpload = true
                            ctx.uploading = false
                        })
                    }
                }
            case CreateDossierMachineEvents.removeDocument:
                return yield* this.setContext((ctx) => {
                    ctx.documents = ctx.documents.filter((doc, index) => index !== event.payload.value)
                })
            default: break;
        }
    }

    * completeCreation(): Generator<StrictEffect, void> {
        yield* this.setContext(ctx => {
            ctx.uploading = true
        })

        try {
            const dossierObject = {
                category: this.context.dossier.category!,
                company: this.context.dossier.company.id,
                transfereeCompany: this.context.dossier.transfereeCompany.id,
                amount: this.context.dossier.amount,
                parcels: this.context.dossier.parcels,
                ton: this.context.dossier.ton,
                documents: this.context.documents.map((doc) => doc.id)
            }

            const res = yield* call(createDossier, dossierObject)
            if (res && !res.dossier) {
                yield* put(errorDuringDossierCreationAction())

            }
            else {
                if (res) {
                    yield* this.setContext(ctx => {
                        ctx.dossier = res.dossier
                        ctx.uploading = false
                    })

                    yield* put(completeCreationAction(res.dossier))
                }
                else {
                    yield* this.setContext(ctx => {
                        ctx.uploading = false
                    })
                    yield* put(errorDuringDossierCreationAction())
                }
            }


        }

        catch (e) {

            yield* put(errorDuringDossierCreationAction())
        }

    }

    * changeAction(event: ChangeStep2Event): Generator<StrictEffect, void> {
        switch (event.payload!.name) {
            case CreateDossierMachineEvents.changeAmount:
                return yield* this.setContext(ctx => {
                    ctx.dossier.amount = Number(event.payload.value)
                })
            case CreateDossierMachineEvents.changeTon:
                return yield* this.setContext(ctx => {
                    ctx.dossier.ton = Number(event.payload.value)
                })
            case CreateDossierMachineEvents.changeParcels:
                return yield* this.setContext(ctx => {
                    ctx.dossier.parcels = Number(event.payload.value)
                })
            case CreateDossierMachineEvents.changeCategory:
                return yield* this.setContext(ctx => {
                    ctx.dossier.category = event.payload.value as ValidCategories
                })
            default:
                break
        }
    }

    * chooseTransfereeCompany(e: ChangeTransfereeCompanyEvent): Generator<StrictEffect, void> {
        if (e.payload) {
            yield* this.setContext(ctx => {
                ctx.dossier.transfereeCompany = e.payload!
            })
        }
        else {
            yield* this.setContext(ctx => {
                ctx.dossier.transfereeCompany = {
                    id: "",
                    name: "",
                    vatNumber: "",
                    codeEori: "",
                    businessName: "",
                    legalResidence: "",
                }

            })
        }
    }

    * changeCompanyList(event: changeCompanyList): Generator<StrictEffect, void> {
        yield* delay(250)
        try {
            const res = yield* call(getCompanies, event.payload!)
            yield* this.setContext(ctx => {
                ctx.companyList = res
            })
        }

        catch (e) {
            yield* this.setContext(ctx => {
                ctx.companyList = []
            })
        }
    }


    * updateMaxPage2(): Generator<StrictEffect, void> {
        if (this.context.maxStep < 1) {
            yield* this.setContext(ctx => {
                ctx.maxStep = 1
            })
        }
    }


    * updateMaxPage3(): Generator<StrictEffect, void> {
        if (this.context.maxStep < 2) {
            yield* this.setContext(ctx => {
                ctx.maxStep = 2
            })
        }
    }


    * updateMaxPage4(): Generator<StrictEffect, void> {
        if (this.context.maxStep < 3) {
            yield* this.setContext(ctx => {
                ctx.maxStep = 3
            })
        }
    }


    * setErrorUpload(): Generator<StrictEffect, void> {

        yield* this.setContext(ctx => {
            ctx.errorUpload = true
        })
    }

    * resetErrors(): Generator<StrictEffect, void> {

        yield* this.setContext(ctx => {
            ctx.errorUpload = false
            ctx.uploading = false
        })

    }

}




export const createDossierMachine = new CreateDossierMachine();

