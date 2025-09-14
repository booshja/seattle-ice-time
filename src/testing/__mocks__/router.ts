export function mockNextNavigation(url: string = "/") {
    const u = new URL(url, "http://localhost");
    const params = u.searchParams;
    jest.mock("next/navigation", () => ({
        usePathname: () => u.pathname,
        useRouter: () => ({ push: jest.fn() }),
        useSearchParams: () => new URLSearchParams(params.toString()),
    }));
}
