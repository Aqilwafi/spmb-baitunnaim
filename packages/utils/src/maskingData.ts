export function maskId(id: string, startLength = 5, endLength = 3): string {
    if (!id) return "";
    if (id.length <= startLength + endLength) return id;
    
    const start = id.substring(0, startLength);
    const end = id.substring(id.length - endLength);
    
    return `${start}...${end}`;
}