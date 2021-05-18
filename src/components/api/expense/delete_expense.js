import { API_BASE } from '../utils/config'

const deleteExpense = (expenseID) => {
    return new Promise(async (resolve, reject) => {
        try {
            await fetch(`${API_BASE}/expenses/${expenseID}`, {
                method: "DELETE",
                credentials: 'include',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }).then(response => 
                response.json()
            ).then(json => {
                resolve(json)
            }).catch(err => {
                reject(err)
            })
        } catch(err) {
            reject(err)
        }
    })
}

export default deleteExpense