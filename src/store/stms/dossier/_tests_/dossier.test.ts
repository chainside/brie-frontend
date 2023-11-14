import { combineReducers } from "redux";
import { SagaTester } from "@moveaxlab/redux-saga-tester";
import { stateMachineStarterSaga } from "redux-sigma";
import { DossierStates, dossierMachine } from "../dossier.stm";
import {
  CreateDossierMachineStates,
  createDossierMachine,
} from "../createDossierMachine.stm";
import {
  mockAutocomplete,
  mockCompany,
  mockDossierList,
  mockErr,
  mockSuccess,
  uploadDocResponse,
} from "./dossier.mock";
import {
  CreateDossierMachineEvents,
  DossierEvents,
  changeCompanyListAction,
  changeDocumentAction,
  changeFilters,
  changeSkipMaxFilters,
  changeStep2Action,
  chooseTransfereeCompanyAction,
  retryAction,
  toStep1CreationAction,
  toStep2CreationAction,
  toStep3CreationAction,
  toStep4CreationAction,
  toSubmittingCreationAction,
  updatePage,
} from "../dossier.events";
import {
  DocTypes,
  PhaseLabelEnum,
  ValidCategories,
} from "../../../../types/types";
import waitForExpect from "wait-for-expect";
import axiosInstance from "../../../../services/axiosConfig";
import { loginMachine } from "../../login/login.stm";
jest.mock("../../../../services/axiosConfig");
describe("Dossier, list and creation", () => {
  const reducers = combineReducers({
    dossierStateMachine: dossierMachine.stateReducer,
    createDossierStateMachine: createDossierMachine.stateReducer,
    loginStateMachine: loginMachine.stateReducer,
  });
  const tester = new SagaTester({ reducers });
  const mockedAxios = jest.mocked(axiosInstance, true);
  tester.start(stateMachineStarterSaga, dossierMachine, createDossierMachine, loginMachine);

  test("Dossier list not loaded due to error", async () => {
    mockedAxios.mockRejectedValue(mockErr);
    tester.dispatch(
      dossierMachine.start({
        filters: {
          skip: 0,
          max: 20,
        },
        page: 1,
        count: 0,
      }),
    );
    await tester.waitFor(DossierEvents.failed);
    expect(tester.getState().dossierStateMachine.state).toBe(
      DossierStates.failure,
    );
    tester.dispatch(dossierMachine.stop());
  });

  test("Dossier list loaded", async () => {
    mockedAxios.mockResolvedValue(mockDossierList);
    tester.dispatch(
      dossierMachine.start({
        count: 0,
        filters: {
          skip: 0,
          max: 20,
        },
        page: 1,
      }),
    );
    await tester.waitFor(DossierEvents.success);

    expect(tester.getState().dossierStateMachine.state).toBe(
      DossierStates.showList,
    );
  });

  test("Dossier changes skip", async () => {
    mockedAxios.mockResolvedValue(mockDossierList);
    tester.dispatch(
      changeSkipMaxFilters({
        name: DossierEvents.changeSkipMax,
        skip: 0,
        max: 20,
      }),
    );
    waitForExpect(() => {
      expect(tester.getState().dossierStateMachine.state).toBe(
        DossierStates.showList,
      );
    });
  });

  test("Dossier changes page", async () => {
    mockedAxios.mockResolvedValue(mockDossierList);
    tester.dispatch(updatePage(2));
    waitForExpect(() => {
      expect(tester.getState().dossierStateMachine.context?.page).toBe(2);
    });
  });

  test("Dossier changing start and end date filters", async () => {
    mockedAxios.mockResolvedValue(mockDossierList);
    const oneWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const today = new Date();
    tester.dispatch(
      changeFilters({
        name: DossierEvents.changeTimespan,
        value: oneWeek + " - " + today,
      }),
    );
    waitForExpect(() => {
      expect(
        tester.getState().dossierStateMachine.context?.filters
          .startCreationDate,
      ).toBeDefined();
      expect(
        tester.getState().dossierStateMachine.context?.filters
          .endCreationDate,
      ).toBeDefined();
    });
  });
  test("Dossier changing createdBy filters", async () => {
    mockedAxios.mockResolvedValue(mockDossierList);
    tester.dispatch(
      changeFilters({
        name: DossierEvents.changeCreatedBy,
        value: mockCompany.id,
      }),
    );
    waitForExpect(() => {
      expect(
        tester.getState().dossierStateMachine.context?.filters.phase,
      ).toBe(mockCompany.id);
    });
  });
  test("Dossier changing phase filters", async () => {
    mockedAxios.mockResolvedValue(mockDossierList);
    tester.dispatch(
      changeFilters({
        name: DossierEvents.changePhase,
        value: PhaseLabelEnum.START,
      }),
    );
    waitForExpect(() => {
      expect(
        tester.getState().dossierStateMachine.context?.filters.phase,
      ).toBe(PhaseLabelEnum.START);
    });
  });

  //starting creation machine

  tester.dispatch(
    createDossierMachine.start({
      dossier: {
        id: "",
        creationDate: "",

        amount: 0,
        company: mockCompany,
        transfereeCompany: {
          id: "",
          name: "",
          vatNumber: "",
          codeEori: "",
          businessName: "",
          legalResidence: "",
        },
        ton: 0,
        parcels: 0,
      },
      companyList: [],
      maxStep: 0,
      selectedDocument: {
        id: "",
        document: new File([], ""),
        type: null,
      },
      documents: [],
      errorUpload: false,
      uploading: false,
    }),
  );

  test("Create Dossier stepSelectCompany autocomplete", async () => {
    tester.dispatch(toStep1CreationAction());
    mockedAxios.mockResolvedValue(mockAutocomplete);
    tester.dispatch(changeCompanyListAction(mockCompany.businessName));
    await waitForExpect(() => {
      expect(
        tester.getState().createDossierStateMachine.context?.companyList.length,
      ).toBe(1);
    });
  });

  test("Create Dossier stepSelectCompany choosing company", async () => {
    tester.dispatch(chooseTransfereeCompanyAction(mockCompany));
    await waitForExpect(() => {
      expect(
        tester.getState().createDossierStateMachine.context?.dossier
          .transfereeCompany,
      ).toBe(mockCompany);
    });
  });

  test("Create Dossier changing step", () => {
    tester.dispatch(toStep1CreationAction());
    expect(tester.getState().createDossierStateMachine.state).toBe(
      CreateDossierMachineStates.stepSelectCompany,
    );
    tester.dispatch(toStep2CreationAction());
    expect(tester.getState().createDossierStateMachine.state).toBe(
      CreateDossierMachineStates.stepProductInfo,
    );
    tester.dispatch(toStep3CreationAction());
    expect(tester.getState().createDossierStateMachine.state).toBe(
      CreateDossierMachineStates.stepDocument,
    );
    tester.dispatch(toStep4CreationAction());
    expect(tester.getState().createDossierStateMachine.state).toBe(
      CreateDossierMachineStates.stepRecap,
    );
  });

  test("Create Dossier step 2 changing context", async () => {
    tester.dispatch(toStep2CreationAction());
    tester.dispatch(
      changeStep2Action({
        name: CreateDossierMachineEvents.changeAmount,
        value: 1,
      }),
    );
    tester.dispatch(
      changeStep2Action({
        name: CreateDossierMachineEvents.changeCategory,
        value: ValidCategories.MIN_METAL_CHEMICAL,
      }),
    );
    tester.dispatch(
      changeStep2Action({
        name: CreateDossierMachineEvents.changeTon,
        value: 1,
      }),
    );
    tester.dispatch(
      changeStep2Action({
        name: CreateDossierMachineEvents.changeParcels,
        value: 1,
      }),
    );
    await waitForExpect(() => {
      expect(
        tester.getState().createDossierStateMachine.context?.dossier.amount,
      ).toBe(1);
      expect(
        tester.getState().createDossierStateMachine.context?.dossier.category,
      ).toBe(ValidCategories.MIN_METAL_CHEMICAL);
      expect(
        tester.getState().createDossierStateMachine.context?.dossier.ton,
      ).toBe(1);
      expect(
        tester.getState().createDossierStateMachine.context?.dossier.parcels,
      ).toBe(1);
    });
  });

  test("Create Dossier step 3 documents uploading", async () => {
    mockedAxios.mockResolvedValue(uploadDocResponse);
    tester.dispatch(toStep3CreationAction());
    tester.dispatch(
      changeDocumentAction({
        name: CreateDossierMachineEvents.changeDocumentAction,
        value: new File([], "test_doc.pdf", {
          type: "pdf",
        }),
      }),
    );
    tester.dispatch(
      changeDocumentAction({
        name: CreateDossierMachineEvents.changeDocumentType,
        value: DocTypes.BILL,
      }),
    );
    tester.dispatch(
      changeDocumentAction({
        name: CreateDossierMachineEvents.updateDocumentList,
        value: 1,
      }),
    );
    await waitForExpect(() => {
      expect(
        tester.getState().createDossierStateMachine.context?.documents.length,
      ).toBe(1);
    });
  });

  test("Create Dossier fail submit", async () => {
    tester.dispatch(toStep4CreationAction());
    mockedAxios.mockRejectedValue(mockErr);
    tester.dispatch(toSubmittingCreationAction());
    await waitForExpect(() => {
      expect(tester.getState().createDossierStateMachine.state).toBe(
        CreateDossierMachineStates.submittingError,
      );
    });
  });

  test("Create Dossier from failure to stepRecap (retry)", async () => {
    tester.dispatch(retryAction());
    expect(tester.getState().createDossierStateMachine.state).toBe(
      CreateDossierMachineStates.stepRecap,
    );
  });
  test("Create Dossier submit success", async () => {
    mockedAxios.mockResolvedValue(mockSuccess);
    tester.dispatch(toSubmittingCreationAction());
    await waitForExpect(() => {
      expect(tester.getState().createDossierStateMachine.state).toBe(
        CreateDossierMachineStates.submittingSuccess,
      );
    });
  });

  afterAll(() => {
    tester.dispatch(dossierMachine.stop());
  });
});
