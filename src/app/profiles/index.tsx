import DefaultLayout from "@/layouts/default";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Chip,
    Divider,
    Input,
    Link,
    Spinner,
} from "@heroui/react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FiEdit3, FiSave, FiUser } from "react-icons/fi";
import { roleConverter } from "../shared/utils/roleConverter";
import { PiUserCircleLight } from "react-icons/pi";
import { useProfile } from "./hooks/useProfile";

export const Profile = () => {
    const {
        singleUser,
        loading,
        isEditing,
        setIsEditing,
        profileData,
        setProfileData,
        handleSave,
        handleCancel,
        errors,
        user
    } = useProfile();

    if (loading) {
        return (
            <DefaultLayout>
                <div className="flex items-center justify-center h-screen">
                    <Spinner color="success" size="lg" />
                </div>
            </DefaultLayout>
        );
    }

    return (
        <DefaultLayout>
            <div className="flex flex-col gap-6 p-6 min-h-screen">
                <div className="flex items-center justify-between mt-6">
                    <div>
                        <div className="flex items-center gap-2">
                            <PiUserCircleLight className="w-14 h-14 text-default-500" />
                            <div className="flex items-center gap-2">
                                <h1 className="text-3xl font-bold text-gray">
                                    {singleUser?.username}
                                </h1>
                                <Chip variant="bordered" color="primary">
                                    {roleConverter(singleUser?.role as string)}
                                </Chip>
                                <Chip
                                    variant="bordered"
                                    color={singleUser?.estado === "activo" ? "success" : "danger"}
                                >
                                    {singleUser?.estado}
                                </Chip>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <p className="text-default-600 mt-1">Perfil de Usuario</p>
                            {singleUser?.CvLAC && (
                                <Link
                                    color="success"
                                    className="flex items-center gap-1 text-sm"
                                    href={singleUser?.CvLAC}
                                    isExternal
                                >
                                    <FaExternalLinkAlt /> Ver CvLAC
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {singleUser?._id === user?.userId && (
                            !isEditing ? (
                                <Button
                                    color="success"
                                    variant="light"
                                    startContent={<FiEdit3 />}
                                    onPress={() => setIsEditing(true)}
                                >
                                    Editar Perfil
                                </Button>
                            ) : (
                                <div className="flex gap-2">
                                    <Button
                                        color="primary"
                                        variant="light"
                                        startContent={<FiSave />}
                                        onPress={handleSave}
                                    >
                                        Guardar
                                    </Button>
                                    <Button
                                        color="warning"
                                        variant="light"
                                        onPress={handleCancel}
                                    >
                                        Cancelar
                                    </Button>
                                </div>
                            )
                        )}
                    </div>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-3 space-y-6">
                        <Divider className="mt-6" />
                        <Card className="shadow-lg mt-6 border border-success-200">
                            <CardHeader className="pb-3">
                                <div className="flex items-center gap-2 text-success">
                                    <FiUser className="text-green-600" />
                                    <h2 className="text-lg font-semibold">
                                        Información Personal
                                    </h2>
                                </div>
                            </CardHeader>
                            <CardBody className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        label="Nombre completo"
                                        radius="md"
                                        value={profileData.username}
                                        isReadOnly={!isEditing}
                                        variant={isEditing ? "bordered" : "flat"}
                                        onChange={(e) =>
                                            setProfileData({ ...profileData, username: e.target.value })
                                        }
                                    />
                                    <Input
                                        label="Correo electrónico"
                                        radius="md"
                                        value={profileData.email}
                                        isReadOnly={!isEditing}
                                        variant={isEditing ? "bordered" : "flat"}
                                        onChange={(e) =>
                                            setProfileData({ ...profileData, email: e.target.value })
                                        }
                                    />
                                    <Input
                                        label="Teléfono"
                                        radius="md"
                                        value={profileData.telefono}
                                        isReadOnly={!isEditing}
                                        variant={isEditing ? "bordered" : "flat"}
                                        onChange={(e) =>
                                            setProfileData({ ...profileData, telefono: e.target.value })
                                        }
                                    />
                                    <Input
                                        label="Área de Trabajo"
                                        radius="md"
                                        value={profileData.areaDeTrabajo}
                                        isReadOnly={!isEditing}
                                        variant={isEditing ? "bordered" : "flat"}
                                        onChange={(e) =>
                                            setProfileData({
                                                ...profileData,
                                                areaDeTrabajo: e.target.value,
                                            })
                                        }
                                    />
                                    <Input
                                        label="Semillero de Investigación"
                                        radius="md"
                                        value={profileData.SemilleroInvestigacion}
                                        isReadOnly={!isEditing}
                                        variant={isEditing ? "bordered" : "flat"}
                                        onChange={(e) =>
                                            setProfileData({
                                                ...profileData,
                                                SemilleroInvestigacion: e.target.value,
                                            })
                                        }
                                    />
                                    <Input
                                        label="Clasificación MinCiencias"
                                        radius="md"
                                        value={profileData.clasificacionMinCiencias}
                                        isReadOnly={!isEditing}
                                        variant={isEditing ? "bordered" : "flat"}
                                        onChange={(e) =>
                                            setProfileData({
                                                ...profileData,
                                                clasificacionMinCiencias: e.target.value,
                                            })
                                        }
                                    />
                                    {isEditing && (
                                        <Input
                                            label="CVLAC"
                                            type="url"
                                            errorMessage={errors.CvLAC}
                                            radius="md"
                                            value={profileData.CvLAC}
                                            variant={isEditing ? "bordered" : "flat"}
                                            onChange={(e) =>
                                                setProfileData({ ...profileData, CvLAC: e.target.value })
                                            }
                                        />)
                                    }
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};
