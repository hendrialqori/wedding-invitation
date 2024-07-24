import Headline from "./Headline"
import HeroImage from "./HeroImage"

export default function Hero() {
    return (
        <section className="container-box space-y-14 pt-32">
            <Headline />
            <HeroImage />
        </section>
    )
}