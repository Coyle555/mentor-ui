/**
 * PolyFills make me sad
 */
const events = {};

events.DOM_VK_BACK_SPACE = events.DOM_VK_BACK_SPACE || 8;
events.DOM_VK_TAB = events.DOM_VK_TAB || 9;
events.DOM_VK_RETURN = events.DOM_VK_RETURN || 13;
events.DOM_VK_ENTER = events.DOM_VK_ENTER || 14;
events.DOM_VK_ESCAPE = events.DOM_VK_ESCAPE || 27;

events.DOM_VK_SPACE = events.DOM_VK_SPACE || 32;
events.DOM_VK_PAGEUP = events.DOM_VK_PAGEUP || 33;
events.DOM_VK_PAGEDOWN = events.DOM_VK_PAGEDOWN || 34;
events.DOM_VK_END = events.DOM_VK_END || 35;
events.DOM_VK_HOME = events.DOM_VK_HOME || 36;
events.DOM_VK_LEFT = events.DOM_VK_LEFT || 37;
events.DOM_VK_UP = events.DOM_VK_UP || 38;
events.DOM_VK_RIGHT = events.DOM_VK_RIGHT || 39;
events.DOM_VK_DOWN = events.DOM_VK_DOWN || 40;

export const KeyEvent = events;
