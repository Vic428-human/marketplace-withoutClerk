import React from 'react'
import { useLocation } from "react-router-dom"

const Aution = () => {
const location = useLocation();

  return (
    <div>Aution : {location.state.alt}</div>
  )
}

export default Aution