export const mockErr = {
  data: {
    "message": "Unauthorized",
    "statusCode": "401"
  },
  status: 403
}

export const mockDashboardInfo = {
  data: {
    "count": 6,
    "closed": 2,
    "deliveredTotal": 300,
    "avgTime": 3.00,
    "tradeTrends": [
      {
        "year": 2023,
        "month": "Aug",
        "count": 6
      }
    ],
    "categoryTrends": [
      {
        "category": "AGRI_PROD",
        "perc": 66.67
      },
      {
        "category": "APP_CONTROL",
        "perc": 16.67
      },
      {
        "category": "MIXED_ART",
        "perc": 16.67
      }
    ],
    "quantityTrends": [
      {
        "year": 2023,
        "month": "Aug",
        "day": 21,
        "count": 10011
      }
    ]
  }
}

