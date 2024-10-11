import React, { useState } from "react";
import { LiaUploadSolid } from "react-icons/lia";

const UploadForm = () => {
	const [file, setFile] = useState<File | null>(null);
	const [secret, setSecret] = useState<string>("");
	const [message, setMessage] = useState<string>("");

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			setFile(event.target.files[0]);
		}
	};

	const handleSecretChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSecret(event.target.value);
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!file || !secret) {
			setMessage("Please provide both file and secret.");
			return;
		}

		const formData = new FormData();
		formData.append("file", file);
		formData.append("secret", secret);

		try {
			const response = await fetch("/api/upload", {
				method: "POST",
				body: formData,
			});

			if (response.ok) {
				setMessage("File uploaded successfully!");
			} else {
				setMessage("File upload failed.");
			}
		} catch (error) {
			setMessage("An error occurred.");
		}
	};

	return (
		<form onSubmit={handleSubmit} className="pt-4">
			<label
				htmlFor="file"
				className="flex w-full cursor-copy items-center justify-center rounded-lg border border-dashed border-body/40 bg-hoverColor p-16 text-sm font-medium text-body transition-all duration-300 ease-in-out md:hover:border-primary md:hover:bg-emerald-200/80 md:hover:text-emerald-700">
				<span>{file ? file.name : "Upload a .txt file"}</span>
				<input
					type="file"
					id="file"
					name="file"
					accept=".txt"
					className="hidden"
					onChange={handleFileChange}
				/>
			</label>

			<input
				type="text"
				id="secret"
				name="secret"
				placeholder="Enter secret"
				className="mt-4 w-full rounded-md border border-body/40 bg-bgColor p-2 text-sm text-body transition duration-150 ease-in-out focus:border-primary focus:outline-none md:hover:border-primary"
				value={secret}
				onChange={handleSecretChange}
				required
			/>

			<button
				type="submit"
				className="ml-auto mt-4 inline-block rounded-full bg-primary px-4 py-2 text-xs text-bgColor transition duration-300 ease-in-out disabled:cursor-not-allowed disabled:bg-body md:hover:scale-95 md:hover:bg-primary/90 disabled:md:hover:scale-100 disabled:md:hover:bg-body"
				disabled={!file || !secret}>
				<LiaUploadSolid className="-mt-0.5 inline-block" />
				<span>Upload File</span>
			</button>

			<div id="message" className="mt-4 text-sm font-medium">
				{message}
			</div>
		</form>
	);
};

export default UploadForm;
