/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/mystyles.scss":
/*!***************************!*\
  !*** ./src/mystyles.scss ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/sorttable.js":
/*!**************************!*\
  !*** ./src/sorttable.js ***!
  \**************************/
/***/ ((module) => {

/*
  SortTable
  version 2
  7th April 2007
  Stuart Langridge, http://www.kryogenix.org/code/browser/sorttable/

  Instructions:
  Download this file
  Add <script src="sorttable.js"></script> to your HTML
  Add class="sortable" to any table you'd like to make sortable
  Click on the headers to sort

  Thanks to many, many people for contributions and suggestions.
  Licenced as X11: http://www.kryogenix.org/code/browser/licence.html
  This basically means: do what you want with it.
*/


var stIsIE = /*@cc_on!@*/ false;

sorttable = {
    init: function() {
        // quit if this function has already been called
        if (arguments.callee.done) return;
        // flag this function so we don't do the same thing twice
        arguments.callee.done = true;
        // kill the timer
        if (_timer) clearInterval(_timer);

        if (!document.createElement || !document.getElementsByTagName) return;

        sorttable.DATE_RE = /^(\d\d?)[\/\.-](\d\d?)[\/\.-]((\d\d)?\d\d)$/;

        forEach(document.getElementsByTagName('table'), function(table) {
            if (table.className.search(/\bsortable\b/) != -1) {
                sorttable.makeSortable(table);
            }
        });

    },

    makeSortable: function(table) {
        if (table.getElementsByTagName('thead').length == 0) {
            // table doesn't have a tHead. Since it should have, create one and
            // put the first table row in it.
            the = document.createElement('thead');
            the.appendChild(table.rows[0]);
            table.insertBefore(the, table.firstChild);
        }
        // Safari doesn't support table.tHead, sigh
        if (table.tHead == null) table.tHead = table.getElementsByTagName('thead')[0];

        if (table.tHead.rows.length != 1) return; // can't cope with two header rows

        // Sorttable v1 put rows with a class of "sortbottom" at the bottom (as
        // "total" rows, for example). This is B&R, since what you're supposed
        // to do is put them in a tfoot. So, if there are sortbottom rows,
        // for backwards compatibility, move them to tfoot (creating it if needed).
        sortbottomrows = [];
        for (var i = 0; i < table.rows.length; i++) {
            if (table.rows[i].className.search(/\bsortbottom\b/) != -1) {
                sortbottomrows[sortbottomrows.length] = table.rows[i];
            }
        }
        if (sortbottomrows) {
            if (table.tFoot == null) {
                // table doesn't have a tfoot. Create one.
                tfo = document.createElement('tfoot');
                table.appendChild(tfo);
            }
            for (var i = 0; i < sortbottomrows.length; i++) {
                tfo.appendChild(sortbottomrows[i]);
            }
            delete sortbottomrows;
        }

        // work through each column and calculate its type
        headrow = table.tHead.rows[0].cells;
        for (var i = 0; i < headrow.length; i++) {
            // manually override the type with a sorttable_type attribute
            if (!headrow[i].className.match(/\bsorttable_nosort\b/)) { // skip this col
                mtch = headrow[i].className.match(/\bsorttable_([a-z0-9]+)\b/);
                if (mtch) {
                    override = mtch[1];
                }
                if (mtch && typeof sorttable["sort_" + override] == 'function') {
                    headrow[i].sorttable_sortfunction = sorttable["sort_" + override];
                } else {
                    headrow[i].sorttable_sortfunction = sorttable.guessType(table, i);
                }
                // make it clickable to sort
                headrow[i].sorttable_columnindex = i;
                headrow[i].sorttable_tbody = table.tBodies[0];
                dean_addEvent(headrow[i], "click", sorttable.innerSortFunction = function(e) {

                    if (this.className.search(/\bsorttable_sorted\b/) != -1) {
                        // if we're already sorted by this column, just
                        // reverse the table, which is quicker
                        sorttable.reverse(this.sorttable_tbody);
                        this.className = this.className.replace('sorttable_sorted',
                            'sorttable_sorted_reverse');
                        this.removeChild(document.getElementById('sorttable_sortfwdind'));
                        sortrevind = document.createElement('span');
                        sortrevind.id = "sorttable_sortrevind";
                        sortrevind.innerHTML = stIsIE ? '&nbsp<font face="webdings">5</font>' : '&nbsp;&#x25BE;';
                        this.appendChild(sortrevind);
                        return;
                    }
                    if (this.className.search(/\bsorttable_sorted_reverse\b/) != -1) {
                        // if we're already sorted by this column in reverse, just
                        // re-reverse the table, which is quicker
                        sorttable.reverse(this.sorttable_tbody);
                        this.className = this.className.replace('sorttable_sorted_reverse',
                            'sorttable_sorted');
                        this.removeChild(document.getElementById('sorttable_sortrevind'));
                        sortfwdind = document.createElement('span');
                        sortfwdind.id = "sorttable_sortfwdind";
                        sortfwdind.innerHTML = stIsIE ? '&nbsp<font face="webdings">6</font>' : '&nbsp;&#x25B4;';
                        this.appendChild(sortfwdind);
                        return;
                    }

                    // remove sorttable_sorted classes
                    theadrow = this.parentNode;
                    forEach(theadrow.childNodes, function(cell) {
                        if (cell.nodeType == 1) { // an element
                            cell.className = cell.className.replace('sorttable_sorted_reverse', '');
                            cell.className = cell.className.replace('sorttable_sorted', '');
                        }
                    });
                    sortfwdind = document.getElementById('sorttable_sortfwdind');
                    if (sortfwdind) {
                        sortfwdind.parentNode.removeChild(sortfwdind);
                    }
                    sortrevind = document.getElementById('sorttable_sortrevind');
                    if (sortrevind) {
                        sortrevind.parentNode.removeChild(sortrevind);
                    }

                    this.className += ' sorttable_sorted';
                    sortfwdind = document.createElement('span');
                    sortfwdind.id = "sorttable_sortfwdind";
                    sortfwdind.innerHTML = stIsIE ? '&nbsp<font face="webdings">6</font>' : '&nbsp;&#x25B4;';
                    this.appendChild(sortfwdind);

                    // build an array to sort. This is a Schwartzian transform thing,
                    // i.e., we "decorate" each row with the actual sort key,
                    // sort based on the sort keys, and then put the rows back in order
                    // which is a lot faster because you only do getInnerText once per row
                    row_array = [];
                    col = this.sorttable_columnindex;
                    rows = this.sorttable_tbody.rows;
                    for (var j = 0; j < rows.length; j++) {
                        row_array[row_array.length] = [sorttable.getInnerText(rows[j].cells[col]), rows[j]];
                    }
                    /* If you want a stable sort, uncomment the following line */
                    //sorttable.shaker_sort(row_array, this.sorttable_sortfunction);
                    /* and comment out this one */
                    row_array.sort(this.sorttable_sortfunction);

                    tb = this.sorttable_tbody;
                    for (var j = 0; j < row_array.length; j++) {
                        tb.appendChild(row_array[j][1]);
                    }

                    delete row_array;
                });
            }
        }
    },

    guessType: function(table, column) {
        // guess the type of a column based on its first non-blank row
        sortfn = sorttable.sort_alpha;
        for (var i = 0; i < table.tBodies[0].rows.length; i++) {
            text = sorttable.getInnerText(table.tBodies[0].rows[i].cells[column]);
            if (text != '') {
                if (text.match(/^-?[�$�]?[\d,.]+%?$/)) {
                    return sorttable.sort_numeric;
                }
                // check for a date: dd/mm/yyyy or dd/mm/yy
                // can have / or . or - as separator
                // can be mm/dd as well
                possdate = text.match(sorttable.DATE_RE)
                if (possdate) {
                    // looks like a date
                    first = parseInt(possdate[1]);
                    second = parseInt(possdate[2]);
                    if (first > 12) {
                        // definitely dd/mm
                        return sorttable.sort_ddmm;
                    } else if (second > 12) {
                        return sorttable.sort_mmdd;
                    } else {
                        // looks like a date, but we can't tell which, so assume
                        // that it's dd/mm (English imperialism!) and keep looking
                        sortfn = sorttable.sort_ddmm;
                    }
                }
            }
        }
        return sortfn;
    },

    getInnerText: function(node) {
        // gets the text we want to use for sorting for a cell.
        // strips leading and trailing whitespace.
        // this is *not* a generic getInnerText function; it's special to sorttable.
        // for example, you can override the cell text with a customkey attribute.
        // it also gets .value for <input> fields.

        if (!node) return "";

        hasInputs = (typeof node.getElementsByTagName == 'function') &&
            node.getElementsByTagName('input').length;

        if (node.getAttribute("sorttable_customkey") != null) {
            return node.getAttribute("sorttable_customkey");
        } else if (typeof node.textContent != 'undefined' && !hasInputs) {
            return node.textContent.replace(/^\s+|\s+$/g, '');
        } else if (typeof node.innerText != 'undefined' && !hasInputs) {
            return node.innerText.replace(/^\s+|\s+$/g, '');
        } else if (typeof node.text != 'undefined' && !hasInputs) {
            return node.text.replace(/^\s+|\s+$/g, '');
        } else {
            switch (node.nodeType) {
                case 3:
                    if (node.nodeName.toLowerCase() == 'input') {
                        return node.value.replace(/^\s+|\s+$/g, '');
                    }
                    case 4:
                        return node.nodeValue.replace(/^\s+|\s+$/g, '');
                        break;
                    case 1:
                    case 11:
                        var innerText = '';
                        for (var i = 0; i < node.childNodes.length; i++) {
                            innerText += sorttable.getInnerText(node.childNodes[i]);
                        }
                        return innerText.replace(/^\s+|\s+$/g, '');
                        break;
                    default:
                        return '';
            }
        }
    },

    reverse: function(tbody) {
        // reverse the rows in a tbody
        newrows = [];
        for (var i = 0; i < tbody.rows.length; i++) {
            newrows[newrows.length] = tbody.rows[i];
        }
        for (var i = newrows.length - 1; i >= 0; i--) {
            tbody.appendChild(newrows[i]);
        }
        delete newrows;
    },

    /* sort functions
       each sort function takes two parameters, a and b
       you are comparing a[0] and b[0] */
    sort_numeric: function(a, b) {
        aa = parseFloat(a[0].replace(/[^0-9.-]/g, ''));
        if (isNaN(aa)) aa = 0;
        bb = parseFloat(b[0].replace(/[^0-9.-]/g, ''));
        if (isNaN(bb)) bb = 0;
        return aa - bb;
    },
    sort_alpha: function(a, b) {
        if (a[0] == b[0]) return 0;
        if (a[0] < b[0]) return -1;
        return 1;
    },
    sort_ddmm: function(a, b) {
        mtch = a[0].match(sorttable.DATE_RE);
        y = mtch[3];
        m = mtch[2];
        d = mtch[1];
        if (m.length == 1) m = '0' + m;
        if (d.length == 1) d = '0' + d;
        dt1 = y + m + d;
        mtch = b[0].match(sorttable.DATE_RE);
        y = mtch[3];
        m = mtch[2];
        d = mtch[1];
        if (m.length == 1) m = '0' + m;
        if (d.length == 1) d = '0' + d;
        dt2 = y + m + d;
        if (dt1 == dt2) return 0;
        if (dt1 < dt2) return -1;
        return 1;
    },
    sort_mmdd: function(a, b) {
        mtch = a[0].match(sorttable.DATE_RE);
        y = mtch[3];
        d = mtch[2];
        m = mtch[1];
        if (m.length == 1) m = '0' + m;
        if (d.length == 1) d = '0' + d;
        dt1 = y + m + d;
        mtch = b[0].match(sorttable.DATE_RE);
        y = mtch[3];
        d = mtch[2];
        m = mtch[1];
        if (m.length == 1) m = '0' + m;
        if (d.length == 1) d = '0' + d;
        dt2 = y + m + d;
        if (dt1 == dt2) return 0;
        if (dt1 < dt2) return -1;
        return 1;
    },

    shaker_sort: function(list, comp_func) {
        // A stable sort function to allow multi-level sorting of data
        // see: http://en.wikipedia.org/wiki/Cocktail_sort
        // thanks to Joseph Nahmias
        var b = 0;
        var t = list.length - 1;
        var swap = true;

        while (swap) {
            swap = false;
            for (var i = b; i < t; ++i) {
                if (comp_func(list[i], list[i + 1]) > 0) {
                    var q = list[i];
                    list[i] = list[i + 1];
                    list[i + 1] = q;
                    swap = true;
                }
            } // for
            t--;

            if (!swap) break;

            for (var i = t; i > b; --i) {
                if (comp_func(list[i], list[i - 1]) < 0) {
                    var q = list[i];
                    list[i] = list[i - 1];
                    list[i - 1] = q;
                    swap = true;
                }
            } // for
            b++;

        } // while(swap)
    }
}

/* ******************************************************************
   Supporting functions: bundled here to avoid depending on a library
   ****************************************************************** */

// Dean Edwards/Matthias Miller/John Resig

/* for Mozilla/Opera9 */
if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", sorttable.init, false);
}

/* for Internet Explorer */
/*@cc_on @*/
/*@if (@_win32)
    document.write("<script id=__ie_onload defer src=javascript:void(0)><\/script>");
    var script = document.getElementById("__ie_onload");
    script.onreadystatechange = function() {
        if (this.readyState == "complete") {
            sorttable.init(); // call the onload handler
        }
    };
/*@end @*/

/* for Safari */
if (/WebKit/i.test(navigator.userAgent)) { // sniff
    var _timer = setInterval(function() {
        if (/loaded|complete/.test(document.readyState)) {
            sorttable.init(); // call the onload handler
        }
    }, 10);
}

/* for other browsers */
window.onload = sorttable.init;

// written by Dean Edwards, 2005
// with input from Tino Zijdel, Matthias Miller, Diego Perini

// http://dean.edwards.name/weblog/2005/10/add-event/

function dean_addEvent(element, type, handler) {
    if (element.addEventListener) {
        element.addEventListener(type, handler, false);
    } else {
        // assign each event handler a unique ID
        if (!handler.$$guid) handler.$$guid = dean_addEvent.guid++;
        // create a hash table of event types for the element
        if (!element.events) element.events = {};
        // create a hash table of event handlers for each element/event pair
        var handlers = element.events[type];
        if (!handlers) {
            handlers = element.events[type] = {};
            // store the existing event handler (if there is one)
            if (element["on" + type]) {
                handlers[0] = element["on" + type];
            }
        }
        // store the event handler in the hash table
        handlers[handler.$$guid] = handler;
        // assign a global event handler to do all the work
        element["on" + type] = handleEvent;
    }
};
// a counter used to create unique IDs
dean_addEvent.guid = 1;

function removeEvent(element, type, handler) {
    if (element.removeEventListener) {
        element.removeEventListener(type, handler, false);
    } else {
        // delete the event handler from the hash table
        if (element.events && element.events[type]) {
            delete element.events[type][handler.$$guid];
        }
    }
};

function handleEvent(event) {
    var returnValue = true;
    // grab the event object (IE uses a global event object)
    event = event || fixEvent(((this.ownerDocument || this.document || this).parentWindow || window).event);
    // get a reference to the hash table of event handlers
    var handlers = this.events[event.type];
    // execute each event handler
    for (var i in handlers) {
        this.$$handleEvent = handlers[i];
        if (this.$$handleEvent(event) === false) {
            returnValue = false;
        }
    }
    return returnValue;
};

function fixEvent(event) {
    // add W3C standard event methods
    event.preventDefault = fixEvent.preventDefault;
    event.stopPropagation = fixEvent.stopPropagation;
    return event;
};
fixEvent.preventDefault = function() {
    this.returnValue = false;
};
fixEvent.stopPropagation = function() {
    this.cancelBubble = true;
}

// Dean's forEach: http://dean.edwards.name/base/forEach.js
/*
	forEach, version 1.0
	Copyright 2006, Dean Edwards
	License: http://www.opensource.org/licenses/mit-license.php
*/

// array-like enumeration
if (!Array.forEach) { // mozilla already supports this
    Array.forEach = function(array, block, context) {
        for (var i = 0; i < array.length; i++) {
            block.call(context, array[i], i, array);
        }
    };
}

// generic enumeration
Function.prototype.forEach = function(object, block, context) {
    for (var key in object) {
        if (typeof this.prototype[key] == "undefined") {
            block.call(context, object[key], key, object);
        }
    }
};

// character enumeration
String.forEach = function(string, block, context) {
    Array.forEach(string.split(""), function(chr, index) {
        block.call(context, chr, index, string);
    });
};

// globally resolve forEach enumeration
var forEach = function(object, block, context) {
    if (object) {
        var resolve = Object; // default
        if (object instanceof Function) {
            // functions have a "length" property
            resolve = Function;
        } else if (object.forEach instanceof Function) {
            // the object implements a custom forEach method so use that
            object.forEach(block, context);
            return;
        } else if (typeof object == "string") {
            // the object is a string
            resolve = String;
        } else if (typeof object.length == "number") {
            // the object is array-like
            resolve = Array;
        }
        resolve.forEach(object, block, context);
    }
};

module.exports = sorttable

/***/ }),

/***/ "./src/table.js":
/*!**********************!*\
  !*** ./src/table.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

let sorttable = __webpack_require__(/*! ./sorttable.js */ "./src/sorttable.js")

function generateTableHead(table, tableMeta) {
    const thead = table.createTHead();
    const row = thead.insertRow();
    for (const [key, value] of Object.entries(tableMeta)) {
        const th = document.createElement("th");
        const abbr = document.createElement("abbr")
        abbr.title = value.abbr
        const text = document.createTextNode(value.text);
        abbr.appendChild(text)
        th.appendChild(abbr);
        row.appendChild(th);
    }
}

function generateTable(table, dashboard, tableMeta, mapLinks, regionNames, topRegion, incidentLinks) {
    for (const region of dashboard.regions) {
        // true if the current region should be at the top when loading the page
        const atTop = region.name === topRegion

        let shownName
        try {
            shownName = regionNames[region.name]["DE"]
        } catch (err) {
            console.log(region.name + " not found in regionNames.json")
            shownName = region.name
        }

        const row = table.insertRow();
        // name column
        const th = document.createElement("td")
        th.setAttribute("data-label", shownName)
        th.className = "has-text-centered has-text-weight-bold"

        const link = mapLinks[region.name]
        const textName = document.createTextNode(shownName);
        if (link === undefined) {
            th.appendChild(textName)
        } else {
            const a = document.createElement("a")
            a.href = link
            a.appendChild(textName)
            th.appendChild(a)
        }
        row.appendChild(th)
        let diffs = true
        if (dashboard.diffDate === undefined) {
            diffs = false
        }

        // stat columns
        for (const [key, value] of Object.entries(region)) {
            if (["rides", "incidents", "scaryIncidents", "km"].includes(key)) {
                generateStatColumn(row, key, value, tableMeta, diffs, atTop, incidentLinks[region.name]);
            }
        }
    }
}

// key = rides, value = [100, 1], diffs = true/false, atTop = true/false
function generateStatColumn(row, key, value, tableMeta, diffs, atTop, incidentLink) {
    // create cell and append already to row
    const cell = document.createElement("td")
    cell.setAttribute("data-label", tableMeta[key].text);
    row.appendChild(cell)

    // create div
    const div = document.createElement("div")
    div.className = "is-flex is-align-items-center";

    // create total span
    const totalSpan = document.createElement("span")
    totalSpan.className = "tag is-medium mr-1 is-flex-grow-1"
    // create total span text.
    let totalSpanChild;
    // create a href referencing to the incident map, if "incidents"-cell is being created
    if ((key === 'incidents') && (incidentLink !== undefined)) {
        totalSpanChild = document.createElement("a")
        totalSpanChild.href = incidentLink
        let text = document.createTextNode(value[0].toLocaleString())
        totalSpanChild.appendChild(text)
    } else { // otherwise, just print the text
        totalSpanChild = document.createTextNode(value[0].toLocaleString())
    }

    if (!atTop) {
        // set sort-key of cell to value (normal sorting)
        cell.setAttribute("sorttable_customkey", value[0].toString())
    } else {
        // the given cell should be at the top, so add a very large top-key
        cell.setAttribute("sorttable_customkey", Number.MAX_SAFE_INTEGER)
    }

    // append elements
    totalSpan.appendChild(totalSpanChild)
    div.appendChild(totalSpan)

    if (diffs) {
        // create diff span
        const divSpan = document.createElement("span")
        const icon = document.createElement("span")
        icon.className = "unicode-icon"
        if (value[1] > 0) {
            divSpan.className = "tag " + tableMeta[key].tag
            icon.textContent = "⬆"
        } else {
            divSpan.className = "tag"
            icon.textContent = "➡"
        }
        const iconText = document.createElement("span")
        iconText.className = "icon-text is-flex-wrap-nowrap"
        const iconSpan = document.createElement("span")
        iconSpan.className = "icon mr-0"
        const diffValue = document.createElement("span")
        diffValue.appendChild(document.createTextNode(value[1].toLocaleString()))

        // append elements in reverse creation order to cell
        iconSpan.appendChild(icon)
        iconText.appendChild(iconSpan)
        iconText.appendChild(diffValue)
        divSpan.appendChild(iconText)
        div.appendChild(divSpan)
    }

    cell.appendChild(div)
}

function updateTotals(dashboard) {
    document.getElementById("totalRides").innerHTML = dashboard.totalRides.toLocaleString()
    document.getElementById("totalIncidents").innerHTML = dashboard.totalIncidents.toLocaleString()
    document.getElementById("totalKm").innerHTML = dashboard.totalKm.toLocaleString()
    document.getElementById("sourceDate").innerHTML = dashboard.sourceDate

    if (dashboard.diffDate != undefined) {
        document.getElementById("diffDate").innerHTML = dashboard.diffDate
    } else {
        document.getElementById("diffText").style.display = "none";
    }
}

// topRegion can be set to the name of a region as found in the dashboard.json; this region will then be shown at the top of the table
async function fillTable(topRegion) {
    let table = document.getElementById("regionTable");
    let [r1, r2, r3, r4, r5] = await Promise.all([
        fetch("./resources/tableMeta.json"),
        fetch("./resources/dashboard.json"),
        fetch("./resources/mapLinks.json"),
        fetch("./resources/regionNames.json"),
        fetch("./resources/incidentLinks.json")
    ])

    let tableMeta = await r1.json()
    let dashboard = await r2.json()
    let mapLinks = await r3.json()
    let regionNames = await r4.json()
    let incidentLinks = await r5.json()

    updateTotals(dashboard);
    generateTable(table, dashboard, tableMeta, mapLinks, regionNames, topRegion, incidentLinks);
    generateTableHead(table, tableMeta);

    sorttable.makeSortable(table)
    // trigger the sorting by clicking the button of the #Fahrten column
    const sortButton = table.firstElementChild.firstElementChild.children[1]
    sortButton.click()
    sortButton.click()
}

module.exports = fillTable;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__(/*! ./mystyles.scss */ "./src/mystyles.scss");
const fillTable = __webpack_require__(/*! ./table.js */ "./src/table.js")

window.onload = function() {
    document.getElementById("deleteInfo").addEventListener('click', function(event) {
        console.log(event.target.parentNode.parentNode.remove())
    });

    // users can supply a region name that will be listed at the top
    const topRegion = getParameterByName('region')
    
    fillTable(topRegion)
}

/**
 * Source: https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript?rq=1
 */

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDN2ZBLGdCQUFnQixtQkFBTyxDQUFDLDBDQUFnQjs7QUFFeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxPQUFPO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUEsZ0ZBQWdGO0FBQ2hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7OztVQ3pLQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7QUNOQSxtQkFBTyxDQUFDLDRDQUFpQjtBQUN6QixrQkFBa0IsbUJBQU8sQ0FBQyxrQ0FBWTs7QUFFdEM7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJzaXRlLy4vc3JjL215c3R5bGVzLnNjc3M/ZDI0YiIsIndlYnBhY2s6Ly93ZWJzaXRlLy4vc3JjL3NvcnR0YWJsZS5qcyIsIndlYnBhY2s6Ly93ZWJzaXRlLy4vc3JjL3RhYmxlLmpzIiwid2VicGFjazovL3dlYnNpdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYnNpdGUvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLypcbiAgU29ydFRhYmxlXG4gIHZlcnNpb24gMlxuICA3dGggQXByaWwgMjAwN1xuICBTdHVhcnQgTGFuZ3JpZGdlLCBodHRwOi8vd3d3LmtyeW9nZW5peC5vcmcvY29kZS9icm93c2VyL3NvcnR0YWJsZS9cblxuICBJbnN0cnVjdGlvbnM6XG4gIERvd25sb2FkIHRoaXMgZmlsZVxuICBBZGQgPHNjcmlwdCBzcmM9XCJzb3J0dGFibGUuanNcIj48L3NjcmlwdD4gdG8geW91ciBIVE1MXG4gIEFkZCBjbGFzcz1cInNvcnRhYmxlXCIgdG8gYW55IHRhYmxlIHlvdSdkIGxpa2UgdG8gbWFrZSBzb3J0YWJsZVxuICBDbGljayBvbiB0aGUgaGVhZGVycyB0byBzb3J0XG5cbiAgVGhhbmtzIHRvIG1hbnksIG1hbnkgcGVvcGxlIGZvciBjb250cmlidXRpb25zIGFuZCBzdWdnZXN0aW9ucy5cbiAgTGljZW5jZWQgYXMgWDExOiBodHRwOi8vd3d3LmtyeW9nZW5peC5vcmcvY29kZS9icm93c2VyL2xpY2VuY2UuaHRtbFxuICBUaGlzIGJhc2ljYWxseSBtZWFuczogZG8gd2hhdCB5b3Ugd2FudCB3aXRoIGl0LlxuKi9cblxuXG52YXIgc3RJc0lFID0gLypAY2Nfb24hQCovIGZhbHNlO1xuXG5zb3J0dGFibGUgPSB7XG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIHF1aXQgaWYgdGhpcyBmdW5jdGlvbiBoYXMgYWxyZWFkeSBiZWVuIGNhbGxlZFxuICAgICAgICBpZiAoYXJndW1lbnRzLmNhbGxlZS5kb25lKSByZXR1cm47XG4gICAgICAgIC8vIGZsYWcgdGhpcyBmdW5jdGlvbiBzbyB3ZSBkb24ndCBkbyB0aGUgc2FtZSB0aGluZyB0d2ljZVxuICAgICAgICBhcmd1bWVudHMuY2FsbGVlLmRvbmUgPSB0cnVlO1xuICAgICAgICAvLyBraWxsIHRoZSB0aW1lclxuICAgICAgICBpZiAoX3RpbWVyKSBjbGVhckludGVydmFsKF90aW1lcik7XG5cbiAgICAgICAgaWYgKCFkb2N1bWVudC5jcmVhdGVFbGVtZW50IHx8ICFkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSkgcmV0dXJuO1xuXG4gICAgICAgIHNvcnR0YWJsZS5EQVRFX1JFID0gL14oXFxkXFxkPylbXFwvXFwuLV0oXFxkXFxkPylbXFwvXFwuLV0oKFxcZFxcZCk/XFxkXFxkKSQvO1xuXG4gICAgICAgIGZvckVhY2goZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3RhYmxlJyksIGZ1bmN0aW9uKHRhYmxlKSB7XG4gICAgICAgICAgICBpZiAodGFibGUuY2xhc3NOYW1lLnNlYXJjaCgvXFxic29ydGFibGVcXGIvKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgIHNvcnR0YWJsZS5tYWtlU29ydGFibGUodGFibGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIH0sXG5cbiAgICBtYWtlU29ydGFibGU6IGZ1bmN0aW9uKHRhYmxlKSB7XG4gICAgICAgIGlmICh0YWJsZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgndGhlYWQnKS5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgLy8gdGFibGUgZG9lc24ndCBoYXZlIGEgdEhlYWQuIFNpbmNlIGl0IHNob3VsZCBoYXZlLCBjcmVhdGUgb25lIGFuZFxuICAgICAgICAgICAgLy8gcHV0IHRoZSBmaXJzdCB0YWJsZSByb3cgaW4gaXQuXG4gICAgICAgICAgICB0aGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aGVhZCcpO1xuICAgICAgICAgICAgdGhlLmFwcGVuZENoaWxkKHRhYmxlLnJvd3NbMF0pO1xuICAgICAgICAgICAgdGFibGUuaW5zZXJ0QmVmb3JlKHRoZSwgdGFibGUuZmlyc3RDaGlsZCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gU2FmYXJpIGRvZXNuJ3Qgc3VwcG9ydCB0YWJsZS50SGVhZCwgc2lnaFxuICAgICAgICBpZiAodGFibGUudEhlYWQgPT0gbnVsbCkgdGFibGUudEhlYWQgPSB0YWJsZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgndGhlYWQnKVswXTtcblxuICAgICAgICBpZiAodGFibGUudEhlYWQucm93cy5sZW5ndGggIT0gMSkgcmV0dXJuOyAvLyBjYW4ndCBjb3BlIHdpdGggdHdvIGhlYWRlciByb3dzXG5cbiAgICAgICAgLy8gU29ydHRhYmxlIHYxIHB1dCByb3dzIHdpdGggYSBjbGFzcyBvZiBcInNvcnRib3R0b21cIiBhdCB0aGUgYm90dG9tIChhc1xuICAgICAgICAvLyBcInRvdGFsXCIgcm93cywgZm9yIGV4YW1wbGUpLiBUaGlzIGlzIEImUiwgc2luY2Ugd2hhdCB5b3UncmUgc3VwcG9zZWRcbiAgICAgICAgLy8gdG8gZG8gaXMgcHV0IHRoZW0gaW4gYSB0Zm9vdC4gU28sIGlmIHRoZXJlIGFyZSBzb3J0Ym90dG9tIHJvd3MsXG4gICAgICAgIC8vIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSwgbW92ZSB0aGVtIHRvIHRmb290IChjcmVhdGluZyBpdCBpZiBuZWVkZWQpLlxuICAgICAgICBzb3J0Ym90dG9tcm93cyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhYmxlLnJvd3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0YWJsZS5yb3dzW2ldLmNsYXNzTmFtZS5zZWFyY2goL1xcYnNvcnRib3R0b21cXGIvKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgIHNvcnRib3R0b21yb3dzW3NvcnRib3R0b21yb3dzLmxlbmd0aF0gPSB0YWJsZS5yb3dzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChzb3J0Ym90dG9tcm93cykge1xuICAgICAgICAgICAgaWYgKHRhYmxlLnRGb290ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAvLyB0YWJsZSBkb2Vzbid0IGhhdmUgYSB0Zm9vdC4gQ3JlYXRlIG9uZS5cbiAgICAgICAgICAgICAgICB0Zm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0Zm9vdCcpO1xuICAgICAgICAgICAgICAgIHRhYmxlLmFwcGVuZENoaWxkKHRmbyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNvcnRib3R0b21yb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGZvLmFwcGVuZENoaWxkKHNvcnRib3R0b21yb3dzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlbGV0ZSBzb3J0Ym90dG9tcm93cztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHdvcmsgdGhyb3VnaCBlYWNoIGNvbHVtbiBhbmQgY2FsY3VsYXRlIGl0cyB0eXBlXG4gICAgICAgIGhlYWRyb3cgPSB0YWJsZS50SGVhZC5yb3dzWzBdLmNlbGxzO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhlYWRyb3cubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIC8vIG1hbnVhbGx5IG92ZXJyaWRlIHRoZSB0eXBlIHdpdGggYSBzb3J0dGFibGVfdHlwZSBhdHRyaWJ1dGVcbiAgICAgICAgICAgIGlmICghaGVhZHJvd1tpXS5jbGFzc05hbWUubWF0Y2goL1xcYnNvcnR0YWJsZV9ub3NvcnRcXGIvKSkgeyAvLyBza2lwIHRoaXMgY29sXG4gICAgICAgICAgICAgICAgbXRjaCA9IGhlYWRyb3dbaV0uY2xhc3NOYW1lLm1hdGNoKC9cXGJzb3J0dGFibGVfKFthLXowLTldKylcXGIvKTtcbiAgICAgICAgICAgICAgICBpZiAobXRjaCkge1xuICAgICAgICAgICAgICAgICAgICBvdmVycmlkZSA9IG10Y2hbMV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChtdGNoICYmIHR5cGVvZiBzb3J0dGFibGVbXCJzb3J0X1wiICsgb3ZlcnJpZGVdID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZHJvd1tpXS5zb3J0dGFibGVfc29ydGZ1bmN0aW9uID0gc29ydHRhYmxlW1wic29ydF9cIiArIG92ZXJyaWRlXTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBoZWFkcm93W2ldLnNvcnR0YWJsZV9zb3J0ZnVuY3Rpb24gPSBzb3J0dGFibGUuZ3Vlc3NUeXBlKHRhYmxlLCBpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gbWFrZSBpdCBjbGlja2FibGUgdG8gc29ydFxuICAgICAgICAgICAgICAgIGhlYWRyb3dbaV0uc29ydHRhYmxlX2NvbHVtbmluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICBoZWFkcm93W2ldLnNvcnR0YWJsZV90Ym9keSA9IHRhYmxlLnRCb2RpZXNbMF07XG4gICAgICAgICAgICAgICAgZGVhbl9hZGRFdmVudChoZWFkcm93W2ldLCBcImNsaWNrXCIsIHNvcnR0YWJsZS5pbm5lclNvcnRGdW5jdGlvbiA9IGZ1bmN0aW9uKGUpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jbGFzc05hbWUuc2VhcmNoKC9cXGJzb3J0dGFibGVfc29ydGVkXFxiLykgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIHdlJ3JlIGFscmVhZHkgc29ydGVkIGJ5IHRoaXMgY29sdW1uLCBqdXN0XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyByZXZlcnNlIHRoZSB0YWJsZSwgd2hpY2ggaXMgcXVpY2tlclxuICAgICAgICAgICAgICAgICAgICAgICAgc29ydHRhYmxlLnJldmVyc2UodGhpcy5zb3J0dGFibGVfdGJvZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGFzc05hbWUgPSB0aGlzLmNsYXNzTmFtZS5yZXBsYWNlKCdzb3J0dGFibGVfc29ydGVkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc29ydHRhYmxlX3NvcnRlZF9yZXZlcnNlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUNoaWxkKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzb3J0dGFibGVfc29ydGZ3ZGluZCcpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRyZXZpbmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0cmV2aW5kLmlkID0gXCJzb3J0dGFibGVfc29ydHJldmluZFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgc29ydHJldmluZC5pbm5lckhUTUwgPSBzdElzSUUgPyAnJm5ic3A8Zm9udCBmYWNlPVwid2ViZGluZ3NcIj41PC9mb250PicgOiAnJm5ic3A7JiN4MjVCRTsnO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRDaGlsZChzb3J0cmV2aW5kKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jbGFzc05hbWUuc2VhcmNoKC9cXGJzb3J0dGFibGVfc29ydGVkX3JldmVyc2VcXGIvKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgd2UncmUgYWxyZWFkeSBzb3J0ZWQgYnkgdGhpcyBjb2x1bW4gaW4gcmV2ZXJzZSwganVzdFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmUtcmV2ZXJzZSB0aGUgdGFibGUsIHdoaWNoIGlzIHF1aWNrZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnR0YWJsZS5yZXZlcnNlKHRoaXMuc29ydHRhYmxlX3Rib2R5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NOYW1lID0gdGhpcy5jbGFzc05hbWUucmVwbGFjZSgnc29ydHRhYmxlX3NvcnRlZF9yZXZlcnNlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc29ydHRhYmxlX3NvcnRlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVDaGlsZChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc29ydHRhYmxlX3NvcnRyZXZpbmQnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0ZndkaW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc29ydGZ3ZGluZC5pZCA9IFwic29ydHRhYmxlX3NvcnRmd2RpbmRcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRmd2RpbmQuaW5uZXJIVE1MID0gc3RJc0lFID8gJyZuYnNwPGZvbnQgZmFjZT1cIndlYmRpbmdzXCI+NjwvZm9udD4nIDogJyZuYnNwOyYjeDI1QjQ7JztcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kQ2hpbGQoc29ydGZ3ZGluZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgc29ydHRhYmxlX3NvcnRlZCBjbGFzc2VzXG4gICAgICAgICAgICAgICAgICAgIHRoZWFkcm93ID0gdGhpcy5wYXJlbnROb2RlO1xuICAgICAgICAgICAgICAgICAgICBmb3JFYWNoKHRoZWFkcm93LmNoaWxkTm9kZXMsIGZ1bmN0aW9uKGNlbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjZWxsLm5vZGVUeXBlID09IDEpIHsgLy8gYW4gZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NOYW1lID0gY2VsbC5jbGFzc05hbWUucmVwbGFjZSgnc29ydHRhYmxlX3NvcnRlZF9yZXZlcnNlJywgJycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NOYW1lID0gY2VsbC5jbGFzc05hbWUucmVwbGFjZSgnc29ydHRhYmxlX3NvcnRlZCcsICcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHNvcnRmd2RpbmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc29ydHRhYmxlX3NvcnRmd2RpbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNvcnRmd2RpbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRmd2RpbmQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzb3J0ZndkaW5kKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzb3J0cmV2aW5kID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NvcnR0YWJsZV9zb3J0cmV2aW5kJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzb3J0cmV2aW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0cmV2aW5kLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc29ydHJldmluZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsYXNzTmFtZSArPSAnIHNvcnR0YWJsZV9zb3J0ZWQnO1xuICAgICAgICAgICAgICAgICAgICBzb3J0ZndkaW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgICAgICAgICBzb3J0ZndkaW5kLmlkID0gXCJzb3J0dGFibGVfc29ydGZ3ZGluZFwiO1xuICAgICAgICAgICAgICAgICAgICBzb3J0ZndkaW5kLmlubmVySFRNTCA9IHN0SXNJRSA/ICcmbmJzcDxmb250IGZhY2U9XCJ3ZWJkaW5nc1wiPjY8L2ZvbnQ+JyA6ICcmbmJzcDsmI3gyNUI0Oyc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kQ2hpbGQoc29ydGZ3ZGluZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gYnVpbGQgYW4gYXJyYXkgdG8gc29ydC4gVGhpcyBpcyBhIFNjaHdhcnR6aWFuIHRyYW5zZm9ybSB0aGluZyxcbiAgICAgICAgICAgICAgICAgICAgLy8gaS5lLiwgd2UgXCJkZWNvcmF0ZVwiIGVhY2ggcm93IHdpdGggdGhlIGFjdHVhbCBzb3J0IGtleSxcbiAgICAgICAgICAgICAgICAgICAgLy8gc29ydCBiYXNlZCBvbiB0aGUgc29ydCBrZXlzLCBhbmQgdGhlbiBwdXQgdGhlIHJvd3MgYmFjayBpbiBvcmRlclxuICAgICAgICAgICAgICAgICAgICAvLyB3aGljaCBpcyBhIGxvdCBmYXN0ZXIgYmVjYXVzZSB5b3Ugb25seSBkbyBnZXRJbm5lclRleHQgb25jZSBwZXIgcm93XG4gICAgICAgICAgICAgICAgICAgIHJvd19hcnJheSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBjb2wgPSB0aGlzLnNvcnR0YWJsZV9jb2x1bW5pbmRleDtcbiAgICAgICAgICAgICAgICAgICAgcm93cyA9IHRoaXMuc29ydHRhYmxlX3Rib2R5LnJvd3M7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcm93cy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm93X2FycmF5W3Jvd19hcnJheS5sZW5ndGhdID0gW3NvcnR0YWJsZS5nZXRJbm5lclRleHQocm93c1tqXS5jZWxsc1tjb2xdKSwgcm93c1tqXV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLyogSWYgeW91IHdhbnQgYSBzdGFibGUgc29ydCwgdW5jb21tZW50IHRoZSBmb2xsb3dpbmcgbGluZSAqL1xuICAgICAgICAgICAgICAgICAgICAvL3NvcnR0YWJsZS5zaGFrZXJfc29ydChyb3dfYXJyYXksIHRoaXMuc29ydHRhYmxlX3NvcnRmdW5jdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIC8qIGFuZCBjb21tZW50IG91dCB0aGlzIG9uZSAqL1xuICAgICAgICAgICAgICAgICAgICByb3dfYXJyYXkuc29ydCh0aGlzLnNvcnR0YWJsZV9zb3J0ZnVuY3Rpb24pO1xuXG4gICAgICAgICAgICAgICAgICAgIHRiID0gdGhpcy5zb3J0dGFibGVfdGJvZHk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcm93X2FycmF5Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0Yi5hcHBlbmRDaGlsZChyb3dfYXJyYXlbal1bMV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHJvd19hcnJheTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBndWVzc1R5cGU6IGZ1bmN0aW9uKHRhYmxlLCBjb2x1bW4pIHtcbiAgICAgICAgLy8gZ3Vlc3MgdGhlIHR5cGUgb2YgYSBjb2x1bW4gYmFzZWQgb24gaXRzIGZpcnN0IG5vbi1ibGFuayByb3dcbiAgICAgICAgc29ydGZuID0gc29ydHRhYmxlLnNvcnRfYWxwaGE7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFibGUudEJvZGllc1swXS5yb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0ZXh0ID0gc29ydHRhYmxlLmdldElubmVyVGV4dCh0YWJsZS50Qm9kaWVzWzBdLnJvd3NbaV0uY2VsbHNbY29sdW1uXSk7XG4gICAgICAgICAgICBpZiAodGV4dCAhPSAnJykge1xuICAgICAgICAgICAgICAgIGlmICh0ZXh0Lm1hdGNoKC9eLT9b77+9JO+/vV0/W1xcZCwuXSslPyQvKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc29ydHRhYmxlLnNvcnRfbnVtZXJpYztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgZm9yIGEgZGF0ZTogZGQvbW0veXl5eSBvciBkZC9tbS95eVxuICAgICAgICAgICAgICAgIC8vIGNhbiBoYXZlIC8gb3IgLiBvciAtIGFzIHNlcGFyYXRvclxuICAgICAgICAgICAgICAgIC8vIGNhbiBiZSBtbS9kZCBhcyB3ZWxsXG4gICAgICAgICAgICAgICAgcG9zc2RhdGUgPSB0ZXh0Lm1hdGNoKHNvcnR0YWJsZS5EQVRFX1JFKVxuICAgICAgICAgICAgICAgIGlmIChwb3NzZGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBsb29rcyBsaWtlIGEgZGF0ZVxuICAgICAgICAgICAgICAgICAgICBmaXJzdCA9IHBhcnNlSW50KHBvc3NkYXRlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgc2Vjb25kID0gcGFyc2VJbnQocG9zc2RhdGVbMl0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmlyc3QgPiAxMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGVmaW5pdGVseSBkZC9tbVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNvcnR0YWJsZS5zb3J0X2RkbW07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2Vjb25kID4gMTIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzb3J0dGFibGUuc29ydF9tbWRkO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbG9va3MgbGlrZSBhIGRhdGUsIGJ1dCB3ZSBjYW4ndCB0ZWxsIHdoaWNoLCBzbyBhc3N1bWVcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoYXQgaXQncyBkZC9tbSAoRW5nbGlzaCBpbXBlcmlhbGlzbSEpIGFuZCBrZWVwIGxvb2tpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRmbiA9IHNvcnR0YWJsZS5zb3J0X2RkbW07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNvcnRmbjtcbiAgICB9LFxuXG4gICAgZ2V0SW5uZXJUZXh0OiBmdW5jdGlvbihub2RlKSB7XG4gICAgICAgIC8vIGdldHMgdGhlIHRleHQgd2Ugd2FudCB0byB1c2UgZm9yIHNvcnRpbmcgZm9yIGEgY2VsbC5cbiAgICAgICAgLy8gc3RyaXBzIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdoaXRlc3BhY2UuXG4gICAgICAgIC8vIHRoaXMgaXMgKm5vdCogYSBnZW5lcmljIGdldElubmVyVGV4dCBmdW5jdGlvbjsgaXQncyBzcGVjaWFsIHRvIHNvcnR0YWJsZS5cbiAgICAgICAgLy8gZm9yIGV4YW1wbGUsIHlvdSBjYW4gb3ZlcnJpZGUgdGhlIGNlbGwgdGV4dCB3aXRoIGEgY3VzdG9ta2V5IGF0dHJpYnV0ZS5cbiAgICAgICAgLy8gaXQgYWxzbyBnZXRzIC52YWx1ZSBmb3IgPGlucHV0PiBmaWVsZHMuXG5cbiAgICAgICAgaWYgKCFub2RlKSByZXR1cm4gXCJcIjtcblxuICAgICAgICBoYXNJbnB1dHMgPSAodHlwZW9mIG5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUgPT0gJ2Z1bmN0aW9uJykgJiZcbiAgICAgICAgICAgIG5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2lucHV0JykubGVuZ3RoO1xuXG4gICAgICAgIGlmIChub2RlLmdldEF0dHJpYnV0ZShcInNvcnR0YWJsZV9jdXN0b21rZXlcIikgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG5vZGUuZ2V0QXR0cmlidXRlKFwic29ydHRhYmxlX2N1c3RvbWtleVwiKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygbm9kZS50ZXh0Q29udGVudCAhPSAndW5kZWZpbmVkJyAmJiAhaGFzSW5wdXRzKSB7XG4gICAgICAgICAgICByZXR1cm4gbm9kZS50ZXh0Q29udGVudC5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG5vZGUuaW5uZXJUZXh0ICE9ICd1bmRlZmluZWQnICYmICFoYXNJbnB1dHMpIHtcbiAgICAgICAgICAgIHJldHVybiBub2RlLmlubmVyVGV4dC5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG5vZGUudGV4dCAhPSAndW5kZWZpbmVkJyAmJiAhaGFzSW5wdXRzKSB7XG4gICAgICAgICAgICByZXR1cm4gbm9kZS50ZXh0LnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN3aXRjaCAobm9kZS5ub2RlVHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PSAnaW5wdXQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm9kZS52YWx1ZS5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5vZGUubm9kZVZhbHVlLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTE6XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5uZXJUZXh0ID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGUuY2hpbGROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyVGV4dCArPSBzb3J0dGFibGUuZ2V0SW5uZXJUZXh0KG5vZGUuY2hpbGROb2Rlc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5uZXJUZXh0LnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHJldmVyc2U6IGZ1bmN0aW9uKHRib2R5KSB7XG4gICAgICAgIC8vIHJldmVyc2UgdGhlIHJvd3MgaW4gYSB0Ym9keVxuICAgICAgICBuZXdyb3dzID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGJvZHkucm93cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbmV3cm93c1tuZXdyb3dzLmxlbmd0aF0gPSB0Ym9keS5yb3dzW2ldO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGkgPSBuZXdyb3dzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICB0Ym9keS5hcHBlbmRDaGlsZChuZXdyb3dzW2ldKTtcbiAgICAgICAgfVxuICAgICAgICBkZWxldGUgbmV3cm93cztcbiAgICB9LFxuXG4gICAgLyogc29ydCBmdW5jdGlvbnNcbiAgICAgICBlYWNoIHNvcnQgZnVuY3Rpb24gdGFrZXMgdHdvIHBhcmFtZXRlcnMsIGEgYW5kIGJcbiAgICAgICB5b3UgYXJlIGNvbXBhcmluZyBhWzBdIGFuZCBiWzBdICovXG4gICAgc29ydF9udW1lcmljOiBmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgIGFhID0gcGFyc2VGbG9hdChhWzBdLnJlcGxhY2UoL1teMC05Li1dL2csICcnKSk7XG4gICAgICAgIGlmIChpc05hTihhYSkpIGFhID0gMDtcbiAgICAgICAgYmIgPSBwYXJzZUZsb2F0KGJbMF0ucmVwbGFjZSgvW14wLTkuLV0vZywgJycpKTtcbiAgICAgICAgaWYgKGlzTmFOKGJiKSkgYmIgPSAwO1xuICAgICAgICByZXR1cm4gYWEgLSBiYjtcbiAgICB9LFxuICAgIHNvcnRfYWxwaGE6IGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgaWYgKGFbMF0gPT0gYlswXSkgcmV0dXJuIDA7XG4gICAgICAgIGlmIChhWzBdIDwgYlswXSkgcmV0dXJuIC0xO1xuICAgICAgICByZXR1cm4gMTtcbiAgICB9LFxuICAgIHNvcnRfZGRtbTogZnVuY3Rpb24oYSwgYikge1xuICAgICAgICBtdGNoID0gYVswXS5tYXRjaChzb3J0dGFibGUuREFURV9SRSk7XG4gICAgICAgIHkgPSBtdGNoWzNdO1xuICAgICAgICBtID0gbXRjaFsyXTtcbiAgICAgICAgZCA9IG10Y2hbMV07XG4gICAgICAgIGlmIChtLmxlbmd0aCA9PSAxKSBtID0gJzAnICsgbTtcbiAgICAgICAgaWYgKGQubGVuZ3RoID09IDEpIGQgPSAnMCcgKyBkO1xuICAgICAgICBkdDEgPSB5ICsgbSArIGQ7XG4gICAgICAgIG10Y2ggPSBiWzBdLm1hdGNoKHNvcnR0YWJsZS5EQVRFX1JFKTtcbiAgICAgICAgeSA9IG10Y2hbM107XG4gICAgICAgIG0gPSBtdGNoWzJdO1xuICAgICAgICBkID0gbXRjaFsxXTtcbiAgICAgICAgaWYgKG0ubGVuZ3RoID09IDEpIG0gPSAnMCcgKyBtO1xuICAgICAgICBpZiAoZC5sZW5ndGggPT0gMSkgZCA9ICcwJyArIGQ7XG4gICAgICAgIGR0MiA9IHkgKyBtICsgZDtcbiAgICAgICAgaWYgKGR0MSA9PSBkdDIpIHJldHVybiAwO1xuICAgICAgICBpZiAoZHQxIDwgZHQyKSByZXR1cm4gLTE7XG4gICAgICAgIHJldHVybiAxO1xuICAgIH0sXG4gICAgc29ydF9tbWRkOiBmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgIG10Y2ggPSBhWzBdLm1hdGNoKHNvcnR0YWJsZS5EQVRFX1JFKTtcbiAgICAgICAgeSA9IG10Y2hbM107XG4gICAgICAgIGQgPSBtdGNoWzJdO1xuICAgICAgICBtID0gbXRjaFsxXTtcbiAgICAgICAgaWYgKG0ubGVuZ3RoID09IDEpIG0gPSAnMCcgKyBtO1xuICAgICAgICBpZiAoZC5sZW5ndGggPT0gMSkgZCA9ICcwJyArIGQ7XG4gICAgICAgIGR0MSA9IHkgKyBtICsgZDtcbiAgICAgICAgbXRjaCA9IGJbMF0ubWF0Y2goc29ydHRhYmxlLkRBVEVfUkUpO1xuICAgICAgICB5ID0gbXRjaFszXTtcbiAgICAgICAgZCA9IG10Y2hbMl07XG4gICAgICAgIG0gPSBtdGNoWzFdO1xuICAgICAgICBpZiAobS5sZW5ndGggPT0gMSkgbSA9ICcwJyArIG07XG4gICAgICAgIGlmIChkLmxlbmd0aCA9PSAxKSBkID0gJzAnICsgZDtcbiAgICAgICAgZHQyID0geSArIG0gKyBkO1xuICAgICAgICBpZiAoZHQxID09IGR0MikgcmV0dXJuIDA7XG4gICAgICAgIGlmIChkdDEgPCBkdDIpIHJldHVybiAtMTtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgfSxcblxuICAgIHNoYWtlcl9zb3J0OiBmdW5jdGlvbihsaXN0LCBjb21wX2Z1bmMpIHtcbiAgICAgICAgLy8gQSBzdGFibGUgc29ydCBmdW5jdGlvbiB0byBhbGxvdyBtdWx0aS1sZXZlbCBzb3J0aW5nIG9mIGRhdGFcbiAgICAgICAgLy8gc2VlOiBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0NvY2t0YWlsX3NvcnRcbiAgICAgICAgLy8gdGhhbmtzIHRvIEpvc2VwaCBOYWhtaWFzXG4gICAgICAgIHZhciBiID0gMDtcbiAgICAgICAgdmFyIHQgPSBsaXN0Lmxlbmd0aCAtIDE7XG4gICAgICAgIHZhciBzd2FwID0gdHJ1ZTtcblxuICAgICAgICB3aGlsZSAoc3dhcCkge1xuICAgICAgICAgICAgc3dhcCA9IGZhbHNlO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IGI7IGkgPCB0OyArK2kpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29tcF9mdW5jKGxpc3RbaV0sIGxpc3RbaSArIDFdKSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHEgPSBsaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICBsaXN0W2ldID0gbGlzdFtpICsgMV07XG4gICAgICAgICAgICAgICAgICAgIGxpc3RbaSArIDFdID0gcTtcbiAgICAgICAgICAgICAgICAgICAgc3dhcCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSAvLyBmb3JcbiAgICAgICAgICAgIHQtLTtcblxuICAgICAgICAgICAgaWYgKCFzd2FwKSBicmVhaztcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IHQ7IGkgPiBiOyAtLWkpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29tcF9mdW5jKGxpc3RbaV0sIGxpc3RbaSAtIDFdKSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHEgPSBsaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICBsaXN0W2ldID0gbGlzdFtpIC0gMV07XG4gICAgICAgICAgICAgICAgICAgIGxpc3RbaSAtIDFdID0gcTtcbiAgICAgICAgICAgICAgICAgICAgc3dhcCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSAvLyBmb3JcbiAgICAgICAgICAgIGIrKztcblxuICAgICAgICB9IC8vIHdoaWxlKHN3YXApXG4gICAgfVxufVxuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgIFN1cHBvcnRpbmcgZnVuY3Rpb25zOiBidW5kbGVkIGhlcmUgdG8gYXZvaWQgZGVwZW5kaW5nIG9uIGEgbGlicmFyeVxuICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG5cbi8vIERlYW4gRWR3YXJkcy9NYXR0aGlhcyBNaWxsZXIvSm9obiBSZXNpZ1xuXG4vKiBmb3IgTW96aWxsYS9PcGVyYTkgKi9cbmlmIChkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgc29ydHRhYmxlLmluaXQsIGZhbHNlKTtcbn1cblxuLyogZm9yIEludGVybmV0IEV4cGxvcmVyICovXG4vKkBjY19vbiBAKi9cbi8qQGlmIChAX3dpbjMyKVxuICAgIGRvY3VtZW50LndyaXRlKFwiPHNjcmlwdCBpZD1fX2llX29ubG9hZCBkZWZlciBzcmM9amF2YXNjcmlwdDp2b2lkKDApPjxcXC9zY3JpcHQ+XCIpO1xuICAgIHZhciBzY3JpcHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIl9faWVfb25sb2FkXCIpO1xuICAgIHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PSBcImNvbXBsZXRlXCIpIHtcbiAgICAgICAgICAgIHNvcnR0YWJsZS5pbml0KCk7IC8vIGNhbGwgdGhlIG9ubG9hZCBoYW5kbGVyXG4gICAgICAgIH1cbiAgICB9O1xuLypAZW5kIEAqL1xuXG4vKiBmb3IgU2FmYXJpICovXG5pZiAoL1dlYktpdC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpIHsgLy8gc25pZmZcbiAgICB2YXIgX3RpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICgvbG9hZGVkfGNvbXBsZXRlLy50ZXN0KGRvY3VtZW50LnJlYWR5U3RhdGUpKSB7XG4gICAgICAgICAgICBzb3J0dGFibGUuaW5pdCgpOyAvLyBjYWxsIHRoZSBvbmxvYWQgaGFuZGxlclxuICAgICAgICB9XG4gICAgfSwgMTApO1xufVxuXG4vKiBmb3Igb3RoZXIgYnJvd3NlcnMgKi9cbndpbmRvdy5vbmxvYWQgPSBzb3J0dGFibGUuaW5pdDtcblxuLy8gd3JpdHRlbiBieSBEZWFuIEVkd2FyZHMsIDIwMDVcbi8vIHdpdGggaW5wdXQgZnJvbSBUaW5vIFppamRlbCwgTWF0dGhpYXMgTWlsbGVyLCBEaWVnbyBQZXJpbmlcblxuLy8gaHR0cDovL2RlYW4uZWR3YXJkcy5uYW1lL3dlYmxvZy8yMDA1LzEwL2FkZC1ldmVudC9cblxuZnVuY3Rpb24gZGVhbl9hZGRFdmVudChlbGVtZW50LCB0eXBlLCBoYW5kbGVyKSB7XG4gICAgaWYgKGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciwgZmFsc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGFzc2lnbiBlYWNoIGV2ZW50IGhhbmRsZXIgYSB1bmlxdWUgSURcbiAgICAgICAgaWYgKCFoYW5kbGVyLiQkZ3VpZCkgaGFuZGxlci4kJGd1aWQgPSBkZWFuX2FkZEV2ZW50Lmd1aWQrKztcbiAgICAgICAgLy8gY3JlYXRlIGEgaGFzaCB0YWJsZSBvZiBldmVudCB0eXBlcyBmb3IgdGhlIGVsZW1lbnRcbiAgICAgICAgaWYgKCFlbGVtZW50LmV2ZW50cykgZWxlbWVudC5ldmVudHMgPSB7fTtcbiAgICAgICAgLy8gY3JlYXRlIGEgaGFzaCB0YWJsZSBvZiBldmVudCBoYW5kbGVycyBmb3IgZWFjaCBlbGVtZW50L2V2ZW50IHBhaXJcbiAgICAgICAgdmFyIGhhbmRsZXJzID0gZWxlbWVudC5ldmVudHNbdHlwZV07XG4gICAgICAgIGlmICghaGFuZGxlcnMpIHtcbiAgICAgICAgICAgIGhhbmRsZXJzID0gZWxlbWVudC5ldmVudHNbdHlwZV0gPSB7fTtcbiAgICAgICAgICAgIC8vIHN0b3JlIHRoZSBleGlzdGluZyBldmVudCBoYW5kbGVyIChpZiB0aGVyZSBpcyBvbmUpXG4gICAgICAgICAgICBpZiAoZWxlbWVudFtcIm9uXCIgKyB0eXBlXSkge1xuICAgICAgICAgICAgICAgIGhhbmRsZXJzWzBdID0gZWxlbWVudFtcIm9uXCIgKyB0eXBlXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBzdG9yZSB0aGUgZXZlbnQgaGFuZGxlciBpbiB0aGUgaGFzaCB0YWJsZVxuICAgICAgICBoYW5kbGVyc1toYW5kbGVyLiQkZ3VpZF0gPSBoYW5kbGVyO1xuICAgICAgICAvLyBhc3NpZ24gYSBnbG9iYWwgZXZlbnQgaGFuZGxlciB0byBkbyBhbGwgdGhlIHdvcmtcbiAgICAgICAgZWxlbWVudFtcIm9uXCIgKyB0eXBlXSA9IGhhbmRsZUV2ZW50O1xuICAgIH1cbn07XG4vLyBhIGNvdW50ZXIgdXNlZCB0byBjcmVhdGUgdW5pcXVlIElEc1xuZGVhbl9hZGRFdmVudC5ndWlkID0gMTtcblxuZnVuY3Rpb24gcmVtb3ZlRXZlbnQoZWxlbWVudCwgdHlwZSwgaGFuZGxlcikge1xuICAgIGlmIChlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIsIGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBkZWxldGUgdGhlIGV2ZW50IGhhbmRsZXIgZnJvbSB0aGUgaGFzaCB0YWJsZVxuICAgICAgICBpZiAoZWxlbWVudC5ldmVudHMgJiYgZWxlbWVudC5ldmVudHNbdHlwZV0pIHtcbiAgICAgICAgICAgIGRlbGV0ZSBlbGVtZW50LmV2ZW50c1t0eXBlXVtoYW5kbGVyLiQkZ3VpZF07XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5mdW5jdGlvbiBoYW5kbGVFdmVudChldmVudCkge1xuICAgIHZhciByZXR1cm5WYWx1ZSA9IHRydWU7XG4gICAgLy8gZ3JhYiB0aGUgZXZlbnQgb2JqZWN0IChJRSB1c2VzIGEgZ2xvYmFsIGV2ZW50IG9iamVjdClcbiAgICBldmVudCA9IGV2ZW50IHx8IGZpeEV2ZW50KCgodGhpcy5vd25lckRvY3VtZW50IHx8IHRoaXMuZG9jdW1lbnQgfHwgdGhpcykucGFyZW50V2luZG93IHx8IHdpbmRvdykuZXZlbnQpO1xuICAgIC8vIGdldCBhIHJlZmVyZW5jZSB0byB0aGUgaGFzaCB0YWJsZSBvZiBldmVudCBoYW5kbGVyc1xuICAgIHZhciBoYW5kbGVycyA9IHRoaXMuZXZlbnRzW2V2ZW50LnR5cGVdO1xuICAgIC8vIGV4ZWN1dGUgZWFjaCBldmVudCBoYW5kbGVyXG4gICAgZm9yICh2YXIgaSBpbiBoYW5kbGVycykge1xuICAgICAgICB0aGlzLiQkaGFuZGxlRXZlbnQgPSBoYW5kbGVyc1tpXTtcbiAgICAgICAgaWYgKHRoaXMuJCRoYW5kbGVFdmVudChldmVudCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbn07XG5cbmZ1bmN0aW9uIGZpeEV2ZW50KGV2ZW50KSB7XG4gICAgLy8gYWRkIFczQyBzdGFuZGFyZCBldmVudCBtZXRob2RzXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQgPSBmaXhFdmVudC5wcmV2ZW50RGVmYXVsdDtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24gPSBmaXhFdmVudC5zdG9wUHJvcGFnYXRpb247XG4gICAgcmV0dXJuIGV2ZW50O1xufTtcbmZpeEV2ZW50LnByZXZlbnREZWZhdWx0ID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xufTtcbmZpeEV2ZW50LnN0b3BQcm9wYWdhdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuY2FuY2VsQnViYmxlID0gdHJ1ZTtcbn1cblxuLy8gRGVhbidzIGZvckVhY2g6IGh0dHA6Ly9kZWFuLmVkd2FyZHMubmFtZS9iYXNlL2ZvckVhY2guanNcbi8qXG5cdGZvckVhY2gsIHZlcnNpb24gMS4wXG5cdENvcHlyaWdodCAyMDA2LCBEZWFuIEVkd2FyZHNcblx0TGljZW5zZTogaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiovXG5cbi8vIGFycmF5LWxpa2UgZW51bWVyYXRpb25cbmlmICghQXJyYXkuZm9yRWFjaCkgeyAvLyBtb3ppbGxhIGFscmVhZHkgc3VwcG9ydHMgdGhpc1xuICAgIEFycmF5LmZvckVhY2ggPSBmdW5jdGlvbihhcnJheSwgYmxvY2ssIGNvbnRleHQpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYmxvY2suY2FsbChjb250ZXh0LCBhcnJheVtpXSwgaSwgYXJyYXkpO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuLy8gZ2VuZXJpYyBlbnVtZXJhdGlvblxuRnVuY3Rpb24ucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbihvYmplY3QsIGJsb2NrLCBjb250ZXh0KSB7XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvdG90eXBlW2tleV0gPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgYmxvY2suY2FsbChjb250ZXh0LCBvYmplY3Rba2V5XSwga2V5LCBvYmplY3QpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuLy8gY2hhcmFjdGVyIGVudW1lcmF0aW9uXG5TdHJpbmcuZm9yRWFjaCA9IGZ1bmN0aW9uKHN0cmluZywgYmxvY2ssIGNvbnRleHQpIHtcbiAgICBBcnJheS5mb3JFYWNoKHN0cmluZy5zcGxpdChcIlwiKSwgZnVuY3Rpb24oY2hyLCBpbmRleCkge1xuICAgICAgICBibG9jay5jYWxsKGNvbnRleHQsIGNociwgaW5kZXgsIHN0cmluZyk7XG4gICAgfSk7XG59O1xuXG4vLyBnbG9iYWxseSByZXNvbHZlIGZvckVhY2ggZW51bWVyYXRpb25cbnZhciBmb3JFYWNoID0gZnVuY3Rpb24ob2JqZWN0LCBibG9jaywgY29udGV4dCkge1xuICAgIGlmIChvYmplY3QpIHtcbiAgICAgICAgdmFyIHJlc29sdmUgPSBPYmplY3Q7IC8vIGRlZmF1bHRcbiAgICAgICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgICAgICAvLyBmdW5jdGlvbnMgaGF2ZSBhIFwibGVuZ3RoXCIgcHJvcGVydHlcbiAgICAgICAgICAgIHJlc29sdmUgPSBGdW5jdGlvbjtcbiAgICAgICAgfSBlbHNlIGlmIChvYmplY3QuZm9yRWFjaCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgICAgICAvLyB0aGUgb2JqZWN0IGltcGxlbWVudHMgYSBjdXN0b20gZm9yRWFjaCBtZXRob2Qgc28gdXNlIHRoYXRcbiAgICAgICAgICAgIG9iamVjdC5mb3JFYWNoKGJsb2NrLCBjb250ZXh0KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb2JqZWN0ID09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIC8vIHRoZSBvYmplY3QgaXMgYSBzdHJpbmdcbiAgICAgICAgICAgIHJlc29sdmUgPSBTdHJpbmc7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9iamVjdC5sZW5ndGggPT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgLy8gdGhlIG9iamVjdCBpcyBhcnJheS1saWtlXG4gICAgICAgICAgICByZXNvbHZlID0gQXJyYXk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzb2x2ZS5mb3JFYWNoKG9iamVjdCwgYmxvY2ssIGNvbnRleHQpO1xuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc29ydHRhYmxlIiwibGV0IHNvcnR0YWJsZSA9IHJlcXVpcmUoXCIuL3NvcnR0YWJsZS5qc1wiKVxuXG5mdW5jdGlvbiBnZW5lcmF0ZVRhYmxlSGVhZCh0YWJsZSwgdGFibGVNZXRhKSB7XG4gICAgY29uc3QgdGhlYWQgPSB0YWJsZS5jcmVhdGVUSGVhZCgpO1xuICAgIGNvbnN0IHJvdyA9IHRoZWFkLmluc2VydFJvdygpO1xuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHRhYmxlTWV0YSkpIHtcbiAgICAgICAgY29uc3QgdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGhcIik7XG4gICAgICAgIGNvbnN0IGFiYnIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYWJiclwiKVxuICAgICAgICBhYmJyLnRpdGxlID0gdmFsdWUuYWJiclxuICAgICAgICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodmFsdWUudGV4dCk7XG4gICAgICAgIGFiYnIuYXBwZW5kQ2hpbGQodGV4dClcbiAgICAgICAgdGguYXBwZW5kQ2hpbGQoYWJicik7XG4gICAgICAgIHJvdy5hcHBlbmRDaGlsZCh0aCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZVRhYmxlKHRhYmxlLCBkYXNoYm9hcmQsIHRhYmxlTWV0YSwgbWFwTGlua3MsIHJlZ2lvbk5hbWVzLCB0b3BSZWdpb24sIGluY2lkZW50TGlua3MpIHtcbiAgICBmb3IgKGNvbnN0IHJlZ2lvbiBvZiBkYXNoYm9hcmQucmVnaW9ucykge1xuICAgICAgICAvLyB0cnVlIGlmIHRoZSBjdXJyZW50IHJlZ2lvbiBzaG91bGQgYmUgYXQgdGhlIHRvcCB3aGVuIGxvYWRpbmcgdGhlIHBhZ2VcbiAgICAgICAgY29uc3QgYXRUb3AgPSByZWdpb24ubmFtZSA9PT0gdG9wUmVnaW9uXG5cbiAgICAgICAgbGV0IHNob3duTmFtZVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgc2hvd25OYW1lID0gcmVnaW9uTmFtZXNbcmVnaW9uLm5hbWVdW1wiREVcIl1cbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZWdpb24ubmFtZSArIFwiIG5vdCBmb3VuZCBpbiByZWdpb25OYW1lcy5qc29uXCIpXG4gICAgICAgICAgICBzaG93bk5hbWUgPSByZWdpb24ubmFtZVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgcm93ID0gdGFibGUuaW5zZXJ0Um93KCk7XG4gICAgICAgIC8vIG5hbWUgY29sdW1uXG4gICAgICAgIGNvbnN0IHRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpXG4gICAgICAgIHRoLnNldEF0dHJpYnV0ZShcImRhdGEtbGFiZWxcIiwgc2hvd25OYW1lKVxuICAgICAgICB0aC5jbGFzc05hbWUgPSBcImhhcy10ZXh0LWNlbnRlcmVkIGhhcy10ZXh0LXdlaWdodC1ib2xkXCJcblxuICAgICAgICBjb25zdCBsaW5rID0gbWFwTGlua3NbcmVnaW9uLm5hbWVdXG4gICAgICAgIGNvbnN0IHRleHROYW1lID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoc2hvd25OYW1lKTtcbiAgICAgICAgaWYgKGxpbmsgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGguYXBwZW5kQ2hpbGQodGV4dE5hbWUpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIilcbiAgICAgICAgICAgIGEuaHJlZiA9IGxpbmtcbiAgICAgICAgICAgIGEuYXBwZW5kQ2hpbGQodGV4dE5hbWUpXG4gICAgICAgICAgICB0aC5hcHBlbmRDaGlsZChhKVxuICAgICAgICB9XG4gICAgICAgIHJvdy5hcHBlbmRDaGlsZCh0aClcbiAgICAgICAgbGV0IGRpZmZzID0gdHJ1ZVxuICAgICAgICBpZiAoZGFzaGJvYXJkLmRpZmZEYXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGRpZmZzID0gZmFsc2VcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHN0YXQgY29sdW1uc1xuICAgICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhyZWdpb24pKSB7XG4gICAgICAgICAgICBpZiAoW1wicmlkZXNcIiwgXCJpbmNpZGVudHNcIiwgXCJzY2FyeUluY2lkZW50c1wiLCBcImttXCJdLmluY2x1ZGVzKGtleSkpIHtcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZVN0YXRDb2x1bW4ocm93LCBrZXksIHZhbHVlLCB0YWJsZU1ldGEsIGRpZmZzLCBhdFRvcCwgaW5jaWRlbnRMaW5rc1tyZWdpb24ubmFtZV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG4vLyBrZXkgPSByaWRlcywgdmFsdWUgPSBbMTAwLCAxXSwgZGlmZnMgPSB0cnVlL2ZhbHNlLCBhdFRvcCA9IHRydWUvZmFsc2VcbmZ1bmN0aW9uIGdlbmVyYXRlU3RhdENvbHVtbihyb3csIGtleSwgdmFsdWUsIHRhYmxlTWV0YSwgZGlmZnMsIGF0VG9wLCBpbmNpZGVudExpbmspIHtcbiAgICAvLyBjcmVhdGUgY2VsbCBhbmQgYXBwZW5kIGFscmVhZHkgdG8gcm93XG4gICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKVxuICAgIGNlbGwuc2V0QXR0cmlidXRlKFwiZGF0YS1sYWJlbFwiLCB0YWJsZU1ldGFba2V5XS50ZXh0KTtcbiAgICByb3cuYXBwZW5kQ2hpbGQoY2VsbClcblxuICAgIC8vIGNyZWF0ZSBkaXZcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgZGl2LmNsYXNzTmFtZSA9IFwiaXMtZmxleCBpcy1hbGlnbi1pdGVtcy1jZW50ZXJcIjtcblxuICAgIC8vIGNyZWF0ZSB0b3RhbCBzcGFuXG4gICAgY29uc3QgdG90YWxTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIilcbiAgICB0b3RhbFNwYW4uY2xhc3NOYW1lID0gXCJ0YWcgaXMtbWVkaXVtIG1yLTEgaXMtZmxleC1ncm93LTFcIlxuICAgIC8vIGNyZWF0ZSB0b3RhbCBzcGFuIHRleHQuXG4gICAgbGV0IHRvdGFsU3BhbkNoaWxkO1xuICAgIC8vIGNyZWF0ZSBhIGhyZWYgcmVmZXJlbmNpbmcgdG8gdGhlIGluY2lkZW50IG1hcCwgaWYgXCJpbmNpZGVudHNcIi1jZWxsIGlzIGJlaW5nIGNyZWF0ZWRcbiAgICBpZiAoKGtleSA9PT0gJ2luY2lkZW50cycpICYmIChpbmNpZGVudExpbmsgIT09IHVuZGVmaW5lZCkpIHtcbiAgICAgICAgdG90YWxTcGFuQ2hpbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKVxuICAgICAgICB0b3RhbFNwYW5DaGlsZC5ocmVmID0gaW5jaWRlbnRMaW5rXG4gICAgICAgIGxldCB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodmFsdWVbMF0udG9Mb2NhbGVTdHJpbmcoKSlcbiAgICAgICAgdG90YWxTcGFuQ2hpbGQuYXBwZW5kQ2hpbGQodGV4dClcbiAgICB9IGVsc2UgeyAvLyBvdGhlcndpc2UsIGp1c3QgcHJpbnQgdGhlIHRleHRcbiAgICAgICAgdG90YWxTcGFuQ2hpbGQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh2YWx1ZVswXS50b0xvY2FsZVN0cmluZygpKVxuICAgIH1cblxuICAgIGlmICghYXRUb3ApIHtcbiAgICAgICAgLy8gc2V0IHNvcnQta2V5IG9mIGNlbGwgdG8gdmFsdWUgKG5vcm1hbCBzb3J0aW5nKVxuICAgICAgICBjZWxsLnNldEF0dHJpYnV0ZShcInNvcnR0YWJsZV9jdXN0b21rZXlcIiwgdmFsdWVbMF0udG9TdHJpbmcoKSlcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyB0aGUgZ2l2ZW4gY2VsbCBzaG91bGQgYmUgYXQgdGhlIHRvcCwgc28gYWRkIGEgdmVyeSBsYXJnZSB0b3Ata2V5XG4gICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKFwic29ydHRhYmxlX2N1c3RvbWtleVwiLCBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUilcbiAgICB9XG5cbiAgICAvLyBhcHBlbmQgZWxlbWVudHNcbiAgICB0b3RhbFNwYW4uYXBwZW5kQ2hpbGQodG90YWxTcGFuQ2hpbGQpXG4gICAgZGl2LmFwcGVuZENoaWxkKHRvdGFsU3BhbilcblxuICAgIGlmIChkaWZmcykge1xuICAgICAgICAvLyBjcmVhdGUgZGlmZiBzcGFuXG4gICAgICAgIGNvbnN0IGRpdlNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKVxuICAgICAgICBjb25zdCBpY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIilcbiAgICAgICAgaWNvbi5jbGFzc05hbWUgPSBcInVuaWNvZGUtaWNvblwiXG4gICAgICAgIGlmICh2YWx1ZVsxXSA+IDApIHtcbiAgICAgICAgICAgIGRpdlNwYW4uY2xhc3NOYW1lID0gXCJ0YWcgXCIgKyB0YWJsZU1ldGFba2V5XS50YWdcbiAgICAgICAgICAgIGljb24udGV4dENvbnRlbnQgPSBcIuKshlwiXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkaXZTcGFuLmNsYXNzTmFtZSA9IFwidGFnXCJcbiAgICAgICAgICAgIGljb24udGV4dENvbnRlbnQgPSBcIuKeoVwiXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaWNvblRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKVxuICAgICAgICBpY29uVGV4dC5jbGFzc05hbWUgPSBcImljb24tdGV4dCBpcy1mbGV4LXdyYXAtbm93cmFwXCJcbiAgICAgICAgY29uc3QgaWNvblNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKVxuICAgICAgICBpY29uU3Bhbi5jbGFzc05hbWUgPSBcImljb24gbXItMFwiXG4gICAgICAgIGNvbnN0IGRpZmZWYWx1ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpXG4gICAgICAgIGRpZmZWYWx1ZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh2YWx1ZVsxXS50b0xvY2FsZVN0cmluZygpKSlcblxuICAgICAgICAvLyBhcHBlbmQgZWxlbWVudHMgaW4gcmV2ZXJzZSBjcmVhdGlvbiBvcmRlciB0byBjZWxsXG4gICAgICAgIGljb25TcGFuLmFwcGVuZENoaWxkKGljb24pXG4gICAgICAgIGljb25UZXh0LmFwcGVuZENoaWxkKGljb25TcGFuKVxuICAgICAgICBpY29uVGV4dC5hcHBlbmRDaGlsZChkaWZmVmFsdWUpXG4gICAgICAgIGRpdlNwYW4uYXBwZW5kQ2hpbGQoaWNvblRleHQpXG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZChkaXZTcGFuKVxuICAgIH1cblxuICAgIGNlbGwuYXBwZW5kQ2hpbGQoZGl2KVxufVxuXG5mdW5jdGlvbiB1cGRhdGVUb3RhbHMoZGFzaGJvYXJkKSB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b3RhbFJpZGVzXCIpLmlubmVySFRNTCA9IGRhc2hib2FyZC50b3RhbFJpZGVzLnRvTG9jYWxlU3RyaW5nKClcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvdGFsSW5jaWRlbnRzXCIpLmlubmVySFRNTCA9IGRhc2hib2FyZC50b3RhbEluY2lkZW50cy50b0xvY2FsZVN0cmluZygpXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b3RhbEttXCIpLmlubmVySFRNTCA9IGRhc2hib2FyZC50b3RhbEttLnRvTG9jYWxlU3RyaW5nKClcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNvdXJjZURhdGVcIikuaW5uZXJIVE1MID0gZGFzaGJvYXJkLnNvdXJjZURhdGVcblxuICAgIGlmIChkYXNoYm9hcmQuZGlmZkRhdGUgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGlmZkRhdGVcIikuaW5uZXJIVE1MID0gZGFzaGJvYXJkLmRpZmZEYXRlXG4gICAgfSBlbHNlIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkaWZmVGV4dFwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfVxufVxuXG4vLyB0b3BSZWdpb24gY2FuIGJlIHNldCB0byB0aGUgbmFtZSBvZiBhIHJlZ2lvbiBhcyBmb3VuZCBpbiB0aGUgZGFzaGJvYXJkLmpzb247IHRoaXMgcmVnaW9uIHdpbGwgdGhlbiBiZSBzaG93biBhdCB0aGUgdG9wIG9mIHRoZSB0YWJsZVxuYXN5bmMgZnVuY3Rpb24gZmlsbFRhYmxlKHRvcFJlZ2lvbikge1xuICAgIGxldCB0YWJsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVnaW9uVGFibGVcIik7XG4gICAgbGV0IFtyMSwgcjIsIHIzLCByNCwgcjVdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICBmZXRjaChcIi4vcmVzb3VyY2VzL3RhYmxlTWV0YS5qc29uXCIpLFxuICAgICAgICBmZXRjaChcIi4vcmVzb3VyY2VzL2Rhc2hib2FyZC5qc29uXCIpLFxuICAgICAgICBmZXRjaChcIi4vcmVzb3VyY2VzL21hcExpbmtzLmpzb25cIiksXG4gICAgICAgIGZldGNoKFwiLi9yZXNvdXJjZXMvcmVnaW9uTmFtZXMuanNvblwiKSxcbiAgICAgICAgZmV0Y2goXCIuL3Jlc291cmNlcy9pbmNpZGVudExpbmtzLmpzb25cIilcbiAgICBdKVxuXG4gICAgbGV0IHRhYmxlTWV0YSA9IGF3YWl0IHIxLmpzb24oKVxuICAgIGxldCBkYXNoYm9hcmQgPSBhd2FpdCByMi5qc29uKClcbiAgICBsZXQgbWFwTGlua3MgPSBhd2FpdCByMy5qc29uKClcbiAgICBsZXQgcmVnaW9uTmFtZXMgPSBhd2FpdCByNC5qc29uKClcbiAgICBsZXQgaW5jaWRlbnRMaW5rcyA9IGF3YWl0IHI1Lmpzb24oKVxuXG4gICAgdXBkYXRlVG90YWxzKGRhc2hib2FyZCk7XG4gICAgZ2VuZXJhdGVUYWJsZSh0YWJsZSwgZGFzaGJvYXJkLCB0YWJsZU1ldGEsIG1hcExpbmtzLCByZWdpb25OYW1lcywgdG9wUmVnaW9uLCBpbmNpZGVudExpbmtzKTtcbiAgICBnZW5lcmF0ZVRhYmxlSGVhZCh0YWJsZSwgdGFibGVNZXRhKTtcblxuICAgIHNvcnR0YWJsZS5tYWtlU29ydGFibGUodGFibGUpXG4gICAgLy8gdHJpZ2dlciB0aGUgc29ydGluZyBieSBjbGlja2luZyB0aGUgYnV0dG9uIG9mIHRoZSAjRmFocnRlbiBjb2x1bW5cbiAgICBjb25zdCBzb3J0QnV0dG9uID0gdGFibGUuZmlyc3RFbGVtZW50Q2hpbGQuZmlyc3RFbGVtZW50Q2hpbGQuY2hpbGRyZW5bMV1cbiAgICBzb3J0QnV0dG9uLmNsaWNrKClcbiAgICBzb3J0QnV0dG9uLmNsaWNrKClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmaWxsVGFibGU7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInJlcXVpcmUoJy4vbXlzdHlsZXMuc2NzcycpO1xuY29uc3QgZmlsbFRhYmxlID0gcmVxdWlyZShcIi4vdGFibGUuanNcIilcblxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVsZXRlSW5mb1wiKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGV2ZW50LnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUucmVtb3ZlKCkpXG4gICAgfSk7XG5cbiAgICAvLyB1c2VycyBjYW4gc3VwcGx5IGEgcmVnaW9uIG5hbWUgdGhhdCB3aWxsIGJlIGxpc3RlZCBhdCB0aGUgdG9wXG4gICAgY29uc3QgdG9wUmVnaW9uID0gZ2V0UGFyYW1ldGVyQnlOYW1lKCdyZWdpb24nKVxuICAgIFxuICAgIGZpbGxUYWJsZSh0b3BSZWdpb24pXG59XG5cbi8qKlxuICogU291cmNlOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy85MDExMTUvaG93LWNhbi1pLWdldC1xdWVyeS1zdHJpbmctdmFsdWVzLWluLWphdmFzY3JpcHQ/cnE9MVxuICovXG5cbmZ1bmN0aW9uIGdldFBhcmFtZXRlckJ5TmFtZShuYW1lLCB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZikge1xuICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoL1tcXFtcXF1dL2csICdcXFxcJCYnKTtcbiAgICB2YXIgcmVnZXggPSBuZXcgUmVnRXhwKCdbPyZdJyArIG5hbWUgKyAnKD0oW14mI10qKXwmfCN8JCknKSxcbiAgICAgICAgcmVzdWx0cyA9IHJlZ2V4LmV4ZWModXJsKTtcbiAgICBpZiAoIXJlc3VsdHMpIHJldHVybiBudWxsO1xuICAgIGlmICghcmVzdWx0c1syXSkgcmV0dXJuICcnO1xuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQocmVzdWx0c1syXS5yZXBsYWNlKC9cXCsvZywgJyAnKSk7XG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9