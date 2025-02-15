import PlausibleProvider from "next-plausible";
import { Navbar, Providers } from "@/components";
import { inter } from "@/fonts";
import { testingIds } from "@/testing";
import { COLORS } from "@/utils/constants";
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
