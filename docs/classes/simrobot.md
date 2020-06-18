[@fruk/simulator-core](../README.md) › [Globals](../globals.md) › [SimRobot](simrobot.md)

# Class: SimRobot

## Hierarchy

* [SimObject](simobject.md)

  ↳ **SimRobot**

## Index

### Constructors

* [constructor](simrobot.md#constructor)

### Properties

* [_body](simrobot.md#protected-_body)
* [_bodySpecs](simrobot.md#private-_bodyspecs)
* [_children](simrobot.md#protected-_children)
* [_drivetrain](simrobot.md#private-_drivetrain)
* [_fixtureSpecs](simrobot.md#private-_fixturespecs)
* [_mesh](simrobot.md#protected-_mesh)
* [_type](simrobot.md#protected-_type)

### Accessors

* [body](simrobot.md#body)
* [children](simrobot.md#children)
* [guid](simrobot.md#guid)
* [mesh](simrobot.md#mesh)
* [type](simrobot.md#type)

### Methods

* [addChild](simrobot.md#protected-addchild)
* [configureFixtureLinks](simrobot.md#configurefixturelinks)
* [getBodySpecs](simrobot.md#getbodyspecs)
* [getFixtureDef](simrobot.md#getfixturedef)
* [removeChild](simrobot.md#protected-removechild)
* [setBody](simrobot.md#setbody)
* [setMotorPower](simrobot.md#setmotorpower)
* [update](simrobot.md#update)

## Constructors

###  constructor

\+ **new SimRobot**(`spec`: [IRobotSpec](../interfaces/irobotspec.md)): *[SimRobot](simrobot.md)*

*Overrides [SimObject](simobject.md).[constructor](simobject.md#constructor)*

*Defined in [engine/objects/robot/SimRobot.ts:20](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/objects/robot/SimRobot.ts#L20)*

**Parameters:**

Name | Type |
------ | ------ |
`spec` | [IRobotSpec](../interfaces/irobotspec.md) |

**Returns:** *[SimRobot](simrobot.md)*

## Properties

### `Protected` _body

• **_body**: *Body*

*Inherited from [SimObject](simobject.md).[_body](simobject.md#protected-_body)*

*Defined in [engine/objects/SimObject.ts:11](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/objects/SimObject.ts#L11)*

___

### `Private` _bodySpecs

• **_bodySpecs**: *BodyDef*

*Defined in [engine/objects/robot/SimRobot.ts:17](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/objects/robot/SimRobot.ts#L17)*

___

### `Protected` _children

• **_children**: *[SimObject](simobject.md)[]* = []

*Inherited from [SimObject](simobject.md).[_children](simobject.md#protected-_children)*

*Defined in [engine/objects/SimObject.ts:12](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/objects/SimObject.ts#L12)*

___

### `Private` _drivetrain

• **_drivetrain**: *[SimRobotDrivetrain](simrobotdrivetrain.md)*

*Defined in [engine/objects/robot/SimRobot.ts:20](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/objects/robot/SimRobot.ts#L20)*

___

### `Private` _fixtureSpecs

• **_fixtureSpecs**: *FixtureDef*

*Defined in [engine/objects/robot/SimRobot.ts:18](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/objects/robot/SimRobot.ts#L18)*

___

### `Protected` _mesh

• **_mesh**: *Mesh*

*Inherited from [SimObject](simobject.md).[_mesh](simobject.md#protected-_mesh)*

*Defined in [engine/objects/SimObject.ts:10](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/objects/SimObject.ts#L10)*

___

### `Protected` _type

• **_type**: *string* = "SimObject"

*Inherited from [SimObject](simobject.md).[_type](simobject.md#protected-_type)*

*Defined in [engine/objects/SimObject.ts:14](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/objects/SimObject.ts#L14)*

## Accessors

###  body

• **get body**(): *Body*

*Inherited from [SimObject](simobject.md).[body](simobject.md#body)*

*Defined in [engine/objects/SimObject.ts:35](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/objects/SimObject.ts#L35)*

**Returns:** *Body*

___

###  children

• **get children**(): *[SimObject](simobject.md)[]*

*Inherited from [SimObject](simobject.md).[children](simobject.md#children)*

*Defined in [engine/objects/SimObject.ts:39](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/objects/SimObject.ts#L39)*

**Returns:** *[SimObject](simobject.md)[]*

___

###  guid

• **get guid**(): *string*

*Inherited from [SimObject](simobject.md).[guid](simobject.md#guid)*

*Defined in [engine/objects/SimObject.ts:27](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/objects/SimObject.ts#L27)*

**Returns:** *string*

___

###  mesh

• **get mesh**(): *Mesh*

*Inherited from [SimObject](simobject.md).[mesh](simobject.md#mesh)*

*Defined in [engine/objects/SimObject.ts:31](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/objects/SimObject.ts#L31)*

**Returns:** *Mesh*

___

###  type

• **get type**(): *string*

*Inherited from [SimObject](simobject.md).[type](simobject.md#type)*

*Defined in [engine/objects/SimObject.ts:23](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/objects/SimObject.ts#L23)*

**Returns:** *string*

## Methods

### `Protected` addChild

▸ **addChild**(`child`: [SimObject](simobject.md)): *void*

*Inherited from [SimObject](simobject.md).[addChild](simobject.md#protected-addchild)*

*Defined in [engine/objects/SimObject.ts:43](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/objects/SimObject.ts#L43)*

**Parameters:**

Name | Type |
------ | ------ |
`child` | [SimObject](simobject.md) |

**Returns:** *void*

___

###  configureFixtureLinks

▸ **configureFixtureLinks**(`world`: World): *void*

*Defined in [engine/objects/robot/SimRobot.ts:88](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/objects/robot/SimRobot.ts#L88)*

**Parameters:**

Name | Type |
------ | ------ |
`world` | World |

**Returns:** *void*

___

###  getBodySpecs

▸ **getBodySpecs**(): *BodyDef*

*Overrides [SimObject](simobject.md).[getBodySpecs](simobject.md#abstract-getbodyspecs)*

*Defined in [engine/objects/robot/SimRobot.ts:111](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/objects/robot/SimRobot.ts#L111)*

**Returns:** *BodyDef*

___

###  getFixtureDef

▸ **getFixtureDef**(): *FixtureDef*

*Overrides [SimObject](simobject.md).[getFixtureDef](simobject.md#abstract-getfixturedef)*

*Defined in [engine/objects/robot/SimRobot.ts:115](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/objects/robot/SimRobot.ts#L115)*

**Returns:** *FixtureDef*

___

### `Protected` removeChild

▸ **removeChild**(`child`: [SimObject](simobject.md) | string): *void*

*Inherited from [SimObject](simobject.md).[removeChild](simobject.md#protected-removechild)*

*Defined in [engine/objects/SimObject.ts:47](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/objects/SimObject.ts#L47)*

**Parameters:**

Name | Type |
------ | ------ |
`child` | [SimObject](simobject.md) &#124; string |

**Returns:** *void*

___

###  setBody

▸ **setBody**(`body`: Body): *void*

*Inherited from [SimObject](simobject.md).[setBody](simobject.md#setbody)*

*Defined in [engine/objects/SimObject.ts:61](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/objects/SimObject.ts#L61)*

**Parameters:**

Name | Type |
------ | ------ |
`body` | Body |

**Returns:** *void*

___

###  setMotorPower

▸ **setMotorPower**(`channel`: number, `value`: number): *void*

*Defined in [engine/objects/robot/SimRobot.ts:107](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/objects/robot/SimRobot.ts#L107)*

**Parameters:**

Name | Type |
------ | ------ |
`channel` | number |
`value` | number |

**Returns:** *void*

___

###  update

▸ **update**(`ms`: number): *void*

*Overrides [SimObject](simobject.md).[update](simobject.md#abstract-update)*

*Defined in [engine/objects/robot/SimRobot.ts:72](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/objects/robot/SimRobot.ts#L72)*

**Parameters:**

Name | Type |
------ | ------ |
`ms` | number |

**Returns:** *void*
