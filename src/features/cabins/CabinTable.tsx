import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import { TCabinType } from "../../schema/cabinSchema";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

type CabinTypeArray = TCabinType[];

function CabinTable() {
  const { cabins, isLoading } = useCabins();
  const [searchParams] = useSearchParams();

  // 1) FILTER Cabins
  const filterValue: string = searchParams.get("discount") || "all";
  let filterCabins: CabinTypeArray = [];

  if (filterValue === "all") filterCabins = cabins ?? [];
  else if (filterValue === "no-discount")
    filterCabins = cabins?.filter((cabin) => cabin.discount === 0) ?? [];
  else if (filterValue === "with-discount")
    filterCabins = cabins?.filter((cabin) => cabin.discount > 0) ?? [];

  // 2) SORT CABINS
  const sortByValue: string = searchParams.get("sortBy") || "name-asc";

  const [sortField, direction] = sortByValue.split("-");
  const multiplier = direction === "asc" ? 1 : -1;
  const sortedCabins = filterCabins.sort((a, b) => {
    const field = sortField as keyof TCabinType;
    const aField =
      typeof a[field] === "number"
        ? (a[field] as number)
        : Number(a[field] as string);
    const bField =
      typeof b[field] === "number"
        ? (b[field] as number)
        : Number(b[field] as string);

    if (Number.isNaN(aField) || Number.isNaN(bField)) {
      return String(a[field]).localeCompare(String(b[field])) * multiplier;
    } else return (aField - bField) * multiplier;
  });

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body<TCabinType>
          data={sortedCabins || []}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
