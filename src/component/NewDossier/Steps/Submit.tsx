import { Navigate } from "react-router-dom"
import React from "react"
import { useSelector } from "react-redux"
import { createDossierId } from "../../../store/stms/dossier/dossier.selector"
import { locationStates } from "../../../types/types"

export const Submit = () => {
    const id = useSelector(createDossierId)
    return (<Navigate to="/pr42" replace={true} state={{ name: locationStates.NEW_DOSSIER, value: id }} />)
}