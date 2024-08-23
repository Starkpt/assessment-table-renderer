import categories from "../../data/categories.json";
import data from "../../data/dummy_data2.json";

type RowsCategories = {
  category: string;
  categoryId: string;
  subCategories?: RowsCategories[];
};

function Table() {
  const headers = [
    {
      name: "Europe",
      id: "europe",
    },
    {
      name: "Germany",
      id: "germany",
    },
    {
      name: "Freiburg",
      id: "freiburg",
    },
    {
      name: "Berlin",
      id: "berlin",
    },
    {
      name: "Great Britain",
      id: "great-britain",
    },
  ];

  const rows = categories.reduce((acc: RowsCategories[], cur) => {
    if (!acc.some((entry) => entry.categoryId === cur.categoryId)) {
      acc.push({
        category: cur.category,
        categoryId: cur.categoryId,
        subCategories: [
          {
            category: cur.subCategory,
            categoryId: cur.subCategoryId,
          },
        ],
      });
    }

    const existingCategory = acc.find((category) => category.categoryId === cur.categoryId);

    if (existingCategory) {
      const subCategories = existingCategory.subCategories;

      if (!subCategories?.some((subCategory) => subCategory?.categoryId === cur.subCategoryId)) {
        subCategories?.push({ category: cur.subCategory, categoryId: cur.subCategoryId });
      }
    }

    return acc;
  }, []);

  console.log(rows);

  return (
    <div>
      <table>
        <thead>
          <th></th>
          <th></th>

          {headers.map((header) => (
            <th>{header.name}</th>
          ))}
        </thead>

        <tbody>
          {rows.map((row) => {
            console.log(row);
            return (
              <>
                <tr>
                  <td>
                    <table>
                      <tbody>
                        <tr>
                          <td>{row.category}</td>
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

                  {headers.map((cell) => {
                    const values = data.find(
                      (item) => item.categoryId === row.categoryId && item.locationId === cell.id
                    );

                    console.log(values);

                    return (
                      <td>
                        <table>
                          <tbody>
                            <tr>
                              <td>{values?.units || 0}</td>
                            </tr>
                            <tr>
                              <td>{values?.unitPrice[0].value || 0}</td>
                            </tr>
                            <tr>
                              <td>{values?.grossRevenue || 0}</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    );
                  })}
                </tr>

                {row.subCategories &&
                  row.subCategories.map((subCategory) => (
                    <>
                      <tr>
                        <td>
                          <table>
                            <tbody>
                              <tr>
                                <td>{subCategory.category}</td>
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

                        {headers.map((cell) => {
                          const values = data.find(
                            (item) =>
                              item.subCategoryId === subCategory.categoryId &&
                              item.locationId === cell.id
                          );

                          return (
                            <td>
                              <table>
                                <tbody>
                                  <tr>
                                    <td>{values?.units || 0}</td>
                                  </tr>
                                  <tr>
                                    <td>{values?.unitPrice[0].value || 0}</td>
                                  </tr>
                                  <tr>
                                    <td>{values?.grossRevenue || 0}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          );
                        })}
                      </tr>
                    </>
                  ))}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
