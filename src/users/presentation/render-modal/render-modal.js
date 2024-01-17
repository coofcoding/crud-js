import modalHTML from './render-modal.html?raw';
import './render-modal.css';
import { getUserById } from '../../use-cases/get-user-by-id';

let modal, form, loadedUser = {};


/**
 * 
 * @param {String|Number} id 
 */
export const showModal = async( id ) => {
    modal?.classList.remove('hidden-modal');
    loadedUser = {};

    if ( !id ) return;

    const user = await getUserById( id );
    setFormValues( user );

}

export const hideModal = () => {
    modal?.classList.add('hidden-modal');
    form?.reset();
}

/**
 * 
 * @param {User} user 
 */
const setFormValues = ( user ) => {
    form.querySelector('[name="firstName"]').value = user.firstName;
    form.querySelector('[name="lastName"]').value = user.lastName;
    form.querySelector('[name="balance"]').value = user.balance;
    form.querySelector('[name="isActive"]').checked = user.isActive;

    loadedUser = user;
    // console.log(loadedUser)
}

/**
 * 
 * @param {HTMLDivElement} element 
 * @param {(userLike) => Promise<void>} callback 
 */
export const renderModal = ( element, callback ) => {

    if ( modal ) return;

    modal = document.createElement('div');
    modal.innerHTML = modalHTML;
    modal.className = 'modal-container hidden-modal';
    form = modal.querySelector('form');

    modal.addEventListener('click', (event) => {
        if( event.target.className === 'modal-container' ) hideModal();
    })

    form.addEventListener('submit', async(event) => {
        event.preventDefault();

        const formData = new FormData( form );
        const userLike = { ...loadedUser };

        userLike.isActive = false;
        
        for (const [key, value] of formData) {
            if ( key === 'balance') {
                userLike[key] = + value;
                continue;
            }

            if( key === 'isActive') {
                userLike[key] = (value === 'on') && true;
                continue;
            }
        
            userLike[key] = value;
        }
        await callback( userLike );

        hideModal();
    })


    element.append( modal );

}