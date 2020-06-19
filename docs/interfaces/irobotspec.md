[@fruk/simulator-core](../README.md) › [Globals](../globals.md) › [IRobotSpec](irobotspec.md)

# Interface: IRobotSpec

Interface representing a specification for a robot, including
drivetrain (including wheels and motors), sensors, etc

## Hierarchy

* [IBaseSimObjectSpec](ibasesimobjectspec.md)

  ↳ **IRobotSpec**

## Index

### Properties

* [baseColor](irobotspec.md#optional-basecolor)
* [basicSensors](irobotspec.md#optional-basicsensors)
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

*Defined in [engine/specs/CoreSpecs.ts:36](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/specs/CoreSpecs.ts#L36)*

___

### `Optional` basicSensors

• **basicSensors**? : *[BasicSensorSpec](../globals.md#basicsensorspec)[]*

*Defined in [engine/specs/RobotSpecs.ts:84](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/specs/RobotSpecs.ts#L84)*

___

###  dimensions

• **dimensions**: *[Vector3d](../globals.md#vector3d)*

*Defined in [engine/specs/RobotSpecs.ts:82](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/specs/RobotSpecs.ts#L82)*

___

###  drivetrain

• **drivetrain**: *[IDrivetrainSpec](idrivetrainspec.md)*

*Defined in [engine/specs/RobotSpecs.ts:83](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/specs/RobotSpecs.ts#L83)*

___

### `Optional` initialPosition

• **initialPosition**? : *[Vector2d](../globals.md#vector2d)*

*Inherited from [IBaseSimObjectSpec](ibasesimobjectspec.md).[initialPosition](ibasesimobjectspec.md#optional-initialposition)*

*Defined in [engine/specs/CoreSpecs.ts:34](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/specs/CoreSpecs.ts#L34)*

___

### `Optional` isStatic

• **isStatic**? : *boolean*

*Inherited from [IBaseSimObjectSpec](ibasesimobjectspec.md).[isStatic](ibasesimobjectspec.md#optional-isstatic)*

*Defined in [engine/specs/CoreSpecs.ts:33](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/specs/CoreSpecs.ts#L33)*

___

### `Optional` physicsProperties

• **physicsProperties**? : *[IPhysicsProperties](iphysicsproperties.md)*

*Inherited from [IBaseSimObjectSpec](ibasesimobjectspec.md).[physicsProperties](ibasesimobjectspec.md#optional-physicsproperties)*

*Defined in [engine/specs/CoreSpecs.ts:35](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/specs/CoreSpecs.ts#L35)*

___

###  type

• **type**: *"robot"*

*Overrides [IBaseSimObjectSpec](ibasesimobjectspec.md).[type](ibasesimobjectspec.md#type)*

*Defined in [engine/specs/RobotSpecs.ts:81](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/specs/RobotSpecs.ts#L81)*
