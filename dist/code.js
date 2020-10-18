function onOpen() {}

function openSidebar() {}

function quickInsert() {}

function generateLoremIpsum() {}

function getLanguage() {}

function insertAtCaret() {}

!function(e, a) {
    for (var i in a) e[i] = a[i];
}(this, /******/ function(modules) {
    // webpackBootstrap
    /******/ // The module cache
    /******/ var installedModules = {};
    /******/
    /******/ // The require function
    /******/    function __webpack_require__(moduleId) {
        /******/
        /******/ // Check if module is in cache
        /******/ if (installedModules[moduleId]) 
        /******/ return installedModules[moduleId].exports;
        /******/
        /******/ // Create a new module (and put it into the cache)
        /******/        var module = installedModules[moduleId] = {
            /******/ i: moduleId,
            /******/ l: !1,
            /******/ exports: {}
            /******/        };
        /******/
        /******/ // Execute the module function
        /******/        
        /******/
        /******/ // Return the exports of the module
        /******/ return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
        /******/
        /******/ // Flag the module as loaded
        /******/ module.l = !0, module.exports;
        /******/    }
    /******/
    /******/
    /******/ // expose the modules object (__webpack_modules__)
    /******/    
    /******/
    /******/
    /******/ // Load entry module and return exports
    /******/ return __webpack_require__.m = modules, 
    /******/
    /******/ // expose the module cache
    /******/ __webpack_require__.c = installedModules, 
    /******/
    /******/ // define getter function for harmony exports
    /******/ __webpack_require__.d = function(exports, name, getter) {
        /******/ __webpack_require__.o(exports, name) || 
        /******/ Object.defineProperty(exports, name, {
            enumerable: !0,
            get: getter
        })
        /******/;
    }, 
    /******/
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = function(exports) {
        /******/ "undefined" != typeof Symbol && Symbol.toStringTag && 
        /******/ Object.defineProperty(exports, Symbol.toStringTag, {
            value: "Module"
        })
        /******/ , Object.defineProperty(exports, "__esModule", {
            value: !0
        });
    }, 
    /******/
    /******/ // create a fake namespace object
    /******/ // mode & 1: value is a module id, require it
    /******/ // mode & 2: merge all properties of value into the ns
    /******/ // mode & 4: return value when already ns object
    /******/ // mode & 8|1: behave like require
    /******/ __webpack_require__.t = function(value, mode) {
        /******/ if (
        /******/ 1 & mode && (value = __webpack_require__(value)), 8 & mode) return value;
        /******/        if (4 & mode && "object" == typeof value && value && value.__esModule) return value;
        /******/        var ns = Object.create(null);
        /******/        
        /******/ if (__webpack_require__.r(ns), 
        /******/ Object.defineProperty(ns, "default", {
            enumerable: !0,
            value: value
        }), 2 & mode && "string" != typeof value) for (var key in value) __webpack_require__.d(ns, key, function(key) {
            return value[key];
        }.bind(null, key));
        /******/        return ns;
        /******/    }, 
    /******/
    /******/ // getDefaultExport function for compatibility with non-harmony modules
    /******/ __webpack_require__.n = function(module) {
        /******/ var getter = module && module.__esModule ? 
        /******/ function getDefault() {
            return module["default"];
        } : 
        /******/ function getModuleExports() {
            return module;
        };
        /******/        
        /******/ return __webpack_require__.d(getter, "a", getter), getter;
        /******/    }, 
    /******/
    /******/ // Object.prototype.hasOwnProperty.call
    /******/ __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    }, 
    /******/
    /******/ // __webpack_public_path__
    /******/ __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 3);
    /******/}
/************************************************************************/
/******/ ([ 
/* 0 */
/***/ function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    // EXPORTS
        __webpack_require__.d(__webpack_exports__, "d", (function() {
        /* binding */ return onOpen;
    })), __webpack_require__.d(__webpack_exports__, "e", (function() {
        /* binding */ return openSidebar;
    })), __webpack_require__.d(__webpack_exports__, "f", (function() {
        /* binding */ return quickInsert;
    })), __webpack_require__.d(__webpack_exports__, "a", (function() {
        /* binding */ return generateLoremIpsum;
    })), __webpack_require__.d(__webpack_exports__, "b", (function() {
        /* binding */ return getLanguage;
    })), __webpack_require__.d(__webpack_exports__, "c", (function() {
        /* binding */ return insertAtCaret;
    }));
    // EXTERNAL MODULE: ./src/_locales/en/messages.json
    var messages = __webpack_require__(1), sv_messages = __webpack_require__(2), _locales_i18n = function(lang, messageName) {
        var json;
        switch (lang) {
          case "sv":
            json = sv_messages;
            break;

          case "en":
          default:
            json = messages;
        }
        return json[messageName] || messageName;
    }, getLanguage = function() {
        return "sv" === Session.getActiveUserLocale().toLowerCase().split("-")[0] ? "sv" : "en";
    }, onOpen = function() {
        var lang = getLanguage(), primaryLabel = _locales_i18n(lang, "primary_menu_item"), quickInsertLabel = _locales_i18n(lang, "quick_insert_menu_item");
        DocumentApp.getUi().createAddonMenu().addItem(primaryLabel, "openSidebar").addItem(quickInsertLabel, "quickInsert").addToUi();
    }, openSidebar = function() {
        var html = HtmlService.createHtmlOutputFromFile("sidebar").setTitle("Lorem Ipsum Dummy Text");
        DocumentApp.getUi().showSidebar(html);
    }, quickInsert = function() {
        try {
            insertAtCaret("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi maximus libero vel lacus interdum blandit. Donec at nibh mauris. Aenean tempus vestibulum congue. Ut ante tortor, elementum vitae orci vitae, feugiat rhoncus diam. Donec eget turpis dolor. In vitae velit cursus, efficitur lectus in, interdum lorem. Donec efficitur leo at velit consectetur venenatis at id nibh. Curabitur sit amet sagittis ex. Donec ut sollicitudin tortor. Maecenas commodo placerat orci. Nullam ac sem vitae lorem tempus porttitor vel in nisi. Mauris fermentum mi sit amet placerat elementum.");
        } catch (error) {
            message = error.message, DocumentApp.getUi().alert(message);
        }
        var message;
    }, generateLoremIpsum = function(paragraphs, length) {
        void 0 === paragraphs && (paragraphs = 1), void 0 === length && (length = "medium");
        var url = "https://loripsum.net/api/" + paragraphs + "/" + length + "/plaintext/";
        return UrlFetchApp.fetch(url).getContentText().trim();
    }, insertAtCaret = function(text) {
        void 0 === text && (text = "");
        var cursor = DocumentApp.getActiveDocument().getCursor();
        if (!cursor) {
            lang = getLanguage();
            throw new Error(_locales_i18n(lang, "error_no_caret"));
        }
        if (!cursor.insertText(text)) {
            var lang = getLanguage();
            throw new Error(_locales_i18n(lang, "error_no_insert"));
        }
    };
    // EXTERNAL MODULE: ./src/_locales/sv/messages.json
}, 
/* 1 */
/***/ function(module) {
    module.exports = JSON.parse('{"primary_menu_item":"Start","quick_insert_menu_item":"Quick Insert","generate_header":"Create Dummy Text","p_len_header":"Average Paragraph Length","p_len_short":"Short","p_len_medium":"Medium","p_len_long":"Long","p_len_v_long":"Very Long","num_p_header":"Number of Paragraphs","generate_btn_text":"Create","generated_text_header":"Dummy Text","copy_btn_text":"Copy to Clipboard","insert_btn_text":"Insert","copied_notice":"Copied to clipboard!","generate_btn_text_loading":"Creating...","copy_btn_text_loading":"Copying...","insert_btn_text_loading":"Inserting...","error_no_insert":"Cannot insert text here.","error_no_caret":"Cannot find a cursor."}');
    /***/}, 
/* 2 */
/***/ function(module) {
    module.exports = JSON.parse('{"primary_menu_item":"Starta","quick_insert_menu_item":"Snabbinfoga","generate_header":"Skapa platshållartext","p_len_header":"Genomsnittlig längd på paragraf","p_len_short":"Kort","p_len_medium":"Mellan","p_len_long":"Lång","p_len_v_long":"Jättelång","num_p_header":"Antal paragrafer","generate_btn_text":"Generera","generate_btn_text_loading":"Genererar...","generated_text_header":"Din platshållartext","copy_btn_text":"Kopiera till urklipp","copy_btn_text_loading":"Kopierar...","insert_btn_text":"Infoga","insert_btn_text_loading":"Infogar...","copied_notice":"Kopierat till urkipp!","error_no_insert":"Det går inte att infoga text där.","error_no_caret":"Hittade ingen insättningspunkt."}');
    /***/}, 
/* 3 */
/***/ function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__), 
    /* WEBPACK VAR INJECTION */ function(global) {
        /* harmony import */ var _docs_utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
        global.onOpen = _docs_utilities__WEBPACK_IMPORTED_MODULE_0__.d, global.openSidebar = _docs_utilities__WEBPACK_IMPORTED_MODULE_0__.e, 
        global.quickInsert = _docs_utilities__WEBPACK_IMPORTED_MODULE_0__.f, global.generateLoremIpsum = _docs_utilities__WEBPACK_IMPORTED_MODULE_0__.a, 
        global.getLanguage = _docs_utilities__WEBPACK_IMPORTED_MODULE_0__.b, global.insertAtCaret = _docs_utilities__WEBPACK_IMPORTED_MODULE_0__.c;
    }.call(this, __webpack_require__(4))
    /***/;
}, 
/* 4 */
/***/ function(module, exports) {
    var g;
    // This works in non-strict mode
        g = function() {
        return this;
    }();
    try {
        // This works if eval is allowed (see CSP)
        g = g || new Function("return this")();
    } catch (e) {
        // This works if the window reference is available
        "object" == typeof window && (g = window);
    }
    // g can still be undefined, but nothing to do about it...
    // We return undefined, instead of nothing here, so it's
    // easier to handle this case. if(!global) { ...}
        module.exports = g;
}
/******/ ]));