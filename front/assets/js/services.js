export const get = async () => {
        try {
            const result = axios.get('http://localhost:8001/getOne')

            if (result) {
                return result
            }
        } catch (err) {
            console.error(err)
        }
}

export const getAll = async () => {
    try {
        const result = axios.get('http://localhost:8001/list')

        if (result) {
            return result
        }
    } catch (err) {
        console.error(err)
    }
}

export const add = async (word) => {
    try {
        const result = axios.post('http://localhost:8001/add', {word: word})

        if (result) {
            return result
        }
    } catch (err) {
        console.error(err)
    }
}

export const del = async (id) => {
    try {
        console.log(id)
        const result = axios.delete('http://localhost:8001/delete/'+id,)

        if (result) {
            return result
        }
    } catch (err) {
        console.error(err)
    }
}
