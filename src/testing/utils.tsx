import { render, type RenderOptions } from "@testing-library/react";
import React, { type ReactElement } from "react";

import { Providers } from "@/components/Providers/Providers";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
    return <Providers>{children}</Providers>;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
    render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
