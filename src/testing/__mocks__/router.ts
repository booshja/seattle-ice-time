export function setSearchParams(params: Record<string, string> = {}) {
    const query = new URLSearchParams(params);
    jest.mock("next/navigation", () => ({
        usePathname: () => "/",
        useRouter: () => ({ push: jest.fn() }),
        useSearchParams: () => new URLSearchParams(query.toString()),
    }));
}
