import { Company } from "../../../../services/Company/api"

export const mockDossierList = {
  data: {
    dossier: [
      {
        "id": "862374d3-df35-4ffc-9657-c7a20ca11295",
        "creationDate": "2023-07-20T15:42:50.492Z",
        "category": "APP_CONTROL",
        "transfereeCompany": {
          "id": "726a84a4-ffc6-427d-8b46-33a37a508f68",
          "name": "Company2",
          "vatNumber": "12345678902",
          "codeEori": "IT12345678902",
          "businessName": "Company2 srl",
          "legalForm": "SSRL",
          "legalResidence": "Via Roma 2, Torino, IT",
          "commoditiesSector": "COMM_EQUIP"
        },
        "company": {
          "id": "856ba2c7-9e80-4469-800a-b191ac52ae21",
          "name": "Company1",
          "vatNumber": "12345678901",
          "codeEori": "IT12345678901",
          "businessName": "Company 1 srl",
          "legalForm": "SRL",
          "legalResidence": "Via Roma 1, Torino, IT",
          "commoditiesSector": "AGRICULTURAL_PRODS"
        },
        "amount": "11",
        "phase": "START",
        "state": "INT_REQ"
      },
      {
        "id": "9dab598c-3b74-4d67-9494-94d77bd9f4b8",
        "creationDate": "2023-07-20T15:42:50.492Z",
        "category": "AGRI_PROD",
        "transfereeCompany": {
          "id": "726a84a4-ffc6-427d-8b46-33a37a508f68",
          "name": "Company2",
          "vatNumber": "12345678902",
          "codeEori": "IT12345678902",
          "businessName": "Company2 srl",
          "legalForm": "SSRL",
          "legalResidence": "Via Roma 2, Torino, IT",
          "commoditiesSector": "COMM_EQUIP"
        },
        "company": {
          "id": "856ba2c7-9e80-4469-800a-b191ac52ae21",
          "name": "Company1",
          "vatNumber": "12345678901",
          "codeEori": "IT12345678901",
          "businessName": "Company 1 srl",
          "legalForm": "SRL",
          "legalResidence": "Via Roma 1, Torino, IT",
          "commoditiesSector": "AGRICULTURAL_PRODS"
        },
        "amount": "12",
        "phase": "START",
        "state": "INT_REQ"
      },
      {
        "id": "dd9fbc4e-45c5-4f9e-9d90-064f46c42b41",
        "creationDate": "2023-07-20T15:42:50.492Z",
        "category": "AGRI_PROD",
        "transfereeCompany": {
          "id": "726a84a4-ffc6-427d-8b46-33a37a508f68",
          "name": "Company2",
          "vatNumber": "12345678902",
          "codeEori": "IT12345678902",
          "businessName": "Company2 srl",
          "legalForm": "SSRL",
          "legalResidence": "Via Roma 2, Torino, IT",
          "commoditiesSector": "COMM_EQUIP"
        },
        "company": {
          "id": "856ba2c7-9e80-4469-800a-b191ac52ae21",
          "name": "Company1",
          "vatNumber": "12345678901",
          "codeEori": "IT12345678901",
          "businessName": "Company 1 srl",
          "legalForm": "SRL",
          "legalResidence": "Via Roma 1, Torino, IT",
          "commoditiesSector": "AGRICULTURAL_PRODS"
        },
        "amount": "13",
        "phase": "START",
        "state": "INT_REQ"
      },
      {
        "id": "352ca0cc-7f4a-4c03-9efd-08fd5fade67e",
        "creationDate": "2023-07-20T15:42:50.492Z",
        "category": "AGRI_PROD",
        "transfereeCompany": {
          "id": "726a84a4-ffc6-427d-8b46-33a37a508f68",
          "name": "Company2",
          "vatNumber": "12345678902",
          "codeEori": "IT12345678902",
          "businessName": "Company2 srl",
          "legalForm": "SSRL",
          "legalResidence": "Via Roma 2, Torino, IT",
          "commoditiesSector": "COMM_EQUIP"
        },
        "company": {
          "id": "856ba2c7-9e80-4469-800a-b191ac52ae21",
          "name": "Company1",
          "vatNumber": "12345678901",
          "codeEori": "IT12345678901",
          "businessName": "Company 1 srl",
          "legalForm": "SRL",
          "legalResidence": "Via Roma 1, Torino, IT",
          "commoditiesSector": "AGRICULTURAL_PRODS"
        },
        "amount": "14",
        "phase": "START",
        "state": "INT_REQ"
      },
      {
        "id": "35a9d02f-12fe-45ae-b099-79b6ecc0ae01",
        "creationDate": "2023-07-20T15:42:50.492Z",
        "category": "AGRI_PROD",
        "transfereeCompany": {
          "id": "726a84a4-ffc6-427d-8b46-33a37a508f68",
          "name": "Company2",
          "vatNumber": "12345678902",
          "codeEori": "IT12345678902",
          "businessName": "Company2 srl",
          "legalForm": "SSRL",
          "legalResidence": "Via Roma 2, Torino, IT",
          "commoditiesSector": "COMM_EQUIP"
        },
        "company": {
          "id": "856ba2c7-9e80-4469-800a-b191ac52ae21",
          "name": "Company1",
          "vatNumber": "12345678901",
          "codeEori": "IT12345678901",
          "businessName": "Company 1 srl",
          "legalForm": "SRL",
          "legalResidence": "Via Roma 1, Torino, IT",
          "commoditiesSector": "AGRICULTURAL_PRODS"
        },
        "amount": "15",
        "phase": "START",
        "state": "INT_REQ"
      }
    ]
  },
  status: 200
}

export const mockErr = {
  data: {
    statusCode: 400
  }
}

export const mockSuccess = {
  data: {
    "id": "80efb8f2-fcb8-4e6d-bf6e-01c67cf0c9e0",
    "creationDate": "01/01/2001",
    "category": "MIN_METAL_CHEMICAL",
    "amount": "100000",
    "company": {
      "id": "a9f650fe-5ca7-40f0-8297-c76fa105cd2f",
      "name": "Company Name",
      "vatNumber": "12345678901",
      "codeEori": "IT12345678902",
      "businessName": "Company srl",
      "legalForm": "srl",
      "legalResidence": "Via Roma 3, Torino, IT",
      "commoditiesSector": "ores, metals and chemicals"
    },
    "transfereeCompany": {
      "id": "a9f650fe-5ca7-40f0-8297-c76fa105cd2f",
      "name": "Company Name",
      "vatNumber": "12345678901",
      "codeEori": "IT12345678902",
      "businessName": "Company srl",
      "legalForm": "srl",
      "legalResidence": "Via Roma 3, Torino, IT",
      "commoditiesSector": "ores, metals and chemicals"
    },
    "phase": "INT_REQ",
    "state": "TRANSIT"
  },
}

export const mockCompany: Company = {
  "id": "856ba2c7-9e80-4469-800a-b191ac52ae21",
  "name": "Company2",
  "vatNumber": "12345678901",
  "codeEori": "IT12345678901",
  "businessName": "Company 1 srl",
  "legalResidence": "Via Roma 1, Torino, IT",
}

export const mockAutocomplete = {
  data:
    [{
      "id": "4e87addd-bd75-4733-8ba8-71671ba92581",
      "name": "Company2",
      "vatNumber": "12345678902",
      "codeEori": "IT12345678902",
      "businessName": "Company2 srl",
      "legalForm": "SSRL",
      "legalResidence": "Via Roma 2, Torino, IT",
      "commoditiesSector": "COMM_EQUIP"
    }]
}

export const uploadDocResponse = {
  data: "4e87addd-bd75-4733-8ba8-71671ba92581"
}