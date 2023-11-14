import { createTheme } from "@mui/material";
import { stepConnectorClasses } from "@mui/material/StepConnector"

export const theme = createTheme({
    components: {
        MuiCircularProgress: {
            variants: [{
                props: { color: 'warning' },
                style: {
                    color: "#002780"
                }
            }]
        },
        MuiTableSortLabel: {
            styleOverrides: {
                icon: {

                    color: "#C2C5DD"
                },
                iconDirectionAsc: {
                    color: "#C2C5DD"
                },
                iconDirectionDesc: {
                    color: "#C2C5DD",

                },
            }
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "22px",
                    color: '#C6C5D0',
                    "&.Mui-disabled": {
                        color: "#C6C5D0"
                    },
                    "&.Mui-error&.Mui-disabled": {
                        "color": "#FFB4AC"
                    }
                }
            },
        },
        MuiStepContent: {
            styleOverrides: {
                root: {
                    '&':
                    {
                        borderWidth: '0px',
                    }
                },
            },
        },
        MuiStepConnector: {
            styleOverrides: {
                line: {
                    height: '3px',
                    backgroundColor: 'inherit',
                    border: 0,
                },
                horizontal: {
                    width: '100%',
                    left: 'calc(-100% + 24px)',
                    ["&." + stepConnectorClasses.completed]: {
                        backgroundColor: '#B7C4FF',
                    },
                    ["&." + stepConnectorClasses.active]: {
                        backgroundColor: '#B7C4FF',
                    },
                    ["&." + stepConnectorClasses.disabled]: {
                        backgroundColor: '#2A2A2D'
                    }
                },
            }
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    width: '15%',
                    minWidth: '15%',
                }
            }
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
                    {
                        display: 'none',
                    },
                    '& input[type=number]': {
                        MozAppearance: 'textfield',
                    },
                    "&.Mui-error": {
                        // "color": "#FFB4AC"
                    }
                },
                input: {
                    "&.Mui-disabled": {
                        color: "#C6C5D0",
                        WebkitTextFillColor: "#C6C5D0"
                    }
                },
            }
        },
        MuiStepper: {
            styleOverrides: {
                horizontal: {
                    height: '80px',
                    marginRight: 'calc(-20% + 64px)',
                    paddingLeft: '64px',
                },

            }
        },
        MuiStepButton: {
            styleOverrides: {
                horizontal: {
                    width: 'fit-content',
                }
            }
        },
        MuiStepLabel: {
            styleOverrides: {
                horizontal: {
                    alignItems: 'start',
                }
            }
        },
        MuiStep: {
            styleOverrides: {
                horizontal: {
                    display: 'flex',
                    width: 'max-content'
                }
            }
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    width: '456px',
                    borderRadius: '28px'
                }
            }
        },
        MuiChip: {
            variants: [
                {
                    props: { color: 'warning' },
                    style: {
                        color: "#3A3000",
                        backgroundColor: "#FFF0C3",
                        gap: "10px",
                        borderRadius: "4px",
                        fontWeight: "bold",
                        height: "25px",

                    }
                },
                {
                    props: { color: 'secondary' },
                    style: {
                        color: "#C8C6CA",
                        backgroundColor: "#343438",
                        gap: "10px",
                        borderRadius: "4px",
                        fontWeight: "bold",
                        height: "25px",

                    }
                },
                {
                    props: { color: 'success' },
                    style: {
                        gap: "10px",
                        borderRadius: "4px",
                        fontWeight: "bold",
                        width: "fit-content",
                        height: "25px",

                    }
                },
                {
                    props: { color: 'error' },
                    style: {
                        gap: "10px",
                        borderRadius: "4px",
                        fontWeight: "bold",
                        width: "fit-content",
                        height: "25px",
                    }
                },
                {
                    props: { color: 'primary' },
                    style: {
                        gap: "10px",
                        borderRadius: "4px",
                        fontWeight: "bold",
                        width: "fit-content",
                        height: "25px",
                    }
                }
            ]
        },
        MuiButton: {
            variants: [
                {
                    props: { color: 'warning' },
                    style: {
                        padding: "16px 20px 16px 16px",
                        gap: "8px",
                        borderRadius: "16px"
                    }
                },
                {
                    props: { color: 'primary' },
                    style: {
                        borderRadius: "20px"
                    }
                }
            ]
        },
        MuiSvgIcon: {
            variants: [
                {
                    props: { color: 'success' },
                    style: {
                        color: '#C8FFC0'
                    }
                },
                {
                    props: { fontSize: 'large' },
                    style: {
                        fontSize: '48px'
                    }
                },
                {
                    props: { fontSize: 'small' },
                    style: {
                        fontSize: '18px'
                    }
                },
                {
                    props: { color: 'info' },
                    style: {
                        color: '#C8C6CA'
                    }
                }

            ]
        }
    },
    typography: {
        button: {
            textTransform: 'none'
        },
        fontFamily: "Noto Sans",
        allVariants: {
            color: "#C8C6CA"
        },
        h2: {
            fontSize: "32px",
            fontWeight: 400,
            lineHeight: "45px",
        },
        caption: {
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "34px"
        },
        h3: {
            fontSize: "24px",
            fontWeight: 400,
            lineHeight: "34px"
        },
        h4: {
            fontSize: "22px",
            fontWeight: 400,
            lineHeight: "31px",
        },
        h5: {
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "22px"
        },
        h6: {
            fontSize: "14px",
            fontWeight: 500,
            lineHeight: "20px"
        },
        body2: {
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "20px"
        },
        subtitle1: {
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "22px",
        },
        subtitle2: {
            fontSize: "12px",
            fontWeight: 400,
            lineHeight: "17px",
        }
    },
    palette: {
        mode: "dark",
        primary: {
            main: '#B7C4FF',
            contrastText: "#002780"
        },
        success: {
            main: "#C8FFC0",
            contrastText: "#00390A"
        },
        warning: {
            main: "#0039B4",
            dark: "#0039B4"
        },
        error: {
            main: '#FFB4AC',
        },
        text: {
            primary: "#C8C6CA"
        },
        common: {
            white: "#90909A"
        }
    }
});