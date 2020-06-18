[@fruk/simulator-core](../README.md) › [Globals](../globals.md) › [SimCylinder](simcylinder.md)

# Class: SimCylinder

## Hierarchy

* [SimObject](simobject.md)

  ↳ **SimCylinder**

## Index

### Constructors

* [constructor](simcylinder.md#constructor)

### Properties

* [_body](simcylinder.md#protected-_body)
* [_children](simcylinder.md#protected-_children)
* [_mesh](simcylinder.md#protected-_mesh)
* [_type](simcylinder.md#protected-_type)
* [bodySpecs](simcylinder.md#private-bodyspecs)
* [fixtureSpecs](simcylinder.md#private-fixturespecs)

### Accessors

* [body](simcylinder.md#body)
* [children](simcylinder.md#children)
* [guid](simcylinder.md#guid)
* [mesh](simcylinder.md#mesh)
* [type](simcylinder.md#type)

### Methods

* [addChild](simcylinder.md#protected-addchild)
* [getBodySpecs](simcylinder.md#getbodyspecs)
* [getFixtureDef](simcylinder.md#getfixturedef)
* [removeChild](simcylinder.md#protected-removechild)
* [setBaseColor](simcylinder.md#setbasecolor)
* [setBody](simcylinder.md#setbody)
* [update](simcylinder.md#update)

## Constructors

###  constructor

\+ **new SimCylinder**(`spec`: [ICylinderSpec](../interfaces/icylinderspec.md)): *[SimCylinder](simcylinder.md)*

*Overrides [SimObject](simobject.md).[constructor](simobject.md#constructor)*

*Defined in [engine/objects/SimCylinder.ts:21](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/objects/SimCylinder.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`spec` | [ICylinderSpec](../interfaces/icylinderspec.md) |

**Returns:** *[SimCylinder](simcylinder.md)*

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

*Defined in [engine/objects/SimCylinder.ts:20](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/objects/SimCylinder.ts#L20)*

___

### `Private` fixtureSpecs

• **fixtureSpecs**: *FixtureDef*

*Defined in [engine/objects/SimCylinder.ts:21](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/objects/SimCylinder.ts#L21)*

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

*Defined in [engine/objects/SimCylinder.ts:83](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/objects/SimCylinder.ts#L83)*

**Returns:** *BodyDef*

___

###  getFixtureDef

▸ **getFixtureDef**(): *FixtureDef*

*Overrides [SimObject](simobject.md).[getFixtureDef](simobject.md#abstract-getfixturedef)*

*Defined in [engine/objects/SimCylinder.ts:87](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/objects/SimCylinder.ts#L87)*

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

*Defined in [engine/objects/SimCylinder.ts:79](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/objects/SimCylinder.ts#L79)*

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

*Defined in [engine/objects/SimCylinder.ts:71](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/objects/SimCylinder.ts#L71)*

**Parameters:**

Name | Type |
------ | ------ |
`ms` | number |

**Returns:** *void*
