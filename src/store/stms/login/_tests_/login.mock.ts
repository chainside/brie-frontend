export const mockErr = {
    response:{
      data: {
            "id": "c7f73f4e-9dde-47c1-8063-a4f7d3a5ed13",
            "firstName": "Rick",
            "lastName": "Doe",
            "email": "rick.doe@gmail.com",
            "company": {
              "id": "41ef26b8-3450-4188-b3fe-1422e2bb6298",
              "name": "Company2",
              "vatNumber": "12345678902",
              "codeEori": "IT12345678902",
              "businessName": "Company2 srl",
              "legalForm": "SSRL",
              "legalResidence": "Via Roma 2, Torino, IT",
              "commoditiesSector": "COMM_EQUIP"
          }
          ,"statusCode":"400"
        }
    },
    status: 400
}

export const notAuthResp = {
    data: {
        "message": "Unauthorized",
        "statusCode": "401"
      },
  status: 401
}

export const mock = {
    data: {
      "id": "c7f73f4e-9dde-47c1-8063-a4f7d3a5ed13",
      "firstName": "Rick",
      "lastName": "Doe",
      "email": "rick.doe@gmail.com",
      "company": {
        "id": "41ef26b8-3450-4188-b3fe-1422e2bb6298",
        "name": "Company2",
        "vatNumber": "12345678902",
        "codeEori": "IT12345678902",
        "businessName": "Company2 srl",
        "legalForm": "SSRL",
        "legalResidence": "Via Roma 2, Torino, IT",
        "commoditiesSector": "COMM_EQUIP"
    }
  },
    status: 200
}