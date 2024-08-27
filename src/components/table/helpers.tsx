import React from "react";
import {
  Button,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHeaderCell,
  TableRow,
} from "semantic-ui-react";
import { DataItem, Header, RowCategory } from "../../types/types";

/**
 *
 * HEADER RENDERING HELPER FUNCTIONS
 *
 * - renderHeader() for singular header
 * - renderHeaders() for multiple/group of headers
 *
 */

export function renderHeader(
  header: Header,
  headerId: number,
  handleColumnVisibility?: any,
  hiddenColumns?: string[]
) {
  return (
    <React.Fragment key={headerId}>
      <TableHeaderCell>
        {header.subHeaders && (
          <Button
            onClick={() => {
              handleColumnVisibility && handleColumnVisibility(header.id);
            }}
            icon={
              hiddenColumns?.find((column) => column === header.id) ? (
                <Icon name="angle double right" />
              ) : (
                <Icon name="angle double left" />
              )
            }
          />
        )}

        {header.name}
      </TableHeaderCell>

      {hiddenColumns?.find((column) => column === header.id)
        ? null
        : header.subHeaders &&
          header.subHeaders.map((subHeader, subHeaderId) =>
            renderHeader(
              subHeader,
              subHeaderId,
              handleColumnVisibility,
              hiddenColumns
            )
          )}
    </React.Fragment>
  );
}

export function renderHeaders(
  headers: Header[],
  handleColumnVisibility?: any,
  hiddenColumns?: string[]
): React.ReactNode {
  return headers.map((header: Header, id) =>
    renderHeader(header, id, handleColumnVisibility, hiddenColumns)
  );
}

/**
 *
 * CELL RENDERING HELPER FUNCTIONS
 *
 * - renderCell() for singular cell
 * - renderCells() for multiple/group of cells
 *
 */

export function renderCell(
  data: DataItem[],
  header: Header,
  row: RowCategory,
  id: number,
  hiddenColumns?: string[]
): React.ReactNode {
  const cellValue = data.find((item) => item.locationId === header.id);

  return (
    <React.Fragment key={id}>
      <TableCell>
        <Table style={{ background: "transparent", border: 0 }}>
          <TableBody style={{ background: "transparent" }}>
            <TableRow style={{ background: "transparent" }}>
              <TableCell style={{ background: "transparent", border: 0 }}>
                {cellValue?.units || 0}
              </TableCell>
            </TableRow>
            <TableRow style={{ background: "transparent" }}>
              <TableCell style={{ background: "transparent", border: 0 }}>
                {cellValue?.unitPrice[0].value || 0}
              </TableCell>
            </TableRow>
            <TableRow style={{ background: "transparent" }}>
              <TableCell style={{ background: "transparent", border: 0 }}>
                {cellValue?.grossRevenue || 0}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableCell>

      {hiddenColumns?.find((column) => column === header.id)
        ? null
        : header.subHeaders &&
          header.subHeaders.map((subHeader, id) =>
            renderCell(data, subHeader, row, id, hiddenColumns)
          )}
    </React.Fragment>
  );
}

export function renderCells(
  data: DataItem[],
  headers: Header[],
  row: RowCategory,
  hiddenColumns: string[]
): React.ReactNode {
  return headers.map((header, id) =>
    renderCell(data, header, row, id, hiddenColumns)
  );
}

/**
 *
 * ROW RENDERING HELPER FUNCTIONS
 *
 * - renderRow() for singular row
 * - renderRows() for multiple/group of rows
 *
 */

const renderCategoryCell = (
  row: RowCategory,
  cellValue: string,
  handleRowVisibility?: any,
  hiddenRows?: string[]
) => (
  <TableCell>
    <Table style={{ background: "transparent", border: 0 }}>
      <TableBody style={{ background: "transparent" }}>
        <TableRow style={{ background: "transparent" }}>
          <TableCell style={{ background: "transparent", border: 0 }}>
            {row.subCategories && (
              <Button
                onClick={() => {
                  handleRowVisibility && handleRowVisibility(row.categoryId);
                }}
                compact
                icon={
                  hiddenRows &&
                  hiddenRows?.find((hiddenRow) => hiddenRow === row.categoryId)
                    ? "chevron right"
                    : "chevron down"
                }
              />
            )}

            {cellValue}
          </TableCell>
        </TableRow>
        <TableRow style={{ background: "transparent" }}>
          <TableCell style={{ background: "transparent", border: 0 }}>
            &nbsp;
          </TableCell>
        </TableRow>
        <TableRow style={{ background: "transparent" }}>
          <TableCell style={{ background: "transparent", border: 0 }}>
            &nbsp;
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableCell>
);

const renderUnitCell = () => (
  <TableCell>
    <Table style={{ background: "transparent", border: 0 }}>
      <TableBody style={{ background: "transparent" }}>
        <TableRow style={{ background: "transparent" }}>
          <TableCell style={{ background: "transparent", border: 0 }}>
            Units
          </TableCell>
        </TableRow>
        <TableRow style={{ background: "transparent" }}>
          <TableCell style={{ background: "transparent", border: 0 }}>
            Unit Price
          </TableCell>
        </TableRow>
        <TableRow style={{ background: "transparent" }}>
          <TableCell style={{ background: "transparent", border: 0 }}>
            Gross Revenue
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableCell>
);

export function renderRow(
  data: DataItem[],
  headers: Header[],
  row: RowCategory,
  rowId: number,
  hiddenColumns?: string[],
  handleRowVisibility?: any,
  hiddenRows?: string[]
): React.ReactNode {
  const rowData = data.filter((item) => item.categoryId === row.categoryId);

  return (
    <React.Fragment key={rowId}>
      <TableRow>
        {renderCategoryCell(row, row.category, handleRowVisibility, hiddenRows)}
        {renderUnitCell()}
        {headers?.map(
          (header, headerId) =>
            header && renderCell(rowData, header, row, headerId, hiddenColumns)
        )}
      </TableRow>

      {hiddenRows?.find((hiddenRow) => hiddenRow === row.categoryId)
        ? null
        : row.subCategories &&
          row.subCategories?.map((subRow, subRowId) => {
            const subRowData = data.filter(
              (item) => item.subCategoryId === subRow.categoryId
            );

            return (
              <React.Fragment key={subRowId}>
                <TableRow>
                  {renderCategoryCell(
                    subRow,
                    subRow.category,
                    handleRowVisibility,
                    hiddenRows
                  )}
                  {renderUnitCell()}
                  {headers?.map(
                    (header, subHeaderId) =>
                      header.subHeaders &&
                      renderCell(
                        subRowData,
                        header,
                        row,
                        subHeaderId,
                        hiddenColumns
                      )
                  )}
                </TableRow>
              </React.Fragment>
            );
          })}
    </React.Fragment>
  );
}

export function renderRows(
  data: DataItem[],
  headers: Header[],
  rows: RowCategory[],
  hiddenColumns?: string[],
  handleRowVisibility?: any,
  hiddenRows?: string[]
) {
  return (
    rows &&
    rows.map((row, rowId) =>
      renderRow(
        data,
        headers,
        row,
        rowId,
        hiddenColumns,
        handleRowVisibility,
        hiddenRows
      )
    )
  );
}
