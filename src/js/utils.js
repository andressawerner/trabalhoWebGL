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

function parseOBJ(text) {
  // because indices are base 1 let's just fill in the 0th data
  const objPositions = [[0, 0, 0]];
  const objTexcoords = [[0, 0]];
  const objNormals = [[0, 0, 0]];

  // same order as `f` indices
  const objVertexData = [
    objPositions,
    objTexcoords,
    objNormals,
  ];

  // same order as `f` indices
  let webglVertexData = [
    [],   // positions
    [],   // texcoords
    [],   // normals
  ];

  function newGeometry() {
    // If there is an existing geometry and it's
    // not empty then start a new one.
    if (geometry && geometry.data.position.length) {
      geometry = undefined;
    }
    setGeometry();
  }

  function addVertex(vert) {
    const ptn = vert.split('/');
    ptn.forEach((objIndexStr, i) => {
      if (!objIndexStr) {
        return;
      }
      const objIndex = parseInt(objIndexStr);
      const index = objIndex + (objIndex >= 0 ? 0 : objVertexData[i].length);
      webglVertexData[i].push(...objVertexData[i][index]);
    });
  }

  const keywords = {
    v(parts) {
      objPositions.push(parts.map(parseFloat));
    },
    vn(parts) {
      objNormals.push(parts.map(parseFloat));
    },
    vt(parts) {
      // should check for missing v and extra w?
      objTexcoords.push(parts.map(parseFloat));
    },
    f(parts) {
      const numTriangles = parts.length - 2;
      for (let tri = 0; tri < numTriangles; ++tri) {
        addVertex(parts[0]);
        addVertex(parts[tri + 1]);
        addVertex(parts[tri + 2]);
      }
    },
  };

  const keywordRE = /(\w*)(?: )(.)/;
  const lines = text.split('\n');
  for (let lineNo = 0; lineNo < lines.length; ++lineNo) {
    const line = lines[lineNo].trim();
    if (line === '' || line.startsWith('#')) {
      continue;
    }
    const m = keywordRE.exec(line);
    if (!m) {
      continue;
    }
    const [, keyword, unparsedArgs] = m;
    const parts = line.split(/\s+/).slice(1);
    const handler = keywords[keyword];
    if (!handler) {
      console.warn('unhandled keyword:', keyword);  // eslint-disable-line no-console
      continue;
    }
    handler(parts, unparsedArgs);
  }

  return {
    position: webglVertexData[0],
    texcoord: webglVertexData[1],
    normal: webglVertexData[2],
  };
}

function initBkgnd(gl) {
  backTex = gl.createTexture();
  backTex.Img = new Image();
  backTex.Img.onload = function() {
      handleBkTex(backTex, gl);
  }
  backTex.Img.src = "src/styles/fundo-do-mar-para-videoconferencia_23-2148632597.webp";
}

function handleBkTex(tex, gl) {
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, tex.Img);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.bindTexture(gl.TEXTURE_2D, null);
}