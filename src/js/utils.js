const degToRad = (d) => (d * Math.PI) / 180;

const radToDeg = (r) => (r * 180) / Math.PI;

const localObject = (index, a) => {
  if (config[index]){
    cam[selectedCam].lookAtX = config[index].translationX
    cam[selectedCam].lookAtY = config[index].translationY
    cam[selectedCam].lookAtZ = config[index].translationZ
  }
  objectAcomp = index
  cam[selectedCam].lookingObject = a
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


    if(cam[selectedCam].lookingObject && objectAcomp == index) {
      cam[selectedCam].lookAtX = config[index].translationX
      cam[selectedCam].lookAtY = config[index].translationY
      cam[selectedCam].lookAtZ = config[index].translationZ
      cam[selectedCam].lookingObject = false
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

// função de deepClone copiada de: https://metring.com.br/clonar-objeto-em-javascript
const deepClone = obj => {
	// Se não for array ou objeto, retorna null
	if (typeof obj !== 'object' || obj === null) {
		return obj;
	}

	let cloned, i;

	// Handle: Date
	if (obj instanceof Date) {
		cloned = new Date(obj.getTime());
		return cloned;
	}

	// Handle: array
	if (obj instanceof Array) {
		let l;
		cloned = [];
		for (i = 0, l = obj.length; i < l; i++) {
			cloned[i] = deepClone(obj[i]);
		}

		return cloned;
	}

	// Handle: object
	cloned = {};
	for (i in obj) if (obj.hasOwnProperty(i)) {
		cloned[i] = deepClone(obj[i]);
	}

	return cloned;
}

const addAni = (index) => {
  animationConfig[index].object = index;
  var copia = deepClone(animationConfig[index]);
  animationObjects.push(copia);
};

const addAniCam = (index) => {
  animationCam[index].object = index;
  var copia = deepClone(animationCam[index]);
  animationCameras.push(copia);
};

const animateObj = (index) => {
  animationObjectPlay = index;
  animationPlay = true;
};

const animateCam = (index) => {
  animationCamIndex = index;
  animationPlayCam = true;
};