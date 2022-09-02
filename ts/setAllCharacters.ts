import CharacterInterface from "./CharacterInterface";

const setAllCharacters = (characters: CharacterInterface[], COUNTOFCHAR: number): void => {
  const charWrap = document.querySelector('.character-wrap') as HTMLDivElement;
  const loadMoreBtn = document.querySelector('.more-btn') as HTMLButtonElement;
  charWrap.innerHTML = '';
  const count: number = COUNTOFCHAR < characters.length ? COUNTOFCHAR : characters.length
  for (let i: number = 0; i < count; i++) {
    const char = characters[i];
    const isDead: boolean = char.status === 'Dead' ? true : false;
    charWrap.innerHTML +=
      `
        <div class="character ${isDead ? 'dead' : ''}" data-id="${char.id}">
          <div class="character__main-info">
            <img class="character__img" src="${char.image}" alt="eweq">
            <p class="character__status ${isDead ? 'dead-status' : 'alive-status'}">${char.status}</p>
            <p class="character__name">${char.name}</p>
          </div>
          <div class="character__info">
            <p class="character__species">Species: ${char.species}</p>
            <p class="character__type">Type: ${char.type ? char.type : 'Unknown'}</p>
            <p class="character__gender">Gender: ${char.gender}</p>
            <p class="character__location">Location: ${char.location.name}</p>
          </div>
          <button class="character__delete-btn">&#9587</button>
        </div>
        `
  }
  if (characters.length > COUNTOFCHAR) {
    loadMoreBtn.classList.remove('hidden');
  } else if (characters.length < COUNTOFCHAR) {
    loadMoreBtn.classList.add('hidden');
  }
}

export default setAllCharacters