export interface IRegisterReq {
    username: string;
    email: string;
    telefono: string;
    role: string;
    password: string;
    SENAemail: string;

    // Optional fields
    areaDeTrabajo?: String,
    clasificacionMinCiencias?: String,
    CvLAC?: String,
    SemilleroInvestigacion?: String,
    centroDeFormacion?: String
}