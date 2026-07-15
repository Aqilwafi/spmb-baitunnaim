// packages/auth/src/features/register.ts

import { signOut } from '../services/logout';

export async function executeSharedLogout() {

  return signOut();
}