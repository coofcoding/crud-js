import { loadUsers } from "../use-cases/load-users";

const state = {
    currentPage: 0,
    users: [],
}

const loadNextPage = async () => {
    const user = await loadUsers( state.currentPage + 1 );
    if( user.length === 0 ) return;

    state.currentPage += 1;
    state.users = user;
}

const loadPreviousPage = async () => {
    const user = await loadUsers( state.currentPage - 1 );
    if( state.currentPage === 1 ) return;

    state.currentPage -= 1;
    state.users = user;
}

/**
 * 
 * @param {User} updatedUser 
 */
const onUserChanged = ( updatedUser ) => {

    let wasFound = false;
    
    state.users = state.users.map( user => {
        if ( user.id === updatedUser.id ) {
            wasFound = true;
            return updatedUser;
        } else {
            return user;
        }
    });

    if ( state.users.length < 10 && !wasFound ) {
        state.users.push( updatedUser );
    }

}

const reloadPage = async () => {
    const user = await loadUsers( state.currentPage );
    if( user.length === 0 ) {
        await loadPreviousPage();
        return;
    };

    state.users = user;
}

export default {
    loadNextPage,
    loadPreviousPage,
    onUserChanged,
    reloadPage,

    getUsers: () => [...state.users],
    getCurrentPage: () => state.currentPage,
}