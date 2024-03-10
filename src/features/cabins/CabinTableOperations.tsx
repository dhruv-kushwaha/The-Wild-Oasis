import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        filterOptions={[
          { label: "All", value: "all" },
          { label: "No Discount", value: "no-discount" },
          { label: "With Discount", value: "with-discount" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
