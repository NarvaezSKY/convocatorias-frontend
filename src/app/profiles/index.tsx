import React from "react";
import DefaultLayout from "@/layouts/default"
import { useProfile } from "./hooks/useProfile";
import { Card, CardBody, CardHeader, Chip, Divider, Input, Link, Spinner } from "@heroui/react";
import { FaExternalLinkAlt } from "react-icons/fa";
import {
    FiUser,
} from "react-icons/fi"
import { roleConverter } from "../shared/utils/roleConverter";
import { PiUserCircleLight } from "react-icons/pi";

export const Profile = () => {
    const [isEditing] = React.useState(false)

    const [profileData, setProfileData] = React.useState({
        name: "Rodrigo Montaño",
        email: "seguimientoidregionalcauca@gmail.com",
        phone: "3043362518",
        role: "Super Administrador",
        department: "Innovación y Competitividad",
        location: "Cauca, Colombia",
        joinDate: "Enero 2023",
        bio: "Administrador del sistema con más de 5 años de experiencia en gestión de proyectos de innovación y competitividad.",
    })
    // const handleSave = () => {
    //     setIsEditing(false)
    // }

    // const handleCancel = () => {
    //     setIsEditing(false)
    // }
    const { singleUser, loading } = useProfile();

    if (loading) {
        return
        <DefaultLayout>
            <div className="flex items-center justify-center min-h-screen">
                <Spinner size="lg" />
            </div>
        </DefaultLayout>
    }

    return (
        <DefaultLayout>
            <div className="flex flex-col gap-6 p-6 bg-gray-50 min-h-screen">
                <div className="flex items-center justify-between mt-6">
                    <div>
                        <div className="flex items-center gap-4">
                            <PiUserCircleLight className="w-14 h-14" />
                            <div className="flex items-center gap-2">
                                <h1 className="text-3xl font-bold text-gray-800">{singleUser?.username}</h1>
                                <Chip variant="bordered" color="primary">{roleConverter(singleUser?.role as string)}</Chip>
                                <Chip variant="bordered" color={singleUser?.estado === "activo" ? "success" : "danger"}>{singleUser?.estado}</Chip>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <p className="text-default-600 mt-1">Perfil de Usuario</p>
                            {singleUser?.CvLAC &&
                                <Link color="success" className="flex items-center gap-1 text-sm" href={singleUser?.CvLAC} isExternal> <FaExternalLinkAlt /> Ver CvLAC</Link>}
                        </div>

                    </div>
                    {/* <div className="flex gap-2">
                        {!isEditing && singleUser ? (
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
                                <Button color="warning" variant="light" onPress={handleCancel}>
                                    Cancelar
                                </Button>
                            </div>
                        )}
                    </div> */}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    <div className="lg:col-span-2 space-y-6">
                        <Divider className="mt-6" />
                        <Card className="shadow-lg mt-6 border border-success-200">
                            <CardHeader className="pb-3">
                                <div className="flex items-center gap-2 text-success">
                                    <FiUser className="text-green-600" />
                                    <h2 className="text-lg font-semibold">Información Personal</h2>
                                </div>
                            </CardHeader>
                            <CardBody className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        label="Nombre completo"
                                        radius="md"
                                        value={singleUser?.username}
                                        isReadOnly={!isEditing}
                                        variant={isEditing ? "bordered" : "flat"}
                                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                    />
                                    <Input
                                        label="Correo electrónico"
                                        radius="md"
                                        value={singleUser?.email}
                                        isReadOnly={!isEditing}
                                        variant={isEditing ? "bordered" : "flat"}
                                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                    />
                                    <Input
                                        label="Teléfono"
                                        radius="md"
                                        value={singleUser?.telefono}
                                        isReadOnly={!isEditing}
                                        variant={isEditing ? "bordered" : "flat"}
                                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                    />

                                    <Input
                                        label="Area de Trabajo"
                                        radius="md"
                                        value={singleUser?.areaDeTrabajo || "No aplica"}
                                        isReadOnly={!isEditing}
                                        variant={isEditing ? "bordered" : "flat"}
                                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                    />
                                    <Input
                                        label="Semillero de Investigación"
                                        radius="md"
                                        value={singleUser?.SemilleroInvestigacion || "No aplica"}
                                        isReadOnly={!isEditing}
                                        variant={isEditing ? "bordered" : "flat"}
                                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                    />
                                    <Input
                                        label="Clasificación MinCiencias"
                                        radius="md"
                                        value={singleUser?.clasificacionMinCiencias || "No aplica"}
                                        isReadOnly={!isEditing}
                                        variant={isEditing ? "bordered" : "flat"}
                                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                    />

                                </div>
                            </CardBody>
                        </Card>

                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}