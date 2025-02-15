import { LinksContainerStyled, LinkStyled } from "./LinksStyled";

export const Links = () => {
    return (
        <LinksContainerStyled>
            <LinkStyled href="/issue">📣 Report an issue</LinkStyled>
            <LinkStyled href="/feedback">💬 Give feedback</LinkStyled>
            <LinkStyled href="/roadmap">🧭 Feature Roadmap</LinkStyled>
        </LinksContainerStyled>
    );
};
