import type { BaseEventObject } from "./events";

import type { RINKS } from "@/utils/constants/rinks";

export interface LicOvaEvent {
    agreementBatchId: null;
    agreemented: number;
    agreementNumber: null;
    allDay: boolean;
    batchId: string;
    bookingType: string;
    bookingUsers: BookingUsers[];
    bPadding: string;
    checkImage: string;
    color: string;
    CPCPaidUnpaid: string;
    customField1: string | null;
    customField2: string | null;
    customField3: string | null;
    customField4: string | null;
    description: string;
    editable: boolean;
    encryptedGroupId: string;
    end: string;
    eventName: string;
    eventType: string;
    feed: string;
    groupId: string;
    groupId4: null;
    id: string;
    invoiceBatchId: null;
    invoiced: number;
    invoiceNumber: null;
    isMargin: null;
    isMultiUser: string;
    isPaid: string;
    isPaidG1: string;
    isPaidG2: string;
    isPaidG3: string;
    isPaidG4: string;
    isRepeat: string;
    note: string;
    paymentMethod: string;
    referenceId: string;
    resourceId: string;
    start: string;
    title: string;
    totalCost: string;
    updated: boolean;
}

type BookingUsers = {
    eventName: string;
    groupId: string;
    groupName: string;
    isPaid: boolean;
};

export interface LicOvaEventObject extends BaseEventObject {
    location: typeof RINKS.LYNNWOOD.name | typeof RINKS.OVA.name;
}
