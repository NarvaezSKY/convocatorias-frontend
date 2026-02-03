import { IGetAllConvocatoriasRes } from "@/core/convocatorias/domain/get-all-convocatorias";
import { useConvocatorias } from "../hooks/UseConvocatorias";
import { Button } from "@heroui/button";
import { Card, CardBody, Divider } from "@heroui/react";
import { MdWarning } from "react-icons/md";

interface ConfirmDeleteProps {
    convocatoria: IGetAllConvocatoriasRes;
    onClose: () => void;
}

export const ConfirmDelete = ({ convocatoria, onClose }: ConfirmDeleteProps) => {
    const { handleDelete } = useConvocatorias()

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-danger-50">
                    <MdWarning className="w-7 h-7 text-danger-500" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-foreground">Confirmar eliminación</h2>
                    <p className="text-sm text-default-500">Esta acción no se puede deshacer</p>
                </div>
            </div>

            <Divider />

            <Card className="bg-default-50 shadow-none border border-default-200">
                <CardBody className="py-3">
                    <p className="text-sm text-default-700">
                        ¿Estás seguro de que deseas eliminar el proyecto <span className="font-semibold text-foreground">"{convocatoria.nombre}"</span>?
                    </p>
                    <p className="text-xs text-default-500 mt-2">
                        Consecutivo: {convocatoria.consecutivo}
                    </p>
                </CardBody>
            </Card>

            <div className="flex gap-3 justify-end pt-2">
                <Button
                    color="default"
                    variant="flat"
                    onPress={onClose}
                >
                    Cancelar
                </Button>
                <Button
                    color="danger"
                    variant="solid"
                    onPress={() => { handleDelete(convocatoria._id) as any; onClose(); }}
                >
                    Eliminar proyecto
                </Button>
            </div>
        </div>

    )
}