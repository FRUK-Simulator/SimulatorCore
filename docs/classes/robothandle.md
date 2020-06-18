[@fruk/simulator-core](../README.md) › [Globals](../globals.md) › [RobotHandle](robothandle.md)

# Class: RobotHandle

## Hierarchy

* [ObjectHandle](objecthandle.md)‹[SimRobot](simrobot.md)›

  ↳ **RobotHandle**

## Index

### Constructors

* [constructor](robothandle.md#constructor)

### Properties

* [_objectRef](robothandle.md#protected-_objectref)
* [_rootObject](robothandle.md#protected-_rootobject)

### Methods

* [setMotorPower](robothandle.md#setmotorpower)

## Constructors

###  constructor

\+ **new RobotHandle**(`ref`: [ISimObjectRef](../interfaces/isimobjectref.md), `rootObject`: [SimRobot](simrobot.md)): *[RobotHandle](robothandle.md)*

*Inherited from [ObjectHandle](objecthandle.md).[constructor](objecthandle.md#constructor)*

*Defined in [engine/handles/ObjectHandle.ts:6](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/handles/ObjectHandle.ts#L6)*

**Parameters:**

Name | Type |
------ | ------ |
`ref` | [ISimObjectRef](../interfaces/isimobjectref.md) |
`rootObject` | [SimRobot](simrobot.md) |

**Returns:** *[RobotHandle](robothandle.md)*

## Properties

### `Protected` _objectRef

• **_objectRef**: *[ISimObjectRef](../interfaces/isimobjectref.md)*

*Inherited from [ObjectHandle](objecthandle.md).[_objectRef](objecthandle.md#protected-_objectref)*

*Defined in [engine/handles/ObjectHandle.ts:6](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/handles/ObjectHandle.ts#L6)*

___

### `Protected` _rootObject

• **_rootObject**: *[SimRobot](simrobot.md)*

*Inherited from [ObjectHandle](objecthandle.md).[_rootObject](objecthandle.md#protected-_rootobject)*

*Defined in [engine/handles/ObjectHandle.ts:5](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/handles/ObjectHandle.ts#L5)*

## Methods

###  setMotorPower

▸ **setMotorPower**(`channel`: number, `value`: number): *void*

*Defined in [engine/handles/RobotHandle.ts:5](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/handles/RobotHandle.ts#L5)*

**Parameters:**

Name | Type |
------ | ------ |
`channel` | number |
`value` | number |

**Returns:** *void*
