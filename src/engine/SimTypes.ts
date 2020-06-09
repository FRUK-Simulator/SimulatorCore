// NOTE: We could use THREE's Vec3 type, but specifying our own will make it
// Easier to switch engines if we need to
export type Vector3d = {
    x: number;
    y: number;
    z: number;
}

export type Extents3d = {
    xh: number;
    yh: number;
    zh: number;
};