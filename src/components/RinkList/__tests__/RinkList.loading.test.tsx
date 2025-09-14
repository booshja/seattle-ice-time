import { Providers } from "@/components/Providers/Providers";
import { testingIds } from "@/testing/testingIds";
import { render, screen } from "@testing-library/react";

import { RinkList } from "../RinkList";

describe("RinkList loading behavior", () => {
    test("does not show left rail skeleton; renders toggles immediately", () => {
        render(
            <Providers>
                <RinkList />
            </Providers>,
        );
        expect(
            screen.queryByTestId(testingIds.loading.leftRail),
        ).not.toBeInTheDocument();
        expect(screen.getByLabelText(/Kraken Community Iceplex/i)).toBeInTheDocument();
    });
});
