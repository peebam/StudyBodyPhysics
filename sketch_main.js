const {
  VerletPhysics2D
}
= toxi.physics2d;
const {
  GravityBehavior
}
= toxi.physics2d.behaviors;
const {
  Vec2D, Rect
}
= toxi.geom;

let physics;
let grabbedParticule = null;

const particles = []
  const springs = []

  function setup() {
  createCanvas(640, 360);
  physics = new VerletPhysics2D();

  let gravity = new GravityBehavior(new Vec2D(0, 1));
  physics.addBehavior(gravity);

  let bounds = new Rect(0, 0, width, height);
  physics.setWorldBounds(bounds);

  particles.push(new Particle(200, 100));
  particles.push(new Particle(400, 100));
  particles.push(new Particle(350, 200));
  particles.push(new Particle(400, 300));
  particles.push(new Particle(200, 300));
  particles.push(new Particle(250, 200));

  springs.push(new Spring(particles[0], particles[1], 0.5));
  springs.push(new Spring(particles[1], particles[2], 0.5));
  springs.push(new Spring(particles[2], particles[3], 0.5));
  springs.push(new Spring(particles[3], particles[4], 0.5));
  springs.push(new Spring(particles[4], particles[5], 0.5));
  springs.push(new Spring(particles[5], particles[0], 0.5));

  springs.push(new Spring(particles[5], particles[2], 0.5));
  springs.push(new Spring(particles[0], particles[3], 0.5));
  springs.push(new Spring(particles[1], particles[4], 0.5));
}

function getClosestParticle(x, y) {
  return particles.reduce((acc, p) => {
    if (!acc) {
      return p;
    }

    if (dist(p.x, p.y, x, y) < dist(acc.x, acc.y, x, y))
    {
      return p;
    }

    return acc;
  }
  );
}

function draw() {
  background(255);

  physics.update();

  if (mouseIsPressed) {
    if (!grabbedParticule) {
      grabbedParticule = getClosestParticle(mouseX, mouseY);
    }
    grabbedParticule.lock();
    grabbedParticule.x = mouseX;
    grabbedParticule.y = mouseY;
    grabbedParticule.unlock();
  } else {
    grabbedParticule = null;
  }

  fill(120, 0, 0);
  stroke(0);
  beginShape();
  particles.forEach(p => vertex(p.x, p.y));
  endShape(CLOSE);
}
