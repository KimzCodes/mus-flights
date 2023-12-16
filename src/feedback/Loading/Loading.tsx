import { TLoading } from "../../types/SharedTypes";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/lottie/loadingAnimation.json";
import errorServerAnimation from "../../assets/lottie/errorServerAnimation.json";

type Props = {
  loading: TLoading;
  error: string | null;
  children: React.JSX.Element;
};

const Loading = ({ loading, error, children }: Props) => {
  if (loading === "pending") {
    return (
      <div className="d-flex align-items-center justify-content-center flex-column">
        <Lottie
          animationData={loadingAnimation}
          loop={true}
          style={{ width: "50%" }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex align-items-center justify-content-center flex-column">
        <Lottie
          animationData={errorServerAnimation}
          loop={true}
          style={{ width: "40%", marginBottom: "-35px" }}
        />
        <p className="text-danger mt-2 font-weight-light">{error}</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default Loading;
