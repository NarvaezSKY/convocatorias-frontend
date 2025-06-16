import DefaultLayout from "@/layouts/default";
import { Link } from "@heroui/link";

export const ReporteProyectos = () => {
  return (
    <DefaultLayout>
      <div className="flex w-full items-center justify-center flex-col gap-2">
        <iframe
          allowFullScreen={true}
          className=""
          frameBorder="0"
          height="700"
          src="https://app.powerbi.com/reportEmbed?reportId=41cc3973-1378-4915-bb6f-9eb6988405df&autoAuth=true&ctid=cbc2c381-2f2e-4d93-91d1-506c9316ace7"
          title="Seguimiento Innovación y CompetitividadWEB"
          width="100%"
        />
        <Link href="https://app.powerbi.com/reportEmbed?reportId=41cc3973-1378-4915-bb6f-9eb6988405df&autoAuth=true&ctid=cbc2c381-2f2e-4d93-91d1-506c9316ace7">
          <p className="underline">
            <strong>Ver en Power BI</strong>
          </p>
        </Link>
      </div>
    </DefaultLayout>
  );
};
