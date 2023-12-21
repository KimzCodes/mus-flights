import Lottie from "lottie-react";
import reactSuspense from "../../../assets/lottie/reactSuspense.json";

const SuspenseLoading = () => {
  return (
    <div className="d-flex align-items-center justify-content-center flex-column mt-5">
      <Lottie
        animationData={reactSuspense}
        loop={true}
        style={{ width: "50%" }}
      />
    </div>
  );
};

export default SuspenseLoading;
