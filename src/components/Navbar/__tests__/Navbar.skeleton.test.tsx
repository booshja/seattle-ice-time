import { Providers } from "@/components/Providers/Providers";
import { testingIds } from "@/testing/testingIds";
import { render, screen } from "@testing-library/react";

import { NavbarSkeleton } from "../NavbarSkeleton";

describe("NavbarSkeleton", () => {
    test("renders skeleton status container", () => {
        render(
            <Providers>
                <NavbarSkeleton />
            </Providers>,
        );
        expect(screen.getByTestId(testingIds.loading.navbar)).toBeInTheDocument();
    });
});
