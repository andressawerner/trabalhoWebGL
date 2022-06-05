var time = 0.005;
var selectedCam = 1;
var animationObjects = [];
var animationCameras = [];
var animationPlay = false;
var animationObjectPlay = 0;
var timePassed = 0;
var animationCamIndex = 0;
var animationPlayCam = false;

var config = [{ 
  rotateX: degToRad(20), 
  rotateY: degToRad(20), 
  rotateZ: degToRad(20), 
  pointRotation: false,
  diameter: 10,
  statusPointRotation: 90,
  rotatePointX: degToRad(20), 
  rotatePointY: degToRad(20), 
  rotatePointZ: degToRad(20), 
  translationX: -80, 
  translationY: 0, 
  translationZ: 0,
  scale: 4.5,
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
}];

var animationConfig = [{ 
  time: 1,
  rotateX: 0, 
  rotateY: 0, 
  rotateZ: 0, 
  translationX: 0, 
  translationY: 0, 
  translationZ: 0,
  scale: 0,
}];

var cam = [{ 
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
}];

var animationCam = [{ 
  time: 1,
  rotateX: 0, 
  rotateY: 0, 
  rotateZ: 0, 
  translationX: 0, 
  translationY: 0, 
  translationZ: 0,
  scale: 0,
}];

var camerasS = {
  selected: '1'
};

var objectAcomp = 0;

var looking = {
  'Object 1': function(){
    localObject(0, false)
  },
  'Object 2': function(){
    localObject(1, false)
  },
  'Object 3': function(){
    localObject(2, false)
  },
  'Object 4': function(){
    localObject(3, false)
  },
  'Object 5': function(){
    localObject(4, false)
  },
  'Object 6': function(){
    localObject(5, false)
  },
  'Object 7': function(){
    localObject(6, false)
  },
  'Object 8': function(){
    localObject(7, false)
  },
  'Object 9': function(){
    localObject(8, false)
  },
  'Object 10': function(){
    localObject(9, false)
  },
  'Object 11': function(){
    localObject(10, false)
  },
};

var lookingAcomp = {
  'Object 1': function(){
    localObject(0, true)
  },
  'Object 2': function(){
    localObject(1, true)
  },
  'Object 3': function(){
    localObject(2, true)
  },
  'Object 4': function(){
    localObject(3, true)
  },
  'Object 5': function(){
    localObject(4, true)
  },
  'Object 6': function(){
    localObject(5, true)
  },
  'Object 7': function(){
    localObject(6, true)
  },
  'Object 8': function(){
    localObject(7, true)
  },
  'Object 9': function(){
    localObject(8, true)
  },
  'Object 10': function(){
    localObject(9, true)
  },
  'Object 11': function(){
    localObject(10, true)
  },
};

var deleting = {
  'Delete Object 1': function(){
    deleteObject(0)
  },
  'Delete Object 2': function(){
    deleteObject(1)
 },
  'Delete Object 3': function(){
    deleteObject(2)
 },
 'Delete Object 4': function(){
  deleteObject(3)
},
'Delete Object 5': function(){
  deleteObject(4)
},
'Delete Object 6': function(){
  deleteObject(5)
},
'Delete Object 7': function(){
  deleteObject(6)
},
'Delete Object 8': function(){
  deleteObject(7)
},
'Delete Object 9': function(){
  deleteObject(8)
},
'Delete Object 10': function(){
  deleteObject(9)
},
'Delete Object 11': function(){
  deleteObject(10)
},
};


var addAnimation = {
  'Add Animation 1': function(){
    addAni(0)
  },
  'Add Animation 2': function(){
    addAni(1)
  },
  'Add Animation 3': function(){
    addAni(2)
  },
  'Add Animation 4': function(){
    addAni(3)
  },
  'Add Animation 5': function(){
    addAni(4)
  },
  'Add Animation 6': function(){
    addAni(5)
  },
  'Add Animation 7': function(){
    addAni(6)
  },
  'Add Animation 8': function(){
    addAni(7)
  },
  'Add Animation 9': function(){
    addAni(8)
  },
  'Add Animation 10': function(){
    addAni(9)
  },
  'Add Animation 11': function(){
    addAni(10)
  },


}

var addAnimationCam = {
  'Add Animation 1': function(){
    addAniCam(0)
  },
  'Add Animation 2': function(){
    addAniCam(1)
  },
  'Add Animation 3': function(){
    addAniCam(2)
  },
  'Add Animation 4': function(){
    addAniCam(3)
  },
  'Add Animation 5': function(){
    addAniCam(4)
  },
  'Add Animation 6': function(){
    addAniCam(5)
  },
  'Add Animation 7': function(){
    addAniCam(6)
  },
  'Add Animation 8': function(){
    addAniCam(7)
  },
  'Add Animation 9': function(){
    addAniCam(8)
  },
  'Add Animation 10': function(){
    addAniCam(9)
  },
  'Add Animation 11': function(){
    addAniCam(10)
  },
}

var animate = {
  'Animate Object 1': function(){
    animateObj(0)
  },
  'Animate Object 2': function(){
    animateObj(1)
  },
  'Animate Object 3': function(){
    animateObj(2)
  },
  'Animate Object 4': function(){
    animateObj(3)
  },
  'Animate Object 5': function(){
    animateObj(4)
  },
  'Animate Object 6': function(){
    animateObj(5)
  },
  'Animate Object 7': function(){
    animateObj(6)
  },
  'Animate Object 8': function(){
    animateObj(7)
  },
  'Animate Object 9': function(){
    animateObj(8)
  },
  'Animate Object 10': function(){
    animateObj(9)
  },
  'Animate Object 11': function(){
    animateObj(10)
  },

  'Animate Camera 1': function(){
    animateCam(0)
  },
  'Animate Camera 2': function(){
    animateCam(1)
  },
  'Animate Camera 3': function(){
    animateCam(2)
  },
  'Animate Camera 4': function(){
    animateCam(3)
  },
  'Animate Camera 5': function(){
    animateCam(4)
  },

}