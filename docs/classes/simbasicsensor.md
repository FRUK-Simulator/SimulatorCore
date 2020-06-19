[@fruk/simulator-core](../README.md) › [Globals](../globals.md) › [SimBasicSensor](simbasicsensor.md)

# Class: SimBasicSensor

Abstract base class representing a BasicSensor

A BasicSensor represents a physical sensor that provides feedback
either via a digital channel (HIGH/LOW) or an analog channel (voltage)

## Hierarchy

* [SimObject](simobject.md)

  ↳ **SimBasicSensor**

  ↳ [SimDistanceSensor](simdistancesensor.md)

  ↳ [SimContactSensor](simcontactsensor.md)

## Index

### Constructors

* [constructor](simbasicsensor.md#constructor)

### Properties

* [_body](simbasicsensor.md#protected-_body)
* [_bodySpecs](simbasicsensor.md#protected-_bodyspecs)
* [_channel](simbasicsensor.md#protected-_channel)
* [_channelType](simbasicsensor.md#protected-_channeltype)
* [_children](simbasicsensor.md#protected-_children)
* [_fixtureSpecs](simbasicsensor.md#protected-_fixturespecs)
* [_mesh](simbasicsensor.md#protected-_mesh)
* [_sensorType](simbasicsensor.md#protected-_sensortype)
* [_type](simbasicsensor.md#protected-_type)
* [_value](simbasicsensor.md#protected-_value)

### Accessors

* [body](simbasicsensor.md#body)
* [channel](simbasicsensor.md#channel)
* [channelType](simbasicsensor.md#channeltype)
* [children](simbasicsensor.md#children)
* [guid](simbasicsensor.md#guid)
* [identifier](simbasicsensor.md#identifier)
* [mesh](simbasicsensor.md#mesh)
* [sensorType](simbasicsensor.md#sensortype)
* [type](simbasicsensor.md#type)
* [value](simbasicsensor.md#value)

### Methods

* [addChild](simbasicsensor.md#protected-addchild)
* [getBodySpecs](simbasicsensor.md#getbodyspecs)
* [getFixtureDef](simbasicsensor.md#getfixturedef)
* [onSensorEvent](simbasicsensor.md#abstract-onsensorevent)
* [registerWithEventSystem](simbasicsensor.md#registerwitheventsystem)
* [removeChild](simbasicsensor.md#protected-removechild)
* [setBody](simbasicsensor.md#setbody)
* [setValue](simbasicsensor.md#protected-setvalue)
* [update](simbasicsensor.md#abstract-update)

## Constructors

###  constructor

\+ **new SimBasicSensor**(`type`: string, `channelType`: [BasicSensorOutputChannelType](../enums/basicsensoroutputchanneltype.md), `spec`: [IBasicSensorSpec](../interfaces/ibasicsensorspec.md)): *[SimBasicSensor](simbasicsensor.md)*

*Overrides [SimObject](simobject.md).[constructor](simobject.md#constructor)*

*Defined in [engine/objects/robot/sensors/SimBasicSensor.ts:24](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/sensors/SimBasicSensor.ts#L24)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | string |
`channelType` | [BasicSensorOutputChannelType](../enums/basicsensoroutputchanneltype.md) |
`spec` | [IBasicSensorSpec](../interfaces/ibasicsensorspec.md) |

**Returns:** *[SimBasicSensor](simbasicsensor.md)*

## Properties

### `Protected` _body

• **_body**: *Body*

*Inherited from [SimObject](simobject.md).[_body](simobject.md#protected-_body)*

*Defined in [engine/objects/SimObject.ts:11](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimObject.ts#L11)*

___

### `Protected` _bodySpecs

• **_bodySpecs**: *BodyDef*

*Defined in [engine/objects/robot/sensors/SimBasicSensor.ts:23](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/sensors/SimBasicSensor.ts#L23)*

___

### `Protected` _channel

• **_channel**: *number*

*Defined in [engine/objects/robot/sensors/SimBasicSensor.ts:17](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/sensors/SimBasicSensor.ts#L17)*

___

### `Protected` _channelType

• **_channelType**: *[BasicSensorOutputChannelType](../enums/basicsensoroutputchanneltype.md)*

*Defined in [engine/objects/robot/sensors/SimBasicSensor.ts:18](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/sensors/SimBasicSensor.ts#L18)*

___

### `Protected` _children

• **_children**: *[SimObject](simobject.md)[]* = []

*Inherited from [SimObject](simobject.md).[_children](simobject.md#protected-_children)*

*Defined in [engine/objects/SimObject.ts:12](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimObject.ts#L12)*

___

### `Protected` _fixtureSpecs

• **_fixtureSpecs**: *FixtureDef*

*Defined in [engine/objects/robot/sensors/SimBasicSensor.ts:24](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/sensors/SimBasicSensor.ts#L24)*

___

### `Protected` _mesh

• **_mesh**: *Mesh*

*Inherited from [SimObject](simobject.md).[_mesh](simobject.md#protected-_mesh)*

*Defined in [engine/objects/SimObject.ts:10](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimObject.ts#L10)*

___

### `Protected` _sensorType

• **_sensorType**: *string*

*Defined in [engine/objects/robot/sensors/SimBasicSensor.ts:19](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/sensors/SimBasicSensor.ts#L19)*

___

### `Protected` _type

• **_type**: *string* = "SimObject"

*Inherited from [SimObject](simobject.md).[_type](simobject.md#protected-_type)*

*Defined in [engine/objects/SimObject.ts:14](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimObject.ts#L14)*

___

### `Protected` _value

• **_value**: *[IBasicSensorValue](../interfaces/ibasicsensorvalue.md)*

*Defined in [engine/objects/robot/sensors/SimBasicSensor.ts:21](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/sensors/SimBasicSensor.ts#L21)*

## Accessors

###  body

• **get body**(): *Body*

*Inherited from [SimObject](simobject.md).[body](simobject.md#body)*

*Defined in [engine/objects/SimObject.ts:35](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimObject.ts#L35)*

**Returns:** *Body*

___

###  channel

• **get channel**(): *number*

*Defined in [engine/objects/robot/sensors/SimBasicSensor.ts:48](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/sensors/SimBasicSensor.ts#L48)*

Channel number of this sensor

**Returns:** *number*

___

###  channelType

• **get channelType**(): *[BasicSensorOutputChannelType](../enums/basicsensoroutputchanneltype.md)*

*Defined in [engine/objects/robot/sensors/SimBasicSensor.ts:55](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/sensors/SimBasicSensor.ts#L55)*

Channel type (analog/digital) of this sensor

**Returns:** *[BasicSensorOutputChannelType](../enums/basicsensoroutputchanneltype.md)*

___

###  children

• **get children**(): *[SimObject](simobject.md)[]*

*Inherited from [SimObject](simobject.md).[children](simobject.md#children)*

*Defined in [engine/objects/SimObject.ts:39](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimObject.ts#L39)*

**Returns:** *[SimObject](simobject.md)[]*

___

###  guid

• **get guid**(): *string*

*Inherited from [SimObject](simobject.md).[guid](simobject.md#guid)*

*Defined in [engine/objects/SimObject.ts:27](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimObject.ts#L27)*

**Returns:** *string*

___

###  identifier

• **get identifier**(): *string*

*Defined in [engine/objects/robot/sensors/SimBasicSensor.ts:62](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/sensors/SimBasicSensor.ts#L62)*

Robot-specific sensor identifier

**Returns:** *string*

___

###  mesh

• **get mesh**(): *Mesh*

*Inherited from [SimObject](simobject.md).[mesh](simobject.md#mesh)*

*Defined in [engine/objects/SimObject.ts:31](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimObject.ts#L31)*

**Returns:** *Mesh*

___

###  sensorType

• **get sensorType**(): *string*

*Defined in [engine/objects/robot/sensors/SimBasicSensor.ts:41](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/sensors/SimBasicSensor.ts#L41)*

Sensor specific type identifier

**Returns:** *string*

___

###  type

• **get type**(): *string*

*Inherited from [SimObject](simobject.md).[type](simobject.md#type)*

*Defined in [engine/objects/SimObject.ts:23](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimObject.ts#L23)*

**Returns:** *string*

___

###  value

• **get value**(): *number*

*Defined in [engine/objects/robot/sensors/SimBasicSensor.ts:76](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/sensors/SimBasicSensor.ts#L76)*

Current "public" value of this sensor

This value represents what a physical sensor would send to its
controller. E.g. a distance sensor will convert the distance it
gets via the [onSensorEvent](simbasicsensor.md#abstract-onsensorevent) callback into a voltage, and
return it here.

In the base case, we just return the raw value as a number

**Returns:** *number*

## Methods

### `Protected` addChild

▸ **addChild**(`child`: [SimObject](simobject.md)): *void*

*Inherited from [SimObject](simobject.md).[addChild](simobject.md#protected-addchild)*

*Defined in [engine/objects/SimObject.ts:43](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimObject.ts#L43)*

**Parameters:**

Name | Type |
------ | ------ |
`child` | [SimObject](simobject.md) |

**Returns:** *void*

___

###  getBodySpecs

▸ **getBodySpecs**(): *BodyDef*

*Overrides [SimObject](simobject.md).[getBodySpecs](simobject.md#abstract-getbodyspecs)*

*Defined in [engine/objects/robot/sensors/SimBasicSensor.ts:91](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/sensors/SimBasicSensor.ts#L91)*

**Returns:** *BodyDef*

___

###  getFixtureDef

▸ **getFixtureDef**(): *FixtureDef*

*Overrides [SimObject](simobject.md).[getFixtureDef](simobject.md#abstract-getfixturedef)*

*Defined in [engine/objects/robot/sensors/SimBasicSensor.ts:95](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/sensors/SimBasicSensor.ts#L95)*

**Returns:** *FixtureDef*

___

### `Abstract` onSensorEvent

▸ **onSensorEvent**(`val`: [IBasicSensorValue](../interfaces/ibasicsensorvalue.md)): *void*

*Defined in [engine/objects/robot/sensors/SimBasicSensor.ts:103](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/sensors/SimBasicSensor.ts#L103)*

Callback triggered whenever a sensor event happens

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`val` | [IBasicSensorValue](../interfaces/ibasicsensorvalue.md) |   |

**Returns:** *void*

___

###  registerWithEventSystem

▸ **registerWithEventSystem**(`robotGuid`: string, `eventRegistry`: [EventRegistry](eventregistry.md)): *void*

*Defined in [engine/objects/robot/sensors/SimBasicSensor.ts:110](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/sensors/SimBasicSensor.ts#L110)*

Register this sensor with the simulator wide [EventRegistry](eventregistry.md)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`robotGuid` | string | - |
`eventRegistry` | [EventRegistry](eventregistry.md) |   |

**Returns:** *void*

___

### `Protected` removeChild

▸ **removeChild**(`child`: [SimObject](simobject.md) | string): *void*

*Inherited from [SimObject](simobject.md).[removeChild](simobject.md#protected-removechild)*

*Defined in [engine/objects/SimObject.ts:47](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimObject.ts#L47)*

**Parameters:**

Name | Type |
------ | ------ |
`child` | [SimObject](simobject.md) &#124; string |

**Returns:** *void*

___

###  setBody

▸ **setBody**(`body`: Body): *void*

*Inherited from [SimObject](simobject.md).[setBody](simobject.md#setbody)*

*Defined in [engine/objects/SimObject.ts:61](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimObject.ts#L61)*

**Parameters:**

Name | Type |
------ | ------ |
`body` | Body |

**Returns:** *void*

___

### `Protected` setValue

▸ **setValue**(`val`: [IBasicSensorValue](../interfaces/ibasicsensorvalue.md)): *void*

*Defined in [engine/objects/robot/sensors/SimBasicSensor.ts:87](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/sensors/SimBasicSensor.ts#L87)*

Update the value of this sensor

Usually called via the [onSensorEvent](simbasicsensor.md#abstract-onsensorevent) callback

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`val` | [IBasicSensorValue](../interfaces/ibasicsensorvalue.md) |   |

**Returns:** *void*

___

### `Abstract` update

▸ **update**(`ms`: number): *void*

*Inherited from [SimObject](simobject.md).[update](simobject.md#abstract-update)*

*Defined in [engine/objects/SimObject.ts:69](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimObject.ts#L69)*

Update the object based on physics calculations

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ms` | number | Time delta between now and the last time this function was run  |

**Returns:** *void*
