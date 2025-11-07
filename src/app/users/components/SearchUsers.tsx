import { Button, Card, Input, Select, SelectItem } from "@heroui/react";
import { IFilterUsersReq } from "@/core/users/domain/filter-users";
import { CiEraser } from "react-icons/ci";

interface ISearchUsersProps {
  filters: IFilterUsersReq;
  onChange: (filtro: Partial<IFilterUsersReq>) => void;
  onReset: () => void;
}

export const SearchUsers = ({
  filters,
  onChange,
  onReset,
}: ISearchUsersProps) => {
  return (
    <div>
      <Card className="p-4">
        <h1 className="text-3xl font-bold mb-4 text-success">Buscar usuarios</h1>
        <div className="flex gap-2">
          <Input
            className="w-full"
            label="Buscar por nombre"
            placeholder="Buscar por nombre"
            size="sm"
            value={filters.username || ""}
            variant="bordered"
            onChange={(e) => onChange({ username: e.target.value })}
          />
          <Input
            className="w-full"
            label="Buscar por correo"
            placeholder="Buscar por correo"
            size="sm"
            value={filters.email || ""}
            variant="bordered"
            onChange={(e) => onChange({ email: e.target.value })}
          />
          <Input
            className="w-full"
            label="Buscar por teléfono"
            placeholder="Buscar por teléfono"
            size="sm"
            type="number"
            value={filters.telefono || ""}
            variant="bordered"
            onChange={(e) => onChange({ telefono: e.target.value })}
          />
          <Select
            className="w-full"
            label="Buscar por estado"
            placeholder="Buscar por estado"
            size="sm"
            value={filters.estado || ""}
            variant="bordered"
            onChange={(e) => onChange({ estado: e.target.value })}
          >
            <SelectItem key="activo">Activos</SelectItem>
            <SelectItem key="inactivo">Inactivos</SelectItem>
          </Select>
          <Select
            className="w-full"
            label="Buscar por rol"
            placeholder="Buscar por rol"
            size="sm"
            value={filters.role || ""}
            variant="bordered"
            onChange={(e) => onChange({ role: e.target.value })}
          >
            <SelectItem key="superadmin">Super Administrador</SelectItem>
            <SelectItem key="admin">Administrador</SelectItem>
            <SelectItem key="dinamizador">Dinamizador</SelectItem>
            <SelectItem key="Linvestigador">Lider Investigador</SelectItem>
            <SelectItem key="investigador">Investigador</SelectItem>
            <SelectItem key="aprendiz">Aprendiz</SelectItem>
          </Select>
          <Button
            isIconOnly
            color="danger"
            radius="sm"
            size="lg"
            variant="flat"
            onClick={onReset}
          >
            <CiEraser size={20} />
          </Button>
        </div>
      </Card>
    </div>
  );
};
