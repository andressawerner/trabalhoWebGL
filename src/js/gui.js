
var vectorObjects = []
var vectorFolderObjects = []
var formats = ['cube', 'sphere', 'cone']

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
      text: '',
    })

    obj.add(config[count], "scale", 0, 10, 0.1);
    obj.add(config[count], "text");

    const rotate = obj.addFolder(`Rotação no Eixo`);
    rotate.add(config[count], "rotateX", 0, 20, 0.5).name('X');
    rotate.add(config[count], "rotateY", 0, 20, 0.5).name('Y');
    rotate.add(config[count], "rotateZ", 0, 20, 0.5).name('Z');

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

    count++;
    vectorFolderObjects.push(obj) 
    vectorObjects.push(formats[Math.floor(Math.random() * 3)]);
    lookAt.add(looking, `Object ${count}`);
    lookAcompanhar.add(lookingAcomp, `Object ${count}`);



  }};

  gui.add(addObject, 'Add Object');


  // BOTÕES CÂMERA
  var camera = gui.addFolder('Câmera');

  camera.add(cam[countCam], "zoom", 10, 150, 1);

  const rotate = camera.addFolder(`Rotação no Eixo`);
  rotate.add(cam[countCam], "rotateX", 0, 20, 0.5).name('X');
  rotate.add(cam[countCam], "rotateY", 0, 20, 0.5).name('Y');
  rotate.add(cam[countCam], "rotateZ", 0, 20, 0.5).name('Z');

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

  var lookAt = camera.addFolder(`Olhar para`);

  let textFilter = 'Olhar para'
  let nodeFiltered = Array.prototype.slice.call(document.querySelectorAll('.folder .title')).filter((arg) => arg.innerText == textFilter);
  nodeFiltered[0].setAttribute('id', 'olhar_para');

  var lookAcompanhar = camera.addFolder(`Acompanhar`);

  textFilter = 'Acompanhar'
  nodeFiltered = Array.prototype.slice.call(document.querySelectorAll('.folder .title')).filter((arg) => arg.innerText == textFilter);
  nodeFiltered[0].setAttribute('id', 'acompanhar');

};
