import React, { useState, useEffect, useRef } from "react";
import { IoArrowUpSharp } from "react-icons/io5";
import { marked } from "marked";
import { motion, AnimatePresence } from "framer-motion";

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
	const [isThinking, setIsThinking] = useState<boolean>(false);
	const [isTyping, setIsTyping] = useState<boolean>(false);

	const chatContainerRef = useRef<HTMLDivElement>(null);

	const messageVariants = {
		initial: { opacity: 0, y: 10 },
		animate: { opacity: 1, y: 0 },
		exit: { opacity: 0, scale: 0.98, transition: { duration: 0.1 } },
	};

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

		// Set a timeout to show "thinking..." after 2 seconds
		const thinkingTimeout = setTimeout(() => {
			setIsThinking(true);
		}, 2000);

		try {
			const res = await fetch("/api/chat", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message, history }),
			});
			const data = await res.json();

			// Clear the thinking timeout
			clearTimeout(thinkingTimeout);
			setIsThinking(false);

			// Small delay to ensure the thinking message has disappeared
			setTimeout(() => {
				simulateTypingEffect(data.reply);
			}, 100);
		} catch (error) {
			console.error("Error fetching response:", error);
			setIsTyping(false);
			setIsThinking(false);
			clearTimeout(thinkingTimeout);
			// Optionally, you can add an error message to the chat
			setMessages((prevMessages) => [
				...prevMessages,
				{
					text: "Sorry, there was an error processing your request.",
					isUser: false,
				},
			]);
		}
	};

	const simulateTypingEffect = (reply: string) => {
		const typingSpeed = 15;
		let index = 0;
		let currentText = "";

		const typeCharacter = () => {
			if (index < reply.length) {
				currentText += reply.charAt(index);
				setMessages((prevMessages) => {
					const lastMessage = prevMessages[prevMessages.length - 1];

					if (lastMessage && !lastMessage.isUser) {
						const updatedMessage = {
							...lastMessage,
							text: currentText,
						};
						return [...prevMessages.slice(0, -1), updatedMessage];
					} else {
						const newMessage = {
							text: currentText,
							isUser: false,
						};
						return [...prevMessages, newMessage];
					}
				});
				index++;
				setTimeout(typeCharacter, typingSpeed);
			} else {
				setIsTyping(false);
			}
		};

		setMessages((prevMessages) => [
			...prevMessages,
			{ text: "", isUser: false },
		]);

		setTimeout(typeCharacter, typingSpeed);
	};

	const handleButtonClick = (text: string) => {
		handleSubmit(text);
	};

	const isDisabled = isTyping || message.trim() === "";

	useEffect(() => {
		if (chatContainerRef.current) {
			const scrollToBottom = () => {
				chatContainerRef.current!.scrollTo({
					top: chatContainerRef.current!.scrollHeight,
					behavior: "smooth",
				});
			};

			setTimeout(scrollToBottom, 100);
		}
	}, [messages]);

	return (
		<div className="flex h-[600px] flex-col text-sm">
			<div
				ref={chatContainerRef}
				className="flex-1 overflow-y-auto rounded-lg border border-body/20 bg-amber-50/50 p-4">
				<AnimatePresence initial={false}>
					{messages.map((message, index) => (
						<motion.div
							key={index}
							variants={messageVariants}
							initial="initial"
							animate="animate"
							exit="exit"
							transition={{ duration: 0.2, delay: index * 0.05 }} // Faster animation
							className={`flex ${
								message.isUser ? "justify-end" : "justify-start"
							} mb-4`}>
							<div
								className={`${
									message.isUser
										? "rounded-full bg-blue-100 text-blue-700"
										: "rounded-full bg-green-100 text-emerald-700"
								} max-w-xs rounded-lg px-2.5 py-1.5`}>
								<div
									dangerouslySetInnerHTML={{ __html: marked(message.text) }}
								/>
							</div>
						</motion.div>
					))}
					{isThinking && (
						<motion.div
							key="thinking"
							variants={messageVariants}
							initial="initial"
							animate="animate"
							exit="exit"
							transition={{ duration: 0.2 }}
							className="mb-4 flex justify-start">
							<div className="max-w-xs rounded-lg bg-green-100 px-2.5 py-1.5 text-emerald-700">
								Thinking...
							</div>
						</motion.div>
					)}
				</AnimatePresence>

				<AnimatePresence>
					{messages.length === 0 && (
						<motion.div
							variants={messageVariants}
							initial="initial"
							animate="animate"
							exit="exit"
							transition={{ duration: 0.3 }}
							className="mb-4 flex justify-start">
							<div className="max-w-xs rounded-lg bg-green-100 px-2.5 py-1.5 text-emerald-700">
								Hi! I'm{" "}
								<span className="font-semibold">Lakshay's AI persona</span>. Ask
								me anything about him or his work. I'll be happy to assist you.
							</div>
						</motion.div>
					)}
				</AnimatePresence>
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
					href="https://llama.meta.com/"
					target="_blank"
					rel="noopener noreferrer"
					className="text-body underline-offset-4 transition duration-150 ease-in-out md:hover:text-primary md:hover:underline">
					Meta Llama 3.1
				</a>{" "}
				and{" "}
				<a
					href="https://groq.com/"
					target="_blank"
					rel="noopener noreferrer"
					className="text-body underline-offset-4 transition duration-150 ease-in-out md:hover:text-primary md:hover:underline">
					Groq
				</a>
				. <br className="hidden md:block" />
				Make sure to double-check important information.
			</p>
		</div>
	);
};

export default LakshAI;
