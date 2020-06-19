[@fruk/simulator-core](../README.md) › [Globals](../globals.md) › [SimDistanceSensor](simdistancesensor.md)

# Class: SimDistanceSensor

Simulated Distance Sensor

This is a [SimBasicSensor](simbasicsensor.md) that returns a numeric value, representing
a voltage percentage to the distance that it has measured. A percentage is
returned so that multiple use cases can be supported (i.e. "robots" running
at different voltages).

Simply put, the sensor return represents a percentage of V<sub>ref</sub>, the
reference voltage that a robot controller (in real life) uses for analog inputs.

As part of the [spec](../interfaces/idistancesensorspec.md), a `maxRange` must be specified.
Optionally, a `minRange` can be provided as well. The ranges represent the valid
distances in which an object can be detected by the sensor. Anything falling under
the minimum range will register as 0%, and anything outside of detection range
will register at 100%.

## Hierarchy

  ↳ [SimBasicSensor](simbasicsensor.md)

  ↳ **SimDistanceSensor**

## Index

### Constructors

* [constructor](simdistancesensor.md#constructor)

### Properties

* [_body](simdistancesensor.md#protected-_body)
* [_bodySpecs](simdistancesensor.md#protected-_bodyspecs)
* [_channel](simdistancesensor.md#protected-_channel)
* [_channelType](simdistancesensor.md#protected-_channeltype)
* [_children](simdistancesensor.md#protected-_children)
* [_detectAngle](simdistancesensor.md#private-_detectangle)
* [_fixtureSpecs](simdistancesensor.md#protected-_fixturespecs)
* [_maxRange](simdistancesensor.md#private-_maxrange)
* [_mesh](simdistancesensor.md#protected-_mesh)
* [_minRange](simdistancesensor.md#private-_minrange)
* [_sensorType](simdistancesensor.md#protected-_sensortype)
* [_type](simdistancesensor.md#protected-_type)
* [_value](simdistancesensor.md#protected-_value)

### Accessors

* [body](simdistancesensor.md#body)
* [channel](simdistancesensor.md#channel)
* [channelType](simdistancesensor.md#channeltype)
* [children](simdistancesensor.md#children)
* [detectionAngle](simdistancesensor.md#detectionangle)
* [guid](simdistancesensor.md#guid)
* [identifier](simdistancesensor.md#identifier)
* [maxRange](simdistancesensor.md#maxrange)
* [mesh](simdistancesensor.md#mesh)
* [minRange](simdistancesensor.md#minrange)
* [sensorType](simdistancesensor.md#sensortype)
* [type](simdistancesensor.md#type)
* [value](simdistancesensor.md#value)

### Methods

* [addChild](simdistancesensor.md#protected-addchild)
* [getBodySpecs](simdistancesensor.md#getbodyspecs)
* [getFixtureDef](simdistancesensor.md#getfixturedef)
* [onSensorEvent](simdistancesensor.md#onsensorevent)
* [registerWithEventSystem](simdistancesensor.md#registerwitheventsystem)
* [removeChild](simdistancesensor.md#protected-removechild)
* [setBody](simdistancesensor.md#setbody)
* [setValue](simdistancesensor.md#protected-setvalue)
* [update](simdistancesensor.md#update)

## Constructors

###  constructor

\+ **new SimDistanceSensor**(`spec`: [IDistanceSensorSpec](../interfaces/idistancesensorspec.md), `robotGuid`: string, `robotSpec`: [IRobotSpec](../interfaces/irobotspec.md)): *[SimDistanceSensor](simdistancesensor.md)*

*Overrides [SimBasicSensor](simbasicsensor.md).[constructor](simbasicsensor.md#constructor)*

*Defined in [engine/objects/robot/sensors/SimDistanceSensor.ts:34](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/sensors/SimDistanceSensor.ts#L34)*

**Parameters:**

Name | Type |
------ | ------ |
`spec` | [IDistanceSensorSpec](../interfaces/idistancesensorspec.md) |
`robotGuid` | string |
`robotSpec` | [IRobotSpec](../interfaces/irobotspec.md) |

**Returns:** *[SimDistanceSensor](simdistancesensor.md)*

## Properties

### `Protected` _body

• **_body**: *Body*

*Inherited from [SimObject](simobject.md).[_body](simobject.md#protected-_body)*

*Defined in [engine/objects/SimObject.ts:11](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimObject.ts#L11)*

___

### `Protected` _bodySpecs

• **_bodySpecs**: *BodyDef*

*Inherited from [SimDistanceSensor](simdistancesensor.md).[_bodySpecs](simdistancesensor.md#protected-_bodyspecs)*

*Defined in [engine/objects/robot/sensors/SimBasicSensor.ts:23](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/sensors/SimBasicSensor.ts#L23)*

___

### `Protected` _channel

• **_channel**: *number*

*Inherited from [SimDistanceSensor](simdistancesensor.md).[_channel](simdistancesensor.md#protected-_channel)*

*Defined in [engine/objects/robot/sensors/SimBasicSensor.ts:17](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/sensors/SimBasicSensor.ts#L17)*

___

### `Protected` _channelType

• **_channelType**: *[BasicSensorOutputChannelType](../enums/basicsensoroutputchanneltype.md)*

*Inherited from [SimDistanceSensor](simdistancesensor.md).[_channelType](simdistancesensor.md#protected-_channeltype)*

*Defined in [engine/objects/robot/sensors/SimBasicSensor.ts:18](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/sensors/SimBasicSensor.ts#L18)*

___

### `Protected` _children

• **_children**: *[SimObject](simobject.md)[]* = []

*Inherited from [SimObject](simobject.md).[_children](simobject.md#protected-_children)*

*Defined in [engine/objects/SimObject.ts:12](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimObject.ts#L12)*

___

### `Private` _detectAngle

• **_detectAngle**: *number* = 0

*Defined in [engine/objects/robot/sensors/SimDistanceSensor.ts:34](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/sensors/SimDistanceSensor.ts#L34)*

___

### `Protected` _fixtureSpecs

• **_fixtureSpecs**: *FixtureDef*

*Inherited from [SimDistanceSensor](simdistancesensor.md).[_fixtureSpecs](simdistancesensor.md#protected-_fixturespecs)*

*Defined in [engine/objects/robot/sensors/SimBasicSensor.ts:24](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/sensors/SimBasicSensor.ts#L24)*

___

### `Private` _maxRange

• **_maxRange**: *number* = 0

*Defined in [engine/objects/robot/sensors/SimDistanceSensor.ts:33](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/sensors/SimDistanceSensor.ts#L33)*

___

### `Protected` _mesh

• **_mesh**: *Mesh*

*Inherited from [SimObject](simobject.md).[_mesh](simobject.md#protected-_mesh)*

*Defined in [engine/objects/SimObject.ts:10](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimObject.ts#L10)*

___

### `Private` _minRange

• **_minRange**: *number* = 0

*Defined in [engine/objects/robot/sensors/SimDistanceSensor.ts:32](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/sensors/SimDistanceSensor.ts#L32)*

___

### `Protected` _sensorType

• **_sensorType**: *string*

*Inherited from [SimDistanceSensor](simdistancesensor.md).[_sensorType](simdistancesensor.md#protected-_sensortype)*

*Defined in [engine/objects/robot/sensors/SimBasicSensor.ts:19](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/sensors/SimBasicSensor.ts#L19)*

___

### `Protected` _type

• **_type**: *string* = "SimObject"

*Inherited from [SimObject](simobject.md).[_type](simobject.md#protected-_type)*

*Defined in [engine/objects/SimObject.ts:14](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimObject.ts#L14)*

___

### `Protected` _value

• **_value**: *[IBasicSensorValue](../interfaces/ibasicsensorvalue.md)*

*Inherited from [SimDistanceSensor](simdistancesensor.md).[_value](simdistancesensor.md#protected-_value)*

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

*Inherited from [SimDistanceSensor](simdistancesensor.md).[channel](simdistancesensor.md#channel)*

*Defined in [engine/objects/robot/sensors/SimBasicSensor.ts:48](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/sensors/SimBasicSensor.ts#L48)*

Channel number of this sensor

**Returns:** *number*

___

###  channelType

• **get channelType**(): *[BasicSensorOutputChannelType](../enums/basicsensoroutputchanneltype.md)*

*Inherited from [SimDistanceSensor](simdistancesensor.md).[channelType](simdistancesensor.md#channeltype)*

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

###  detectionAngle

• **get detectionAngle**(): *number*

*Defined in [engine/objects/robot/sensors/SimDistanceSensor.ts:118](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/sensors/SimDistanceSensor.ts#L118)*

Total angle coverage of the detection cone

**Returns:** *number*

___

###  guid

• **get guid**(): *string*

*Inherited from [SimObject](simobject.md).[guid](simobject.md#guid)*

*Defined in [engine/objects/SimObject.ts:27](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimObject.ts#L27)*

**Returns:** *string*

___

###  identifier

• **get identifier**(): *string*

*Inherited from [SimDistanceSensor](simdistancesensor.md).[identifier](simdistancesensor.md#identifier)*

*Defined in [engine/objects/robot/sensors/SimBasicSensor.ts:62](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/sensors/SimBasicSensor.ts#L62)*

Robot-specific sensor identifier

**Returns:** *string*

___

###  maxRange

• **get maxRange**(): *number*

*Defined in [engine/objects/robot/sensors/SimDistanceSensor.ts:111](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/sensors/SimDistanceSensor.ts#L111)*

Maximum range that this sensor supports

**Returns:** *number*

___

###  mesh

• **get mesh**(): *Mesh*

*Inherited from [SimObject](simobject.md).[mesh](simobject.md#mesh)*

*Defined in [engine/objects/SimObject.ts:31](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimObject.ts#L31)*

**Returns:** *Mesh*

___

###  minRange

• **get minRange**(): *number*

*Defined in [engine/objects/robot/sensors/SimDistanceSensor.ts:104](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/sensors/SimDistanceSensor.ts#L104)*

Minimum range that this sensor supports (defaults to 0)

**Returns:** *number*

___

###  sensorType

• **get sensorType**(): *string*

*Inherited from [SimDistanceSensor](simdistancesensor.md).[sensorType](simdistancesensor.md#sensortype)*

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

*Inherited from [SimDistanceSensor](simdistancesensor.md).[value](simdistancesensor.md#value)*

*Defined in [engine/objects/robot/sensors/SimBasicSensor.ts:76](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/sensors/SimBasicSensor.ts#L76)*

Current "public" value of this sensor

This value represents what a physical sensor would send to its
controller. E.g. a distance sensor will convert the distance it
gets via the [onSensorEvent](simdistancesensor.md#onsensorevent) callback into a voltage, and
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

*Inherited from [SimDistanceSensor](simdistancesensor.md).[getBodySpecs](simdistancesensor.md#getbodyspecs)*

*Overrides [SimObject](simobject.md).[getBodySpecs](simobject.md#abstract-getbodyspecs)*

*Defined in [engine/objects/robot/sensors/SimBasicSensor.ts:91](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/sensors/SimBasicSensor.ts#L91)*

**Returns:** *BodyDef*

___

###  getFixtureDef

▸ **getFixtureDef**(): *FixtureDef*

*Inherited from [SimDistanceSensor](simdistancesensor.md).[getFixtureDef](simdistancesensor.md#getfixturedef)*

*Overrides [SimObject](simobject.md).[getFixtureDef](simobject.md#abstract-getfixturedef)*

*Defined in [engine/objects/robot/sensors/SimBasicSensor.ts:95](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/sensors/SimBasicSensor.ts#L95)*

**Returns:** *FixtureDef*

___

###  onSensorEvent

▸ **onSensorEvent**(`val`: [IBasicSensorValue](../interfaces/ibasicsensorvalue.md)): *void*

*Overrides [SimBasicSensor](simbasicsensor.md).[onSensorEvent](simbasicsensor.md#abstract-onsensorevent)*

*Defined in [engine/objects/robot/sensors/SimDistanceSensor.ts:131](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/sensors/SimDistanceSensor.ts#L131)*

**Parameters:**

Name | Type |
------ | ------ |
`val` | [IBasicSensorValue](../interfaces/ibasicsensorvalue.md) |

**Returns:** *void*

___

###  registerWithEventSystem

▸ **registerWithEventSystem**(`robotGuid`: string, `eventRegistry`: [EventRegistry](eventregistry.md)): *void*

*Inherited from [SimDistanceSensor](simdistancesensor.md).[registerWithEventSystem](simdistancesensor.md#registerwitheventsystem)*

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

*Inherited from [SimDistanceSensor](simdistancesensor.md).[setValue](simdistancesensor.md#protected-setvalue)*

*Defined in [engine/objects/robot/sensors/SimBasicSensor.ts:87](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/sensors/SimBasicSensor.ts#L87)*

Update the value of this sensor

Usually called via the [onSensorEvent](simdistancesensor.md#onsensorevent) callback

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`val` | [IBasicSensorValue](../interfaces/ibasicsensorvalue.md) |   |

**Returns:** *void*

___

###  update

▸ **update**(`ms`: number): *void*

*Overrides [SimObject](simobject.md).[update](simobject.md#abstract-update)*

*Defined in [engine/objects/robot/sensors/SimDistanceSensor.ts:123](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/sensors/SimDistanceSensor.ts#L123)*

**Parameters:**

Name | Type |
------ | ------ |
`ms` | number |

**Returns:** *void*
