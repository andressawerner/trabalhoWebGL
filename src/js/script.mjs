import * as objLoader from "./obj_loader.mjs"
import * as mtlLoader from "./mtl_loader.mjs"
import * as textureManager from "./texture_manager.mjs"
import * as trigonometry from "./trig.mjs"

var state = {
  gl: null,
  program: null,
  ui: {
    pressedKeys: {},
  },
  animation: {},
  app: {
    eye: {
      x: 3.,
      y: 3.,
      z: 7.,
    },
  },
}

async function main() {
  const { gl, meshProgramInfo } = initializeWorld();

  state.canvas = document.getElementById("canvas");
  state.gl = gl
  document.onkeydown = keydown;
  document.onkeyup = keyup;
  state.canvas.onmousedown = mousedown;

  var then = 0;
  const mtl = [];
  const obj = [];
  //Arquivo do peixe 1
  const resource_path = []
  const object_path = []

  resource_path.push("./fishes/fish1")
  object_path.push("./fishes/fish1/13007_Blue_Green_Reef_Chromis_v1")

  obj[0] = await objLoader.process(`${object_path[0]}.obj`);
  mtl[0] = await mtlLoader.process(`${object_path[0]}.mtl`);

  //Arquivo do peixe 2
  resource_path.push("./fishes/fish2")
  object_path.push("./fishes/fish2/13009_Coral_Beauty_Angelfish_v1_l3")

  obj[1] = await objLoader.process(`${object_path[1]}.obj`);
  mtl[1] = await mtlLoader.process(`${object_path[1]}.mtl`);

  //Arquivo do peixe 3
  resource_path.push("./fishes/fish5")
  object_path.push("./fishes/fish5/TropicalFish04")

  obj[2] = await objLoader.process(`${object_path[2]}.obj`);
  mtl[2] = await mtlLoader.process(`${object_path[2]}.mtl`);

  //Arquivo do peixe 4
  resource_path.push("./fishes/fish4")
  object_path.push("./fishes/fish4/fish")

  obj[3] = await objLoader.process(`${object_path[3]}.obj`);
  mtl[3] = await mtlLoader.process(`${object_path[3]}.mtl`);

  //FOOD
  resource_path.push("./fishes/food")
  object_path.push("./fishes/food/food")

  obj[4] = await objLoader.process(`${object_path[4]}.obj`);
  mtl[4] = await mtlLoader.process(`${object_path[4]}.mtl`);


  //Geral para os três peixes
  // Define texturas e material-base caso a geometria precise e não tenha
  const textures = {
    defaultWhite: textureManager.create1PixelTexture(gl, [255, 255, 255, 255]),
    defaultNormal: textureManager.create1PixelTexture(gl, [127, 127, 255, 0]),
  };
  const defaultMaterial = {
    diffuse: [1, 1, 1],
    diffuseMap: textures.defaultWhite,
    ambient: [0, 0, 0],
    specular: [1, 1, 1],
    specularMap: textures.defaultWhite,
    shininess: 400,
    opacity: 1,
    normalMap: textures.defaultNormal,
  };

  //Texturas do Peixe 1
  // Se existem texturas a serem carregadas (diretivas terminando em Map no MTL)
  // devemos carregá-las e associá-las devidamente
  let indicadorPeixe = 0
  const parts = []
  while (indicadorPeixe < numFishes) {
    for (const material of Object.values(mtl[indicadorPeixe])) {
      Object.entries(material)
        .filter(([key]) => key.endsWith('Map'))
        .forEach(([key, filename]) => {
          let texture = textures[filename];
          if (!texture) {
            texture = textureManager.createTexture(gl, `${resource_path[indicadorPeixe]}/${filename}`);
            textures[filename] = texture;
          }
          material[key] = texture;
        });
    }

    // Para cada elemento no nosso OBJ, definimos sua geometria e pegamos o material associado

    parts.push(obj[indicadorPeixe].geometries.map(
      ({ material, data }) => {

        // Se temos coordenadas de textura e normais, tentamos calcular as tangentes
        if (data.texcoord && data.normal) {
          data.tangent = trigonometry.generateTangents(data.position, data.texcoord);
        } else {
          data.tangent = { value: [1, 0, 0] };
        }

        // Se temos cor nos dados, use a cor; se não, é branco
        if (data.color) {
          if (data.position.length === data.color.length) {
            data.color = { numComponents: 3, data: data.color };
          }

        } else {
          data.color = { value: [1, 1, 1, 1] };
        }

        // Joga tudo no formato pro buffer
        const bufferInfo = webglUtils.createBufferInfoFromArrays(gl, data);

        return {
          material: {
            ...defaultMaterial,
            ...mtl[indicadorPeixe][material],
          },
          bufferInfo: bufferInfo,
        };
      }
    ));
    indicadorPeixe++;
  }

  //Comum para todos
  // Funções para achar os extents/bounds a partir da geometria, para deixar o objeto centrado na câmera
  function getExtents(positions) {
    const min = positions.slice(0, 3);
    const max = positions.slice(0, 3);
    for (let i = 3; i < positions.length; i += 3) {
      for (let j = 0; j < 3; ++j) {
        const v = positions[i + j];
        min[j] = Math.min(v, min[j]);
        max[j] = Math.max(v, max[j]);
      }
    }
    return { min, max };
  }

  function getGeometriesExtents(geometries) {
    return geometries.reduce(
      ({ min, max }, { data }) => {
        const minMax = getExtents(data.position);
        return {
          min: min.map((min, ndx) => Math.min(minMax.min[ndx], min)),
          max: max.map((max, ndx) => Math.max(minMax.max[ndx], max)),
        };
      },
      {
        min: Array(3).fill(Number.POSITIVE_INFINITY),
        max: Array(3).fill(Number.NEGATIVE_INFINITY),
      }
    );
  }

  //Para o Peixe 1
  const extents = getGeometriesExtents(obj[0].geometries);
  const range = m4.subtractVectors(extents.max, extents.min);
  //Para o Peixe 2
  const extents2 = getGeometriesExtents(obj[1].geometries);
  const range2 = m4.subtractVectors(extents2.max, extents2.min);
  //Para o Peixe 3
  const extents3 = getGeometriesExtents(obj[2].geometries);
  const range3 = m4.subtractVectors(extents3.max, extents3.min);
  //Para o Peixe 4
  const extents4 = getGeometriesExtents(obj[3].geometries);
  const range4 = m4.subtractVectors(extents4.max, extents4.min);
  //Para a Comida
  const extents5 = getGeometriesExtents(obj[4].geometries);
  const range5 = m4.subtractVectors(extents5.max, extents5.min);

  // Define o offset que precisamos mover o objeto para que ele fique centrado na câmera
  const objOffset = [];
  objOffset.push(m4.scaleVector(
    m4.addVectors(
      extents.min,
      m4.scaleVector(range, 0.5)
    ),
    -1,
  ));

  const bufferInfo = []
  bufferInfo.push(parts[0][0].bufferInfo);

  const vao = []
  vao.push(twgl.createVAOFromBufferInfo(
    gl,
    meshProgramInfo,
    parts[0][0].bufferInfo,
  ));
  const uniforms = []
  uniforms.push({
    u_matrix: m4.identity(),
    u_lightDirection: m4.normalize([-1, 3, 5]),
    u_viewWorldPosition: [0, 0, 100],
  });

  // PEIXE 2

  // Define o offset que precisamos mover o objeto para que ele fique centrado na câmera
  objOffset.push(m4.scaleVector(
    m4.addVectors(
      extents2.min,
      m4.scaleVector(range2, 0.5)
    ),
    -1,
  ));

  bufferInfo.push(parts[1][0].bufferInfo);

  vao.push(twgl.createVAOFromBufferInfo(
    gl,
    meshProgramInfo,
    parts[1][0].bufferInfo,
  ));

  uniforms.push({
    u_matrix: m4.identity(),
    u_lightDirection: m4.normalize([-1, 3, 5]),
    u_viewWorldPosition: [0, 0, 100],
  });

  function computeMatrix(viewProjectionMatrix, linearTranslation, axisRotation, scale, bezier, pointRotation) {

    let translationX = bezier.bool ?
      linearTranslation.x + bezier.x
      : (pointRotation.bool ?
        Math.sin(degToRad(pointRotation.statusPointRotation)) * pointRotation.diameter
        : linearTranslation.x)

    let translationY = bezier.bool ?
      linearTranslation.y + bezier.y
      : (pointRotation.bool ?
        Math.cos(degToRad(pointRotation.statusPointRotation)) * pointRotation.diameter
        : linearTranslation.y)

    var matrix = m4.translate(
      viewProjectionMatrix,
      translationX,
      translationY,
      linearTranslation.z,
    );

    matrix = m4.xRotate(matrix, axisRotation.x);
    matrix = m4.yRotate(matrix, axisRotation.y);
    matrix = m4.zRotate(matrix, axisRotation.z);

    matrix = m4.scale(matrix, scale, scale, scale);
    //coloquei scale para o fim pois antes estava mexendo o objeto 
    //ao invés de aumentar/diminuir
    return matrix
  }

  // PEIXE 3

  // Define o offset que precisamos mover o objeto para que ele fique centrado na câmera
  objOffset.push(m4.scaleVector(
    m4.addVectors(
      extents3.min,
      m4.scaleVector(range3, 0.5)
    ),
    -1,
  ));

  bufferInfo.push(parts[2][0].bufferInfo);

  vao.push(twgl.createVAOFromBufferInfo(
    gl,
    meshProgramInfo,
    parts[2][0].bufferInfo,
  ));

  uniforms.push({
    u_matrix: m4.identity(),
    u_lightDirection: m4.normalize([-1, 3, 5]),
    u_viewWorldPosition: [0, 0, 100],
  });

  // PEIXE 4

  // Define o offset que precisamos mover o objeto para que ele fique centrado na câmera
  objOffset.push(m4.scaleVector(
    m4.addVectors(
      extents4.min,
      m4.scaleVector(range4, 0.5)
    ),
    -1,
  ));

  bufferInfo.push(parts[3][0].bufferInfo);

  vao.push(twgl.createVAOFromBufferInfo(
    gl,
    meshProgramInfo,
    parts[3][0].bufferInfo,
  ));

  uniforms.push({
    u_matrix: m4.identity(),
    u_lightDirection: m4.normalize([-1, 3, 5]),
    u_viewWorldPosition: [0, 0, 100],
  });

  //FOOD
  // Define o offset que precisamos mover o objeto para que ele fique centrado na câmera
  objOffset.push(m4.scaleVector(
    m4.addVectors(
      extents5.min,
      m4.scaleVector(range5, 0.5)
    ),
    -1,
  ));

  bufferInfo.push(parts[4][0].bufferInfo);

  vao.push(twgl.createVAOFromBufferInfo(
    gl,
    meshProgramInfo,
    parts[4][0].bufferInfo,
  ));

  uniforms.push({
    u_matrix: m4.identity(),
    u_lightDirection: m4.normalize([-1, 3, 5]),
    u_viewWorldPosition: [0, 0, 100],
  });

  loadGUI();

  function render(now) {

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    //initBkgnd(gl);



    const c = parseInt(camerasS.selected)
    if (!isNaN(c)) {
      var copy = deepClone(camerasS)
      selectedCam = parseInt(copy.selected) - 1
    }

    //ANIMAÇÃO
    now *= 0.001;
    var deltaT = now - then;
    then = now;

    // OBJETO 
    animationObjectPlay = 0;
    while (animationObjectPlay < numFishes) {
      const aO = animationObjects.filter((arg) => arg.object == animationObjectPlay)
      if (aO.length){
      let aT = aO[0].time; //3seg      //passed 2seg
      let totalTime = aT;
      let i = 0;
      for (var j = 1; j < aO.length; j++) {
        if (aT < timePassed[animationObjectPlay]) {
          aT += aO[j].time
          i = j
        }
        totalTime += aO[j].time
      };

      config[animationObjectPlay].scale += (aO[i].scale * deltaT)
      config[animationObjectPlay].rotateX += (aO[i].rotateX * deltaT)
      config[animationObjectPlay].rotateY += (aO[i].rotateY * deltaT)
      config[animationObjectPlay].rotateZ += (aO[i].rotateZ * deltaT)
      config[animationObjectPlay].translationX += (aO[i].translationX * deltaT)
      config[animationObjectPlay].translationY += (aO[i].translationY * deltaT)
      config[animationObjectPlay].translationZ += (aO[i].translationZ * deltaT)

      timePassed[animationObjectPlay] += deltaT
      if (timePassed[animationObjectPlay] >= totalTime) {
        timePassed[animationObjectPlay] = 0;
        //animationObjectPlay = 0;
        //animationPlay = false;
      }
    }
      animationObjectPlay++;
    }

    if (dropFood) {
      animationObjectPlay = food;
      const aO = animationObjects.filter((arg) => arg.object == animationObjectPlay)
      if (aO.length){
      let aT = aO[0].time; //3seg      //passed 2seg
      let totalTime = aT;
      let i = 0;
      for (var j = 1; j < aO.length; j++) {
        if (aT < timePassed[animationObjectPlay]) {
          aT += aO[j].time
          i = j
        }
        totalTime += aO[j].time
      };

      config[animationObjectPlay].scale += (aO[i].scale * deltaT)
      config[animationObjectPlay].rotateX += (aO[i].rotateX * deltaT)
      config[animationObjectPlay].rotateY += (aO[i].rotateY * deltaT)
      config[animationObjectPlay].rotateZ += (aO[i].rotateZ * deltaT)
      config[animationObjectPlay].translationX += (aO[i].translationX * deltaT)
      config[animationObjectPlay].translationY += (aO[i].translationY * deltaT)
      config[animationObjectPlay].translationZ += (aO[i].translationZ * deltaT)

      let isNext = false;
      for (let i = 0; i < numFishes; i++){
        const diffX = config[animationObjectPlay].translationX > config[i].translationX ?
          config[animationObjectPlay].translationX - config[i].translationX
          : config[i].translationX - config[animationObjectPlay].translationX

        const diffY = config[animationObjectPlay].translationY > config[i].translationY ?
        config[animationObjectPlay].translationY - config[i].translationY
        : config[i].translationY - config[animationObjectPlay].translationY
        if (diffX + diffY < 20) {
          isNext = true;
        }

      }


      timePassed[animationObjectPlay] += deltaT
      if (isNext || timePassed[animationObjectPlay] >= totalTime || config[animationObjectPlay].translationY < -70) {
        timePassed[animationObjectPlay] = 0;
        deleteObject(animationObjectPlay)
        dropFood = false;
        //animationPlay = false;
      }
    }
    }

    //CAMERA
    if (animationPlayCam) {

      const aO = animationCameras.filter((arg) => arg.object == animationCamIndex)
      let aT = aO[0].time; //3seg      //passed 2seg
      let totalTime = aT;
      let i = 0;
      for (j = 1; j < aO.length; j++) {
        if (aT < timePassed) {
          aT += aO[j].time
          i = j
        }
        totalTime += aO[j].time
      };

      cam[animationCamIndex].zoom += (aO[i].scale * deltaT)
      cam[animationCamIndex].rotateX += (aO[i].rotateX * deltaT)
      cam[animationCamIndex].rotateY += (aO[i].rotateY * deltaT)
      cam[animationCamIndex].rotateZ += (aO[i].rotateZ * deltaT)
      cam[animationCamIndex].translationX += (aO[i].translationX * deltaT)
      cam[animationCamIndex].translationY += (aO[i].translationY * deltaT)
      cam[animationCamIndex].translationZ += (aO[i].translationZ * deltaT)

      timePassed += deltaT
      if (timePassed >= totalTime) {
        timePassed = 0;
        animationCamIndex = 0;
        animationPlayCam = false;
      }
    }


    twgl.resizeCanvasToDisplaySize(gl.canvas);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);

    var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    //var projectionMatrix = m4.perspective(fieldOfViewRadians, aspect, 1, 2000);

    var fieldOfViewRadians = degToRad(150 - cam[selectedCam].zoom);

    var projectionMatrix = m4.perspective(fieldOfViewRadians, aspect, 1, 2000);

    const b = !cam[selectedCam].bezier ? [0, 0]
      : bezier(cam[selectedCam].bezierT,
        { x: cam[selectedCam].bezierX1, y: cam[selectedCam].bezierY1 },
        { x: cam[selectedCam].bezierX2, y: cam[selectedCam].bezierY2 },
        { x: cam[selectedCam].bezierX3, y: cam[selectedCam].bezierY3 },
        { x: cam[selectedCam].bezierX4, y: cam[selectedCam].bezierY4 })

    if (!arrayIsEqual(b, [0, 0])) {
      cam[selectedCam].translationX = b[0]
      cam[selectedCam].translationY = b[1]
    }

    var cameraPosition = [cam[selectedCam].translationX, cam[selectedCam].translationY, cam[selectedCam].translationZ]

    var target;
    if (cam[selectedCam].lookingObject) {
      target = [config[objectAcomp].translationX, config[objectAcomp].translationY, config[objectAcomp].translationZ]
    } else {
      if (!arrayIsEqual(cameraPosition, cam[selectedCam].pTranslation)) {
        target = [
          cam[selectedCam].lookAtX + cam[selectedCam].translationX,
          cam[selectedCam].lookAtY + cam[selectedCam].translationY,
          cam[selectedCam].lookAtZ + cam[selectedCam].translationZ - 100
        ];
        //cam[selectedCam].pTranslation = cameraPosition

      } else {
        target = [cam[selectedCam].lookAtX, cam[selectedCam].lookAtY, cam[selectedCam].lookAtZ];
      }

    }

    var up = [0, 1, 0];

    var cameraMatrix = m4.lookAt(cameraPosition, target, up);

    cameraMatrix = m4.xRotate(cameraMatrix, cam[selectedCam].rotateX);
    cameraMatrix = m4.yRotate(cameraMatrix, cam[selectedCam].rotateY);
    cameraMatrix = m4.zRotate(cameraMatrix, cam[selectedCam].rotateZ);

    // Make a view matrix from the camera matrix.
    var viewMatrix = m4.inverse(cameraMatrix);

    var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);

    gl.useProgram(meshProgramInfo.program);

    for (let i = 0; i < vectorObjects.length; i++) {
      const random = vectorObjects[i]
      let index = 10
      switch (random) {
        case 'fish1':
          index = 0;
          break;
        case 'fish2':
          index = 1
          break;
        case 'fish3':
          index = 2
          break;
        case 'fish4':
          index = 3
          break;
        case 'food':
          index = 4
          break;
      }

      if (!!random && random != 'x') {
        // Todas as partes estão no mesmo espaço, então o espaço-mundo é constante
        // Como estamos "zooming out", temos que ajustar pelo offset
        let u_world = m4.yRotation(time);
        u_world = m4.translate(u_world, ...objOffset[index]);

        uniforms[index].u_viewWorldPosition = cameraPosition;
        uniforms[index].u_world = u_world;
        // Setup all the needed attributes.
        gl.bindVertexArray(vao[index]);

        const b = !config[i].bezier ? [0, 0]
          : bezier(config[i].bezierT,
            { x: config[i].bezierX1, y: config[i].bezierY1 },
            { x: config[i].bezierX2, y: config[i].bezierY2 },
            { x: config[i].bezierX3, y: config[i].bezierY3 },
            { x: config[i].bezierX4, y: config[i].bezierY4 })

        uniforms[index].u_matrix = computeMatrix(
          viewProjectionMatrix,
          { x: config[i].translationX, y: config[i].translationY, z: config[i].translationZ },
          { x: config[i].rotateX, y: config[i].rotateY, z: config[i].rotateZ },
          config[i].scale, { bool: config[i].bezier, x: b[0], y: b[1] },
          { bool: config[i].pointRotation, diameter: config[i].diameter, statusPointRotation: config[i].statusPointRotation }
        );

        for (const { bufferInfo, material } of parts[index]) {
          webglUtils.setBuffersAndAttributes(gl, meshProgramInfo, bufferInfo);
          webglUtils.setUniforms(meshProgramInfo, uniforms[index], material);
          webglUtils.drawBufferInfo(gl, bufferInfo);
        }

      }

    }

    requestAnimationFrame(render);
  }

  function mousedown(event) {
    var point = uiUtils.pixelInputToCanvasCoord(event, state.canvas);
    var pixels = new Uint8Array(4);
    state.gl.readPixels(point.x, point.y, 1, 1, state.gl.RGBA, state.gl.UNSIGNED_BYTE, pixels);
    document.addEventListener("click", event => {
      console.log("Clique");
      //console.log("clientX: " + event.clientX + " - clientY: " + event.clientY);
      indexFood = vectorObjects.indexOf('')
      if (vectorObjects.indexOf('food') != -1) {
        indexFood = vectorObjects.indexOf('food')
      }
     
      vectorObjects[indexFood] = 'food'
      //vectorObjects[8] = 'food'
      dropFood = true;
      food = indexFood;
    })
  }

  requestAnimationFrame(render);
}

main();
