
export const storeData = (key: string, data: any) => {
    return new Promise((resolve, reject) => {
        localStorage.setItem(key, JSON.stringify(data));
        resolve(data);
    })
    
}

export const fetchData = (key: string) => {
    const data = localStorage.getItem(key);
    return new Promise((resolve, reject) => {
        if (data) {
            resolve(JSON.parse(data));
        } else {
            reject({
                status: 404,
                message: 'Data not found',
            });
        }
    })

}