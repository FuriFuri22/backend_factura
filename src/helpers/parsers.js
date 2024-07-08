export const parsersF = {};

const KEYWORDS1 = ['SAMSUNG',  'LG', 'HUAWEI', ];
const KEYWORDS2 = ['MOTOROLA', 'IPHONE', 'Xiaomi'];

const columnRangesByCategory = {
    MODULOS: {
        SAMSUNG: [0, 9], // Columnas A a J
        MOTOROLA: [11, 20], // Columnas L a U
        LG: [11, 20], // Columnas L a U
        IPHONE: [0, 9], // Columnas A a J
        HUAWEI: [11, 20], // Columnas L a U
        Xiaomi: [0, 9] // Columnas A a J
    },
    BATERIAS: {
        SAMSUNG: [0, 4], // Columnas A a E
        MOTOROLA: [6, 11], // Columnas G a L
        IPHONE: [13, 18], // Columnas N a S
        // Añadir rangos de columnas para otras marcas si es necesario
    },
    "PLACAS DE CARGA": {
        SAMSUNG: [0, 4], // Columnas A a E
        MOTOROLA: [6, 10], // Columnas G a K
        IPHONE: [13, 17] // Columnas N a R
    },
    DISPLAYS: {
        SAMSUNG: [0, 6] // Columnas A a G
    },
    TOUCHS: {
        SAMSUNG: [0, 6], // Columnas A a G
        LG: [10, 19], // Columnas K a T
    },
    "VISORES DE CAMARA": {
        SAMSUNG: [0, 4], // Columnas A a E
        MOTOROLA: [7, 11] // Columnas H a L
    },
    "PINES DE CARGA": {
        Pines: [6, 10] // Columnas G a K
    }
};

function parserRepuestoForKey (keyWords, data){
    let products = [];
    let currentCategory = null;
    let columnRanges = {};

    data.forEach((row, rowIndex) => {
        console.log(`Procesando fila ${rowIndex}:`, row);
        //Buscar categorias
        const categoryCell = row.find(cell => typeof cell === 'string' && cell.match(/\bMODULOS\b|\bBATERIAS\b|\bPLACAS DE CARGA\b|\bDISPLAYS\b|\bTOUCHS\b|\bVISORES DE CAMARA\b|\bPINES DE CARGA\b/i));
        if (categoryCell) {
            currentCategory = categoryCell.trim();
            columnRanges = columnRangesByCategory[currentCategory] || {}; // Obtener los rangos de columnas para la categoría actual
            console.log(`Nueva categoría encontrada: ${currentCategory} en fila ${rowIndex}`);
        }
        // Si la categoría ya ha sido encontrada, busca las palabras clave
        if (currentCategory) {
            keyWords.forEach(keyword => {
                const foundKeyword = row.find(cell => typeof cell === 'string' && cell.toUpperCase().includes(keyword.toUpperCase()));

                if (foundKeyword) {
                    const currentBrand = keyword;
                    console.log(`Marca encontrada: ${currentBrand} en fila ${rowIndex}`);

                    if (columnRanges[currentBrand]) {
                        if (row.every(cell => cell === null || cell === undefined || cell.toString().trim() === '')) {
                            console.log(`Fila vacía encontrada en fila ${rowIndex}, deteniendo procesamiento.`);
                        } else {
                            const [startCol, endCol] = columnRanges[currentBrand];
                            const rowData = row.slice(startCol, endCol + 1);
                            console.log(`Datos de la fila:`, rowData);
                            if (rowData[0] && !isNaN(rowData[2])) {
                                const [name, quality, priceGremy, priceUsd] = rowData;
                                products.push({
                                    name: name ? name.trim() : null,
                                    quality: quality ? quality.toString().trim() : null,
                                    priceGremy: parseFloat(priceGremy),
                                    priceUsd: priceUsd ? parseFloat(priceUsd) : null,
                                    category: currentCategory,
                                    brand: currentBrand
                                });
                                console.log(`Producto añadido: ${name}, Marca: ${currentBrand}, Categoría: ${currentCategory}`);
                            } else {
                                console.log(`Datos inválidos en la fila ${rowIndex}:`, rowData);
                            }
                        } 
                    }else {
                        console.log(`No se encontraron rangos de columnas para la marca ${currentBrand} en la categoría ${currentCategory}`);
                    }
                }
            });
        }
    });
}

parsersF.parseRepuestos = (data) =>{
    let products = []; 

    parserRepuestoForKey(KEYWORDS1, data);
    parserRepuestoForKey(KEYWORDS2, data);

    return products;
}
