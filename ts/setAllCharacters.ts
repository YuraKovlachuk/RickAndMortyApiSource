import CharacterInterface from "./CharacterInterface";

const generateHtmlTemplate = (char: CharacterInterface): string => {
  const { id, name, status, image, species, type, gender, location } = char;
  const isDead: boolean = status === 'Dead' ? true : false;
  return `
  <div class="character ${isDead ? 'dead' : ''}" data-id="${id}">
    <div class="character__main-info">
      <img class="character__img" src="${image}" alt="eweq">
      <p class="character__status ${isDead ? 'dead-status' : 'alive-status'}">${status}</p>
      <p class="character__name">${name}</p>
    </div>
    <div class="character__info">
      <p class="character__species">Species: ${species}</p>
      <p class="character__type">Type: ${type ? type : 'Unknown'}</p>
      <p class="character__gender">Gender: ${gender}</p>
      <p class="character__location">Location: ${location.name}</p>
    </div>
    <button class="character__delete-btn">&#9587</button>
  </div>
  `
}

const setAllCharacters = (characters: CharacterInterface[], COUNTOFCHAR: number): number => {
  const loadMoreBtn = document.querySelector('.more-btn') as HTMLButtonElement;
  const charWrap = document.querySelector('.character-wrap') as HTMLDivElement;
  const count: number = COUNTOFCHAR < characters.length ? COUNTOFCHAR : characters.length;
  charWrap.innerHTML = '';
  for (let i: number = 0; i < count; i++) {
    charWrap.innerHTML += generateHtmlTemplate(characters[i])
  }
  if (characters.length > COUNTOFCHAR) {
    loadMoreBtn.classList.remove('hidden');
  } else {
    loadMoreBtn.classList.add('hidden');
  }
  if (characters.length % 5 === 0 && loadMoreBtn.classList.contains('hidden') && characters.length >= 5) {
    return COUNTOFCHAR = characters.length;
  }
  return COUNTOFCHAR
}

export default setAllCharacters