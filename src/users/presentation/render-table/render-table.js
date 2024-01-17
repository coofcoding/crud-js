import usersStore from '../../store/users-store';
import { deleteUser } from '../../use-cases/delete-user-by-id';
import { showModal } from '../render-modal/render-modal';
import './render-table.css';

let table;

const createTable = () => {
    const table = document.createElement('table');
    const tableHeaders = document.createElement('thead');

    tableHeaders.innerHTML = `
        <tr>
            <th>#ID</th>
            <th>Balance</th>
            <th>First Nama</th>
            <th>Last Name</th>
            <th>Active</th>
            <th>Actions</th>
        </tr>
    `;

    const tableBody = document.createElement('tbody');
    table.append(tableHeaders, tableBody);
    return table;
}

const tableSelectListener = ( event ) => {
    const element = event.target.closest('.select-btn');
    
    if ( !element ) return;

    const id = element.getAttribute('data-id');
    showModal( id );
}

const tableDeleteListener = async( event ) => {
    const element = event.target.closest('.delete-btn');
    
    if ( !element ) return;

    const id = element.getAttribute('data-id');
    
    try {
        await deleteUser(id);
        await usersStore.reloadPage();
        document.querySelector('#current-page').innerText = usersStore.getCurrentPage();
        renderTable();
    } catch (error) {
        console.log(error)
        alert('No se pudo eliminar');
    }

}

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderTable = (element) => {

    const users = usersStore.getUsers();

    if (!table) {
        table = createTable();

        element.append(table);

        table.addEventListener('click', tableSelectListener );
        table.addEventListener('click', tableDeleteListener );
    };

    let tableHTML = '';

    users.forEach(({ id, balance, firstName, lastName, isActive }) => {
        tableHTML += `
        <tr>
            <td>${id}</td>
            <td>${balance}</td>
            <td>${firstName}</td>
            <td>${lastName}</td>
            <td>${isActive}</td>
            <td class="action-buttons">
                <a href="#" data-id="${id}" class="select-btn">Select</a>
                <a href="#" data-id="${id}" class="delete-btn">Delete</a>
            </td>
        </tr>
        `;
    });

    table.querySelector('tbody').innerHTML = tableHTML;

}