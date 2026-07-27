import ReactCompareImage from "react-compare-image";

import before from "../../assets/before-after/before.png";
import after from "../../assets/before-after/after.png";

export default function ImageCompare() {
  return (
    <div className="overflow-hidden rounded-4xl shadow-2xl">
      <ReactCompareImage
        leftImage={before}
        rightImage={after}
        sliderLineColor="#ec4899"
        handleSize={48}
      />
    </div>
  );
}
