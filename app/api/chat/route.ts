import { Message } from 'ai'
import { streamText } from 'ai';
import { openai } from '@/lib/openai-config'

export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    
    const result = streamText({
      model: openai('gpt-3.5-turbo'),
      messages: messages as Message[],
      temperature: 0.7,
      maxTokens: 500,
    })

    return result.toDataStreamResponse()
  } catch (error: any) {
    console.error('Error in chat route:', error)
    return new Response(
      JSON.stringify({ 
        error: 'An error occurred while processing your request.',
        details: error instanceof Error ? error.message : String(error)
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}

