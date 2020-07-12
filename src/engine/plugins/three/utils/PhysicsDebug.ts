import * as Planck from "planck-js";
import * as THREE from "three";

export function generateDebugGeometry(
  geom: THREE.Geometry,
  world: Planck.World
): void {
  for (let body = world.getBodyList(); body; body = body.getNext()) {
    generateDebugGeometryBody(geom, body);
  }
}

function generateDebugGeometryBody(
  geom: THREE.Geometry,
  body: Planck.Body
): void {
  for (
    let fixture = body.getFixtureList();
    fixture;
    fixture = fixture.getNext()
  ) {
    generateDebugGeometryFixture(geom, body, fixture);
  }
}

function generateDebugGeometryFixture(
  geom: THREE.Geometry,
  body: Planck.Body,
  fixture: Planck.Fixture
): void {
  switch (fixture.getType()) {
    case "polygon":
      generateDebugGeometryPolygon(
        geom,
        body,
        fixture.getShape() as Planck.PolygonShape
      );
      break;
    default:
      break;
  }
}

function generateDebugGeometryPolygon(
  geom: THREE.Geometry,
  body: Planck.Body,
  shape: Planck.PolygonShape
): void {
  const offset = geom.vertices.length;
  const translation = body.getPosition();
  const rotation = body.getAngle();
  const polygonVertices = shape.m_vertices;
  const height = 3;

  const l = 2 * polygonVertices.length;
  polygonVertices.forEach((vertex, index) => {
    const x =
      vertex.x * Math.cos(rotation) -
      vertex.y * Math.sin(rotation) +
      translation.x;
    const z =
      vertex.x * Math.sin(rotation) +
      vertex.y * Math.cos(rotation) +
      translation.y;

    geom.vertices.push(new THREE.Vector3(x, 0, z));
    geom.vertices.push(new THREE.Vector3(x, height, z));

    geom.faces.push(
      new THREE.Face3(
        offset + ((2 * index) % l),
        offset + ((2 * index + 1) % l),
        offset + ((2 * index + 2) % l)
      ),
      new THREE.Face3(
        offset + ((2 * index + 2) % l),
        offset + ((2 * index + 1) % l),
        offset + ((2 * index + 3) % l)
      )
    );
  });
}
