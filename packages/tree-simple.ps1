Get-ChildItem -Recurse -Force |
    Where-Object { $_.FullName -notmatch '\\(node_modules|\.next|\.git)\\' } |
    ForEach-Object { $_.FullName.Substring((Get-Location).Path.Length) }