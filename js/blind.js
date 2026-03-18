// Blind Tasting mode: aroma/flavor description → guess the spirit

export const SPIRITS = [
  {
    name: 'Whisky Escocés (Islay)',
    clues: ['Intenso ahumado y turba', 'Notas de alga marina y yodo', 'Finish largo y medicinal', 'Elaborado en una isla escocesa'],
    answers: ['Whisky Escocés (Islay)', 'Mezcal', 'Calvados', 'Armagnac'],
  },
  {
    name: 'Tequila Blanco',
    clues: ['Agave crudo y vegetal', 'Notas cítricas y pimienta blanca', 'Ligero toque de flores silvestres', 'Destilado de planta suculenta azul'],
    answers: ['Tequila Blanco', 'Ginebra', 'Vodka de Agave', 'Mezcal Joven'],
  },
  {
    name: 'Mezcal',
    clues: ['Ahumado de leña, suave y complejo', 'Frutas tropicales y tierra', 'Elaborado con agave silvestre', 'Notas de chocolate y café'],
    answers: ['Mezcal', 'Tequila Reposado', 'Whisky de Tennessee', 'Ron Añejo'],
  },
  {
    name: 'Cognac VSOP',
    clues: ['Flores secas y vainilla', 'Ciruela pasa y higos', 'Notas de roble francés y canela', 'Envejecido mínimo 4 años en barrica'],
    answers: ['Cognac VSOP', 'Armagnac Joven', 'Calvados', 'Ron Añejo'],
  },
  {
    name: 'Ginebra London Dry',
    clues: ['Enebro fresco y dominante', 'Cítricos y corteza de limón', 'Botánicos florales y especiados', 'Base neutróna, seca sin azúcar añadido'],
    answers: ['Ginebra London Dry', 'Aquavit', 'Vodka Premium', 'Gin Sloe'],
  },
  {
    name: 'Ron Añejo Cubano',
    clues: ['Melaza dulce y caña de azúcar', 'Frutas tropicales maduras', 'Vainilla, caramelo y madera suave', 'Producido en el Caribe hispano'],
    answers: ['Ron Añejo Cubano', 'Cachaza Envejecida', 'Bourbon', 'Brandy de Jerez'],
  },
  {
    name: 'Bourbon Kentucky',
    clues: ['Vainilla intensa y caramelo', 'Maíz dulce y roble nuevo carbonizado', 'Nuez moscada y especias de panadería', 'Producido en el sur de EE.UU.'],
    answers: ['Bourbon Kentucky', 'Rye Whiskey', 'Corn Whisky', 'Whisky Canadiense'],
  },
  {
    name: 'Rye Whiskey',
    clues: ['Especias intensas: pimienta y centeno', 'Seco y robusto, menos dulce que el bourbon', 'Menta, anís y frutas secas', 'Popular en cócteles como el Manhattan'],
    answers: ['Rye Whiskey', 'Bourbon', 'Scotch Single Malt', 'Irish Whiskey'],
  },
  {
    name: 'Calvados',
    clues: ['Manzana y pera cocida', 'Canela y clavo de especias', 'Notas terrosas de Normandía', 'Brandy de fruta de hueso'],
    answers: ['Calvados', 'Cognac', 'Eau de Vie de Poire', 'Applejack'],
  },
  {
    name: 'Aquavit',
    clues: ['Alcaravea o eneldo prominente', 'Anís y hierbas escandinavas', 'Frescor y notas minerales', 'Espíritu nacional de los países nórdicos'],
    answers: ['Aquavit', 'Jenever', 'Absenta', 'Pastis'],
  },
  {
    name: 'Absenta',
    clues: ['Anís verde intenso y regaliz', 'Hierba de ajenjo (wormwood) herbácea', 'Color verde brillante natural', 'La "hada verde" del siglo XIX'],
    answers: ['Absenta', 'Pastis', 'Ouzo', 'Sambuca'],
  },
  {
    name: 'Cachaza',
    clues: ['Caña de azúcar fresca y verde', 'Notas herbáceas y terrosas', 'Ligero toque de levadura', 'Espíritu nacional de Brasil'],
    answers: ['Cachaza', 'Ron Blanco', 'Aguardiente de Caña', 'Clairin'],
  },
  {
    name: 'Armagnac',
    clues: ['Ciruela, higo y fruta seca intensa', 'Más rústico y complejo que el Cognac', 'Destilado una sola vez en alambique continuo', 'Producido en Gascuña, Francia'],
    answers: ['Armagnac', 'Cognac', 'Calvados', 'Pisco'],
  },
  {
    name: 'Whisky Japonés',
    clues: ['Delicado equilibrio floral y afrutado', 'Roble Mizunara y bambú', 'Técnica escocesa con alma japonesa', 'Producido con agua de manantiales volcánicos'],
    answers: ['Whisky Japonés', 'Scotch Blended', 'Bourbon', 'Irish Whiskey'],
  },
  {
    name: 'Irish Whiskey',
    clues: ['Suave, ligero y muy fácil de beber', 'Triple destilado, sin turba', 'Miel y malta de cebada', 'Espíritu de la Isla de Esmeralda'],
    answers: ['Irish Whiskey', 'Scotch Single Malt', 'Whisky Galés', 'Bourbon'],
  },
  {
    name: 'Vodka Premium',
    clues: ['Neutro y cristalino', 'Ligera dulzura de cereales o papa', 'Mínimo sabor, máxima pureza', 'La base de innumerables cócteles modernos'],
    answers: ['Vodka Premium', 'Ginebra sin botánicos', 'Alcohol de grano joven', 'Grappa Blanca'],
  },
  {
    name: 'Grappa',
    clues: ['Uva y piel de hollejo fermentada', 'Floral, frutal y ligeramente áspero', 'Producida en Italia con orujo de uva', 'Espíritu de las bodegas italianas'],
    answers: ['Grappa', 'Marc francés', 'Orujo español', 'Pisco'],
  },
  {
    name: 'Pisco',
    clues: ['Uvas aromáticas frescas: Italia, Moscatel', 'Flores blancas y frutas de hueso', 'Sin envejecimiento en barrica', 'Espíritu nacional de Perú y Chile'],
    answers: ['Pisco', 'Grappa Blanca', 'Cognac Joven', 'Aguardiente de Uva'],
  },
];

let bs = null;

export function startBlind() {
  const questions = [...SPIRITS].sort(() => Math.random() - 0.5);
  bs = { questions, index: 0, correct: 0, answered: 0, revealed: 1 };
  return _payload();
}

function _payload() {
  const q = bs.questions[bs.index];
  return { clues: q.clues, revealedClues: bs.revealed, answers: q.answers, correctIndex: q.answers.indexOf(q.name), index: bs.index, total: bs.questions.length, correct: bs.correct };
}

export function revealNextClue() {
  if (!bs) return null;
  const q = bs.questions[bs.index];
  bs.revealed = Math.min(bs.revealed + 1, q.clues.length);
  return _payload();
}

export function answerBlind(selectedIndex) {
  if (!bs) return null;
  const q = bs.questions[bs.index];
  const ok = selectedIndex === q.answers.indexOf(q.name);
  if (ok) bs.correct++;
  bs.answered++;
  bs.index++;
  bs.revealed = 1; // Reset clue count for the next question
  const done = bs.index >= bs.questions.length;
  return { correct: ok, correctIndex: q.answers.indexOf(q.name), selectedIndex, done, result: done ? { correct: bs.correct, total: bs.questions.length } : null, next: done ? null : _payload() };
}

export function abortBlind() { bs = null; }
