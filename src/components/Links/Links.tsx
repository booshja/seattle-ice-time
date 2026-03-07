import {
    LinksContainerStyled,
    LinksStaticContainerStyled,
    LinkStyled,
} from "./LinksStyled";

interface LinksProps {
    isDrawer?: boolean;
}

export const Links = ({ isDrawer = false }: LinksProps) => {
    const Container = isDrawer ? LinksStaticContainerStyled : LinksContainerStyled;

    return (
        <Container>
            <LinkStyled href="/issue">📣 Report an issue</LinkStyled>
            <LinkStyled href="/feedback">💬 Give feedback</LinkStyled>
            <LinkStyled href="/roadmap">🧭 Feature Roadmap</LinkStyled>
        </Container>
    );
};
