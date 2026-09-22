// apps/admin/src/features/users/list.ts

import { getCurrentClaims } from "@bn/auth";
import { getUsersByRoleIds } from "@/services/users/list";
import { getMasterRolesOptions } from "./roles/role";

export async function getListUsers(roleIds: number[]) {
    const claims = await getCurrentClaims();
    if (!claims) {
        throw new Error("Unauthorized");
    }

    // Ambil data user dan master roles secara paralel
    const [users, roleOptions] = await Promise.all([
        getUsersByRoleIds(roleIds),
        getMasterRolesOptions(roleIds),
    ]);

    // Ganti role.id menjadi role.value karena data aslinya menggunakan 'value'
    const roleMap = roleOptions.reduce((acc, role) => {
        if (role.value !== undefined && role.value !== null) {
            acc[role.value] = role.label;
        }
        return acc;
    }, {} as Record<number, string>);

    // Mapping data user untuk menyisipkan label role
    const mappedUsers = users.map((user) => ({
        ...user,
        roleName: roleMap[user.roleId] || `Role (${user.roleId})`,
    }));

    return mappedUsers;
}