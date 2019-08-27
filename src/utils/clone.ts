export function clone<T>(x: T) : T{
    let jsonX = JSON.stringify(x);
    return JSON.parse(jsonX);
}