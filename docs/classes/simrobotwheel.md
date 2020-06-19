[@fruk/simulator-core](../README.md) › [Globals](../globals.md) › [SimRobotWheel](simrobotwheel.md)

# Class: SimRobotWheel

## Hierarchy

* [SimObject](simobject.md)

  ↳ **SimRobotWheel**

## Index

### Constructors

* [constructor](simrobotwheel.md#constructor)

### Properties

* [_body](simrobotwheel.md#protected-_body)
* [_bodySpecs](simrobotwheel.md#private-_bodyspecs)
* [_children](simrobotwheel.md#protected-_children)
* [_fixtureSpecs](simrobotwheel.md#private-_fixturespecs)
* [_forceMagnitude](simrobotwheel.md#protected-_forcemagnitude)
* [_mesh](simrobotwheel.md#protected-_mesh)
* [_type](simrobotwheel.md#protected-_type)

### Accessors

* [body](simrobotwheel.md#body)
* [children](simrobotwheel.md#children)
* [guid](simrobotwheel.md#guid)
* [mesh](simrobotwheel.md#mesh)
* [type](simrobotwheel.md#type)

### Methods

* [addChild](simrobotwheel.md#protected-addchild)
* [getBodySpecs](simrobotwheel.md#getbodyspecs)
* [getFixtureDef](simrobotwheel.md#getfixturedef)
* [removeChild](simrobotwheel.md#protected-removechild)
* [setBody](simrobotwheel.md#setbody)
* [setForce](simrobotwheel.md#setforce)
* [update](simrobotwheel.md#update)

## Constructors

###  constructor

\+ **new SimRobotWheel**(`spec`: [IRobotWheelSpec](../interfaces/irobotwheelspec.md), `robotGuid`: string, `wheelPos?`: [Vector3d](../globals.md#vector3d)): *[SimRobotWheel](simrobotwheel.md)*

*Overrides [SimObject](simobject.md).[constructor](simobject.md#constructor)*

*Defined in [engine/objects/robot/SimRobotWheel.ts:14](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/SimRobotWheel.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`spec` | [IRobotWheelSpec](../interfaces/irobotwheelspec.md) |
`robotGuid` | string |
`wheelPos?` | [Vector3d](../globals.md#vector3d) |

**Returns:** *[SimRobotWheel](simrobotwheel.md)*

## Properties

### `Protected` _body

• **_body**: *Body*

*Inherited from [SimObject](simobject.md).[_body](simobject.md#protected-_body)*

*Defined in [engine/objects/SimObject.ts:11](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimObject.ts#L11)*

___

### `Private` _bodySpecs

• **_bodySpecs**: *BodyDef*

*Defined in [engine/objects/robot/SimRobotWheel.ts:13](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/SimRobotWheel.ts#L13)*

___

### `Protected` _children

• **_children**: *[SimObject](simobject.md)[]* = []

*Inherited from [SimObject](simobject.md).[_children](simobject.md#protected-_children)*

*Defined in [engine/objects/SimObject.ts:12](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimObject.ts#L12)*

___

### `Private` _fixtureSpecs

• **_fixtureSpecs**: *FixtureDef*

*Defined in [engine/objects/robot/SimRobotWheel.ts:14](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/SimRobotWheel.ts#L14)*

___

### `Protected` _forceMagnitude

• **_forceMagnitude**: *number* = 0

*Defined in [engine/objects/robot/SimRobotWheel.ts:11](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/SimRobotWheel.ts#L11)*

___

### `Protected` _mesh

• **_mesh**: *Mesh*

*Inherited from [SimObject](simobject.md).[_mesh](simobject.md#protected-_mesh)*

*Defined in [engine/objects/SimObject.ts:10](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimObject.ts#L10)*

___

### `Protected` _type

• **_type**: *string* = "SimObject"

*Inherited from [SimObject](simobject.md).[_type](simobject.md#protected-_type)*

*Defined in [engine/objects/SimObject.ts:14](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimObject.ts#L14)*

## Accessors

###  body

• **get body**(): *Body*

*Inherited from [SimObject](simobject.md).[body](simobject.md#body)*

*Defined in [engine/objects/SimObject.ts:35](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimObject.ts#L35)*

**Returns:** *Body*

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

###  mesh

• **get mesh**(): *Mesh*

*Inherited from [SimObject](simobject.md).[mesh](simobject.md#mesh)*

*Defined in [engine/objects/SimObject.ts:31](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimObject.ts#L31)*

**Returns:** *Mesh*

___

###  type

• **get type**(): *string*

*Inherited from [SimObject](simobject.md).[type](simobject.md#type)*

*Defined in [engine/objects/SimObject.ts:23](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/SimObject.ts#L23)*

**Returns:** *string*

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

*Defined in [engine/objects/robot/SimRobotWheel.ts:93](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/SimRobotWheel.ts#L93)*

**Returns:** *BodyDef*

___

###  getFixtureDef

▸ **getFixtureDef**(): *FixtureDef*

*Overrides [SimObject](simobject.md).[getFixtureDef](simobject.md#abstract-getfixturedef)*

*Defined in [engine/objects/robot/SimRobotWheel.ts:97](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/SimRobotWheel.ts#L97)*

**Returns:** *FixtureDef*

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

###  setForce

▸ **setForce**(`force`: number): *void*

*Defined in [engine/objects/robot/SimRobotWheel.ts:89](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/SimRobotWheel.ts#L89)*

**Parameters:**

Name | Type |
------ | ------ |
`force` | number |

**Returns:** *void*

___

###  update

▸ **update**(`ms`: number): *void*

*Overrides [SimObject](simobject.md).[update](simobject.md#abstract-update)*

*Defined in [engine/objects/robot/SimRobotWheel.ts:72](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/objects/robot/SimRobotWheel.ts#L72)*

**Parameters:**

Name | Type |
------ | ------ |
`ms` | number |

**Returns:** *void*
