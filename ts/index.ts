import getFetchData from './getFetchData';
import CharacterInterface from './CharacterInterface';
import setAllCharacters from './setAllCharacters';
import { localStorageWrapper } from './storage';

import '../scss/style.scss';
import '../scss/search-box.scss';
import '../scss/character-box.scss';
import '../scss/variable.scss';

const LOADMORECOUNT = 5
let currentCountChars = 5;
const charWrap = document.querySelector('.character-wrap') as HTMLDivElement;

let characters = localStorageWrapper.get<CharacterInterface[]>('characters')! || [];

if (characters) setAllCharacters(characters, currentCountChars); // load characters from localstorage at the first load of the page

const deleteChar = (char: HTMLDivElement): void => {
    characters = characters.filter(charItem => charItem.id !== +char.dataset.id!)
    setAllCharacters(characters, currentCountChars);
    localStorageWrapper.set('characters', characters);
}

document.querySelector('form')!.addEventListener('submit', (e: Event): void => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const input = target.querySelector('input')!;
    const id: number = input.valueAsNumber;
    target.reset()
    if ((id < 1 || id > 826) ? true : false) {
        alert('The ID should be between 1 and 826!');
        return;
    };
    getFetchData<CharacterInterface>(id)
        .then(char => {
            characters.unshift({ ...char })
            setAllCharacters(characters, currentCountChars);
            localStorageWrapper.set('characters', characters);
        })

})

charWrap.addEventListener('click', (e: Event): void => {
    const target = e.target as HTMLDivElement | HTMLButtonElement;
    if (target.classList.contains('character__delete-btn')) {
        deleteChar(target.parentElement as HTMLDivElement)
    }
})

document.querySelector('.more-btn')!.addEventListener('click', () => {
    console.log('currentCountChars - ' + currentCountChars)
    currentCountChars += LOADMORECOUNT;
    setAllCharacters(characters, currentCountChars);
})


