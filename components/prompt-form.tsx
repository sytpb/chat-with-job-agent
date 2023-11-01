import { UseChatHelpers } from 'ai/react'
import * as React from 'react'
import Textarea from 'react-textarea-autosize'

import Dropdown from "@/components/dropdown";
import { Button, buttonVariants } from '@/components/ui/button'
import { IconSun, IconMessageSend } from '@/components/ui/icons'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export interface PromptProps
  extends Pick<UseChatHelpers, 'input' | 'setInput'> {
  onSubmit: (value: string) => Promise<void>
  isLoading: boolean
}

const ask1 = "Tell me a little about yourself ?"
const ask2 = "Do you have professional certifications ?"
const ask3 = "Why should we hire you ?"
const ask4 = "What strengths do you have ?"
const ask5 = "What is your weakness ?"
const ask6 = "Why did you leave your country ?"
const ask7 = "Introduct about this robot ?"

export function PromptForm({
  onSubmit,
  input,
  setInput,
  isLoading
}: PromptProps) {
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const router = useRouter()

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <form
      onSubmit={async e => {
        e.preventDefault()
        if (!input?.trim()) {
          return
        }
        setInput('')
        await onSubmit(input)
      }}
      ref={formRef}
    >
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background px-8 sm:rounded-md sm:border sm:px-12">
        <div className="absolute left-0 top-4 sm:left-2">

          <Dropdown>
            <Dropdown.Button>💡</Dropdown.Button>
            <Dropdown.Menu>
              <Dropdown.MenuItem onSelect={() => setInput(ask1)}>
                {ask1}
              </Dropdown.MenuItem>
              <Dropdown.MenuItem onSelect={() => setInput(ask2)}>
                {ask2}
              </Dropdown.MenuItem>
              <Dropdown.MenuItem onSelect={() => setInput(ask3)}>
                {ask3}
              </Dropdown.MenuItem>
              <Dropdown.MenuItem onSelect={() => setInput(ask4)}>
                {ask4}
              </Dropdown.MenuItem>
              <Dropdown.MenuItem onSelect={() => setInput(ask5)}>
                {ask5}
              </Dropdown.MenuItem>
              <Dropdown.MenuItem onSelect={() => setInput(ask6)}>
                {ask6}
              </Dropdown.MenuItem>
              <Dropdown.MenuItem onSelect={() => setInput(ask7)}>
                {ask7}
              </Dropdown.MenuItem>
            </Dropdown.Menu>
          </Dropdown>


        </div>

        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          rows={1}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Your question here"
          spellCheck={false}
          className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
        />
        <div className="absolute right-0 top-4 sm:right-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="bg-green-100 hover:bg-green-200"
                type="submit"
                size="icon"
                disabled={isLoading || input === ''}
              >
                <IconMessageSend color='green' />
                <span className="sr-only">Send message</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Send message</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </form>
  )
}
