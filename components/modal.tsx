import React, { FC } from "react";
import { Modal as ChakraModal } from "@chakra-ui/react";
import { DisclosureProps, UseDisclosePropsExtended } from "@chakra-editor/types";
import { useChakraEditor } from "@chakra-editor/provider";

export const Modal: FC<DisclosureProps> = ({
  children,
  id,
  ...props
}) => {
  const { modal } = useChakraEditor();

  const isId = isIdMatched(modal?.disclosureProps, id);

  return (
    <ChakraModal
      isOpen={isId && isId.isOpen}
      onClose={modal?.disclosureProps!.onClose}
      {...props}
    >
      {children}
    </ChakraModal>
  );
};

export const isIdMatched = (
  disclosureProps: UseDisclosePropsExtended | undefined,
  id: string | undefined
) => {
  if (!disclosureProps) return false;
  return { isOpen: disclosureProps.id === id && disclosureProps.isOpen };
};
