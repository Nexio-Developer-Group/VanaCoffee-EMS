import { useState } from "react"
import { Input } from "@/components/ui/Shadcninput"
import Button from "@/components/ui/Button"
import type { CommonProps } from "@/@types/common"

interface OtpAuthFormProps extends CommonProps {
  onOtpSend?: (phone: string) => Promise<void> | void
  onOtpVerify?: (phone: string, otp: string) => Promise<void> | void
}

const OtpAuthForm = ({ className, onOtpSend, onOtpVerify }: OtpAuthFormProps) => {
  const [step, setStep] = useState<"phone" | "otp">("phone")
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [isSubmitting, setSubmitting] = useState(false)

  const handleSendOtp = async () => {
    if (!phone || phone.length < 8) {
      alert("Enter a valid phone number")
      return
    }

    setSubmitting(true)
    try {
      await onOtpSend?.(phone)
      setOtp("")
      setStep("otp")
    } finally {
      setSubmitting(false)
    }
  }

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 4) {
      alert("OTP must be 4 digits")
      return
    }

    setSubmitting(true)
    try {
      await onOtpVerify?.(phone, otp)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={className}>
      {step === "phone" ? (
        <div>
          <label className="block mb-2">Mobile Number</label>
          <Input
            type="tel"
            placeholder="98765 43210"
            value={phone}
            className="!text-black bg-white focus:bg-white mb-4"
            onChange={(e) => setPhone(e.target.value)}
          />
          <Button
            block
            loading={isSubmitting}
            variant="solid"
            onClick={handleSendOtp}
          >
            {isSubmitting ? "Sending OTP..." : "Send OTP"}
          </Button>
        </div>
      ) : (
        <div>
          <label className="block mb-2">Enter OTP sent to {phone}</label>
          <Input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            maxLength={4}
            className="!text-black bg-white focus:bg-white mb-4"
            onChange={(e) => setOtp(e.target.value)}
          />
          <Button
            block
            loading={isSubmitting}
            variant="solid"
            onClick={handleVerifyOtp}
          >
            {isSubmitting ? "Verifying..." : "Verify OTP"}
          </Button>
          <Button
            block
            variant="default"
            className="mt-2"
            onClick={() => {
              setStep("phone")
              setPhone("")
              setOtp("")
            }}
          >
            Change Number
          </Button>
        </div>
      )}
    </div>
  )
}

export default OtpAuthForm
