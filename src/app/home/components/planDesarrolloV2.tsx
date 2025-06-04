import { useState, useMemo, useEffect } from "react";
import { RiDeleteBin2Line } from "react-icons/ri";
import { FaRegPlusSquare } from "react-icons/fa";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card, CardBody, CardHeader } from "@heroui/react";

import { UsePlanFinanciero } from "@/app/home/hooks/UsePlanFinanciero";
import { IGetAllConvocatoriasRes } from "@/core/convocatorias/domain/get-all-convocatorias";

interface GridData {
  [key: string]: {
    [key: string]: {
      proyectado: string;
      ejecutado: string;
    };
  };
}
interface Props {
  convocatoria: IGetAllConvocatoriasRes;
}

export default function ProjectPlanningGridV2({ convocatoria }: Props) {
  const [editingRowNames, setEditingRowNames] = useState<{
    [key: string]: string;
  }>({});
  const [editingColumnNames, setEditingColumnNames] = useState<{
    [key: string]: string;
  }>({});

  const {
    handleCreatePlanFinanciero,
    handleUpdatePlanFinanciero,
    planFinanciero,
    // loading,
    handleGetPlanFinanciero,
    formatPlanFinancieroForInitialValues,
  } = UsePlanFinanciero();

  const [rows, setRows] = useState<string[]>([
    "Actividad 1",
    "Actividad 2",
    "Actividad 3",
    "Actividad 4",
    "Actividad 5",
  ]);
  const [columns, setColumns] = useState<string[]>([
    "Mes1",
    "Mes2",
    "Mes3",
    "Mes4",
    "Mes5",
  ]);
  const [gridData, setGridData] = useState<GridData>({
    "Actividad 1": {},
    "Actividad 2": {},
    "Actividad 3": {},
    "Actividad 4": {},
    "Actividad 5": {},
  });

  const totalExecutionPercentage = useMemo(() => {
    let totalProyectado = 0;
    let totalEjecutado = 0;

    rows.forEach((row) => {
      columns.forEach((column) => {
        const proyectado = Number.parseFloat(
          gridData[row]?.[column]?.proyectado || "0"
        );
        const ejecutado = Number.parseFloat(
          gridData[row]?.[column]?.ejecutado || "0"
        );
        totalProyectado += proyectado;
        totalEjecutado += ejecutado;
      });
    });

    return totalProyectado > 0
      ? ((totalEjecutado / totalProyectado) * 100).toFixed(1)
      : "0.0";
  }, [gridData, rows, columns]);
  const [rowCounter, setRowCounter] = useState<number>(rows.length + 1);
  const [columnCounter, setColumnCounter] = useState<number>(
    columns.length + 1
  );

  const addRow = () => {
    const newRowName = `Actividad ${rowCounter}`;
    setRows([...rows, newRowName]);
    setGridData((prev) => ({
      ...prev,
      [newRowName]: {},
    }));
    setRowCounter((prev) => prev + 1);
  };

  const addColumn = () => {
    const newColumnName = `Mes${columnCounter}`;
    setColumns([...columns, newColumnName]);
    setColumnCounter((prev) => prev + 1);
  };

  const removeRow = (rowIndex: number) => {
    if (rows.length <= 1) return;
    const rowToRemove = rows[rowIndex];
    const newRows = rows.filter((_, index) => index !== rowIndex);
    const newGridData = { ...gridData };
    delete newGridData[rowToRemove];
    setRows(newRows);
    setGridData(newGridData);
  };

  const removeColumn = (columnIndex: number) => {
    if (columns.length <= 1) return;
    const columnToRemove = columns[columnIndex];
    const newColumns = columns.filter((_, index) => index !== columnIndex);
    const newGridData = { ...gridData };

    Object.keys(newGridData).forEach((row) => {
      delete newGridData[row][columnToRemove];
    });

    setColumns(newColumns);
    setGridData(newGridData);
  };

  const updateCell = (
    row: string,
    column: string,
    type: "proyectado" | "ejecutado",
    value: string
  ) => {
    if (
      type === "ejecutado" &&
      value !== "" &&
      isNaN(Number.parseFloat(value))
    ) {
      return;
    }

    setGridData((prev) => ({
      ...prev,
      [row]: {
        ...prev[row],
        [column]: {
          ...prev[row]?.[column],
          [type]: value,
        },
      },
    }));
  };

  const updateRowName = (oldName: string, newName: string) => {
    if (oldName === newName) return;

    const newGridData = { ...gridData };
    newGridData[newName] = { ...newGridData[oldName] };
    delete newGridData[oldName];

    setRows((prev) => prev.map((row) => (row === oldName ? newName : row)));
    setGridData(newGridData);
  };

  const updateColumnName = (oldName: string, newName: string) => {
    if (oldName === newName) return;

    const newGridData = { ...gridData };
    Object.keys(newGridData).forEach((row) => {
      if (newGridData[row][oldName]) {
        newGridData[row][newName] = { ...newGridData[row][oldName] };
        delete newGridData[row][oldName];
      }
    });

    setColumns((prev) => prev.map((col) => (col === oldName ? newName : col)));
    setGridData(newGridData);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (convocatoria) {
        const data = await handleGetPlanFinanciero(convocatoria._id);
        if (data) {
          const { rows, columns, gridData } =
            formatPlanFinancieroForInitialValues(data);

          setRows(rows);
          setColumns(columns);
          setGridData(gridData);
          setRowCounter(rows.length + 1);
          setColumnCounter(columns.length + 1);
        } else {
          // fallback si no hay data
          const defaultRows = ["Actividad 1", "Actividad 2", "Actividad 3"];
          const defaultColumns = ["Mes1", "Mes2", "Mes3"];
          const defaultGridData: {
            [actividad: string]: {
              [mes: string]: {
                proyectado: string;
                ejecutado: string;
              };
            };
          } = {};

          defaultRows.forEach((actividad) => {
            defaultGridData[actividad] = {};
            defaultColumns.forEach((mes) => {
              defaultGridData[actividad][mes] = {
                proyectado: "",
                ejecutado: "",
              };
            });
          });

          setRows(defaultRows);
          setColumns(defaultColumns);
          setGridData(defaultGridData);
          setRowCounter(defaultRows.length + 1);
          setColumnCounter(defaultColumns.length + 1);
        }
      }
    };

    fetchData();
  }, [convocatoria]);

  const saveAsJSON = () => {
    const jsonData = {
      metadata: {
        rows: rows.length,
        columns: columns.length,
        totalExecutionPercentage: Number.parseFloat(totalExecutionPercentage),
        createdAt: new Date().toISOString(),
      },
      structure: {
        rows,
        columns,
      },
      data: gridData,
    };

    // const dataStr = JSON.stringify(jsonData, null, 2);
    // const dataBlob = new Blob([dataStr], { type: "application/json" });
    // const url = URL.createObjectURL(dataBlob);
    // const link = document.createElement("a");
    // link.href = url;
    // link.download = "plan-desarrollo-proyecto.json";
    // link.click();
    // URL.revokeObjectURL(url);

    if (planFinanciero && planFinanciero._id) {
      handleUpdatePlanFinanciero(planFinanciero._id, {
        ...jsonData,
        convocatoria: convocatoria._id,
      });
    } else {
      handleCreatePlanFinanciero({
        ...jsonData,
        convocatoria: convocatoria._id,
      });
    }
  };

  const getCellValue = (
    row: string,
    column: string,
    type: "proyectado" | "ejecutado"
  ): string => {
    return gridData[row]?.[column]?.[type] || "";
  };

  // Porcentaje columna
  const getColumnPercentage = (column: string) => {
    let totalProyectado = 0;
    let totalEjecutado = 0;

    rows.forEach((row) => {
      const proyectado = Number.parseFloat(
        gridData[row]?.[column]?.proyectado || "0"
      );
      const ejecutado = Number.parseFloat(
        gridData[row]?.[column]?.ejecutado || "0"
      );
      totalProyectado += proyectado;
      totalEjecutado += ejecutado;
    });

    return {
      proyectado: totalProyectado,
      ejecutado: totalEjecutado,
      percentage:
        totalProyectado > 0
          ? ((totalEjecutado / totalProyectado) * 100).toFixed(1)
          : "0.0",
    };
  };

  return (
    <div className="p-6 max-w-full mx-auto">
      <Card>
        <CardHeader>
          <CardHeader className="flex items-center justify-between">
            <div>
              <div>Plan de Desarrollo de Proyecto</div>
              <div className="text-lg font-normal text-blue-600 mt-1">
                Porcentaje Total Ejecutado: {totalExecutionPercentage}%
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="flex items-center gap-2" onClick={saveAsJSON}>
                Guardar JSON
              </Button>
            </div>
          </CardHeader>
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
                          className="h-8 w-8 p-0 rounded-none border-l"
                          size="sm"
                          variant="ghost"
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
                              className="h-8 w-8 p-0 rounded-none border-l text-red-500 hover:text-red-700"
                              size="sm"
                              variant="ghost"
                              onClick={() => removeColumn(index)}
                            >
                              <RiDeleteBin2Line className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      </th>
                    ))}
                    <th className="border border-gray-300 p-0 bg-gray-100">
                      <Button
                        className="h-8 w-full rounded-none"
                        size="sm"
                        variant="ghost"
                        onClick={addColumn}
                      >
                        <FaRegPlusSquare className="w-4 h-4" />
                      </Button>
                    </th>
                  </tr>
                  <tr>
                    {columns.map((column) => (
                      <>
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
                      </>
                    ))}
                    <th className="border border-gray-300 bg-gray-100" />
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, rowIndex) => (
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
                              className="h-8 w-8 p-0 rounded-none border-l text-red-500 hover:text-red-700"
                              size="sm"
                              variant="ghost"
                              onClick={() => removeRow(rowIndex)}
                            >
                              <RiDeleteBin2Line className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      </td>
                      {columns.map((column) => (
                        <>
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
                              className="border-0 rounded-none h-10 text-center"
                              max="100"
                              min="0"
                              placeholder="0"
                              radius="none"
                              step="0.1"
                              type="number"
                              value={getCellValue(row, column, "ejecutado")}
                              variant="bordered"
                              onChange={(e) =>
                                updateCell(
                                  row,
                                  column,
                                  "ejecutado",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                        </>
                      ))}
                      <td className="border border-gray-300 bg-gray-50" />
                    </tr>
                  ))}
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
                            {stats.proyectado.toFixed(1)}%
                          </td>
                          <td
                            key={`total-${column}-ejecutado`}
                            className="border border-gray-300 p-2 text-center bg-green-100"
                          >
                            {stats.ejecutado.toFixed(1)}%
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
    </div>
  );
}
