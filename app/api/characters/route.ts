/**
 * Esta función traduce los datos de un personaje del inglés al español
 * Recibe los datos crudos de la API y retorna una versión traducida
 */
function translateCharacter(character: any) {
  // Diccionario de traducciones para el estado del personaje
  const statusTranslations: { [key: string]: string } = {
    Alive: "Vivo",
    Dead: "Muerto",
    Unknown: "Desconocido",
    Deceased: "Fallecido",
    Operational: "Operacional",
    Destroyed: "Destruido",
    Imprisoned: "Aprisionado",
  }

  // Diccionario de traducciones para el género
  const genderTranslations: { [key: string]: string } = {
    Male: "Masculino",
    Female: "Femenino",
    Unknown: "Desconocido",
    None: "Ninguno",
    "None (referred to as male)": "Ninguno (referido como masculino)",
    "None (referred to as Male)": "Ninguno (referido como masculino)",
    "None(referred to as Male)": "Ninguno (referido como masculino)",
    Genderfluid: "Género fluido",
    Genderless: "Sin género",
  }

  // Diccionario de traducciones para las especies
  const speciesTranslations: { [key: string]: string } = {
    Human: "Humano",
    Robot: "Robot",
    Ventrexian: "Ventrexiano",
    Tryvuulian: "Tryvuuliano",
    Serepentian: "Serepentiano",
    "Artificial Intelligence": "Inteligencia Artificial",
    Titan: "Titán",
    "Cosmic Entity": "Entidad Cósmica",
    "Energy being": "Ser de energía",
    "Fire Snake": "Serpiente de fuego",
    Cyborg: "Ciborg",
    Alien: "Alienígena",
    Hooblot: "Hooblot",
    "Tiger Tiger": "Tigre Tigre",
    "Mooncake's Species": "Especie de Mooncake",
    Unknown: "Desconocido",
  }

  // Traducir habilidades al español
  const translateAbility = (ability: string): string => {
    const abilityTranslations: { [key: string]: string } = {
      Piloting: "Pilotaje",
      Marksmanship: "Puntería",
      "Hand-to-hand combat": "Combate cuerpo a cuerpo",
      "Weapons: Blasters": "Armas: Blasters",
      "Weapons: Black hole gun (briefly)": "Armas: Pistola de agujero negro (brevemente)",
      "Weapons: Robot arm": "Armas: Brazo robótico",
      "Weapons: Laser gun": "Armas: Pistola láser",
      "Weapons: Laser sword": "Armas: Espada láser",
      Hovering: "Levitación",
      "Firing Laser Beams": "Disparo de rayos láser",
      "Planetary Destruction": "Destrucción planetaria",
      Astrophysicist: "Astrofísico/a",
      Engineer: "Ingeniero/a",
      Electronics: "Electrónica",
      Acrobatics: "Acrobacias",
      "Combat skills": "Habilidades de combate",
      Surgery: "Cirugía",
      "Combat prowess": "Destreza en combate",
      "Solving riddles": "Resolver acertijos",
      "Nigh-Invulnerability": "Casi invulnerable",
      "Dark Energy Manipulation": "Manipulación de energía oscura",
      Telekinesis: "Telequinesis",
      Flight: "Vuelo",
      Pyrokinesis: "Pirokinesis",
      "MiniGun attached to Right Arm.": "Miniametralladora adjunta al brazo derecho",
      "Musical talents": "Talentos musicales",
      Strength: "Fuerza",
      "Controls on the Galaxy One": "Controles de la Galaxy One",
      "Stretchable Limbs(Season 2)": "Extremidades extensibles (Temporada 2)",
      "Competent Leader": "Líder competente",
      Combatant: "Combatiente",
      "Capable Shrink": "Encogimiento capaz",
      "Multiple Forms - a snake-rat hybrid and a large, wasp-like alien":
        "Múltiples formas - un híbrido de serpiente-rata y un alienígena grande parecido a una avispa",
      "Quick Heal": "Curación rápida",
      Regenerate: "Regeneración",
      "Technical expertise": "Experiencia técnica",
      "Powerful roar": "Rugido poderoso",
      "Weapons: Fire axe": "Armas: Hacha de fuego",
      "Weapons: Speart": "Armas: Lanza",
      "Light(Telekinesis)": "Luz (Telequinesis)",
      "Energy Projection": "Proyección de energía",
      "Size-shifting": "Cambio de tamaño",
      Shapeshifting: "Cambio de forma",
      "Superhuman strength": "Fuerza sobrehumana",
      "Cosmic Being": "Ser cósmico",
      Telepathy: "Telepatía",
      "Weapons: Titanslayer": "Armas: Mata-titanes",
      "Superhuman Stength": "Fuerza sobrehumana",
      Levitation: "Levitación",
      Swordsmanship: "Esgrima",
      "Size Manipulation": "Manipulación de tamaño",
      "Resistance to Mind Manipulation": "Resistencia a manipulación mental",
      Possession: "Posesión",
      Corruption: "Corrupción",
      Immortality: "Inmortalidad",
      Manipulation: "Manipulación",
      "Time Travel": "Viaje en el tiempo",
      Fighting: "Lucha",
      Leadership: "Liderazgo",
      "Weapons: Staff": "Armas: Bastón",
      "Tribore's Second in Command": "Segundo al mando de Tribore",
      "Saw hands": "Manos sierra",
      "Mind-breaking": "Destrucción mental",
    }
    return abilityTranslations[ability] || ability
  }

  return {
    ...character,
    status: character.status ? statusTranslations[character.status] || character.status : "Desconocido",
    gender: character.gender ? genderTranslations[character.gender] || character.gender : "Desconocido",
    species: character.species ? speciesTranslations[character.species] || character.species : "Desconocido",
    hair: character.hair || "Ninguno",
    // Traducir el array de habilidades
    abilities: character.abilities ? character.abilities.map(translateAbility) : [],
    // Mantener los datos originales también
    alias: character.alias || [],
    origin: character.origin || "Desconocido",
    img_url: character.img_url,
  }
}

/**
 * API Route Handler para obtener personajes de Final Space
 * 
 * FUNCIONAMIENTO:
 * 1. Hace fetch a la API oficial de Final Space (https://finalspaceapi.com/api/v0/character)
 * 2. La API retorna un JSON con TODOS los personajes (47 en total)
 * 3. Cada personaje incluye: id, name, status, species, gender, hair, alias, origin, abilities, img_url
 * 4. Traduce todos los campos al español usando la función translateCharacter
 * 5. Retorna los datos traducidos al cliente
 * 
 * Los datos incluyen:
 * - Información básica: nombre, estado, especie, género, cabello
 * - Alias: todos los apodos y nombres alternativos del personaje
 * - Origen: de dónde viene el personaje
 * - Habilidades: todas las habilidades especiales del personaje
 * - Imagen: URL de la imagen oficial del personaje
 */
export async function GET() {
  try {
    // Realizamos la petición a la API de Final Space
    // Esta API pública retorna TODOS los personajes de la serie
    const response = await fetch("https://finalspaceapi.com/api/v0/character", {
      headers: {
        "User-Agent": "Final-Space-Gallery/1.0",
      },
    })

    // Verificamos que la respuesta sea exitosa
    if (!response.ok) {
      throw new Error(`La API retornó el estado ${response.status}`)
    }

    // Convertimos la respuesta a JSON
    // Esto nos da un array con todos los personajes
    const data = await response.json()

    // Traducimos cada personaje al español
    const translatedData = data.map(translateCharacter)

    // Retornamos los datos traducidos
    return Response.json(translatedData)
  } catch (error) {
    console.error("[Final Space Wiki] Error al obtener personajes:", error)
    return Response.json({ error: "Error al cargar los personajes de Final Space" }, { status: 500 })
  }
}
