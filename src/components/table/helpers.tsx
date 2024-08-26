import React from "react";
import { DataItem, Header, RowCategory } from "../../types/types";

const renderCategoryCell = (category: string) => (
  <td>
    <table>
      <tbody>
        <tr>
          <td>{category}</td>
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

export function renderHeader(header: Header, id: number) {
  return (
    <React.Fragment key={id}>
      <th>{header.name}</th>

      {header.subHeaders && renderHeaders(header.subHeaders)}
    </React.Fragment>
  );
}

export function renderHeaders(headers: Header[]): React.ReactNode {
  return headers.map((header: Header, id) => renderHeader(header, id));
}

export function renderCell(
  data: DataItem[],
  header: Header,
  row: RowCategory,
  id: number
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

      {header.subHeaders &&
        header.subHeaders.map((subHeader, id) => {
          return renderCell(data, subHeader, row, id);
        })}
    </React.Fragment>
  );
}

export function renderCells(
  data: DataItem[],
  headers: Header[],
  row: RowCategory
): React.ReactNode {
  return headers.map((header, id) => {
    return renderCell(data, header, row, id);
  });
}

export function renderRow(
  data: DataItem[],
  headers: Header[],
  row: RowCategory,
  id: number
): React.ReactNode {
  return (
    <>
      <tr key={id}>
        {renderCategoryCell(row.category)}
        {renderUnitCell()}
        {headers?.map((header, headerId) => {
          const newData = data.filter(
            (item) => item.categoryId === row.categoryId
          );
          return header && renderCell(newData, header, row, headerId);
        })}
      </tr>

      {row.subCategories?.map((subCategory, id) => (
        <tr key={id}>
          {renderCategoryCell(subCategory.category)}
          {renderUnitCell()}
          {headers?.map((header, subHeaderId) => {
            const newData = data.filter(
              (item) => item.subCategoryId === subCategory.categoryId
            );

            return (
              header.subHeaders && renderCell(newData, header, row, subHeaderId)
            );
          })}
        </tr>
      ))}
    </>
  );
}

export function renderRows(
  data: DataItem[],
  headers: Header[],
  rows: RowCategory[]
) {
  return rows && rows.map((row, rowId) => renderRow(data, headers, row, rowId));
}
