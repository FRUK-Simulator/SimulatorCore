import { Body } from "planck-js";

export function getObjectsBetween(bodyA: Body, bodyB: Body): Body[] {
  let world = bodyA.m_world;

  let pointA = bodyA.getWorldCenter();
  let pointB = bodyB.getWorldCenter();

  let bodies = new Set<Body>();

  world.rayCast(pointA, pointB, (fixture, point, normal, fraction) => {
    let body = fixture.getBody();
    bodies.add(body);
    return 1;
  });

  bodies.delete(bodyA);
  bodies.delete(bodyB);

  return Array.from(bodies);
}
