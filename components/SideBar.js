"use client";

import {
	ChevronDown,
	ChevronUp,
	CircleUserRound,
	Clapperboard,
	Clock4,
	History,
	HomeIcon,
	Library,
	PlaySquare,
	Repeat,
	Scissors,
	ScissorsSquare,
	ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import { Children, useState } from "react";
import { subscriptions } from "../app/data/sidebar";
import Image from "next/image";

export default function SideBar() {
	return (
		<>
			<aside className='lg:hidden flex flex-col items-center'>
				<SmallSidebarItem Icon={HomeIcon} url={"#"} title={"Home"} />
				<SmallSidebarItem Icon={Repeat} url={"#"} title={"Shorts"} />
				<SmallSidebarItem
					Icon={Clapperboard}
					url={"#"}
					title={"Subscriptions"}
				/>
				<SmallSidebarItem Icon={Library} url={"#"} title={"You"} />
			</aside>

			<aside className='w-56 lg:sticky top-0 overflow-y-auto scrollbar-hidden hidden lg:flex flex-col'>
				<LargeItemsSection>
					<LargeSidebarItem url={"/"} title={"Home"} Icon={HomeIcon} />
					<LargeSidebarItem
						url={"/"}
						title='Subscriptions'
						Icon={Clapperboard}
					/>
					<LargeSidebarItem url={"/"} title={"Library"} Icon={Library} />
				</LargeItemsSection>
				<hr />
				<LargeItemsSection title={"You"} visibleItemCount={5}>
					<LargeSidebarItem
						url={"/"}
						title={"Your Channel"}
						Icon={CircleUserRound}
					/>
					<LargeSidebarItem url={"/"} title='History' Icon={History} />
					<LargeSidebarItem url={"/"} title='Your Videos' Icon={PlaySquare} />
					<LargeSidebarItem url={"/"} title='Watch Later' Icon={Clock4} />
					<LargeSidebarItem url={"/"} title='Your Clips' Icon={Scissors} />
					<LargeSidebarItem url={"/"} title='Liked Videos' Icon={ThumbsUp} />
				</LargeItemsSection>
				<hr />
				<LargeItemsSection>
					{subscriptions.map((subscription) => {
						return (
							<LargeSidebarItem
								key={subscription.id}
								url={subscription.id}
								title={subscription.channelName}
								Icon={subscription.imgUrl}
							/>
						);
					})}
				</LargeItemsSection>
				<hr />
				<LargeItemsSection title={"Explore"}>
					<LargeSidebarItem url='/' title='Trending' Icon=''></LargeSidebarItem>
					<LargeSidebarItem url='/' title='Music' Icon=''></LargeSidebarItem>
					<LargeSidebarItem url='/' title='Gaming' Icon=''></LargeSidebarItem>
					<LargeSidebarItem url='/' title='News' Icon=''></LargeSidebarItem>
					<LargeSidebarItem url='/' title='Sport' Icon=''></LargeSidebarItem>
				</LargeItemsSection>
				<hr />
				<LargeItemsSection title={"More from YouTube"}>
					<Link href={"/"}>YouTube Premium</Link>
					<Link href={"/"}>YouTube Studio</Link>
					<Link href={"/"}>YouTube Music</Link>
					<Link href={"/"}>YouTube Kids</Link>
				</LargeItemsSection>
				<hr />
				<LargeItemsSection>
					<Link href={"/"}>Settings</Link>
					<Link href={"/"}>Report History</Link>
					<Link href={"/"}>Help</Link>
					<Link href={"/"}>Send Feedback</Link>
				</LargeItemsSection>
			</aside>
		</>
	);
}

function SmallSidebarItem({ Icon, title, url }) {
	return (
		<Link href={url} className='flex flex-col items-center gap-1 px-1 py-4'>
			<Icon />
			<span className='text-sm'>{title}</span>
		</Link>
	);
}

function LargeItemsSection({ title, children, visibleItemCount }) {
	const [isExpanded, setIsExpanded] = useState(false);
	const childrenArray = Children.toArray(children).flat();
	const showExpandButton = childrenArray.length > visibleItemCount;
	const visibleChildren = isExpanded
		? childrenArray
		: childrenArray.slice(0, visibleItemCount);
	const ButtonIcon = isExpanded ? <ChevronUp /> : <ChevronDown />;

	return (
		<div>
			{title && (
				<div className='ml-4 mt-4 text-lg mb-1 font-medium'>{title}</div>
			)}
			{visibleChildren}
			{showExpandButton && (
				<button
					onClick={() => setIsExpanded((previous) => !previous)}
					className='w-full flex items-center gap-4 p-3'
				>
					{ButtonIcon}
					{isExpanded ? "Show Fewer" : "Show More"}
				</button>
			)}
		</div>
	);
}

function LargeSidebarItem({ title = "", Icon = "null", url }) {
	return (
		<Link href={url} className='w-full flex items-center gap-4 p-3'>
			{typeof Icon === "string" ? (
				<Image
					src={Icon}
					width={30}
					height={30}
					alt='pfp'
					className='rounded-full'
				/>
			) : (
				<Icon />
			)}
			<div className='whitespace-nowrap overflow-hidden text-ellipsis text-[15px]'>
				{title}
			</div>
		</Link>
	);
}
