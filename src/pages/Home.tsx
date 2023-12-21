import { useEffect, useState, useRef, useCallback } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { actGetFlights, actDeleteFlight } from "../store/flights/flightsSlice";
import { useSearchParams } from "react-router-dom";
import usePrevState from "../hooks/usePrevState";
import { Loading } from "../components/feedback";
import {
  FlightsList,
  ModalDelete,
  ModalEdit,
  ModalPhotoReview,
} from "../components/flights";
import Form from "react-bootstrap/Form";
import { IFlightWithCrudHandler, IFlight } from "../types/Flight";

const Home = () => {
  const dispatch = useAppDispatch();
  const { loading, error, records, count } = useAppSelector(
    (state) => state.flights
  );

  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [previewImageModal, setPreviewImageModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const prevSearchQuery = usePrevState(searchQuery);
  // split selected data holder to prevent unnecessary rendering while open edit or delete modal
  const selectDeleteRecord = useRef<null | IFlight>(null);
  const selectedEditRecord = useRef<null | IFlight>(null);
  const selectedPreviewImageRecord = useRef<null | IFlight>(null);
  // get prev state to search term changed

  const pageSize = 10;
  const totalPaginationItems = Math.ceil(count / pageSize);

  // use search params to update url without reload the page
  const setPaginationQuery = useSearchParams()[1];

  // work in mounting
  useEffect(() => {
    const promise = dispatch(
      actGetFlights({
        size: pageSize,
        page: 1,
        search: "",
      })
    );

    return () => promise.abort();
  }, [dispatch]);

  //work in search
  useEffect(() => {
    const isValidInput = /^[a-zA-Z]{1,6}$/.test(searchQuery);

    if (searchQuery !== prevSearchQuery && isValidInput) {
      const debounceSearch = setTimeout(() => {
        dispatch(
          actGetFlights({ size: pageSize, page: 1, search: searchQuery })
        )
          .unwrap()
          .then(() => {
            if (searchQuery) {
              setPaginationQuery(`?search=${searchQuery}`);
            }
          });
      }, 500);

      return () => {
        clearTimeout(debounceSearch);
      };
    }
    // reset
    if (
      isValidInput === false &&
      searchQuery === "" &&
      prevSearchQuery !== "" &&
      prevSearchQuery !== null
    ) {
      setPaginationQuery("");
      dispatch(
        actGetFlights({
          size: pageSize,
          page: 1,
          search: "",
        })
      );
    }
  }, [searchQuery, prevSearchQuery, pageSize, dispatch, setPaginationQuery]);

  //get info of selected flight however its edit, delete operation or preview
  const selectRecordHandler = useCallback((data: IFlightWithCrudHandler) => {
    const { handle, ...flightData } = data;
    if (handle === "delete") {
      selectDeleteRecord.current = flightData;
      setDeleteModal(true);
    } else if (handle === "imageReview") {
      selectedPreviewImageRecord.current = flightData;
      setPreviewImageModal(true);
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
      let queryString = `?page=${num}`;
      if (searchQuery) {
        queryString += `&search=${searchQuery}`;
      }
      dispatch(
        actGetFlights({
          size: pageSize,
          page: num,
          search: searchQuery,
        })
      );
      setPaginationQuery(queryString);
      setCurrentPage(num);
    },
    [setPaginationQuery, searchQuery, dispatch]
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
      <ModalPhotoReview
        flightData={selectedPreviewImageRecord.current}
        showDialog={previewImageModal}
        setShowDialog={setPreviewImageModal}
      />
      {/* search Control */}
      <Form.Control
        type="text"
        placeholder="search with valid flight code"
        className="mb-3"
        disabled={loading === "pending" ? true : false}
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
        maxLength={6}
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
