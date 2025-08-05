import { useAuthStore } from "@/app/shared/auth.store";
import { useUsersStore } from "@/app/shared/users.store";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export const useProfile = () => {
    const { id } = useParams<{ id: string }>();
    const { getSingleUser, singleUser, loading, updateUser } = useUsersStore();
    const { user } = useAuthStore();
    const [errors, setErrors] = useState<{ CvLAC?: string }>({});

    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        username: "",
        email: "",
        telefono: "",
        role: "",
        areaDeTrabajo: "",
        SemilleroInvestigacion: "",
        clasificacionMinCiencias: "",
        CvLAC: "",
        estado: ""
    });

    useEffect(() => {
        if (id) {
            getSingleUser(id);
        }
    }, [id]);

    useEffect(() => {
        if (singleUser) {
            setProfileData({
                username: singleUser.username || "",
                email: singleUser.email || "",
                telefono: singleUser.telefono || "",
                role: singleUser.role || "",
                areaDeTrabajo: singleUser.areaDeTrabajo || "",
                SemilleroInvestigacion: singleUser.SemilleroInvestigacion || "",
                clasificacionMinCiencias: singleUser.clasificacionMinCiencias || "",
                CvLAC: singleUser.CvLAC || "",
                estado: singleUser.estado || ""
            });
        }
    }, [singleUser]);

    const isValidUrl = (url: string) => {
        try {
            if (!url) return true;
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    const handleSave = () => {
        const newErrors: typeof errors = {};

        if (!isValidUrl(profileData.CvLAC)) {
            newErrors.CvLAC = "El CvLAC debe ser una URL válida";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            toast.error("Corrige los errores antes de guardar");
            return;
        }

        setErrors({});
        setIsEditing(false);

        try {
            updateUser({
                ...profileData,
                id: singleUser?._id || ""
            }).then(() => {
                getSingleUser(singleUser?._id || "");
            });
            toast.success("Perfil actualizado correctamente");
        } catch (error) {
            toast.error("Algo salió mal. Intenta nuevamente más tarde");
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        if (singleUser) {
            setProfileData({
                username: singleUser.username || "",
                email: singleUser.email || "",
                telefono: singleUser.telefono || "",
                role: singleUser.role || "",
                areaDeTrabajo: singleUser.areaDeTrabajo || "",
                SemilleroInvestigacion: singleUser.SemilleroInvestigacion || "",
                clasificacionMinCiencias: singleUser.clasificacionMinCiencias || "",
                CvLAC: singleUser.CvLAC || "",
                estado: singleUser.estado || ""
            });
        }
    };

    return {
        singleUser,
        loading,
        isEditing,
        setIsEditing,
        profileData,
        setProfileData,
        handleSave,
        handleCancel,
        defaultValues: profileData,
        errors,
        user
    };

};
