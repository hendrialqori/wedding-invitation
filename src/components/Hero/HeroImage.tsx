import Image from "next/image"

export default function HeroImage() {
    return (
        <div className="w-full h-[570px]">
            <Image
                src="/photos/hero.jpg"
                alt="hero-preweding"
                width={1000}
                height={600}
                quality={100}
                className="size-full object-cover"
                priority
            />
        </div>
    )
}