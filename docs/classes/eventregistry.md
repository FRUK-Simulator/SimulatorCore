[@fruk/simulator-core](../README.md) › [Globals](../globals.md) › [EventRegistry](eventregistry.md)

# Class: EventRegistry

Simulator-wide Event Registry

This class hooks into the currently loaded simulated world and listens
out for collision events. When events of interest are detected, the
registry will notify the appropriately subscribed [SimBasicSensor](simbasicsensor.md)
instance.

## Hierarchy

* **EventRegistry**

## Index

### Constructors

* [constructor](eventregistry.md#constructor)

### Properties

* [_sensors](eventregistry.md#private-_sensors)
* [_timeSinceLastUpdate](eventregistry.md#private-_timesincelastupdate)
* [_world](eventregistry.md#private-_world)

### Methods

* [broadcastContact](eventregistry.md#private-broadcastcontact)
* [onBeginContact](eventregistry.md#private-onbegincontact)
* [onEndContact](eventregistry.md#private-onendcontact)
* [registerSensor](eventregistry.md#registersensor)
* [update](eventregistry.md#update)
* [updateContactSensors](eventregistry.md#private-updatecontactsensors)

## Constructors

###  constructor

\+ **new EventRegistry**(`world`: World): *[EventRegistry](eventregistry.md)*

*Defined in [engine/EventRegistry.ts:43](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/EventRegistry.ts#L43)*

Create a new EventRegistry and connect it to the provided world

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`world` | World | Currently loaded physics world  |

**Returns:** *[EventRegistry](eventregistry.md)*

## Properties

### `Private` _sensors

• **_sensors**: *Map‹string, [SensorRegisty](../globals.md#sensorregisty)›* = new Map<
    string,
    SensorRegisty
  >()

*Defined in [engine/EventRegistry.ts:36](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/EventRegistry.ts#L36)*

___

### `Private` _timeSinceLastUpdate

• **_timeSinceLastUpdate**: *number* = 0

*Defined in [engine/EventRegistry.ts:43](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/EventRegistry.ts#L43)*

___

### `Private` _world

• **_world**: *World*

*Defined in [engine/EventRegistry.ts:41](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/EventRegistry.ts#L41)*

## Methods

### `Private` broadcastContact

▸ **broadcastContact**(`sensor`: [ISimSensorDescriptor](../interfaces/isimsensordescriptor.md), `hasContact`: boolean): *void*

*Defined in [engine/EventRegistry.ts:113](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/EventRegistry.ts#L113)*

Inform [SimContactSensor](simcontactsensor.md)s of an update in their state

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`sensor` | [ISimSensorDescriptor](../interfaces/isimsensordescriptor.md) | - |
`hasContact` | boolean |   |

**Returns:** *void*

___

### `Private` onBeginContact

▸ **onBeginContact**(`contact`: Contact): *void*

*Defined in [engine/EventRegistry.ts:64](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/EventRegistry.ts#L64)*

Event handler when a collision begins to occur (shapes overlapping)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`contact` | Contact |   |

**Returns:** *void*

___

### `Private` onEndContact

▸ **onEndContact**(`contact`: Contact): *void*

*Defined in [engine/EventRegistry.ts:73](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/EventRegistry.ts#L73)*

Event handler when a collisions stops occuring (shapes have stopped overlapping)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`contact` | Contact |   |

**Returns:** *void*

___

###  registerSensor

▸ **registerSensor**(`robotGuid`: string, `sensor`: [SimBasicSensor](simbasicsensor.md)): *void*

*Defined in [engine/EventRegistry.ts:141](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/EventRegistry.ts#L141)*

Register a sensor callback

This will end up getting called by a [SimRobot](simrobot.md) instance as part
of its initialization routines

**Parameters:**

Name | Type |
------ | ------ |
`robotGuid` | string |
`sensor` | [SimBasicSensor](simbasicsensor.md) |

**Returns:** *void*

___

###  update

▸ **update**(`dtS`: number): *void*

*Defined in [engine/EventRegistry.ts:153](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/EventRegistry.ts#L153)*

**Parameters:**

Name | Type |
------ | ------ |
`dtS` | number |

**Returns:** *void*

___

### `Private` updateContactSensors

▸ **updateContactSensors**(`contact`: Contact, `hasContact`: boolean): *void*

*Defined in [engine/EventRegistry.ts:83](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/EventRegistry.ts#L83)*

Broadcast a collision event to appropriate [SimContactSensor](simcontactsensor.md) instances

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`contact` | Contact | - |
`hasContact` | boolean |   |

**Returns:** *void*
