/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { categories } from "../app/data/home";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const TRANSLATE_AMOUNT = 200;

export default function CategoryPills() {
	const [translate, setTranslate] = useState(0);
	const [isLeftVisible, setIsLeftVisible] = useState(true);
	const [isRightVisible, setIsRightVisible] = useState(true);
	const containerRef = useRef(null);
	const [selectedCategory, setSelectedCategory] = useState(categories[0]);

	useEffect(() => {
		if (containerRef.current === null) return;

		const observer = new ResizeObserver((entries) => {
			const container = entries[0]?.target;
			if (container == null) return;

			setIsLeftVisible(translate > 0);
			setIsRightVisible(
				translate + container.clientWidth < container.scrollWidth
			);
		});

		observer.observe(containerRef.current);

		return () => {
			observer.disconnect();
		};
	}, [categories, translate]);

	return (
		<div ref={containerRef} className='relative overflow-hidden'>
			<div
				className='flex whitespace-nowrap gap-3 transition-transform duration-200 ease-in w-[max-content]'
				style={{ transform: `translateX(-${translate}px)` }}
			>
				{categories.map((category) => {
					return (
						<button
							onClick={() => setSelectedCategory(category)}
							key={category}
							className={`p-2 border border-black dark:border-white text-sm rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-200/30 ${
								selectedCategory === category ? "bg-slate-500/50" : "bg-none"
							}`}
						>
							{category}
						</button>
					);
				})}
			</div>

			{isLeftVisible && (
				<div className='absolute left-0 top-0 bg-gradient-to-r from-white dark:from-black from-50% to-transparent w-24 h-full'>
					<button
						className='h-10 aspect-square w-10 p-1.5 hover:bg-slate-400/40 rounded-full'
						onClick={() =>
							setTranslate((translate) => {
								const newTranslate = translate - TRANSLATE_AMOUNT;
								if (newTranslate <= 0) return 0;
								return newTranslate;
							})
						}
					>
						<ChevronLeft />
					</button>
				</div>
			)}

			{isRightVisible && (
				<div className='absolute right-0 top-0 bg-gradient-to-l from-white dark:from-black from-50% to-transparent w-24 h-full flex justify-end'>
					<button
						className='h-10 aspect-square w-10 p-1.5 hover:bg-slate-400/40 rounded-full flex justify-center'
						onClick={() =>
							setTranslate((translate) => {
								if (containerRef.current == null) return translate;
								const newTranslate = translate + TRANSLATE_AMOUNT;
								const edge = containerRef.current.scrollWidth;
								const width = containerRef.current.clientWidth;
								if (newTranslate + width >= edge) {
									return edge - width;
								}
								return newTranslate;
							})
						}
					>
						<ChevronRight />
					</button>
				</div>
			)}
		</div>
	);
}
