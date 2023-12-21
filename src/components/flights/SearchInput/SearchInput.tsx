import { useForm } from "react-hook-form";
import useFlightValidation from "../../../hooks/useFlightValidation";
import Form from "react-bootstrap/Form";
import { TLoading } from "../../../types/SharedTypes";

type FormValues = {
  query: string;
};

const SearchInput = ({
  loading,
  setSearchQuery,
}: {
  loading: TLoading;
  setSearchQuery: () => void;
}) => {
  const { codeValidation } = useFlightValidation();
  const {
    handleSubmit,
    register,
    getFieldState,
    trigger,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
  });
  return (
    <>
      <Form.Control
        type="text"
        placeholder="search by flight code"
        className="mb-3"
        {...register("query", codeValidation)}
        disabled={loading === "pending" ? true : false}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Form.Control.Feedback type="invalid">
        {errors.query?.message}
      </Form.Control.Feedback>
    </>
  );
};

export default SearchInput;
