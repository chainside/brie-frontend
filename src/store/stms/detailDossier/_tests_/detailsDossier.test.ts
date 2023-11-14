import { combineReducers } from "redux";
import { SagaTester } from "@moveaxlab/redux-saga-tester";
import { stateMachineStarterSaga } from "redux-sigma";
import {
  DetailDossierStates,
  detailDossierMachine,
} from "../detailsDossier.stm";
import {
  mockDdtForm,
  mockDocs,
  mockDossierCompliance,
  mockDossierDDT,
  mockDossierIntRequest,
  mockDossierVAT,
  mockErr,
  uploadDocResponse,
} from "./deatilsDossier.mock";
import {
  DetailDossierEvents,
  changeComplianceFormAction,
  changeDdtFormAction,
  changeDocAction,
  changeVatFormAction,
  submittingAction,
  toChangeActionAction,
} from "../detailsDossier.events";
import axiosInstance from "../../../../services/axiosConfig";
import waitForExpect from "wait-for-expect";
import {
  ComplianceForm,
  DdtForm,
  VatForm,
} from "../../../../services/Dossier/api";
import { loginMachine } from "../../login/login.stm";
import { DocTypes } from "../../../../types/types";
jest.mock("../../../../services/axiosConfig");

describe("Dossier details", () => {
  const reducers = combineReducers({
    detailDossierMachine: detailDossierMachine.stateReducer,
    loginStateMachine: loginMachine.stateReducer,
  });
  const tester = new SagaTester({ reducers });

  const mockedAxios = jest.mocked(axiosInstance, true);

  tester.start(stateMachineStarterSaga, detailDossierMachine, loginMachine);
  test("Failing dossier details loading", async () => {
    mockedAxios.mockResolvedValue(mockDocs);
    mockedAxios.mockRejectedValue(mockErr);
    tester.dispatch(
      detailDossierMachine.start({
        dossier: {
          id: "",
          creationDate: "",

          transfereeCompany: {
            id: "",
            name: "",
            vatNumber: "",
            codeEori: "",
            businessName: "",
            legalResidence: "",
          },
          company: {
            id: "",
            name: "",
            vatNumber: "",
            codeEori: "",
            businessName: "",
            legalResidence: "",
          },
          amount: 0,
          parcels: 0,
          ton: 0,
        },
        dossierId: "d0272dd7-9322-4bbb-a2fc-e6cf591b23d0",
        documents: [],
        errorUpload: false,
        uploading: false,
        completedAction: false
      }),
    );

    await tester.waitFor(DetailDossierEvents.failed);
    expect(tester.getState().detailDossierMachine.state).toBe(
      DetailDossierStates.failed,
    );
    tester.dispatch(detailDossierMachine.stop());
  });

  test("Dossier details succesfully loading", async () => {
    mockedAxios.mockResolvedValue(mockDocs);
    mockedAxios.mockResolvedValue(mockDossierDDT);
    tester.dispatch(
      detailDossierMachine.start({
        dossier: {
          id: "",
          creationDate: "",
          transfereeCompany: {
            id: "",
            name: "",
            vatNumber: "",
            codeEori: "",
            businessName: "",
            legalResidence: "",
          },
          company: {
            id: "",
            name: "",
            vatNumber: "",
            codeEori: "",
            businessName: "",
            legalResidence: "",
          },
          amount: 0,
          parcels: 0,
          ton: 0,
        },
        dossierId: "d0272dd7-9322-4bbb-a2fc-e6cf591b23d0",
        documents: [],
        actionForm: {} as DdtForm,
        errorUpload: false,
        uploading: false,
        completedAction: false
      }),
    );
    await waitForExpect(() => {
      expect(tester.getState().detailDossierMachine.state).toBe(
        DetailDossierStates.showDetail,
      );
    });
  });

  test("Dossier moving to dtt compilation", async () => {
    tester.dispatch(toChangeActionAction());
    await waitForExpect(() => {
      expect(tester.getState().detailDossierMachine.state).toBe(
        DetailDossierStates.showDDT,
      );
    });
  });

  test("Dossier filling dtt form", async () => {
    tester.dispatch(
      changeDdtFormAction({
        name: DetailDossierEvents.changeCarrierName,
        value: "test",
      }),
    );
    tester.dispatch(
      changeDdtFormAction({
        name: DetailDossierEvents.changeCarrierVAT,
        value: "12312312312",
      }),
    );
    tester.dispatch(
      changeDdtFormAction({
        name: DetailDossierEvents.changeDestinationAddress,
        value: "Via test, 77",
      }),
    );
    tester.dispatch(
      changeDdtFormAction({
        name: DetailDossierEvents.changeExpectedDeliveryDate,
        value: new Date(),
      }),
    );
    tester.dispatch(
      changeDdtFormAction({
        name: DetailDossierEvents.changePickupAddress,
        value: "Via test, 7",
      }),
    );
    tester.dispatch(
      changeDdtFormAction({
        name: DetailDossierEvents.changePickupDate,
        value: new Date(),
      }),
    );
    tester.dispatch(
      changeDdtFormAction({
        name: DetailDossierEvents.changetransportationMode,
        value: "PLANE",
      }),
    );
    mockedAxios.mockResolvedValue(uploadDocResponse);
    tester.dispatch(
      changeDdtFormAction({
        name: DetailDossierEvents.changeDdtDocument,
        value: new File([], ""),
      }),
    );
    await waitForExpect(() => {
      expect(
        (tester.getState().detailDossierMachine.context?.actionForm as DdtForm)
          .carrierName,
      ).toBe("test");
      expect(
        (tester.getState().detailDossierMachine.context?.actionForm as DdtForm)
          .carrierVAT,
      ).toBe("12312312312");
      expect(
        (tester.getState().detailDossierMachine.context?.actionForm as DdtForm)
          .destinationAddress,
      ).toBe("Via test, 77");
      expect(
        (tester.getState().detailDossierMachine.context?.actionForm as DdtForm)
          .expectedDeliveryDate,
      ).toBeTruthy();
      expect(
        (tester.getState().detailDossierMachine.context?.actionForm as DdtForm)
          .pickupAddress,
      ).toBe("Via test, 7");
      expect(
        (tester.getState().detailDossierMachine.context?.actionForm as DdtForm)
          .pickupDate,
      ).toBeTruthy();
      expect(
        (tester.getState().detailDossierMachine.context?.actionForm as DdtForm)
          .transportationMode,
      ).toBe("PLANE");
      expect(
        (tester.getState().detailDossierMachine.context?.actionForm as DdtForm)
          .document,
      ).toBeDefined();
    });
  });

  test("Dossier submitting dtt form", async () => {
    mockedAxios.mockResolvedValue(mockDdtForm);
    mockedAxios.mockResolvedValue(uploadDocResponse);
    tester.dispatch(submittingAction());
    await waitForExpect(() => {
      expect(tester.getState().detailDossierMachine.state).toBe(
        DetailDossierStates.showDetail,
      );
    });
  });

  test("Dossier moving to compliance compilation", async () => {
    tester.dispatch(detailDossierMachine.stop());
    mockedAxios.mockResolvedValue(mockDocs);
    mockedAxios.mockResolvedValue(mockDossierCompliance);
    tester.dispatch(
      detailDossierMachine.start({
        dossier: {
          id: "",
          creationDate: "",

          transfereeCompany: {
            id: "",
            name: "",
            vatNumber: "",
            codeEori: "",
            businessName: "",
            legalResidence: "",
          },
          company: {
            id: "",
            name: "",
            vatNumber: "",
            codeEori: "",
            businessName: "",
            legalResidence: "",
          },
          amount: 0,
          parcels: 0,
          ton: 0,
        },
        dossierId: "d0272dd7-9322-4bbb-a2fc-e6cf591b23d0",
        documents: [],
        errorUpload: false,
        uploading: false,
        completedAction: false
      }),
    );
    await waitForExpect(() => {
      expect(tester.getState().detailDossierMachine.state).toBe(
        DetailDossierStates.showDetail,
      );
    });
    tester.dispatch(toChangeActionAction());
    await waitForExpect(() => {
      expect(tester.getState().detailDossierMachine.state).toBe(
        DetailDossierStates.showCompliance,
      );
    });
  });

  test("Dossier filling compliance form compliance", async () => {
    tester.dispatch(
      changeComplianceFormAction({
        name: DetailDossierEvents.changeComplianceField,
        value: "OK",
      }),
    );
    tester.dispatch(
      changeComplianceFormAction({
        name: DetailDossierEvents.changeDeliveredDate,
        value: new Date(),
      }),
    );
    tester.dispatch(
      changeComplianceFormAction({
        name: DetailDossierEvents.changeNote,
        value: "test",
      }),
    );
    tester.dispatch(
      changeComplianceFormAction({
        name: DetailDossierEvents.changeDdtDocument,
        value: new File([], "")
      })
    )
    await waitForExpect(() => {
      expect(
        (
          tester.getState().detailDossierMachine.context
            ?.actionForm as ComplianceForm
        ).compliance,
      ).toBe("OK");
      expect(
        (
          tester.getState().detailDossierMachine.context
            ?.actionForm as ComplianceForm
        ).deliveredDate,
      ).toBeTruthy();
      expect(
        (
          tester.getState().detailDossierMachine.context
            ?.actionForm as ComplianceForm
        ).note,
      ).toBe("test");
      expect(
        tester.getState().detailDossierMachine.context?.actionDocument).toBeDefined();
    });
  });
  test("Dossier submitting compliance form", async () => {
    mockedAxios.mockResolvedValue(mockDdtForm);
    mockedAxios.mockResolvedValue(uploadDocResponse);
    tester.dispatch(submittingAction());
    await waitForExpect(() => {
      expect(tester.getState().detailDossierMachine.state).toBe(
        DetailDossierStates.showDetail,
      );
    });
  });

  test("Dossier moving to vat form", async () => {
    tester.dispatch(detailDossierMachine.stop());
    mockedAxios.mockResolvedValue(mockDocs);
    mockedAxios.mockResolvedValue(mockDossierVAT);
    tester.dispatch(
      detailDossierMachine.start({
        dossier: {
          id: "",
          creationDate: "",

          transfereeCompany: {
            id: "",
            name: "",
            vatNumber: "",
            codeEori: "",
            businessName: "",
            legalResidence: "",
          },
          company: {
            id: "",
            name: "",
            vatNumber: "",
            codeEori: "",
            businessName: "",
            legalResidence: "",
          },
          amount: 0,
          parcels: 0,
          ton: 0,
        },
        dossierId: "d0272dd7-9322-4bbb-a2fc-e6cf591b23d0",
        documents: [],
        errorUpload: false,
        uploading: false,
        completedAction: false
      }),
    );
    await waitForExpect(() => {
      tester.dispatch(toChangeActionAction());
      expect(tester.getState().detailDossierMachine.state).toBe(
        DetailDossierStates.showVAT,
      );
    });
  });

  test("Dossier filling compliance form vat", async () => {
    tester.dispatch(
      changeVatFormAction({
        name: DetailDossierEvents.changeAmount,
        value: 10,
      }),
    );
    tester.dispatch(
      changeVatFormAction({
        name: DetailDossierEvents.changePaymentDate,
        value: new Date(),
      }),
    );
    tester.dispatch(
      changeVatFormAction({
        name: DetailDossierEvents.changeVatDocument,
        value: new File([], ""),
      }),
    );
    await waitForExpect(() => {
      expect(
        (tester.getState().detailDossierMachine.context?.actionForm as VatForm)
          .amountVAT,
      ).toBe(10);
      expect(
        (tester.getState().detailDossierMachine.context?.actionForm as VatForm)
          .paymentDate,
      ).toBeTruthy();
      expect(
        tester.getState().detailDossierMachine.context?.actionDocument).toBeDefined();
    });
  });

  test("Dossier submitting vat form", async () => {
    mockedAxios.mockResolvedValue(mockDdtForm);
    mockedAxios.mockResolvedValue(uploadDocResponse);
    tester.dispatch(submittingAction());
    await waitForExpect(() => {
      expect(tester.getState().detailDossierMachine.state).toBe(
        DetailDossierStates.showDetail,
      );
    });
  });

  test("Dossier moving to integration request compilation", async () => {
    tester.dispatch(detailDossierMachine.stop());
    mockedAxios.mockResolvedValue(mockDocs);
    mockedAxios.mockResolvedValue(mockDossierIntRequest);
    tester.dispatch(
      detailDossierMachine.start({
        dossier: {
          id: "",
          creationDate: "",

          transfereeCompany: {
            id: "",
            name: "",
            vatNumber: "",
            codeEori: "",
            businessName: "",
            legalResidence: "",
          },
          company: {
            id: "",
            name: "",
            vatNumber: "",
            codeEori: "",
            businessName: "",
            legalResidence: "",
          },
          amount: 0,
          parcels: 0,
          ton: 0,
        },
        dossierId: "d0272dd7-9322-4bbb-a2fc-e6cf591b23d0",
        documents: [],
        errorUpload: false,
        uploading: false,
        completedAction: false
      }),
    );
    await waitForExpect(() => {
      tester.dispatch(toChangeActionAction());
      expect(tester.getState().detailDossierMachine.state).toBe(
        DetailDossierStates.docsIntegration,
      );
    });
  });


  test("Dossier filling int request form", async () => {
    tester.dispatch(
      changeDocAction({
        name: DetailDossierEvents.changeDocIntegration,
        value: new File([], ""),
      }),
    );
    tester.dispatch(
      changeDocAction({
        name: DetailDossierEvents.changeDocIntegrationType,
        value: DocTypes.OTHER,
      }),
    );
    await waitForExpect(() => {
      expect(
        (tester.getState().detailDossierMachine.context?.actionDocument)
      ).toBeDefined();
      expect(
        (tester.getState().detailDossierMachine.context?.actionDocument?.type)
      ).toBe(DocTypes.OTHER);
    });
  });

  test("Dossier submitting int request form", async () => {
    mockedAxios.mockResolvedValue(mockDdtForm);
    mockedAxios.mockResolvedValue(uploadDocResponse);
    tester.dispatch(submittingAction());
    await waitForExpect(() => {
      expect(tester.getState().detailDossierMachine.state).toBe(
        DetailDossierStates.showDetail,
      );
    });
  });

  afterAll(() => {
    tester.dispatch(detailDossierMachine.stop());
  });
});
