import { useContext } from 'react'
import { AuthProviderContext } from '../providers/AuthProvider'

const useAuthProvider = () => useContext(AuthProviderContext)

export default useAuthProvider
