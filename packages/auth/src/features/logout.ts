// packages/auth/src/features/logout.ts

import { signOut } from '../services/logout';
import { authLogger } from '../services/logger/authLogs';

export async function executeSharedLogout(userId?: string) {

  const result = await signOut();

  if (result.error) {
    await authLogger ({
      userId: userId,
      event: 'User Logout',
      status: 'failed',
      metadata: result.error
    });
  }
  await authLogger ({
      userId: userId,
      event: 'User Logout',
      status: 'success',
      metadata: {}
    });
}