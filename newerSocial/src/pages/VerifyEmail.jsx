import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import authService from '../appwrite/auth'
import { Container, Button } from '../components'
import conf from '../conf/conf'

function VerifyEmail() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [message, setMessage] = useState("Verifying...")
    const [error, setError] = useState(false)
    const [isPromptMode, setIsPromptMode] = useState(false)

    useEffect(() => {
        const userId = searchParams.get('userId')
        const secret = searchParams.get('secret')

        if (userId && secret) {
            // Callback mode: Verify the email
            authService.updateVerification(userId, secret)
                .then(() => {
                    setMessage("Email verified successfully! Redirecting to login...")
                    setTimeout(() => {
                        navigate('/login')
                    }, 3000)
                })
                .catch((err) => {
                    setError(true)
                    setMessage(err.message || "Verification failed. Link may be expired or invalid.")
                })
        } else {
            // Prompt mode: User is redirected here to verify
            setIsPromptMode(true)
            setMessage("Please verify your email address to access the application.")
        }
    }, [searchParams, navigate])

    const handleResend = async () => {
        try {
            setMessage("Sending verification email...")
            const verificationUrl = conf.appwriteVerificationUrl || `${window.location.origin}/verify-email`;
            await authService.createVerification(verificationUrl);
            setMessage("Verification email sent! Please check your inbox.")
            setError(false)
        } catch (err) {
            setError(true)
            setMessage("Failed to send verification email. Please try again later.")

        }
    }

    return (
        <div className="py-8">
            <Container>
                <div className={`max-w-md mx-auto p-6 rounded-xl border ${error ? 'bg-red-100 border-red-400 text-red-700' : 'bg-blue-100 border-blue-400 text-blue-700'}`}>
                    <h2 className="text-xl font-bold text-center mb-4">{message}</h2>
                    {isPromptMode && (
                        <div className="text-center">
                            <p className="mb-4">Check your email for a verification link.</p>
                            <Button
                                onClick={handleResend}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Resend Verification Email
                            </Button>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    )
}

export default VerifyEmail
