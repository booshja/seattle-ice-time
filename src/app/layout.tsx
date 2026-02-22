import { Navbar } from "@/components/Navbar/Navbar";
import { Providers } from "@/components/Providers/Providers";
import { inter } from "@/fonts/inter";
import { COLORS } from "@/utils/constants/colors";

import type { Metadata } from "next";
import type { ReactNode } from "react";

// eslint-disable-next-line no-restricted-imports
import "./globals.css";

export const metadata: Metadata = {
    title: "Seattle Area Ice Time",
    description:
        "All Seattle area ice rink schedules in one place. Weekly drop-in hockey and stick and puck times for Kraken Community Iceplex, Lynnwood, Olympicview Arena, and more.",
    icons: { icon: "/favicon.ico" },
    metadataBase: new URL("https://seattleicetime.com"),
    alternates: { canonical: "/" },
    keywords: [
        "seattle ice time",
        "seattle hockey",
        "ice hockey schedule",
        "seattle ice rinks",
        "kraken community iceplex",
        "lynnwood ice center",
        "olympicview arena",
        "sno-king ice arenas",
    ],
    category: "sports",
    creator: "Jacob Andes",
    authors: [{ name: "Jacob Andes", url: "https://github.com/booshja" }],
    openGraph: {
        title: "Seattle Area Ice Time",
        description:
            "All Seattle area ice rink schedules in one place. Weekly drop-in hockey and stick and puck times for Kraken Community Iceplex, Lynnwood, Olympicview Arena, and more.",
        url: "https://seattleicetime.com",
        siteName: "Seattle Area Ice Time",
        type: "website",
        locale: "en_US",
        images: [{ url: "/images/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Seattle Area Ice Time",
        description:
            "All Seattle area ice rink schedules in one place. Weekly drop-in hockey and stick and puck times for Kraken Community Iceplex, Lynnwood, Olympicview Arena, and more.",
        images: ["/images/og-image.png"],
    },
};

interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
    const interFont = `${inter.className}`;
    return (
        <html lang="en">
            <body
                className={interFont}
                style={{
                    backgroundColor: COLORS.background.light,
                    color: COLORS.text.primary,
                    height: "100dvh",
                    scrollbarGutter: "stable",
                }}
            >
                <Providers>
                    <Navbar />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
