import { formatTimeAgo } from "../app/utils/formatDate";
import { formatDuration } from "../app/utils/formatDuration";
import Image from "next/image";
import Link from "next/link";

const VIEW_FORMATTER = new Intl.NumberFormat(undefined, {notation: 'compact'})

export default function VideoCard({ id, title, channel, views, postedAt, duration, thumbnailUrl, videoUrl }) {
    return (
        <div aria-description="container" className="flex flex-col gap-2">
            <a href={videoUrl} aria-description="image-container" className="aspect-video relative">
                <Image src={thumbnailUrl} alt="image" width={500} height={50} className="block w-full h-full object-cover" />

                <div className="absolute bottom-1 right-1 text-white text-sm bg-black/40 rounded px-1">
                    {formatDuration(duration)}
                </div>
            </a>

            <div aria-description="text-container" className="flex gap-2">
                <Link href={channel.profileUrl}>
                    <Image src={channel.profileUrl} width={50} height={50} alt="pfp" className="rounded-full" />
                </Link>

                <div>
                    <a href={videoUrl} className="line-clamp-2 font-medium">{title}</a>
                    <div className="text-sm font-light">
                        <p>{channel.name}</p>
                        <div className="flex gap-2">
                            <p>{VIEW_FORMATTER.format(views)}</p>
                            <p>{formatTimeAgo(postedAt)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}