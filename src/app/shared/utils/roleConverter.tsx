interface RoleConverter {
    (role: string): string
}

export const roleConverter: RoleConverter = (role) => {
    switch (role) {
        case "superadmin":
            return "Super Administrador";
        case "dinamizador":
            return "Dinamizador";
        case "investigador":
            return "Investigador";
        case "Linvestigador":
            return "Líder Investigador";
        case "admin":
            return "Supervisor";
        case  "aprendiz":
            return "Aprendiz";
        case "coordinador":
            return "Coordinador";
        default:
            return role;
    }
}