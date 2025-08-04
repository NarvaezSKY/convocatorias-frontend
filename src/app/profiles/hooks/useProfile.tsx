import { useUsersStore } from "@/app/shared/users.store";

import { useEffect } from "react";
import { useParams } from "react-router-dom";


export const useProfile = () => {
    const { id } = useParams<{ id: string }>();
    const { getSingleUser, singleUser, loading } = useUsersStore();
    useEffect(() => {
        if (id) {
            getSingleUser(id);
        }
    }, [id]);
    return { singleUser, loading };
};