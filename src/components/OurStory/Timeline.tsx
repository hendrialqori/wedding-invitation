import { GoDotFill } from "react-icons/go";

type Props = {
    title: string;
    description: string;
}

export default function Timeline({ title, description }: Props) {
    return (
        <div className="flex justify-start gap-x-4">
            <GoDotFill className="text-xl translate-y-1" />
            <div className="space-y-4">
                <h4 className="heading-4 font-dancing-script">{title}</h4>
                <p className="font-roboto-slab">{description}</p>
            </div>
        </div>
    )
}