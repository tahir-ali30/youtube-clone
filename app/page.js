"use client";
import VideoCard from "../components/VideoCard";
import Image from "next/image";
import { videos } from "./data/home";
import useDark from "../app/utils/useDark";
import { useEffect } from "react";

export default function Home() {
	return (
		<>
			{videos.map((video) => {
				return <VideoCard key={video.id} {...video} />;
			})}
		</>
	);
}
