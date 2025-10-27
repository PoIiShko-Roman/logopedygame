// Дані для літери "с". Якщо цей файл присутній і масив не порожній —
// саме ці слова будуть використані у грі для літери 'с'.
// Якщо файл порожній/відсутній — гра візьме слова з js/game1-content.js.
window.G1_S = [
  // 1) Овочі
  { word: 'салат',     image: 's-salat.png',       tags: ['овочі','с','на початку'] },
  { word: 'селера',    image: 's-selera.png',      tags: ['овочі','с','в середині'] },
  { word: 'редиска',   image: 's-rediska.png',     tags: ['овочі','с','в середині'] },
  { word: 'капуста',   image: 's-kapusta.png',     tags: ['овочі','с','в середині'] },
  { word: 'часник',    image: 's-chasnyk.png',     tags: ['овочі','с','в середині'] },
  { word: 'спаржа',    image: 's-sparzha.png',     tags: ['овочі','с','на початку'] },
  { word: 'квасоля',   image: 's-kvasolya.png',    tags: ['овочі','с','в середині'] },
  { word: 'патисон',   image: 's-patysone.png',    tags: ['овочі','с','в середині'] },

  // 2) Фрукти
  { word: 'слива',     image: 's-sliva.png',       tags: ['фрукти','с','на початку'] },
  { word: 'абрикос',   image: 's-abrykos.png',     tags: ['фрукти','с','в кінці'] },
  { word: 'персик',    image: 's-persyk.png',      tags: ['фрукти','с','в середині'] },
  { word: 'апельсин',  image: 's-apelsyn.png',     tags: ['фрукти','с','в середині'] },
  { word: 'ананас',    image: 's-ananas.png',      tags: ['фрукти','с','в кінці'] },
  { word: 'смородина', image: 's-smorodyna.png',   tags: ['фрукти','с','в середині'] },
  { word: 'аґрус',     image: 's-agrus.png',       tags: ['фрукти','с','в середині'] },
  { word: 'нектарин',  image: 's-nektaryn.png',    tags: ['фрукти','с','в середині'] },

  // 3) Одяг
  { word: 'светр',     image: 's-svetr.png',       tags: ['одяг','с','на початку'] },
  { word: 'сорочка',   image: 's-sorochka.png',    tags: ['одяг','с','на початку'] },
  { word: 'спідниця',  image: 's-spidnytsya.png',  tags: ['одяг','с','на початку'] },
  { word: 'сарафан',   image: 's-sarafan.png',     tags: ['одяг','с','на початку'] },
  { word: 'костюм',    image: 's-kostyum.png',     tags: ['одяг','с','в середині'] },
  { word: 'сандалі',   image: 's-sandali.png',     tags: ['одяг','с','на початку'] },
  { word: 'кросівки',  image: 's-krosivky.png',    tags: ['одяг','с','в середині'] },
  { word: 'пояс',      image: 's-poyas.png',       tags: ['одяг','с','в кінці'] },
  { word: 'сукня',     image: 's-suknya.png',      tags: ['одяг','с','на початку'] },

  // 4) Тварини
  { word: 'собака',    image: 's-sobaka.png',      tags: ['тварина','с','на початку'] },
  { word: 'слон',      image: 's-slon.png',        tags: ['тварина','с','на початку'] },
  { word: 'лисиця',    image: 's-lysytsya.png',    tags: ['тварина','с','в середині'] },
  { word: 'свиня',     image: 's-svynya.png',      tags: ['тварина','с','на початку'] },
  { word: 'лось',      image: 's-los.png',         tags: ['тварина','с','в кінці'] },
  { word: 'борсук',    image: 's-borsuk.png',      tags: ['тварина','с','в середині'] },
  { word: 'осел',      image: 's-osel.png',        tags: ['тварина','с','в середині'] },
  { word: 'гусак',     image: 's-husak.png',       tags: ['тварина','с','в середині'] },
  { word: 'рись',      image: 's-rys.png',         tags: ['тварина','с','в кінці'] },
  { word: 'носоріг',   image: 's-nosorig.png',     tags: ['тварина','с','в середині'] },

  // 5) Птахи
  { word: 'сова',      image: 's-sova.png',        tags: ['птах','с','на початку'] },
  { word: 'сорока',    image: 's-soroka.png',      tags: ['птах','с','на початку'] },
  { word: 'синиця',    image: 's-synytsia.png',    tags: ['птах','с','на початку'] },
  { word: 'страус',    image: 's-straus.png',      tags: ['птах','с','на початку'] },
  { word: 'снігур',    image: 's-snihur.png',      tags: ['птах','с','на початку'] },
  { word: 'гусак',     image: 's-husak.png',       tags: ['птах','с','в середині'] },
  { word: 'ластівка',  image: 's-lastivka.png',    tags: ['птах','с','в середині'] },
  { word: 'сойка',     image: 's-soika.png',       tags: ['птах','с','на початку'] },
  { word: 'сокіл',     image: 's-sokil.png',       tags: ['птах','с','на початку'] },

  // 6) Посуд
  { word: 'склянка',   image: 's-sklyanka.png',    tags: ['посуд','с','на початку'] },
  { word: 'миска',     image: 's-myska.png',       tags: ['посуд','с','в середині'] },
  { word: 'сільниця',  image: 's-silnytsia.png',   tags: ['посуд','с','на початку'] },
  { word: 'серветка',  image: 's-servetka.png',    tags: ['посуд','с','в середині'] },
  { word: 'каструля',  image: 's-kastrulya.png',   tags: ['посуд','с','в середині'] },
  { word: 'посуд',     image: 's-posud.png',       tags: ['посуд','с','в середині'] },
  { word: 'сито',      image: 's-sito.png',        tags: ['посуд','с','на початку'] },
  { word: 'сковорода', image: 's-skovoroda.png',   tags: ['посуд','с','на початку'] },

  // 7) На початку слова
  { word: 'син',       image: 's-syn.png',         tags: ['с','на початку'] },
  { word: 'суп',       image: 's-sup.png',         tags: ['с','на початку'] },
  { word: 'сонце',     image: 's-sontse.png',      tags: ['с','на початку'] },
  { word: 'сани',      image: 's-sany.png',        tags: ['с','на початку'] },
  { word: 'сумка',     image: 's-sumka.png',       tags: ['с','на початку'] },
  { word: 'стіл',      image: 's-stil.png',        tags: ['с','на початку'] },
  { word: 'слон',      image: 's-slon.png',        tags: ['с','на початку'] },
  { word: 'сік',       image: 's-sik.png',         tags: ['с','на початку'] },
  { word: 'сир',       image: 's-syr.png',         tags: ['с','на початку'] },
  { word: 'сокіл',     image: 's-sokil.png',       tags: ['с','на початку'] },

  // 8) В середині слова
  { word: 'оса',       image: 's-osa.png',         tags: ['с','в середині'] },
  { word: 'коса',      image: 's-kosa.png',        tags: ['с','в середині'] },
  { word: 'масло',     image: 's-maslo.png',       tags: ['с','в середині'] },
  { word: 'лисиця',    image: 's-lysytsya.png',    tags: ['с','в середині'] },
  { word: 'колесо',    image: 's-koleso.png',      tags: ['с','в середині'] },
  { word: 'намисто',   image: 's-namysto.png',     tags: ['с','в середині'] },
  { word: 'капуста',   image: 's-kapusta.png',     tags: ['с','в середині'] },
  { word: 'персик',    image: 's-persyk.png',      tags: ['с','в середині'] },
  { word: 'гуска',     image: 's-huska.png',       tags: ['с','в середині'] },
  { word: 'сосиска',   image: 's-sosiska.png',     tags: ['с','в середині'] },

  // 9) В кінці слова
  { word: 'ліс',       image: 's-lis.png',         tags: ['с','в кінці'] },
  { word: 'ніс',       image: 's-nis.png',         tags: ['с','в кінці'] },
  { word: 'пес',       image: 's-pes.png',         tags: ['с','в кінці'] },
  { word: 'автобус',   image: 's-avtobus.png',     tags: ['с','в кінці'] },
  { word: 'ананас',    image: 's-ananas.png',      tags: ['с','в кінці'] },
  { word: 'абрикос',   image: 's-abrykos.png',     tags: ['с','в кінці'] },
  { word: 'компас',    image: 's-kompas.png',      tags: ['с','в кінці'] },
  { word: 'глобус',    image: 's-globus.png',      tags: ['с','в кінці'] },
  { word: 'кокос',     image: 's-kokos.png',       tags: ['с','в кінці'] },
  { word: 'фокус',     image: 's-fokus.png',       tags: ['с','в кінці'] }
];


