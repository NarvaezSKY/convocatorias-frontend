import { IGetAllConvocatoriasRes } from "@/core/convocatorias/domain/get-all-convocatorias";
import { useConvocatorias } from "../hooks/UseConvocatorias";
import { Button } from "@heroui/button";

interface ConfirmDeleteProps {
    convocatoria: IGetAllConvocatoriasRes;
    onClose: () => void;
}

export const ConfirmDelete = ({ convocatoria, onClose }: ConfirmDeleteProps) => {
    const { handleDelete } = useConvocatorias()

    return (
        <div>
            <h2 className="text-lg font-bold">Confirmar eliminación</h2>
            <p>¿Estás seguro de que deseas eliminar esta convocatoria?</p>

            <div className="flex justify-end">
                <Button
                    className="mt-2"
                    variant="bordered"
                    color="danger"
                    onClick={() => { handleDelete(convocatoria._id) as any; onClose(); }}
                >
                    Eliminar
                </Button>

                <Button
                    className="mt-2 ml-2"
                    variant="bordered"
                    color="default"
                    onClick={onClose}
                >
                    Cancelar
                </Button>
            </div>
        </div>

    )
}