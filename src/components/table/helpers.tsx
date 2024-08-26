import React from "react";
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
  id: number,
  handleColumnVisibility?: any,
  hiddenColumns?: string[]
) {
  return (
    <React.Fragment key={id}>
      <th>
        {header.name}

        {header.subHeaders && (
          <button
            onClick={() => {
              handleColumnVisibility && handleColumnVisibility(header.id);
            }}
          >
            {hiddenColumns?.find((column) => column === header.id) ? ">" : "<"}
          </button>
        )}
      </th>

      {hiddenColumns?.find((column) => column === header.id)
        ? null
        : header.subHeaders &&
          renderHeaders(
            header.subHeaders,
            handleColumnVisibility,
            hiddenColumns
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
      <td>
        <table>
          <tbody>
            <tr>
              <td>{cellValue?.units || 0}</td>
            </tr>
            <tr>
              <td>{cellValue?.unitPrice[0].value || 0}</td>
            </tr>
            <tr>
              <td>{cellValue?.grossRevenue || 0}</td>
            </tr>
          </tbody>
        </table>
      </td>

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
  <td>
    <table>
      <tbody>
        <tr>
          <td>
            {cellValue}

            {row.subCategories && (
              <button
                onClick={() => {
                  handleRowVisibility && handleRowVisibility(row.categoryId);
                }}
              >
                {hiddenRows &&
                hiddenRows?.find((hiddenRow) => hiddenRow === row.categoryId)
                  ? ">"
                  : "<"}
              </button>
            )}
          </td>
        </tr>
        <tr>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
        </tr>
      </tbody>
    </table>
  </td>
);

const renderUnitCell = () => (
  <td>
    <table>
      <tbody>
        <tr>
          <td>Units</td>
        </tr>
        <tr>
          <td>Unit Price</td>
        </tr>
        <tr>
          <td>Gross Revenue</td>
        </tr>
      </tbody>
    </table>
  </td>
);

export function renderRow(
  data: DataItem[],
  headers: Header[],
  row: RowCategory,
  id: number,
  hiddenColumns?: string[],
  handleRowVisibility?: any,
  hiddenRows?: string[]
): React.ReactNode {
  const rowData = data.filter((item) => item.categoryId === row.categoryId);

  return (
    <>
      <tr key={id}>
        {renderCategoryCell(row, row.category, handleRowVisibility, hiddenRows)}
        {renderUnitCell()}
        {headers?.map(
          (header, headerId) =>
            header && renderCell(rowData, header, row, headerId, hiddenColumns)
        )}
      </tr>

      {hiddenRows?.find((hiddenRow) => hiddenRow === row.categoryId)
        ? null
        : row.subCategories &&
          row.subCategories?.map((subRow, subRowId) => {
            const subRowData = data.filter(
              (item) => item.subCategoryId === subRow.categoryId
            );

            return (
              <tr key={subRowId}>
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
              </tr>
            );
          })}
    </>
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
