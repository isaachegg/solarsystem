//imports
import './style.css';
import * as THREE from 'three' ;
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import planetsData from './planets.json';

//create scene and camera
//render scene
//Set starting camera position
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 100000000000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(9000);
camera.position.setY(-12000);
renderer.render(scene, camera);


//Creates orbital controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.maxDistance = 15000;
controls.minDistance = 100;
controls.enablePan = false;


//Creates the light sources
const pointLight = new THREE.PointLight(0xffffff, 2, 0, 0);
scene.add(pointLight);
const light = new THREE.AmbientLight( 0x404040 ); 
scene.add( light );

//Creates the backgound starscape
const background = new THREE.Mesh(
  new THREE.SphereGeometry(900000,30,30),
  new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load('maps/8k_stars.jpg'),
    side: THREE.DoubleSide
  })
);
scene.add(background); 


//creates a mesh obj for each planet in the json file
//pushes each mesh to the planet array
const planetArr = [];
planetsData.planets.forEach((planet, i) => {
  let temp;
  if (i == 0) {
    temp = new THREE.Mesh(
      new THREE.SphereGeometry(getValue(i,'planetSize'),30,30),
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(getValue(i, 'texture'))
      })
    )
  } else {
    temp = new THREE.Mesh(
      new THREE.SphereGeometry(getValue(i,'planetSize'),30,30),
      new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load(getValue(i, 'texture'))
      })
    )
  }
  planetArr.push(temp);
})


//adds each mesh to the scene
planetArr.forEach((mesh, i) => {
  mesh.rotation.x += (getValue(i,'tilt'));
  scene.add(mesh);
})

//creates a obrit ellipse for each of the planets in the json flie
planetsData.planets.forEach((planet, i) => {
  if (i != 0) {
    let tempOrbit = new THREE.EllipseCurve(
      orbitDraw(getValue(i,'semimajorAxis'), getValue(i,'eccentricity'))[1], 
      0, 
      getValue(i,'semimajorAxis'),
      orbitDraw(getValue(i,'semimajorAxis'),getValue(i,'eccentricity'))[0],
      0,
      Math.PI * 2,
      0
    );
    const tempOrbitPoints = tempOrbit.getPoints( 100 );
    const tempOrbitGeometry = new THREE.BufferGeometry().setFromPoints( tempOrbitPoints );
    const tempOrbitMaterial = new THREE.LineBasicMaterial( { color: 0xff0000 } );
    const tempOrbitEllipse = new THREE.Line( tempOrbitGeometry, tempOrbitMaterial );
    scene.add(tempOrbitEllipse);
  }
})

//creates a indicator ellipse for each of the planets in the json flie
const indicatorArr = [];
planetsData.planets.forEach((planet, i) => {
  const tempIndicator = new THREE.EllipseCurve(0, 0, 50 * i / 2, 50 * i / 2, 0, Math.PI * 2, 0);
  const tempIndicatorPoints = tempIndicator.getPoints( 100 );
  const tempIndicatorGeometry = new THREE.BufferGeometry().setFromPoints( tempIndicatorPoints );
  const tempIndicatorMaterial = new THREE.LineBasicMaterial( { color: 0xff0000 } );
  const tempIndicatorEllipse = new THREE.Line( tempIndicatorGeometry, tempIndicatorMaterial );
  scene.add(tempIndicatorEllipse);
  indicatorArr.push(tempIndicatorEllipse);
})

//calacuates the x and y coordient of planet in orbit on a 2d plane
//a = semi major axis(millions of miles)
//e = eccentricity
//t = time
function orbitalCalculations(a, e, p, t) {
  let theta = (2 * Math.PI / p) * t;
  let r = (a * (1 - (e * e))) / (1 + e * Math.cos(theta));
  let coordinates = [r * Math.cos(theta), r * Math.sin(theta)];
  return coordinates;
}

//Provides the semiminor axis and distance between the two foci of the orbit
//a = semi major axis(millions of miles)
//e = eccentricity
function orbitDraw(a, e) {
  let data = [(a * Math.sqrt(1 - (e * e))) , -1 * a * e];
  return data;
}

//changes the size of the planet based on camera distance from sun
function changeSize(planetNum) {
  var distance = camera.position.distanceTo(planetArr[0].position);
  if (distance < 2) {
    return getValue(planetNum, 'planetSize');
  }
  var scaleSize = getValue(planetNum, 'maxSize') * (distance / 15000);
  return scaleSize;
}

//gets a value from the json file
function getValue(planetNum, value) {
  const scaleFactor = 0.000002;
  if (value == 'planetSize' || value == 'semimajorAxis') {
    return planetsData.planets[planetNum][value] * scaleFactor; 
  }
  return planetsData.planets[planetNum][value]; 
}

//holds the time
class Timer {
  
  constructor(time1) {
    this.time1 = time1;
  }
  getTime1() {
    this.time1 += 1;
    return this.time1;
  }
}
const timer = new Timer(0);

//opperates the pause/play button
document.getElementById("pauseButton").addEventListener("click", function(){
  if (document.getElementById("pauseButton").innerHTML == "Pause") {
    document.getElementById("pauseButton").innerHTML = "Play";
  } else {
    document.getElementById("pauseButton").innerHTML = "Pause";
  }
});

//determines the movement of the planets 
//rotation, orbital movement, and size scaling
function movement() {
  
  //used to pause/play the animation
  let play;
  function setPlay() {
    if (document.getElementById("pauseButton").innerHTML == "Pause") {
      play = true;
    } else {
      play = false;
    }
  }
  setPlay();
  
  if (play) {
    let time = timer.getTime1();
    
    function planetMovement() {
      planetArr.forEach((planet, i) => {
        planet.rotation.y += getValue(i,'rotationRate') * 0.001;
        
        if (i != 0) {
          planet.position.x = orbitalCalculations(getValue(i,'semimajorAxis'), getValue(i,'eccentricity'), getValue(i,'orbitalPeriod'), time)[0];
          planet.position.y = orbitalCalculations(getValue(i,'semimajorAxis'), getValue(i,'eccentricity'), getValue(i,'orbitalPeriod'), time)[1];
        }
      });
    }

    function indicatorMovement() {
      indicatorArr.forEach((indicator, i) => {
        indicator.position.x = planetArr[i].position.x;
        indicator.position.y = planetArr[i].position.y;
      })
    }


    indicatorMovement();
    planetMovement();
  }
  
  planetArr.forEach((planet, i) => {
    planet.scale.set(changeSize(i), changeSize(i), changeSize(i));
  });
  
}

//animation loop
function animate() {
  requestAnimationFrame(animate);
  movement();
  controls.update();
  renderer.render(scene, camera);
}

animate();