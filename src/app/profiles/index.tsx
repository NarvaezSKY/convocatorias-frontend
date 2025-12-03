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
    Select,
    SelectItem,
} from "@heroui/react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FiEdit3, FiSave, FiUser } from "react-icons/fi";
import { roleConverter } from "../shared/utils/roleConverter";
import { useProfile } from "./hooks/useProfile";
import defaultPfp from "../assets/profile_default.png";
import ConvocatoriasTable from "../home/components/ConvocatoriasTable";
import { VscGithubProject } from "react-icons/vsc";
import ReusableModal from "../shared/components/Modal";
import React, { useEffect, useState } from "react";
import { ISearchConvocatoriasReq } from "@/core/convocatorias/domain/search-convocatorias";
import Filtros from "../home/components/Filters";
import { toast } from "sonner";
import { useConvocatorias } from "../home/hooks/UseConvocatorias";

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
        user,
        searchProfileConvocatorias,
    } = useProfile();
    const { handleSearch } = useConvocatorias();

    // Los hooks siempre deben declararse antes de cualquier return condicional
    const [isOpen, setIsOpen] = React.useState(false);
    const [filtros, setFiltros] = useState<ISearchConvocatoriasReq>({});

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            const filtrosLimpios = Object.fromEntries(
                Object.entries(filtros).filter(([_, v]) => v?.toString().trim() !== "")
            );

            handleSearch(filtrosLimpios);
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [filtros]);

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
            <div className="flex flex-col gap-6 p-6 min-h-screen bg-test rounded-lg">
                <div className="flex items-center justify-between mt-6">
                    <div>
                        <div className="flex items-center gap-2">
                            <img src={defaultPfp} width={80} alt="" className="rounded-full border border-4 border-success" />
                            <div className="flex items-center gap-2">
                                <h1 className="text-4xl font-extrabold text-success ml-1">
                                    {singleUser?.username}
                                </h1>
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
                        <div className="flex gap-2 mt-2">
                            <p className="text-default-600 mt-1">Perfil de Usuario</p>
                            <Chip variant="bordered" color={singleUser?.role == "dinamizador" || singleUser?.role == "superadmin" ? "warning" : "secondary"}>
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
                        {singleUser?._id === user?.userId && (
                            !isEditing ? (
                                <Button
                                    color="success"
                                    variant="flat"
                                    startContent={<FiEdit3 />}
                                    onPress={() => setIsEditing(true)}
                                >
                                    Editar mis datos
                                </Button>
                            ) : (
                                <div className="flex gap-2">
                                    <Button
                                        color="primary"
                                        variant="flat"
                                        startContent={<FiSave />}
                                        onPress={handleSave}
                                    >
                                        Guardar
                                    </Button>
                                    <Button
                                        color="warning"
                                        variant="flat"
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
                                    <FiUser className="text-green-600 h-6 w-6" />
                                    <h2 className="text-lg font-bold">
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
                                    {!isEditing ? (
                                        <Input
                                            label="Centro de Formación"
                                            radius="md"
                                            value={profileData.centroDeFormacion}
                                            isReadOnly
                                            variant="flat"
                                        />
                                    ) : (
                                        <Select
                                            label="Centro de Formación"
                                            labelPlacement="inside"
                                            placeholder="Selecciona un centro"
                                            radius="md"
                                            variant="bordered"
                                            selectedKeys={profileData.centroDeFormacion ? [profileData.centroDeFormacion] : []}
                                            onSelectionChange={(keys) => {
                                                const value = Array.from(keys)[0] as string;
                                                setProfileData({ ...profileData, centroDeFormacion: value || "" });
                                            }}
                                        >
                                            <SelectItem key="9307 - CENTRO DE COMERCIO Y SERVICIOS">
                                                9307 - CENTRO DE COMERCIO Y SERVICIOS
                                            </SelectItem>
                                            <SelectItem key="9221 - CENTRO DE TELEINFORMATICA Y PRODUCCIÓN INDUSTRIAL">
                                                9221 - CENTRO DE TELEINFORMATICA Y PRODUCCIÓN INDUSTRIAL
                                            </SelectItem>
                                            <SelectItem key="9113 - CENTRO AGROPECUARIO">
                                                9113 - CENTRO AGROPECUARIO
                                            </SelectItem>
                                        </Select>
                                    )}
                                    <Input
                                        label="Correo electrónico institucional"
                                        radius="md"
                                        value={profileData.SENAemail}
                                        isReadOnly={!isEditing}
                                        variant={isEditing ? "bordered" : "flat"}
                                        onChange={(e) =>
                                            setProfileData({ ...profileData, SENAemail: e.target.value })
                                        }
                                    />
                                    <Input
                                        label="Correo electrónico personal"
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
                        <Divider className="my-6" />
                        <div className="flex justify-between">
                            <span className="text-lg font-bold text-success">Proyectos en los que ha participado:</span>
                            {singleUser?._id === user?.userId && (
                            <Button
                                className="ml-2"
                                color="primary"
                                onClick={() => setIsOpen(true)}
                                variant="flat" >
                                <VscGithubProject />
                                Agregar proyectos
                            </Button>
                            )}
                        </div>
                        <ConvocatoriasTable mode="profileConsult" />
                    </div>
                </div>
                <ReusableModal isOpen={isOpen} onClose={() => {setIsOpen(false); searchProfileConvocatorias({users: profileData.id})}} modalTitle="Seleccionar proyectos" size="5xl" >
                    <Filtros
                        showDownload={false}
                        filtros={filtros}
                        onChange={(nuevoFiltro: Partial<ISearchConvocatoriasReq>) =>
                            setFiltros((prev) => ({ ...prev, ...nuevoFiltro }))
                        }
                        onReset={() => {
                            toast.success("Filtros reseteados"), setFiltros({});
                        }}
                    />
                    <ConvocatoriasTable mode="profile" />
                </ReusableModal>
            </div>
        </DefaultLayout>
    );
};
