import { Box, Button, Flex, FlexProps, useTheme } from "@chakra-ui/react";
import React, { FC, useState } from "react";
import { MdCheck } from "react-icons/md";
import {
  AssetGalleryProps,
  AssetBoxProps,
  InsertButtonProps,
} from "@chakra-editor/types";

export const AssetGallery: FC<AssetGalleryProps & { styles?: FlexProps }> = ({
  children,
  assetArray,
  isLoading = false,
  fallback = "loading...",
  styles,
}) => {
  const [selectedItem, setSelectedItem] = useState<string>("");

  if (isLoading) return <>{fallback}</>;

  return (
    <Flex wrap="wrap" gap="4" {...styles}>
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
