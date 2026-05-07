import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/slices/usersSlice";

export default function useUsers() {
  const dispatch = useDispatch();
  const { data: users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return { users, loading, error };
}
