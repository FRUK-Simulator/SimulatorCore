[@fruk/simulator-core](../README.md) › [Globals](../globals.md) › [ObjectHandle](objecthandle.md)

# Class: ObjectHandle ‹**T**›

## Type parameters

▪ **T**: *[SimObject](simobject.md)*

## Hierarchy

* **ObjectHandle**

  ↳ [BallHandle](ballhandle.md)

  ↳ [BoxHandle](boxhandle.md)

  ↳ [PyramidHandle](pyramidhandle.md)

  ↳ [ConeHandle](conehandle.md)

  ↳ [CylinderHandle](cylinderhandle.md)

  ↳ [WallHandle](wallhandle.md)

  ↳ [RobotHandle](robothandle.md)

## Index

### Constructors

* [constructor](objecthandle.md#constructor)

### Properties

* [_objectRef](objecthandle.md#protected-_objectref)
* [_rootObject](objecthandle.md#protected-_rootobject)

## Constructors

###  constructor

\+ **new ObjectHandle**(`ref`: [ISimObjectRef](../interfaces/isimobjectref.md), `rootObject`: T): *[ObjectHandle](objecthandle.md)*

*Defined in [engine/handles/ObjectHandle.ts:6](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/handles/ObjectHandle.ts#L6)*

**Parameters:**

Name | Type |
------ | ------ |
`ref` | [ISimObjectRef](../interfaces/isimobjectref.md) |
`rootObject` | T |

**Returns:** *[ObjectHandle](objecthandle.md)*

## Properties

### `Protected` _objectRef

• **_objectRef**: *[ISimObjectRef](../interfaces/isimobjectref.md)*

*Defined in [engine/handles/ObjectHandle.ts:6](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/handles/ObjectHandle.ts#L6)*

___

### `Protected` _rootObject

• **_rootObject**: *T*

*Defined in [engine/handles/ObjectHandle.ts:5](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/handles/ObjectHandle.ts#L5)*
