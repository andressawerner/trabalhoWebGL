function parseMTL(mtlText) {
    const keywordRegex = /(\w*)(?: )*(.*)/;
    const lines = mtlText.split('\n');
    const materials = {};
    let material;

    /*
        ==========================================
        Funções para lidar com a diretiva "newmtl"
        ==========================================
        A diretiva "newmtl" indica a criação de um novo material
    */
    function handleNewmtl(parts, unparsedArgs) {
        material = {};
        materials[unparsedArgs] = material;
    }

    /*
        ==========================================
        Funções para lidar com a diretiva "Ns"
        ==========================================
        A diretiva "Ns" indica a "shininess" do material sendo declado
    */
    function handleNs(parts) {
        material.shininess = parseFloat(parts[0]);
    }

    /*
        ==========================================
        Funções para lidar com a diretiva "Ka"
        ==========================================
        A diretiva "Ka" indica a cor ambiente do material sendo declarado
    */
    function handleKa(parts) {
        material.ambient = parts.map(parseFloat);
    }

    /*
        ==========================================
        Funções para lidar com a diretiva "Kd"
        ==========================================
        A diretiva "Kd" indica a cor difusa do material sendo declarado
    */
    function handleKd(parts) {
        material.diffuse = parts.map(parseFloat);
    }

    /*
        ==========================================
        Funções para lidar com a diretiva "Ks"
        ==========================================
        A diretiva "Ks" indica a cor especular do material sendo declarado
    */
    function handleKs(parts) {
        material.specular = parts.map(parseFloat);
    }

    /*
        ==========================================
        Funções para lidar com a diretiva "Ke"
        ==========================================
        A diretiva "Ke" indica a cor emissiva do material sendo declarado
    */
    function handleKe(parts) {
        material.emissive = parts.map(parseFloat);
    }

    /*
        ==========================================
        Funções para lidar com a diretiva "Ni"
        ==========================================
        A diretiva "Ni" indica a densidade ótica do material sendo declarado
    */
    function handleNi(parts) {
        material.opticalDensity = parseFloat(parts[0]);
    }

    /*
        ==========================================
        Funções para lidar com a diretiva "d"
        ==========================================
        A diretiva "d" indica o "dissolve" (leia-se a opacidade) do material sendo declarado
    */
    function handleD(parts) {
        material.opacity = parseFloat(parts[0]);
    }

    /*
        ==========================================
        Funções para lidar com a diretiva "Tr"
        ==========================================
        A diretiva "Tr" indica a transparencia do material sendo declarado
    */
    function handleTr(parts) {
        material.transparency = parseFloat(parts[0]);
    }

    /*
        ==========================================
        Funções para lidar com a diretiva "Tf"
        ==========================================
        A diretiva "Tf" indica a a quantidade de cores que o material sendo declarado deixa passar
    */
    function handleTf(parts) {
        material.spectral = parts.map(parseFloat);
    }

    /*
        ==========================================
        Funções para lidar com a diretiva "illum"
        ==========================================
        A diretiva "illum" indica o tipo de iluminação do material sendo declarado
    */
    function handleIllum(parts) {
        material.illum = parseInt(parts[0]);
    }

    /*
        ==========================================
        Funções para lidar com a diretiva "map_Kd"
        ==========================================
        A diretiva "map_Kd" indica uma textura a ser utilizada como diffuse map
    */
    function handleMapKd(parts, unparsedArgs) {
        material.diffuseMap = unparsedArgs;
    }

    /*
        ==========================================
        Funções para lidar com a diretiva "map_Ns"
        ==========================================
        A diretiva "map_Ns" indica uma textura a ser utilizada como specular map
    */
    function handleMapNs(parts, unparsedArgs) {
        material.specularMap = unparsedArgs;
    }

    /*
        ============================================
        Funções para lidar com a diretiva "map_Bump"
        ============================================
        A diretiva "map_Bump" indica uma textura a ser utilizada como bump/normal map
    */
    function handleMapBump(parts, unparsedArgs) {
        material.normalMap = unparsedArgs;
    }

    // Dicionário de handlers
    // Cada diretiva encontrada vai chamar sua função associada
    // Nem de perto completo, mas abrange as funções mais usadas
    const handlers = {
        "newmtl": (parts, unparsedArgs) => handleNewmtl(parts, unparsedArgs),
        "Ns": (parts) => handleNs(parts),
        "Ka": (parts) => handleKa(parts),
        "Kd": (parts) => handleKd(parts),
        "Ks": (parts) => handleKs(parts),
        "Ke": (parts) => handleKe(parts),
        "Ni": (parts) => handleNi(parts),
        "d": (parts) => handleD(parts),
        "Tr": (parts) => handleTr(parts),
        "Tf": (parts) => handleTf(parts),
        "illum": (parts) => handleIllum(parts),
        "map_Kd": (parts, unparsedArgs) => handleMapKd(parts, unparsedArgs),
        "map_Ns": (parts, unparsedArgs) => handleMapNs(parts, unparsedArgs),
        "map_Bump": (parts, unparsedArgs) => handleMapBump(parts, unparsedArgs),
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
            console.warn('[mtl] Diretiva não tratada:', keyword, 'na linha', n + 1);
            continue;
        }

        handler(parts, unparsedArgs);
    }

    return materials;
}

export async function process(path) {
    // Fazemos a leitura do arquivo como texto
    const response = await fetch(path);
    const textData = await response.text();

    return parseMTL(textData);
}