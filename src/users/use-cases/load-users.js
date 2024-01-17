import { localhostUserToModel } from "../mappers/localhost-user.mapper";

/**
 * 
 * @param {Number} page
 * @returns {Promise<User[]>}
 */
export const loadUsers = async( page = 1 ) => {
    
    const url = `${ import.meta.env.VITE_BASE_URL }/users?_page=${ page }`;
    const res = await fetch(url);
    const {data, next, prev, last} = await res.json();
    
    if( page > last ) return [];
    
    const users = data.map( localhostUserToModel );

    return users;
}