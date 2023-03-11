import { FC } from "react";
import { DisclosureProps, UseDisclosePropsExtended } from "@chakra-editor/types";
export declare const RetapDrawer: FC<DisclosureProps>;
export declare const isIdMatched: (disclosureProps: UseDisclosePropsExtended | undefined, id: string | undefined) => false | {
    isOpen: boolean;
};
