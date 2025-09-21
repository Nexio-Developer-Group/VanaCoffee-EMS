import cookiesStorage from '@/utils/cookiesStorage'
import appConfig from '@/configs/app.config'
import { TOKEN_NAME_IN_STORAGE } from '@/constants/api.constant'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { User } from '@/@types/auth'
import { ADMIN, DEVELOPER, USER } from '@/constants/roles.constant'

type Session = {
    signedIn: boolean
}

type AuthState = {
    session: Session
    user: User
}

type AuthAction = {
    setSessionSignedIn: (payload: boolean) => void
    setUser: (payload: Partial<User>) => void
}

const getPersistStorage = () => {
    if (appConfig.accessTokenPersistStrategy === 'localStorage') return localStorage
    if (appConfig.accessTokenPersistStrategy === 'sessionStorage') return sessionStorage
    return cookiesStorage
}

const initialState: AuthState = {
    session: { signedIn: false },
    user: { avatar: '', userName: '', email: '', phone: '', authority: [], roles: [] },
}

export const useSessionUser = create<AuthState & AuthAction>()(
    persist(
        (set) => ({
            ...initialState,

            setSessionSignedIn: (payload) =>
                set((state) => ({
                    session: { ...state.session, signedIn: payload },
                })),

            setUser: (payload) => {
                set((state) => {
                    // Use roles from payload if available, otherwise fallback to existing
                    const roles = payload.roles || state.user.roles || []

                    // Map roles to authority constants
                    const authority: string[] = []
                    if (roles.includes('admin')) authority.push(ADMIN)
                    if (roles.includes('developer')) authority.push(DEVELOPER)
                    if (roles.includes('user')) authority.push(USER)

                    // Avatar fallback
                    const avatar =
                        payload.avatar ||
                        (payload.userName || payload.phone
                            ? `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                  payload.userName || payload.phone || 'User',
                              )}`
                            : '')

                    return {
                        user: {
                            ...state.user,
                            ...payload,
                            roles,
                            authority,
                            avatar,
                        },
                    }
                })
            },
        }),
        {
            name: 'sessionUser',
            storage: createJSONStorage(() => localStorage),
        },
    ),
)

export const useToken = () => {
    const storage = getPersistStorage()

    const setToken = (token: string) => {
        storage.setItem(TOKEN_NAME_IN_STORAGE, token)
    }

    return {
        setToken,
        token: storage.getItem(TOKEN_NAME_IN_STORAGE),
    }
}
