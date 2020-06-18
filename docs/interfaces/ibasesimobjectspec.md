[@fruk/simulator-core](../README.md) › [Globals](../globals.md) › [IBaseSimObjectSpec](ibasesimobjectspec.md)

# Interface: IBaseSimObjectSpec

Base object spec

This interface is used to specify the basics of any SimObject
Most properties are optional except for `type`, which will be
defined by each subclassing spec

## Hierarchy

* **IBaseSimObjectSpec**

  ↳ [IBallSpec](iballspec.md)

  ↳ [IBoxSpec](iboxspec.md)

  ↳ [IConeSpec](iconespec.md)

  ↳ [IPyramidSpec](ipyramidspec.md)

  ↳ [ICylinderSpec](icylinderspec.md)

  ↳ [IWallSpec](iwallspec.md)

  ↳ [IRobotWheelSpec](irobotwheelspec.md)

  ↳ [IRobotSpec](irobotspec.md)

## Index

### Properties

* [baseColor](ibasesimobjectspec.md#optional-basecolor)
* [initialPosition](ibasesimobjectspec.md#optional-initialposition)
* [isStatic](ibasesimobjectspec.md#optional-isstatic)
* [physicsProperties](ibasesimobjectspec.md#optional-physicsproperties)
* [type](ibasesimobjectspec.md#type)

## Properties

### `Optional` baseColor

• **baseColor**? : *number*

*Defined in [engine/specs/CoreSpecs.ts:36](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/specs/CoreSpecs.ts#L36)*

___

### `Optional` initialPosition

• **initialPosition**? : *[Vector2d](../globals.md#vector2d)*

*Defined in [engine/specs/CoreSpecs.ts:34](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/specs/CoreSpecs.ts#L34)*

___

### `Optional` isStatic

• **isStatic**? : *boolean*

*Defined in [engine/specs/CoreSpecs.ts:33](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/specs/CoreSpecs.ts#L33)*

___

### `Optional` physicsProperties

• **physicsProperties**? : *[IPhysicsProperties](iphysicsproperties.md)*

*Defined in [engine/specs/CoreSpecs.ts:35](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/specs/CoreSpecs.ts#L35)*

___

###  type

• **type**: *string*

*Defined in [engine/specs/CoreSpecs.ts:32](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/specs/CoreSpecs.ts#L32)*
