import { useAuthContext } from './useAuthContext'
import { useNotesContext } from './useNotesContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchNotes } = useNotesContext()

  const logout = () => {
    localStorage.removeItem('user')

    dispatch({ type: 'LOGOUT' })
    dispatchNotes({ type: 'SET_NOTES', payload: null })
  }

  return { logout }
}