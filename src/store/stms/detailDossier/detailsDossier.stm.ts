import { StrictEffect } from '@redux-saga/types';
import { StateMachine, last, } from 'redux-sigma';
import { StateMachineNames } from '../StateMachinesNames';
import { put } from 'redux-saga/effects';
import { confirmDelivered, downloadDocument, getDocuments, getDossierDetail, submitDdt, submitDocIntegration, submitVat, uploadDoc } from '../../../services/Dossier/DossierServices';
import { DocIntegrationForm, DocumentDetail, DocumentInterface, DossierInterface, VatForm } from '../../../services/Dossier/api';
import { DetailDossierEvents, changeComplianceFormEvent, changeDdtFormEvent, changeDocEvent, changeVatFormEvent, downloadEvent, failedDetailDossierAction, successDetailDossierAction } from './detailsDossier.events';
import { call } from 'typed-redux-saga';
import { ComplianceForm, DdtForm } from '../../../services/Dossier/api';
import { DocTypes, StateLabelEnum, ValidRequestType } from '../../../types/types';
import { genericError } from '../login/login.events';


interface Context {
  dossier: DossierInterface,
  dossierId: string,
  documents: DocumentDetail[],
  actionForm?: DdtForm | ComplianceForm | VatForm
  actionDocument?: DocumentInterface,
  errorUpload: boolean,
  uploading: boolean,
  completedAction: boolean
}

export enum DetailDossierStates {
  loadDetail = "load_list",
  showDDT = "show_ddt",
  showCompliance = "show_compliance",
  showVAT = "show_vat",
  showDetail = "show_detail",
  docsIntegration = "documents_integration",
  failed = "failed",
  submitting = "submitting"
}



class DetailDossierMachine extends StateMachine<
  DetailDossierEvents,
  DetailDossierStates,
  StateMachineNames,
  Context
> {
  initialState = DetailDossierStates.loadDetail;

  name = StateMachineNames.detailDossier;

  spec = {
    [DetailDossierStates.loadDetail]: {
      onEntry: this.getDetail,
      transitions: {
        [DetailDossierEvents.failed]: DetailDossierStates.failed,
        [DetailDossierEvents.success]: DetailDossierStates.showDetail
      },
    },
    [DetailDossierStates.failed]: {
      transitions: {
        [DetailDossierEvents.retry]: DetailDossierStates.loadDetail
      }
    },
    [DetailDossierStates.showDetail]: {
      onEntry: this.getDocuments,
      reactions: {
        [DetailDossierEvents.downloadDoc]: last(this.downloadDocument),
        [DetailDossierEvents.removeCompletedAction]: this.removeCompletedAction
      },
      transitions: {
        [DetailDossierEvents.toChangeAction]: [{
          guard: () => {
            return this.context.dossier.state === StateLabelEnum.CLEARED
          },
          target: DetailDossierStates.showDDT,
        },
        {
          guard: () => {
            return this.context.dossier.state === StateLabelEnum.TRANSPORT
          },
          target: DetailDossierStates.showCompliance,
        },
        {
          guard: () => {
            return (this.context.dossier.state === StateLabelEnum.WAIT_JUST || this.context.dossier.state === StateLabelEnum.AMEND_REQ)
          },
          target: DetailDossierStates.showVAT,
        },
        {
          guard: () => {
            return (this.context.dossier.state === StateLabelEnum.INT_REQ)
          },
          target: DetailDossierStates.docsIntegration,
        },
        ]
      },
    },
    [DetailDossierStates.showDDT]: {
      onEntry: this.initDdtForm,
      reactions: {
        [DetailDossierEvents.changeDdt]: this.changeDdt,
        [DetailDossierEvents.submitting]: this.submitForm
      },
      transitions: {
        [DetailDossierEvents.toDetail]: DetailDossierStates.showDetail,
        [DetailDossierEvents.failed]: DetailDossierStates.failed,
        [DetailDossierEvents.success]: DetailDossierStates.showDetail

      },
    },
    [DetailDossierStates.showVAT]: {
      onEntry: this.initVatForm,
      reactions: {
        [DetailDossierEvents.changeVat]: this.changeVat,
        [DetailDossierEvents.submitting]: this.submitForm

      },
      transitions: {
        [DetailDossierEvents.toDetail]: DetailDossierStates.showDetail,
        [DetailDossierEvents.failed]: DetailDossierStates.failed,
        [DetailDossierEvents.success]: DetailDossierStates.showDetail

      },
    },
    [DetailDossierStates.showCompliance]: {
      onEntry: this.initComplianceForm,
      reactions: {
        [DetailDossierEvents.changeCompliance]: this.changeCompliance,
        [DetailDossierEvents.submitting]: this.submitForm

      },
      transitions: {
        [DetailDossierEvents.toDetail]: DetailDossierStates.showDetail,
        [DetailDossierEvents.failed]: DetailDossierStates.failed,
        [DetailDossierEvents.success]: DetailDossierStates.showDetail

      },
    },
    [DetailDossierStates.docsIntegration]: {
      onEntry: this.initDocIntegration,
      reactions: {
        [DetailDossierEvents.changeDoc]: this.changeDoc,
        [DetailDossierEvents.submitting]: this.submitForm
      },
      transitions: {
        [DetailDossierEvents.toDetail]: DetailDossierStates.showDetail,
        [DetailDossierEvents.failed]: DetailDossierStates.failed,
        [DetailDossierEvents.success]: DetailDossierStates.showDetail

      },
    },
    [DetailDossierStates.submitting]: {
      onEntry: this.submitForm,
      transitions: {
        [DetailDossierEvents.failed]: DetailDossierStates.failed,
        [DetailDossierEvents.success]: DetailDossierStates.showDetail
      },
    }
  };

  * removeCompletedAction(): Generator<StrictEffect, void> {
    yield* this.setContext(ctx => {
      ctx.completedAction = false
    })
  }

  *getDocuments(): Generator<StrictEffect, void> {
    const docs = (yield* call(getDocuments, this.context.dossierId))
    if (!docs.data) {
      yield* this.setContext(ctx => {
        ctx.errorUpload = false
        ctx.documents = docs
      })

      yield put(successDetailDossierAction())
    }
  }

  * initDocIntegration(): Generator<StrictEffect, void> {
    yield* this.setContext(ctx => {
      ctx.actionDocument = {
        id: "",
        document: new File([], ""),
        type: null
      }
    })
  }

  * initComplianceForm(): Generator<StrictEffect, void> {
    const clearCompliance: ComplianceForm = {
      id: this.context.dossierId,
      deliveredDate: undefined,
      compliance: "",
      note: "",
      document: ""
    }
    yield* this.setContext(ctx => {
      ctx.actionForm = clearCompliance
      ctx.actionDocument = {
        id: "",
        document: new File([], ""),
        type: null
      }
    })
  }

  * initDdtForm(): Generator<StrictEffect, void> {
    const clearDdt: DdtForm = {
      id: this.context.dossierId,
      carrierName: "",
      transportationMode: "",
      carrierVAT: "",
      destinationAddress: "",
      expectedDeliveryDate: undefined,
      pickupAddress: "",
      pickupDate: undefined,
      document: ""
    }
    yield* this.setContext(ctx => {
      ctx.actionForm = clearDdt
      ctx.actionDocument = {
        id: "",
        document: new File([], ""),
        type: null
      }
    })
  }

  * initVatForm(): Generator<StrictEffect, void> {
    const clearVat: VatForm = {
      id: this.context.dossierId,
      amountVAT: 0,
      paymentDate: undefined
    }
    yield* this.setContext(ctx => {
      ctx.actionForm = clearVat
      ctx.actionDocument = {
        id: "",
        document: new File([], ""),
        type: null
      }
    })
  }

  * downloadDocument(id: downloadEvent): Generator<StrictEffect, void> {
    try {
      yield* call(downloadDocument, id.payload ?? "")
    } catch (e) {
      yield put(genericError())

    }
  }

  * changeDdt(event: changeDdtFormEvent): Generator<StrictEffect, void> {
    try {
      switch (event.payload.name) {
        case DetailDossierEvents.changeCarrierName:
          return yield* this.setContext(ctx => {
            (ctx.actionForm as DdtForm).carrierName = event.payload.value as string
          })
        case DetailDossierEvents.changeCarrierVAT:
          return yield* this.setContext(ctx => {
            (ctx.actionForm as DdtForm).carrierVAT = event.payload.value as string
          })
        case DetailDossierEvents.changeDestinationAddress:
          return yield* this.setContext(ctx => {
            (ctx.actionForm as DdtForm).destinationAddress = event.payload.value as string
          })
        case DetailDossierEvents.changeExpectedDeliveryDate:
          return yield* this.setContext(ctx => {
            (ctx.actionForm as DdtForm).expectedDeliveryDate = event.payload.value as Date
          })
        case DetailDossierEvents.changePickupAddress:
          return yield* this.setContext(ctx => {
            (ctx.actionForm as DdtForm).pickupAddress = event.payload.value as string
          })
        case DetailDossierEvents.changePickupDate:
          return yield* this.setContext(ctx => {
            (ctx.actionForm as DdtForm).pickupDate = event.payload.value as Date
          })
        case DetailDossierEvents.changetransportationMode:
          return yield* this.setContext(ctx => {
            (ctx.actionForm as DdtForm).transportationMode = event.payload.value as string
          })
        case DetailDossierEvents.changeDdtDocument: {
          return yield* this.setContext((ctx) => {
            ctx.actionDocument!.document = event.payload.value as File
            ctx.actionDocument!.type = "DDT"
          })
        }
        default:
          break
      }
    } catch (e) {
      yield put(genericError())

    }
  }
  * changeVat(event: changeVatFormEvent): Generator<StrictEffect, void> {
    switch (event.payload.name) {
      case DetailDossierEvents.changePaymentDate:
        return yield* this.setContext(ctx => {
          (ctx.actionForm as VatForm).paymentDate = event.payload.value as Date
        })
      case DetailDossierEvents.changeAmount:
        return yield* this.setContext(ctx => {
          (ctx.actionForm as VatForm).amountVAT = Number(event.payload.value)
        })
      case DetailDossierEvents.changeVatDocument: {
        return yield* this.setContext((ctx) => {
          ctx.actionDocument!.document = event.payload.value as File
          ctx.actionDocument!.type = "VAT"
        })
      }
      default:
        break
    }
  }

  * changeDoc(event: changeDocEvent): Generator<StrictEffect, void> {
    switch (event.payload.name) {
      case DetailDossierEvents.changeDocIntegration:
        return yield* this.setContext((ctx) => {
          ctx.actionDocument!.document = event.payload.value as File
        })
      case DetailDossierEvents.changeDocIntegrationType:
        return yield* this.setContext((ctx) => {
          ctx.actionDocument!.type = event.payload.value as DocTypes
        })
      default:
        break;
    }
  }

  * changeCompliance(event: changeComplianceFormEvent): Generator<StrictEffect, void> {
    try {
      switch (event.payload.name) {
        case DetailDossierEvents.changeComplianceField:
          return yield* this.setContext(ctx => {
            (ctx.actionForm as ComplianceForm).compliance = event.payload.value as string
          })
        case DetailDossierEvents.changeDeliveredDate:
          return yield* this.setContext(ctx => {
            (ctx.actionForm as ComplianceForm).deliveredDate = event.payload.value as Date
          })
        case DetailDossierEvents.changeNote:
          return yield* this.setContext(ctx => {
            (ctx.actionForm as ComplianceForm).note = event.payload.value as string
          })
        case DetailDossierEvents.changeDdtDocument: {
          return yield* this.setContext((ctx) => {
            ctx.actionDocument!.document = event.payload.value as File
            ctx.actionDocument!.type = "DDT"
          })
        }
        default:
          break
      }
    } catch (e) {
      yield put(genericError())

    }
  }

  * submitForm(): Generator<StrictEffect, void> {

    try {

      yield* this.setContext((ctx) => {
        ctx.uploading = true
      })

      const docId = yield* call(uploadDoc, this.context.actionDocument!)

      switch (this.context.dossier.requestType!) {
        case (ValidRequestType.DDT_REQ):
          {
            if (docId) {
              yield* this.setContext((ctx) => {
                (ctx.actionForm as DdtForm).document = docId?.id

                ctx.errorUpload = false
              })
            }
            else {
              return yield* this.setContext((ctx) => {
                ctx.uploading = false
                ctx.errorUpload = true
              })
            }

            const res = yield* call(submitDdt, this.context.actionForm as DdtForm)
            yield* this.setContext(ctx => {
              ctx.dossier = res
            })
            break;
          }
        case (ValidRequestType.DELIVERED_CONFIRM):
          {
            if (docId) {
              yield* this.setContext((ctx) => {
                (ctx.actionForm as ComplianceForm).document = docId?.id

                ctx.errorUpload = false
              })
            }
            else {
              return yield* this.setContext((ctx) => {
                ctx.uploading = false
                ctx.errorUpload = true
              })
            }

            const res = yield* call(confirmDelivered, this.context.actionForm as ComplianceForm)
            yield* this.setContext(ctx => {
              ctx.dossier = res
            })
            break;
          }
        case (ValidRequestType.PAY_CONFIRM):
        case (ValidRequestType.AMEND_REQ):
          {
            try {
              if (docId) {
                yield* this.setContext((ctx) => {
                  (ctx.actionForm as VatForm).document = docId?.id

                  ctx.errorUpload = false
                })
              }
              else {
                return yield* this.setContext((ctx) => {
                  ctx.uploading = false
                  ctx.errorUpload = true
                })
              }

              const res = yield* call(submitVat, this.context.actionForm as VatForm)
              yield* this.setContext(ctx => {
                ctx.dossier = res
              })
            } catch (e) {
              yield* this.setContext((ctx) => {
                ctx.uploading = false
                ctx.errorUpload = true
              })
            }
            break;
          }
        case (ValidRequestType.INT_DOCS):
          {
            try {
              if (docId) {
                yield* this.setContext((ctx) => {
                  ctx.errorUpload = false
                })
              }
              else {
                return yield* this.setContext((ctx) => {
                  ctx.uploading = false
                  ctx.errorUpload = true
                })
              }
              const docForm: DocIntegrationForm = {
                id: this.context.dossierId,
                document: docId.id
              }
              const res = yield* call(submitDocIntegration, docForm)
              yield* this.setContext(ctx => {
                ctx.dossier = res
              })
            } catch (e) {
              yield* this.setContext((ctx) => {
                ctx.uploading = false
                ctx.errorUpload = true
              })
            }
            break;
          }
        default:
          break;
      }
      yield* this.setContext((ctx) => {
        ctx.completedAction = true
      })
      yield put(successDetailDossierAction())
    }
    catch (e) {
      yield* this.setContext((ctx) => {
        ctx.uploading = false
        ctx.errorUpload = true
      })
    }
  }

  * getDetail(): Generator<StrictEffect, void> {
    try {
      const res = (yield* call(getDossierDetail, this.context.dossierId))
      if (!res.data) {
        const docs = (yield* call(getDocuments, this.context.dossierId))
        if (!docs.data) {
          yield* this.setContext(ctx => {
            ctx.dossier = res
            ctx.documents = docs
          })
          yield put(successDetailDossierAction())
        } else {
          yield put(failedDetailDossierAction())
        }

      }
      else {
        yield put(failedDetailDossierAction())
      }
    }
    catch (e) {
      yield put(failedDetailDossierAction())
    }
  }

}

export const detailDossierMachine = new DetailDossierMachine();
