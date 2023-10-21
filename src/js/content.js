import { getParam, loadHeaderFooter } from './utils.mjs';

import ContentDetails from './ContentDetails.mjs';

const contentId = getParam('contentid');

const content = new ContentDetails(contentId);
content.init();

loadHeaderFooter();
