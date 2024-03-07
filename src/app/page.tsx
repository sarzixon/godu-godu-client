'use client'

import {useEffect, useState} from "react";

export default function Home() {
    const [message, setMessage] = useState('')
    const [chat, setChat] = useState('')
    const [socket, setSocket] = useState<WebSocket | null>(null)


    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080/ws')
        socket.onopen = () => {
            console.log('Connected to Websocket')
        }
        socket.onclose = () => {
            console.log('Disconnected from Websocket')
        }

        socket.onmessage = (event) => {
            console.log('Message:', event.data)
        }
        setSocket(socket)

        return () => {
            socket.close()
        }
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault()
        if (socket) {
            socket.send(message)
            setMessage('')
        }

    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <form onSubmit={handleSubmit}>
                <div className="flex w-full items-center justify-between ">
                    <p className="text-2xl font-bold">Chat</p>
                </div>
                <div className="flex w-full items-center justify-between">
                    <div className="w-full p-4 border-2 rounded-lg text-white min-h-28 my-4">
                        {chat}
                    </div>
                </div>
                <div className="flex w-full items-center justify-between">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        className="w-full p-4 border-2 rounded-lg text-black"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button className="bg-blue-500 p-4 text-white rounded-lg">Send</button>
                </div>
            </form>
        </main>
    );
}
