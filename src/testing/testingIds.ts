export const testingIds = {
    components: {
        Navbar: {
            logoLink: "navbar-logo-link",
        },
    },
    globalLayout: {
        body: "global-layout-body",
    },
    loading: {
        navbar: "loading.navbar",
        leftRail: "loading.leftRail",
        dateHeader: "loading.dateHeader",
        eventGrid: "loading.eventGrid",
        eventColumn: (day: string) => `loading.eventColumn.${day}`,
        eventCell: "loading.eventCell",
    },
};
