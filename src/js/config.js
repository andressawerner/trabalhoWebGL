var time = 0.005;


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
}];

var cam = [{ 
  rotateX: degToRad(20), 
  rotateY: degToRad(20), 
  rotateZ: degToRad(20), 
  translationX: 0, 
  translationY: 0, 
  translationZ: 100,
  zoom: 60,
  lookAtX: 0,
  lookAtY: 0,
  lookAtZ: 0,
  lookingObject: false,
  pTranslation: [0, 0, 100]
}];

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
};

