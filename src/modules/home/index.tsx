import React from 'react';
import dynamic from 'next/dynamic';

import Profile from './Profile';
import Gallery from "./Gallery";
import OurStory from "./OurStory";
import Event from "./Event";
import Countdown from "./Countdown";
import Invitation from './Invitation';
import BankATM from './BankATM';
import Slideshow from './Slideshow';
import Guestbook from './Guestbook';
import Reservation from './Reservation';
import ButtonMusic from './ButtonMusic';

const Footer = dynamic(() => import("@/modules/home/Footer"), { ssr: false })
const SmoothScroll = dynamic(() => import("@/components/SmothScroll"), { ssr: false })

export default function HomeModule() {
    return (
        <SmoothScroll>
            <Invitation />
            <Content />
        </SmoothScroll>
    )
}

function Content() {
    return (
        <React.Fragment>
            <ButtonMusic />
            <Slideshow />
            <Profile />
            <OurStory />
            <Gallery />
            <Event />
            <BankATM />
            <Guestbook />
            <Reservation />
            <Countdown />
            <Footer />
        </React.Fragment>
    )
}

