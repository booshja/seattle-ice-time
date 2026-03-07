export const breakpoints = {
    mobileXs: 280,
    mobileSm: 360,
    mobileMd: 390,
    mobileLg: 414,
    tabletXs: 601,
    tabletSm: 768,
    tabletMd: 810,
    tabletLg: 962,
    desktopSm: 1280,
    desktopMd: 1366,
    desktopLg: 1440,
} as const;

export const mq = {
    mobile: `@media (max-width: ${breakpoints.tabletSm - 1}px)`,
    tablet: `@media (min-width: ${breakpoints.tabletSm}px) and (max-width: ${breakpoints.desktopSm - 1}px)`,
    desktop: `@media (min-width: ${breakpoints.desktopSm}px)`,
    tabletUp: `@media (min-width: ${breakpoints.tabletSm}px)`,
    mobileOnly: `@media (max-width: ${breakpoints.tabletSm - 1}px)`,
} as const;
