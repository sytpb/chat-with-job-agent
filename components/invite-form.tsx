import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { ServerActionResult } from '@/lib/types'

export interface InviteFormProps {
    //children?: React.ReactNode
    afterSubmit: (args: void) => ServerActionResult<void>
}

export function InviteForm({ afterSubmit }: InviteFormProps) {
    async function createPost(data: FormData) {
        'use server'

        let { invite } = Object.fromEntries(data)

        if (invite === 'webuildai' || invite === 'yantao246')
            await afterSubmit()
    }

    return (
        <form action={createPost}>
            <Label htmlFor="invite">Invite Code</Label>
            <Input
                className="peer"
                minLength={9}
                maxLength={9}
                id="invite"
                name="invite"
                type="text"
                placeholder="the invite code"
                autoComplete="off"
                required
            />
            <p className="invisible mt-2 text-sm text-pink-600 peer-invalid:visible">
                Please provide a valid Invite Code.
            </p>
            <Button variant="outline" type="submit" className="my-3 w-full">
                {'continue with invite code'}
            </Button>
        </form>
    )
}
