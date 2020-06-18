[@fruk/simulator-core](../README.md) › [Globals](../globals.md) › [SimMotor](simmotor.md)

# Class: SimMotor

Class representing a single controllable motor

Takes an input signal and generates a force

## Hierarchy

* **SimMotor**

## Index

### Constructors

* [constructor](simmotor.md#constructor)

### Properties

* [_inputSignal](simmotor.md#private-_inputsignal)
* [_maxForce](simmotor.md#private-_maxforce)

### Accessors

* [inputSignal](simmotor.md#inputsignal)
* [outputForce](simmotor.md#outputforce)

## Constructors

###  constructor

\+ **new SimMotor**(`spec`: [IMotorSpec](../interfaces/imotorspec.md)): *[SimMotor](simmotor.md)*

*Defined in [engine/objects/robot/SimMotor.ts:11](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/objects/robot/SimMotor.ts#L11)*

**Parameters:**

Name | Type |
------ | ------ |
`spec` | [IMotorSpec](../interfaces/imotorspec.md) |

**Returns:** *[SimMotor](simmotor.md)*

## Properties

### `Private` _inputSignal

• **_inputSignal**: *number*

*Defined in [engine/objects/robot/SimMotor.ts:11](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/objects/robot/SimMotor.ts#L11)*

___

### `Private` _maxForce

• **_maxForce**: *number*

*Defined in [engine/objects/robot/SimMotor.ts:10](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/objects/robot/SimMotor.ts#L10)*

## Accessors

###  inputSignal

• **get inputSignal**(): *number*

*Defined in [engine/objects/robot/SimMotor.ts:29](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/objects/robot/SimMotor.ts#L29)*

Get the current input signal

**Returns:** *number*

• **set inputSignal**(`val`: number): *void*

*Defined in [engine/objects/robot/SimMotor.ts:33](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/objects/robot/SimMotor.ts#L33)*

Get the current input signal

**Parameters:**

Name | Type |
------ | ------ |
`val` | number |

**Returns:** *void*

___

###  outputForce

• **get outputForce**(): *number*

*Defined in [engine/objects/robot/SimMotor.ts:22](https://github.com/zhiquanyeo/SimulatorCore/blob/f1bf202/src/engine/objects/robot/SimMotor.ts#L22)*

Get the currently generated force given current input signal

**Returns:** *number*
