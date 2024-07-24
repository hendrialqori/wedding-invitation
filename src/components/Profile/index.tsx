import Image from "next/image"

export default function Profile() {
    return (
        <section className="container-box2 mt-betweenSection grid grid-cols-2">
            <div className="order-1 flex flex-col justify-center items-center space-y-7">
                <div className="text-center space-y-7">
                    <h3 className="heading-3 font-dancing-script">
                        Kio Sato
                    </h3>
                    <div>
                        <p className="text-sm font-roboto-slab">The youngest son of the couple</p>
                        <p className="font-roboto-slab">Tn. Edward and Ny. Lui Lina Tan</p>
                    </div>
                </div>
                <h3 className="heading-3 font-dancing-script">&</h3>
                <div className="text-center space-y-7">
                    <h3 className="heading-3 font-dancing-script">
                        Christine
                    </h3>
                    <div>
                        <p className="text-sm font-roboto-slab">First daughter of the couple</p>
                        <p className="font-roboto-slab">Tn. Kalim Sentosa and Ny. Lely Yanti</p>
                    </div>
                </div>
            </div>
            <div className="flex gap-x-9">
                <div className="w-[287px] h-[516px]">
                    <Image
                        src="/photos/kio.jpg"
                        alt="kio-photos"
                        width={500}
                        height={1000}
                        className="size-full object-cover"
                    />
                </div>
                <div className="w-[287px] h-[516px] mt-[155px]">
                    <Image
                        src="/photos/christine.jpg"
                        alt="christine-photos"
                        width={500}
                        height={1000}
                        className="size-full object-cover"
                    />
                </div>
            </div>
        </section>
    )
}