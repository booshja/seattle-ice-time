export function setSearchParams(params: Record<string, string> = {}) {
    const query = new URLSearchParams(params);
    vi.mock("next/navigation", () => ({
        usePathname: () => "/",
        useRouter: () => ({ push: vi.fn() }),
        useSearchParams: () => new URLSearchParams(query.toString()),
    }));
}
