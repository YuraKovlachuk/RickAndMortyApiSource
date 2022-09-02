export default async function getFetchData<T>(id: number | string, request: RequestInit = {}): Promise<T> {
    const url = 'https://rickandmortyapi.com/api/character/' + id;
    const response = await fetch(url, request);
    const character = await response.json();
    return await character as T;
}