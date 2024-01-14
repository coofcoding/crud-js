import usersStore from '../../store/users-store';
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

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderTable = (element) => {

    const users = usersStore.getUsers();

    if (!table) {
        table = createTable();

        element.append(table);

        // TODO: listeners a la table
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