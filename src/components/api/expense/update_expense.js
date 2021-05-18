import { API_BASE } from '../utils/config'

const UpdateUserExpense = (expenseID, updateExpenseInfo) => {
    return new Promise(async (resolve, reject) => {
        try {
            await fetch(`${API_BASE}/expenses/update/${expenseID}`, {
                method: "PATCH",
                credentials: 'include',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateExpenseInfo)
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

export default UpdateUserExpense