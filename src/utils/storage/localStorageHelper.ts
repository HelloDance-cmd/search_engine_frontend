export class LocalStorageHelper {
    static getFromLocalStorage(key: string): string {
        return localStorage.getItem(key) || "";
    }

    static setLocalStorage(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    static removeLocalStorage(key: string): boolean {
        const value = localStorage.getItem(key);
        if (value != null) {
            localStorage.removeItem(key);
            return true;
        }

        return false;
    }

    static removeLocalStorageTimeout(key: string, timeout: number): Promise<boolean> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const isDeleted = LocalStorageHelper.removeLocalStorage(key);
                resolve(isDeleted);
            }, timeout);
        });
    }
}


