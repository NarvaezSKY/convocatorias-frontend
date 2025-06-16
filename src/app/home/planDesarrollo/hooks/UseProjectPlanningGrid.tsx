import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { IGetAllConvocatoriasRes } from "@/core/convocatorias/domain/get-all-convocatorias";
import { UsePlanFinanciero } from "./UsePlanFinanciero";
import { useConvocatoriasStore } from "@/app/shared/convocatorias.store";

interface GridData {
    [key: string]: {
        [key: string]: {
            proyectado: string;
            ejecutado: string;
        };
    };
}

export const useProjectPlanningGrid = (convocatoria: IGetAllConvocatoriasRes) => {
    const [editingRowNames, setEditingRowNames] = useState<{ [key: string]: string }>({});
    const [editingColumnNames, setEditingColumnNames] = useState<{ [key: string]: string }>({});

    const {
        handleCreatePlanFinanciero,
        handleUpdatePlanFinanciero,
        planFinanciero,
        handleGetPlanFinanciero,
        formatPlanFinancieroForInitialValues,
        loading: planFinancieroLoading
    } = UsePlanFinanciero();

    const { loading } = useConvocatoriasStore()

    const loadingPlanFinanciero = useMemo(() => {
        return planFinancieroLoading || loading;
    }, [planFinancieroLoading, loading]);

    const [rows, setRows] = useState<string[]>([]);
    const [columns, setColumns] = useState<string[]>([]);
    const [gridData, setGridData] = useState<GridData>({});
    const [rowCounter, setRowCounter] = useState<number>(1);
    const [columnCounter, setColumnCounter] = useState<number>(1);

    const lastIdRef = useRef<string | undefined>(undefined);
    useEffect(() => {
        if (!convocatoria?._id) return;
        // Evitar llamadas repetidas si el ID no ha cambiado
        if (lastIdRef.current === convocatoria._id) return;
        lastIdRef.current = convocatoria._id;
        const controller = new AbortController();

        const fetchData = async () => {
            try {
                const data = await handleGetPlanFinanciero(convocatoria._id);
                if (data) {
                    const { rows, columns, gridData } = formatPlanFinancieroForInitialValues(data);
                    setRows(rows);
                    setColumns(columns);
                    setGridData(gridData);
                    setRowCounter(rows.length + 1);
                    setColumnCounter(columns.length + 1);
                } else {
                    setRows(["Actividad 1"]);
                    setColumns(["Mes 1"]);
                    setGridData({ "Actividad 1": { "Mes 1": { proyectado: "", ejecutado: "" } } });
                    setRowCounter(2);
                    setColumnCounter(2);
                }
            } catch (error: any) {
                if (error.name === "AbortError") {
                    console.log("Petición cancelada");
                } else {
                    console.error("Error al cargar plan financiero:", error);
                }
            }
        };

        fetchData();

        return () => {
            controller.abort();
        };
    }, [convocatoria?._id]);


    const totalsByColumn = useMemo(() => {
        return columns.map((column) => {
            let proyectado = 0;
            let ejecutado = 0;
            rows.forEach((row) => {
                proyectado += Number.parseFloat(gridData[row]?.[column]?.proyectado || "0");
                ejecutado += Number.parseFloat(gridData[row]?.[column]?.ejecutado || "0");
            });
            return { proyectado, ejecutado };
        });
    }, [gridData, rows, columns]);

    const totalProyectadoPercentage = totalsByColumn.reduce((acc, curr) => acc + curr.proyectado, 0).toFixed(0);
    const totalExecutionPercentage = totalsByColumn.reduce((acc, curr) => acc + curr.ejecutado, 0).toFixed(0);
    const porEjecutar = (Number(totalProyectadoPercentage) - Number(totalExecutionPercentage)).toFixed(0);

    const addRow = () => {
        const newRow = `Actividad ${rowCounter}`;
        setRows([...rows, newRow]);
        setGridData((prev) => ({ ...prev, [newRow]: {} }));
        setRowCounter((prev) => prev + 1);
    };

    const addColumn = () => {
        const newColumn = `Mes${columnCounter}`;
        setColumns([...columns, newColumn]);
        setColumnCounter((prev) => prev + 1);
    };

    const removeRow = (index: number) => {
        if (rows.length <= 1) return;
        const rowToRemove = rows[index];
        const newRows = rows.filter((_, i) => i !== index);
        const newGridData = { ...gridData };
        delete newGridData[rowToRemove];
        setRows(newRows);
        setGridData(newGridData);
    };

    const removeColumn = (index: number) => {
        if (columns.length <= 1) return;
        const columnToRemove = columns[index];
        const newColumns = columns.filter((_, i) => i !== index);
        const newGridData = { ...gridData };
        Object.keys(newGridData).forEach((row) => {
            delete newGridData[row][columnToRemove];
        });
        setColumns(newColumns);
        setGridData(newGridData);
    };

    const updateCell = (row: string, column: string, type: "proyectado" | "ejecutado", value: string) => {
        if (type === "ejecutado" && value !== "" && isNaN(Number.parseFloat(value))) return;
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
        const newGridData = { ...gridData, [newName]: { ...gridData[oldName] } };
        delete newGridData[oldName];
        setRows((prev) => prev.map((r) => (r === oldName ? newName : r)));
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
        setColumns((prev) => prev.map((c) => (c === oldName ? newName : c)));
        setGridData(newGridData);
    };

    const getCellValue = (row: string, column: string, type: "proyectado" | "ejecutado") =>
        gridData[row]?.[column]?.[type] || "";

    const getColumnPercentage = (column: string) => {
        let proyectado = 0;
        let ejecutado = 0;
        rows.forEach((row) => {
            proyectado += Number.parseFloat(gridData[row]?.[column]?.proyectado || "0");
            ejecutado += Number.parseFloat(gridData[row]?.[column]?.ejecutado || "0");
        });
        return {
            proyectado,
            ejecutado,
            percentage: proyectado > 0 ? ((ejecutado / proyectado) * 100).toFixed(0) : "0.0",
        };
    };

    const saveAsJSON = () => {
        const totalProyectado = Number(totalProyectadoPercentage);
        const totalEjecutado = Number(totalExecutionPercentage);
        if (totalProyectado !== 100) {
            toast.error("El porcentaje total proyectado debe ser exactamente 100%");
            return;
        }
        if (totalEjecutado > 100) {
            toast.error("El porcentaje total ejecutado no puede ser mayor al 100%");
            return;
        }
        const jsonData = {
            metadata: {
                rows: rows.length,
                columns: columns.length,
                totalExecutionPercentage: totalEjecutado,
                createdAt: new Date().toISOString(),
            },
            structure: { rows, columns },
            data: gridData,
        };
        if (planFinanciero && planFinanciero._id) {
            handleUpdatePlanFinanciero(planFinanciero._id, { ...jsonData, convocatoria: convocatoria._id });
        } else {
            handleCreatePlanFinanciero({ ...jsonData, convocatoria: convocatoria._id });
        }
    };

    return {
        rows,
        columns,
        gridData,
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
    };
};
