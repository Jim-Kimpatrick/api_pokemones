
//Realiza una peticion GET a la API utilizando el id
const fetchPokemones = async (id) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();//convierte la respuesta de la API en formato JSON
  const types = data.types.map((type) => type.type.name);//extrae y mapea los tipos de pokemon
  const sprite = data.sprites.other.dream_world.front_default;//guarda el URL del sprite del pokemon
  const species = data.species.name;//Guarda el nombre de la especie del pokemon
  const height = data.height;//guarda la altura
  const weight = data.weight;//guarda el peso
  const abilities = data.abilities.map((ability) => ability.ability.name);//Obtine y mapea las habilidades
  const stats = data.stats.map((stat) => `${stat.stat.name}: ${stat.base_stat}`);//obtiene y mapea las estadisticas
  const moves = data.moves.slice(0, 8).map((move) => move.move.name);//obtiene y mapea los primeros 8 movimientos
  return [data.name, id, types, sprite, species, height, weight, abilities, stats, moves];//Retorna los datos guardaos del pokemon
};

//Creacion del objeto pokemon
const Pokemon = (name, id, types, sprite, species, height, weight, abilities, stats, moves) => {
  return {//retorna el objeto pokemon con sus datos
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
  const PokemonesList = [];//array vacio para almacenar los pokemon

  //funcion para crear los objetos pokemon
  const crearPokemones = (name, id, types, sprite, species, height, weight, abilities, stats, moves) => {
    const pokemon = Pokemon(name, id, types, sprite, species, height, weight, abilities, stats, moves);//se llama a Pokemon para crear el pokemon
    PokemonesList.push(pokemon);//el pokemon creado se guarda en el array vacio
  };

  const dibujarPokedex = () => {
    const pokedexContainer = document.createElement('div');//se crea un div
    pokedexContainer.classList.add('pokedex');//se le agrega la clase pokedex para aplicarle css

    //Bucle para los pokimones 
    PokemonesList.forEach((pokemon, i) => {//bucle para lista donde se guardaron los pokemones
      const pokemonCard = document.createElement('div');//crea un div para las card
      pokemonCard.classList.add('pokemones-card', pokemon.types[0]);//agrega las 2 clases css a la card del pokemon la segunda es el tipo del pokemon para aplicar ccs especificos
      pokemonCard.innerHTML = `
          <h2 class='pokemonesNumero'>     ${i + 1}</h2>
              
      `;//añade HTML a la card del pokemon junto al iterador para representar el numero del pokemon

      const typesContainer = document.createElement('div');//crea un div para los tipos del pokemon
      
      typesContainer.classList.add('tipos-container');//se le agrega la clase css

      pokemon.types.forEach(type => {//iteracion segun cuantos tipos tiene el pokemon
        const typeElement = document.createElement('div');
        typeElement.classList.add(`tipos-${type}`);//se le añade la clase de css en la cual es segun el tipo
        typeElement.textContent = type;// se le agrega el tipo del pokemon
        typesContainer.appendChild(typeElement);
      });

      pokemonCard.appendChild(typesContainer);//se agregan los tipos a la card del pokemon

      const spriteContainer = document.createElement('div');//se crea un div para el sprite del pokemon
      spriteContainer.classList.add('sprite-container');//la clase css del div
      const sprite = document.createElement('img');//se agrega un elemento img
      sprite.src = pokemon.sprite;//se añade la fuente(URL) de donde se obtendra el sprite del pokemon
      spriteContainer.appendChild(sprite);
      
      pokemonCard.appendChild(spriteContainer);//Se agrega el sprite a la card

//AL DAR CLICK EN LA CARD DEL POKEMON MUESTRA UNA CARD CON MAS INFORMACION DEL POKEMON
      pokemonCard.addEventListener('click', () => showDetailsModal(pokemon));
      pokedexContainer.appendChild(pokemonCard);//se agrega la card del pokemon al div pokedex
    });

    document.body.appendChild(pokedexContainer);//se agrega el contenedor pokedex al HTML
  };

    const showDetailsModal = (pokemon) => {
        const modal = document.createElement('div');//se crea un div
        modal.classList.add('modal');//se le agrega la clase al div
    
        const detailsCard = document.createElement('div');//creacion de un div para la card de detalles del pokemon
        detailsCard.classList.add('details-card', pokemon.types[0]);//se le agregan 2 clases la segunda para dar CSS especificos segun el tipo del pokemon

        const pokemonName = document.createElement('h2');//se crea un h2
        pokemonName.textContent = pokemon.name;//se establece el nombre del pokemon como el contenido del h2
        pokemonName.classList.add('pokemon-name');//se le agrega la clase al h2
        detailsCard.appendChild(pokemonName);//agrega el h2 a la card de detalles del pokemon
        
        const spriteImg = document.createElement('img');//se crea un img para el sprite del pokemon
        spriteImg.src = pokemon.sprite;
        spriteImg.alt = `${pokemon.name} Sprite`;
        detailsCard.appendChild(spriteImg);
        spriteImg.classList.add('pokemones-sprite','sprite-animacion');//se le agregan las clases al sprite del pokemon
        
        const navbar = document.createElement('nav');//crea un navbar para las secciones
        navbar.classList.add('navbar');//agregar la classe navbar 
        navbar.innerHTML = `
          <ul>
            <li><a href="#informacion-basica">Información</a></li>
            <li><a href="#estadisticas-info">Estadísticas</a></li>
            <li><a href="#habilidades-info">Habilidades</a></li>
            <li><a href="#movimientos-info">Movimientos</a></li>
          </ul>
        `;
        
        detailsCard.appendChild(navbar);//agrega la navbar a la card
        
        
    
        // Apartado de Información
        const basicInfo = document.createElement('div');
        basicInfo.classList.add('informacion-basica');
        basicInfo.id = 'informacion-basica';
        basicInfo.innerHTML = `
        <h3>Informacion</h3>
        <p>Altura: ${pokemon.height / 10} m</p>
        <p>Peso: ${pokemon.weight / 10} kg</p>
        <p>Habilidades: ${pokemon.abilities.join(', ')}</p>
        `;// /10 para mostrar bien la altura y poso del pokemon
        detailsCard.appendChild(basicInfo);
    
        // Apartado de Estadísticas 
        const statsInfo = document.createElement('div');
        statsInfo.classList.add('estadisticas-info');
        statsInfo.id = 'estadisticas-info';
        statsInfo.innerHTML = `
          <h3>Estadísticas</h3>
          ${pokemon.stats.map(stat => { //iteracion para el arreglo donde se guaradan las estaditicas 
            const [statName, statValue] = stat.split(': ');//split para dividir los apartados nombre y valor de los stats guardados
            const normalizedValue = (parseInt(statValue) / 255) * 100; //coversion para que el % sea proporcional al rango 0 a 255
            return `
              <div class="stat">
                <span class="stat-name">${statName}: ${statValue}</span>
                <div class="stat-bar">
                  <div class="stat-fill" style="width: ${normalizedValue}%;"></div>
                </div>
              </div>
            `;//mostrar el nombre y valor de los stats y el valor en una barra
          }).join('')}
        `;
        detailsCard.appendChild(statsInfo);
        statsInfo.classList.add('show-section');//para mostrar primero los stats al dar click en el pokemon
    
        // Apartado de habilidades
        const abilitiesInfo = document.createElement('div');
        abilitiesInfo.classList.add('habilidades-info');
        abilitiesInfo.id = 'habilidades-info';
        abilitiesInfo.innerHTML = `
        <h3>Habilidades</h3>
        <div class="habilidades-list">
          ${pokemon.abilities.map(ability => `<span class="habilidades">${ability}</span>`).join('')}
        </div>
      `;
        detailsCard.appendChild(abilitiesInfo);
    
        // Apartado de Movimientos
        const movesInfo = document.createElement('div');
        movesInfo.classList.add('movimientos-info');
        movesInfo.id = 'movimientos-info';
        movesInfo.innerHTML = `
          <h3>Movimientos</h3>
          <div class="mov-list">
            ${pokemon.moves.map((move, index) => {//para mostrar los movimientos de 2 en 2
              if (index % 2 === 0) {
                return `
                  <div class="mov-row">
                    <span class="mov">${move}</span>
                    ${index + 1 < pokemon.moves.length ? `<span class="mov">${pokemon.moves[index + 1]}</span>` : ''}
                  </div>
                `;
              }
              return '';
            }).join('')}
          </div>
        `;
        detailsCard.appendChild(movesInfo);
    
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Cerrar';
        closeButton.addEventListener('click', () => {
          document.body.removeChild(modal);
        });
    
        detailsCard.appendChild(closeButton);
        modal.appendChild(detailsCard);//agrega la card con los detalles del pokemon al modal
    
        document.body.appendChild(modal);//agrega la card al html
    
        // eventos de click para los enlaces de la barra de navegación
        const links = navbar.querySelectorAll('a');//obtiene los enlaces de la navbar
        links.forEach(link => {
          //para cada apartado se agrega un evento al dar click
          link.addEventListener('click', (event) => {
            event.preventDefault();//evita que se cambie el URL
            const targetId = link.getAttribute('href');//obtine el ID a la seccion a la que se dio click
            const targetSection = detailsCard.querySelector(targetId);//busca el elemento al que se le dio click en la card
            ocultarApartados();//oculta las otras secciones de la card

            
            links.forEach(link => {
              link.classList.remove('selected');//remueve la clase css de los apartados de la navbar
            });

            link.classList.add('selected');//agregar los css al dar click 
            targetSection.classList.add('show-section');//muestra la seccion correspondiente a la que dio click
          });
        });

        
        const closeModal = () => {
          document.body.removeChild(modal);//remueve la card con los detalles del pokemon del html
        };
        //quitar la card al dar click afuera 
        modal.addEventListener('click', (event) => {
          //si se deio click afuera cierra la card con los detalles del pokemon
          if (event.target === modal) {
            closeModal();
          }
        });

      };
    
      //funcion anonima con el patron modulo
      const AllPokemon = async () => {
        for (let i = 1; i <= 150; i++) {//bucle que se ejecutara para los 150 pokemon
          const pokemonesData = await fetchPokemones(i);// llamado a la API para obtener los datos del pokemon y guardarlos en la constante
          crearPokemones(...pokemonesData);
          //llama la funcion crearPokemones con los datos de los pokemon para crear el objeto Pokemon y guardarlos en la lista
        }
        dibujarPokedex();//llamado a la funcion para mostrar la pokede
      };
    
      return {
        AllPokemon,
      };
    })();
    
    
    Pokedex.AllPokemon();