import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllMembers,
  selectMemberError,
  selectMemberStatus,
} from "../store/selectors/membersSelectors";
import { fetchMembers } from "../store/slices/membershipSlice";

export default function useMembers() {
  const dispatch = useDispatch();
  const members = useSelector(selectAllMembers);
  const status = useSelector(selectMemberStatus);
  const error = useSelector(selectMemberError);

  useEffect(() => {
    dispatch(fetchMembers());
  }, [dispatch]);

  return { members, status, error };
}
