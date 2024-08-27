import { useState } from "react";
import categories from "../../data/categories.json";
import data from "../../data/dummy_data.json";
import { Header, RowCategory } from "../../types/types";
import { renderHeaders, renderRows } from "./helpers";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "semantic-ui-react";

const headers: Header[] = [
  {
    name: "Europe",
    id: "europe",
    subHeaders: [
      {
        name: "Germany",
        id: "germany",
        subHeaders: [
          {
            name: "Freiburg",
            id: "freiburg",
          },
          {
            name: "Berlin",
            id: "berlin",
          },
        ],
      },
      {
        name: "Great Britain",
        id: "great-britain",
        subHeaders: [
          {
            name: "London",
            id: "london",
          },
        ],
      },
    ],
  },
];

function TableComponent() {
  const rows = categories.reduce((acc: RowCategory[], cur) => {
    let existingCategory = acc.find(
      (entry) => entry.categoryId === cur.categoryId
    );

    if (!existingCategory) {
      existingCategory = {
        category: cur.category,
        categoryId: cur.categoryId,
        subCategories: [],
      };

      acc.push(existingCategory);
    }

    if (
      existingCategory.subCategories &&
      !existingCategory.subCategories.some(
        (sub) => sub.categoryId === cur.subCategoryId
      )
    ) {
      existingCategory.subCategories.push({
        category: cur.subCategory,
        categoryId: cur.subCategoryId,
      });
    }

    return acc;
  }, []);

  const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);
  const [hiddenRows, setHiddenRows] = useState<string[]>([]);

  const handleColumnVisibility = (colName: any) => {
    setHiddenColumns((prevValues) =>
      prevValues.includes(colName)
        ? prevValues.filter((column) => column !== colName)
        : [...prevValues, colName]
    );
  };

  const handleRowVisibility = (rowName: any) => {
    setHiddenRows((prevValues) =>
      prevValues.includes(rowName)
        ? prevValues.filter((column) => column !== rowName)
        : [...prevValues, rowName]
    );
  };

  return (
    <div style={{ padding: "10vh 5vw" }}>
      <Table definition collapsing striped>
        <TableHeader>
          <TableRow>
            <TableHeaderCell></TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>

            {renderHeaders(headers, handleColumnVisibility, hiddenColumns)}
          </TableRow>
        </TableHeader>

        <TableBody>
          {renderRows(
            data,
            headers,
            rows,
            hiddenColumns,
            handleRowVisibility,
            hiddenRows
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default TableComponent;
