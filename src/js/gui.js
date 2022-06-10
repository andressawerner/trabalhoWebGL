
var vectorObjects = []
var vectorFolderObjects = []
var formats = ['fish1', 'fish2', 'fish3']

var button = { 
  clickme: 0,
};

const loadGUI = () => {

  const gui = new dat.GUI();
  var count = 0;
  var countCam = 0;
  
  // BOTÕES OBJETOS
  var addObject = { 'Add Object': function(){
     const obj = gui.addFolder(`Object ${count + 1}`);

     obj.add(deleting, 'Delete Object ' + (count+1));

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

    animation.add(addAnimation, `Add Animation ${count + 1}`);

    animation.add(animate, `Animate Object ${count + 1}`);


    count++;
    vectorFolderObjects.push(obj) 
    vectorObjects.push(formats[Math.floor(Math.random() * 3)]);
    for (i = 0; i < lookAt.length; i++){
      lookAt[i].add(looking, `Object ${count}`);
      lookAcompanhar[i].add(lookingAcomp, `Object ${count}`);
    }
  }};

  gui.add(addObject, 'Add Object');

  // BOTÕES CÂMERA
    // BOTÃO ADD CÂMERA
    var addCamera = { 'Add Camera': function(){

      var camera = cameras.addFolder(`Câmera ${countCam + 1}`);
  
      cam.push({ 
        rotateX: degToRad(0), 
        rotateY: degToRad(0), 
        rotateZ: degToRad(0), 
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
        translationX: 0, 
        translationY: 0, 
        translationZ: 100,
        zoom: 90,
        lookAtX: 0,
        lookAtY: 0,
        lookAtZ: 0,
        lookingObject: false,
        pTranslation: [0, 0, 100]
      });
  
      camera.add(cam[countCam], "zoom", 10, 150, 1);
    
      const rotate = camera.addFolder(`Rotação no Eixo`);
      rotate.add(cam[countCam], "rotateX", -1, 1, 0.01).name('X');
      rotate.add(cam[countCam], "rotateY", -1, 1, 0.01).name('Y');
      rotate.add(cam[countCam], "rotateZ", -1, 1, 0.01).name('Z');
    
      const translation = camera.addFolder(`Translação Linear`);
      translation.add(cam[countCam], "translationX", -100, 100, 0.01).name('X');
      translation.add(cam[countCam], "translationY", -100, 100, 0.01).name('Y');
      translation.add(cam[countCam], "translationZ", -100, 200, 0.01).name('Z');
    
      const bezier = camera.addFolder(`Translação Bezier`);
      bezier.add(cam[countCam], "bezier").name('Bezier');
      bezier.add(cam[countCam], "bezierT", 0, 1, 0.01).name('t');
      bezier.add(cam[countCam], "bezierX1", -100, 100, 0.5).name('1: X');
      bezier.add(cam[countCam], "bezierY1", -100, 100, 0.5).name('1: Y');
    
      bezier.add(cam[countCam], "bezierX2", -100, 100, 0.5).name('2: X');
      bezier.add(cam[countCam], "bezierY2", -100, 100, 0.5).name('2: Y');
    
      bezier.add(cam[countCam], "bezierX3", -100, 100, 0.5).name('3: X');
      bezier.add(cam[countCam], "bezierY3", -100, 100, 0.5).name('3: Y');
    
      bezier.add(cam[countCam], "bezierX4", -100, 100, 0.5).name('4: X');
      bezier.add(cam[countCam], "bezierY4", -100, 100, 0.5).name('4: Y');
    
      lookAt[countCam] = camera.addFolder(`Olhar para`);
    
      let textFilter = 'Olhar para'
      let nodeFiltered = Array.prototype.slice.call(document.querySelectorAll('.folder .title')).filter((arg) => arg.innerText == textFilter);
      nodeFiltered[countCam].setAttribute('id', 'olhar_para');
    
      lookAcompanhar[countCam] = camera.addFolder(`Acompanhar`);
    
      textFilter = 'Acompanhar'
      nodeFiltered = Array.prototype.slice.call(document.querySelectorAll('.folder .title')).filter((arg) => arg.innerText == textFilter);
      nodeFiltered[countCam].setAttribute('id', 'acompanhar');
  
      for (i = 1; i <= count ; i++){
        if (vectorObjects[i-1] != '') {
          lookAt[countCam].add(looking, `Object ${i}`);
          lookAcompanhar[countCam].add(lookingAcomp, `Object ${i}`);
        }
      }

      const animation = camera.addFolder(`Animação`);
      animationCam.push({ 
        time: 1,
        rotateX: 0, 
        rotateY: 0, 
        rotateZ: 0, 
        translationX: 0, 
        translationY: 0, 
        translationZ: 0,
        scale: 0,
      });
  
      animation.add(animationCam[countCam], "time", 1, 10, 0.1);
      animation.add(animationCam[countCam], "scale", -10, 10, 0.05).name('zoom');
  
      const animationRotate = animation.addFolder(`Rotação no Eixo`);
      animationRotate.add(animationCam[countCam], "rotateX", -10, 10, 0.5).name('X');
      animationRotate.add(animationCam[countCam], "rotateY", -10, 10, 0.5).name('Y');
      animationRotate.add(animationCam[countCam], "rotateZ", -10, 10, 0.5).name('Z');
  
      const animationTranslation = animation.addFolder(`Translação Linear`);
      animationTranslation.add(animationCam[countCam], "translationX", -10, 10, 0.5).name('X');
      animationTranslation.add(animationCam[countCam], "translationY", -10, 10, 0.5).name('Y');
      animationTranslation.add(animationCam[countCam], "translationZ", -10, 10, 0.5).name('Z');
  
      animation.add(addAnimationCam, `Add Animation ${countCam + 1}`);
  
      animation.add(animate, `Animate Camera ${countCam + 1}`);
  
      countCam++;
   }};

  var cameras = gui.addFolder('Câmeras');

  cameras.add(addCamera, 'Add Camera');

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

  const bezier = camera.addFolder(`Translação Bezier`);
  bezier.add(cam[countCam], "bezier").name('Bezier');
  bezier.add(cam[countCam], "bezierT", 0, 1, 0.01).name('t');
  bezier.add(cam[countCam], "bezierX1", -100, 100, 0.5).name('1: X');
  bezier.add(cam[countCam], "bezierY1", -100, 100, 0.5).name('1: Y');

  bezier.add(cam[countCam], "bezierX2", -100, 100, 0.5).name('2: X');
  bezier.add(cam[countCam], "bezierY2", -100, 100, 0.5).name('2: Y');

  bezier.add(cam[countCam], "bezierX3", -100, 100, 0.5).name('3: X');
  bezier.add(cam[countCam], "bezierY3", -100, 100, 0.5).name('3: Y');

  bezier.add(cam[countCam], "bezierX4", -100, 100, 0.5).name('4: X');
  bezier.add(cam[countCam], "bezierY4", -100, 100, 0.5).name('4: Y');

  var lookAt = []
  lookAt[0] = camera.addFolder(`Olhar para`);

  let textFilter = 'Olhar para'
  let nodeFiltered = Array.prototype.slice.call(document.querySelectorAll('.folder .title')).filter((arg) => arg.innerText == textFilter);
  nodeFiltered[0].setAttribute('id', 'olhar_para');

  var lookAcompanhar = []
  lookAcompanhar[0] = camera.addFolder(`Acompanhar`);

  textFilter = 'Acompanhar'
  nodeFiltered = Array.prototype.slice.call(document.querySelectorAll('.folder .title')).filter((arg) => arg.innerText == textFilter);
  nodeFiltered[0].setAttribute('id', 'acompanhar');

  const animation = camera.addFolder(`Animação`);
  animationCam.push({ 
    time: 1,
    rotateX: 0, 
    rotateY: 0, 
    rotateZ: 0, 
    translationX: 0, 
    translationY: 0, 
    translationZ: 0,
    scale: 0,
  });

  animation.add(animationCam[countCam], "time", 1, 10, 0.1);
  animation.add(animationCam[countCam], "scale", -10, 10, 0.05).name('zoom');

  const animationRotate = animation.addFolder(`Rotação no Eixo`);
  animationRotate.add(animationCam[countCam], "rotateX", -10, 10, 0.5).name('X');
  animationRotate.add(animationCam[countCam], "rotateY", -10, 10, 0.5).name('Y');
  animationRotate.add(animationCam[countCam], "rotateZ", -10, 10, 0.5).name('Z');

  const animationTranslation = animation.addFolder(`Translação Linear`);
  animationTranslation.add(animationCam[countCam], "translationX", -10, 10, 0.5).name('X');
  animationTranslation.add(animationCam[countCam], "translationY", -10, 10, 0.5).name('Y');
  animationTranslation.add(animationCam[countCam], "translationZ", -10, 10, 0.5).name('Z');

  animation.add(addAnimationCam, `Add Animation ${count + 1}`);

  animation.add(animate, `Animate Camera ${count + 1}`);

  countCam++;
  
  function addFishDefault(idFish, scale, [translationX, traslationY, translationZ], [rotateX, rotateY, rotateZ]){

    const obj = gui.addFolder(`Object ${count + 1}`);

    obj.add(deleting, 'Delete Object ' + (count+1));

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
   animationRotate.add(animationConfig[count], "rotateX", -10, 10, 0.5).name('X');
   animationRotate.add(animationConfig[count], "rotateY", -10, 10, 0.5).name('Y');
   animationRotate.add(animationConfig[count], "rotateZ", -10, 10, 0.5).name('Z');

   const animationTranslation = animation.addFolder(`Translação Linear`);
   animationTranslation.add(animationConfig[count], "translationX", -10, 10, 0.5).name('X');
   animationTranslation.add(animationConfig[count], "translationY", -10, 10, 0.5).name('Y');
   animationTranslation.add(animationConfig[count], "translationZ", -10, 10, 0.5).name('Z');

   animation.add(addAnimation, `Add Animation ${count + 1}`);

   animation.add(animate, `Animate Object ${count + 1}`);


   count++;
   vectorFolderObjects.push(obj) 
   vectorObjects.push(idFish);
   for (i = 0; i < lookAt.length; i++){
     lookAt[i].add(looking, `Object ${count}`);
     lookAcompanhar[i].add(lookingAcomp, `Object ${count}`);
   }
  }

  addFishDefault('fish1', 20, [0, degToRad(20), degToRad(20)], [degToRad(20), degToRad(20), degToRad(20)]);
  addFishDefault('fish2', 10, [-28, -37, 0], [4.3, 6.3, 4.7]);
  addFishDefault('fish3', 0, [0,0,0], [0,0,0]);

  animationObjects.push({ 
    object:0,
    time: 12,
    rotateX: 0, 
    rotateY: 0, 
    rotateZ: 0, 
    translationX: 10, 
    translationY: 0, 
    translationZ: 0,
    scale: 0,
  },{ 
    object: 0,
    time: 3,
    rotateX: 0, 
    rotateY: 0, 
    rotateZ: degToRad(60), 
    translationX: 0, 
    translationY: 0, 
    translationZ: 0,
    scale: 0,
  },{ 
    object: 0,
    time: 12,
    rotateX: 0, 
    rotateY: 0, 
    rotateZ: 0, 
    translationX: -10, 
    translationY: 0, 
    translationZ: 0,
    scale: 0,
  },{ 
    object: 0,
    time: 3,
    rotateX: 0, 
    rotateY: 0, 
    rotateZ: degToRad(60), 
    translationX: 0, 
    translationY: 0, 
    translationZ: 0,
    scale: 0,
  });
  animationPlay = true;

};
