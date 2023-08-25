const fetchPokemones = async (id) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();
  const types = data.types.map((type) => type.type.name);
  const sprite = data.sprites.other.dream_world.front_default;
  const species = data.species.name;
  const height = data.height;
  const weight = data.weight;
  const abilities = data.abilities.map((ability) => ability.ability.name);
  const stats = data.stats.map((stat) => `${stat.stat.name}: ${stat.base_stat}`);
  const moves = data.moves.slice(0, 5).map((move) => move.move.name);
  return [data.name, id, types, sprite, species, height, weight, abilities, stats, moves];
};


const Pokemon = (name, id, types, sprite, species, height, weight, abilities, stats, moves) => {
  return {
    name,
    id,
    types,
    sprite,
    species,
    height,
    weight,
    abilities,
    stats,
    moves,
  };
};

//solo funciona afuera 
const ocultarApartados = () => {
  const sections = document.querySelectorAll('.details-card > div');
  sections.forEach(section => {
    section.classList.remove('show-section');
  });
};

// 
const Pokedex = (() => {
  const PokemonesList = [];

  const crearPokemones = (name, id, types, sprite, species, height, weight, abilities, stats, moves) => {
    const pokemon = Pokemon(name, id, types, sprite, species, height, weight, abilities, stats, moves);
    PokemonesList.push(pokemon);
  };

  const dibujarPokedex = () => {
    const pokedexContainer = document.createElement('div');
    pokedexContainer.classList.add('pokedex');

    //Bucle para los pokimones 
    PokemonesList.forEach((pokemon, i) => {
      const pokemonCard = document.createElement('div');
      pokemonCard.classList.add('pokemones-card', pokemon.types[0]);
      pokemonCard.innerHTML = `
          <h2 class='pokemonesNumero'>     ${i + 1}</h2>
              
      `;
      const typesContainer = document.createElement('div');
      
      typesContainer.classList.add('tipos-container');

      pokemon.types.forEach(type => {
        const typeElement = document.createElement('div');
        typeElement.classList.add(`tipos-${type}`);
        typeElement.textContent = type;
        typesContainer.appendChild(typeElement);
      });

pokemonCard.appendChild(typesContainer);
      const spriteContainer = document.createElement('div');
      spriteContainer.classList.add('sprite-container');
      const sprite = document.createElement('img');
      sprite.src = pokemon.sprite;
      spriteContainer.appendChild(sprite);
      
      pokemonCard.appendChild(spriteContainer);

      
      pokemonCard.addEventListener('click', () => showDetailsModal(pokemon));
      pokedexContainer.appendChild(pokemonCard);
    });

    document.body.appendChild(pokedexContainer);
  };

    const showDetailsModal = (pokemon) => {
        const modal = document.createElement('div');
        modal.classList.add('modal');
    
        const detailsCard = document.createElement('div');
        detailsCard.classList.add('details-card', pokemon.types[0]);

        const pokemonName = document.createElement('h2');
        pokemonName.textContent = pokemon.name;
        pokemonName.classList.add('pokemon-name');
        detailsCard.appendChild(pokemonName);
        
        const spriteImg = document.createElement('img');
        spriteImg.src = pokemon.sprite;
        
        spriteImg.alt = `${pokemon.name} Sprite`;
        detailsCard.appendChild(spriteImg);
        spriteImg.classList.add('pokemones-sprite'); 
    
        const navbar = document.createElement('nav');
        navbar.classList.add('navbar');
        navbar.innerHTML = `
          <ul>
            <li><a href="#informacion-basica">Información</a></li>
            <li><a href="#estadisticas-info">Estadísticas</a></li>
            <li><a href="#habilidades-info">Habilidades</a></li>
            <li><a href="#movimientos-info">Movimientos</a></li>
          </ul>
        `;
        
        detailsCard.appendChild(navbar);
        
    
        // Apartado de Información
        const basicInfo = document.createElement('div');
        basicInfo.classList.add('informacion-basica');
        basicInfo.id = 'informacion-basica';
        basicInfo.innerHTML = `
          <h2>${pokemon.name}</h2>
          <p>Altura: ${pokemon.height}</p>
          <p>Peso: ${pokemon.weight}</p>
          <p>Habilidades: ${pokemon.abilities.join(', ')}</p>
        `;
        detailsCard.appendChild(basicInfo);
    
        // Apartado de Estadísticas 
        const statsInfo = document.createElement('div');
        statsInfo.classList.add('estadisticas-info');
        statsInfo.id = 'estadisticas-info';
        statsInfo.innerHTML = `
          <h3>Estadísticas:</h3>
          <ul>${pokemon.stats.map(stat => `<li>${stat}</li>`).join('')}</ul>
        `;
        detailsCard.appendChild(statsInfo);
    
        // Apartado de habilidades
        const abilitiesInfo = document.createElement('div');
        abilitiesInfo.classList.add('habilidades-info');
        abilitiesInfo.id = 'habilidades-info';
        abilitiesInfo.innerHTML = `
          <h3>Habilidades:</h3>
          <ul>${pokemon.abilities.map(ability => `<li>${ability}</li>`).join('')}</ul>
        `;
        detailsCard.appendChild(abilitiesInfo);
    
        // Apartado de Movimientos
        const movesInfo = document.createElement('div');
        movesInfo.classList.add('movimientos-info');
        movesInfo.id = 'movimientos-info';
        movesInfo.innerHTML = `
          <h3>Movimientos:</h3>
          <ul>${pokemon.moves.map(move => `<li>${move}</li>`).join('')}</ul>
        `;
        detailsCard.appendChild(movesInfo);
    
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Cerrar';
        closeButton.addEventListener('click', () => {
          document.body.removeChild(modal);
        });
    
        detailsCard.appendChild(closeButton);
        modal.appendChild(detailsCard);
    
        document.body.appendChild(modal);
    
        // eventos de click para los enlaces de la barra de navegación
        const links = navbar.querySelectorAll('a');
        links.forEach(link => {
          link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = detailsCard.querySelector(targetId);
            ocultarApartados();
            targetSection.classList.add('show-section');
          });
        });
      };
    
      const AllPokemon = async () => {
        for (let i = 1; i <= 150; i++) {
          const pokemonesData = await fetchPokemones(i);
          crearPokemones(...pokemonesData);
        }
        dibujarPokedex();
      };
    
      return {
        AllPokemon,
      };
    })();
    
    
    Pokedex.AllPokemon();