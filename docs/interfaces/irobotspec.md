[@fruk/simulator-core](../README.md) › [Globals](../globals.md) › [IRobotSpec](irobotspec.md)

# Interface: IRobotSpec

## Hierarchy

* [IBaseSimObjectSpec](ibasesimobjectspec.md)

  ↳ **IRobotSpec**

## Index

### Properties

* [baseColor](irobotspec.md#optional-basecolor)
* [dimensions](irobotspec.md#dimensions)
* [drivetrain](irobotspec.md#drivetrain)
* [initialPosition](irobotspec.md#optional-initialposition)
* [isStatic](irobotspec.md#optional-isstatic)
* [physicsProperties](irobotspec.md#optional-physicsproperties)
* [type](irobotspec.md#type)

## Properties

### `Optional` baseColor

• **baseColor**? : *number*

*Inherited from [IBaseSimObjectSpec](ibasesimobjectspec.md).[baseColor](ibasesimobjectspec.md#optional-basecolor)*

*Defined in [engine/specs/CoreSpecs.ts:36](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/specs/CoreSpecs.ts#L36)*

___

###  dimensions

• **dimensions**: *[Vector3d](../globals.md#vector3d)*

*Defined in [engine/specs/RobotSpecs.ts:71](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/specs/RobotSpecs.ts#L71)*

___

###  drivetrain

• **drivetrain**: *[IDrivetrainSpec](idrivetrainspec.md)*

*Defined in [engine/specs/RobotSpecs.ts:72](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/specs/RobotSpecs.ts#L72)*

___

### `Optional` initialPosition

• **initialPosition**? : *[Vector2d](../globals.md#vector2d)*

*Inherited from [IBaseSimObjectSpec](ibasesimobjectspec.md).[initialPosition](ibasesimobjectspec.md#optional-initialposition)*

*Defined in [engine/specs/CoreSpecs.ts:34](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/specs/CoreSpecs.ts#L34)*

___

### `Optional` isStatic

• **isStatic**? : *boolean*

*Inherited from [IBaseSimObjectSpec](ibasesimobjectspec.md).[isStatic](ibasesimobjectspec.md#optional-isstatic)*

*Defined in [engine/specs/CoreSpecs.ts:33](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/specs/CoreSpecs.ts#L33)*

___

### `Optional` physicsProperties

• **physicsProperties**? : *[IPhysicsProperties](iphysicsproperties.md)*

*Inherited from [IBaseSimObjectSpec](ibasesimobjectspec.md).[physicsProperties](ibasesimobjectspec.md#optional-physicsproperties)*

*Defined in [engine/specs/CoreSpecs.ts:35](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/specs/CoreSpecs.ts#L35)*

___

###  type

• **type**: *"robot"*

*Overrides [IBaseSimObjectSpec](ibasesimobjectspec.md).[type](ibasesimobjectspec.md#type)*

*Defined in [engine/specs/RobotSpecs.ts:70](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/specs/RobotSpecs.ts#L70)*
