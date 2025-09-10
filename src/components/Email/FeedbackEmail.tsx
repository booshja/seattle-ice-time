import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Text,
} from "@react-email/components";

interface FeedbackEmailProps {
    email: string;
    feedbackMessage: string;
}

export const FeedbackEmail = ({ email, feedbackMessage }: FeedbackEmailProps) => (
    <Html lang="en">
        <Head />
        <Preview>New Seattle Ice Time Feedback Message!</Preview>
        <Body style={main}>
            <Container style={container}>
                <Heading style={h1}>New Feedback Comment</Heading>
                <Text style={centeredText}>
                    You&apos;ve got a new feedback comment from{" "}
                    <strong>Seattle Ice Time</strong>!
                </Text>
                <Hr />
                <Heading style={h2}>Sender&apos;s email:</Heading>
                <Text style={text}>{email}</Text>
                <Heading style={h2}>Feedback Message:</Heading>
                <Text style={text}>{feedbackMessage}</Text>
                <Hr />
                <Text style={centeredText}>Congrats on the feedback! 🎉</Text>
            </Container>
        </Body>
    </Html>
);

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
