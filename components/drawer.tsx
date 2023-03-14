import React, { FC } from "react";
import { Drawer as ChakraDrawer } from "@chakra-ui/react";
import { DisclosureProps, UseDisclosePropsExtended } from "@chakra-editor/types";
import { useChakraEditor } from "@chakra-editor/provider";

export const Drawer: FC<DisclosureProps> = ({
  children,
  id,
  ...props
}) => {
  const { drawer } = useChakraEditor();

  const isId = isIdMatched(drawer?.disclosureProps!, id);

  return (
    <ChakraDrawer
      isOpen={isId && isId.isOpen}
      onClose={drawer?.disclosureProps!.onClose}
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
