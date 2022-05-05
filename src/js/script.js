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

  function computeMatrix(viewProjectionMatrix, linearTranslation, axisRotation, scale, bezier, pointBezier) {
    var matrix = m4.translate(
      viewProjectionMatrix,
      bezier? linearTranslation.x + pointBezier.x
      : linearTranslation.x ,
      bezier? linearTranslation.y + pointBezier.y
      : linearTranslation.y ,
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

  function render() {
    twgl.resizeCanvasToDisplaySize(gl.canvas);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);

    var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    //var projectionMatrix = m4.perspective(fieldOfViewRadians, aspect, 1, 2000);

    var projectionMatrix = m4.perspective(fieldOfViewRadians, aspect, 1, 2000);
    // Compute the camera's matrix using look at.
    //var cameraPosition = [0, 0, 100];
    //var target = [0, 0, 0];
    //var up = [0, 1, 0];

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

        bez = config[i].bezier
        const b = !bez ? [0,0] 
        : bezier(config[i].bezierT, 
          {x: config[i].bezierX1, y:config[i].bezierY1},
          {x: config[i].bezierX2, y:config[i].bezierY2},
          {x: config[i].bezierX3, y:config[i].bezierY3},
          {x: config[i].bezierX4, y:config[i].bezierY4})

        uniforms[index].u_matrix = computeMatrix(
          viewProjectionMatrix,
          {x: config[i].translationX, y: config[i].translationY, z: config[i].translationZ},
          {x: config[i].rotateX, y: config[i].rotateY, z: config[i].rotateZ},
          config[i].scale, config[i].bezier, {x: b[0], y:b[1]}
        );

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
