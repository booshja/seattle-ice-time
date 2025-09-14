import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Link,
    Preview,
    Text,
} from "@react-email/components";
import * as React from "react";

interface IssueEmailProps {
    description: string;
    issueLink: string;
    title: string;
}

export const IssueEmail = ({ title, description, issueLink }: IssueEmailProps) => (
    <Html lang="en">
        <Head>
            <title>New Issue! 🚨</title>
        </Head>
        <Preview>New Seattle Ice Time Issue! 🚨</Preview>
        <Body style={main}>
            <Container style={container}>
                <Heading style={h1}>New Issue! 🚨</Heading>
                <Text style={centeredText}>
                    You&apos;ve got a new issue from <strong>Seattle Ice Time</strong>!
                </Text>
                <Hr />
                <Heading style={h2}>Issue title:</Heading>
                <Text style={text}>{title}</Text>
                <Heading style={h2}>Description:</Heading>
                <Text style={text}>{description}</Text>
                <Heading style={h2}>Github Issue Link:</Heading>
                <Link href={issueLink} target="_blank" style={linkText}>
                    Click here to go to the issue
                </Link>
                <Hr />
            </Container>
        </Body>
    </Html>
);

IssueEmail.PreviewProps = {
    title: "Oh boy am I mad!",
    description: "This is a test issue message",
    issueLink: "google.com",
} as IssueEmailProps;

export default IssueEmail;

const main = {
    backgroundColor: "#f9f9f9",
};

const container = {
    padding: "32px",
    margin: "0 auto",
    maxWidth: "650px",
};

const h1 = {
    color: "#333",
    fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: "48px",
    fontWeight: "bold",
    margin: "40px 0",
    padding: "0",
    textAlign: "center" as const,
};

const h2 = {
    color: "#333",
    fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: "32px",
    fontWeight: "bold",
    margin: "20px 0",
    padding: "0",
};

const text = {
    color: "#333",
    fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: "14px",
    margin: "24px 0",
};

const centeredText = {
    ...text,
    textAlign: "center" as const,
};

const linkText = {
    ...text,
    color: "#2754C5",
    textDecoration: "underline",
};
