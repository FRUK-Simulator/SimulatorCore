// These will become bitmasks, each needs to be a power of two.
export const EntityCategory = {
  ROBOT_PART: 1,
  // all parts connected to the robot.
  // this is the default, anywhere the category isn't defined it will be 1

  WALL: 2,
  // the arena walls and static objects in the scene.

  OBJECTS: 4,
  // the movable objects in the scene. Blocks balls etc...

  SENSORS: 8,
  // the sensors in the scene will not collide with anything else in the scene.

  ZONES: 16,
  // zones should be triggered by the robot (and maybe the objects??)
  // zones will not cause collisions as their fixtures are marked as sensor:true,
};

const ALL_ENTITIES = 0xffff;
// all values are 16 bit so this is a mask enabling collision with all objects.

const NO_ENTITIES = 0x0000;
// all values are 16 bit so this is a mask enabling collision with no objects.

export const EntityMask = {
  ROBOT_PART: ALL_ENTITIES - EntityCategory.ROBOT_PART, // parts of the robot collide with only objects and walls
  WALL: ALL_ENTITIES,
  OBJECTS: ALL_ENTITIES,
  SENSORS: EntityCategory.WALL | EntityCategory.OBJECTS,
  ZONES: EntityCategory.ROBOT_PART,
};
