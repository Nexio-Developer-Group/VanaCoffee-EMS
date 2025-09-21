import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z, type ZodType } from "zod"
import { Form, FormItem } from "@/components/ui/Form"
import Input from "@/components/ui/Input"
import Button from "@/components/ui/Button"
import { OTPInput } from "./OTPInput"
import type { CommonProps } from "@/@types/common"

interface OtpAuthFormProps extends CommonProps {
  onOtpSend?: (phone: string) => Promise<void> | void
  onOtpVerify?: (phone: string, otp: string) => Promise<void> | void
}

type PhoneSchema = { phone: string }
type OtpSchema = { otp: string }

const phoneValidation: ZodType<PhoneSchema> = z.object({
  phone: z
    .string({ required_error: "Please enter your mobile number" })
    .min(8, { message: "Enter a valid phone number" }),
})

const otpValidation: ZodType<OtpSchema> = z.object({
  otp: z
    .string({ required_error: "Please enter the OTP" })
    .length(4, { message: "OTP must be 4 digits" }),
})

const OtpAuthForm = ({ className, onOtpSend, onOtpVerify }: OtpAuthFormProps) => {
  const [step, setStep] = useState<"phone" | "otp">("phone")
  const [phone, setPhone] = useState("")
  const [isSubmitting, setSubmitting] = useState(false)

  // Phone form
  const {
    handleSubmit: handlePhoneSubmit,
    control: phoneControl,
    reset: resetOtpForm,
    formState: { errors: phoneErrors },
  } = useForm<PhoneSchema>({
    defaultValues: { phone: "" },
    resolver: zodResolver(phoneValidation),
  })

  // OTP form
  const {
    handleSubmit: handleOtpSubmit,
    control: otpControl,
    formState: { errors: otpErrors },
  } = useForm<OtpSchema>({
    defaultValues: { otp: "" },
    resolver: zodResolver(otpValidation),
  })

  const submitPhone = async ({ phone }: PhoneSchema) => {
    setSubmitting(true)
    try {
      setPhone(phone)
      await onOtpSend?.(phone)
      resetOtpForm()
      setStep("otp")
    } finally {
      setSubmitting(false)
    }
  }

  const submitOtp = async ({ otp }: OtpSchema) => {
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
        <Form onSubmit={handlePhoneSubmit(submitPhone)}>
          <FormItem
            label="Mobile Number"
            invalid={Boolean(phoneErrors.phone)}
            errorMessage={phoneErrors.phone?.message}
          >
            <Controller
              name="phone"
              control={phoneControl}
              render={({ field }) => (
                <Input
                  type="tel"
                  placeholder="98765 43210"
                  className="!text-black bg-white focus:bg-white"
                  autoComplete="off"
                  {...field}
                />
              )}
            />
          </FormItem>
          <Button
            block
            loading={isSubmitting}
            variant="solid"
            type="submit"
            className="mb-2"
          >
            {isSubmitting ? "Sending OTP..." : "Send OTP"}
          </Button>
        </Form>
      ) : (
        <Form onSubmit={handleOtpSubmit(submitOtp)}>
          <FormItem
            label={`Enter OTP sent to ${phone}`}
            invalid={Boolean(otpErrors.otp)}
            errorMessage={otpErrors.otp?.message}
          >
            <Controller
              name="otp"
              control={otpControl}
              render={({ field }) => (
                <OTPInput
                  length={4}
                  disabled={isSubmitting}
                  value={field.value || ""}
                  onChange={(val) => field.onChange(val)} // ensures RHF sees exact OTP
                    onComplete={(val) => field.onChange(val)} // make sure last digit triggers change
                />
              )}
            />
          </FormItem>
          <Button
            block
            loading={isSubmitting}
            variant="solid"
            type="submit"
            className="mb-2"
          >
            {isSubmitting ? "Verifying..." : "Verify OTP"}
          </Button>

          <Button
            block
            type="button"
            variant="default"
            className="mb-2"
            onClick={() => {
              setStep("phone")
              setPhone("")
            }}
          >
            Change Number
          </Button>
        </Form>
      )}
    </div>
  )
}

export default OtpAuthForm
