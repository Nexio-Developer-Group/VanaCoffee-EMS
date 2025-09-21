import Logo from '@/components/template/Logo'
import Alert from '@/components/ui/Alert'
import OtpAuthForm from './components/OtpAuthForm'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { useThemeStore } from '@/store/themeStore'

type SignInProps = {
    disableSubmit?: boolean
}

// eslint-disable-next-line
export const SignInBase = ({ disableSubmit }: SignInProps) => {
    const [message, setMessage] = useTimeOutMessage()
    const mode = useThemeStore(state => state.mode)

    // ✅ handlers for OTP
    const handleOtpSend = async (phone: string) => {
        try {
            console.log('Sending OTP to', phone)
            // 👉 call your backend here
            // await api.sendOtp(phone)
        } catch (err) {
            console.error(err)
            setMessage('Failed to send OTP. Please try again.')
        }
    }

    const handleOtpVerify = async (phone: string, otp: string) => {
        try {
            console.log('Verifying OTP', { phone, otp })
            // 👉 call your backend here
            // await api.verifyOtp(phone, otp)
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

            {message && (
                <Alert showIcon className="mb-4" type="danger">
                    <span className="break-all ">{message}</span>
                </Alert>
            )}

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
