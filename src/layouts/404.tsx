import DefaultLayout from "./default";

export const NotFound = () => {
    return (
        <DefaultLayout >
            <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-4xl font-bold">404</h1>
                <h1 className="text-2xl font-bold">Esta página no existe  </h1>
                <p className="mt-4 text-lg">Lo sentimos, la página que estabas buscando no existe. ¿Que estás buscando?</p>

                <div className="mt-8">
                    <a href="/" className="text-primary hover:underline">Volver a la página de inicio</a>
                </div>
            </div>
        </DefaultLayout>
    );
}