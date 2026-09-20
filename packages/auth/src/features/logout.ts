// packages/auth/src/features/logout.ts

import { signOut } from '../services/logout';
import { getCurrentClaims } from './session';
import { activityLogger } from '@bn/services';
import type { AuthActivityLogs } from '@bn/types';

interface LogoutParams {
  eventType?: string;
  logData?: AuthActivityLogs; // Opsional: jika ingin membawa metadata tambahan seperti IP/UserAgent
}

export async function executeSharedLogout({ eventType = 'user_logout', logData }: LogoutParams) {
  
  const claims = await getCurrentClaims();
  const userId = claims?.sub ?? null;
  const userEmail = claims?.email ?? undefined;

  // 2. Jalankan proses logout
  const result = await signOut();

  // 3. Catat log jika gagal
  if (result.error) {
    await activityLogger<AuthActivityLogs>({
      userId: userId,
      event: eventType,
      status: 'failed',
      metadata: {
        credential: userEmail,
        error: result.error,
        ...logData
      }
    });
    return result;
  }

  // 4. Catat log jika sukses
  await activityLogger<AuthActivityLogs>({
    userId: userId, // ID didapat otomatis dari server
    event: eventType,
    status: 'success',
    metadata: {
      credential: userEmail,
      ...logData
    }
  });

  return result;
}