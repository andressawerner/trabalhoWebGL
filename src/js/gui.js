var count = 0;
var countCam = 0;
var vectorObjects = []
var vectorFolderObjects = []
var formats = ['fish1', 'fish2', 'fish3', 'fish4', 'food'];

var button = { 
  clickme: 0,
};

const loadGUI = () => {

  const gui = new dat.GUI();

  // BOTÕES OBJETOS
  var addObject = { 'Add Object': function(){
     const obj = gui.addFolder(`Object ${count + 1}`);

     config.push({ 
      rotateX: degToRad(20), 
      rotateY: degToRad(20), 
      rotateZ: degToRad(20), 
      pointRotation: false,
      diameter: 0,
      statusPointRotation: 90,
      rotatePointX: degToRad(20), 
      rotatePointY: degToRad(20), 
      rotatePointZ: degToRad(20), 
      translationX: 0, 
      translationY: 0, 
      translationZ: 0,
      scale: 1,
      bezier: false,
      bezierT: 0,
      bezierX1: -60,
      bezierX2: -60,
      bezierX3: 50,
      bezierX4: 50,
      bezierY1: -30,
      bezierY2: 30,
      bezierY3: 30,
      bezierY4: -30,
    })

    obj.add(config[count], "scale", 0, 10, 0.1);

    const rotate = obj.addFolder(`Rotação no Eixo`);
    rotate.add(config[count], "rotateX", 0, 20, 0.1).name('X');
    rotate.add(config[count], "rotateY", 0, 20, 0.1).name('Y');
    rotate.add(config[count], "rotateZ", 0, 20, 0.1).name('Z');

    const rotatePoint = obj.addFolder(`Rotação no Ponto`);
    rotatePoint.add(config[count], "pointRotation").name('Ativar');
    rotatePoint.add(config[count], "diameter", 1, 100, 2).name('Diâmetro');
    rotatePoint.add(config[count], "statusPointRotation", -360, 360, 2).name('Status');

    const translation = obj.addFolder(`Translação Linear`);
    translation.add(config[count], "translationX", -100, 100, 0.5).name('X');
    translation.add(config[count], "translationY", -100, 100, 0.5).name('Y');
    translation.add(config[count], "translationZ", -100, 100, 0.5).name('Z');

    const bezier = obj.addFolder(`Translação Bezier`);
    bezier.add(config[count], "bezier").name('Bezier');
    bezier.add(config[count], "bezierT", 0, 1, 0.01).name('t');
    bezier.add(config[count], "bezierX1", -100, 100, 0.5).name('1: X');
    bezier.add(config[count], "bezierY1", -100, 100, 0.5).name('1: Y');

    bezier.add(config[count], "bezierX2", -100, 100, 0.5).name('2: X');
    bezier.add(config[count], "bezierY2", -100, 100, 0.5).name('2: Y');

    bezier.add(config[count], "bezierX3", -100, 100, 0.5).name('3: X');
    bezier.add(config[count], "bezierY3", -100, 100, 0.5).name('3: Y');

    bezier.add(config[count], "bezierX4", -100, 100, 0.5).name('4: X');
    bezier.add(config[count], "bezierY4", -100, 100, 0.5).name('4: Y');

    const animation = obj.addFolder(`Animação`);
    animationConfig.push({ 
      time: 1,
      rotateX: 0, 
      rotateY: 0, 
      rotateZ: 0, 
      translationX: 0, 
      translationY: 0, 
      translationZ: 0,
      scale: 0,
    });

    animation.add(animationConfig[count], "time", 1, 10, 0.1);
    animation.add(animationConfig[count], "scale", -1, 1, 0.05);

    const animationRotate = animation.addFolder(`Rotação no Eixo`);
    animationRotate.add(animationConfig[count], "rotateX", -10, 10, 0.1).name('X');
    animationRotate.add(animationConfig[count], "rotateY", -10, 10, 0.1).name('Y');
    animationRotate.add(animationConfig[count], "rotateZ", -10, 10, 0.1).name('Z');

    const animationTranslation = animation.addFolder(`Translação Linear`);
    animationTranslation.add(animationConfig[count], "translationX", -10, 10, 0.5).name('X');
    animationTranslation.add(animationConfig[count], "translationY", -10, 10, 0.5).name('Y');
    animationTranslation.add(animationConfig[count], "translationZ", -10, 10, 0.5).name('Z');

    count++;
    vectorFolderObjects.push(obj) 
    vectorObjects.push(formats[Math.floor(Math.random() * 3)]);
  }};

  //gui.add(addObject, 'Add Object');

  // BOTÕES CÂMERA

  var cameras = gui.addFolder('Câmeras');

  var selectCam = cameras.add(camerasS, "selected").name('Selecionar: ');

  var camera = cameras.addFolder('Câmera 1');

  camera.add(cam[countCam], "zoom", 10, 150, 1);

  const rotate = camera.addFolder(`Rotação no Eixo`);
  rotate.add(cam[countCam], "rotateX", -1, 1, 0.01).name('X');
  rotate.add(cam[countCam], "rotateY", -1, 1, 0.01).name('Y');
  rotate.add(cam[countCam], "rotateZ", -1, 1, 0.01).name('Z');

  const translation = camera.addFolder(`Translação Linear`);
  translation.add(cam[countCam], "translationX", -100, 100, 0.01).name('X');
  translation.add(cam[countCam], "translationY", -100, 100, 0.01).name('Y');
  translation.add(cam[countCam], "translationZ", -100, 200, 0.01).name('Z');

  countCam++;
  
  function addFishDefault(idFish, scale, [translationX, traslationY, translationZ], [rotateX, rotateY, rotateZ]){

    //const obj = gui.addFolder(`Object ${count + 1}`);
    config.push({ 
     rotateX: rotateX, 
     rotateY: rotateY, 
     rotateZ: rotateZ, 
     pointRotation: false,
     diameter: 0,
     statusPointRotation: 90,
     rotatePointX: degToRad(20), 
     rotatePointY: degToRad(20), 
     rotatePointZ: degToRad(20), 
     translationX: translationX, 
     translationY: traslationY, 
     translationZ: translationZ,
     scale: scale,
     bezier: false,
     bezierT: 0,
     bezierX1: -60,
     bezierX2: -60,
     bezierX3: 50,
     bezierX4: 50,
     bezierY1: -30,
     bezierY2: 30,
     bezierY3: 30,
     bezierY4: -30,
   })

  //  obj.add(config[count], "scale", 0, 10, 0.1);

  //  const rotate = obj.addFolder(`Rotação no Eixo`);
  //  rotate.add(config[count], "rotateX", 0, 20, 0.1).name('X');
  //  rotate.add(config[count], "rotateY", 0, 20, 0.1).name('Y');
  //  rotate.add(config[count], "rotateZ", 0, 20, 0.1).name('Z');

  //  const rotatePoint = obj.addFolder(`Rotação no Ponto`);
  //  rotatePoint.add(config[count], "pointRotation").name('Ativar');
  //  rotatePoint.add(config[count], "diameter", 1, 100, 2).name('Diâmetro');
  //  rotatePoint.add(config[count], "statusPointRotation", -360, 360, 2).name('Status');

  //  const translation = obj.addFolder(`Translação Linear`);
  //  translation.add(config[count], "translationX", -100, 100, 0.5).name('X');
  //  translation.add(config[count], "translationY", -100, 100, 0.5).name('Y');
  //  translation.add(config[count], "translationZ", -100, 100, 0.5).name('Z');

  //  const animation = obj.addFolder(`Animação`);
   animationConfig.push({ 
     time: 1,
     rotateX: 0, 
     rotateY: 0, 
     rotateZ: 0, 
     translationX: 0, 
     translationY: 0, 
     translationZ: 0,
     scale: 0,
   });

  //  animation.add(animationConfig[count], "time", 1, 10, 0.1);
  //  animation.add(animationConfig[count], "scale", -1, 1, 0.05);

  //  const animationRotate = animation.addFolder(`Rotação no Eixo`);
  //  animationRotate.add(animationConfig[count], "rotateX", -10, 10, 0.5).name('X');
  //  animationRotate.add(animationConfig[count], "rotateY", -10, 10, 0.5).name('Y');
  //  animationRotate.add(animationConfig[count], "rotateZ", -10, 10, 0.5).name('Z');

  //  const animationTranslation = animation.addFolder(`Translação Linear`);
  //  animationTranslation.add(animationConfig[count], "translationX", -10, 10, 0.5).name('X');
  //  animationTranslation.add(animationConfig[count], "translationY", -10, 10, 0.5).name('Y');
  //  animationTranslation.add(animationConfig[count], "translationZ", -10, 10, 0.5).name('Z');

   //animation.add(addAnimation, `Add Animation ${count + 1}`);

   //animation.add(animate, `Animate Object ${count + 1}`);


   count++;
   vectorObjects.push(idFish == 'food' ? '' : idFish);
  }

  addFishDefault('fish1', 10, [-24, 28.5, 0], [4.7, 0, 1.6]);
  addFishDefault('fish2', 0.02, [-100, -37, 0], [6.1, 8.3, 12.6]);
  addFishDefault('fish3', 8, [200,0,0], [3.1, 4.7, 2.9]);
  addFishDefault('fish4', 3, [80,10,10], [4.7, 0, 1.6]);
  addFishDefault('fish1', 10, [-60, -20, 0], [4.7, 0, 1.6]);
  addFishDefault('fish2', 0.02, [-80, -37, -20], [6.1, 8.3, 12.6]);
  addFishDefault('fish3', 8, [270,-50,0], [3.1, 4.7, 2.9]);
  addFishDefault('fish4', .01, [0,100,0], [0,0,0]);

  //ANIMAÇÃO PEIXE 0
  animationObjects.push({ 
    object: 0,
    time: 18,
    rotateX: 0, 
    rotateY: 0, 
    rotateZ: 0, 
    translationX: 14, 
    translationY: 0, 
    translationZ: 0,
    scale: 0,
  },{ 
    object: 0,
    time: 1,
    rotateX: 0, 
    rotateY: 0, 
    rotateZ: degToRad(180), 
    translationX: 0, 
    translationY: 0, 
    translationZ: 0,
    scale: 0,
  },{ 
    object: 0,
    time: 18,
    rotateX: 0, 
    rotateY: 0, 
    rotateZ: 0, 
    translationX: -14, 
    translationY: 0, 
    translationZ: 0,
    scale: 0,
  },{ 
    object: 0,
    time: 1,
    rotateX: 0, 
    rotateY: 0, 
    rotateZ: degToRad(180), 
    translationX: 0, 
    translationY: 0, 
    translationZ: 0,
    scale: 0,
  });

  //ANIMAÇÃO PEIXE 1
  animationObjects.push({ 
    object: 1,
    time: 12,
    rotateX: 0, 
    rotateY: 0, 
    rotateZ: 0, 
    translationX: 20, 
    translationY: 0, 
    translationZ: 0,
    scale: 0,
  },{ 
    object: 1,
    time: 1,
    rotateX: 0, 
    rotateY: 0, 
    rotateZ: degToRad(180), 
    translationX: 0, 
    translationY: 0, 
    translationZ: 0,
    scale: 0,
  },{ 
    object: 1,
    time: 18,
    rotateX: 0, 
    rotateY: 0, 
    rotateZ: 0, 
    translationX: -20, 
    translationY: 0, 
    translationZ: 0,
    scale: 0,
  },{ 
    object: 1,
    time: 1,
    rotateX: 0, 
    rotateY: 0, 
    rotateZ: degToRad(180), 
    translationX: 0, 
    translationY: 0, 
    translationZ: 0,
    scale: 0,
  });

  //ANIMAÇÃO PEIXE 2
  animationObjects.push({ 
    object: 2,
    time: 8,
    rotateX: 0, 
    rotateY: 0, 
    rotateZ: 0, 
    translationX: 14, 
    translationY: 0, 
    translationZ: 0,
    scale: 0,
  },{ 
    object: 2,
    time: 1,
    rotateX: 0, 
    rotateY: degToRad(180), 
    rotateZ: 0, 
    translationX: 0, 
    translationY: 0, 
    translationZ: 0,
    scale: 0,
  },{ 
    object: 2,
    time: 8,
    rotateX: 0, 
    rotateY: 0, 
    rotateZ: 0, 
    translationX: -14, 
    translationY: 0, 
    translationZ: 0,
    scale: 0,
  },{ 
    object: 2,
    time: 1,
    rotateX: 0, 
    rotateY: degToRad(180), 
    rotateZ: 0, 
    translationX: 0, 
    translationY: 0, 
    translationZ: 0,
    scale: 0,
  });

  //ANIMAÇÃO PEIXE 3
  animationObjects.push({ 
    object: 3,
    time: 18,
    rotateX: 0, 
    rotateY: 0, 
    rotateZ: 0, 
    translationX: -20, 
    translationY: 0, 
    translationZ: 0,
    scale: 0,
  },{ 
    object: 3,
    time: 1,
    rotateX: 0, 
    rotateY: degToRad(-180), 
    rotateZ: 0, 
    translationX: 0, 
    translationY: 0, 
    translationZ: 0,
    scale: 0,
  },{ 
    object: 3,
    time: 18,
    rotateX: 0, 
    rotateY: 0, 
    rotateZ: 0, 
    translationX: 20, 
    translationY: 0, 
    translationZ: 0,
    scale: 0,
  },{ 
    object: 3,
    time: 1,
    rotateX: 0, 
    rotateY: degToRad(-180), 
    rotateZ: 0, 
    translationX: 0, 
    translationY: 0, 
    translationZ: 0,
    scale: 0,
  });

  //ANIMAÇÃO PEIXE 4
  animationObjects.push({ 
    object: 4,
    time: 4,
    rotateX: 0, 
    rotateY: 0, 
    rotateZ: 0, 
    translationX: 10, 
    translationY: 0, 
    translationZ: 0,
    scale: 0,
  },{ 
    object: 4,
    time: 1,
    rotateX: 0, 
    rotateY: 0, 
    rotateZ: degToRad(180), 
    translationX: 0, 
    translationY: 0, 
    translationZ: 0,
    scale: 0,
  },{ 
    object: 4,
    time: 12,
    rotateX: 0, 
    rotateY: 0, 
    rotateZ: 0, 
    translationX: -26, 
    translationY: 0, 
    translationZ: 0,
    scale: 0,
  },{ 
    object: 4,
    time: 1,
    rotateX: 0, 
    rotateY: 0, 
    rotateZ: degToRad(180), 
    translationX: 0, 
    translationY: 0, 
    translationZ: 0,
    scale: 0,
  },{ 
    object: 4,
    time: 12,
    rotateX: 0, 
    rotateY: 0, 
    rotateZ: 0, 
    translationX: 26, 
    translationY: 0, 
    translationZ: 0,
    scale: 0,
  });

  //ANIMAÇÃO PEIXE 5
  animationObjects.push({ 
    object: 5,
    time: 10,
    rotateX: 0, 
    rotateY: 0, 
    rotateZ: 0, 
    translationX: 20, 
    translationY: 0, 
    translationZ: 0,
    scale: 0,
  },{ 
    object: 5,
    time: 1,
    rotateX: 0, 
    rotateY: 0, 
    rotateZ: degToRad(180), 
    translationX: 0, 
    translationY: 0, 
    translationZ: 0,
    scale: 0,
  },{ 
    object: 5,
    time: 10,
    rotateX: 0, 
    rotateY: 0, 
    rotateZ: 0, 
    translationX: -20, 
    translationY: 0, 
    translationZ: 0,
    scale: 0,
  },{ 
    object: 5,
    time: 1,
    rotateX: 0, 
    rotateY: 0, 
    rotateZ: degToRad(180), 
    translationX: 0, 
    translationY: 0, 
    translationZ: 0,
    scale: 0,
  });

  //ANIMAÇÃO PEIXE 6
  animationObjects.push({ 
    object: 6,
    time: 20,
    rotateX: 0, 
    rotateY: 0, 
    rotateZ: 0, 
    translationX: 19, 
    translationY: 0, 
    translationZ: 0,
    scale: 0,
  },{ 
    object: 6,
    time: 1,
    rotateX: 0, 
    rotateY: degToRad(180), 
    rotateZ: 0, 
    translationX: 0, 
    translationY: 0, 
    translationZ: 0,
    scale: 0,
  },{ 
    object: 6,
    time: 20,
    rotateX: 0, 
    rotateY: 0, 
    rotateZ: 0, 
    translationX: -19, 
    translationY: 0, 
    translationZ: 0,
    scale: 0,
  },{ 
    object: 6,
    time: 1,
    rotateX: 0, 
    rotateY: degToRad(180), 
    rotateZ: 0, 
    translationX: 0, 
    translationY: 0, 
    translationZ: 0,
    scale: 0,
  });

  //ANIMAÇÃO PEIXE 7
  animationObjects.push({ 
    object: 7,
    time: 10,
    rotateX: 0, 
    rotateY: 0, 
    rotateZ: 0, 
    translationX: -40, 
    translationY: 0, 
    translationZ: 0,
    scale: 0,
  },{ 
    object: 7,
    time: 1,
    rotateX: 0, 
    rotateY: degToRad(-180), 
    rotateZ: 0, 
    translationX: 0, 
    translationY: 0, 
    translationZ: 0,
    scale: 0,
  },{ 
    object: 7,
    time: 10,
    rotateX: 0, 
    rotateY: 0, 
    rotateZ: 0, 
    translationX: 40, 
    translationY: 0, 
    translationZ: 0,
    scale: 0,
  },{ 
    object: 7,
    time: 1,
    rotateX: 0, 
    rotateY: degToRad(-180), 
    rotateZ: 0, 
    translationX: 0, 
    translationY: 0, 
    translationZ: 0,
    scale: 0,
  });

  for (let ifood = numFishesTotal ; ifood < 70; ifood++){
    addFishDefault('food', .01, [0,100,0], [0,0,0]);//4
    animationObjects.push({ 
      object: ifood,
      time: 18,
      rotateX: 0, 
      rotateY: 0, 
      rotateZ: 0, 
      translationX: 0, 
      translationY: -26, 
      translationZ: 0,
      scale: 0,
    });
  }

  animationPlay = true;
};
