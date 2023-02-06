import { Box, Button, Flex, useTheme } from "@chakra-ui/react";
import React, { FC, useState } from "react";
import { MdCheck } from "react-icons/md";
import {
  AssetGalleryProps,
  AssetBoxProps,
  InsertButtonProps,
} from "@retap/types";

export const AssetGallery: FC<AssetGalleryProps> = ({
  children,
  assetArray,
  isLoading = false,
  fallback = "loading...",
}) => {
  const [selectedItem, setSelectedItem] = useState<string>("");

  if (isLoading) return <>{fallback}</>;

  return (
    <Flex wrap="wrap" gap="4">
      {assetArray?.map((src, index) => {
        return children({
          src,
          selectedItem,
          setSelectedItem,
          index,
        });
      })}
    </Flex>
  );
};

export const AssetBox: FC<AssetBoxProps> = ({
  children,
  selectedItem,
  setSelectedItem,
  ...props
}) => {
  return (
    <Box
      position="relative"
      onMouseEnter={(e) => setSelectedItem(e.currentTarget.id)}
      onMouseLeave={() => setSelectedItem("")}
      {...props}
    >
      {children}
    </Box>
  );
};

export const InsertButton: FC<InsertButtonProps> = ({
  text,
  children,
  buttonContainerProps,
  ...buttonProps
}) => {
  const color = useTheme().colors;
  return (
    <Box
      bottom="1em"
      left="50%"
      transform="translateX(-50%)"
      position="absolute"
      {...buttonContainerProps}
    >
      {children ? (
        children
      ) : (
        <Button
          leftIcon={<MdCheck size={20} color={color.blue["500"]} />}
          {...buttonProps}
        >
          {text ? text : "Insert"}
        </Button>
      )}
    </Box>
  );
};
