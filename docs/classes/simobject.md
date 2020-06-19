[@fruk/simulator-core](../README.md) › [Globals](../globals.md) › [SimObject](simobject.md)

# Class: SimObject

Base class representing an object that can be rendered in a scene
and take part in physics simulation.

## Hierarchy

* **SimObject**

  ↳ [SimBall](simball.md)

  ↳ [SimBox](simbox.md)

  ↳ [SimWall](simwall.md)

  ↳ [SimPyramid](simpyramid.md)

  ↳ [SimCone](simcone.md)

  ↳ [SimCylinder](simcylinder.md)

  ↳ [SimRobotWheel](simrobotwheel.md)

  ↳ [SimBasicSensor](simbasicsensor.md)

  ↳ [SimRobot](simrobot.md)

## Index

### Constructors

* [constructor](simobject.md#constructor)

### Properties

* [_body](simobject.md#protected-_body)
* [_children](simobject.md#protected-_children)
* [_guid](simobject.md#private-_guid)
* [_mesh](simobject.md#protected-_mesh)
* [_type](simobject.md#protected-_type)

### Accessors

* [body](simobject.md#body)
* [children](simobject.md#children)
* [guid](simobject.md#guid)
* [mesh](simobject.md#mesh)
* [type](simobject.md#type)

### Methods

* [addChild](simobject.md#protected-addchild)
* [getBodySpecs](simobject.md#abstract-getbodyspecs)
* [getFixtureDef](simobject.md#abstract-getfixturedef)
* [removeChild](simobject.md#protected-removechild)
* [setBody](simobject.md#setbody)
* [update](simobject.md#abstract-update)

## Constructors

###  constructor

\+ **new SimObject**(`type`: string): *[SimObject](simobject.md)*

*Defined in [engine/objects/SimObject.ts:16](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimObject.ts#L16)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | string |

**Returns:** *[SimObject](simobject.md)*

## Properties

### `Protected` _body

• **_body**: *Body*

*Defined in [engine/objects/SimObject.ts:11](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimObject.ts#L11)*

___

### `Protected` _children

• **_children**: *[SimObject](simobject.md)[]* = []

*Defined in [engine/objects/SimObject.ts:12](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimObject.ts#L12)*

___

### `Private` _guid

• **_guid**: *string*

*Defined in [engine/objects/SimObject.ts:16](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimObject.ts#L16)*

___

### `Protected` _mesh

• **_mesh**: *Mesh*

*Defined in [engine/objects/SimObject.ts:10](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimObject.ts#L10)*

___

### `Protected` _type

• **_type**: *string* = "SimObject"

*Defined in [engine/objects/SimObject.ts:14](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimObject.ts#L14)*

## Accessors

###  body

• **get body**(): *Body*

*Defined in [engine/objects/SimObject.ts:35](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimObject.ts#L35)*

**Returns:** *Body*

___

###  children

• **get children**(): *[SimObject](simobject.md)[]*

*Defined in [engine/objects/SimObject.ts:39](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimObject.ts#L39)*

**Returns:** *[SimObject](simobject.md)[]*

___

###  guid

• **get guid**(): *string*

*Defined in [engine/objects/SimObject.ts:27](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimObject.ts#L27)*

**Returns:** *string*

___

###  mesh

• **get mesh**(): *Mesh*

*Defined in [engine/objects/SimObject.ts:31](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimObject.ts#L31)*

**Returns:** *Mesh*

___

###  type

• **get type**(): *string*

*Defined in [engine/objects/SimObject.ts:23](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimObject.ts#L23)*

**Returns:** *string*

## Methods

### `Protected` addChild

▸ **addChild**(`child`: [SimObject](simobject.md)): *void*

*Defined in [engine/objects/SimObject.ts:43](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimObject.ts#L43)*

**Parameters:**

Name | Type |
------ | ------ |
`child` | [SimObject](simobject.md) |

**Returns:** *void*

___

### `Abstract` getBodySpecs

▸ **getBodySpecs**(): *BodyDef*

*Defined in [engine/objects/SimObject.ts:74](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimObject.ts#L74)*

returns the specification for the world's body

**Returns:** *BodyDef*

___

### `Abstract` getFixtureDef

▸ **getFixtureDef**(): *FixtureDef*

*Defined in [engine/objects/SimObject.ts:75](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimObject.ts#L75)*

**Returns:** *FixtureDef*

___

### `Protected` removeChild

▸ **removeChild**(`child`: [SimObject](simobject.md) | string): *void*

*Defined in [engine/objects/SimObject.ts:47](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimObject.ts#L47)*

**Parameters:**

Name | Type |
------ | ------ |
`child` | [SimObject](simobject.md) &#124; string |

**Returns:** *void*

___

###  setBody

▸ **setBody**(`body`: Body): *void*

*Defined in [engine/objects/SimObject.ts:61](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimObject.ts#L61)*

**Parameters:**

Name | Type |
------ | ------ |
`body` | Body |

**Returns:** *void*

___

### `Abstract` update

▸ **update**(`ms`: number): *void*

*Defined in [engine/objects/SimObject.ts:69](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimObject.ts#L69)*

Update the object based on physics calculations

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ms` | number | Time delta between now and the last time this function was run  |

**Returns:** *void*
