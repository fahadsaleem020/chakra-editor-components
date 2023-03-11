import React, { FC } from "react";
import { Drawer as ChakraDrawer } from "@chakra-ui/react";
import { DisclosureProps, UseDisclosePropsExtended } from "@chakra-editor/types";
import { useRetap } from "@chakra-editor/provider";

export const RetapDrawer: FC<DisclosureProps> = ({
  children,
  id,
  ...props
}) => {
  const { Drawer } = useRetap();

  const isId = isIdMatched(Drawer?.disclosureProps!, id);

  return (
    <ChakraDrawer
      isOpen={isId && isId.isOpen}
      onClose={Drawer?.disclosureProps!.onClose}
      {...props}
    >
      {children}
    </ChakraDrawer>
  );
};

export const isIdMatched = (
  disclosureProps: UseDisclosePropsExtended | undefined,
  id: string | undefined
) => {
  if (!disclosureProps) return false;
  return { isOpen: disclosureProps.id === id && disclosureProps.isOpen };
};
