# FIRST Simulator Design - Design Doc

- [FIRST Simulator Design - Design Doc](#first-simulator-design---design-doc)
  - [Components](#components)
    - [Simulator](#simulator)
    - [Game Engine](#game-engine)
    - [Configuration](#configuration)
    - [Simulator Interface](#simulator-interface)
    - [Virtual Machine](#virtual-machine)
    - [Simulator Interface Specification](#simulator-interface-specification)
    - [Coordinate system](#coordinate-system)
    - [Extents](#extents)
    - [Model configs](#model-configs)
      - [ObjectModelConfig](#objectmodelconfig)
    - [Simulator Setup Inputs](#simulator-setup-inputs)
      - [addWall](#addwall)
      - [addGameObject](#addgameobject)
      - [addRobot](#addrobot)
      - [addRobotWheel](#addrobotwheel)
    - [Robot Inputs](#robot-inputs)
      - [setDigitalOutput()](#setdigitaloutput)
      - [setMotorSpeed(id: number)](#setmotorspeedid-number)
      - [setServoAngle()](#setservoangle)
    - [Robot Outputs](#robot-outputs)
      - [getDigitalInput()](#getdigitalinput)
      - [getAnalogInput()](#getanaloginput)
      - [getPosition()](#getposition)
    - [Events generated from the simulator](#events-generated-from-the-simulator)
      - [onCollision(objA, objB)](#oncollisionobja-objb)
      - [onEnterZone(obj, zone)](#onenterzoneobj-zone)
      - [onExitZone(obj, zone)](#onexitzoneobj-zone)

## Components

### Simulator

The Simulator represents the virtual world where the simulated robot will live. It is built up from the Game Engine and a Configuration. It will also have a Simulator Interface that allows external code to interact with it.

### Game Engine

The Game Engine is the core of the Simulator, and consists of the Renderer (3D graphics library, e.g. three.js) and Physics engine (e.g. planck-js). The Game Engine is responsible for keeping track of all game objects, as well as animating each frame of the simulation.

### Configuration

The simulator Configuration provides constants to the Game Engine regarding physics, virtual world dimensions, etc.

### Simulator Interface

The Simulator Interface provides external code a means with which to interact with the simulator. This includes adding obstacles, game objects and robots to the Simulator, controlling various actuators on a robot (e.g. run a motor connected to a wheel at 50% forward power), and receiving inputs from sensors (e.g. is this touch sensor pressed, or what is the distance that this rangefinder is reporting)

### Virtual Machine

The Virtual Robot component represents both the “game logic” (used to add game objects to the Simulator) and the “robot logic” (representing code used to interact with the simulated robot). The Virtual Machine is responsible for setting up static and dynamic game objects (e.g. obstacles or movable things) by calling the appropriate methods on the Simulator Interface.

The Virtual Machine is also responsible for setting up a robot representation (how many wheels, max speed of each motor, what kind of sensors etc) that can be used to render a simulated robot. Additionally, it will also contain logic that dictates how the simulated robot will behave (e.g. set the left side motors to 100%).

### Simulator Interface Specification

Note: This is the most important part to get right, since this sets up how we can interact with the simulated robot

### Coordinate system

The simulation engine will have a 3d coordinate system (x,y,z) Y will increase in the upward direction. X will increase toward the ‘right’ of the scene, and Z will increase with things going backward into the scene.
Orientations will be represented by euler angle rotations. In X, Y, Z order.

- Position(x: number, y: number, z: number)
- Orientation(x: number, y: number, z: number)

When things are added into the scene, the implementation may choose to reposition them. For example if the physics engine is only simulating a 2d slice.

### Extents

When objects are added into the simulated world they will have an origin point specified. This can be thought of as the center of the object. To define the extent or size of the object we use half extents.

These extents will be used for bounding box collisions as well as creating default cuboid box models for objects without a model.

Extents(xh: number, yh: number, zh: number)

The ‘h’ in each parameter indicates that this value represents half the total size in that axis. I.e. the distance from the origin point to the outer edge of the object.

### Model configs

The interface will allow the user to specify models to be loaded into the scene from various formats.

#### ObjectModelConfig

ObjectModelConfig(
filename: string,
objectName: string,
scale: {
x: number,
y: number,
z: number})

### Simulator Setup Inputs

Methods used to set up the simulator

#### addWall

addWall({
p: Position,
o: Orientation,
e: Extents
}): Symbol
Adds a wall into the simulation, these walls are static objects and will collide with any dynamic object.

#### addGameObject

addGameObject({
p: Position,
o: Orientation,
e: Extents,
model: ObjectModelConfig,
static: boolean
}): Symbol
Adds a ‘game’ object these will be boxes right now, but may be other things later on. Making this static will make it immovable, like a wall.

#### addRobot

addRobot({
p: Position,
o: Orientation,
e: Extents,
model: ObjectModelConfig
}): Symbol
Adds a robot to the scene with the given model, if the model is not supplied a box will be rendered instead.

#### addRobotWheel

addRobotWheel({
robot: Symbol,
p: Position,
o: Orientation,
e: Extents,
powered: boolean,
grip: number,
model: ObjectModelConfig
}): Symbol
Adds a robot wheel to a robot.
The wheel can be powered, and then can be controlled by the user. Else it will be static.

The grip will indicate how much the wheel can slide if it’s going sideways.

### Robot Inputs

Methods used to interact with a simulated robot

#### setDigitalOutput()

#### setMotorSpeed(id: number)

#### setServoAngle()

### Robot Outputs

Properties queried from the simulated robot

#### getDigitalInput()

#### getAnalogInput()

#### getPosition()

Etc

### Events generated from the simulator

#### onCollision(objA, objB)

#### onEnterZone(obj, zone)

#### onExitZone(obj, zone)
