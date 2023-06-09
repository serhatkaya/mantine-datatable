import { DataTable } from "mantine-datatable";
import { companies } from "~/data";

export default function ColumnGroupingExample() {
  return <DataTable
    withBorder
    withColumnBorders
    records={companies}
    groups={[
      { 
        id: "company", 
        component: "Company",
        columns: [
          { accessor: "name" },
          { accessor: "missionStatement" }
        ] 
      },
      { 
        id: "contact-info", 
        component: "Contact info",
        columns: [
          { accessor: "streetAddress" },
          { accessor: "city" },
          { accessor: "state" },
        ] 
      },
      {
        id: "other",
        component: "Id",
        columns: [
          { accessor: "id", hidden: true }
        ]
      },
      {
        id: "empty-group",
        component: "Empty group",
        columns: []
      }
    ]}
  />
}