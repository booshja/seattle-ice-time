import PlausibleProvider from "next-plausible";
import { Navbar } from "@/components/Navbar/Navbar";
import { Providers } from "@/components/Providers/Providers";
import { inter } from "@/fonts/inter";
import { testingIds } from "@/testing/testingIds";
import { COLORS } from "@/utils/constants/colors";
import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Seattle Area Ice Time",
    description: "Compiled hockey ice times for the Seattle area rinks",
};

const { globalLayout } = testingIds;

interface RootLayoutProps {
    children: ReactNode;
}

export default async function RootLayout({ children }: Readonly<RootLayoutProps>) {
    const interFont = `${inter.className}`;
    return (
        <html lang="en">
            <head>
                <PlausibleProvider domain="seattleicetime.com" trackOutboundLinks />
            </head>
            <body
                className={interFont}
                data-testid={globalLayout.body}
                style={{
                    backgroundColor: COLORS.background.light,
                    color: COLORS.text.primary,
                    height: "100dvh",
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
