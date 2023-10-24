/*import { kv } from '@vercel/kv'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'

import { auth } from '@/auth'
import { nanoid } from '@/lib/utils'

export const runtime = 'edge'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)


export async function POST(req: Request) {
  console.log(req.headers)
  const json = await req.json()
  const { messages, previewToken } = json
  const userId = (await auth())?.user.id

  console.log({ messages })
  if (!userId) {
    return new Response('Unauthorized', {
      status: 401
    })
  }

  if (previewToken) {
    configuration.apiKey = previewToken
  }

  const res = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages,
    temperature: 0.7,
    stream: true
  })

  const stream = OpenAIStream(res, {
    async onCompletion(completion) {
      const title = json.messages[0].content.substring(0, 100)
      const id = json.id ?? nanoid()
      const createdAt = Date.now()
      const path = `/chat/${id}`
      const payload = {
        id,
        title,
        userId,
        createdAt,
        path,
        messages: [
          ...messages,
          {
            content: completion,
            role: 'assistant'
          }
        ]
      }

      console.log({ json, payload });
    }
  })

  return new StreamingTextResponse(stream)
}*/

import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai'

import { auth } from '@/auth'
import { nanoid } from '@/lib/utils'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {

  const userId = (await auth())?.user.id
  if (!userId) {
    return new Response('Unauthorized', {
      status: 401
    })
  }
  const { messages } = await req.json();

  const context = "You are Yantao song, and has 15 year experiences of software development, contacts is 0415734122 , email is songyantao@foxmail.com";
  const question = messages[messages.length - 1].content;

  const history = messages.map((item: any) => {
    return JSON.stringify(item)
  });

  const prompt =
    `Acts as a candidate for job interviews. Your name is Yantao Song. You speak with HR, providing information about Yantao Song. For answering questions use information delimited with triple quotes. We call it a Knowledge base.

      If the Knowledge base contains the answer, use it to answer the question.
      If the Knowledge base doesn't contain the answer, then simply write "Sorry, my host hasn't told me about this"
      
      Knowledge base:
      """Candidate: Yantao Song
      You are Yantao song, and has 15 year experiences of software development, contacts is 0415734122 , email is songyantao@foxmail.com

      CHAT HISTORY: ${history}
      CONTEXT: ${context}
      QUESTION: ${question}
      Helpful Answer:"""`;

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    temperature: 0,
    stream: true,
    messages: [
      {
        role: 'user',
        content: `Answer the question based only on the following context,if doesn't contain the answer, then simply write "Sorry, my host hasn't trained me about this":
          {
            Acts as a candidate for job interviews. Your name is Yantao Song. You speak with HR, providing information about Yantao Song: Yantao Song, has 15 year experiences of software development, contacts is 0415734122 , email is songyantao@foxmail.com, 
            if HR let you ask some question, your can ask 'what kind of your company is?', greeting using 'Hello, I am Yantao, a robot buit by Yantao Song, let's start our interview'
            
            Tell me about yourself:
            Thank you for giving me the opportunity to be interviewed for this position today. I have applied for the job because I believe the skills and qualities. I possess are a match for the job description.
            I have several years' experience in this industry which means I can come into your company and make a fast and immediate impact. I am a strong communicator I work very well both on my own and as part of a team I will always provide excellent customer service and I will always perform to a high standard whilst under pressure.
            
            Professional Certifications:
            AWS Certified Solutions Architect  8th Apr 2023
          }
          Question: ${question}
          Helpful Answer:`,
      },
    ],
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}

/*const remove = async () => {
  const id = "";
  const userId = "";
  const payload = {};
  const createdAt = Date.now();

  await kv.hmset(`chat:${id}`, payload)
  await kv.zadd(`user:chat:${userId}`, {
    score: createdAt,
    member: `chat:${id}`
  })
}*/