/**
 * This module contains all the logic for render order
 *
 * this means different modules can avoid clashes.
 */

const starting_render_order = -100;
let next_render_order = starting_render_order;

function allocate_render_order(): number {
  const render_order = next_render_order;
  next_render_order += 1;
  return render_order;
}

export const floor_render_order = allocate_render_order();
export const grid_render_order = allocate_render_order();
export const axies_render_order = allocate_render_order();
export const starting_zone_render_order = allocate_render_order();

/**
 * This variable tracks the next, yet to be created zone's render order.
 *
 * zones are drawn over the top of previously drawn zones, so each needs to be
 * rendered with a greater render order.
 *
 */
export function get_next_zone_render_order(): number {
  return allocate_render_order();
}

export function clear_next_zone_render_order(): void {
  next_render_order = starting_zone_render_order;
}
