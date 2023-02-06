import { FC } from "react";
import { RetapDisclosureProps, UseDisclosePropsExtended } from "@retap/types";
export declare const RetapDrawer: FC<RetapDisclosureProps>;
export declare const isIdMatched: (disclosureProps: UseDisclosePropsExtended | undefined, id: string | undefined) => false | {
    isOpen: boolean;
};
