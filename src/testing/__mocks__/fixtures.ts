// Shared test fixtures for API payloads and transformed objects

// Date constants
export const DATE_2025_09_08 = "2025-09-08";
export const DATE_2025_09_09 = "2025-09_09";
export const DATE_2025_09_10 = "2025-09-10";
export const ISO_2025_09_08T18 = "2025-09-08T18:00:00.000Z";
export const ISO_2025_09_08T19 = "2025-09-08T19:00:00.000Z";
export const ISO_2025_09_16T18 = "2025-09-16T18:00:00.000Z";
export const ISO_2025_09_16T19 = "2025-09-16T19:00:00.000Z";

// Raw KCI API events (use `as any` in tests when needed)
export const KCI_API_EVENT_IN_WINDOW = {
    color: "",
    end: ISO_2025_09_08T19,
    sportId: 20,
    start: ISO_2025_09_08T18,
    title: "Stick & Puck",
    url: "#",
};

export const KCI_API_EVENT_OUTSIDE_WINDOW = {
    color: "",
    end: ISO_2025_09_16T19,
    sportId: 20,
    start: ISO_2025_09_16T18,
    title: "Stick & Puck",
    url: "#",
};

export const KCI_API_EVENT_WRONG_SPORT = {
    color: "",
    end: ISO_2025_09_08T19,
    sportId: 10,
    start: ISO_2025_09_08T18,
    title: "Stick & Puck",
    url: "#",
};

// Raw LIC/OVA API event
export const LIC_OVA_API_STICK_AND_PUCK_IN_WINDOW = {
    id: "1",
    description: "",
    title: "Stick & Puck",
    eventType: "",
    start: ISO_2025_09_08T18,
    end: ISO_2025_09_08T19,
    resourceId: "",
    editable: false,
    color: "",
    paymentMethod: "",
    isPaid: "",
    isRepeat: "",
    checkImage: "",
    referenceId: "",
    isMargin: null,
    bPadding: "",
    customField1: null,
    customField2: null,
    customField3: null,
    customField4: null,
    updated: false,
    totalCost: "",
    isMultiUser: "",
    bookingUsers: [],
    groupId: "",
    encryptedGroupId: "",
    bookingType: "",
    isPaidG1: "",
    isPaidG2: "",
    isPaidG3: "",
    isPaidG4: "",
    batchId: "",
    groupId4: null,
    eventName: "",
    note: "",
    CPCPaidUnpaid: "",
    invoiced: 0,
    invoiceBatchId: null,
    agreemented: 0,
    agreementBatchId: null,
    invoiceNumber: null,
    agreementNumber: null,
    feed: "",
    allDay: false,
};

export const OVA_API_ADULT_DROP_IN_IN_WINDOW = {
    ...LIC_OVA_API_STICK_AND_PUCK_IN_WINDOW,
    id: "2",
    title: "Adult Drop In",
    start: "2025-09-09T18:00:00.000Z",
    end: "2025-09-09T19:00:00.000Z",
};

// Transformed KCI events for parseEvents ordering tests
export const KCI_TRANSFORMED_EVENT_A = {
    color: "#000",
    day: "Monday",
    end: { date: "2025-09-08", military: "0930", time: "9:30am" },
    start: { date: "2025-09-08", military: "0900", time: "9:00am" },
    startKey: 9 * 60,
    title: "A",
    url: "#",
    location: "Kraken Community Iceplex",
};

export const KCI_TRANSFORMED_EVENT_B = {
    color: "#000",
    day: "Monday",
    end: { date: "2025-09-08", military: "1000", time: "10:00am" },
    start: { date: "2025-09-08", military: "0930", time: "9:30am" },
    startKey: 9 * 60 + 30,
    title: "B",
    url: "#",
    location: "Kraken Community Iceplex",
};
