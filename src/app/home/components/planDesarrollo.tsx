import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { useEffect, useState } from "react";

import { UsePlanFinanciero } from "../hooks/UsePlanFinanciero";
import { IGetAllConvocatoriasRes } from "@/core/convocatorias/domain/get-all-convocatorias";
import { RiDeleteBin2Line } from "react-icons/ri";
import { FaRegPlusSquare } from "react-icons/fa";

interface GridData {
  [key: string]: {
    [key: string]: string;
  };
}

interface ProjectPlanningGridProps {
  convocatoria: IGetAllConvocatoriasRes;
}

export default function ProjectPlanningGrid({
  convocatoria,
}: ProjectPlanningGridProps) {
  const {
    handleCreatePlanFinanciero,
    handleGetPlanFinanciero,
    formatPlanFinancieroForInitialValues,
    handleUpdatePlanFinanciero,
    planFinanciero,
  } = UsePlanFinanciero();

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
          setRows(["Actividad 1", "Actividad 2", "Actividad 3"]);
          setColumns(["Meses", "Mes 1", "Mes 2", "Mes 3"]);
          setGridData({
            "Actividad 1": {
              Meses: "Actividad 1",
              "Mes 1": "",
              "Mes 2": "",
              "Mes 3": "",
            },
            "Actividad 2": {
              Meses: "Actividad 2",
              "Mes 1": "",
              "Mes 2": "",
              "Mes 3": "",
            },
            "Actividad 3": {
              Meses: "Actividad 3",
              "Mes 1": "",
              "Mes 2": "",
              "Mes 3": "",
            },
          });
          setRowCounter(4);
          setColumnCounter(4);
        }
      }
    };

    fetchData();
  }, [convocatoria]);

  const [rows, setRows] = useState<string[]>([
    "Actividad 1",
    "Actividad 2",
    "Actividad 3",
  ]);
  const [columns, setColumns] = useState<string[]>([
    "Meses",
    "Mes 1",
    "Mes 2",
    "Mes 3",
  ]);
  const [gridData, setGridData] = useState<GridData>({
    "Actividad 1": {
      Meses: "Actividad 1",
      "Mes 1": "",
      "Mes 2": "",
      "Mes 3": "",
    },
    "Actividad 2": {
      Meses: "Actividad 2",
      "Mes 1": "",
      "Mes 2": "",
      "Mes 3": "",
    },
    "Actividad 3": {
      Meses: "Actividad 3",
      "Mes 1": "",
      "Mes 2": "",
      "Mes 3": "",
    },
  });

  const [rowCounter, setRowCounter] = useState(4);
  const [columnCounter, setColumnCounter] = useState(4);

  const addRow = () => {
    const newRowName = `Actividad ${rowCounter}`;
    setRows([...rows, newRowName]);
    setGridData((prev) => ({
      ...prev,
      [newRowName]: { [columns[0]]: newRowName },
    }));
    setRowCounter((prev) => prev + 1);
  };

  const addColumn = () => {
    const newColumnName = `Mes ${columnCounter}`;
    setColumns([...columns, newColumnName]);
    setGridData((prev) => ({
      ...prev,
      [rows[0]]: { ...prev[rows[0]], [newColumnName]: "" },
    }));
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

  const updateCell = (row: string, column: string, value: string) => {
    setGridData((prev) => ({
      ...prev,
      [row]: {
        ...prev[row],
        [column]: value,
      },
    }));
  };

  const updateRowName = (oldName: string, newName: string) => {
    if (oldName === newName) return;

    const newGridData = { ...gridData };
    newGridData[newName] = { ...newGridData[oldName] };
    newGridData[newName][columns[0]] = newName;
    delete newGridData[oldName];

    setRows((prev) => prev.map((row) => (row === oldName ? newName : row)));
    setGridData(newGridData);
  };

  const updateColumnName = (oldName: string, newName: string) => {
    if (oldName === newName) return;

    const newGridData = { ...gridData };
    Object.keys(newGridData).forEach((row) => {
      if (newGridData[row][oldName] !== undefined) {
        newGridData[row][newName] = newGridData[row][oldName];
        delete newGridData[row][oldName];
      }
    });

    setColumns((prev) => prev.map((col) => (col === oldName ? newName : col)));
    setGridData(newGridData);
  };

  const saveAsJSON = () => {
    const jsonData = {
      metadata: {
        rows: rows.length,
        columns: columns.length,
        createdAt: new Date().toISOString(),
      },
      structure: {
        rows,
        columns,
      },
      data: gridData,
    };

    console.log("Datos a guardar:", jsonData);

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

  const getCellValue = (row: string, column: string): string => {
    return gridData[row]?.[column] || "";
  };

  const [editedRows, setEditedRows] = useState<{ [key: string]: string }>({});
  const [editedColumns, setEditedColumns] = useState<{ [key: string]: string }>(
    {}
  );

  return (
    <div className="p-6 max-w-10xl mx-auto">
      <Card className="bg-default-50" radius="sm">
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <div className="text-2xl font-bold">Plan de Desarrollo de Proyecto</div>
            <div className="flex gap-2 ml-2">
              <Button
                className="flex items-center gap-2"
                color="primary"
                radius="sm"
                size="lg"
                variant="bordered"
                onClick={saveAsJSON}
              >
                Guardar
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="overflow-auto">
            <div className="inline-block min-w-full">
              <table className="border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-0 bg-gray-100">
                      <div className="flex">
                        <div className="flex-1 p-2 font-semibold">
                          Actividades / Tiempo
                        </div>
                        <Button
                          isIconOnly
                          className="h-8 w-8 p-0 rounded-none border-l"
                          color="success"
                          size="lg"
                          variant="bordered"
                          onClick={addRow}
                        >
                          <FaRegPlusSquare color="green" />
                        </Button>
                      </div>
                    </th>
                    {columns.slice(1).map((column, index) => (
                      <th
                        key={column}
                        className="border border-gray-300 p-0 bg-gray-100 min-w-32"
                      >
                        <div className="flex flex-col">
                          <div className="flex">
                            <Input
                              className="border-0 rounded-none bg-transparent font-semibold text-center"
                              radius="none"
                              value={editedColumns[column] ?? column}
                              variant="bordered"
                              onBlur={() => {
                                const newName = editedColumns[column];
                                if (newName && newName !== column) {
                                  updateColumnName(column, newName);
                                }
                                setEditedColumns((prev) => {
                                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                  const { [column]: _, ...rest } = prev;
                                  return rest;
                                });
                              }}
                              onChange={(e) =>
                                setEditedColumns((prev) => ({
                                  ...prev,
                                  [column]: e.target.value,
                                }))
                              }
                            />
                            {columns.length > 2 && (
                              <Button
                                isIconOnly
                                className="h-8 w-8 p-0 rounded-none border-l text-red-500 hover:text-red-700"
                                color="danger"
                                size="lg"
                                variant="ghost"
                                onClick={() => removeColumn(index + 1)}
                              >
                                <RiDeleteBin2Line color="red" />
                              </Button>
                            )}
                          </div>
                          {index === columns.length - 2 && (
                            <Button
                              className="h-6 w-full rounded-none border-t"
                              color="success"
                              size="lg"
                              variant="bordered"
                              onClick={addColumn}
                            >
                              <FaRegPlusSquare color="green" />
                            </Button>
                          )}
                        </div>
                      </th>
                    ))}
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
                            value={editedRows[row] ?? row}
                            variant="bordered"
                            onBlur={() => {
                              const newName = editedRows[row];
                              if (newName && newName !== row) {
                                updateRowName(row, newName);
                              }
                              setEditedRows((prev) => {
                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                const { [row]: _, ...rest } = prev;
                                return rest;
                              });
                            }}
                            onChange={(e) =>
                              setEditedRows((prev) => ({
                                ...prev,
                                [row]: e.target.value,
                              }))
                            }
                          />

                          {rows.length > 1 && (
                            <Button
                              isIconOnly
                              className="h-8 w-8 p-0 rounded-none border-l text-red-500 hover:text-red-700"
                              color="danger"
                              size="lg"
                              variant="ghost"
                              onClick={() => removeRow(rowIndex)}
                            >
                              <RiDeleteBin2Line color="red" />
                            </Button>
                          )}
                        </div>
                      </td>
                      {columns.slice(1).map((column) => (
                        <td
                          key={`${row}-${column}`}
                          className="border border-gray-300 p-0"
                        >
                          <Input
                            className="border-0 rounded-none h-10"
                            placeholder="Ingrese información..."
                            radius="none"
                            value={getCellValue(row, column)}
                            variant="bordered"
                            onChange={(e) =>
                              updateCell(row, column, e.target.value)
                            }
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
