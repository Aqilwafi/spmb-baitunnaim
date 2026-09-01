import os

# Daftar folder yang ingin diabaikan
IGNORE_FOLDERS = {"node_modules", ".next", ".turbo", ".cache", "dist", "build", ".git"}

def print_tree(start_dir=".", prefix=""):
    try:
        # Ambil semua item di folder saat ini dan urutkan
        entries = sorted(os.listdir(start_dir))
    except PermissionError:
        return

    # Filter item: abaikan folder target
    filtered_entries = [e for e in entries if e not in IGNORE_FOLDERS]
    count = len(filtered_entries)

    for i, entry in enumerate(filtered_entries):
        path = os.path.join(start_dir, entry)
        is_last = (i == count - 1)
        
        # Penentu simbol cabang
        connector = "└── " if is_last else "├── "
        print(f"{prefix}{connector}{entry}")

        # Jika item adalah folder, lakukan rekursi
        if os.path.isdir(path):
            extension = "    " if is_last else "│   "
            print_tree(path, prefix + extension)

if __name__ == "__main__":
    root = "."
    print(os.path.abspath(root))
    print_tree(root)