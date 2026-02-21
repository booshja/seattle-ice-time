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
    description: "Compiled hockey ice times for the Seattle area rinks",
    icons: {
        icon: "/favicon.ico",
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
