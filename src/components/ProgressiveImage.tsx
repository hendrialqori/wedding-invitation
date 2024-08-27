import { ComponentProps } from "react"
import Image from "next/image"
import fs from "node:fs/promises"
import { getPlaiceholder } from "plaiceholder";

type Props = ComponentProps<typeof Image>

async function ProgressiveImage(props: Props) {
    const buffer = await fs.readFile(`./public/${props.src}`);
    const { base64 } = await getPlaiceholder(buffer);
    return (
        <Image
        {...props}
        blurDataURL={base64 ?? ""}
        placeholder="blur"
        />
    )
}

export default ProgressiveImage