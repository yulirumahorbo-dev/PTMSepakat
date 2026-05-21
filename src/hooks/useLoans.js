import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllLoans,
  selectLoanError,
  selectLoanStatus,
} from "../store/selectors/loansSelectors";
import { fetchMembers } from "../store/slices/membershipSlice";
import { fetchLoans } from "../store/slices/loansSlice";

export default function useLoans() {
  const dispatch = useDispatch();
  const loans = useSelector(selectAllLoans);
  const status = useSelector(selectLoanStatus);
  const error = useSelector(selectLoanError);

  useEffect(() => {
    dispatch(fetchLoans());
  }, [dispatch]);

  return { loans, status, error };
}
