import React, { FC } from "react";
import { Drawer } from "@chakra-ui/react";
import { RetapDisclosureProps, UseDisclosePropsExtended } from "@retap/types";
import { useRetap } from "@retap/provider";

export const RetapDrawer: FC<RetapDisclosureProps> = ({
  children,
  id,
  ...props
}) => {
  const { retapDrawer } = useRetap();

  const isId = isIdMatched(retapDrawer?.disclosureProps!, id);

  return (
    <Drawer
      isOpen={isId && isId.isOpen}
      onClose={retapDrawer?.disclosureProps!.onClose}
      {...props}
    >
      {children}
    </Drawer>
  );
};

export const isIdMatched = (
  disclosureProps: UseDisclosePropsExtended | undefined,
  id: string | undefined
) => {
  if (!disclosureProps) return false;
  return { isOpen: disclosureProps.id === id && disclosureProps.isOpen };
};
