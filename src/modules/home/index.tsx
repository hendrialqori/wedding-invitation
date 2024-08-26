"use client"

import Profile from './Profile';
import Gallery from "./Gallery";
import OurStory from "./OurStory";
import Event from "./Event";
import Countdown from "./Countdown";
import Invitation from './Invitation';
import BankATM from './BankATM';
import dynamic from 'next/dynamic';
import Slideshow from './Slideshow';
import Guestbook from './Guestbook';
import Reservation from './Reservation';
import HomeWrapper from './HomeWrapper';
import React from 'react';

const Footer = dynamic(() => import("@/modules/home/Footer"), { ssr: false })

export default function HomeModule() {
    return (
        <HomeWrapper>
            {({ isOpen, onOpen }) => (
                <React.Fragment>
                    <Invitation
                        open={isOpen}
                        onOpen={onOpen}
                    />
                    <Content open={isOpen} />
                </React.Fragment>
            )}
        </HomeWrapper>
    )
}

function Content({ open }: { open: boolean }) {
    return (
        open && (
            <>
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
            </>
        )
    )
}