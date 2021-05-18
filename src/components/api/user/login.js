import { API_BASE } from '../utils/config'

const login = (loginInfo) => {
    return new Promise(async (resolve, reject) => {
        try {
            await fetch(`${API_BASE}/users/login`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginInfo)
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

export default login