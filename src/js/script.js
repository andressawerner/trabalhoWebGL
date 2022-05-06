function main() {
  const { gl, meshProgramInfo } = initializeWorld();

  //const cubeTranslation = [0, 0, 0];
  var fieldOfViewRadians = degToRad(60);

  // CUBO
  const bufferInfo = []
  bufferInfo.push(flattenedPrimitives.createCubeBufferInfo(gl, 20));

  const vao = []
  vao.push(twgl.createVAOFromBufferInfo(
    gl,
    meshProgramInfo,
    bufferInfo[0],
  ));

  const uniforms = []
  uniforms.push({
    u_colorMult: [1, 0.5, 0.5, 1],
    u_matrix: m4.identity(),
  });

  // ESFERA
  bufferInfo.push(flattenedPrimitives.createSphereBufferInfo(gl, 10, 12, 6));

  vao.push(twgl.createVAOFromBufferInfo(
    gl, 
    meshProgramInfo, 
    bufferInfo[1]
  ));

  uniforms.push({
    u_colorMult: [0.8, 1, 0.5, 1],
    u_matrix: m4.identity(),
  });

  // CONE
  bufferInfo.push(flattenedPrimitives.createTruncatedConeBufferInfo(gl, 10, 0, 20, 12, 1, true, false));

  vao.push(twgl.createVAOFromBufferInfo(
    gl, 
    meshProgramInfo, 
    bufferInfo[2]
  ));

  uniforms.push({
    u_colorMult: [0.5, 0.5, 1, 1],
    u_matrix: m4.identity(),
  });

  function computeMatrix(viewProjectionMatrix, linearTranslation, axisRotation, scale, bezier, pointRotation) {
    /* if(config.circulo == true){
      cubeTX = Math.sin(degToRad(time*(config.Cvel)))*config.Csize
      cubeTY = Math.cos(degToRad(time*(config.Cvel)))*config.Csize
    } */
    
    let translationX = bezier.bool? 
      linearTranslation.x + bezier.x
      : (pointRotation.bool?
        Math.sin(degToRad(pointRotation.statusPointRotation)) * pointRotation.diameter
        : linearTranslation.x)

    let translationY = bezier.bool? 
    linearTranslation.y + bezier.y
    : (pointRotation.bool?
      Math.cos(degToRad(pointRotation.statusPointRotation))*pointRotation.diameter
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

  loadGUI();

  function render(time) {
    time *= 0.005;
    twgl.resizeCanvasToDisplaySize(gl.canvas);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);

    var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    //var projectionMatrix = m4.perspective(fieldOfViewRadians, aspect, 1, 2000);

    fieldOfViewRadians = degToRad(150 - cam[0].zoom);

    var projectionMatrix = m4.perspective(fieldOfViewRadians, aspect, 1, 2000);
    // Compute the camera's matrix using look at.
    //var cameraPosition = [0, 0, 100];
    //var target = [0, 0, 0];
    //var up = [0, 1, 0];

    const b = !cam[0].bezier ? [0,0] 
    : bezier(cam[0].bezierT, 
      {x: cam[0].bezierX1, y:cam[0].bezierY1},
      {x: cam[0].bezierX2, y:cam[0].bezierY2},
      {x: cam[0].bezierX3, y:cam[0].bezierY3},
      {x: cam[0].bezierX4, y:cam[0].bezierY4})

      if (!arrayIsEqual(b,[0,0])){
        cam[0].translationX = b[0]
        cam[0].translationY = b[1]
      }

    var cameraPosition = [cam[0].translationX, cam[0].translationY, cam[0].translationZ]
    var target;
    if(cam[0].lookingObject) {
      target = [config[objectAcomp].translationX, config[objectAcomp].translationY, config[objectAcomp].translationZ]
    } else {
      if (!arrayIsEqual(cameraPosition, cam[0].pTranslation)) {
        target = [
          cam[0].lookAtX + cam[0].translationX, 
          cam[0].lookAtY + cam[0].translationY, 
          cam[0].lookAtZ + cam[0].translationZ - 100
        ];
        //cam[0].pTranslation = cameraPosition
        
      } else {
        target = [cam[0].lookAtX, cam[0].lookAtY, cam[0].lookAtZ];
      }
      
    }

    var up = [0, 1, 0];

    var cameraMatrix = m4.lookAt(cameraPosition, target, up);

    // Make a view matrix from the camera matrix.
    var viewMatrix = m4.inverse(cameraMatrix);

    var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);

    gl.useProgram(meshProgramInfo.program);

    for (i = 0; i < vectorObjects.length; i++){
      const random = vectorObjects[i]
      let index = 10
      switch (random){
        case 'cube':
          index = 0;
        break;
        case 'sphere':
          index = 1
        break;
        case 'cone':
          index = 2
        break;
      }
      if (!!random){
        // Setup all the needed attributes.
        gl.bindVertexArray(vao[index]);

        const b = !config[i].bezier ? [0,0] 
        : bezier(config[i].bezierT, 
          {x: config[i].bezierX1, y:config[i].bezierY1},
          {x: config[i].bezierX2, y:config[i].bezierY2},
          {x: config[i].bezierX3, y:config[i].bezierY3},
          {x: config[i].bezierX4, y:config[i].bezierY4})

        /* const p = !config[i].pointRotation ? [0,0,0] 
        : pointRotation(config[i].statusPointRotation, 
          {x: config[i].rotatePointX, y:config[i].rotatePointY, z:config[i].rotatePointZ}) */

    
        uniforms[index].u_matrix = computeMatrix(
          viewProjectionMatrix,
          {x: config[i].translationX, y: config[i].translationY, z: config[i].translationZ},
          {x: config[i].rotateX, y: config[i].rotateY, z: config[i].rotateZ},
          config[i].scale, {bool:config[i].bezier, x: b[0], y:b[1]},
          {bool: config[i].pointRotation, diameter: config[i].diameter, statusPointRotation: config[i].statusPointRotation }
          //{bool: config[i].pointRotation, x: p[0], y: p[1] }
        );
        
        //animação da rotação no ponto
        //config[0].translationX = Math.sin(degToRad(time*(50)))*50
        //config[0].translationY = Math.cos(degToRad(time*(50)))*50
        // Set the uniforms we just computed
        twgl.setUniforms(meshProgramInfo, uniforms[index]);

        twgl.drawBufferInfo(gl, bufferInfo[index]);
      }

    }
    
    if (vectorObjects.every(arg => arg == '')) {
      gl.clear(gl.COLOR_BUFFER_BIT);
    }

	requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
