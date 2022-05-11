import * as THREE from "three";

import { SimComplexSensor } from "./SimComplexSensor";
import {
  IColorSensorSpec,
  IRobotSpec,
  IComplexSensorValue,
  SensorMountingFace,
} from "../../../specs/RobotSpecs";
import {
  ISensorFixtureUserData,
  IZoneFixtureUserData,
  SimUserData,
} from "../../../specs/UserDataSpecs";
import { Vec2, Box, Contact, Fixture } from "planck-js";
import { getSensorMountPosition } from "../../../utils/RobotUtils";
import { EntityCategory } from "../RobotCollisionConstants";
import {
  isSameObject,
  isZoneContact,
  isZoneUserData,
} from "../../../EventRegistry";

/**
 * Simulated Color Sensor
 *
 * This is a {@link SimComplexSensor} that returns a JS object, representing
 * the color detected as { red: <number>, green: <number>, blue: <number> }.
 *
 * As part of the {@link IColorSensorSpec | spec}, a `width` and `range` can be
 * specified. Range is optional and represents how far out from its mounting face
 * the sensor can detect when mounted on the FRONT/BACK/LEFT/RIGHT faces.
 * Width represents how wide the sensing area is.
 *
 * If the `render` flag is passed in the spec, a visual representation of the
 * sensor will be shown on the robot. This visual representation will turn red
 * when it is active (currently touching something).
 */
export class SimColorSensor extends SimComplexSensor {
  constructor(
    spec: IColorSensorSpec,
    robotGuid: string,
    robotSpec: IRobotSpec
  ) {
    super("ColorSensor", robotGuid, spec);
    console.log("Creating the color sensor");

    const sensorPosition = getSensorMountPosition(
      robotSpec,
      SensorMountingFace.BOTTOM,
      spec.mountOffset
    );

    const sensorGeom = new THREE.BoxGeometry(0.01, 0.01, 0.01);
    const sensorMaterial = new THREE.MeshBasicMaterial({
      color: 0x0,
      transparent: true,
      opacity: 0,
    });
    const sensorMesh = new THREE.Mesh(sensorGeom, sensorMaterial);
    this._mesh = sensorMesh;

    sensorMesh.position.x = sensorPosition.x;
    sensorMesh.position.y = sensorPosition.y;
    sensorMesh.position.z = sensorPosition.z;

    this._mesh = sensorMesh;

    this._bodySpecs = {
      type: "dynamic",
      position: new Vec2(sensorPosition.x, sensorPosition.z),
      angle: 0,
      bullet: true,
    };

    const userData: ISensorFixtureUserData = {
      selfGuid: this.guid,
      rootGuid: robotGuid,
      type: "sensor",
      sensor: {
        sensorType: this.sensorType,
        robotGuid: robotGuid,
        sensorIdent: this.identifier,
      },
    };

    this._fixtureSpecs = {
      shape: new Box(0.005, 0.005),
      density: 1,
      isSensor: true,
      userData,
      filterCategoryBits: EntityCategory.ROBOT_PART,
      filterMaskBits: EntityCategory.ZONES,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(ms: number): void {
    const bodyCenter = this._body.getWorldCenter();
    this._mesh.position.x = bodyCenter.x;
    this._mesh.position.z = bodyCenter.y;

    this._mesh.rotation.y = -this._body.getAngle();
  }

  private updateColorSensors(
    contact: Contact
  ): { color?: number; order?: number } | null {
    if (
      contact.getFixtureA().getUserData() === null &&
      contact.getFixtureB().getUserData() === null
    ) {
      console.log(`Both fixtures are null`);
      return null;
    }

    const fixtureA: Fixture = contact.getFixtureA();
    const fixtureB: Fixture = contact.getFixtureB();
    const userDataA: SimUserData | null = fixtureA.getUserData() as SimUserData;
    const userDataB: SimUserData | null = fixtureB.getUserData() as SimUserData;

    if (isSameObject(fixtureA, fixtureB)) {
      console.log(`isSameObject = true`);
      return null;
    }

    // Make sure one of these is a zone
    if (!isZoneContact(fixtureA, fixtureB)) {
      console.log(`isZoneContact = false`);
      return null;
    }

    let zoneUserData: IZoneFixtureUserData;
    if (isZoneUserData(userDataA)) {
      zoneUserData = userDataA as IZoneFixtureUserData;
    } else if (isZoneUserData(userDataB)) {
      zoneUserData = userDataB as IZoneFixtureUserData;
    }
    return zoneUserData.zone;
  }

  getValue(): IComplexSensorValue {
    let currColorSensorContactEdge = this._body.getContactList();
    // const currAABB = currFixture.getAABB(0);
    // this._body.getWorld().queryAABB(currAABB, (Fixture fixt) => {
    //   return true;
    // });

    // query the physical world to get current value
    // 1 getAABB of fixture
    // query physics for what's in there
    // filter out the zone list in the fixture, figure out which one is the topmost one
    //(probs not important but might have to check that the contact list is not completely accurate, so would have to check if it;s actually touching the sensor)
    // that zone's colour is the current colour
    // store it as a number | undefined maybe, get rid of IComplexSensorValue?

    // ALTERNATIVE: maybe the physics engine has already the contact list?
    // console.log(
    //   `Color sensor currently in contact with ${this._body.getContactCount()} items`
    // );
    // let zones: any[] = [];
    let currMaxOrder = -100;
    let currColor = 0xffffff;
    while (currColorSensorContactEdge) {
      // break up updateColorSensors into figuring out which fixture is the zone, adding that fixture's userData into a list (basically get the order of the zone)
      const zone = this.updateColorSensors(currColorSensorContactEdge.contact);
      if (zone && zone.order > currMaxOrder && zone.color) {
        // debugger;
        currMaxOrder = zone.order;
        currColor = zone.color;
      }
      currColorSensorContactEdge = currColorSensorContactEdge.next;
    }
    return { value: { color: currColor } };
  }
}
