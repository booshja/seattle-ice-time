import Link from "next/link";

import { COLORS } from "@/utils/constants/colors";

export default function NotFound() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "60vh",
                padding: "2rem",
                textAlign: "center",
            }}
        >
            <h1
                style={{
                    fontSize: "3rem",
                    fontWeight: 700,
                    marginBottom: "0.5rem",
                }}
            >
                404
            </h1>
            <p
                style={{
                    fontSize: "1.25rem",
                    color: COLORS.text.primary,
                    marginBottom: "2rem",
                }}
            >
                Page not found
            </p>
            <Link
                href="/"
                style={{
                    color: COLORS.rinks.KCI,
                    textDecoration: "underline",
                    fontSize: "1rem",
                }}
            >
                Back to the calendar
            </Link>
        </div>
    );
}
