export interface IRegisterReq {
    username: string;
    email: string;
    telefono: string;
    role: string;
    password: string;

    // Optional fields
    correoInstitucional?: String,
    areaDeTrabajo?: String,
    clasificacionMinCiencias?: String,
    CvLAC?: String,
    SemilleroInvestigacion?: String,
}