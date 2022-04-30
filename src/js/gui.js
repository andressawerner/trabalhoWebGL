
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
      translationX: 0, 
      translationY: 0, 
      translationZ: 0,
      scale: 1
    })

    obj.add(config[count], "scale", 0, 10, 0.1);

    const rotate = obj.addFolder(`Rotação no Eixo`);
    rotate.add(config[count], "rotateX", 0, 20, 0.5);
    rotate.add(config[count], "rotateY", 0, 20, 0.5);
    rotate.add(config[count], "rotateZ", 0, 20, 0.5);

    const translation = obj.addFolder(`Translação Linear`);
    translation.add(config[count], "translationX", -100, 100, 0.5);
    translation.add(config[count], "translationY", -100, 100, 0.5);
    translation.add(config[count], "translationZ", -100, 100, 0.5);
     count++;
     vectorFolderObjects.push(obj) 
     vectorObjects.push(formats[Math.floor(Math.random() * 3)]);
     lookAt.add(looking, `Object ${count}`);
     lookAcompanhar.add(lookingAcomp, `Object ${count}`);
  }};

  gui.add(addObject, 'Add Object');


  // BOTÕES CÂMERA
  var camera = gui.addFolder('Câmera');
  camera.add(cam[countCam], "zoom", 0, 100, 1);

  const rotate = camera.addFolder(`Rotação no Eixo`);
  rotate.add(cam[countCam], "rotateX", 0, 20, 0.5);
  rotate.add(cam[countCam], "rotateY", 0, 20, 0.5);
  rotate.add(cam[countCam], "rotateZ", 0, 20, 0.5);

  const translation = camera.addFolder(`Translação Linear`);
  translation.add(cam[countCam], "translationX", -100, 100, 0.01);
  translation.add(cam[countCam], "translationY", -100, 100, 0.01);
  translation.add(cam[countCam], "translationZ", -100, 200, 0.01);

  var lookAt = camera.addFolder(`Olhar para`);

  let textFilter = 'Olhar para'
  let nodeFiltered = Array.prototype.slice.call(document.querySelectorAll('.folder .title')).filter((arg) => arg.innerText == textFilter);
  nodeFiltered[0].setAttribute('id', 'olhar_para');

  var lookAcompanhar = camera.addFolder(`Acompanhar`);

  textFilter = 'Acompanhar'
  nodeFiltered = Array.prototype.slice.call(document.querySelectorAll('.folder .title')).filter((arg) => arg.innerText == textFilter);
  nodeFiltered[0].setAttribute('id', 'acompanhar');

};
