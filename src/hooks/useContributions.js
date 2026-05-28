import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllContributions,
  selectContributionError,
  selectContributionStatus,
} from "../store/selectors/contributionsSelectors";
import { fetchContributions } from "../store/slices/contributionsSlice";

export default function useContributions() {
  const dispatch = useDispatch();
  const contributions = useSelector(selectAllContributions);
  const status = useSelector(selectContributionStatus);
  const error = useSelector(selectContributionError);

  useEffect(() => {
    dispatch(fetchContributions());
  }, [dispatch]);

  return { contributions, status, error };
}
