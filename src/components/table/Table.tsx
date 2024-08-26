import { useState } from "react";
import categories from "../../data/categories.json";
import data from "../../data/dummy_data2.json";
import { Header, RowCategory } from "../../types/types";
import { renderHeaders, renderRows } from "./helpers";

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

function Table() {
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

  const handleColumnVisibility = (colName: any) => {
    setHiddenColumns((prevValues) =>
      prevValues.includes(colName)
        ? prevValues.filter((column) => column !== colName)
        : [...prevValues, colName]
    );
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th></th>

            {renderHeaders(headers, handleColumnVisibility, hiddenColumns)}
          </tr>
        </thead>

        <tbody>{renderRows(data, headers, rows, hiddenColumns)}</tbody>
      </table>
    </div>
  );
}

export default Table;
