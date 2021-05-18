const updateUser = (userID, updateInfo) => {
    return new Promise(async (resolve, reject) => {
        try {
            await fetch(`http://localhost:5000/users/update/${userID}`, {
                method: "PATCH",
                credentials: 'include',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateInfo)
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

export default updateUser