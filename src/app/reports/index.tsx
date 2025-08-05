import DefaultLayout from "@/layouts/default";
import { Link } from "@heroui/link";

export const ReporteProyectos = () => {
  return (
    <DefaultLayout>

      <iframe
        allowFullScreen
        frameBorder="0"
        loading="lazy"
        height={750}
        className="w-full border-2 border-success-100 rounded-lg shadow-md"
        src="https://app.powerbi.com/view?r=eyJrIjoiMDFjNjUzMTAtMjdhOS00YTQ2LTk0MmUtMzRmNDc2MTY2ZmI2IiwidCI6ImNiYzJjMzgxLTJmMmUtNGQ5My05MWQxLTUwNmM5MzE2YWNlNyIsImMiOjR9"
        title="Seguimiento Innovación y CompetitividadWEB"
      />
      <Link
        color="success"
        href="https://app.powerbi.com/view?r=eyJrIjoiMDFjNjUzMTAtMjdhOS00YTQ2LTk0MmUtMzRmNDc2MTY2ZmI2IiwidCI6ImNiYzJjMzgxLTJmMmUtNGQ5My05MWQxLTUwNmM5MzE2YWNlNyIsImMiOjR9"
      >
        <p className="underline text-center py-2">
          <strong>Ver en Power BI</strong>
        </p>
      </Link>

    </DefaultLayout>
  );
};
