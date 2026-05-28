import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllFamilies,
  selectFamilyError,
  selectFamilyStatus,
} from "../store/selectors/familiesSelectors";
import { fetchMembers } from "../store/slices/membershipSlice";
import { fetchFamilies } from "../store/slices/familiesSlice";

export default function useMembers() {
  const dispatch = useDispatch();
  const families = useSelector(selectAllFamilies);
  const status = useSelector(selectFamilyStatus);
  const error = useSelector(selectFamilyError);

  useEffect(() => {
    dispatch(fetchFamilies());
  }, [dispatch]);

  return { families, status, error };
}
