[@fruk/simulator-core](../README.md) › [Globals](../globals.md) › [Sim3D](sim3d.md)

# Class: Sim3D

## Hierarchy

* **Sim3D**

## Index

### Constructors

* [constructor](sim3d.md#constructor)

### Properties

* [camera](sim3d.md#private-camera)
* [cameraControls](sim3d.md#private-cameracontrols)
* [canvas](sim3d.md#private-canvas)
* [config](sim3d.md#private-config)
* [eventRegistry](sim3d.md#private-eventregistry)
* [isRendering](sim3d.md#private-isrendering)
* [lastAnimateTime](sim3d.md#private-lastanimatetime)
* [objectFactories](sim3d.md#private-objectfactories)
* [renderer](sim3d.md#private-renderer)
* [scene](sim3d.md#private-scene)
* [simObjects](sim3d.md#private-simobjects)
* [world](sim3d.md#private-world)

### Methods

* [addBall](sim3d.md#addball)
* [addBox](sim3d.md#addbox)
* [addCone](sim3d.md#addcone)
* [addCylinder](sim3d.md#addcylinder)
* [addGameObject](sim3d.md#private-addgameobject)
* [addPyramid](sim3d.md#addpyramid)
* [addRobot](sim3d.md#addrobot)
* [addToScene](sim3d.md#private-addtoscene)
* [addWall](sim3d.md#addwall)
* [beginRendering](sim3d.md#beginrendering)
* [configureWorld](sim3d.md#configureworld)
* [getSimObject](sim3d.md#getsimobject)
* [onresize](sim3d.md#onresize)
* [render](sim3d.md#render)
* [resetScene](sim3d.md#private-resetscene)
* [stopRendering](sim3d.md#stoprendering)
* [updatePhysics](sim3d.md#updatephysics)

## Constructors

###  constructor

\+ **new Sim3D**(`canvas`: HTMLCanvasElement, `config?`: [SimulatorConfig](../interfaces/simulatorconfig.md)): *[Sim3D](sim3d.md)*

*Defined in [engine/Sim3D.ts:70](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/Sim3D.ts#L70)*

**Parameters:**

Name | Type |
------ | ------ |
`canvas` | HTMLCanvasElement |
`config?` | [SimulatorConfig](../interfaces/simulatorconfig.md) |

**Returns:** *[Sim3D](sim3d.md)*

## Properties

### `Private` camera

• **camera**: *PerspectiveCamera*

*Defined in [engine/Sim3D.ts:54](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/Sim3D.ts#L54)*

___

### `Private` cameraControls

• **cameraControls**: *OrbitControls*

*Defined in [engine/Sim3D.ts:55](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/Sim3D.ts#L55)*

___

### `Private` canvas

• **canvas**: *HTMLCanvasElement*

*Defined in [engine/Sim3D.ts:72](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/Sim3D.ts#L72)*

___

### `Private` config

• **config**: *[SimulatorConfig](../interfaces/simulatorconfig.md)*

*Defined in [engine/Sim3D.ts:59](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/Sim3D.ts#L59)*

___

### `Private` eventRegistry

• **eventRegistry**: *[EventRegistry](eventregistry.md)*

*Defined in [engine/Sim3D.ts:70](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/Sim3D.ts#L70)*

___

### `Private` isRendering

• **isRendering**: *boolean* = false

*Defined in [engine/Sim3D.ts:57](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/Sim3D.ts#L57)*

___

### `Private` lastAnimateTime

• **lastAnimateTime**: *number* = 0

*Defined in [engine/Sim3D.ts:67](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/Sim3D.ts#L67)*

___

### `Private` objectFactories

• **objectFactories**: *[ObjectFactories](objectfactories.md)*

*Defined in [engine/Sim3D.ts:62](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/Sim3D.ts#L62)*

___

### `Private` renderer

• **renderer**: *Renderer*

*Defined in [engine/Sim3D.ts:52](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/Sim3D.ts#L52)*

___

### `Private` scene

• **scene**: *Scene*

*Defined in [engine/Sim3D.ts:51](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/Sim3D.ts#L51)*

___

### `Private` simObjects

• **simObjects**: *Map‹string, [ISimObjectContainer](../interfaces/isimobjectcontainer.md)›*

*Defined in [engine/Sim3D.ts:61](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/Sim3D.ts#L61)*

___

### `Private` world

• **world**: *World*

*Defined in [engine/Sim3D.ts:65](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/Sim3D.ts#L65)*

## Methods

###  addBall

▸ **addBall**(`spec`: [IBallSpec](../interfaces/iballspec.md)): *[BallHandle](ballhandle.md) | undefined*

*Defined in [engine/Sim3D.ts:289](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/Sim3D.ts#L289)*

**Parameters:**

Name | Type |
------ | ------ |
`spec` | [IBallSpec](../interfaces/iballspec.md) |

**Returns:** *[BallHandle](ballhandle.md) | undefined*

___

###  addBox

▸ **addBox**(`spec`: [IBoxSpec](../interfaces/iboxspec.md)): *[BoxHandle](boxhandle.md) | undefined*

*Defined in [engine/Sim3D.ts:293](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/Sim3D.ts#L293)*

**Parameters:**

Name | Type |
------ | ------ |
`spec` | [IBoxSpec](../interfaces/iboxspec.md) |

**Returns:** *[BoxHandle](boxhandle.md) | undefined*

___

###  addCone

▸ **addCone**(`spec`: [IConeSpec](../interfaces/iconespec.md)): *[ConeHandle](conehandle.md) | undefined*

*Defined in [engine/Sim3D.ts:305](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/Sim3D.ts#L305)*

**Parameters:**

Name | Type |
------ | ------ |
`spec` | [IConeSpec](../interfaces/iconespec.md) |

**Returns:** *[ConeHandle](conehandle.md) | undefined*

___

###  addCylinder

▸ **addCylinder**(`spec`: [ICylinderSpec](../interfaces/icylinderspec.md)): *[CylinderHandle](cylinderhandle.md) | undefined*

*Defined in [engine/Sim3D.ts:309](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/Sim3D.ts#L309)*

**Parameters:**

Name | Type |
------ | ------ |
`spec` | [ICylinderSpec](../interfaces/icylinderspec.md) |

**Returns:** *[CylinderHandle](cylinderhandle.md) | undefined*

___

### `Private` addGameObject

▸ **addGameObject**‹**T1**›(`spec`: [SimObjectSpec](../globals.md#simobjectspec), `typeT`: object): *T1 | undefined*

*Defined in [engine/Sim3D.ts:253](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/Sim3D.ts#L253)*

**Type parameters:**

▪ **T1**

**Parameters:**

▪ **spec**: *[SimObjectSpec](../globals.md#simobjectspec)*

▪ **typeT**: *object*

Name | Type |
------ | ------ |
`constructor` |  |

**Returns:** *T1 | undefined*

___

###  addPyramid

▸ **addPyramid**(`spec`: [IPyramidSpec](../interfaces/ipyramidspec.md)): *[PyramidHandle](pyramidhandle.md) | undefined*

*Defined in [engine/Sim3D.ts:301](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/Sim3D.ts#L301)*

**Parameters:**

Name | Type |
------ | ------ |
`spec` | [IPyramidSpec](../interfaces/ipyramidspec.md) |

**Returns:** *[PyramidHandle](pyramidhandle.md) | undefined*

___

###  addRobot

▸ **addRobot**(`spec`: [IRobotSpec](../interfaces/irobotspec.md)): *[RobotHandle](robothandle.md) | undefined*

*Defined in [engine/Sim3D.ts:323](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/Sim3D.ts#L323)*

**Parameters:**

Name | Type |
------ | ------ |
`spec` | [IRobotSpec](../interfaces/irobotspec.md) |

**Returns:** *[RobotHandle](robothandle.md) | undefined*

___

### `Private` addToScene

▸ **addToScene**(`simObject`: [SimObject](simobject.md)): *void*

*Defined in [engine/Sim3D.ts:316](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/Sim3D.ts#L316)*

Add this object (and any children) to the scene

**Parameters:**

Name | Type |
------ | ------ |
`simObject` | [SimObject](simobject.md) |

**Returns:** *void*

___

###  addWall

▸ **addWall**(`spec`: [IWallSpec](../interfaces/iwallspec.md)): *[WallHandle](wallhandle.md) | undefined*

*Defined in [engine/Sim3D.ts:297](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/Sim3D.ts#L297)*

**Parameters:**

Name | Type |
------ | ------ |
`spec` | [IWallSpec](../interfaces/iwallspec.md) |

**Returns:** *[WallHandle](wallhandle.md) | undefined*

___

###  beginRendering

▸ **beginRendering**(): *void*

*Defined in [engine/Sim3D.ts:215](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/Sim3D.ts#L215)*

**Returns:** *void*

___

###  configureWorld

▸ **configureWorld**(`worldConfig`: [WorldConfig](../interfaces/worldconfig.md)): *void*

*Defined in [engine/Sim3D.ts:149](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/Sim3D.ts#L149)*

Configure the world

This essentially means reset the simulator environment, and add the playing field (and walls if necessary)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`worldConfig` | [WorldConfig](../interfaces/worldconfig.md) | Configuration for the world  |

**Returns:** *void*

___

###  getSimObject

▸ **getSimObject**(`ref`: [ISimObjectRef](../interfaces/isimobjectref.md)): *[SimObject](simobject.md) | undefined*

*Defined in [engine/Sim3D.ts:240](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/Sim3D.ts#L240)*

**Parameters:**

Name | Type |
------ | ------ |
`ref` | [ISimObjectRef](../interfaces/isimobjectref.md) |

**Returns:** *[SimObject](simobject.md) | undefined*

___

###  onresize

▸ **onresize**(): *void*

*Defined in [engine/Sim3D.ts:196](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/Sim3D.ts#L196)*

**Returns:** *void*

___

###  render

▸ **render**(): *void*

*Defined in [engine/Sim3D.ts:202](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/Sim3D.ts#L202)*

**Returns:** *void*

___

### `Private` resetScene

▸ **resetScene**(`config`: [WorldConfig](../interfaces/worldconfig.md)): *void*

*Defined in [engine/Sim3D.ts:112](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/Sim3D.ts#L112)*

**Parameters:**

Name | Type |
------ | ------ |
`config` | [WorldConfig](../interfaces/worldconfig.md) |

**Returns:** *void*

___

###  stopRendering

▸ **stopRendering**(): *void*

*Defined in [engine/Sim3D.ts:235](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/Sim3D.ts#L235)*

**Returns:** *void*

___

###  updatePhysics

▸ **updatePhysics**(`time`: number): *void*

*Defined in [engine/Sim3D.ts:207](https://github.com/FRUK-Simulator/SimulatorCore/blob/cdc4cfb/src/engine/Sim3D.ts#L207)*

**Parameters:**

Name | Type |
------ | ------ |
`time` | number |

**Returns:** *void*
