export class LocalStorageHelper {
    static getFromLocalStorage(key: string): string;

    static setLocalStorage(key: string, value: string): void;

    static removeLocalStorage(key: string): boolean;

    static removeLocalStorageTimeout(key: string, timeout: number): Promise<boolean>;
}