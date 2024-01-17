
/**
 * 
 * @param {String|Number} user 
 */
export const deleteUser = async (userID) => {
    // console.log(user)
    const url = `${import.meta.env.VITE_BASE_URL}/users/${userID}`;
    const res = await fetch(url, {
        method: 'DELETE',
    });

    const deleteResolve = await res.json();

    return true;

}