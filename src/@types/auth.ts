export type SignInCredential = {
    email: string
    password: string
}

export type OTPLoginCredential = {
    phone: string
    otp: string
}   

export type sendOtpResponse  = {
    status: number
    message?: string
    error?: string
}

export type LoginReponse = {
    status: number
    message?: string
    error?: string
    data?: {
        token: string
        user: {
            userId: string
            userName?: string
            roles: string[]
            avatar?: string
            email?: string
            phone: string
        }
    }
}

export type SignInResponse = {
    token: string
    user: {
        userId: string
        userName: string
        authority: string[]
        avatar: string
        email: string
    }
}

export type SignUpResponse = SignInResponse

export type SignUpCredential = {
    userName: string
    email: string
    password: string
}

export type ForgotPassword = {
    email: string
}

export type ResetPassword = {
    password: string
}

export type AuthRequestStatus = 'success' | 'failed' | ''

export type AuthResult = Promise<{
    status: AuthRequestStatus
    message: string
}>

export type User = {
    userId?: string | null
    avatar?: string | null
    userName?: string | null
    email?: string | null
    authority?: string[]
    phone?: string | null
    roles?: string[] // Added roles field
}

export type Token = {
    accessToken: string
    refereshToken?: string
}

export type OauthSignInCallbackPayload = {
    onSignIn: (tokens: Token, user?: User) => void
    redirect: () => void
}
