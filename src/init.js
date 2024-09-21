import {menuStyles} from './menu/createMenu';
import {battleMonitoring} from './monitoring/battleMonitoring';
import {handleMenuOpen} from './menu/createMenu';
import {applyActions} from './actions/applyActions';

export const init = () => {menuStyles(); battleMonitoring(); window.addEventListener('keydown', handleMenuOpen, true); window.addEventListener('keydown', (event) => {applyActions(root, event);});}; init();