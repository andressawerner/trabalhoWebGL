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
  lookingObject: false,
}];

var objectAcomp = 0;

var looking = {
  'Object 1': function(){
    localObject(0)
  },
  'Object 2': function(){
    localObject(1)
  },
  'Object 3': function(){
    localObject(2)
  },
  'Object 4': function(){
    localObject(3)
  },
  'Object 5': function(){
    localObject(4)
  },
  'Object 6': function(){
    localObject(5)
  },
  'Object 7': function(){
    localObject(6)
  },
  'Object 8': function(){
    localObject(7)
  },
  'Object 9': function(){
    localObject(8)
  },
  'Object 10': function(){
    localObject(9)
  },
  'Object 11': function(){
    localObject(10)
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
