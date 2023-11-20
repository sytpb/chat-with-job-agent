import { auth } from '@/auth'
import { GoogleButton } from '@/components/google-button'
import { LoginButton } from '@/components/github-button'
import { redirect } from 'next/navigation'
import { revalidatePath } from "next/cache";
import { InviteForm } from '@/components/invite-form'

export default async function SignInPage() {
  const session = await auth()
  // redirect to home if user is already logged in
  if (session?.user) {
    redirect('/')
  }

  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))] flex-col items-center justify-center gap-y-2 py-10">
      <div className="sm:p-34 mx-4 mt-10 flex-auto rounded-2xl bg-white px-4 py-10 shadow-2xl shadow-gray-900/10 sm:mx-0 sm:flex-none xl:w-1/5">
        <div className="w-full space-y-2">
          <InviteForm afterSubmit={async () => {
              "use server";
              console.log("afterSubmit")
              redirect('/');}}/>
        </div>
        <div className="mx-auto my-5 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:grow before:bg-stone-400 after:ml-4 after:block after:h-px after:grow after:bg-stone-400">
          or
        </div>
        <div className="flex flex-col gap-2">
          <LoginButton />
          <GoogleButton />
        </div>
      </div>
    </div>
  )
}
