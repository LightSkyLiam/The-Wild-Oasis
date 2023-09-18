import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const [searchParams] = useSearchParams();
  const filterBy = searchParams.get(`discount`) || "all";
  const { isLoading, cabins } = useCabins();
  if (isLoading) return <Spinner />;
  const filteredCabins =
    filterBy === `all`
      ? cabins
      : filterBy === `no-discount`
      ? cabins.filter((cabin) => !cabin.discount)
      : cabins.filter((cabin) => cabin.discount);
  const sortBy = searchParams.get(`sortby`) || "startDate-asc";
  const [field, direction] = sortBy.split(`-`);
  const modifier = direction === `asc` ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );
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
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
