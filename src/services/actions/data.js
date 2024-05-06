import {
  calculateExperimentTime,
  removeDuplicateLines,
} from "../../utils/utils";
import { setGraphData, setExperimentTime } from "../reducers/data";

export const setNewData = (newData, type, fileName) => {
  return function (dispatch) {
    dispatch(
      setGraphData({
        newData: removeDuplicateLines(newData),
        type: type,
        fileName: fileName,
      })
    );

    dispatch(setExperimentTime(calculateExperimentTime(newData)));
  };
};
