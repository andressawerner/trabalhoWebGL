var time = 0.005;
var selectedCam = 1;
var animationObjects = [];
var animationCameras = [];
var animationPlay = false;
var animationObjectPlay = [0,1];
var timePassed = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var animationCamIndex = 0;
var animationPlayCam = false;
var numFishes = 5;
var numFishesTotal = 8;
var dropFood = false;
var food = 0;
var indexFood = 0;

var config = [{ 
  rotateX: 8, 
  rotateY: 3.2, 
  rotateZ: 4.5, 
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
  time: 10,
  rotateX: 1, 
  rotateY: 0, 
  rotateZ: 0, 
  translationX: 10, 
  translationY: 0, 
  translationZ: 0,
  scale: 0,
},{ 
  time: 1,
  rotateX: 0, 
  rotateY: 0, 
  rotateZ: 0, 
  translationX: 0, 
  translationY: 0, 
  translationZ: 0,
  scale: 0,
},{ 
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
