import React, { createContext, useState } from 'react'
import { type UserDto } from '../dto/user-dto'
import { USER_SESSION_KEY } from '../constants'

interface UserSession {
  user: UserDto
  accessToken: string
}

interface AuthContextState {
  session: UserSession | null
  activateSession: (user: UserDto, accessToken: string, immediate: boolean) => Promise<void>
  clearSession: (immediate: boolean) => Promise<void>
}

export const AuthProviderContext = createContext<AuthContextState>({
  session: null,
  activateSession: async () => {},
  clearSession: async () => {}
})

const AuthProvider = (props: { children: React.ReactNode }) => {
  const [userSession, setUserSession] = useState<UserSession | null>(() => {
    const session = window.localStorage.getItem(USER_SESSION_KEY)
    if (session) {
      return JSON.parse(session) as UserSession
    }
    return null
  })

  const handleActivateSession = async (user: UserDto, accessToken: string, immediate: boolean) => {
    const session: UserSession = {
      user,
      accessToken
    }

    window.localStorage.setItem(USER_SESSION_KEY, JSON.stringify(session))
    if (immediate) {
      setUserSession(session)
    }
  }

  const handleClearSession = async (immediate: boolean) => {
    window.localStorage.removeItem(USER_SESSION_KEY)
    if (immediate) { setUserSession(null) }
  }

  return <AuthProviderContext.Provider value={{
    session: userSession,
    clearSession: handleClearSession,
    activateSession: handleActivateSession
  }}>
        {props.children}
    </AuthProviderContext.Provider>
}

export default AuthProvider
