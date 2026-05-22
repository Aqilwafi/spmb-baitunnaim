type LinkType = {
  name: string;
  href?: string;
  isDropdown?: boolean;
  external?: boolean;
}; 
 
export const links: LinkType[] = [
    { name: "HOME", href: "/" },
    { name: "LPI", href: "/lpi" },
    { name: "lembaga", isDropdown: true },
    { name: "PUBLIKASI", href: "/publikasi" },
    { name: "HUBUNGI KAMI", href: "/contact" },
    { name: "SPMB", href: "https://spmbbaitunnaim.com/", external: true },
];

export const lembagaLinks: LinkType[] = [
    { name: "TPA", href: "/tpa" },
    { name: "KB", href: "/kb" },
    { name: "TK", href: "/tk" },
    { name: "MI", href: "/mi" },
];

export const sublinks = [
    "Berita",
    "Agenda",
    "Prestasi",
    "Profil Lulusan",
    "Kurikulum",
    "Kesiswaan",
    "Fasilitas",
    "SDM",
    "Tulisan Inspirasi",
    "School Tour",
];