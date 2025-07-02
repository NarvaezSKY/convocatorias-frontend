import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Skeleton,
  Button,
  Select,
  SelectItem,
  Chip,
} from "@heroui/react";
import { useUserList } from "../hooks/UseUserList";
import ReusableModal from "@/app/shared/components/Modal";
import React from "react";
import { IGetAllUsersRes } from "@/core/users/domain/get-all-users";

const roles = [
  { key: "investigador", label: "Investigador" },
  { key: "admin", label: "Supervisor" },
  { key: "dinamizador", label: "Dinamizador" },
  { key: "Linvestigador", label: "Lider Investigador" },
];
import { useAuthStore } from "@/app/shared/auth.store";
import { canModify } from "../utils/CanModify";

export const UserList = () => {
  const { user: currentUser } = useAuthStore();
  const { users, loading, handleEditRole, handleEditStatus } = useUserList();
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] =
    React.useState<IGetAllUsersRes | null>(null);
  const [selectedRole, setSelectedRole] = React.useState<string | null>(null);

  const [isStatusModalOpen, setIsStatusModalOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState<string | null>(
    null
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Lista de Usuarios</h2>
      <Table isStriped aria-label="Tabla de usuarios">
        <TableHeader>
          <TableColumn>NOMBRE</TableColumn>
          <TableColumn>CORREO</TableColumn>
          <TableColumn>ROL</TableColumn>
          <TableColumn>ESTADO</TableColumn>
          <TableColumn>ACCIONES</TableColumn>
        </TableHeader>
        <TableBody>
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <TableRow key={`skeleton-${index}`}>
                  <TableCell>
                    <Skeleton className="w-24 h-4 rounded-md bg-default-300" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-32 h-4 rounded-md bg-default-300" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-20 h-4 rounded-md bg-default-300" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-20 h-4 rounded-md bg-default-300" />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Skeleton className="w-16 h-6 rounded-md bg-default-300" />
                      <Skeleton className="w-20 h-6 rounded-md bg-default-300" />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            : users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.role === "superadmin"
                      ? "Super Administrador"
                      : user.role === "admin"
                        ? "Supervisor"
                        : user.role === "dinamizador"
                          ? "Dinamizador"
                          : user.role === "Linvestigador"
                            ? "Lider Investigador"
                            : user.role === "investigador"
                              ? "Investigador"
                              : "Investigador"}
                  </TableCell>
                  <TableCell>
                    <Chip
                      color={user.estado === "activo" ? "success" : "danger"}
                      variant="bordered"
                    >
                      {user.estado}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        color="warning"
                        isDisabled={!currentUser || !canModify(currentUser, user)}
                        size="sm"
                        variant="flat"
                        onClick={() => {
                          setIsOpen(true);
                          setSelectedUser(user);
                        }}
                      >
                        Cambiar rol
                      </Button>
                      <Button
                        color="secondary"
                        isDisabled={!currentUser || !canModify(currentUser, user)}
                        size="sm"
                        variant="flat"
                        onClick={() => {
                          setIsStatusModalOpen(true);
                          setSelectedUser(user);
                          setSelectedStatus(user.estado);
                        }}
                      >
                        Cambiar estado
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>

      <ReusableModal
        isOpen={isOpen}
        modalTitle="Cambiar rol"
        onClose={() => {
          setIsOpen(false);
          setSelectedUser(null);
        }}
      >
        <div className="flex flex-col gap-4 w-full">
          <label className="text-sm text-neutral-700" htmlFor="rol">
            Usuario seleccionado:
            <div className="font-semibold">{selectedUser?.username}</div>
          </label>
          <label className="text-sm text-neutral-700" htmlFor="rol">
            Rol actual:
            <div className="font-semibold">{selectedUser?.role}</div>
          </label>
          <Select
            className="w-full"
            label="Selecciona un rol"
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            {roles.map((role) => (
              <SelectItem
                key={role.key}
                isDisabled={role.key === selectedUser?.role}
                onSelect={() => {
                  setSelectedUser(
                    selectedUser ? { ...selectedUser, role: role.key } : null
                  );
                }}
              >
                {role.label}
              </SelectItem>
            ))}
          </Select>

          <div className="flex gap-2 w-full justify-end">
            <Button
              color="success"
              size="md"
              variant="flat"
              onClick={() => {
                if (selectedUser) {
                  handleEditRole(selectedUser._id, selectedRole || "");
                }
                setIsOpen(false);
                setSelectedUser(null);
              }}
            >
              Guardar
            </Button>
            <Button
              color="danger"
              size="md"
              variant="flat"
              onClick={() => {
                setIsOpen(false);
                setSelectedUser(null);
              }}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </ReusableModal>
      <ReusableModal
        isOpen={isStatusModalOpen}
        modalTitle="Cambiar estado"
        onClose={() => {
          setIsStatusModalOpen(false);
          setSelectedUser(null);
        }}
      >
        <div className="flex flex-col gap-4 w-full">
          <label className="text-sm text-neutral-700">
            Usuario seleccionado:
            <div className="font-semibold">{selectedUser?.username}</div>
          </label>
          <label className="text-sm text-neutral-700">
            Estado actual:
            <div className="font-semibold">{selectedUser?.estado}</div>
          </label>
          <Select
            className="w-full"
            label="Selecciona un estado"
            value={selectedStatus || ""}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <SelectItem
              key="activo"
              isDisabled={selectedUser?.estado === "activo"}
            >
              Activo
            </SelectItem>
            <SelectItem
              key="inactivo"
              isDisabled={selectedUser?.estado === "inactivo"}
            >
              Inactivo
            </SelectItem>
          </Select>
          <div className="flex gap-2 w-full justify-end">
            <Button
              color="success"
              size="md"
              variant="flat"
              onClick={() => {
                if (selectedUser) {
                  handleEditStatus(selectedUser._id, selectedStatus || "");
                }
                setIsStatusModalOpen(false);
                setSelectedUser(null);
              }}
            >
              Guardar
            </Button>
            <Button
              color="danger"
              size="md"
              variant="flat"
              onClick={() => {
                setIsStatusModalOpen(false);
                setSelectedUser(null);
              }}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </ReusableModal>
    </div>
  );
};
