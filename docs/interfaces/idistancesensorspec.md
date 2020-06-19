[@fruk/simulator-core](../README.md) › [Globals](../globals.md) › [IDistanceSensorSpec](idistancesensorspec.md)

# Interface: IDistanceSensorSpec

## Hierarchy

* [IBasicSensorSpec](ibasicsensorspec.md)

  ↳ **IDistanceSensorSpec**

## Index

### Properties

* [channel](idistancesensorspec.md#channel)
* [detectionAngle](idistancesensorspec.md#optional-detectionangle)
* [maxRange](idistancesensorspec.md#maxrange)
* [minRange](idistancesensorspec.md#optional-minrange)
* [mountFace](idistancesensorspec.md#mountface)
* [mountOffset](idistancesensorspec.md#optional-mountoffset)
* [render](idistancesensorspec.md#optional-render)
* [type](idistancesensorspec.md#type)

## Properties

###  channel

• **channel**: *number*

*Inherited from [IBasicSensorSpec](ibasicsensorspec.md).[channel](ibasicsensorspec.md#channel)*

*Defined in [engine/specs/RobotSpecs.ts:130](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/specs/RobotSpecs.ts#L130)*

___

### `Optional` detectionAngle

• **detectionAngle**? : *number*

*Defined in [engine/specs/RobotSpecs.ts:149](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/specs/RobotSpecs.ts#L149)*

___

###  maxRange

• **maxRange**: *number*

*Defined in [engine/specs/RobotSpecs.ts:148](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/specs/RobotSpecs.ts#L148)*

___

### `Optional` minRange

• **minRange**? : *number*

*Defined in [engine/specs/RobotSpecs.ts:147](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/specs/RobotSpecs.ts#L147)*

___

###  mountFace

• **mountFace**: *[SensorMountingFace](../enums/sensormountingface.md)*

*Inherited from [IBasicSensorSpec](ibasicsensorspec.md).[mountFace](ibasicsensorspec.md#mountface)*

*Defined in [engine/specs/RobotSpecs.ts:131](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/specs/RobotSpecs.ts#L131)*

___

### `Optional` mountOffset

• **mountOffset**? : *[Vector3d](../globals.md#vector3d)*

*Inherited from [IBasicSensorSpec](ibasicsensorspec.md).[mountOffset](ibasicsensorspec.md#optional-mountoffset)*

*Defined in [engine/specs/RobotSpecs.ts:132](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/specs/RobotSpecs.ts#L132)*

___

### `Optional` render

• **render**? : *boolean*

*Inherited from [IBasicSensorSpec](ibasicsensorspec.md).[render](ibasicsensorspec.md#optional-render)*

*Defined in [engine/specs/RobotSpecs.ts:133](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/specs/RobotSpecs.ts#L133)*

___

###  type

• **type**: *"distance-sensor"*

*Overrides [IBasicSensorSpec](ibasicsensorspec.md).[type](ibasicsensorspec.md#type)*

*Defined in [engine/specs/RobotSpecs.ts:146](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/specs/RobotSpecs.ts#L146)*
