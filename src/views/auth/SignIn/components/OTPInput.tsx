import { useState, useRef, useEffect } from "react"

interface OTPInputProps {
  length: number
  value?: string
  onChange?: (otp: string) => void
  onComplete?: (otp: string) => void
  disabled?: boolean
}

export const OTPInput = ({
  length,
  value,
  onChange,
  onComplete,
  disabled = false,
}: OTPInputProps) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""))
  const [activeOTPIndex, setActiveOTPIndex] = useState(0)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Sync external value
  useEffect(() => {
    if (value !== undefined) {
      const arr = value.split("").slice(0, length)
      setOtp([...arr, ...new Array(length - arr.length).fill("")])
    }
  }, [value, length])

 const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>, index: number) => {
  const { value } = target
  if (!/^\d*$/.test(value)) return

  const newOTP = [...otp]
  newOTP[index] = value.slice(-1)
  setOtp(newOTP)

  const otpValue = newOTP.join("")
  onChange?.(otpValue)  // <-- must call on every keystroke

  if (otpValue.length === length) {
    onComplete?.(otpValue)
  }

  if (value && index < length - 1) {
    setActiveOTPIndex(index + 1)
  }
}

  const handleOnKeyDown = (
    { key }: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const newOTP = [...otp]

    if (key === "Backspace") {
      if (otp[index]) {
        newOTP[index] = ""
        setOtp(newOTP)
        onChange?.(newOTP.join(""))
      } else if (index > 0) {
        newOTP[index - 1] = ""
        setOtp(newOTP)
        setActiveOTPIndex(index - 1)
        onChange?.(newOTP.join(""))
      }
    }

    if (key === "ArrowLeft" && index > 0) {
      setActiveOTPIndex(index - 1)
    }

    if (key === "ArrowRight" && index < length - 1) {
      setActiveOTPIndex(index + 1)
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
    e.preventDefault()
    const pasteData = e.clipboardData.getData("text").replace(/\s/g, "").slice(0, length)
    if (!/^\d+$/.test(pasteData)) return

    const newOTP = [...otp]
    pasteData.split("").forEach((digit, i) => {
      if (index + i < length) {
        newOTP[index + i] = digit
      }
    })

    setOtp(newOTP)
    const otpValue = newOTP.join("")
    onChange?.(otpValue)
    if (otpValue.length === length) onComplete?.(otpValue)

    // move focus to last filled index
    setActiveOTPIndex(Math.min(index + pasteData.length, length - 1))
  }

  useEffect(() => {
    inputRefs.current[activeOTPIndex]?.focus()
  }, [activeOTPIndex])

  return (
    <div className="flex justify-center sm:justify-start !text-black space-x-3">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => { inputRefs.current[index] = el }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          className="w-14 h-14 rounded-lg border-2 text-center text-2xl font-semibold 
          bg-input border-border focus:border-primary focus:ring-2 
          focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
          value={digit}
          disabled={disabled}
          onChange={(e) => handleOnChange(e, index)}
          onKeyDown={(e) => handleOnKeyDown(e, index)}
          onPaste={(e) => handlePaste(e, index)}
          onFocus={() => setActiveOTPIndex(index)}
        />
      ))}
    </div>
  )
}
