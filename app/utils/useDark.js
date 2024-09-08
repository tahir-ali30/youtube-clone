"use client";
import { useState } from "react";

function setLocalTheme(theme) {
	localStorage.setItem("youtube-theme", JSON.stringify(theme));
}

function useDark() {
	const defaultTheme = JSON.parse(localStorage.getItem("youtube-theme"));
	const [theme, setTheme] = useState(defaultTheme);

	function handleTheme() {
		setTheme((prev) => {
			const newTheme = prev === "light" ? "dark" : "light";
			setLocalTheme(newTheme);
			return newTheme;
		});
	}

	return { handleTheme, theme };
}

export default useDark;
