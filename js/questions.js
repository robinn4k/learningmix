export const rounds = [
  {
    id: 1,
    title: "IBA Clásicos",
    subtitle: "Cócteles Oficiales IBA",
    icon: "🍸",
    color: "#c9971c",
    questions: [
      { q: "¿Cuántas categorías de cócteles oficiales reconoce la IBA?", a: ["3", "2", "4", "5"], exp: "La IBA reconoce 3 categorías: 'The Unforgettables', 'Contemporary Classics' y 'New Era Drinks'." },
      { q: "¿Cuál es el espíritu base del Negroni?", a: ["Ginebra", "Vodka", "Ron", "Whisky"], exp: "El Negroni clásico se elabora con ginebra, Campari y vermut dulce en proporciones iguales." },
      { q: "¿Qué cóctel IBA lleva tequila, triple sec y zumo de lima?", a: ["Margarita", "Cosmopolitan", "Daiquiri", "Gimlet"], exp: "La Margarita es uno de los cócteles IBA más famosos, con tequila, triple sec y lima." },
      { q: "¿Cuál es el ingrediente que distingue al Sazerac?", a: ["Un lavado de absenta", "Vermut seco", "Bitters de naranja", "Sirope de granadina"], exp: "El Sazerac se sirve en una copa lavada con absenta, lo que le da su aroma único." },
      { q: "¿Qué significa IBA?", a: ["International Bartenders Association", "International Bar Alliance", "Institute of Beverage Arts", "International Brewing Academy"], exp: "IBA son las siglas de International Bartenders Association, fundada en 1951." },
      { q: "¿Qué cóctel IBA se elabora con champán y cognac?", a: ["Champagne Cocktail", "French 75", "Kir Royale", "Bellini"], exp: "El Champagne Cocktail clásico IBA lleva un terrón de azúcar, Angostura bitters, cognac y champán." },
      { q: "¿Cuál es el cóctel IBA que contiene Campari, vermut dulce y ginebra?", a: ["Negroni", "Americano", "Boulevardier", "Aperol Spritz"], exp: "El Negroni es la mezcla perfecta de ginebra, Campari y vermut dulce." },
      { q: "¿Qué cóctel IBA se sirve en un vaso largo con ron, menta, lima y agua con gas?", a: ["Mojito", "Caipirinha", "Dark and Stormy", "Ti' Punch"], exp: "El Mojito cubano es uno de los cócteles más populares del mundo, con ron blanco, menta, lima y soda." },
      { q: "¿Qué cóctel IBA lleva vodka, zumo de tomate y especias?", a: ["Bloody Mary", "Harvey Wallbanger", "Sea Breeze", "Cosmopolitan"], exp: "El Bloody Mary es el cóctel revitalizante por excelencia, con vodka y zumo de tomate." },
      { q: "El Dry Martini IBA se elabora con ginebra y...", a: ["Vermut seco", "Vermut dulce", "Triple sec", "Cointreau"], exp: "El Dry Martini clásico IBA combina ginebra con vermut seco y se decora con una aceituna o corteza de limón." }
    ]
  },
  {
    id: 2,
    title: "Espíritus Clásicos",
    subtitle: "Destilados del Mundo",
    icon: "🥃",
    color: "#a0522d",
    questions: [
      { q: "¿Qué porcentaje mínimo de maíz debe contener el bourbon?", a: ["51%", "60%", "70%", "80%"], exp: "Para ser clasificado como bourbon, el mash bill debe contener al menos un 51% de maíz." },
      { q: "¿De qué planta se elabora el tequila?", a: ["Agave azul", "Mezcal agave", "Maguey", "Nopal"], exp: "El tequila solo puede elaborarse con Agave Tequilana Weber, variedad azul, en determinadas regiones de México." },
      { q: "¿Cuántos años debe envejecer mínimo el Scotch Whisky?", a: ["3 años", "5 años", "10 años", "1 año"], exp: "La ley escocesa exige un mínimo de 3 años de envejecimiento en barricas de roble." },
      { q: "¿Qué es el Cognac?", a: ["Un brandy francés de la región de Cognac", "Un ron añejo francés", "Un calvados envejecido", "Un armagnac premium"], exp: "El Cognac es un brandy de vino elaborado en la región de Cognac, en el departamento de Charente, Francia." },
      { q: "¿En qué se diferencia el mezcal del tequila?", a: ["El mezcal puede hacerse con cualquier agave; el tequila solo con agave azul", "El mezcal es más dulce", "El tequila tiene más ABV", "Solo difieren en la región"], exp: "El mezcal puede producirse con más de 30 variedades de agave, mientras el tequila usa exclusivamente agave azul." },
      { q: "¿Qué es el ABV?", a: ["Alcohol By Volume (Alcohol por Volumen)", "Average Barrel Value", "Aged Barrel Vintage", "Alcohol Base Value"], exp: "ABV significa Alcohol By Volume y expresa el porcentaje de etanol en una bebida." },
      { q: "¿Qué botánico es imprescindible en la ginebra?", a: ["Enebro (Juniper)", "Cilantro", "Angélica", "Cardamomo"], exp: "Por ley, la ginebra debe tener como botánico predominante el enebro (Juniperus communis)." },
      { q: "¿Cuál es la materia prima del ron?", a: ["Caña de azúcar", "Agave", "Cebada", "Maíz"], exp: "El ron se destila a partir de jugo de caña de azúcar o melaza, subproducto de la fabricación de azúcar." },
      { q: "¿Qué botánico característico tiene el aquavit?", a: ["Alcaravea o eneldo", "Enebro", "Anís", "Hinojo"], exp: "El aquavit escandinavo debe su sabor característico a la alcaravea (caraway) o al eneldo." },
      { q: "¿Qué es el calvados?", a: ["Brandy de manzana de Normandía", "Sidra destilada de Bretaña", "Ron de manzana del Caribe", "Licor de pera alsaciano"], exp: "El Calvados es una denominación de origen protegida para el brandy de sidra de manzana producido en Normandía, Francia." }
    ]
  },
  {
    id: 3,
    title: "Técnicas de Bar",
    subtitle: "Arte de la Coctelería",
    icon: "🔀",
    color: "#2980b9",
    questions: [
      { q: "¿Qué significa 'muddling' en coctelería?", a: ["Machacar ingredientes en el vaso", "Agitar con hielo", "Colar la bebida", "Flambear el cóctel"], exp: "El muddling consiste en machacar suavemente frutas, hierbas o azúcar en el fondo del vaso para extraer sus aromas y jugos." },
      { q: "¿Cuál es la diferencia principal entre agitar y remover un cóctel?", a: ["Agitar incorpora más aire y dilución; remover es más sutil", "Agitar conserva la temperatura mejor", "Remover mezcla más rápido", "No hay diferencia significativa"], exp: "Agitar oxigena la bebida y diluye más rápidamente; remover es para cócteles más delicados que no deben turbarse." },
      { q: "¿Qué es un 'dry shake'?", a: ["Agitar sin hielo, generalmente con clara de huevo", "Agitar con hielo seco", "Batir sin ingredientes alcohólicos", "Agitar en coctelera seca"], exp: "El dry shake (sin hielo) se usa para emulsionar clara de huevo o crema antes de añadir hielo, logrando mejor textura." },
      { q: "¿Qué técnica consiste en verter lentamente sobre una cuchara para crear capas?", a: ["Floating (flotado)", "Rolling (rodado)", "Straining (colado)", "Muddling"], exp: "El floating usa una cuchara de bar para guiar el líquido suavemente y crear capas de densidades distintas." },
      { q: "¿Qué significa pedir un cóctel 'on the rocks'?", a: ["Servido sobre cubitos de hielo", "Sin hielo, a temperatura ambiente", "Con hielo triturado", "Con hielo esférico"], exp: "'On the rocks' significa que el cóctel se sirve directamente sobre cubitos de hielo en el vaso." },
      { q: "¿Qué es el 'fat washing'?", a: ["Infusionar un destilado con grasa para añadir sabor", "Limpiar el vaso con grasa", "Técnica de filtración con mantequilla", "Añadir aceite de coco al cóctel"], exp: "El fat washing es una técnica donde se mezcla una grasa (mantequilla, bacon, etc.) con un destilado y luego se congela para separar y filtrar la grasa, dejando el sabor." },
      { q: "¿Qué significa 'neat' al pedir un destilado?", a: ["Solo el destilado, sin hielo ni mezcla", "Con un poco de agua", "Muy frío, sin hielo", "Con una pizca de sal"], exp: "'Neat' significa el espíritu tal cual, sin hielo, sin agua y sin ningún otro ingrediente." },
      { q: "¿Cuál es el propósito del 'rolling' en coctelería?", a: ["Mezclar suavemente vertiendo entre dos recipientes", "Agitar con movimiento circular", "Rodar la coctelera sobre la barra", "Verter sobre una piedra de hielo"], exp: "El rolling consiste en verter el cóctel de un recipiente a otro varias veces para mezclar con suavidad y mínima dilución." },
      { q: "¿Qué es 'express' una piel de cítrico en un cóctel?", a: ["Torcer la piel sobre el vaso para liberar aceites esenciales", "Exprimir el zumo de la fruta", "Rallar la piel sobre la bebida", "Quemar la piel cerca del vaso"], exp: "Al expressar la piel, se tuerce sobre el cóctel para liberar los aceites aromáticos esenciales que flotan en la superficie." },
      { q: "¿Cuántos segundos aproximados tarda en enfriarse un cóctel bien agitado con hielo?", a: ["10-15 segundos", "30-45 segundos", "5 segundos", "60 segundos"], exp: "Agitar enérgicamente durante 10-15 segundos es suficiente para enfriar correctamente un cóctel y conseguir la dilución adecuada." }
    ]
  },
  {
    id: 4,
    title: "Cristalería & Herramientas",
    subtitle: "El Equipo del Bartender",
    icon: "🫗",
    color: "#27ae60",
    questions: [
      { q: "¿Qué tipo de copa se usa para un Martini clásico?", a: ["Copa de Martini (cóctel)", "Copa de champán tipo flauta", "Copa de balón", "Vaso highball"], exp: "El Martini se sirve en la copa de cóctel o Martini, con su icónica forma triangular y tallo largo." },
      { q: "¿Qué es un jigger?", a: ["Medidor de doble copa para porciones exactas", "Colador de malla fina", "Cucharilla larga de bar", "Tipo de coctelera pequeña"], exp: "El jigger es el medidor estándar del bartender, generalmente con dos compartimentos de diferente volumen (1oz y 1.5oz o similar)." },
      { q: "¿Para qué sirve el colador Hawthorne?", a: ["Colar la bebida reteniendo hielo y pulpa con su resorte", "Medir el volumen del cóctel", "Añadir el hielo al vaso", "Remover ingredientes en la coctelera"], exp: "El colador Hawthorne tiene un resorte metálico que retiene hielo, frutas y hierbas al verter el cóctel en el vaso." },
      { q: "¿Cuál es la diferencia entre una copa de flauta y una copa coupe?", a: ["La flauta conserva las burbujas; la coupe es ancha y plana", "La coupe es para champán; la flauta para espumosos", "Son intercambiables sin diferencia", "La flauta tiene más capacidad"], exp: "La flauta alarga el camino de las burbujas preservando el carbónico; la coupe es retro, ancha y permite mejor nariz pero pierde gas rápido." },
      { q: "¿Qué capacidad tiene un 'shot' estándar en España?", a: ["30-40 ml", "25 ml", "50 ml", "20 ml"], exp: "En España, un shot o chupito estándar es de 30-40 ml, aunque puede variar por establecimiento." },
      { q: "¿Para qué se usa el muddler?", a: ["Machacar frutas, hierbas y azúcar en el vaso", "Remover el cóctel", "Medir los ingredientes", "Decorar el borde del vaso"], exp: "El muddler (pisón) es una herramienta de madera, plástico o acero inoxidable para machacar ingredientes y liberar sus jugos y aromas." },
      { q: "¿Cuál es la función principal de la cucharilla de bar larga?", a: ["Remover cócteles y medir pequeñas cantidades", "Solo decoración", "Servir como muddler pequeño", "Medir el ABV"], exp: "La cucharilla larga permite remover en vasos altos sin salpicaduras y su volumen estándar (5ml) sirve como medida." },
      { q: "¿Qué es una 'Boston Shaker'?", a: ["Sistema de dos piezas: tin de metal + vaso de cristal o tin", "Coctelera de tres piezas con colador integrado", "Tipo de coctelera para dos personas", "Coctelera especial para cócteles calientes"], exp: "La Boston Shaker consta de dos recipientes (generalmente dos tins o un tin y un vaso) que encajan herméticamente para agitar." },
      { q: "¿En qué vaso se sirve un Cuba Libre?", a: ["Vaso highball", "Vaso old fashioned", "Copa de Martini", "Copa de balón"], exp: "El Cuba Libre (ron, cola, lima) se sirve en vaso highball, un vaso alto y recto de unos 250-350 ml." },
      { q: "¿Qué es un 'strainer' de Julep?", a: ["Colador de dientes de metal sin resorte para vasos de mezcla", "Colador Hawthorne más pequeño", "Tipo de malla fina para pulpa", "Tapón perforado de la coctelera"], exp: "El Julep strainer es un colador simple de metal con agujeros, diseñado para encajar en el vaso de mezcla o mixing glass." }
    ]
  },
  {
    id: 5,
    title: "Historia del Cóctel",
    subtitle: "Orígenes & Leyendas",
    icon: "📜",
    color: "#8e44ad",
    questions: [
      { q: "¿En qué año se publicó el primer libro de recetas de cócteles reconocido?", a: ["1862", "1920", "1880", "1910"], exp: "'The Bartender's Guide' de Jerry Thomas se publicó en 1862 y es considerado el primer libro de cócteles." },
      { q: "¿Qué duró la Ley Seca (Prohibition) en Estados Unidos?", a: ["1920 a 1933", "1915 a 1930", "1925 a 1940", "1910 a 1925"], exp: "La Prohibition Act prohibió el alcohol en EE.UU. desde enero de 1920 hasta diciembre de 1933." },
      { q: "¿Dónde apareció en prensa por primera vez la palabra 'cocktail'?", a: ["The Balance, periódico de Nueva York, 1806", "The Times de Londres, 1820", "Le Monde de París, 1815", "The Boston Globe, 1800"], exp: "La primera definición escrita de 'cocktail' apareció en el periódico The Balance and Columbian Repository el 13 de mayo de 1806." },
      { q: "¿Quién escribió 'The Savoy Cocktail Book' (1930)?", a: ["Harry Craddock", "Jerry Thomas", "Dick Bradsell", "Dale DeGroff"], exp: "Harry Craddock, bartender jefe del American Bar del hotel Savoy de Londres, escribió este clásico en 1930." },
      { q: "¿En qué hotel de Singapur se inventó el Singapore Sling?", a: ["Raffles Hotel", "Marina Bay Sands", "Fullerton Hotel", "Capella Singapore"], exp: "El Singapore Sling fue creado por Ngiam Tong Boon en el Long Bar del Raffles Hotel alrededor de 1915." },
      { q: "¿Qué fue el 'bathtub gin' durante la Prohibition?", a: ["Ginebra ilegal fabricada en casa durante la Ley Seca", "Un cóctel con ginebra y agua con gas", "Ginebra envejecida en barriles", "Un destilado artesanal de alta calidad"], exp: "El bathtub gin era alcohol de baja calidad mezclado con botánicos en destilerías ilegales caseras durante la Prohibition." },
      { q: "¿Cuál se considera la 'Edad de Oro' de los cócteles?", a: ["Era victoriana / pre-Prohibition (1860-1920)", "Años 50-60 del siglo XX", "Años 80 del siglo XX", "La década de 2010"], exp: "La era pre-Prohibition, especialmente de 1860 a 1920, es la primera Edad de Oro cuando se establecieron las bases de la coctelería moderna." },
      { q: "¿Cómo se conoce a Jerry Thomas en la historia de la coctelería?", a: ["El padre de la bartería americana", "El inventor del Martini", "El creador del Negroni", "El primer sommelier de EE.UU."], exp: "Jerry Thomas, autor del primer libro de cócteles, es conocido como 'el padre de la mixología americana'." },
      { q: "¿Qué movimiento revitalizó la coctelería artesanal a principios del siglo XXI?", a: ["El movimiento craft cocktail / mixología artesanal", "El boom de los bares de tapas", "La revolución de la cerveza artesana", "El auge de los vinos naturales"], exp: "A partir de los años 2000, el movimiento craft cocktail recuperó técnicas clásicas y usó ingredientes frescos y de calidad, transformando la industria." },
      { q: "¿En qué ciudad nació el cóctel Aperol Spritz como bebida moderna popular?", a: ["Venecia / Véneto, Italia", "Milán, Italia", "Roma, Italia", "Florencia, Italia"], exp: "El Aperol Spritz tiene raíces en la tradición del Véneto italiano; Aperol se creó en Padua en 1919 y el spritz es una tradición de esta región." }
    ]
  },
  {
    id: 6,
    title: "Trópicos & Ron",
    subtitle: "El Paraíso en un Vaso",
    icon: "🌴",
    color: "#e67e22",
    questions: [
      { q: "¿Cuál es el espíritu base del Mojito?", a: ["Ron blanco", "Ron añejo", "Cachaça", "Ginebra"], exp: "El Mojito cubano clásico se elabora con ron blanco, menta fresca, lima, azúcar y agua con gas." },
      { q: "¿Dónde se inventó la Piña Colada?", a: ["Puerto Rico", "Cuba", "Jamaica", "Colombia"], exp: "La Piña Colada es el cóctel nacional de Puerto Rico, creado en San Juan en la década de 1950." },
      { q: "¿Qué significa 'Mai Tai' en tahitiano?", a: ["Fuera de este mundo / ¡Genial!", "Bebida del sol", "Néctar tropical", "Brindis de paz"], exp: "Mai Tai en tahitiano significa literalmente 'fuera de este mundo'. Al probarlo, Trader Vic dijo 'mai tai, roa ae' (fuera de este mundo, lo mejor)." },
      { q: "¿De qué se elabora la cachaça brasileña?", a: ["Jugo de caña de azúcar fresco", "Melaza de caña", "Maíz", "Yuca"], exp: "La cachaça se distingue del ron en que se destila directamente del jugo fresco de caña de azúcar, no de melaza." },
      { q: "¿Cuál es la diferencia entre ron agrícola y ron industrial?", a: ["El agrícola se destila de jugo de caña; el industrial, de melaza", "El agrícola tiene más graduación", "El industrial se envejece más tiempo", "Solo difieren en la marca"], exp: "El ron agrícola (rhum agricole) usa jugo de caña fresco y tiene un perfil herbáceo y terroso; el industrial usa melaza con un perfil más dulce." },
      { q: "¿Qué cóctel clásico lleva cachaça, lima y azúcar?", a: ["Caipirinha", "Caipiroska", "Mojito", "Daiquiri"], exp: "La Caipirinha es el cóctel nacional de Brasil: cachaça, lima cortada en trozos, azúcar blanco y hielo triturado." },
      { q: "¿Qué es el Falernum?", a: ["Sirope caribeño con lima, almendra y clavo", "Licor de coco jamaicano", "Ron con especias de Trinidad", "Bíter tropical de Barbados"], exp: "El Falernum es un sirope o licor de las Antillas con notas de lima, almendra, clavo y especias tropicales, esencial en los cócteles tiki." },
      { q: "¿Cuál es el cóctel tiki más famoso creado por Trader Vic?", a: ["Mai Tai", "Zombie", "Painkiller", "Jungle Bird"], exp: "Victor Bergeron 'Trader Vic' creó el Mai Tai en 1944 en Oakland, California, como homenaje a los sabores del Caribe." },
      { q: "¿Qué tipo de ron se usa en un Dark 'n' Stormy?", a: ["Ron oscuro de Bermuda (Gosling's)", "Ron blanco de Cuba", "Ron añejo jamaicano", "Ron especiado de las Barbados"], exp: "El Dark 'n' Stormy es una marca registrada de Gosling's de Bermuda: ron negro Gosling's y ginger beer." },
      { q: "¿Qué ingrediente es esencial en el cóctel 'Jungle Bird'?", a: ["Campari", "Aperol", "Licor de melocotón", "Blue Curaçao"], exp: "El Jungle Bird (1978, Kuala Lumpur) combina ron oscuro, Campari, zumo de piña, lime juice y sirope simple." }
    ]
  },
  {
    id: 7,
    title: "Ginebra & Tónica",
    subtitle: "El Botánico Perfecto",
    icon: "🌿",
    color: "#16a085",
    questions: [
      { q: "¿Qué es la London Dry Gin?", a: ["Estilo de ginebra sin azúcar añadido, destilada con botánicos naturales", "Ginebra producida solo en Londres", "Ginebra con predominio de cítricos", "Ginebra envejecida en barrica"], exp: "London Dry es un estilo (no un origen geográfico) que exige destilación con botánicos naturales, sin colorantes ni aromatizantes artificiales y mínimo azúcar añadido." },
      { q: "¿Por qué el agua tónica tiene sabor amargo?", a: ["Contiene quinina, originalmente antimalárica", "Lleva extracto de corteza de roble", "Tiene un alto contenido en bicarbonato", "Se elabora con agua mineral con azufre"], exp: "La quinina es el alcaloide de la corteza del árbol de quina que da su amargor característico a la tónica; los británicos en la India la usaban contra la malaria." },
      { q: "¿Qué es el sloe gin?", a: ["Licor de ginebra macerada con endrinas (sloe berries)", "Una ginebra seca y sin botánicos extra", "Ginebra de baja graduación", "Tipo de ginebra artesanal escocesa"], exp: "El sloe gin se elabora macerando endrinas (fruto del endrino) en ginebra con azúcar, produciendo un licor dulce y afrutado de color rojo." },
      { q: "¿Cuál es la diferencia entre Old Tom Gin y London Dry?", a: ["Old Tom es ligeramente más dulce; London Dry es seca", "Old Tom tiene más botánicos", "London Dry tiene más graduación", "Old Tom es de origen escocés"], exp: "Old Tom Gin, popular en el siglo XVIII, tiene un perfil más dulce que el London Dry moderno, siendo el eslabón entre el jenever holandés y la ginebra moderna." },
      { q: "¿Qué cóctel clásico lleva ginebra, zumo de limón, azúcar y soda?", a: ["Tom Collins", "Gimlet", "Southside", "Aviation"], exp: "El Tom Collins es un cóctel largo refrescante: ginebra (originalmente Old Tom), zumo de limón, sirope simple y agua con gas." },
      { q: "¿Qué hace especial a la 'Navy Strength Gin'?", a: ["Tiene una graduación de al menos 57% ABV", "Está envejecida en barrica naval", "Solo se produce en destilerías del Almirantazgo", "Contiene sal marina entre sus botánicos"], exp: "La ginebra Navy Strength (57% ABV) era la graduación que garantizaba que si se derramaba sobre la pólvora en los barcos de la Marina Real, esta aún podría encenderse." },
      { q: "¿Cuál es el botánico más utilizado en el Gin Tónica de estilo español?", a: ["Varía según el gin; enebro siempre presente", "Lavanda de Provenza", "Pimienta rosa exclusivamente", "Cardamomo verde"], exp: "España lideró el renacimiento del gin tónica, usando grandes balones de cristal, hielo en abundancia y botánicos variados que complementan el gin elegido." },
      { q: "¿En qué país se consume más ginebra per cápita?", a: ["Filipinas", "Reino Unido", "España", "Estados Unidos"], exp: "Filipinas es el mayor consumidor de ginebra per cápita del mundo, donde la marca Ginebra San Miguel domina el mercado." },
      { q: "¿Qué cóctel IBA lleva ginebra, zumo de lima o limón y crème de cassis?", a: ["Ninguno; el Aviation lleva crème de violette", "Gimlet", "Clover Club", "Bee's Knees"], exp: "El Aviation lleva ginebra, crème de violette, marrasquino y zumo de limón. El Clover Club lleva frambuesa. No confundir con crème de cassis (grosella negra)." },
      { q: "¿Qué es el jenever (genever)?", a: ["El antecesor holandés de la ginebra, más malteado y con más cuerpo", "Una ginebra alemana especiada", "Un tipo de aquavit de los Países Bajos", "Ginebra envejecida en Holanda"], exp: "El jenever holandés es el precursor histórico de la ginebra, con perfil más suave y malteado. Los soldados ingleses lo llamaban 'Dutch Courage' en el siglo XVII." }
    ]
  },
  {
    id: 8,
    title: "Whisky & Bourbon",
    subtitle: "La Nobleza de los Destilados",
    icon: "🥃",
    color: "#922b21",
    questions: [
      { q: "¿Qué significa 'single malt' en el Scotch Whisky?", a: ["Elaborado en una sola destilería con cebada malteada", "Destilado una sola vez", "Un único barril sin mezclar", "Producido solo en las Highlands"], exp: "Single Malt Scotch Whisky proviene de una única destilería, elaborado exclusivamente con cebada malteada y agua." },
      { q: "¿Qué estado de EE.UU. produce más del 90% del bourbon mundial?", a: ["Kentucky", "Tennessee", "Indiana", "Texas"], exp: "Kentucky es el corazón del bourbon, hogar de las destilerías más icónicas como Maker's Mark, Buffalo Trace y Woodford Reserve." },
      { q: "¿Qué es el 'angel's share'?", a: ["El alcohol que se evapora del barril durante el envejecimiento", "La parte que recibe el maestro destilador", "El primer destilado que se descarta", "El líquido que queda en el alambique"], exp: "El 'angel's share' (parte de los ángeles) es el porcentaje de whisky que se evapora anualmente a través del barril de madera, entre 2-5% por año." },
      { q: "¿Qué región escocesa es famosa por los whiskies turba dos e isleños?", a: ["Islay", "Speyside", "Highlands", "Lowlands"], exp: "Islay es la isla escocesa conocida por sus whiskies de intenso ahumado y turba, con destilerías como Laphroaig, Ardbeg y Bowmore." },
      { q: "¿Cuál es la diferencia entre el whisky Tennessee y el bourbon?", a: ["El Tennessee pasa por el proceso Lincoln County (filtrado con carbón de maple)", "El Tennessee se elabora en Tennessee y el bourbon en Kentucky", "El Tennessee tiene mayor contenido en maíz", "Solo difieren en el nombre comercial"], exp: "El Tennessee Whiskey (como Jack Daniel's) usa el Lincoln County Process: filtrado lento a través de carbón de maple antes del envejecimiento." },
      { q: "¿Qué cóctel clásico usa whisky de centeno (rye), vermut dulce y Angostura bitters?", a: ["Manhattan", "Old Fashioned", "Sazerac", "Whisky Sour"], exp: "El Manhattan es uno de los grandes cócteles americanos: rye whiskey o bourbon, vermut dulce y Angostura bitters, servido con una cereza." },
      { q: "¿Qué significa 'blended' en el whisky?", a: ["Mezcla de diferentes maltas y/o granos de varias destilerías", "Mezclado con agua antes de embotellar", "Un whisky con varios años de envejecimiento combinados", "Añejado en barricas de diferentes tipos de madera"], exp: "El whisky blended combina maltas de varias destilerías con whiskies de grano, buscando consistencia y equilibrio. Johnnie Walker es el más vendido del mundo." },
      { q: "¿En qué consiste el 'double distillation' del Scotch?", a: ["Destilación en alambiques de cobre dos veces para mayor pureza", "Envejecimiento en dos tipos de barrica", "Mezcla de dos destilados distintos", "Fermentación en dos fases"], exp: "La mayoría del Scotch single malt se destila dos veces en alambiques de olla de cobre (pot stills), concentrando los sabores y eliminando impurezas." },
      { q: "¿Qué cóctel lleva bourbon, azúcar, Angostura bitters y piel de naranja?", a: ["Old Fashioned", "Whisky Sour", "Mint Julep", "Boulevardier"], exp: "El Old Fashioned es uno de los cócteles más antiguos: azúcar, Angostura bitters, un chorro de agua, bourbon o rye, y piel de naranja." },
      { q: "¿Qué hace especial al whisky japonés?", a: ["Precisión, equilibrio y técnica japonesa; inspirado en Escocia pero con carácter único", "Solo usa agua de manantiales del Monte Fuji", "Siempre lleva un año de envejecimiento en barricas de cerezos", "Está hecho exclusivamente de arroz"], exp: "El whisky japonés, iniciado por Masataka Taketsuru y Shinjiro Torii en los años 20, combina la técnica escocesa con la filosofía japonesa de precisión y armonía." }
    ]
  },
  {
    id: 9,
    title: "Mixología Moderna",
    subtitle: "Tendencias del Siglo XXI",
    icon: "⚗️",
    color: "#1abc9c",
    questions: [
      { q: "¿Qué es el Aperol Spritz?", a: ["Aperol, prosecco y soda con naranja", "Campari, vino blanco y lima", "Aperol, ginebra y agua con gas", "Aperol, vermut y hielo"], exp: "El Aperol Spritz es la receta 3-2-1: 3 partes de prosecco, 2 de Aperol, 1 de soda, con naranja. Fenómeno global de los últimos años." },
      { q: "¿Qué es la mixología molecular?", a: ["Aplicar técnicas y ciencia gastronómica a la elaboración de cócteles", "Mezclar solo moléculas de alcohol puro", "Coctelería sin hielo usando tecnología criogénica", "Cócteles solo a base de agua mineral"], exp: "La mixología molecular usa herramientas de la cocina de vanguardia (esferificación, gelificación, aires, nitrógeno líquido) para crear cócteles innovadores." },
      { q: "¿Qué es un cóctel 'clarificado' con leche?", a: ["Cóctel lavado con leche para obtener un líquido transparente y sedoso", "Cóctel con leche fresca añadida al final", "Un batido de cóctel y leche", "Un long drink con leche descremada"], exp: "El milk punch clarificado usa la proteína de la leche para capturar las partículas de turbidez. La leche cuaja, se filtra y el resultado es un cóctel cristalino y suave." },
      { q: "¿Qué es el 'shrub' en coctelería moderna?", a: ["Sirope a base de vinagre, fruta y azúcar", "Un tipo de menta molida", "Hierbas maceradas en alcohol", "Zumo de fruta fermentado"], exp: "El shrub (o drinking vinegar) es un concentrado de vinagre, fruta y azúcar que añade acidez compleja y matices a los cócteles sin usar cítricos." },
      { q: "¿Qué es el movimiento 'low and no' en coctelería?", a: ["Tendencia de cócteles con bajo o nulo contenido alcohólico", "Cócteles con poca o ninguna azúcar", "Reducción del número de ingredientes al mínimo", "Bebidas con bajo precio y sin marcas"], exp: "El movimiento low-ABV y sin alcohol responde a la creciente demanda de alternativas para quienes no consumen alcohol o quieren moderar su consumo." },
      { q: "¿Qué es el 'umami' en el contexto de la coctelería?", a: ["El quinto sabor básico (salado-proteico) que añade profundidad al cóctel", "Un tipo de bíter japonés", "Técnica de equilibrio entre dulce y amargo", "Un destilado de algas japonesas"], exp: "El umami es el quinto sabor básico. En coctelería se consigue con ingredientes como salsa de soja, kombu, tomate seco o miso para añadir profundidad y redondez." },
      { q: "¿Qué es el 'batch cocktail'?", a: ["Cóctel preparado en grandes cantidades de antemano para servir rápidamente", "Un cóctel elaborado con un solo espíritu", "Cóctel con múltiples capas visibles", "Un cóctel para compartir entre varios"], exp: "Los batch cocktails son mezclas preparadas en botella o contenedor con antelación, diluidas y equilibradas, listas para servir sin mezclar al momento." },
      { q: "¿Qué técnica es el 'nitro'?", a: ["Añadir nitrógeno líquido o servir en grifo con nitrógeno para textura sedosa y frío extremo", "Infusionar con óxido nitroso (N2O)", "Usar hielo seco en la presentación", "Refrigeración ultra rápida con carbono"], exp: "El nitrógeno líquido en coctelería crea efectos espectaculares de vapor y enfría instantáneamente. Los grifos de nitrógeno dan textura cremosa a café y cócteles." },
      { q: "¿Cuál es el cóctel 'Paper Plane' y qué lo caracteriza?", a: ["Partes iguales de bourbon, Aperol, Amaro Nonino y zumo de limón", "Ginebra, Aperol, prosecco y limón", "Bourbon, triple sec, Campari y lima", "Whisky de centeno, Fernet, Aperol y zumo de naranja"], exp: "El Paper Plane, creado por Sam Ross en 2008, es un modelo de equilibrio perfecto: 3/4 oz de bourbon, Aperol, Amaro Nonino y zumo de limón." },
      { q: "¿Qué es el 'terroir' aplicado a los destilados?", a: ["El conjunto de factores geográficos, climáticos y de suelo que influyen en el sabor del destilado", "La técnica de añejamiento en el lugar de producción", "Solo el tipo de agua usada en la destilación", "El método de cosecha de la materia prima"], exp: "Como en el vino, el terroir en destilados describe cómo el suelo, clima, agua local y microbioma influyen en el sabor final del espíritu, especialmente en tequila, whisky y rhum agricole." }
    ]
  },
  {
    id: 10,
    title: "Gran Maestro",
    subtitle: "El Desafío Final",
    icon: "👑",
    color: "#d4a017",
    questions: [
      { q: "¿Qué es el Negroni Sbagliato y qué lo diferencia del Negroni clásico?", a: ["Usa prosecco en lugar de ginebra; sbagliato significa 'error' en italiano", "Lleva vodka en lugar de ginebra", "Se sirve con gin tónica en lugar de con hielo", "Es un Negroni sin Campari"], exp: "El Negroni Sbagliato ('equivocado' en italiano) surgió cuando un bartender del Bar Basso de Milán usó prosecco por error en lugar de ginebra; el error fue un éxito." },
      { q: "¿Cuál es la proporción exacta de un Daiquiri clásico IBA?", a: ["6 cl de ron blanco, 2 cl de triple sec, 1.5 cl de zumo de lima", "3 cl de ron, 3 cl de lima, 1 cl de azúcar", "4.5 cl de ron, 2.5 cl de lima, 1.5 cl de sirope", "2 oz de ron, 1 oz de lima, 0.5 oz de sirope"], exp: "El Daiquiri IBA oficial: 6 cl de ron blanco, 2 cl de triple sec o curaçao, 1.5 cl de zumo de lima fresco. Servido en copa de cóctel." },
      { q: "¿Qué cóctel lleva tanto whisky de centeno como cognac?", a: ["Vieux Carré", "Manhattan", "Sidecar", "Sazerac"], exp: "El Vieux Carré, creado en el Hotel Monteleone de Nueva Orleans, lleva rye whiskey, cognac, vermut dulce, Bénédictine y dos tipos de bitters." },
      { q: "¿Qué es el Hanky Panky?", a: ["Ginebra, vermut dulce y Fernet-Branca", "Vodka, licor de cereza y soda", "Bourbon, Aperol y angostura", "Ginebra, Campari y zumo de pomelo"], exp: "El Hanky Panky fue creado por Ada Coleman del Savoy Hotel en Londres alrededor de 1900: ginebra, vermut dulce y un toque de Fernet-Branca." },
      { q: "¿Qué es la crème de violette?", a: ["Licor de flores de violeta, esencial en el Aviation", "Crema de postre con sabor floral", "Sirope francés de frutos del bosque", "Un bíter de violeta austríaco"], exp: "La crème de violette es un licor elaborado con flores de violeta. Es el ingrediente que da el color malva característico al cóctel Aviation y que escaseó durante décadas." },
      { q: "¿Cuáles son los cuatro ingredientes del 'Naked and Famous'?", a: ["Mezcal, Aperol, Yellow Chartreuse y zumo de lima a partes iguales", "Tequila, Campari, Cointreau y lima", "Mezcal, Aperol, Fernet y limón", "Gin, Yellow Chartreuse, Aperol y pomelo"], exp: "El Naked and Famous, creado por Joaquín Simó en 2011 en Nueva York, es otro cóctel a partes iguales: mezcal joven, Aperol, Yellow Chartreuse y zumo de lima." },
      { q: "¿Qué técnica es la 'esferificación básica' aplicada a un cóctel?", a: ["Crear esferas de líquido coctelero que estallan al comerlas usando alginato y cloruro cálcico", "Servir el cóctel dentro de una esfera de hielo", "Presentar el cóctel en una bola de chocolate", "Usar esferas de hielo de 60mm para un Old Fashioned"], exp: "La esferificación básica, popularizada por Ferran Adrià, usa alginato de sodio y cloruro cálcico para crear esferas con membrana fina que contienen líquido y estallan en la boca." },
      { q: "¿Cuándo se considera que un vermut es 'extra dry'?", a: ["Cuando contiene menos de 30 gramos de azúcar por litro", "Cuando está envejecido menos de 1 mes", "Cuando tiene más del 20% de ABV", "Cuando se elabora sin botánicos dulces"], exp: "El vermut extra dry (muy seco) tiene un contenido en azúcar muy bajo (inferior a 30 g/l), siendo el más seco de todas las categorías de vermut." },
      { q: "¿Qué hace especial al cóctel 'Clover Club'?", a: ["Contiene clara de huevo que le da una textura espumosa", "Lleva cuatro tipos de espíritus", "Se sirve en cuatro copas a la vez", "Tiene cuatro capas de colores distintos"], exp: "El Clover Club (pre-Prohibition) lleva ginebra, zumo de limón, sirope de frambuesa y clara de huevo batido, que le da su característica textura espumosa y apariencia rosada." },
      { q: "¿Qué destilería escocesa fue la primera en embotellar single malt Scotch para el mercado mundial?", a: ["Glenfiddich (1963)", "Macallan (1970)", "Laphroaig (1950)", "Balvenie (1973)"], exp: "Glenfiddich lanzó en 1963 el primer single malt Scotch Whisky comercializado activamente en el mercado internacional, cambiando la industria para siempre." }
    ]
  }
];
