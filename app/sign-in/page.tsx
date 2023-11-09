import { auth } from '@/auth'
import { GoogleButton } from '@/components/google-button'
import { LoginButton } from '@/components/github-button'
import { redirect } from 'next/navigation'

export default async function SignInPage() {
  const session = await auth()
  // redirect to home if user is already logged in
  if (session?.user) {
    redirect('/')
  }
  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))] flex-col items-center justify-center gap-y-2 py-10">
      <LoginButton />
      <GoogleButton />
    </div>
  )
}
