[@fruk/simulator-core](../README.md) › [Globals](../globals.md) › [IContactSensorSpec](icontactsensorspec.md)

# Interface: IContactSensorSpec

Spec for a Contact sensor (e.g. touch sensor, tact switch, bumper switch)

## Hierarchy

* [IBasicSensorSpec](ibasicsensorspec.md)

  ↳ **IContactSensorSpec**

## Index

### Properties

* [channel](icontactsensorspec.md#channel)
* [mountFace](icontactsensorspec.md#mountface)
* [mountOffset](icontactsensorspec.md#optional-mountoffset)
* [range](icontactsensorspec.md#range)
* [render](icontactsensorspec.md#optional-render)
* [type](icontactsensorspec.md#type)
* [width](icontactsensorspec.md#width)

## Properties

###  channel

• **channel**: *number*

*Inherited from [IBasicSensorSpec](ibasicsensorspec.md).[channel](ibasicsensorspec.md#channel)*

*Defined in [engine/specs/RobotSpecs.ts:130](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/specs/RobotSpecs.ts#L130)*

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

###  range

• **range**: *number*

*Defined in [engine/specs/RobotSpecs.ts:142](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/specs/RobotSpecs.ts#L142)*

___

### `Optional` render

• **render**? : *boolean*

*Inherited from [IBasicSensorSpec](ibasicsensorspec.md).[render](ibasicsensorspec.md#optional-render)*

*Defined in [engine/specs/RobotSpecs.ts:133](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/specs/RobotSpecs.ts#L133)*

___

###  type

• **type**: *"contact-sensor"*

*Overrides [IBasicSensorSpec](ibasicsensorspec.md).[type](ibasicsensorspec.md#type)*

*Defined in [engine/specs/RobotSpecs.ts:140](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/specs/RobotSpecs.ts#L140)*

___

###  width

• **width**: *number*

*Defined in [engine/specs/RobotSpecs.ts:141](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/specs/RobotSpecs.ts#L141)*
