import { useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { actGetFlights, actDeleteFlight } from "../store/flights/flightsSlice";
import { Loading } from "../components/feedback";
import { FlightsList, ModalDelete, ModalEdit } from "../components/flights";
import { IFlightWithCrudHandler, Flight } from "../types/Flight";

const Home = () => {
  const dispatch = useAppDispatch();
  const { loading, error, records, total } = useAppSelector(
    (state) => state.flights
  );

  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  // split holder to prevent unwanted rendering while open edit and delete modal
  const selectDeleteRecord = useRef<null | Flight>(null);
  const selectedEditRecord = useRef<null | Flight>(null);
  const pageSize = 10;
  const totalPaginationItems = Math.ceil(total / pageSize);
  // use search params to update url without reload the page
  const [paginationQuery, setPaginationQuery] = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(paginationQuery);
    const urlSize = params.get("size") ?? pageSize;
    const urlSelectedPage = params.get("page") ?? 1;

    const promise = dispatch(
      actGetFlights({ size: +urlSize, page: +urlSelectedPage })
    );

    return () => {
      promise.abort();
    };
  }, [dispatch, paginationQuery]);

  //get info of selected flight however its edit or delete operation
  const selectRecordHandler = useCallback((data: IFlightWithCrudHandler) => {
    const { handle, ...flightData } = data;

    if (handle === "delete") {
      selectDeleteRecord.current = flightData;
      setDeleteModal(true);
    } else {
      selectedEditRecord.current = flightData;
      setEditModal(true);
    }
  }, []);

  // delete record
  const deleteHandler = useCallback(() => {
    const id: string = selectDeleteRecord.current?.id ?? "";

    setDeleteModal(false);
    dispatch(actDeleteFlight(id));
  }, [dispatch]);

  // paginate
  const paginationHandler = useCallback(
    (num: number) => {
      const queryString = `?page=${num}&size=${pageSize}`;
      setPaginationQuery(queryString);
      setCurrentPage(num);
    },
    [setPaginationQuery, pageSize]
  );

  return (
    <>
      <h4 className="mb-4 mt-4">All Flights</h4>
      <ModalDelete
        code={selectDeleteRecord.current?.code ?? ""}
        deleteHandler={deleteHandler}
        showDialog={deleteModal}
        setShowDialog={setDeleteModal}
      />
      <ModalEdit
        flightData={selectedEditRecord.current}
        showDialog={editModal}
        setShowDialog={setEditModal}
      />
      <Loading loading={loading} error={error}>
        <FlightsList
          totalPaginationItems={totalPaginationItems}
          pageSize={pageSize}
          currentPage={currentPage}
          records={records}
          selectRecord={selectRecordHandler}
          pagination={paginationHandler}
        />
      </Loading>
    </>
  );
};

export default Home;
