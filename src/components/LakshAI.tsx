import React, { useState } from "react";
import { IoArrowUpSharp } from "react-icons/io5";
import { marked } from "marked";

const LakshAI: React.FC = () => {
	const renderer = new marked.Renderer();

	renderer.code = (code, language) => {
		const languageClass = language ? `language-${language}` : "";
		return `<pre class="p-1.5 overflow-auto"><code class="${languageClass} text-slate-700 whitespace-pre-wrap break-words text-xs">${code}</code></pre>`;
	};

	renderer.link = (href, _title, text) =>
		`<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-indigo-700 underline underline-offset-2 transition duration-150 ease-in-out hover:text-black hover:underline">${text}</a>`;

	marked.setOptions({ renderer });

	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
		[],
	);
	const [isTyping, setIsTyping] = useState(false);

	const handleSubmit = async (message: string) => {
		if (message.trim() === "") return;

		const userMessage = {
			text: message,
			isUser: true,
		};
		setMessages((prevMessages) => [...prevMessages, userMessage]);
		setMessage("");
		setIsTyping(true);

		const history = messages.map((msg) => ({
			role: msg.isUser ? "user" : "assistant",
			content: msg.text,
		}));

		const res = await fetch("/api/chat", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ message, history }),
		});
		const data = await res.json();
		simulateTypingEffect(data.reply);
	};

	const simulateTypingEffect = (reply: string) => {
		const typingSpeed = 15;
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

	const handleButtonClick = (text: string) => {
		handleSubmit(text);
	};

	const isDisabled = isTyping || message.trim() === "";

	return (
		<div className="flex h-[600px] flex-col text-sm">
			<div className="flex-1 overflow-y-auto rounded-lg border border-body/20 p-4">
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
							<div dangerouslySetInnerHTML={{ __html: marked(message.text) }} />
						</div>
					</div>
				))}
			</div>
			<div className="flex w-full justify-between gap-2 pt-4 text-xs">
				<button
					onClick={() => handleButtonClick("What is your design philosophy?")}
					className="rounded-lg bg-rose-100 px-2.5 py-1.5 text-rose-700 transition duration-300 ease-in-out md:hover:scale-95 md:hover:bg-rose-200 md:hover:text-rose-900"
					disabled={isTyping}>
					What is your design philosophy?
				</button>
				<button
					onClick={() => handleButtonClick("Are you available for hire?")}
					className="rounded-lg bg-violet-100 px-2.5 py-1.5 text-violet-700 transition duration-300 ease-in-out md:hover:scale-95 md:hover:bg-violet-200 md:hover:text-violet-900"
					disabled={isTyping}>
					Are you available for hire?
				</button>
				<button
					onClick={() =>
						handleButtonClick(
							"How much time does it takes for you to design & code a website?",
						)
					}
					className="rounded-lg bg-amber-100 px-2.5 py-1.5 text-amber-700 transition duration-300 ease-in-out md:hover:scale-95 md:hover:bg-amber-200 md:hover:text-amber-900"
					disabled={isTyping}>
					How much time does it takes for you to design & code a website?
				</button>
			</div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleSubmit(message);
				}}
				className="flex-none pt-4">
				<div className="flex">
					<input
						type="text"
						id="message"
						name="message"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						disabled={isTyping}
						className={`flex-1 rounded-l-full border border-r-0 border-body/20 bg-bgColor px-4 py-2.5 placeholder:text-body/50 focus:outline-none focus:ring-0 active:focus:outline-none ${
							isTyping ? "cursor-not-allowed" : "cursor-auto"
						}`}
						placeholder="Ask about me or my work!"
					/>
					<button
						type="submit"
						disabled={isDisabled}
						className="rounded-r-full border border-l-0 border-body/20 px-1.5 focus:outline-none focus:ring-0 active:focus:outline-none">
						<div
							className={`rounded-full p-2 ${isDisabled ? "transition duration-300 ease-in-out md:bg-hoverColor" : "bg-primary transition duration-300 ease-in-out md:hover:scale-95"}`}>
							<IoArrowUpSharp
								className={`${isDisabled ? "text-primary transition duration-150 ease-linear" : "text-bgColor transition duration-150 ease-linear"}`}
							/>
						</div>
					</button>
				</div>
			</form>
			<p className="pt-4 text-sm text-body/80">
				Everyone makes mistakes, including this AI powered by{" "}
				<a
					href="https://llama.meta.com/llama3/"
					target="_blank"
					rel="noopener noreferrer"
					className="text-body underline-offset-4 transition duration-150 ease-in-out md:hover:text-primary md:hover:underline">
					Meta Llama 3
				</a>{" "}
				and{" "}
				<a
					href="https://groq.com/"
					target="_blank"
					rel="noopener noreferrer"
					className="text-body underline-offset-4 transition duration-150 ease-in-out md:hover:text-primary md:hover:underline">
					{" "}
					Groq
				</a>
				. <br className="hidden md:block" />
				Make sure to double-check important information.
			</p>
		</div>
	);
};

export default LakshAI;
