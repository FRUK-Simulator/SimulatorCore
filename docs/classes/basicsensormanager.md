[@fruk/simulator-core](../README.md) › [Globals](../globals.md) › [BasicSensorManager](basicsensormanager.md)

# Class: BasicSensorManager

Class representing a collection of robot sensors

This class is not a SimObject, but instead a "manager" or SimObjects,
in this instance, SimBasicSensor objects.

## Hierarchy

* **BasicSensorManager**

## Index

### Constructors

* [constructor](basicsensormanager.md#constructor)

### Properties

* [_sensors](basicsensormanager.md#private-_sensors)

### Accessors

* [sensors](basicsensormanager.md#sensors)

### Methods

* [configureSensors](basicsensormanager.md#private-configuresensors)
* [getAnalogInput](basicsensormanager.md#getanaloginput)
* [getDigitalInput](basicsensormanager.md#getdigitalinput)
* [registerWithEventSystem](basicsensormanager.md#registerwitheventsystem)

## Constructors

###  constructor

\+ **new BasicSensorManager**(`robotSpec`: [IRobotSpec](../interfaces/irobotspec.md), `robotGuid`: string): *[BasicSensorManager](basicsensormanager.md)*

*Defined in [engine/objects/robot/sensors/BasicSensorManager.ts:20](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/sensors/BasicSensorManager.ts#L20)*

**Parameters:**

Name | Type |
------ | ------ |
`robotSpec` | [IRobotSpec](../interfaces/irobotspec.md) |
`robotGuid` | string |

**Returns:** *[BasicSensorManager](basicsensormanager.md)*

## Properties

### `Private` _sensors

• **_sensors**: *Map‹string, [SimBasicSensor](simbasicsensor.md)›* = new Map<
    string,
    SimBasicSensor
  >()

*Defined in [engine/objects/robot/sensors/BasicSensorManager.ts:17](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/sensors/BasicSensorManager.ts#L17)*

## Accessors

###  sensors

• **get sensors**(): *[SimBasicSensor](simbasicsensor.md)[]*

*Defined in [engine/objects/robot/sensors/BasicSensorManager.ts:52](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/sensors/BasicSensorManager.ts#L52)*

List of all currently registered [SimBasicSensor](simbasicsensor.md)s

**Returns:** *[SimBasicSensor](simbasicsensor.md)[]*

## Methods

### `Private` configureSensors

▸ **configureSensors**(`robotSpec`: [IRobotSpec](../interfaces/irobotspec.md), `robotGuid`: string): *void*

*Defined in [engine/objects/robot/sensors/BasicSensorManager.ts:26](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/sensors/BasicSensorManager.ts#L26)*

**Parameters:**

Name | Type |
------ | ------ |
`robotSpec` | [IRobotSpec](../interfaces/irobotspec.md) |
`robotGuid` | string |

**Returns:** *void*

___

###  getAnalogInput

▸ **getAnalogInput**(`channel`: number): *number*

*Defined in [engine/objects/robot/sensors/BasicSensorManager.ts:76](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/sensors/BasicSensorManager.ts#L76)*

**Parameters:**

Name | Type |
------ | ------ |
`channel` | number |

**Returns:** *number*

___

###  getDigitalInput

▸ **getDigitalInput**(`channel`: number): *boolean*

*Defined in [engine/objects/robot/sensors/BasicSensorManager.ts:67](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/sensors/BasicSensorManager.ts#L67)*

Query a digital sensor for its current state.

**Parameters:**

Name | Type |
------ | ------ |
`channel` | number |

**Returns:** *boolean*

`true` if the sensor is active, `false` if inactive or unregistered

___

###  registerWithEventSystem

▸ **registerWithEventSystem**(`robotGuid`: string, `eventRegistry`: [EventRegistry](eventregistry.md)): *void*

*Defined in [engine/objects/robot/sensors/BasicSensorManager.ts:85](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/sensors/BasicSensorManager.ts#L85)*

**Parameters:**

Name | Type |
------ | ------ |
`robotGuid` | string |
`eventRegistry` | [EventRegistry](eventregistry.md) |

**Returns:** *void*
