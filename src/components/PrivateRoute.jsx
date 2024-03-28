import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ Component }) => {

  const isAutheticated = useSelector(state => state.auth.isAutheticated)
  console.log("estoy autenticado: ", isAutheticated)

  return isAutheticated ? <Component /> : <Navigate to="/login" />

}

export default PrivateRoute
