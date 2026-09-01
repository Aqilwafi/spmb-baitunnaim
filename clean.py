import os
import shutil

# Daftar nama folder yang ingin dihapus
TARGET_FOLDERS = {"node_modules", ".next", ".turbo", ".cache", "dist", "build"}

def clean_folders(start_dir="."):
    print(f"Mulai memindai di: {os.path.abspath(start_dir)}\n")
    deleted_count = 0
    
    for root, dirs, _ in os.walk(start_dir, topdown=True):
        # Cari folder yang cocok dengan daftar target
        for dir_name in list(dirs):
            if dir_name in TARGET_FOLDERS:
                full_path = os.path.join(root, dir_name)
                print(f"Menghapus: {full_path}")
                try:
                    shutil.rmtree(full_path)
                    deleted_count += 1
                    # Hapus dari list 'dirs' agar os.walk tidak masuk lagi ke sub-folder yang sudah dihapus
                    dirs.remove(dir_name)
                except Exception as e:
                    print(f"Gagal menghapus {full_path}: {e}")
                    
    print(f"\nSelesai! Total {deleted_count} folder berhasil dihapus.")

if __name__ == "__main__":
    clean_folders()