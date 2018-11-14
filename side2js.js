/* Parse Selenium side script and translate to (node) JS. */

const selianize = require('selianize').default;
const path = require('path');
const fs = require('fs');
const beautify = require('js-beautify').js;

