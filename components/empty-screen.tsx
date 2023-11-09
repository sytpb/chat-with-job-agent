import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'

const exampleMessages = [
  {
    heading: 'Tell me a little about yourself ?',
    message: 'Tell me a little about yourself ?'
  },
  {
    heading: 'Which skills do you have ?',
    message: 'Which skills do you have ?'
  },
  {
    heading: 'What strengths do you have ?',
    message: `What strengths do you have ?`
  }
]

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">
          Hi I am an AI chatbot built by <span className='text-cyan-500'>Yantao Song</span>
        </h1>
        <p className="mb-2 leading-normal text-muted-foreground">
          You can ask me some questions about Yantao Song
        </p>
        <p className="leading-normal text-muted-foreground">
          Start a conversation here or try the following questions:
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {exampleMessages.map((message, index) => (
            <div key={index}>
              <span className="mr-2 text-muted-foreground">💡</span>
              <Button
                key={index}
                variant="link"
                className="h-auto p-0 text-base"
                onClick={() => setInput(message.message)}
              >
                {message.heading}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


const remove = () => {
  return (
    <>
      <ExternalLink href="https://nextjs.org">Next.js</ExternalLink> and{' '}
      <ExternalLink href="https://vercel.com/storage/kv">
        Vercel KV
      </ExternalLink>
      .
    </>
  )

}