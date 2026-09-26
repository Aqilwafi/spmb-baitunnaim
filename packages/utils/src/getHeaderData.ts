'use server';
import { headers } from "next/headers";

export async function getHeaderData() {
  const headersList = await headers();
  
  return {
    ip: headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? headersList.get("x-real-ip") ?? null,
    userAgent: headersList.get("user-agent"), 
    forwardedFor: headersList.get("x-forwarded-for"),
    realIp: headersList.get("x-real-ip"),
  };
}