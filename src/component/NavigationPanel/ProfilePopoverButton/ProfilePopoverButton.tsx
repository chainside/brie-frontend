import { Button, Divider, IconButton, Popover, Typography } from "@mui/material";
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import css from "./ProfilePopoverButton.module.css"
import { useState } from "react";
import { useSelector } from "react-redux";
import { UserInfoStore } from "../../../store/stms/login/login.selector";
import { useNavigate } from "react-router-dom";
import React, { useCallback } from "react";
import { useLogin } from "../../../store/stms/login/login.hook";
import { CustomDialog } from "../../Dialog/Dialog";

export function ProfilePopoverButton() {

  const [openModal, setOpenModal] = useState(false)
  const userInfo = useSelector(UserInfoStore);
  const navigate = useNavigate();
  const { logoutUser } = useLogin()
  const modalClose = useCallback(() => { setOpenModal(false) }, [])
  const modalOpen = useCallback(() => { setOpenModal(true) }, [])
  const logout = useCallback(() => {
    setOpenModal(false);
    navigate("/")
    logoutUser()
  }, [])

  return (
    <>
      <PopupState variant="popover" >
        {(popupState) => (
          <div>
            <div className={css["dashboard-profile-button-container"]} {...bindTrigger(popupState)}>
              <IconButton className={css["dashboard-profile-button"]} >{userInfo?.firstName?.toUpperCase()[0] + "" + userInfo?.lastName?.toUpperCase()[0]} </IconButton>
            </div>
            <Popover
              {...bindPopover(popupState)}
              anchorOrigin={{
                vertical: 'center',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <div className={css["dashboard-profile-popover"]}>
                <div className={css["dashboard-profile-popover-info"]}>
                  <Typography variant="subtitle1">{userInfo?.firstName + " " + userInfo?.lastName}</Typography>
                  <Typography variant="subtitle1" color={'#C8C6CA99'}>{userInfo?.email}</Typography>
                </div>
                <Divider />
                <div className={css["dashboard-profile-popover-logout-container"]}>
                  <Button
                    className={css["button-hover"]}
                    onClick={modalOpen}
                  >
                    <Typography variant='h5' color={"#FFB4AC"}>Logout</Typography>
                  </Button>
                </div>
              </div>
            </Popover>
          </div>
        )}
      </PopupState>
      <CustomDialog onConfirm={logout} open={openModal} onClose={modalClose} title='Sei sicuro di voler uscire dal tuo profilo?' text="Se confermi, ti sarà chiesto di inserire nuovamente le tue credenziali per accedere ai contenuti." />
    </>
  );
}