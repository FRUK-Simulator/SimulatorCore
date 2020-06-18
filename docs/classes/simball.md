[@fruk/simulator-core](../README.md) › [Globals](../globals.md) › [SimBall](simball.md)

# Class: SimBall

## Hierarchy

* [SimObject](simobject.md)

  ↳ **SimBall**

## Index

### Constructors

* [constructor](simball.md#constructor)

### Properties

* [_body](simball.md#protected-_body)
* [_children](simball.md#protected-_children)
* [_mesh](simball.md#protected-_mesh)
* [_type](simball.md#protected-_type)
* [bodySpecs](simball.md#private-bodyspecs)
* [fixtureSpecs](simball.md#private-fixturespecs)

### Accessors

* [body](simball.md#body)
* [children](simball.md#children)
* [guid](simball.md#guid)
* [mesh](simball.md#mesh)
* [type](simball.md#type)

### Methods

* [addChild](simball.md#protected-addchild)
* [getBodySpecs](simball.md#getbodyspecs)
* [getFixtureDef](simball.md#getfixturedef)
* [removeChild](simball.md#protected-removechild)
* [setBaseColor](simball.md#setbasecolor)
* [setBody](simball.md#setbody)
* [update](simball.md#update)

## Constructors

###  constructor

\+ **new SimBall**(`spec`: [IBallSpec](../interfaces/iballspec.md)): *[SimBall](simball.md)*

*Overrides [SimObject](simobject.md).[constructor](simobject.md#constructor)*

*Defined in [engine/objects/SimBall.ts:21](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/objects/SimBall.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`spec` | [IBallSpec](../interfaces/iballspec.md) |

**Returns:** *[SimBall](simball.md)*

## Properties

### `Protected` _body

• **_body**: *Body*

*Inherited from [SimObject](simobject.md).[_body](simobject.md#protected-_body)*

*Defined in [engine/objects/SimObject.ts:11](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/objects/SimObject.ts#L11)*

___

### `Protected` _children

• **_children**: *[SimObject](simobject.md)[]* = []

*Inherited from [SimObject](simobject.md).[_children](simobject.md#protected-_children)*

*Defined in [engine/objects/SimObject.ts:12](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/objects/SimObject.ts#L12)*

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

___

### `Private` bodySpecs

• **bodySpecs**: *BodyDef*

*Defined in [engine/objects/SimBall.ts:20](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/objects/SimBall.ts#L20)*

___

### `Private` fixtureSpecs

• **fixtureSpecs**: *FixtureDef*

*Defined in [engine/objects/SimBall.ts:21](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/objects/SimBall.ts#L21)*

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

###  getBodySpecs

▸ **getBodySpecs**(): *BodyDef*

*Overrides [SimObject](simobject.md).[getBodySpecs](simobject.md#abstract-getbodyspecs)*

*Defined in [engine/objects/SimBall.ts:79](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/objects/SimBall.ts#L79)*

**Returns:** *BodyDef*

___

###  getFixtureDef

▸ **getFixtureDef**(): *FixtureDef*

*Overrides [SimObject](simobject.md).[getFixtureDef](simobject.md#abstract-getfixturedef)*

*Defined in [engine/objects/SimBall.ts:83](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/objects/SimBall.ts#L83)*

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

###  setBaseColor

▸ **setBaseColor**(`color`: number): *void*

*Defined in [engine/objects/SimBall.ts:75](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/objects/SimBall.ts#L75)*

**Parameters:**

Name | Type |
------ | ------ |
`color` | number |

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

###  update

▸ **update**(`ms`: number): *void*

*Overrides [SimObject](simobject.md).[update](simobject.md#abstract-update)*

*Defined in [engine/objects/SimBall.ts:67](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/objects/SimBall.ts#L67)*

**Parameters:**

Name | Type |
------ | ------ |
`ms` | number |

**Returns:** *void*
