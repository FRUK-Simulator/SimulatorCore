[@fruk/simulator-core](../README.md) › [Globals](../globals.md) › [SimRobotDrivetrain](simrobotdrivetrain.md)

# Class: SimRobotDrivetrain

Class representing a robot drivetrain made up of wheelgroups and motorgroups

This class is not a SimObject, but instead a "manager" of SimObjects, in this
instance, SimWheel objects.

## Hierarchy

* **SimRobotDrivetrain**

## Index

### Constructors

* [constructor](simrobotdrivetrain.md#constructor)

### Properties

* [_motors](simrobotdrivetrain.md#private-_motors)
* [_wheelGroupToMotorChannels](simrobotdrivetrain.md#private-_wheelgrouptomotorchannels)
* [_wheelGroups](simrobotdrivetrain.md#private-_wheelgroups)
* [_yOffset](simrobotdrivetrain.md#private-_yoffset)

### Accessors

* [wheelObjects](simrobotdrivetrain.md#wheelobjects)
* [yOffset](simrobotdrivetrain.md#yoffset)

### Methods

* [adjustWheelPositions](simrobotdrivetrain.md#private-adjustwheelpositions)
* [configureMotors](simrobotdrivetrain.md#private-configuremotors)
* [configureWheels](simrobotdrivetrain.md#private-configurewheels)
* [setMotorPower](simrobotdrivetrain.md#setmotorpower)
* [update](simrobotdrivetrain.md#update)

## Constructors

###  constructor

\+ **new SimRobotDrivetrain**(`spec`: [IRobotSpec](../interfaces/irobotspec.md), `robotGuid`: string): *[SimRobotDrivetrain](simrobotdrivetrain.md)*

*Defined in [engine/objects/robot/SimRobotDrivetrain.ts:86](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/SimRobotDrivetrain.ts#L86)*

**Parameters:**

Name | Type |
------ | ------ |
`spec` | [IRobotSpec](../interfaces/irobotspec.md) |
`robotGuid` | string |

**Returns:** *[SimRobotDrivetrain](simrobotdrivetrain.md)*

## Properties

### `Private` _motors

• **_motors**: *Map‹number, [SimMotor](simmotor.md)›* = new Map<number, SimMotor>()

*Defined in [engine/objects/robot/SimRobotDrivetrain.ts:78](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/SimRobotDrivetrain.ts#L78)*

___

### `Private` _wheelGroupToMotorChannels

• **_wheelGroupToMotorChannels**: *Map‹string, number[]›* = new Map<
    string,
    number[]
  >()

*Defined in [engine/objects/robot/SimRobotDrivetrain.ts:79](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/SimRobotDrivetrain.ts#L79)*

___

### `Private` _wheelGroups

• **_wheelGroups**: *Map‹string, [SimRobotWheel](simrobotwheel.md)[]›* = new Map<
    string,
    SimRobotWheel[]
  >()

*Defined in [engine/objects/robot/SimRobotDrivetrain.ts:74](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/SimRobotDrivetrain.ts#L74)*

___

### `Private` _yOffset

• **_yOffset**: *number* = 0

*Defined in [engine/objects/robot/SimRobotDrivetrain.ts:86](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/SimRobotDrivetrain.ts#L86)*

## Accessors

###  wheelObjects

• **get wheelObjects**(): *[SimRobotWheel](simrobotwheel.md)[]*

*Defined in [engine/objects/robot/SimRobotDrivetrain.ts:167](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/SimRobotDrivetrain.ts#L167)*

**Returns:** *[SimRobotWheel](simrobotwheel.md)[]*

___

###  yOffset

• **get yOffset**(): *number*

*Defined in [engine/objects/robot/SimRobotDrivetrain.ts:178](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/SimRobotDrivetrain.ts#L178)*

**Returns:** *number*

## Methods

### `Private` adjustWheelPositions

▸ **adjustWheelPositions**(): *void*

*Defined in [engine/objects/robot/SimRobotDrivetrain.ts:160](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/SimRobotDrivetrain.ts#L160)*

**Returns:** *void*

___

### `Private` configureMotors

▸ **configureMotors**(`robotSpec`: [IRobotSpec](../interfaces/irobotspec.md)): *void*

*Defined in [engine/objects/robot/SimRobotDrivetrain.ts:133](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/SimRobotDrivetrain.ts#L133)*

Sets up the Motors

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`robotSpec` | [IRobotSpec](../interfaces/irobotspec.md) |   |

**Returns:** *void*

___

### `Private` configureWheels

▸ **configureWheels**(`robotSpec`: [IRobotSpec](../interfaces/irobotspec.md), `robotGuid`: string): *void*

*Defined in [engine/objects/robot/SimRobotDrivetrain.ts:101](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/SimRobotDrivetrain.ts#L101)*

Sets up the SimWheel objects

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`robotSpec` | [IRobotSpec](../interfaces/irobotspec.md) |   |
`robotGuid` | string | - |

**Returns:** *void*

___

###  setMotorPower

▸ **setMotorPower**(`channel`: number, `value`: number): *void*

*Defined in [engine/objects/robot/SimRobotDrivetrain.ts:182](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/SimRobotDrivetrain.ts#L182)*

**Parameters:**

Name | Type |
------ | ------ |
`channel` | number |
`value` | number |

**Returns:** *void*

___

###  update

▸ **update**(): *void*

*Defined in [engine/objects/robot/SimRobotDrivetrain.ts:192](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/SimRobotDrivetrain.ts#L192)*

**Returns:** *void*
