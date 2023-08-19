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


//let play = true;


//orbital controls
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
const backgroundTexture = new THREE.TextureLoader().load('maps/8k_stars.jpg');
const background = new THREE.Mesh(
  new THREE.SphereGeometry(900000,30,30),
  new THREE.MeshLambertMaterial({
    map: backgroundTexture,
    side: THREE.DoubleSide
  })
  
);
scene.add(background); 

//loads sun planet size
const sunTexture = new THREE.TextureLoader().load('maps/2k_sun.jpg');
const sunGeometry = new THREE.SphereGeometry(getValue(0,'planetSize'),30,30);
const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);

sun.rotation.x += (getValue(0,'tilt'));
scene.add(sun); 


//loads mercury
//loads orbit and indcator circle
const mercuryTexture = new THREE.TextureLoader().load('maps/2k_mercury.jpg');
const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(getValue(1,'planetSize'),30,30),
  new THREE.MeshStandardMaterial({
    map: mercuryTexture
  })
)
mercury.rotation.x += (getValue(1,'tilt'));
scene.add(mercury);

const mercuryOrbit = new THREE.EllipseCurve(
  orbitDraw(getValue(1,'semimajorAxis'), getValue(1,'eccentricity'))[1], 
  0, 
  getValue(1,'semimajorAxis'),
  orbitDraw(getValue(1,'semimajorAxis'),getValue(1,'eccentricity'))[0],
  0,
  Math.PI * 2,
  0
);
const mercuryOrbitPoints = mercuryOrbit.getPoints( 100 );
const mercuryOrbitGeometry = new THREE.BufferGeometry().setFromPoints( mercuryOrbitPoints );
const mercuryOrbitMaterial = new THREE.LineBasicMaterial( { color: 0xff0000 } );
const mercuryOrbitEllipse = new THREE.Line( mercuryOrbitGeometry, mercuryOrbitMaterial );
scene.add(mercuryOrbitEllipse);

const mercuryIndicator = new THREE.EllipseCurve(0,0,50,50,0,Math.PI * 2,0)
const mercuryIndicatorPoints = mercuryIndicator.getPoints( 100 );
const mercuryIndicatorGeometry = new THREE.BufferGeometry().setFromPoints( mercuryIndicatorPoints );
const mercuryIndicatorMaterial = new THREE.LineBasicMaterial( { color: 0xff0000 } );
const mercuryIndicatorEllipse = new THREE.Line( mercuryIndicatorGeometry, mercuryIndicatorMaterial );
scene.add(mercuryIndicatorEllipse);

//loads venus
//loads orbit and indcator circle
const venusTexture = new THREE.TextureLoader().load('maps/2k_venus_surface.jpg');
const venus = new THREE.Mesh(
  new THREE.SphereGeometry(getValue(2,'planetSize'),30,30),
  new THREE.MeshStandardMaterial({
    map: venusTexture
  })
)
venus.rotation.x += (getValue(2,'tilt'));
scene.add(venus);

const venusOrbit = new THREE.EllipseCurve(
  orbitDraw(getValue(2,'semimajorAxis'), getValue(2,'eccentricity'))[1], 
  0, 
  getValue(2,'semimajorAxis'),
  orbitDraw(getValue(2,'semimajorAxis'),getValue(2,'eccentricity'))[0],
  0,
  Math.PI * 2,
  0
);
const venusOrbitPoints = venusOrbit.getPoints( 100 );
const venusOrbitGeometry = new THREE.BufferGeometry().setFromPoints( venusOrbitPoints );
const venusOrbitMaterial = new THREE.LineBasicMaterial( { color: 0xff0000 } );
const venusOrbitEllipse = new THREE.Line( venusOrbitGeometry, venusOrbitMaterial );
scene.add(venusOrbitEllipse);

const venusIndicator = new THREE.EllipseCurve(0,0,50,50,0,Math.PI * 2,0)
const venusIndicatorPoints = venusIndicator.getPoints( 100 );
const venusIndicatorGeometry = new THREE.BufferGeometry().setFromPoints( venusIndicatorPoints );
const venusIndicatorMaterial = new THREE.LineBasicMaterial( { color: 0xff0000 } );
const venusIndicatorEllipse = new THREE.Line( venusIndicatorGeometry, venusIndicatorMaterial );
scene.add(venusIndicatorEllipse);

//loads earth
//loads orbit and indcator circle
const earthTexture = new THREE.TextureLoader().load('maps/2k_earth_daymap.jpg');
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(getValue(3,'planetSize'),30,30),
  new THREE.MeshStandardMaterial({
    map: earthTexture
  })
)
earth.rotation.x += (getValue(3,'tilt'));
scene.add(earth);

const earthOrbit = new THREE.EllipseCurve(
  orbitDraw(getValue(3,'semimajorAxis'), getValue(3,'eccentricity'))[1], 
  0, 
  getValue(3,'semimajorAxis'),
  orbitDraw(getValue(3,'semimajorAxis'),getValue(3,'eccentricity'))[0],
  0,
  Math.PI * 2,
  0
);
const earthOrbitPoints = earthOrbit.getPoints( 100 );
const earthOrbitGeometry = new THREE.BufferGeometry().setFromPoints( earthOrbitPoints );
const earthOrbitMaterial = new THREE.LineBasicMaterial( { color: 0xff0000 } );
const earthOrbitEllipse = new THREE.Line( earthOrbitGeometry, earthOrbitMaterial );
scene.add(earthOrbitEllipse);

const earthIndicator = new THREE.EllipseCurve(0,0,50,50,0,Math.PI * 2,0)
const earthIndicatorPoints = earthIndicator.getPoints( 100 );
const earthIndicatorGeometry = new THREE.BufferGeometry().setFromPoints( earthIndicatorPoints );
const earthIndicatorMaterial = new THREE.LineBasicMaterial( { color: 0xff0000 } );
const earthIndicatorEllipse = new THREE.Line( earthIndicatorGeometry, earthIndicatorMaterial );
scene.add(earthIndicatorEllipse);

//loads mars
//loads orbit and indcator circle
const marsTexture = new THREE.TextureLoader().load('maps/2k_mars.jpg');
const mars = new THREE.Mesh(
  new THREE.SphereGeometry(getValue(4,'planetSize'),30,30),
  new THREE.MeshStandardMaterial({
    map: marsTexture
  })
)
mars.rotation.x += (getValue(4,'tilt'));
scene.add(mars);

const marsOrbit = new THREE.EllipseCurve(
  orbitDraw(getValue(4,'semimajorAxis'), getValue(4,'eccentricity'))[1], 
  0, 
  getValue(4,'semimajorAxis'),
  orbitDraw(getValue(4,'semimajorAxis'),getValue(4,'eccentricity'))[0],
  0,
  Math.PI * 2,
  0
);
const marsOrbitPoints = marsOrbit.getPoints( 100 );
const marsOrbitGeometry = new THREE.BufferGeometry().setFromPoints( marsOrbitPoints );
const marsOrbitMaterial = new THREE.LineBasicMaterial( { color: 0xff0000 } );
const marsOrbitEllipse = new THREE.Line( marsOrbitGeometry, marsOrbitMaterial );
scene.add(marsOrbitEllipse);

const marsIndicator = new THREE.EllipseCurve(0,0,50,50,0,Math.PI * 2,0)
const marsIndicatorPoints = marsIndicator.getPoints( 100 );
const marsIndicatorGeometry = new THREE.BufferGeometry().setFromPoints( marsIndicatorPoints );
const marsIndicatorMaterial = new THREE.LineBasicMaterial( { color: 0xff0000 } );
const marsIndicatorEllipse = new THREE.Line( marsIndicatorGeometry, marsIndicatorMaterial );
scene.add(marsIndicatorEllipse);

//loads jupiter
//loads orbit and indcator circle
const jupiterTexture = new THREE.TextureLoader().load('maps/2k_jupiter.jpg');
const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(getValue(5,'planetSize'),30,30),
  new THREE.MeshStandardMaterial({
    map: jupiterTexture
  })
)
jupiter.rotation.x += (getValue(5,'tilt'));
scene.add(jupiter);

const jupiterOrbit = new THREE.EllipseCurve(
  orbitDraw(getValue(5,'semimajorAxis'), getValue(5,'eccentricity'))[1], 
  0, 
  getValue(5,'semimajorAxis'),
  orbitDraw(getValue(5,'semimajorAxis'),getValue(5,'eccentricity'))[0],
  0,
  Math.PI * 2,
  0
);
const jupiterOrbitPoints = jupiterOrbit.getPoints( 100 );
const jupiterOrbitGeometry = new THREE.BufferGeometry().setFromPoints( jupiterOrbitPoints );
const jupiterOrbitMaterial = new THREE.LineBasicMaterial( { color: 0xff0000 } );
const jupiterOrbitEllipse = new THREE.Line( jupiterOrbitGeometry, jupiterOrbitMaterial );
scene.add(jupiterOrbitEllipse);

const jupiterIndicator = new THREE.EllipseCurve(0,0,200,200,0,Math.PI * 2,0)
const jupiterIndicatorPoints = jupiterIndicator.getPoints( 100 );
const jupiterIndicatorGeometry = new THREE.BufferGeometry().setFromPoints( jupiterIndicatorPoints );
const jupiterIndicatorMaterial = new THREE.LineBasicMaterial( { color: 0xff0000 } );
const jupiterIndicatorEllipse = new THREE.Line( jupiterIndicatorGeometry, jupiterIndicatorMaterial );
scene.add(jupiterIndicatorEllipse);

//loads saturn
//loads orbit and indcator circle
const saturnTexture = new THREE.TextureLoader().load('maps/2k_saturn.jpg');
const saturn = new THREE.Mesh(
  new THREE.SphereGeometry(getValue(6,'planetSize'),30,30),
  new THREE.MeshStandardMaterial({
    map: saturnTexture
  })
)
saturn.rotation.x += (getValue(6,'tilt'));
scene.add(saturn);

const saturnOrbit = new THREE.EllipseCurve(
  orbitDraw(getValue(6,'semimajorAxis'), getValue(6,'eccentricity'))[1], 
  0, 
  getValue(6,'semimajorAxis'),
  orbitDraw(getValue(6,'semimajorAxis'),getValue(6,'eccentricity'))[0],
  0,
  Math.PI * 2,
  0
);
const saturnOrbitPoints = saturnOrbit.getPoints( 100 );
const saturnOrbitGeometry = new THREE.BufferGeometry().setFromPoints( saturnOrbitPoints );
const saturnOrbitMaterial = new THREE.LineBasicMaterial( { color: 0xff0000 } );
const saturnOrbitEllipse = new THREE.Line( saturnOrbitGeometry, saturnOrbitMaterial );
scene.add(saturnOrbitEllipse);

const saturnIndicator = new THREE.EllipseCurve(0,0,200,200,0,Math.PI * 2,0)
const saturnIndicatorPoints = saturnIndicator.getPoints( 100 );
const saturnIndicatorGeometry = new THREE.BufferGeometry().setFromPoints( saturnIndicatorPoints );
const saturnIndicatorMaterial = new THREE.LineBasicMaterial( { color: 0xff0000 } );
const saturnIndicatorEllipse = new THREE.Line( saturnIndicatorGeometry, saturnIndicatorMaterial );
scene.add(saturnIndicatorEllipse);

//loads uranus
//loads orbit and indcator circle
const uranusTexture = new THREE.TextureLoader().load('maps/2k_uranus.jpg');
const uranus = new THREE.Mesh(
  new THREE.SphereGeometry(getValue(7,'planetSize'),30,30),
  new THREE.MeshStandardMaterial({
    map: uranusTexture
  })
)
uranus.rotation.x += (getValue(7,'tilt'));
scene.add(uranus);

const uranusOrbit = new THREE.EllipseCurve(
  orbitDraw(getValue(7,'semimajorAxis'), getValue(7,'eccentricity'))[1], 
  0, 
  getValue(7,'semimajorAxis'),
  orbitDraw(getValue(7,'semimajorAxis'),getValue(7,'eccentricity'))[0],
  0,
  Math.PI * 2,
  0
);
const uranusOrbitPoints = uranusOrbit.getPoints( 100 );
const uranusOrbitGeometry = new THREE.BufferGeometry().setFromPoints( uranusOrbitPoints );
const uranusOrbitMaterial = new THREE.LineBasicMaterial( { color: 0xff0000 } );
const uranusOrbitEllipse = new THREE.Line( uranusOrbitGeometry, uranusOrbitMaterial );
scene.add(uranusOrbitEllipse);

const uranusIndicator = new THREE.EllipseCurve(0,0,200,200,0,Math.PI * 2,0)
const uranusIndicatorPoints = uranusIndicator.getPoints( 100 );
const uranusIndicatorGeometry = new THREE.BufferGeometry().setFromPoints( uranusIndicatorPoints );
const uranusIndicatorMaterial = new THREE.LineBasicMaterial( { color: 0xff0000 } );
const uranusIndicatorEllipse = new THREE.Line( uranusIndicatorGeometry, uranusIndicatorMaterial );
scene.add(uranusIndicatorEllipse);

//loads neptune
//loads orbit and indcator circle
const neptuneTexture = new THREE.TextureLoader().load('maps/2k_neptune.jpg');
const neptune = new THREE.Mesh(
  new THREE.SphereGeometry(getValue(8,'planetSize'),30,30),
  new THREE.MeshStandardMaterial({
    map: neptuneTexture
  })
)
neptune.rotation.x += (getValue(8,'tilt'));
scene.add(neptune);

const neptuneOrbit = new THREE.EllipseCurve(
  orbitDraw(getValue(8,'semimajorAxis'), getValue(8,'eccentricity'))[1], 
  0, 
  getValue(8,'semimajorAxis'),
  orbitDraw(getValue(8,'semimajorAxis'),getValue(8,'eccentricity'))[0],
  0,
  Math.PI * 2,
  0
);
const neptuneOrbitPoints = neptuneOrbit.getPoints( 100 );
const neptuneOrbitGeometry = new THREE.BufferGeometry().setFromPoints( neptuneOrbitPoints );
const neptuneOrbitMaterial = new THREE.LineBasicMaterial( { color: 0xff0000 } );
const neptuneOrbitEllipse = new THREE.Line( neptuneOrbitGeometry, neptuneOrbitMaterial );
scene.add(neptuneOrbitEllipse);

const neptuneIndicator = new THREE.EllipseCurve(0,0,200,200,0,Math.PI * 2,0)
const neptuneIndicatorPoints = neptuneIndicator.getPoints( 100 );
const neptuneIndicatorGeometry = new THREE.BufferGeometry().setFromPoints( neptuneIndicatorPoints );
const neptuneIndicatorMaterial = new THREE.LineBasicMaterial( { color: 0xff0000 } );
const neptuneIndicatorEllipse = new THREE.Line( neptuneIndicatorGeometry, neptuneIndicatorMaterial );
scene.add(neptuneIndicatorEllipse);

//***functions***//

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
  var distance = camera.position.distanceTo(sun.position);
  if (distance < 2) {
    return getValue(planetNum, 'planetSize');
  }
  var scaleSize = getValue(planetNum, 'maxSize') * (distance / 15000);
  return scaleSize
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

//used for the pause button
class Play {
  constructor(play) {
    this.play = play;
  }
  getPlay() {
    return this.play;
  }
  changePlay() {
    this.play = !this.play;
  }
}
const player = new Play(true);

//event listener for the pause button
document.getElementById("pauseButton").addEventListener("click", function(){
  player.changePlay();
  console.log(player.getPlay());
  if (document.getElementById("pauseButton").innerHTML == "Pause") {
    document.getElementById("pauseButton").innerHTML = "Play";
  } else {
    document.getElementById("pauseButton").innerHTML = "Pause";
  }
});

//determines the movement of the planets 
//rotation, orbital movement, and size scaling
function movement() {
  const rotationRateScale = 0.001;
  let time;
  if (player.getPlay()) {
    time = timer.getTime1();
    
    //rotation
    sun.rotation.y += planetsData.planets[0]['rotationRate'] * rotationRateScale;
    mercury.rotation.y += planetsData.planets[1]['rotationRate'] * rotationRateScale;
    venus.rotation.y += planetsData.planets[2]['rotationRate'] * rotationRateScale;
    earth.rotation.y += planetsData.planets[3]['rotationRate'] * rotationRateScale;
    mars.rotation.y += planetsData.planets[4]['rotationRate'] * rotationRateScale;
    jupiter.rotation.y += planetsData.planets[5]['rotationRate'] * rotationRateScale;
    saturn.rotation.y += planetsData.planets[6]['rotationRate'] * rotationRateScale;
    uranus.rotation.y += planetsData.planets[7]['rotationRate'] * rotationRateScale;
    neptune.rotation.y += planetsData.planets[8]['rotationRate'] * rotationRateScale;


    //Orbital Animations 
    //Mercury
    mercury.position.x = orbitalCalculations(getValue(1,'semimajorAxis'), getValue(1,'eccentricity'), getValue(1,'orbitalPeriod'), time)[0];
    mercury.position.y = orbitalCalculations(getValue(1,'semimajorAxis'), getValue(1,'eccentricity'), getValue(1,'orbitalPeriod'), time)[1];
    mercuryIndicatorEllipse.position.x = mercury.position.x;
    mercuryIndicatorEllipse.position.y = mercury.position.y;
    
    //venus
    venus.position.x = orbitalCalculations(getValue(2,'semimajorAxis'), getValue(2,'eccentricity'), getValue(2,'orbitalPeriod'), time)[0];
    venus.position.y = orbitalCalculations(getValue(2,'semimajorAxis'), getValue(2,'eccentricity'), getValue(2,'orbitalPeriod'), time)[1];
    venusIndicatorEllipse.position.x = venus.position.x;
    venusIndicatorEllipse.position.y = venus.position.y;

    //earth
    earth.position.x = orbitalCalculations(getValue(3,'semimajorAxis'), getValue(3,'eccentricity'), getValue(3,'orbitalPeriod'), time)[0];
    earth.position.y = orbitalCalculations(getValue(3,'semimajorAxis'), getValue(3,'eccentricity'), getValue(3,'orbitalPeriod'), time)[1];
    earthIndicatorEllipse.position.x = earth.position.x;
    earthIndicatorEllipse.position.y = earth.position.y;

    //mars
    mars.position.x = orbitalCalculations(getValue(4,'semimajorAxis'), getValue(4,'eccentricity'), getValue(4,'orbitalPeriod'), time)[0];
    mars.position.y = orbitalCalculations(getValue(4,'semimajorAxis'), getValue(4,'eccentricity'), getValue(4,'orbitalPeriod'), time)[1];
    marsIndicatorEllipse.position.x = mars.position.x;
    marsIndicatorEllipse.position.y = mars.position.y;

    //jupiter
    jupiter.position.x = orbitalCalculations(getValue(5,'semimajorAxis'), getValue(5,'eccentricity'), getValue(5,'orbitalPeriod'), time)[0];
    jupiter.position.y = orbitalCalculations(getValue(5,'semimajorAxis'), getValue(5,'eccentricity'), getValue(5,'orbitalPeriod'), time)[1];
    jupiterIndicatorEllipse.position.x = jupiter.position.x;
    jupiterIndicatorEllipse.position.y = jupiter.position.y;

    //saturn
    saturn.position.x = orbitalCalculations(getValue(6,'semimajorAxis'), getValue(6,'eccentricity'), getValue(6,'orbitalPeriod'), time)[0];
    saturn.position.y = orbitalCalculations(getValue(6,'semimajorAxis'), getValue(6,'eccentricity'), getValue(6,'orbitalPeriod'), time)[1];
    saturnIndicatorEllipse.position.x = saturn.position.x;
    saturnIndicatorEllipse.position.y = saturn.position.y;

    //uranus
    uranus.position.x = orbitalCalculations(getValue(7,'semimajorAxis'), getValue(7,'eccentricity'), getValue(7,'orbitalPeriod'), time)[0];
    uranus.position.y = orbitalCalculations(getValue(7,'semimajorAxis'), getValue(7,'eccentricity'), getValue(7,'orbitalPeriod'), time)[1];
    uranusIndicatorEllipse.position.x = uranus.position.x;
    uranusIndicatorEllipse.position.y = uranus.position.y;

    //neptune
    neptune.position.x = orbitalCalculations(getValue(8,'semimajorAxis'), getValue(8,'eccentricity'), getValue(8,'orbitalPeriod'), time)[0];
    neptune.position.y = orbitalCalculations(getValue(8,'semimajorAxis'), getValue(8,'eccentricity'), getValue(8,'orbitalPeriod'), time)[1];
    neptuneIndicatorEllipse.position.x = neptune.position.x;
    neptuneIndicatorEllipse.position.y = neptune.position.y;
  }
  
  //size scaling
  sun.scale.set(changeSize(0), changeSize(0), changeSize(0));
  mercury.scale.set(changeSize(1), changeSize(1), changeSize(1));
  venus.scale.set(changeSize(2), changeSize(2), changeSize(2));
  earth.scale.set(changeSize(3), changeSize(3), changeSize(3));
  mars.scale.set(changeSize(4), changeSize(4), changeSize(4));
  jupiter.scale.set(changeSize(5), changeSize(5), changeSize(5));
  saturn.scale.set(changeSize(6), changeSize(6), changeSize(6));
  uranus.scale.set(changeSize(7), changeSize(7), changeSize(7));
  neptune.scale.set(changeSize(8), changeSize(8), changeSize(8));
  
}

//animation loop
function animate() {
  requestAnimationFrame(animate);
  movement();
  

  controls.update();
  renderer.render(scene, camera);
}

animate();