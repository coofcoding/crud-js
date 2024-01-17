import usersStore from '../../store/users-store';
import { renderTable } from '../render-table/render-table';
import './render-buttons.css';

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderButtons = ( element ) => {

    const buttonsSecc = document.createElement('div');
    buttonsSecc.classList.add('buttons-secc')

    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('buttons-div')

    const nextButton = document.createElement('button');
    nextButton.innerText = 'Next >';

    const prevButton = document.createElement('button');
    prevButton.innerText = '< Prev';

    const currentPageLabel = document.createElement('span');
    currentPageLabel.id = 'current-page';
    currentPageLabel.innerText = usersStore.getCurrentPage();

    buttonsDiv.append( prevButton, currentPageLabel, nextButton );

    buttonsSecc.append( buttonsDiv )

    element.append( buttonsSecc );

    nextButton.addEventListener('click', async() => {
        await usersStore.loadNextPage();

        currentPageLabel.innerText = usersStore.getCurrentPage();

        renderTable( element );
    })

    prevButton.addEventListener('click', async() => {
        await usersStore.loadPreviousPage();

        currentPageLabel.innerText = usersStore.getCurrentPage();

        renderTable( element );
    })
}