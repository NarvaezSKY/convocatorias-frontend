import { RiDeleteBin2Line } from "react-icons/ri";
import { FaRegPlusSquare } from "react-icons/fa";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card, CardBody, CardHeader, Spinner } from "@heroui/react";

import { IGetAllConvocatoriasRes } from "@/core/convocatorias/domain/get-all-convocatorias";
import { useProjectPlanningGrid } from "../hooks/UseProjectPlanningGrid";
import React from "react";

interface Props {
  convocatoria: IGetAllConvocatoriasRes;
}

export default function ProjectPlanningGridV2({ convocatoria }: Props) {
  const {
    rows,
    columns,
    totalProyectadoPercentage,
    totalExecutionPercentage,
    porEjecutar,
    editingRowNames,
    editingColumnNames,
    setEditingRowNames,
    setEditingColumnNames,
    addRow,
    addColumn,
    removeRow,
    removeColumn,
    updateCell,
    updateRowName,
    updateColumnName,
    getCellValue,
    getColumnPercentage,
    saveAsJSON,
    loadingPlanFinanciero

  } = useProjectPlanningGrid(convocatoria);
  return (

    <div className="p-6 max-w-full mx-auto">
      {loadingPlanFinanciero ? (
        <div className="flex items-center justify-center h-screen">
          <Spinner />
        </div>
      ) : (
        <Card>
          <CardHeader className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">
                Plan de Desarrollo de Proyecto
              </div>

              <div className="text-lg font-normal mt-1">
                <p
                  className={
                    Number(totalExecutionPercentage) < 100
                      ? "text-warning"
                      : Number(totalExecutionPercentage) === 100
                        ? "text-success"
                        : "text-danger"
                  }
                >
                  Total Ejecutado: {totalExecutionPercentage}%
                </p>
              </div>

              <div className="text-lg font-normal mt-1">
                <p
                  className={
                    Number(totalProyectadoPercentage) < 100
                      ? "text-warning"
                      : Number(totalProyectadoPercentage) === 100
                        ? "text-success"
                        : "text-danger"
                  }
                >
                  Total Proyectado: {totalProyectadoPercentage}%
                </p>
              </div>

              <div className="text-lg font-normal mt-1">
                <p
                  className={
                    Number(porEjecutar) > 0
                      ? "text-warning"
                      : Number(porEjecutar) === 0
                        ? "text-success"
                        : "text-danger"
                  }
                >
                  Por ejecutar: {porEjecutar}%
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                className="flex items-center gap-2"
                color="success"
                variant="bordered"
                onClick={saveAsJSON}
              >
                Guardar
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <div className="overflow-auto">
              <div className="inline-block min-w-full">
                <table className="border-collapse border border-gray-300">
                  <thead>
                    <tr>
                      <th
                        className="border border-gray-300 p-0 bg-gray-100 min-w-48"
                        rowSpan={2}
                      >
                        <div className="flex">
                          <div className="flex-1 p-3 font-semibold">
                            Actividades/tiempo
                          </div>
                          <Button
                            className="h-10 w-8 p-0 rounded-none border-l"
                            size="sm"
                            variant="ghost"
                            color="success"
                            onClick={addRow}
                          >
                            <FaRegPlusSquare className="w-4 h-4" />
                          </Button>
                        </div>
                      </th>
                      {columns.map((column, index) => (
                        <th
                          key={column}
                          className="border border-gray-300 p-0 bg-gray-100 min-w-32"
                          colSpan={2}
                        >
                          <div className="flex">
                            <Input
                              className="border-0 rounded-none bg-transparent font-semibold text-center"
                              radius="none"
                              value={editingColumnNames[column] ?? column}
                              variant="bordered"
                              onBlur={() => {
                                const newName = editingColumnNames[column];
                                if (newName && newName !== column) {
                                  updateColumnName(column, newName);
                                }
                                setEditingColumnNames((prev) => {
                                  const copy = { ...prev };
                                  delete copy[column];
                                  return copy;
                                });
                              }}
                              onChange={(e) =>
                                setEditingColumnNames((prev) => ({
                                  ...prev,
                                  [column]: e.target.value,
                                }))
                              }
                            />
                            {columns.length > 1 && (
                              <Button
                                className="h-10 w-8 p-0 rounded-none border-l text-danger hover:text-white"
                                color="danger"
                                size="sm"
                                variant="ghost"

                                onClick={() => removeColumn(index)}
                              >
                                <RiDeleteBin2Line
                                  className="w-5 h-5"
                                />
                              </Button>
                            )}
                          </div>
                        </th>
                      ))}
                      <th className="border border-gray-300 p-0 bg-gray-100">
                        <Button
                          className="h-10 w-full rounded-none"
                          size="sm"
                          variant="ghost"
                          onClick={addColumn}
                          color="success"
                        >
                          <FaRegPlusSquare className="w-4 h-4" />
                        </Button>
                      </th>
                    </tr>
                    <tr>
                      {columns.map((column) => (
                        <React.Fragment key={column}>
                          <th
                            key={`${column}-proyectado`}
                            className="border border-gray-300 bg-blue-50 p-2 text-sm font-medium min-w-24"
                          >
                            Proyectado
                          </th>
                          <th
                            key={`${column}-ejecutado`}
                            className="border border-gray-300 bg-green-50 p-2 text-sm font-medium min-w-24"
                          >
                            Ejecutado
                          </th>
                        </React.Fragment>
                      ))}

                      <th className="border border-gray-300 bg-blue-100 p-2 text-sm font-semibold min-w-24">
                        Total Proyectado
                      </th>
                      <th className="border border-gray-300 bg-green-100 p-2 text-sm font-semibold min-w-24">
                        Total Ejecutado
                      </th>
                      <th className="border border-gray-300 bg-gray-100" />
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, rowIndex) => {

                      let totalProyectado = 0;
                      let totalEjecutado = 0;
                      columns.forEach((column) => {
                        totalProyectado += Number(getCellValue(row, column, "proyectado")) || 0;
                        totalEjecutado += Number(getCellValue(row, column, "ejecutado")) || 0;
                      });

                      return (
                        <tr key={row}>
                          <td className="border border-gray-300 p-0 bg-gray-50 min-w-48">
                            <div className="flex">
                              <Input
                                className="border-0 rounded-none bg-transparent font-medium"
                                radius="none"
                                value={editingRowNames[row] ?? row}
                                variant="bordered"
                                onBlur={() => {
                                  const newName = editingRowNames[row];
                                  if (newName && newName !== row) {
                                    updateRowName(row, newName);
                                  }
                                  setEditingRowNames((prev) => {
                                    const copy = { ...prev };
                                    delete copy[row];
                                    return copy;
                                  });
                                }}
                                onChange={(e) =>
                                  setEditingRowNames((prev) => ({
                                    ...prev,
                                    [row]: e.target.value,
                                  }))
                                }
                              />
                              {rows.length > 1 && (
                                <Button
                                  className="h-10 w-8 p-0 rounded-none border-l text-danger hover:text-white"
                                  color="danger"
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => removeRow(rowIndex)}
                                >
                                  <RiDeleteBin2Line className="w-5 h-5" />
                                </Button>
                              )}
                            </div>
                          </td>
                          {columns.map((column) => (
                            <React.Fragment key={column}>
                              <td
                                key={`${row}-${column}-proyectado`}
                                className="border border-gray-300 p-0 bg-blue-25"
                              >
                                <Input
                                  className="border-0 rounded-none h-10 text-center"
                                  placeholder="0"
                                  radius="none"
                                  value={getCellValue(row, column, "proyectado")}
                                  variant="bordered"
                                  onChange={(e) =>
                                    updateCell(
                                      row,
                                      column,
                                      "proyectado",
                                      e.target.value
                                    )
                                  }
                                />
                              </td>
                              <td
                                key={`${row}-${column}-ejecutado`}
                                className="border border-gray-300 p-0 bg-green-25"
                              >
                                <Input
                                  className="border-0 rounded-none h-10 text-center cursor-not-allowed"
                                  max={totalProyectado}
                                  min="0"
                                  placeholder="0"
                                  radius="none"
                                  step="0.1"
                                  type="number"
                                  value={getCellValue(row, column, "ejecutado")}
                                  variant="bordered"
                                  disabled={
                                    totalEjecutado >= totalProyectado &&
                                    (!getCellValue(row, column, "ejecutado") || Number(getCellValue(row, column, "ejecutado")) === 0)
                                  }
                                  onChange={(e) => {
                                    let value = Number(e.target.value);
                                    if (value > totalProyectado) value = totalProyectado;
                                    if (value < 0) value = 0;
                                    updateCell(
                                      row,
                                      column,
                                      "ejecutado",
                                      value.toString()
                                    );
                                  }}
                                />
                              </td>
                            </React.Fragment>
                          ))}
                          <td className="border border-gray-300 bg-blue-100 text-center font-semibold">
                            {totalProyectado}%
                          </td>
                          <td className="border border-gray-300 bg-green-100 text-center font-semibold">
                            {totalEjecutado}%
                          </td>
                          <td className="border border-gray-300 bg-gray-50" />
                        </tr>
                      );
                    })}
                    <tr className="bg-gray-100 font-semibold">
                      <td className="border border-gray-300 p-2 text-center">
                        Totales por Mes
                      </td>
                      {columns.map((column) => {
                        const stats = getColumnPercentage(column);
                        return (
                          <>
                            <td
                              key={`total-${column}-proyectado`}
                              className="border border-gray-300 p-2 text-center bg-blue-100"
                            >
                              {stats.proyectado.toFixed(0)}%
                            </td>
                            <td
                              key={`total-${column}-ejecutado`}
                              className="border border-gray-300 p-2 text-center bg-green-100"
                            >
                              {stats.ejecutado.toFixed(0)}%
                            </td>
                          </>
                        );
                      })}
                      <td className="border border-gray-300 bg-gray-100" />
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}