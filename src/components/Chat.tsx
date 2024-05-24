import React, { useState } from "react";
import { IoArrowUpSharp } from "react-icons/io5";

const GroqChat: React.FC = () => {
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
		[],
	);
	const [isTyping, setIsTyping] = useState(false);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		if (message.trim() === "") return;

		const userMessage = {
			text: message,
			isUser: true,
		};
		setMessages((prevMessages) => [...prevMessages, userMessage]);
		setMessage("");
		setIsTyping(true);

		const res = await fetch("/api/chat", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ message }),
		});
		const data = await res.json();
		console.log(data);
		simulateTypingEffect(data.reply);
	};

	const simulateTypingEffect = (reply: string) => {
		const typingSpeed = 25;
		let index = -1;

		const typeCharacter = () => {
			if (index < reply.length) {
				setMessages((prevMessages) => {
					const lastMessage = prevMessages[prevMessages.length - 1];
					if (lastMessage && !lastMessage.isUser) {
						lastMessage.text += reply.charAt(index);
						return [...prevMessages.slice(0, -1), lastMessage];
					} else {
						return [
							...prevMessages,
							{
								text: reply.charAt(index),
								isUser: false,
							},
						];
					}
				});
				index++;
				setTimeout(typeCharacter, typingSpeed);
			} else {
				setIsTyping(false);
			}
		};

		typeCharacter();
	};

	const isDisabled = isTyping || message.trim() === "";

	return (
		<div className="flex h-[600px] flex-col text-sm">
			<div className="flex-1 overflow-y-auto rounded-lg border p-4">
				{messages.map((message, index) => (
					<div
						key={index}
						className={`flex ${
							message.isUser ? "justify-end" : "justify-start"
						} mb-4`}>
						<div
							className={`${
								message.isUser
									? "rounded-full bg-blue-100 text-blue-700"
									: "rounded-full bg-green-100 text-emerald-700"
							} max-w-xs rounded-lg px-2.5 py-1.5`}>
							<p>{message.text}</p>
						</div>
					</div>
				))}
			</div>
			<form onSubmit={handleSubmit} className="flex-none pt-4">
				<div className="flex">
					<input
						type="text"
						id="message"
						name="message"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						disabled={isTyping}
						className="border-gray-150 flex-1 rounded-l-full border border-r-0 bg-bgColor px-4 py-2.5 focus:outline-none focus:ring-0 active:focus:outline-none"
						placeholder="Ask about me or my work!"
					/>
					<button
						type="submit"
						disabled={isDisabled}
						className="border-gray-150 rounded-r-full border border-l-0 px-1.5 focus:outline-none focus:ring-0 active:focus:outline-none">
						<div
							className={`rounded-full p-2 ${isDisabled ? "bg-green-200 transition duration-150 ease-linear" : "bg-primary transition duration-150 ease-linear"}`}>
							<IoArrowUpSharp
								className={`${isDisabled ? "text-primary transition duration-150 ease-linear" : "text-bgColor transition duration-150 ease-linear"}`}
							/>
						</div>
					</button>
				</div>
			</form>
		</div>
	);
};

export default GroqChat;
