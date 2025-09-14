import Link from "next/link";
import type { Metadata } from "next";
import {
    RoadmapContainer,
    RoadmapHeading,
    RoadmapIntro,
    RoadmapList,
} from "./RoadmapStyled";
import roadmapItems from "./roadmapItems.json";

export const metadata: Metadata = {
    title: "Roadmap - Seattle Area Ice Time",
    description: "Upcoming features and plans for Seattle Area Ice Time.",
    robots: { index: false },
};

export default function RoadmapPage() {
    return (
        <RoadmapContainer>
            <RoadmapHeading>Roadmap</RoadmapHeading>
            <RoadmapIntro>
                Here&apos;s my plan for the next features I&apos;ll be working on. Since
                this is a side project, there isn&apos;t a guaranteed timeline, thanks
                for your patience! If you have ideas or want to upvote something,
                I&apos;d love your <Link href="/feedback">feedback</Link>.
            </RoadmapIntro>
            <RoadmapList>
                {roadmapItems.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </RoadmapList>
        </RoadmapContainer>
    );
}
