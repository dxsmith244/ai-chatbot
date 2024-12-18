'use client'

import { useChat } from 'ai/react'
import { useState } from 'react'
import { Send } from 'lucide-react'

export function ChatForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    onError: (err) => {
      console.error('Chat error:', err)
      setErrorMessage(err.message || 'An error occurred while processing your request.')
    },
  })

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage(null)
    try {
      await handleSubmit(e)
    } catch (err) {
      console.error('Error submitting form:', err)
      setErrorMessage('Failed to send message. Please try again.')
    }
  }

  return (
    <div className="flex flex-col h-[60vh]">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center">Start a conversation to begin.</p>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-primary text-white ml-auto'
                  : 'bg-gray-100 text-gray-800'
              } max-w-[80%]`}
            >
              {message.content}
            </div>
          ))
        )}
      </div>
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
          {errorMessage}
        </div>
      )}
      <form onSubmit={onSubmit} className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message here..."
          className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-primary text-white p-2 rounded-md hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  )
}

