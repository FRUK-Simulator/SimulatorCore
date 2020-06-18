[@fruk/simulator-core](../README.md) › [Globals](../globals.md) › [ObjectFactories](objectfactories.md)

# Class: ObjectFactories

## Hierarchy

* **ObjectFactories**

## Index

### Constructors

* [constructor](objectfactories.md#constructor)

### Properties

* [_factories](objectfactories.md#private-_factories)
* [_scene](objectfactories.md#private-_scene)
* [_world](objectfactories.md#private-_world)

### Methods

* [makeObject](objectfactories.md#makeobject)
* [registerFactory](objectfactories.md#private-registerfactory)

## Constructors

###  constructor

\+ **new ObjectFactories**(`scene`: Scene, `world`: World): *[ObjectFactories](objectfactories.md)*

*Defined in [engine/objects/ObjectFactories.ts:15](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/objects/ObjectFactories.ts#L15)*

**Parameters:**

Name | Type |
------ | ------ |
`scene` | Scene |
`world` | World |

**Returns:** *[ObjectFactories](objectfactories.md)*

## Properties

### `Private` _factories

• **_factories**: *Map‹string, function›*

*Defined in [engine/objects/ObjectFactories.ts:13](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/objects/ObjectFactories.ts#L13)*

___

### `Private` _scene

• **_scene**: *Scene*

*Defined in [engine/objects/ObjectFactories.ts:14](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/objects/ObjectFactories.ts#L14)*

___

### `Private` _world

• **_world**: *World*

*Defined in [engine/objects/ObjectFactories.ts:15](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/objects/ObjectFactories.ts#L15)*

## Methods

###  makeObject

▸ **makeObject**(`spec`: [SimObjectSpec](../globals.md#simobjectspec)): *[SimObject](simobject.md) | undefined*

*Defined in [engine/objects/ObjectFactories.ts:40](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/objects/ObjectFactories.ts#L40)*

**Parameters:**

Name | Type |
------ | ------ |
`spec` | [SimObjectSpec](../globals.md#simobjectspec) |

**Returns:** *[SimObject](simobject.md) | undefined*

___

### `Private` registerFactory

▸ **registerFactory**(`type`: string, `factoryFunc`: function): *void*

*Defined in [engine/objects/ObjectFactories.ts:33](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/objects/ObjectFactories.ts#L33)*

**Parameters:**

▪ **type**: *string*

▪ **factoryFunc**: *function*

▸ (`spec`: [SimObjectSpec](../globals.md#simobjectspec)): *[SimObject](simobject.md)*

**Parameters:**

Name | Type |
------ | ------ |
`spec` | [SimObjectSpec](../globals.md#simobjectspec) |

**Returns:** *void*
