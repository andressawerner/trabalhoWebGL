const degToRad = (d) => (d * Math.PI) / 180;

const radToDeg = (r) => (r * 180) / Math.PI;

const localObject = (index) => {
  if (config[index]){
    cam[0].lookAtX = config[index].translationX
    cam[0].lookAtY = config[index].translationY
    cam[0].lookAtZ = config[index].translationZ
  }
  lookingObject = false
};

const deleteObject = (index) => {
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
};
