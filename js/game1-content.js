/* ФАЙЛ: js/game1-content.js
  ОПИС: База даних слів та картинок для "Гри 1".
          Містить масиви слів, шляхи до зображень та
          теги для фільтрації ("овочі", "на початку" тощо).
*/

const GAME1_CONTENT = {
    
    // ==================================
    // --- ЛІТЕРА "С" ---
    // ==================================
    "с": [
        // Кожен об'єкт - це один вагон (одна картка)
        { 
            word: "Сарафан",        // Слово на вагоні
            image: "s-sarafan.png", // Назва файлу картинки в 'image/game1/'
            tags: ["одяг", "с", "на початку"] // Теги для фільтрації
        },
        { word: "Сорочка", image: "s-sorochka.png", tags: ["одяг", "с", "на початку"] },
        { word: "Спідниця", image: "s-spidnytsya.png", tags: ["одяг", "с", "на початку"] },
        { word: "Светр", image: "s-svetr.png", tags: ["одяг", "с", "на початку"] },
        { word: "Сандалі", image: "s-sandali.png", tags: ["одяг", "с", "на початку"] },
        { word: "Стрічка", image: "s-strichka.png", tags: ["одяг", "с", "на початку"] },
        { word: "Пояс", image: "s-poyas.png", tags: ["одяг", "с", "в кінці"] },
        { word: "Костюм", image: "s-kostyum.png", tags: ["одяг", "с", "в середині"] },
        { word: "Блузка", image: "s-bluzka.png", tags: ["одяг", "с", "в середині"] },
        { word: "Хустка", image: "s-khustka.png", tags: ["одяг", "с", "в середині"] },
        
        // Тварини (10)
        { word: "Слон", image: "s-slon.png", tags: ["тварина", "с", "на початку"] },
        { word: "Собака", image: "s-sobaka.png", tags: ["тварина", "с", "на початку"] },
        { word: "Свиня", image: "s-svynya.png", tags: ["тварина", "с", "на початку"] },
        { word: "Скорпіон", image: "s-skorpion.png", tags: ["тварина", "с", "на початку"] },
        { word: "Скарабей", image: "s-skarabey.png", tags: ["тварина", "с", "на початку"] },
        { word: "Скат", image: "s-skat.png", tags: ["тварина", "с", "на початку"] },
        { word: "Лисиця", image: "s-lysytsya.png", tags: ["тварина", "с", "в середині"] },
        { word: "Оса", image: "s-osa.png", tags: ["тварина", "с", "в середині"] },
        { word: "Носоріг", image: "s-nosorig.png", tags: ["тварина", "с", "в середині"] },
        { word: "Лось", image: "s-los.png", tags: ["тварина", "с", "в кінці"] },
        
        // Птахи (11)
        { word: "Сова", image: "s-sova.png", tags: ["птах", "с", "на початку"] },
        { word: "Страус", image: "s-straus.png", tags: ["птах", "с", "на початку"] },
        { word: "Сокіл", image: "s-sokil.png", tags: ["птах", "с", "на початку"] },
        { word: "Снігур", image: "s-snigur.png", tags: ["птах", "с", "на початку"] },
        { word: "Синиця", image: "s-synytsya.png", tags: ["птах", "с", "на початку"] },
        { word: "Сойка", image: "s-soyka.png", tags: ["птах", "с", "на початку"] },
        { word: "Соловей", image: "s-solovey.png", tags: ["птах", "с", "на початку"] },
        { word: "Стриж", image: "s-stryzh.png", tags: ["птах", "с", "на початку"] },
        { word: "Сич", image: "s-sych.png", tags: ["птах", "с", "на початку"] },
        { word: "Гуска", image: "s-guska.png", tags: ["птах", "с", "в середині"] },
        { word: "Ластівка", image: "s-lastivka.png", tags: ["птах", "с", "в середині"] },
        
        // Посуд (10)
        { word: "Склянка", image: "s-sklyanka.png", tags: ["посуд", "с", "на початку"] },
        { word: "Салатник", image: "s-salatnyk.png", tags: ["посуд", "с", "на початку"] },
        { word: "Сервіз", image: "s-serviz.png", tags: ["посуд", "с", "на початку"] },
        { word: "Сковорода", image: "s-skovoroda.png", tags: ["посуд", "с", "на початку"] },
        { word: "Ситечко", image: "s-sytechko.png", tags: ["посуд", "с", "на початку"] },
        { word: "Салфетка", image: "s-salfetka.png", tags: ["посуд", "с", "на початку"] },
        { word: "Сільничка", image: "s-silnychka.png", tags: ["посуд", "с", "на початку"] },
        { word: "Піднос", image: "s-pidnos.png", tags: ["посуд", "с", "в кінці"] },
        { word: "Миска", image: "s-myska.png", tags: ["посуд", "с", "в середині"] },
        { word: "Каструля", image: "s-kastrulya.png", tags: ["посуд", "с", "в середині"] },
        
        // Фрукти (10)
        { word: "Слива", image: "s-slyva.png", tags: ["фрукти", "с", "на початку"] },
        { word: "Смородина", image: "s-smorodyna.png", tags: ["фрукти", "с", "на початку"] },
        { word: "Суниця", image: "s-sunytsya.png", tags: ["фрукти", "с", "на початку"] },
        { word: "Абрикос", image: "s-abrykos.png", tags: ["фрукти", "с", "в кінці"] },
        { word: "Ананас", image: "s-ananas.png", tags: ["фрукти", "с", "в кінці"] },
        { word: "Кокос", image: "s-kokos.png", tags: ["фрукти", "с", "в кінці"] },
        { word: "Аґрус", image: "s-agrus.png", tags: ["фрукти", "с", "в кінці"] },
        { word: "Персик", image: "s-persyk.png", tags: ["фрукти", "с", "в середині"] },
        { word: "Апельсин", image: "s-apelsyn.png", tags: ["фрукти", "с", "в середині"] },
        { word: "Фісташка", image: "s-fistashka.png", tags: ["фрукти", "с", "в середині"] },
        
        // Овочі (10)
        { word: "Салат", image: "s-salat.png", tags: ["овочі", "с", "на початку"] },
        { word: "Селера", image: "s-selera.png", tags: ["овочі", "с", "на початку"] },
        { word: "Спаржа", image: "s-sparzha.png", tags: ["овочі", "с", "на початку"] },
        { word: "Соя", image: "s-soya.png", tags: ["овочі", "с", "на початку"] },
        { word: "Сочевиця", image: "s-sochevytsya.png", tags: ["овочі", "с", "на початку"] },
        { word: "Редиска", image: "s-redyska.png", tags: ["овочі", "с", "в середині"] },
        { word: "Капуста", image: "s-kapusta.png", tags: ["овочі", "с", "в середині"] },
        { word: "Часник", image: "s-chasnyk.png", tags: ["овочі", "с", "в середині"] },
        { word: "Патисон", image: "s-patyson.png", tags: ["овочі", "с", "в середині"] },
        { word: "Квасоля", image: "s-kvasolya.png", tags: ["овочі", "с", "в середині"] },
        
        // Додаткові слова для гри (для фільтрів "на початку", "в кінці"...)
        { word: "Сир", image: "s-syr.png", tags: ["їжа", "с", "на початку"] },
        { word: "Сік", image: "s-sik.png", tags: ["їжа", "с", "на початку"] },
        { word: "Суп", image: "s-sup.png", tags: ["їжа", "с", "на початку"] },
        { word: "Стіл", image: "s-stil.png", tags: ["речі", "с", "на початку"] },
        { word: "Стілець", image: "s-stilets.png", tags: ["речі", "с", "на початку"] },
        { word: "Сонце", image: "s-sontse.png", tags: ["природа", "с", "на початку"] },
        { word: "Сніг", image: "s-snig.png", tags: ["природа", "с", "на початку"] },
        { word: "Рис", image: "s-rys.png", tags: ["їжа", "с", "в кінці"] },
        { word: "Автобус", image: "s-avtobus.png", tags: ["речі", "с", "в кінці"] },
        { word: "Клас", image: "s-klas.png", tags: ["речі", "с", "в кінці"] },
        { word: "Компас", image: "s-kompas.png", tags: ["речі", "с", "в кінці"] },
        { word: "Глобус", image: "s-globus.png", tags: ["речі", "с", "в кінці"] },
        { word: "Маска", image: "s-maska.png", tags: ["речі", "с", "в середині"] },
        { word: "Казка", image: "s-kazka.png", tags: ["речі", "с", "в середині"] },
        { word: "Пилосос", image: "s-pylosos.png", tags: ["речі", "с", "в середині", "в кінці"] }
    ],
    
    // ==================================
    // --- ЛІТЕРА "Ш" ---
    // ==================================
    "ш": [
        // Одяг (10)
        { word: "Шапка", image: "sh-shapka.png", tags: ["одяг", "ш", "на початку"] },
        { word: "Шарф", image: "sh-sharf.png", tags: ["одяг", "ш", "на початку"] },
        { word: "Штани", image: "sh-shtany.png", tags: ["одяг", "ш", "на початку"] },
        { word: "Шорти", image: "sh-shorty.png", tags: ["одяг", "ш", "на початку"] },
        { word: "Шуба", image: "sh-shuba.png", tags: ["одяг", "ш", "на початку"] },
        { word: "Шкарпетки", image: "sh-shkarpetky.png", tags: ["одяг", "ш", "на початку"] },
        { word: "Капюшон", image: "sh-kapyushon.png", tags: ["одяг", "ш", "в середині"] },
        { word: "Рушник", image: "sh-rushnyk.png", tags: ["одяг", "ш", "в середині"] },
        { word: "Манішка", image: "sh-manishka.png", tags: ["одяг", "ш", "в середині"] },
        { word: "Плащ", image: "sh-plashch.png", tags: ["одяг", "ш", "в кінці"] },

        // Тварини (10)
        { word: "Миша", image: "sh-mysha.png", tags: ["тварина", "ш", "в середині"] },
        { word: "Кішка", image: "sh-kishka.png", tags: ["тварина", "ш", "в середині"] },
        { word: "Ведмедик", image: "sh-vedmedyk.png", tags: ["тварина", "ш", "в середині"] },
        { word: "Шиншила", image: "sh-shynshyla.png", tags: ["тварина", "ш", "на початку"] },
        { word: "Кабанчик", image: "sh-kabanchyk.png", tags: ["тварина", "ш", "в середині"] },
        { word: "Лоша", image: "sh-losha.png", tags: ["тварина", "ш", "в середині"] },
        { word: "Черепаха", image: "sh-cherepakha.png", tags: ["тварина", "ш", "в середині"] },
        { word: "Мурашка", image: "sh-murashka.png", tags: ["тварина", "ш", "в середині"] },
        { word: "Комашка", image: "sh-komashka.png", tags: ["тварина", "ш", "в середині"] },
        { word: "Йорш", image: "sh-yorsh.png", tags: ["тварина", "ш", "в кінці"] },

        // Птахи (10)
        { word: "Шпак", image: "sh-shpak.png", tags: ["птах", "ш", "на початку"] },
        { word: "Шишкар", image: "sh-shyshkar.png", tags: ["птах", "ш", "на початку", "в середині"] },
        { word: "Шуліка", image: "sh-shulika.png", tags: ["птах", "ш", "на початку"] },
        { word: "Горобець", image: "sh-horobets.png", tags: ["птах"] }, // Немає Ш
        { word: "Пташка", image: "sh-ptashka.png", tags: ["птах", "ш", "в середині"] },
        { word: "Півник", image: "sh-pivnyk.png", tags: ["птах"] }, // Немає Ш
        { word: "Голубка", image: "sh-holubka.png", tags: ["птах"] }, // Немає Ш
        { word: "Чапля", image: "sh-chaplia.png", tags: ["птах"] }, // Немає Ш
        { word: "Качка", image: "sh-kachka.png", tags: ["птах"] }, // Немає Ш
        { word: "Індик", image: "sh-indyk.png", tags: ["птах"] }, // Немає Ш
        // Додамо ще птахів без 'ш' для неправильних
        { word: "Ворона", image: "r-vorona.png", tags: ["птах", "р", "в середині"] },
        { word: "Синиця", image: "s-synytsya.png", tags: ["птах", "с", "на початку"] },
        { word: "Сова", image: "s-sova.png", tags: ["птах", "с", "на початку"] },
        { word: "Лелека", image: "sh-leleka.png", tags: ["птах"] },

        // Посуд (10)
        { word: "Чашка", image: "sh-chashka.png", tags: ["посуд", "ш", "в середині"] },
        { word: "Ложка", image: "sh-lozhka.png", tags: ["посуд"] }, // Немає Ш
        { word: "Кружка", image: "sh-kruzhka.png", tags: ["посуд"] }, // Немає Ш
        { word: "Пляшка", image: "sh-plyashka.png", tags: ["посуд", "ш", "в середині"] },
        { word: "Ківш", image: "sh-kivsh.png", tags: ["посуд", "ш", "в кінці"] },
        { word: "Ніж", image: "sh-nizh.png", tags: ["посуд"] }, // Немає Ш
        { word: "Штопор", image: "sh-shtopor.png", tags: ["посуд", "ш", "на початку"] },
        { word: "Шампур", image: "sh-shampur.png", tags: ["посуд", "ш", "на початку"] },
        { word: "Друшляк", image: "sh-drushlyak.png", tags: ["посуд", "ш", "в середині"] },
        { word: "Горщик", image: "sh-horshchyk.png", tags: ["посуд", "ш", "в середині"] },

        // Фрукти (10)
        { word: "Вишня", image: "sh-vyshnya.png", tags: ["фрукти", "ш", "в середині"] },
        { word: "Черешня", image: "sh-chereshnya.png", tags: ["фрукти", "ш", "в середині"] },
        { word: "Шовковиця", image: "sh-shovkovytsya.png", tags: ["фрукти", "ш", "на початку"] },
        { word: "Шипшина", image: "sh-shypshyna.png", tags: ["фрукти", "ш", "на початку", "в середині"] },
        { word: "Груша", image: "sh-hrusha.png", tags: ["фрукти", "ш", "в середині"] },
        { word: "Яблуко", image: "sh-yabluko.png", tags: ["фрукти"] }, // Немає Ш
        { word: "Слива", image: "s-slyva.png", tags: ["фрукти", "с", "на початку"] }, // Немає Ш
        { word: "Персик", image: "s-persyk.png", tags: ["фрукти", "с", "в середині"] }, // Немає Ш
        { word: "Абрикос", image: "s-abrykos.png", tags: ["фрукти", "с", "в кінці"] }, // Немає Ш
        { word: "Полуниця", image: "sh-polunytsya.png", tags: ["фрукти"] }, // Немає Ш

        // Овочі (10)
        { word: "Картопля", image: "sh-kartoplya.png", tags: ["овочі"] }, // Немає Ш
        { word: "Капуста", image: "s-kapusta.png", tags: ["овочі", "с", "в середині"] }, // Немає Ш
        { word: "Морква", image: "r-morkva.png", tags: ["овочі", "р", "в середині"] }, // Немає Ш
        { word: "Буряк", image: "r-buryak.png", tags: ["овочі", "р", "в середині"] }, // Немає Ш
        { word: "Горошок", image: "sh-horoshok.png", tags: ["овочі", "ш", "в середині"] },
        { word: "Кабачок", image: "sh-kabachok.png", tags: ["овочі"] }, // Немає Ш
        { word: "Баклажан", image: "sh-baklazhan.png", tags: ["овочі"] }, // Немає Ш
        { word: "Цибуля", image: "sh-tsibulya.png", tags: ["овочі"] }, // Немає Ш
        { word: "Часник", image: "s-chasnyk.png", tags: ["овочі", "с", "в середині"] }, // Немає Ш
        { word: "Петрушка", image: "sh-petrushka.png", tags: ["овочі", "ш", "в середині"] },
        // Додамо ще овочів з 'ш'
        { word: "Шпинат", image: "sh-shpynat.png", tags: ["овочі", "ш", "на початку"] },
        { word: "Кріп", image: "sh-krip.png", tags: ["овочі"] }, // Немає Ш
        { word: "Пастернак", image: "sh-pasternak.png", tags: ["овочі"] }, // Немає Ш
        { word: "Гарбуз", image: "sh-harbuz.png", tags: ["овочі"] }, // Немає Ш

        // Додаткові слова (для "на початку", "в кінці"...)
        { word: "Школа", image: "sh-shkola.png", tags: ["речі", "ш", "на початку"] },
        { word: "Машина", image: "sh-mashyna.png", tags: ["речі", "ш", "в середині"] },
        { word: "Дах", image: "sh-dakh.png", tags: ["речі"] }, // Немає Ш
        { word: "Стіл", image: "s-stil.png", tags: ["речі", "с", "на початку"] }, // Немає Ш
        { word: "Стілець", image: "s-stilets.png", tags: ["речі", "с", "на початку"] }, // Немає Ш
        { word: "Шафа", image: "sh-shafa.png", tags: ["речі", "ш", "на початку"] },
        { word: "Подушка", image: "sh-podushka.png", tags: ["речі", "ш", "в середині"] },
        { word: "Ліжко", image: "sh-lizhko.png", tags: ["речі"] }, // Немає Ш
        { word: "Душ", image: "sh-dush.png", tags: ["речі", "ш", "в кінці"] },
        { word: "Шишка", image: "sh-shyshka.png", tags: ["природа", "ш", "на початку", "в середині"] },
        { word: "Камінь", image: "sh-kamin.png", tags: ["природа"] }, // Немає Ш
        { word: "Сонечко", image: "sh-sonechko.png", tags: ["природа"] }, // Немає Ш
        { word: "Дощик", image: "sh-doshchyk.png", tags: ["природа", "ш", "в середині"] },
        { word: "Шия", image: "sh-shyia.png", tags: ["тіло", "ш", "на початку"] },
        { word: "Вушка", image: "sh-vushka.png", tags: ["тіло", "ш", "в середині"] },
        { word: "Ніс", image: "s-nis.png", tags: ["тіло", "с", "в кінці"] }, // Немає Ш
        { word: "Живіт", image: "sh-zhyvit.png", tags: ["тіло"] }, // Немає Ш
    ],
    
    // ==================================
    // --- ЛІТЕРА "Р" ---
    // ==================================
    "р": [
        // Одяг (10)
        { word: "Сорочка", image: "r-sorochka.png", tags: ["одяг", "р", "в середині"] },
        { word: "Светр", image: "r-svetr.png", tags: ["одяг", "р", "в кінці"] },
        { word: "Шарф", image: "r-sharf.png", tags: ["одяг", "р", "в середині"] },
        { word: "Рукавиці", image: "r-rukavytsi.png", tags: ["одяг", "р", "на початку"] },
        { word: "Ремінь", image: "r-remin.png", tags: ["одяг", "р", "на початку"] },
        { word: "Брюки", image: "r-bryuky.png", tags: ["одяг", "р", "в середині"] },
        { word: "Фартух", image: "r-fartukh.png", tags: ["одяг", "р", "в середині"] },
        { word: "Халат", image: "r-khalat.png", tags: ["одяг"] }, // Немає Р
        { word: "Шапка", image: "sh-shapka.png", tags: ["одяг", "ш", "на початку"] }, // Немає Р
        { word: "Шуба", image: "sh-shuba.png", tags: ["одяг", "ш", "на початку"] }, // Немає Р
        { word: "Комір", image: "r-komir.png", tags: ["одяг", "р", "в кінці"] },
        { word: "Шкарпетки", image: "r-shkarpetky.png", tags: ["одяг", "р", "в середині"] },
        { word: "Сарафан", image: "r-sarafan.png", tags: ["одяг", "р", "в середині"] },
        { word: "Куртка", image: "r-kurtka.png", tags: ["одяг", "р", "в середині"] },

        // Тварини (10)
        { word: "Риба", image: "r-ryba.png", tags: ["тварина", "р", "на початку"] },
        { word: "Рак", image: "r-rak.png", tags: ["тварина", "р", "на початку"] },
        { word: "Рись", image: "r-rys.png", tags: ["тварина", "р", "на початку"] },
        { word: "Носоріг", image: "r-nosorig.png", tags: ["тварина", "р", "в середині"] },
        { word: "Тигр", image: "r-tyhr.png", tags: ["тварина", "р", "в кінці"] },
        { word: "Кріт", image: "r-krit.png", tags: ["тварина", "р", "в середині"] },
        { word: "Зебра", image: "r-zebra.png", tags: ["тварина", "р", "в середині"] },
        { word: "Жираф", image: "r-zhyraf.png", tags: ["тварина", "р", "в середині"] },
        { word: "Кенгуру", image: "r-kenguru.png", tags: ["тварина", "р", "в кінці"] },
        { word: "Барсук", image: "r-barsuk.png", tags: ["тварина", "р", "в середині"] },
        { word: "Слон", image: "s-slon.png", tags: ["тварина", "с", "на початку"] }, // Немає Р
        { word: "Миша", image: "sh-mysha.png", tags: ["тварина", "ш", "в середині"] }, // Немає Р
        
        // Птахи (10)
        { word: "Ворона", image: "r-vorona.png", tags: ["птах", "р", "в середині"] },
        { word: "Сорока", image: "r-soroka.png", tags: ["птах", "р", "в середині"] },
        { word: "Горобець", image: "r-horobets.png", tags: ["птах", "р", "в середині"] },
        { word: "Страус", image: "r-straus.png", tags: ["птах", "р", "в середині"] },
        { word: "Орел", image: "r-orel.png", tags: ["птах"] }, // Немає Р (Орел)
        { word: "Курка", image: "r-kurka.png", tags: ["птах", "р", "в середині"] },
        { word: "Грак", image: "r-hrak.png", tags: ["птах", "р", "в середині"] },
        { word: "Тетерук", image: "r-teteruk.png", tags: ["птах", "р", "в середині", "в кінці"] },
        { word: "Рябчик", image: "r-ryabchyk.png", tags: ["птах", "р", "на початку"] },
        { word: "Снігур", image: "r-snihur.png", tags: ["птах", "р", "в кінці"] },
        { word: "Сова", image: "s-sova.png", tags: ["птах", "с", "на початку"] }, // Немає Р
        { word: "Качка", image: "sh-kachka.png", tags: ["птах"] }, // Немає Р

        // Посуд (10)
        { word: "Тарілка", image: "r-tarilka.png", tags: ["посуд", "р", "в середині"] },
        { word: "Каструля", image: "r-kastrulya.png", tags: ["посуд", "р", "в середині"] },
        { word: "Сковорода", image: "r-skovoroda.png", tags: ["посуд", "р", "в середині"] },
        { word: "Терка", image: "r-terka.png", tags: ["посуд", "р", "в середині"] },
        { word: "Сервіз", image: "r-serviz.png", tags: ["посуд", "р", "в середині"] },
        { word: "Друшляк", image: "r-drushlyak.png", tags: ["посуд", "р", "в середині"] },
        { word: "Кружка", image: "r-kruzhka.png", tags: ["посуд", "р", "в середині"] },
        { word: "Ложка", image: "sh-lozhka.png", tags: ["посуд"] }, // Немає Р
        { word: "Чашка", image: "sh-chashka.png", tags: ["посуд", "ш", "в середині"] }, // Немає Р
        { word: "Ніж", image: "sh-nizh.png", tags: ["посуд"] }, // Немає Р
        { word: "Виделка", image: "r-vydelka.png", tags: ["посуд"] }, // Немає Р

        // Фрукти (10)
        { word: "Абрикос", image: "r-abrykos.png", tags: ["фрукти", "р", "в середині"] },
        { word: "Персик", image: "r-persyk.png", tags: ["фрукти", "р", "в середині"] },
        { word: "Виноград", image: "r-vynohrad.png", tags: ["фрукти", "р", "в середині"] },
        { word: "Гранат", image: "r-hranat.png", tags: ["фрукти", "р", "в середині"] },
        { word: "Груша", image: "r-hrusha.png", tags: ["фрукти", "р", "в середині"] },
        { word: "Смородина", image: "r-smorodyna.png", tags: ["фрукти", "р", "в середині"] },
        { word: "Черешня", image: "r-chereshnya.png", tags: ["фрукти", "р", "в середині"] },
        { word: "Порічки", image: "r-porichky.png", tags: ["фрукти", "р", "в середині"] },
        { word: "Нектарин", image: "r-nektaryn.png", tags: ["фрукти", "р", "в кінці"] },
        { word: "Яблуко", image: "sh-yabluko.png", tags: ["фрукти"] }, // Немає Р
        { word: "Слива", image: "s-slyva.png", tags: ["фрукти", "с", "на початку"] }, // Немає Р
        
        // Овочі (10)
        { word: "Морква", image: "r-morkva.png", tags: ["овочі", "р", "в середині"] },
        { word: "Буряк", image: "r-buryak.png", tags: ["овочі", "р", "в середині"] },
        { word: "Картопля", image: "r-kartoplya.png", tags: ["овочі", "р", "в середині"] },
        { word: "Помідор", image: "r-pomidor.png", tags: ["овочі", "р", "в кінці"] },
        { word: "Огірок", image: "r-ohirok.png", tags: ["овочі", "р", "в середині"] },
        { word: "Перець", image: "r-perets.png", tags: ["овочі", "р", "в середині"] },
        { word: "Петрушка", image: "r-petrushka.png", tags: ["овочі", "р", "в середині"] },
        { word: "Редиска", image: "r-redyska.png", tags: ["овочі", "р", "на початку"] },
        { word: "Редька", image: "r-redka.png", tags: ["овочі", "р", "на початку"] },
        { word: "Гарбуз", image: "r-harbuz.png", tags: ["овочі", "р", "в середині"] },
        { word: "Капуста", image: "s-kapusta.png", tags: ["овочі", "с", "в середині"] }, // Немає Р
        { word: "Часник", image: "s-chasnyk.png", tags: ["овочі", "с", "в середині"] }, // Немає Р

        // Додаткові слова
        { word: "Дерево", image: "r-derevo.png", tags: ["природа", "р", "в середині"] },
        { word: "Трава", image: "r-trava.png", tags: ["природа", "р", "в середині"] },
        { word: "Річка", image: "r-richka.png", tags: ["природа", "р", "на початку"] },
        { word: "Гора", image: "r-hora.png", tags: ["природа", "р", "в середині"] },
        { word: "Хмара", image: "r-khmara.png", tags: ["природа", "р", "в кінці"] },
        { word: "Веселка", image: "r-veselka.png", tags: ["природа"] }, // Немає Р
        { word: "Рука", image: "r-ruka.png", tags: ["тіло", "р", "на початку"] },
        { word: "Серце", image: "r-sertse.png", tags: ["тіло", "р", "в середині"] },
        { word: "Рот", image: "r-rot.png", tags: ["тіло", "р", "на початку"] },
        { word: "Брови", image: "r-brovy.png", tags: ["тіло", "р", "в середині"] },
        { word: "Горло", image: "r-horlo.png", tags: ["тіло", "р", "в середині"] },
    ]
};

