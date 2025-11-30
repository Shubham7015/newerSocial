import React, { useState } from 'react'
import toast from 'react-hot-toast';
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { Button, Input, Logo } from './index'
import conf from '../conf/conf'

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("")
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      // making account in authService 
      const userData = await authService.createAccount(data);
      // if current user is not empty get the current userdata
      if (userData) {
        const currentUser = await authService.getCurrentUser();

        // if current user than dispatch or update the stor with userData
        if (currentUser) {
          dispatch(login(currentUser));
          // Trigger email verification
          try {
            // Use configured URL or dynamic origin
            const verificationUrl = conf.appwriteVerificationUrl || `${window.location.origin}/verify-email`;
            await authService.createVerification(verificationUrl);
            toast.success("Account created! Please check your email to verify your account.");
          } catch (verifyError) {
            // Don't block signup if verification fails, just warn
            toast.error(`Account created, but failed to send verification email: ${verifyError.message || "Unknown error"}`);
          }
        }
        navigate('/'); // navigate to home
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className='flex item-center justify-center'>
      <div className={`mx-auto w-full max-w-lg bg-blue-100 rounded-xl p-10 border border-black/10`}>
        <div className='mb-2 flex justify-center'>
          <span className='inline-block w-full max-w-[100px]'>
            <Logo width='100px' />
          </span>
        </div>
        <h2 className='text-center text-2xl font-bold leading-tight'>Sign in to your account </h2>
        <p className='mt-2 text-center text-base text-black/60'>

          Already have and account?&nbsp;
          <Link
            to="/login"
            className='font-medium text-primary transition-all duration-200 hover:underline'
          >
            Signup

          </Link>
        </p>
        {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}

        <form onSubmit={handleSubmit(create)}
        >
          <div className='space-y-5'>
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              {...register("name", {
                required: true
              })}
            />
            <Input
              label="Email:"
              placeholder="Enter your email..."
              type='email'
              {...register("email", {
                required: "Enter your email",
                validate: {
                  matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a  valid address"
                }
              })}
            />
            <Input
              label="Password:"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                validate: {
                  hasUppercase: value =>
                    /[A-Z]/.test(value) || "Must include at least one uppercase letter",
                  hasNumber: value =>
                    /\d/.test(value) || "Must include at least one number",
                  hasSpecial: value =>
                    /[^A-Za-z0-9]/.test(value) ||
                    "Must include at least one special character",
                  minLength: value =>
                    value.length >= 8 || "Must be at least 8 characters long"
                }
              })}
            />

            <Button type='submit' className='w-full cursor-pointer'>
              Create Account
            </Button>

          </div>
        </form>
      </div>

    </div>
  )
}

export default SignUp