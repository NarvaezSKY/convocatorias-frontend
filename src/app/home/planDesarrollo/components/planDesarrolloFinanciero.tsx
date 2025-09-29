import { Card, CardHeader, CardBody, Input } from "@heroui/react";

interface ProjectFinancialMatrixProps {
  valorTotalProyecto: number;
  actividades: string[];
  meses: string[];
  porcentajesProyectado: number[];
  porcentajesEjecutado: number[][];
}

export function ProjectFinancialMatrix({
  valorTotalProyecto,
  actividades,
  meses,
  porcentajesProyectado,
  porcentajesEjecutado,
}: ProjectFinancialMatrixProps) {
  const totalesPorMes = meses.map((_, mesIdx) =>
    actividades.reduce(
      (acc, _, actIdx) =>
        acc +
        (valorTotalProyecto * (porcentajesEjecutado[actIdx]?.[mesIdx] || 0)) /
        100,
      0
    )
  );

  const totalEjecutado = totalesPorMes.reduce((acc, curr) => acc + curr, 0);
  const totalPorEjecutar = valorTotalProyecto - totalEjecutado;

  return (
    <Card className="mt-8">
      <CardHeader className="flex items-center justify-between">
        <div className="font-bold">Matriz Financiera de objetivos</div>
        <div className="flex items-end flex-col justify-end gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Valor total del proyecto:</span>
            <Input
              className="w-48"
              isDisabled
              radius="sm"
              startContent="$"
              value={valorTotalProyecto.toLocaleString("es-CO", {
                minimumFractionDigits: 2,
              })}
              variant="bordered"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Total ejecutado hasta la fecha:</span>
            <Input
              className="w-40"
              isDisabled
              radius="sm"
              startContent="$"
              value={totalEjecutado.toLocaleString("es-CO", {
                minimumFractionDigits: 2,
              })}
              variant="bordered"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Valor por comprometer:</span>
            <Input
              className="w-40"
              isDisabled
              radius="sm"
              startContent="$"
              value={totalPorEjecutar.toLocaleString("es-CO", {
                minimumFractionDigits: 2,
              })}
              variant="bordered"
            />
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <div className="overflow-x-auto">
          <table className="min-w-max border-collapse w-full text-sm">
            <thead>
              <tr>
                <th className="border px-2 py-1 bg-gray-100">Objetivo</th>
                <th className="border px-2 py-1 bg-gray-100">
                  Valor objetivo
                </th>
                <th
                  className="border px-2 py-1 bg-gray-100"
                  colSpan={meses.length}
                >
                  Valor ejecutado por mes
                </th>
              </tr>
              <tr>
                <th className="border px-2 py-1" />
                <th className="border px-2 py-1" />
                {meses.map((mes) => (
                  <th key={mes} className="border px-2 py-1 bg-gray-50">
                    {mes}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {actividades.map((actividad, actIdx) => (
                <tr key={actividad}>
                  <td className="border px-2 py-1">{actividad}</td>
                  <td className="border px-2 py-1 bg-yellow-100 font-semibold">
                    $
                    {(
                      (valorTotalProyecto *
                        (porcentajesProyectado[actIdx] || 0)) /
                      100
                    ).toLocaleString("es-CO", {
                      minimumFractionDigits: 2,
                    })}
                  </td>
                  {meses.map((_, mesIdx) => (
                    <td
                      key={mesIdx}
                      className={`border px-2 py-1 ${porcentajesEjecutado[actIdx]?.[mesIdx] > 0
                          ? "bg-default-400 text-white"
                          : ""
                        }`}
                    >
                      $
                      {(
                        (valorTotalProyecto *
                          (porcentajesEjecutado[actIdx]?.[mesIdx] || 0)) /
                        100
                      ).toLocaleString("es-CO", {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="border px-2 py-1 font-bold bg-gray-50" />
                <td className="border px-2 py-1 font-bold bg-gray-50" />
                {totalesPorMes.map((total, idx) => (
                  <td
                    key={idx}
                    className="border px-2 py-1 font-bold bg-gray-50"
                  >
                    $
                    {total.toLocaleString("es-CO", {
                      minimumFractionDigits: 2,
                    })}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
}
