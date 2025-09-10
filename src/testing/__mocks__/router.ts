export function mockNextNavigation(url: string = "/") {
    const u = new URL(url, "http://localhost");
    const params = u.searchParams;
    jest.mock("next/navigation", () => {
        const actual = jest.requireActual("next/navigation");
        return {
            ...actual,
            usePathname: () => u.pathname,
            useRouter: () => ({ push: jest.fn() }),
            useSearchParams: () => params,
        };
    });
}
