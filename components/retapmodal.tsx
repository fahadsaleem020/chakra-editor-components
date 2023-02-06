import React, { FC } from "react";
import { Modal } from "@chakra-ui/react";
import { RetapDisclosureProps, UseDisclosePropsExtended } from "@retap/types";
import { useRetap } from "@retap/provider";

export const RetapModal: FC<RetapDisclosureProps> = ({
  children,
  id,
  ...props
}) => {
  const { retapModal } = useRetap();

  const isId = isIdMatched(retapModal?.disclosureProps, id);

  return (
    <Modal
      isOpen={isId && isId.isOpen}
      onClose={retapModal?.disclosureProps!.onClose}
      {...props}
    >
      {children}
    </Modal>
  );
};

export const isIdMatched = (
  disclosureProps: UseDisclosePropsExtended | undefined,
  id: string | undefined
) => {
  if (!disclosureProps) return false;
  return { isOpen: disclosureProps.id === id && disclosureProps.isOpen };
};
