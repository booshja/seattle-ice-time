import { RINKS } from "@/utils/constants/rinks";
import type { BaseEventObject } from "./events";

export interface LicOvaEvent {
    id: string;
    description: string;
    title: string;
    eventType: string;
    start: string;
    end: string;
    resourceId: string;
    editable: boolean;
    color: string;
    paymentMethod: string;
    isPaid: string;
    isRepeat: string;
    checkImage: string;
    referenceId: string;
    isMargin: null;
    bPadding: string;
    customField1: string | null;
    customField2: string | null;
    customField3: string | null;
    customField4: string | null;
    updated: boolean;
    totalCost: string;
    isMultiUser: string;
    bookingUsers: BookingUsers[];
    groupId: string;
    encryptedGroupId: string;
    bookingType: string;
    isPaidG1: string;
    isPaidG2: string;
    isPaidG3: string;
    isPaidG4: string;
    batchId: string;
    groupId4: null;
    eventName: string;
    note: string;
    CPCPaidUnpaid: string;
    invoiced: number;
    invoiceBatchId: null;
    agreemented: number;
    agreementBatchId: null;
    invoiceNumber: null;
    agreementNumber: null;
    feed: string;
    allDay: boolean;
}

type BookingUsers = {
    groupId: string;
    groupName: string;
    isPaid: boolean;
    eventName: string;
};

export interface LicOvaEventObject extends BaseEventObject {
    location: typeof RINKS.LYNNWOOD.name | typeof RINKS.OVA.name;
}
