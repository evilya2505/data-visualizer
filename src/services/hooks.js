import {
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";

export const useSelector = selectorHook;

export const useDispatch = () => dispatchHook();
