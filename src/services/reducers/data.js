import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  dataIb: [],
  dataUb: [],
  IbName: "",
  UbName: "",
  experimentTime: 0,
  isSaved: false,
  choosenGraph: "",
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setGraphData(state, action) {
      state.isSaved = false;
      if (action.payload.type === "U") {
        state.UbName = action.payload.fileName;
        state.dataUb = action.payload.newData;
      }
      if (action.payload.type === "I") {
        state.IbName = action.payload.fileName;
        state.dataIb = action.payload.newData;
      }
    },
    setExperimentTime(state, action) {
      state.experimentTime = action.payload;
    },
    setChoosenGraph(state, action) {
      state.choosenGraph = action.payload;
    },
    setIsSaved(state) {
      state.isSaved = true;
    },
  },
});
export const { setGraphData, setExperimentTime, setChoosenGraph, setIsSaved } =
  dataSlice.actions;

export default dataSlice.reducer;
