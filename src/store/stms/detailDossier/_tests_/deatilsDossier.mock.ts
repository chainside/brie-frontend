import { ValidRequestType } from "../../../../types/types"

export const mockErr = {
  data: {
    "message": "Unauthorized",
    "statusCode": "401"
  },
  status: 403
}

export const mockDossierDDT = {
  data: {
    "id": "80efb8f2-fcb8-4e6d-bf6e-01c67cf0c9e0",
    "creationDate": "01/01/2001",
    "category": "MIN_METAL_CHEMICAL",
    "amount": 100000,
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
    "state": "CLEARED",
    "parcels": 100000,
    "ton": 100000,
    "requestType": ValidRequestType.DDT_REQ,
  }
}

export const mockDossierCompliance = {
  data: {
    "id": "80efb8f2-fcb8-4e6d-bf6e-01c67cf0c9e0",
    "creationDate": "01/01/2001",
    "category": "MIN_METAL_CHEMICAL",
    "amount": 100000,
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
    "state": "TRANSPORT",
    "parcels": 100000,
    "ton": 100000,
    "requestType": ValidRequestType.DELIVERED_CONFIRM,

  }
}

export const mockDossierVAT = {
  data: {
    "id": "80efb8f2-fcb8-4e6d-bf6e-01c67cf0c9e0",
    "creationDate": "01/01/2001",
    "category": "MIN_METAL_CHEMICAL",
    "amount": 100000,
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
    "state": "WAIT_JUST",
    "parcels": 100000,
    "ton": 100000,
    "requestType": ValidRequestType.PAY_CONFIRM
  }
}

export const mockDossierIntRequest = {
  data: {
    "id": "80efb8f2-fcb8-4e6d-bf6e-01c67cf0c9e0",
    "creationDate": "01/01/2001",
    "category": "MIN_METAL_CHEMICAL",
    "amount": 100000,
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
    "phase": "START",
    "state": "INT_REQ",
    "parcels": 100000,
    "ton": 100000,
    "requestType": ValidRequestType.INT_DOCS
  }
}

export const mockDocs = {
  data: [
    {
      "id": "fba1754e-319c-49ac-83c1-201b0ba4a80f",
      "name": "sample.pdf",
      "size": 3028,
      "type": "BILL",
      "state": "NOT_NOTARIZED",
      "phase": "START",
      "uploadDate": "2023-08-11T13:29:38.985Z",
      "uploader": {
        "id": "fa82c104-7587-4a66-b4b7-3b6336d13d21",
        "name": "Company1",
        "vatNumber": "12345678901",
        "codeEori": "IT12345678901",
        "businessName": "Company 1 srl",
        "legalResidence": "Via Roma 1, Torino, IT",
        "commoditiesSector": "AGRICULTURAL_PRODS"
      }
    }
  ]
}

export const uploadDocResponse = {
  "data": "4e87addd-bd75-4733-8ba8-71671ba92581"
}

export const mockDdtForm = {
  data: {
    "id": "80efb8f2-fcb8-4e6d-bf6e-01c67cf0c9e0",
    "name": "filename",
    "type": "typefile",
    "size": 2345,
    "phase": "CLOSE",
    "state": "NOTARIZED",
    "uploadDate": "2023-08-17T07:15:40.939Z",
    "uploader": {
      "id": "a9f650fe-5ca7-40f0-8297-c76fa105cd2f",
      "name": "Company Name",
      "vatNumber": "12345678901",
      "codeEori": "IT12345678902",
      "businessName": "Company srl",
      "legalForm": "srl",
      "legalResidence": "Via Roma 3, Torino, IT",
      "commoditiesSector": "ores, metals and chemicals"
    }
  }
}