import { Providers } from "@/components/Providers/Providers";
import { testingIds } from "@/testing/testingIds";
import { render, screen } from "@testing-library/react";

import { LeftRailSkeleton } from "../LeftRailSkeleton";

describe("LeftRailSkeleton", () => {
    test("renders skeleton status container", () => {
        render(
            <Providers>
                <LeftRailSkeleton />
            </Providers>,
        );
        expect(screen.getByTestId(testingIds.loading.leftRail)).toBeInTheDocument();
    });
});
