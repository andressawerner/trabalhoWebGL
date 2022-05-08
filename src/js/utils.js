const degToRad = (d) => (d * Math.PI) / 180;

const radToDeg = (r) => (r * 180) / Math.PI;

const localObject = (index, a) => {
  if (config[index]){
    cam[0].lookAtX = config[index].translationX
    cam[0].lookAtY = config[index].translationY
    cam[0].lookAtZ = config[index].translationZ
  }
  objectAcomp = index
  cam[0].lookingObject = a
};

const deleteObject = (index) => {
    const textFilter = `Object ${index + 1}`
    vectorObjects[index] = ''
    const nodeFiltered = Array.prototype.slice.call(document.querySelectorAll('.folder .title')).filter((arg) => arg.innerText == textFilter);
    nodeFiltered[0].closest('.folder').setAttribute('class', 'none');

    const lookRemover = document.querySelectorAll('#olhar_para')
    for (j = 0; j < lookRemover.length; j++){
      const lookRemove = lookRemover[j].parentElement.children
      for (i = 0; i < lookRemove.length; i++) {
        if (lookRemove[i].querySelector('.property-name')?.innerText == textFilter) {
          lookRemove[i].querySelector('.property-name')?.parentElement.parentElement.setAttribute('class', 'none')
        }
      }
    }

    const lookAcompRemover = document.querySelectorAll('#acompanhar')
    for (j = 0; j < lookAcompRemover.length; j++){
      const lookAcompRemove = lookAcompRemover[j].parentElement.children
      for (i = 0; i < lookAcompRemove.length; i++) {
        if (lookAcompRemove[i].querySelector('.property-name')?.innerText == textFilter) {
          lookAcompRemove[i].querySelector('.property-name')?.parentElement.parentElement.setAttribute('class', 'none')
        }
      }
    }


    if(cam[0].lookingObject && objectAcomp == index) {
      cam[0].lookAtX = config[index].translationX
      cam[0].lookAtY = config[index].translationY
      cam[0].lookAtZ = config[index].translationZ
      cam[0].lookingObject = false
    }

};

const arrayIsEqual = (a,b) => {
  if (a.length != b.length) return false;

  for (var i = 0; i < b.length; i++) {
    if (a[i] != b[i]) {
      return false;
    }
  }
  return true;
};


const bezier = (t, p1, p2, p3, p4) => {
  var invT = (1 - t)
  var x = ((p1.x) * invT * invT * invT) +
            ((p2.x) * 3 * t * invT * invT) +
            (p3.x * 3 * invT * t * t) +
            (p4.x * t * t * t);
  var y = ((p1.y) * invT * invT * invT) +
            (p2.y * 3 * t * invT * invT) +
            (p3.y * 3 * invT * t * t) +
            ((p4.y) * t * t * t);
  return [x, y];
}

const pointRotation = (status, points) => {
  //rotação no ponto

  return [0, 0, 0];
}