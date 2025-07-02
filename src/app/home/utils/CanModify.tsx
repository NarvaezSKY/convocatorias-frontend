import { ILoginRes } from "@/core/auth/domain/login";
import { IGetAllUsersRes } from '../../../core/users/domain/get-all-users/get-all-users.res';

export function canModify(
  currentUser: ILoginRes,
  targetUser: IGetAllUsersRes
): boolean {
  if (!currentUser) return false;

  // Usa el id correcto según el objeto actual
  const currentUserId = currentUser.userId || currentUser.userId;
  if (!currentUserId) return false;

  // Nadie puede modificarse a sí mismo
  if (currentUserId === targetUser._id) return false;

  const currentRole = currentUser.role;
  const targetRole = targetUser.role;

  if (currentRole === "superadmin") {
    return true;
  }

  if (currentRole === "dinamizador") {
    return targetRole !== "superadmin";
  }

  if (currentRole === "Linvestigador") {
    return ["investigador", "Linvestigador"].includes(targetRole);
  }

  return false;
}