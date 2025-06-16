import DefaultLayout from "@/layouts/default";
import { Link } from "@heroui/link";

export const ReporteProyectos = () => {
  return (
    <DefaultLayout>
      <div className="flex w-full items-center justify-center flex-col gap-2">
        <iframe
          allowFullScreen={true}
          frameBorder="0"
          height="700"
          src="https://app.powerbi.com/view?r=eyJrIjoiMDFjNjUzMTAtMjdhOS00YTQ2LTk0MmUtMzRmNDc2MTY2ZmI2IiwidCI6ImNiYzJjMzgxLTJmMmUtNGQ5My05MWQxLTUwNmM5MzE2YWNlNyIsImMiOjR9"
          title="Seguimiento Innovación y CompetitividadWEB"
          width="100%"
         />
        <Link href="https://app.powerbi.com/view?r=eyJrIjoiMDFjNjUzMTAtMjdhOS00YTQ2LTk0MmUtMzRmNDc2MTY2ZmI2IiwidCI6ImNiYzJjMzgxLTJmMmUtNGQ5My05MWQxLTUwNmM5MzE2YWNlNyIsImMiOjR9">
          <p className="underline">
            <strong>Ver en Power BI</strong>
          </p>
        </Link>
      </div>
    </DefaultLayout>
  );
};
