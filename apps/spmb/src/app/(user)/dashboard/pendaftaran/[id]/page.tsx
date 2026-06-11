import {BackButton, Maintenance } from "@bn/ui";

export default async function DetailPendaftaranPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;

  return (
    <div>
      <div className="p-2">
        <BackButton />
      </div>
      <Maintenance />
    </div>
  );
}