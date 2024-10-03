import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "@/app/redux/reducers";

export type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;
export const useAppDispatch: () => AppDispatch = useDispatch;
