function main() {
  const { gl, meshProgramInfo } = initializeWorld();

  //const cubeTranslation = [0, 0, 0];
  var fieldOfViewRadians = degToRad(60);

  // CUBO
  const cubeBufferInfo = flattenedPrimitives.createCubeBufferInfo(gl, 20);

  const cubeVAO = twgl.createVAOFromBufferInfo(
    gl,
    meshProgramInfo,
    cubeBufferInfo,
  );

  const cubeUniforms = {
    u_colorMult: [1, 0.5, 0.5, 1],
    u_matrix: m4.identity(),
  };

  // ESFERA
  const sphereBufferInfo = flattenedPrimitives.createSphereBufferInfo(gl, 10, 12, 6);

  var sphereVAO = twgl.createVAOFromBufferInfo(
    gl, 
    meshProgramInfo, 
    sphereBufferInfo
  );

  var sphereUniforms = {
    u_colorMult: [0.8, 1, 0.5, 1],
    u_matrix: m4.identity(),
  };

  // CONE
  const coneBufferInfo = flattenedPrimitives.createTruncatedConeBufferInfo(gl, 10, 0, 20, 12, 1, true, false);

  var coneVAO   = twgl.createVAOFromBufferInfo(
    gl, 
    meshProgramInfo, 
    coneBufferInfo
  );

  var coneUniforms = {
    u_colorMult: [0.5, 0.5, 1, 1],
    u_matrix: m4.identity(),
  };

  function computeMatrix(viewProjectionMatrix, linearTranslation, axisRotation, scale) {
    var matrix = m4.scale(viewProjectionMatrix, scale, scale, scale);
    matrix = m4.translate(
      matrix,
      linearTranslation.x,
      linearTranslation.y,
      linearTranslation.z,
    );
    matrix = m4.xRotate(matrix, axisRotation.x);
    matrix = m4.yRotate(matrix, axisRotation.y);
    matrix = m4.zRotate(matrix, axisRotation.z);
    return matrix
  }

  loadGUI();

  function render() {
    twgl.resizeCanvasToDisplaySize(gl.canvas);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);

    var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    var projectionMatrix = m4.perspective(fieldOfViewRadians, aspect, 1, 2000);

    // Compute the camera's matrix using look at.
    //var cameraPosition = [0, 0, 100];
    var target = [0, 0, 0];
    var up = [0, 1, 0];

    var cameraPosition = [cam[0].translationX, cam[0].translationY, cam[0].translationZ];
    var target = [cam[0].lookAtX, cam[0].lookAtY, cam[0].lookAtZ];
    var up = [0, 1, 0];

    var cameraMatrix = m4.lookAt(cameraPosition, target, up);

    // Make a view matrix from the camera matrix.
    var viewMatrix = m4.inverse(cameraMatrix);

    var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);

    gl.useProgram(meshProgramInfo.program);

    for (i = 0; i < vectorObjects.length; i++){
      const random = vectorObjects[i]
      switch (random){
        case 'cube':
          // ------ Draw the cube --------
  
          // Setup all the needed attributes.
          gl.bindVertexArray(cubeVAO);
  
          cubeUniforms.u_matrix = computeMatrix(
            viewProjectionMatrix,
            {x: config[i].translationX, y: config[i].translationY, z: config[i].translationZ},
            {x: config[i].rotateX, y: config[i].rotateY, z: config[i].rotateZ},
            config[i].scale
          );
  
          // Set the uniforms we just computed
          twgl.setUniforms(meshProgramInfo, cubeUniforms);
  
          twgl.drawBufferInfo(gl, cubeBufferInfo);
          break;
  
        case 'sphere':
          // ------ Draw the sphere --------
  
          // Setup all the needed attributes.
          gl.bindVertexArray(sphereVAO);
  
          sphereUniforms.u_matrix = computeMatrix(
            viewProjectionMatrix,
            {x: config[i].translationX, y: config[i].translationY, z: config[i].translationZ},
            {x: config[i].rotateX, y: config[i].rotateY, z: config[i].rotateZ},
            config[i].scale
          );
  
          // Set the uniforms we just computed
          twgl.setUniforms(meshProgramInfo, sphereUniforms);
  
          twgl.drawBufferInfo(gl, sphereBufferInfo);
          break;  

        case 'cone':
          // ------ Draw the cone --------
  
          // Setup all the needed attributes.
          gl.bindVertexArray(coneVAO);
  
          coneUniforms.u_matrix = computeMatrix(
            viewProjectionMatrix,
            {x: config[i].translationX, y: config[i].translationY, z: config[i].translationZ},
            {x: config[i].rotateX, y: config[i].rotateY, z: config[i].rotateZ},
            config[i].scale
          );
  
          // Set the uniforms we just computed
          twgl.setUniforms(meshProgramInfo, coneUniforms);
  
          twgl.drawBufferInfo(gl, coneBufferInfo);
          break;
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
