import { ChatInterface } from "@/components/chat/chat-interface"

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function Page({ params }: PageProps) {
    const { id } = await params
    return <ChatInterface id={id} />
}
