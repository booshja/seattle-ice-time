"use client";

import { useEffect, useRef, useCallback } from "react";

import { useDrawerStore } from "@/store/drawer/drawerStoreProvider";

import { Links } from "../Links/Links";
import { RinkList } from "../RinkList/RinkList";

import {
    DrawerCloseButtonStyled,
    DrawerContentStyled,
    DrawerHeaderStyled,
    DrawerLinksStyled,
    DrawerOverlayStyled,
    DrawerPanelStyled,
    DrawerTitleStyled,
} from "./DrawerStyled";

export const Drawer = () => {
    const isOpen = useDrawerStore((state) => state.isOpen);
    const close = useDrawerStore((state) => state.close);
    const panelRef = useRef<HTMLElement>(null);
    const previousFocusRef = useRef<HTMLElement | null>(null);

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                close();
            }
        },
        [close],
    );

    useEffect(() => {
        if (isOpen) {
            previousFocusRef.current = document.activeElement as HTMLElement;
            document.body.style.overflow = "hidden";
            document.addEventListener("keydown", handleKeyDown);
            panelRef.current?.focus();
        } else {
            document.body.style.overflow = "";
            document.removeEventListener("keydown", handleKeyDown);
            previousFocusRef.current?.focus();
        }

        return () => {
            document.body.style.overflow = "";
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, handleKeyDown]);

    return (
        <>
            <DrawerOverlayStyled $open={isOpen} onClick={close} />
            <DrawerPanelStyled
                ref={panelRef}
                $open={isOpen}
                role="dialog"
                aria-modal="true"
                aria-label="Navigation menu"
                tabIndex={-1}
            >
                <DrawerHeaderStyled>
                    <DrawerTitleStyled>Filters</DrawerTitleStyled>
                    <DrawerCloseButtonStyled onClick={close} aria-label="Close menu">
                        ✕
                    </DrawerCloseButtonStyled>
                </DrawerHeaderStyled>
                <DrawerContentStyled>
                    <RinkList />
                    <DrawerLinksStyled>
                        <Links isDrawer />
                    </DrawerLinksStyled>
                </DrawerContentStyled>
            </DrawerPanelStyled>
        </>
    );
};
