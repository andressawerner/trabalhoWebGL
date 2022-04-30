var config = [{ 
  rotateX: degToRad(20), 
  rotateY: degToRad(20), 
  rotateZ: degToRad(20), 
  translationX: 0, 
  translationY: 0, 
  translationZ: 0,
  scale: 1
}];

var cam = [{ 
  rotateX: degToRad(20), 
  rotateY: degToRad(20), 
  rotateZ: degToRad(20), 
  translationX: 0, 
  translationY: 0, 
  translationZ: 100,
  zoom: 1,
  lookAtX: 0,
  lookAtY: 0,
  lookAtZ: 0,
}];

var looking = {
  'Object 1': function(){
    const index = 0
    if (config[index]){
      cam[0].lookAtX = config[index].translationX
      cam[0].lookAtY = config[index].translationY
      cam[0].lookAtZ = config[index].translationZ
    }
  },
  'Object 2': function(){
    const index = 1
    if (config[index]){
      cam[0].lookAtX = config[index].translationX
      cam[0].lookAtY = config[index].translationY
      cam[0].lookAtZ = config[index].translationZ
    }
  },
  'Object 3': function(){
    const index = 2
    if (config[index]){
      cam[0].lookAtX = config[index].translationX
      cam[0].lookAtY = config[index].translationY
      cam[0].lookAtZ = config[index].translationZ
    }
  },
  'Object 4': function(){
    const index = 3
    if (config[index]){
      cam[0].lookAtX = config[index].translationX
      cam[0].lookAtY = config[index].translationY
      cam[0].lookAtZ = config[index].translationZ
    }
  },
  'Object 5': function(){
    const index = 4
    if (config[index]){
      cam[0].lookAtX = config[index].translationX
      cam[0].lookAtY = config[index].translationY
      cam[0].lookAtZ = config[index].translationZ
    }
  },
  'Object 6': function(){
    const index = 5
    if (config[index]){
      cam[0].lookAtX = config[index].translationX
      cam[0].lookAtY = config[index].translationY
      cam[0].lookAtZ = config[index].translationZ
    }
  },
  'Object 7': function(){
    const index = 6
    if (config[index]){
      cam[0].lookAtX = config[index].translationX
      cam[0].lookAtY = config[index].translationY
      cam[0].lookAtZ = config[index].translationZ
    }
  },
  'Object 8': function(){
    const index = 7
    if (config[index]){
      cam[0].lookAtX = config[index].translationX
      cam[0].lookAtY = config[index].translationY
      cam[0].lookAtZ = config[index].translationZ
    }
  },
  'Object 9': function(){
    const index = 8
    if (config[index]){
      cam[0].lookAtX = config[index].translationX
      cam[0].lookAtY = config[index].translationY
      cam[0].lookAtZ = config[index].translationZ
    }
  },
  'Object 10': function(){
    const index = 9
    if (config[index]){
      cam[0].lookAtX = config[index].translationX
      cam[0].lookAtY = config[index].translationY
      cam[0].lookAtZ = config[index].translationZ
    }
  },
  'Object 11': function(){
    const index = 10
    if (config[index]){
      cam[0].lookAtX = config[index].translationX
      cam[0].lookAtY = config[index].translationY
      cam[0].lookAtZ = config[index].translationZ
    }
  },
};

var deleting = {
  'Delete Object 1': function(){
    const index = 0
    const textFilter = `Object ${index + 1}`
    vectorObjects[index] = ''
    const nodeFiltered = Array.prototype.slice.call(document.querySelectorAll('.folder .title')).filter((arg) => arg.innerText == textFilter);
    nodeFiltered[0].closest('.folder').setAttribute('class', 'none');

    const lookRemove = document.querySelector('#olhar_para').parentElement.children
    for (i = 0; i < lookRemove.length; i++) {
      if (lookRemove[i].querySelector('.property-name')?.innerText == textFilter) {
        lookRemove[i].querySelector('.property-name')?.parentElement.parentElement.setAttribute('class', 'none')
      }
    }
  },
  'Delete Object 2': function(){
    const index = 1
    const textFilter = `Object ${index + 1}`
    vectorObjects[index] = ''
    const nodeFiltered = Array.prototype.slice.call(document.querySelectorAll('.folder .title')).filter((arg) => arg.innerText == textFilter);
    nodeFiltered[0].closest('.folder').setAttribute('class', 'none');

    const lookRemove = document.querySelector('#olhar_para').parentElement.children
    for (i = 0; i < lookRemove.length; i++) {
      if (lookRemove[i].querySelector('.property-name')?.innerText == textFilter) {
        lookRemove[i].querySelector('.property-name')?.parentElement.parentElement.setAttribute('class', 'none')
      }
    }
 },
  'Delete Object 3': function(){
    const index = 2
    const textFilter = `Object ${index + 1}`
    vectorObjects[index] = ''
    const nodeFiltered = Array.prototype.slice.call(document.querySelectorAll('.folder .title')).filter((arg) => arg.innerText == textFilter);
    nodeFiltered[0].closest('.folder').setAttribute('class', 'none');

    const lookRemove = document.querySelector('#olhar_para').parentElement.children
    for (i = 0; i < lookRemove.length; i++) {
      if (lookRemove[i].querySelector('.property-name')?.innerText == textFilter) {
        lookRemove[i].querySelector('.property-name')?.parentElement.parentElement.setAttribute('class', 'none')
      }
    }
 },
 'Delete Object 4': function(){
  const index = 3
  const textFilter = `Object ${index + 1}`
  vectorObjects[index] = ''
  const nodeFiltered = Array.prototype.slice.call(document.querySelectorAll('.folder .title')).filter((arg) => arg.innerText == textFilter);
  nodeFiltered[0].closest('.folder').setAttribute('class', 'none');

  const lookRemove = document.querySelector('#olhar_para').parentElement.children
  for (i = 0; i < lookRemove.length; i++) {
    if (lookRemove[i].querySelector('.property-name')?.innerText == textFilter) {
      lookRemove[i].querySelector('.property-name')?.parentElement.parentElement.setAttribute('class', 'none')
    }
  }
},
'Delete Object 5': function(){
  const index = 4
  const textFilter = `Object ${index + 1}`
  vectorObjects[index] = ''
  const nodeFiltered = Array.prototype.slice.call(document.querySelectorAll('.folder .title')).filter((arg) => arg.innerText == textFilter);
  nodeFiltered[0].closest('.folder').setAttribute('class', 'none');

  const lookRemove = document.querySelector('#olhar_para').parentElement.children
  for (i = 0; i < lookRemove.length; i++) {
    if (lookRemove[i].querySelector('.property-name')?.innerText == textFilter) {
      lookRemove[i].querySelector('.property-name')?.parentElement.parentElement.setAttribute('class', 'none')
    }
  }
},
'Delete Object 6': function(){
  const index = 5
  const textFilter = `Object ${index + 1}`
  vectorObjects[index] = ''
  const nodeFiltered = Array.prototype.slice.call(document.querySelectorAll('.folder .title')).filter((arg) => arg.innerText == textFilter);
  nodeFiltered[0].closest('.folder').setAttribute('class', 'none');

  const lookRemove = document.querySelector('#olhar_para').parentElement.children
  for (i = 0; i < lookRemove.length; i++) {
    if (lookRemove[i].querySelector('.property-name')?.innerText == textFilter) {
      lookRemove[i].querySelector('.property-name')?.parentElement.parentElement.setAttribute('class', 'none')
    }
  }
},
'Delete Object 7': function(){
  const index = 6
  const textFilter = `Object ${index + 1}`
  vectorObjects[index] = ''
  const nodeFiltered = Array.prototype.slice.call(document.querySelectorAll('.folder .title')).filter((arg) => arg.innerText == textFilter);
  nodeFiltered[0].closest('.folder').setAttribute('class', 'none');

  const lookRemove = document.querySelector('#olhar_para').parentElement.children
  for (i = 0; i < lookRemove.length; i++) {
    if (lookRemove[i].querySelector('.property-name')?.innerText == textFilter) {
      lookRemove[i].querySelector('.property-name')?.parentElement.parentElement.setAttribute('class', 'none')
    }
  }
},
'Delete Object 8': function(){
  const index = 7
  const textFilter = `Object ${index + 1}`
  vectorObjects[index] = ''
  const nodeFiltered = Array.prototype.slice.call(document.querySelectorAll('.folder .title')).filter((arg) => arg.innerText == textFilter);
  nodeFiltered[0].closest('.folder').setAttribute('class', 'none');

  const lookRemove = document.querySelector('#olhar_para').parentElement.children
  for (i = 0; i < lookRemove.length; i++) {
    if (lookRemove[i].querySelector('.property-name')?.innerText == textFilter) {
      lookRemove[i].querySelector('.property-name')?.parentElement.parentElement.setAttribute('class', 'none')
    }
  }
},
'Delete Object 9': function(){
  const index = 8
  const textFilter = `Object ${index + 1}`
  vectorObjects[index] = ''
  const nodeFiltered = Array.prototype.slice.call(document.querySelectorAll('.folder .title')).filter((arg) => arg.innerText == textFilter);
  nodeFiltered[0].closest('.folder').setAttribute('class', 'none');

  const lookRemove = document.querySelector('#olhar_para').parentElement.children
  for (i = 0; i < lookRemove.length; i++) {
    if (lookRemove[i].querySelector('.property-name')?.innerText == textFilter) {
      lookRemove[i].querySelector('.property-name')?.parentElement.parentElement.setAttribute('class', 'none')
    }
  }
},
'Delete Object 10': function(){
  const index = 9
  const textFilter = `Object ${index + 1}`
  vectorObjects[index] = ''
  const nodeFiltered = Array.prototype.slice.call(document.querySelectorAll('.folder .title')).filter((arg) => arg.innerText == textFilter);
  nodeFiltered[0].closest('.folder').setAttribute('class', 'none');

  const lookRemove = document.querySelector('#olhar_para').parentElement.children
  for (i = 0; i < lookRemove.length; i++) {
    if (lookRemove[i].querySelector('.property-name')?.innerText == textFilter) {
      lookRemove[i].querySelector('.property-name')?.parentElement.parentElement.setAttribute('class', 'none')
    }
  }
},
};
