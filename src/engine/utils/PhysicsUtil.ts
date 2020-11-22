import { Body } from "planck-js";

export function getObjectsBetween(bodyA: Body, bodyB: Body): Body[] {
  const world = bodyA.m_world;

  const pointA = bodyA.getWorldCenter();
  const pointB = bodyB.getWorldCenter();

  const bodies = new Set<Body>();

  world.rayCast(pointA, pointB, (fixture) => {
    const body = fixture.getBody();
    bodies.add(body);
    return 1;
  });

  bodies.delete(bodyA);
  bodies.delete(bodyB);

  return Array.from(bodies);
}
