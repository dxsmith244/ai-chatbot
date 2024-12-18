import { ChatForm } from '@/components/chat-form'

export default function Home() {
  return (
    <div className="min-h-screen py-8 px-4">
      <main className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">AI Chatbot</h1>
        <ChatForm />
      </main>
    </div>
  )
}

