import Reservation from "./Reservation";
import Guestbook from "./Guestbook";

export default function DashboardModule() {
    return (
        <div className="flex flex-col items-center justify-center max-w-4xl py-10 mx-auto space-y-4">
            <div>
                <h1 className="heading-4">Report.</h1>
            </div>
            <Guestbook />
            <Reservation />
        </div>
    )
}



