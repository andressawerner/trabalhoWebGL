const degToRad = (d) => (d * Math.PI) / 180;

const radToDeg = (r) => (r * 180) / Math.PI;

const localObject = (index) => {
  if (config[index]){
    cam[0].lookAtX = config[index].translationX
    cam[0].lookAtY = config[index].translationY
    cam[0].lookAtZ = config[index].translationZ
  }
};

const deleteObject = (index) => console.log("deleted object " + index);
