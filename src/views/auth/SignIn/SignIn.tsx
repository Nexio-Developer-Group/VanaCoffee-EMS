import Logo from '@/components/template/Logo'
import OtpAuthForm from './components/OtpAuthForm'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { useThemeStore } from '@/store/themeStore'
import { sendOtp, apiLoginWithOTP } from "@/services/AuthService"
import { useSessionUser, useToken } from '@/store/authStore'
import { ADMIN, USER, DEVELOPER } from '@/constants/roles.constant'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import { useNavigate } from 'react-router-dom'
import appConfig from '@/configs/app.config'

type SignInProps = {
    disableSubmit?: boolean
}

// eslint-disable-next-line
export const SignInBase = ({ disableSubmit }: SignInProps) => {
    // eslint-disable-next-line
    const [message, setMessage] = useTimeOutMessage()
    const mode = useThemeStore(state => state.mode)
    const setUser = useSessionUser((state) => state.setUser)
    const setSessionSignedIn = useSessionUser((state) => state.setSessionSignedIn);
    const { setToken } = useToken()
    const navigate = useNavigate();



    // ✅ handlers for OTP
    const handleOtpSend = async (phone: string) => {
        try {
            console.log('Sending OTP to', phone)
            const res = await sendOtp({ phone })
            if (res.status == 1) {
                setMessage('OTP sent successfully!')
            } else {
                throw new Error(res.message || 'Failed to send OTP')
            }
        } catch (err) {
            console.error(err)
            setMessage('Failed to send OTP. Please try again.')
        }
    }

    const handleOtpVerify = async (phone: string, otp: string) => {
        try {
            console.log('Verifying OTP', { phone, otp })
            const res = await apiLoginWithOTP({ phone, otp })
            if (res.status == 1 && res.data?.token) {
                const token = res.data.token
                const user = res.data.user

                // Avatar fallback
                if (!user.avatar) {
                    const nameForAvatar = user.userName || user.phone || "User";
                    user.avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(nameForAvatar)}`;
                }

                // Ensure roles exist
                const roles = user.roles || []

                // Map roles to authority
                const authority: string[] = []
                if (roles.includes("admin")) authority.push(ADMIN)
                if (roles.includes("developer")) authority.push(DEVELOPER)
                if (roles.includes("user")) authority.push(USER)

                // Save to store
                setToken(token)
                setSessionSignedIn(true)
                setUser({
                    ...user,
                    roles,
                    authority
                })

                // Redirect
                const search = window.location.search
                const params = new URLSearchParams(search)
                const redirectUrl = params.get(REDIRECT_URL_KEY)
                if (redirectUrl) navigate(redirectUrl)
                else navigate(appConfig.authenticatedEntryPath)

            } else {
                throw new Error(res.message || 'Invalid OTP')
            }

            setMessage('OTP verified successfully! Logged in.')
        } catch (err) {
            console.error(err)
            setMessage('Invalid OTP. Please try again.')
        }
    }


    return (
        <>
            <div className="flex mb-3">
                <Logo type="long" mode={mode} logoWidth={320} />
            </div>

            <div className="mb-10 px-4">
                <h3 className="mb-2 text-white">Welcome!</h3>
                <p className="font-light text-xs text-white">
                    Please enter your mobile number to sign in!
                </p>
            </div>

            {/* ✅ Replaced old SignInForm with OtpAuthForm */}
            <OtpAuthForm
                className="px-4 text-white"
                onOtpSend={handleOtpSend}
                onOtpVerify={handleOtpVerify}
            />


        </>
    )
}

const SignIn = () => {
    return <SignInBase />
}

export default SignIn
