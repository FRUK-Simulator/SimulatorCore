[@fruk/simulator-core](README.md) › [Globals](globals.md)

# @fruk/simulator-core

## Index

### Enumerations

* [BasicSensorOutputChannelType](enums/basicsensoroutputchanneltype.md)
* [GridPlane](enums/gridplane.md)
* [SensorMountingFace](enums/sensormountingface.md)
* [WheelMountingPoint](enums/wheelmountingpoint.md)

### Classes

* [BallHandle](classes/ballhandle.md)
* [BasicSensorManager](classes/basicsensormanager.md)
* [BoxHandle](classes/boxhandle.md)
* [ConeHandle](classes/conehandle.md)
* [CylinderHandle](classes/cylinderhandle.md)
* [EventRegistry](classes/eventregistry.md)
* [ObjectFactories](classes/objectfactories.md)
* [ObjectHandle](classes/objecthandle.md)
* [PyramidHandle](classes/pyramidhandle.md)
* [RobotHandle](classes/robothandle.md)
* [Sim3D](classes/sim3d.md)
* [SimBall](classes/simball.md)
* [SimBasicSensor](classes/simbasicsensor.md)
* [SimBox](classes/simbox.md)
* [SimCone](classes/simcone.md)
* [SimContactSensor](classes/simcontactsensor.md)
* [SimCylinder](classes/simcylinder.md)
* [SimDistanceSensor](classes/simdistancesensor.md)
* [SimMotor](classes/simmotor.md)
* [SimObject](classes/simobject.md)
* [SimPyramid](classes/simpyramid.md)
* [SimRobot](classes/simrobot.md)
* [SimRobotDrivetrain](classes/simrobotdrivetrain.md)
* [SimRobotWheel](classes/simrobotwheel.md)
* [SimWall](classes/simwall.md)
* [Vector2dUtil](classes/vector2dutil.md)
* [Vector3dUtil](classes/vector3dutil.md)
* [WallHandle](classes/wallhandle.md)

### Interfaces

* [IBallSpec](interfaces/iballspec.md)
* [IBaseSimObjectSpec](interfaces/ibasesimobjectspec.md)
* [IBasicSensorSpec](interfaces/ibasicsensorspec.md)
* [IBasicSensorValue](interfaces/ibasicsensorvalue.md)
* [IBoxSpec](interfaces/iboxspec.md)
* [IConeSpec](interfaces/iconespec.md)
* [IContactSensorSpec](interfaces/icontactsensorspec.md)
* [ICylinderSpec](interfaces/icylinderspec.md)
* [IDistanceSensorSpec](interfaces/idistancesensorspec.md)
* [IDrivetrainSpec](interfaces/idrivetrainspec.md)
* [IMotorGroup](interfaces/imotorgroup.md)
* [IMotorSpec](interfaces/imotorspec.md)
* [IPhysicsProperties](interfaces/iphysicsproperties.md)
* [IPyramidSpec](interfaces/ipyramidspec.md)
* [IRobotSpec](interfaces/irobotspec.md)
* [IRobotWheelAndMount](interfaces/irobotwheelandmount.md)
* [IRobotWheelGroup](interfaces/irobotwheelgroup.md)
* [IRobotWheelSpec](interfaces/irobotwheelspec.md)
* [ISimObjectContainer](interfaces/isimobjectcontainer.md)
* [ISimObjectRef](interfaces/isimobjectref.md)
* [ISimSensorDescriptor](interfaces/isimsensordescriptor.md)
* [ISimUserData](interfaces/isimuserdata.md)
* [IWallSpec](interfaces/iwallspec.md)
* [SimulatorConfig](interfaces/simulatorconfig.md)
* [WorldConfig](interfaces/worldconfig.md)

### Type aliases

* [BasicSensorSpec](globals.md#basicsensorspec)
* [Extents3d](globals.md#extents3d)
* [SensorRegisty](globals.md#sensorregisty)
* [SimObjectSpec](globals.md#simobjectspec)
* [Vector2d](globals.md#vector2d)
* [Vector3d](globals.md#vector3d)

### Variables

* [DEFAULT_BALL_COLOR](globals.md#const-default_ball_color)
* [DEFAULT_BOX_COLOR](globals.md#const-default_box_color)
* [DEFAULT_CONE_COLOR](globals.md#const-default_cone_color)
* [DEFAULT_CYLINDER_COLOR](globals.md#const-default_cylinder_color)
* [DEFAULT_PYRAMID_COLOR](globals.md#const-default_pyramid_color)
* [DEFAULT_WALL_COLOR](globals.md#const-default_wall_color)
* [DEFAULT_WALL_HEIGHT](globals.md#const-default_wall_height)
* [DEFAULT_WALL_THICKNESS](globals.md#const-default_wall_thickness)
* [DEFAULT_WHEEL_COLOR](globals.md#const-default_wheel_color)
* [DEFAULT_WHEEL_THICKNESS](globals.md#const-default_wheel_thickness)
* [RAYCAST_UPDATE_INTERVAL_MS](globals.md#const-raycast_update_interval_ms)
* [ROBOT_DEFAULT_COLOR](globals.md#const-robot_default_color)
* [SENSOR_ACTIVE_COLOR](globals.md#const-sensor_active_color)
* [SENSOR_INACTIVE_COLOR](globals.md#const-sensor_inactive_color)
* [simulator](globals.md#let-simulator)

### Functions

* [clamp](globals.md#clamp)
* [getAngleRadians2d](globals.md#getangleradians2d)
* [getLineLength2d](globals.md#getlinelength2d)
* [getMidpoint2d](globals.md#getmidpoint2d)
* [getMountPointPosition](globals.md#getmountpointposition)
* [getSensorDescriptors](globals.md#getsensordescriptors)
* [getSensorMountPosition](globals.md#getsensormountposition)
* [getWheelPosition](globals.md#getwheelposition)
* [main](globals.md#main)
* [makeGrid](globals.md#makegrid)
* [makeSimBall](globals.md#makesimball)
* [makeSimBox](globals.md#makesimbox)
* [makeSimCone](globals.md#makesimcone)
* [makeSimCylinder](globals.md#makesimcylinder)
* [makeSimPyramid](globals.md#makesimpyramid)
* [makeSimWall](globals.md#makesimwall)

### Object literals

* [DEFAULT_CONFIG](globals.md#const-default_config)
* [simConfig](globals.md#const-simconfig)

## Type aliases

###  BasicSensorSpec

Ƭ **BasicSensorSpec**: *[IContactSensorSpec](interfaces/icontactsensorspec.md) | [IDistanceSensorSpec](interfaces/idistancesensorspec.md)*

*Defined in [engine/specs/RobotSpecs.ts:153](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/specs/RobotSpecs.ts#L153)*

___

###  Extents3d

Ƭ **Extents3d**: *object*

*Defined in [engine/SimTypes.ts:9](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/SimTypes.ts#L9)*

#### Type declaration:

* **xh**: *number*

* **yh**: *number*

* **zh**: *number*

___

###  SensorRegisty

Ƭ **SensorRegisty**: *Map‹string, [SimBasicSensor](classes/simbasicsensor.md)›*

*Defined in [engine/EventRegistry.ts:6](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/EventRegistry.ts#L6)*

___

###  SimObjectSpec

Ƭ **SimObjectSpec**: *[IBallSpec](interfaces/iballspec.md) | [IBoxSpec](interfaces/iboxspec.md) | [IWallSpec](interfaces/iwallspec.md) | [IPyramidSpec](interfaces/ipyramidspec.md) | [IConeSpec](interfaces/iconespec.md) | [ICylinderSpec](interfaces/icylinderspec.md)*

*Defined in [engine/specs/CoreSpecs.ts:8](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/specs/CoreSpecs.ts#L8)*

___

###  Vector2d

Ƭ **Vector2d**: *object*

*Defined in [engine/SimTypes.ts:15](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/SimTypes.ts#L15)*

#### Type declaration:

* **x**: *number*

* **y**: *number*

___

###  Vector3d

Ƭ **Vector3d**: *object*

*Defined in [engine/SimTypes.ts:3](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/SimTypes.ts#L3)*

#### Type declaration:

* **x**: *number*

* **y**: *number*

* **z**: *number*

## Variables

### `Const` DEFAULT_BALL_COLOR

• **DEFAULT_BALL_COLOR**: *255* = 255

*Defined in [engine/objects/SimBall.ts:9](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimBall.ts#L9)*

___

### `Const` DEFAULT_BOX_COLOR

• **DEFAULT_BOX_COLOR**: *16711935* = 16711935

*Defined in [engine/objects/SimBox.ts:9](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimBox.ts#L9)*

___

### `Const` DEFAULT_CONE_COLOR

• **DEFAULT_CONE_COLOR**: *16776960* = 16776960

*Defined in [engine/objects/SimCone.ts:9](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimCone.ts#L9)*

___

### `Const` DEFAULT_CYLINDER_COLOR

• **DEFAULT_CYLINDER_COLOR**: *16776960* = 16776960

*Defined in [engine/objects/SimCylinder.ts:9](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimCylinder.ts#L9)*

___

### `Const` DEFAULT_PYRAMID_COLOR

• **DEFAULT_PYRAMID_COLOR**: *255* = 255

*Defined in [engine/objects/SimPyramid.ts:9](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimPyramid.ts#L9)*

___

### `Const` DEFAULT_WALL_COLOR

• **DEFAULT_WALL_COLOR**: *2254370* = 2254370

*Defined in [engine/objects/SimWall.ts:16](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimWall.ts#L16)*

___

### `Const` DEFAULT_WALL_HEIGHT

• **DEFAULT_WALL_HEIGHT**: *1* = 1

*Defined in [engine/objects/SimWall.ts:15](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimWall.ts#L15)*

___

### `Const` DEFAULT_WALL_THICKNESS

• **DEFAULT_WALL_THICKNESS**: *0.1* = 0.1

*Defined in [engine/objects/SimWall.ts:14](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimWall.ts#L14)*

___

### `Const` DEFAULT_WHEEL_COLOR

• **DEFAULT_WHEEL_COLOR**: *0* = 0

*Defined in [engine/objects/robot/SimRobotWheel.ts:7](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/SimRobotWheel.ts#L7)*

___

### `Const` DEFAULT_WHEEL_THICKNESS

• **DEFAULT_WHEEL_THICKNESS**: *0.15* = 0.15

*Defined in [engine/objects/robot/SimRobotWheel.ts:8](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/SimRobotWheel.ts#L8)*

___

### `Const` RAYCAST_UPDATE_INTERVAL_MS

• **RAYCAST_UPDATE_INTERVAL_MS**: *50* = 50

*Defined in [engine/EventRegistry.ts:25](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/EventRegistry.ts#L25)*

___

### `Const` ROBOT_DEFAULT_COLOR

• **ROBOT_DEFAULT_COLOR**: *65280* = 65280

*Defined in [engine/objects/robot/SimRobot.ts:16](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/SimRobot.ts#L16)*

___

### `Const` SENSOR_ACTIVE_COLOR

• **SENSOR_ACTIVE_COLOR**: *16711680* = 16711680

*Defined in [engine/objects/robot/sensors/SimContactSensor.ts:16](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/sensors/SimContactSensor.ts#L16)*

___

### `Const` SENSOR_INACTIVE_COLOR

• **SENSOR_INACTIVE_COLOR**: *11184810* = 11184810

*Defined in [engine/objects/robot/sensors/SimContactSensor.ts:15](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/sensors/SimContactSensor.ts#L15)*

___

### `Let` simulator

• **simulator**: *[Sim3D](classes/sim3d.md)*

*Defined in [demos/demo1.ts:3](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/demos/demo1.ts#L3)*

## Functions

###  clamp

▸ **clamp**(`value`: number, `min`: number, `max`: number): *number*

*Defined in [engine/utils/MathUtil.ts:1](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/utils/MathUtil.ts#L1)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | number |
`min` | number |
`max` | number |

**Returns:** *number*

___

###  getAngleRadians2d

▸ **getAngleRadians2d**(`start`: [Vector2d](globals.md#vector2d), `end`: [Vector2d](globals.md#vector2d)): *number*

*Defined in [engine/utils/Geom2dUtil.ts:19](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/utils/Geom2dUtil.ts#L19)*

**Parameters:**

Name | Type |
------ | ------ |
`start` | [Vector2d](globals.md#vector2d) |
`end` | [Vector2d](globals.md#vector2d) |

**Returns:** *number*

___

###  getLineLength2d

▸ **getLineLength2d**(`start`: [Vector2d](globals.md#vector2d), `end`: [Vector2d](globals.md#vector2d)): *number*

*Defined in [engine/utils/Geom2dUtil.ts:3](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/utils/Geom2dUtil.ts#L3)*

**Parameters:**

Name | Type |
------ | ------ |
`start` | [Vector2d](globals.md#vector2d) |
`end` | [Vector2d](globals.md#vector2d) |

**Returns:** *number*

___

###  getMidpoint2d

▸ **getMidpoint2d**(`start`: [Vector2d](globals.md#vector2d), `end`: [Vector2d](globals.md#vector2d)): *[Vector2d](globals.md#vector2d)*

*Defined in [engine/utils/Geom2dUtil.ts:9](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/utils/Geom2dUtil.ts#L9)*

**Parameters:**

Name | Type |
------ | ------ |
`start` | [Vector2d](globals.md#vector2d) |
`end` | [Vector2d](globals.md#vector2d) |

**Returns:** *[Vector2d](globals.md#vector2d)*

___

###  getMountPointPosition

▸ **getMountPointPosition**(`robotSpec`: [IRobotSpec](interfaces/irobotspec.md), `mountPoint`: [WheelMountingPoint](enums/wheelmountingpoint.md)): *[Vector3d](globals.md#vector3d)*

*Defined in [engine/objects/robot/SimRobotDrivetrain.ts:12](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/SimRobotDrivetrain.ts#L12)*

**Parameters:**

Name | Type |
------ | ------ |
`robotSpec` | [IRobotSpec](interfaces/irobotspec.md) |
`mountPoint` | [WheelMountingPoint](enums/wheelmountingpoint.md) |

**Returns:** *[Vector3d](globals.md#vector3d)*

___

###  getSensorDescriptors

▸ **getSensorDescriptors**(`a`: Fixture, `b`: Fixture): *[ISimSensorDescriptor](interfaces/isimsensordescriptor.md)[]*

*Defined in [engine/EventRegistry.ts:8](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/EventRegistry.ts#L8)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | Fixture |
`b` | Fixture |

**Returns:** *[ISimSensorDescriptor](interfaces/isimsensordescriptor.md)[]*

___

###  getSensorMountPosition

▸ **getSensorMountPosition**(`robotSpec`: [IRobotSpec](interfaces/irobotspec.md), `mountFace`: [SensorMountingFace](enums/sensormountingface.md), `offset?`: [Vector3d](globals.md#vector3d)): *[Vector3d](globals.md#vector3d)*

*Defined in [engine/utils/RobotUtils.ts:5](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/utils/RobotUtils.ts#L5)*

**Parameters:**

Name | Type |
------ | ------ |
`robotSpec` | [IRobotSpec](interfaces/irobotspec.md) |
`mountFace` | [SensorMountingFace](enums/sensormountingface.md) |
`offset?` | [Vector3d](globals.md#vector3d) |

**Returns:** *[Vector3d](globals.md#vector3d)*

___

###  getWheelPosition

▸ **getWheelPosition**(`robotSpec`: [IRobotSpec](interfaces/irobotspec.md), `wheelMount`: [IRobotWheelAndMount](interfaces/irobotwheelandmount.md)): *[Vector3d](globals.md#vector3d)*

*Defined in [engine/objects/robot/SimRobotDrivetrain.ts:54](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/SimRobotDrivetrain.ts#L54)*

**Parameters:**

Name | Type |
------ | ------ |
`robotSpec` | [IRobotSpec](interfaces/irobotspec.md) |
`wheelMount` | [IRobotWheelAndMount](interfaces/irobotwheelandmount.md) |

**Returns:** *[Vector3d](globals.md#vector3d)*

___

###  main

▸ **main**(): *void*

*Defined in [demos/demo1.ts:28](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/demos/demo1.ts#L28)*

**Returns:** *void*

___

###  makeGrid

▸ **makeGrid**(`plane`: [GridPlane](enums/gridplane.md), `axis1HalfLength`: number, `axis2HalfLength`: number, `numLinesAxis1`: number, `numLinesAxis2`: number, `color`: number): *Object3D*

*Defined in [engine/utils/GridUtil.ts:23](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/utils/GridUtil.ts#L23)*

Make a plane grid centered around origin

Note that this function takes in HALF-LENGTHS, thus, if you want a grid
that is e.g. 10 x 20, you should pass in 5 and 10 instead. The center of
the grid will be set as the origin.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`plane` | [GridPlane](enums/gridplane.md) | - | Plane to create the grid in |
`axis1HalfLength` | number | - | half-length of grid in first axis in normalized units (metres) |
`axis2HalfLength` | number | - | half-length of grid in second axis normalized units (metres) |
`numLinesAxis1` | number | - | - |
`numLinesAxis2` | number | - | - |
`color` | number | 13421772 | Grid color  |

**Returns:** *Object3D*

___

###  makeSimBall

▸ **makeSimBall**(`spec`: [IBallSpec](interfaces/iballspec.md)): *[SimBall](classes/simball.md)*

*Defined in [engine/objects/SimBall.ts:15](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimBall.ts#L15)*

Factory method for creating a SimBall

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`spec` | [IBallSpec](interfaces/iballspec.md) |   |

**Returns:** *[SimBall](classes/simball.md)*

___

###  makeSimBox

▸ **makeSimBox**(`spec`: [IBoxSpec](interfaces/iboxspec.md)): *[SimBox](classes/simbox.md)*

*Defined in [engine/objects/SimBox.ts:15](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimBox.ts#L15)*

Factory method for creating a SimBox

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`spec` | [IBoxSpec](interfaces/iboxspec.md) |   |

**Returns:** *[SimBox](classes/simbox.md)*

___

###  makeSimCone

▸ **makeSimCone**(`spec`: [IConeSpec](interfaces/iconespec.md)): *[SimCone](classes/simcone.md)*

*Defined in [engine/objects/SimCone.ts:15](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimCone.ts#L15)*

Factory method for creating a SimCone

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`spec` | [IConeSpec](interfaces/iconespec.md) |   |

**Returns:** *[SimCone](classes/simcone.md)*

___

###  makeSimCylinder

▸ **makeSimCylinder**(`spec`: [ICylinderSpec](interfaces/icylinderspec.md)): *[SimCylinder](classes/simcylinder.md)*

*Defined in [engine/objects/SimCylinder.ts:15](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimCylinder.ts#L15)*

Factory method for creating a SimCylinder

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`spec` | [ICylinderSpec](interfaces/icylinderspec.md) |   |

**Returns:** *[SimCylinder](classes/simcylinder.md)*

___

###  makeSimPyramid

▸ **makeSimPyramid**(`spec`: [IPyramidSpec](interfaces/ipyramidspec.md)): *[SimPyramid](classes/simpyramid.md)*

*Defined in [engine/objects/SimPyramid.ts:15](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimPyramid.ts#L15)*

Factory method for creating a SimBall

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`spec` | [IPyramidSpec](interfaces/ipyramidspec.md) |   |

**Returns:** *[SimPyramid](classes/simpyramid.md)*

___

###  makeSimWall

▸ **makeSimWall**(`spec`: [IWallSpec](interfaces/iwallspec.md)): *[SimWall](classes/simwall.md)*

*Defined in [engine/objects/SimWall.ts:22](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimWall.ts#L22)*

Factory method for creating a SimWall

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`spec` | [IWallSpec](interfaces/iwallspec.md) |   |

**Returns:** *[SimWall](classes/simwall.md)*

## Object literals

### `Const` DEFAULT_CONFIG

### ▪ **DEFAULT_CONFIG**: *object*

*Defined in [engine/Sim3D.ts:34](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/Sim3D.ts#L34)*

▪ **defaultWorld**: *object*

*Defined in [engine/Sim3D.ts:35](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/Sim3D.ts#L35)*

* **walls**: *undefined[]* = []

* **xLength**: *number* = 10

* **zLength**: *number* = 10

* **camera**: *object*

  * **position**: *object*

    * **x**: *number* = 0

    * **y**: *number* = 4

    * **z**: *number* = 5

___

### `Const` simConfig

### ▪ **simConfig**: *object*

*Defined in [demos/demo1.ts:5](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/demos/demo1.ts#L5)*

▪ **defaultWorld**: *object*

*Defined in [demos/demo1.ts:6](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/demos/demo1.ts#L6)*

* **walls**: *undefined[]* = []

* **xLength**: *number* = 10

* **zLength**: *number* = 20

* **camera**: *object*

  * **position**: *object*

    * **x**: *number* = 0

    * **y**: *number* = 4

    * **z**: *number* = 12
