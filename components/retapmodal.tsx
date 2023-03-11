import React, { FC } from "react";
import { Modal as ChakraModal } from "@chakra-ui/react";
import { DisclosureProps, UseDisclosePropsExtended } from "@chakra-editor/types";
import { useRetap } from "@chakra-editor/provider";

export const RetapModal: FC<DisclosureProps> = ({
  children,
  id,
  ...props
}) => {
  const { Modal } = useRetap();

  const isId = isIdMatched(Modal?.disclosureProps, id);

  return (
    <ChakraModal
      isOpen={isId && isId.isOpen}
      onClose={Modal?.disclosureProps!.onClose}
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
