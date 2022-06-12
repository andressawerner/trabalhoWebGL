// Leitor de arquivos no formato OBJ
// O formato OBJ é um formato estruturado de texto com as coordenadas dos pontos e polígonos

// Função-base para a interpretação do arquivo
function parseOBJ(objText) {
    // Expressão regular (regex) para captura de linha
    // Captura a diretiva (\w*), ignora n espaços (?: )* e captura os números (.*)
    const keywordRegex = /(\w*)(?: )*(.*)/;
    const lines = objText.split('\n');

    // Dados de vértice, vamos deixar na mesma ordem da diretiva "f"
    // JS é base 0; Temos que popular o 0
    const objPositions = [[0, 0, 0]];
    const objTextureCoords = [[0, 0]];
    const objNormals = [[0, 0, 0]];
    
    const objVertexData = [
        objPositions,
        objTextureCoords,
        objNormals,
    ];
    let glVertexData = [
        [],
        [],
        [],
    ];

    // Variáveis para dados das geometrias
    const geometries = [];
    let geometry;
    let material = "default";
    let object = "default";
    let groups = ["default"];

    // Variável para dados das bibliotecas de material
    const materialLibs = [];    
    
    // Inicia uma nova geometria (removendo a antiga caso exista)
    function newGeometry() {
        if (geometry && geometry.data.position.length) {
            geometry = undefined;
        }
    }
    
    // Joga a geometria para a lista de geometrias
    // A função define uma geometria base caso ela não exista;
    // Isso é guard case para o caso de existirem diretivas "f" sem "usemtl"
    function setGeometry() {
        if (!geometry) {
            const position = [];
            const texcoord = [];
            const normal = [];
            glVertexData = [
                position,
                texcoord,
                normal,
            ];
            geometry = {
                object,
                groups,
                material,
                data: {
                    position,
                    texcoord,
                    normal,
                },
            };
            geometries.push(geometry);
        };
    }

    /*
        =====================================
        Funções para lidar com a diretiva "f"
        =====================================
        A diretiva "f" indica uma face poligonal que compõe o objeto sendo declarado
        Ela não especifica o tipo de polígono, podendo variar o número de vértices
        Então é necessário calcular os triângulos a partir deles e adicionar os vértices manualmente
    */ 
    function addVertex(vert) {
        const ptn = vert.split('/');
        ptn.forEach((objIndexStr, i) => {
          if (!objIndexStr) {
            return;
          }
          const objIndex = parseInt(objIndexStr);
          const index = objIndex + (objIndex >= 0 ? 0 : objVertexData[i].length);
          glVertexData[i].push(...objVertexData[i][index]);
        });
    }

    function handleF(parts){
        setGeometry();
        const numTriangles = parts.length - 2;
        for (let triangle = 0; triangle < numTriangles; ++triangle) {
            addVertex(parts[0]);
            addVertex(parts[triangle + 1]);
            addVertex(parts[triangle + 2]);
        }
    }

    /*
        =====================================
        Funções para lidar com a diretiva "v"
        =====================================
        A diretiva "v" indica um vértice que compõe o objeto sendo declarado
    */
    function handleV(parts){
        objPositions.push(parts.map(parseFloat))
    }

    /*
        ======================================
        Funções para lidar com a diretiva "vt"
        ======================================
        A diretiva "vt" indica coordenadas de textura para o objeto sendo declarado
    */
    function handleVT(parts){
        objTextureCoords.push(parts.map(parseFloat))
    }

    /*
        ======================================
        Funções para lidar com a diretiva "vn"
        ======================================
        A diretiva "vn" indica um vetor normal para o objeto sendo declarado
    */
    function handleVN(parts){
        objNormals.push(parts.map(parseFloat))
    }

    /*
        ==========================================
        Funções para lidar com a diretiva "usemtl"
        ==========================================
        A diretiva "usemtl" indica que um novo material está sendo declarado
    */
    function handleUSEMTL(_, unparsedArgs) {
        material = unparsedArgs;
        newGeometry();
    }

    /*
        ==========================================
        Funções para lidar com a diretiva "mtllib"
        ==========================================
        A diretiva "mtllib" indica uma biblioteca de materiais a ser usada no material atual
    */
    function handleMTLLIB(_, unparsedArgs) {
        materialLibs.push(unparsedArgs);
    }

    /*
        ==========================================
        Funções para lidar com a diretiva "o"
        ==========================================
        A diretiva "o" indica o nome do objeto que está sendo declarado
    */
    function handleO(_, unparsedArgs){
        object = unparsedArgs;
        newGeometry()
    }

    /*
        ==========================================
        Funções para lidar com a diretiva "g"
        ==========================================
        A diretiva "g" indica o nome do grupo a qual pertence o objeto sendo declarado
    */
    function handleG(parts){
        groups = parts;
        newGeometry();
    }

    /*
        ==========================================
        Funções para lidar com a diretiva "s"
        ==========================================
        A diretiva "s" indica um smoothing group - muito fora do escopo disso aqui, mas que aparece no nosso objeto-teste
        Vamos simplesmente fazer nada!
    */
    function handleS(parts){
    }

    // Dicionário de handlers
    // Cada diretiva encontrada vai chamar sua função associada
    // Nem de perto completo, mas abrange as funções mais usadas
    const handlers = {
        "v": parts => handleV(parts),
        "vt": parts => handleVT(parts),
        "vn": parts => handleVN(parts),
        "f": parts => handleF(parts),
        "usemtl": (parts, unparsedArgs) => handleUSEMTL(parts, unparsedArgs),
        "mtllib": (parts, unparsedArgs) => handleMTLLIB(parts, unparsedArgs),
        "o": (parts, unparsedArgs) => handleO(parts, unparsedArgs),
        "g": parts => handleG(parts),
        "s": parts => handleS(parts),
    }

    for (let n = 0; n < lines.length; ++n) {
        const line = lines[n].trim();
        
        // Se é comentário, ignora a linha
        if (line === '' || line.startsWith('#')) {
            continue;
        }

        // Se a linha não bate com o formato que montamos, ignora a linha
        const m = keywordRegex.exec(line);
        if (!m) {
            continue;
        }

        // Se a linha bate, olhamos nosso dicionário de funções e executamos o handler da diretiva da linha
        const [, keyword, unparsedArgs] = m;
        const parts = line.split(/\s+/).slice(1);
        const handler = handlers[keyword];
        if (!handler) {
            console.warn('[obj] Diretiva não tratada:', keyword, 'na linha', n + 1);
            continue;
        }

        handler(parts, unparsedArgs);
    }

    // Limpa geometrias sem coordenadas de textura ou normais
    for (const geometry of geometries) {
        geometry.data = Object.fromEntries(
            Object.entries(geometry.data).filter(([, array]) => array.length > 0)
        );
    }

    // Array de Geometries fica no formato esperado do webglUtils.createBufferInfoFromArrays
    return { geometries, materialLibs, };
}

export async function process(path) {
    // Fazemos a leitura do arquivo como texto
    const response = await fetch(path);
    const textData = await response.text();

    return parseOBJ(textData);
}