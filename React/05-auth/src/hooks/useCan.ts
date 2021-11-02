import {useContext} from "react";
import {AuthContext} from "../contexts/AuthContext";
import {validateUserPermissions} from "../utils/validateUserPermissions";

type UseCanParams = {
  permissions?: string[]
  roles?: string[]
}

export function useCan({roles, permissions}: UseCanParams) {
  const {user, isAuthenticated} = useContext(AuthContext)

  if(!isAuthenticated) {
    return false
  }

  return validateUserPermissions({
    user,
    permissions,
    roles
  })
}
