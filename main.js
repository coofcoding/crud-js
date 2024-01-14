import './style.css'
import { usersApp } from './src/users/users-app';

document.querySelector('#app').innerHTML = `
    <div>
        <h1>Users List</h1>
        <div class="card"></div>
    </div>
`

const element = document.querySelector('.card');

usersApp(element);