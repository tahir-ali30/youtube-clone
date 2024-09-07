import VideoCard from '../components/VideoCard'
import Image from 'next/image'
import { videos } from './data/home'

export default function Home() {
  return (
    <>
      {videos.map(video => {
        return <VideoCard key={video.id} {...video} />
      })}
    </>
  )
}
