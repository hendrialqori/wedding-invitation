import Image from "next/image";
import Timeline from "./Timeline";

const timelines = [
    {
        title: "First met",
        description: "We first met at our workplace in 2017"
    },
    {
        title: "Our Similiarity",
        description: "We loves to travel, Eat good food and Watch movies"
    },
    {
        title: "Starting to become an official couple",
        description: "in 2020, we officially become a couple"
    },
    {
        title: "Invite to Celebrate",
        description: "22 September 2024, we invite you to celebrate our happy day."
    }
]

export default function OurStory() {
    return (
        <section className="container-box2 mt-betweenSection">
            <h2 className="heading-2 font-dancing-script">Our Story</h2>
            <div className="grid grid-cols-2 mt-betweenBox gap-[10.4375rem]">
                <div className="space-y-[2.375rem]">
                    {timelines.map((timeline, i) => (
                        <Timeline
                            key={i}
                            title={timeline.title}
                            description={timeline.description}
                        />
                    ))}
                </div>
                <div className="h-[461px] w-[527px]">
                    <Image 
                        src="/photos/our-story.jpg"
                        width={1200}
                        height={1200}
                        alt="our-story-photo"
                        quality={100}
                        className="size-full object-cover"
                    />
                </div>
            </div>
        </section>
    )
}