import {
  RenderRowProps,
  RenderCellProps,
  TableComponentProps,
} from "@retap/types";
import React, { FC } from "react";
import { insertTable } from "@retap/functions";
import { Box, Flex } from "@chakra-ui/react";

export const TableComponent: TableComponentProps = ({
  table,
  matrix,
  editor,
  withHeader,
  updateTable,
  updateMatrix,
  setWithHeader,
  ...cellProps
}) => {
  return (
    <div>
      {table.length &&
        table.flatMap((columns, rowIndex) => (
          <RenderRow
            key={rowIndex}
            editor={editor}
            columns={columns}
            rowIndex={rowIndex}
            withHeader={withHeader}
            updateTable={updateTable}
            matrix={[matrix, updateMatrix]}
            {...cellProps}
          />
        ))}
    </div>
  );
};

export const RenderRow: FC<RenderRowProps> = ({
  matrix,
  editor,
  columns,
  rowIndex,
  withHeader,
  updateTable,
  ...cellProps
}) => {
  return (
    <Flex>
      {columns.flatMap((attributes, cellIndex) => (
        <RenderCell
          key={cellIndex}
          editor={editor}
          matrix={matrix}
          rowIndex={rowIndex}
          cellIndex={cellIndex}
          withHeader={withHeader}
          attributes={attributes}
          updateTable={updateTable}
          {...cellProps}
        />
      ))}
    </Flex>
  );
};

export const RenderCell: FC<RenderCellProps> = ({
  attributes: { isActive },
  matrix,
  editor,
  rowIndex,
  cellIndex,
  withHeader,
  updateTable,
  ...cellProps
}) => {
  const [{ columns, rows }, updateMatrix] = matrix;
  return (
    <Box
      p={cellProps.padding || cellProps.p || 0.5}
      cursor="pointer"
      onMouseEnter={() => {
        updateMatrix({
          columns: 1 + cellIndex,
          rows: 1 + rowIndex,
        });
        updateTable({
          type: "activate",
          payload: { cellIndex, rowIndex },
        });
      }}
      onMouseLeave={() => {
        updateMatrix({
          columns: 1 + cellIndex,
          rows: 1 + rowIndex,
        });
        updateTable({
          type: "deactivate",
          payload: { cellIndex, rowIndex },
        });
      }}
      onClick={() => insertTable({ editor, rows, columns, withHeader })}
    >
      <Box
        w={5}
        h={5}
        border={cellProps.border || "1px"}
        borderColor={cellProps.borderColor || "balck"}
        {...cellProps}
        bg={
          isActive
            ? cellProps.bg ||
              cellProps.background ||
              cellProps.backgroundColor ||
              "black"
            : "transparent"
        }
      />
    </Box>
  );
};
