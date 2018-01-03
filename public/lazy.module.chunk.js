webpackJsonp(["lazy.module"],{

/***/ "../../../../../src/app/pages/lazy/actions/page-num.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GET_PAGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SET_PAGE; });
/* unused harmony export GetPageNum */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return SetPageNum; });
/*
 * MIT License
 *
 * Copyright (c) 2017-2018 Stefano Cappa
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var GET_PAGE = '[PageNum] Get Page';
var SET_PAGE = '[PageNum] Set Page';
var GetPageNum = /** @class */ (function () {
    function GetPageNum(payload) {
        this.payload = payload;
        this.type = GET_PAGE;
    }
    return GetPageNum;
}());

var SetPageNum = /** @class */ (function () {
    function SetPageNum(payload) {
        this.payload = payload;
        this.type = SET_PAGE;
    }
    return SetPageNum;
}());



/***/ }),

/***/ "../../../../../src/app/pages/lazy/lazy.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LazyComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_components_components__ = __webpack_require__("../../../../../src/app/shared/components/components.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_services_example_service__ = __webpack_require__("../../../../../src/app/core/services/example.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngrx_store__ = __webpack_require__("../../../../@ngrx/store/@ngrx/store.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__reducers__ = __webpack_require__("../../../../../src/app/pages/lazy/reducers/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__actions_page_num__ = __webpack_require__("../../../../../src/app/pages/lazy/actions/page-num.ts");
/*
 * MIT License
 *
 * Copyright (c) 2017-2018 Stefano Cappa
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






console.log('`Lazy` component loaded asynchronously');
/**
 * Component of the lazy loaded module for the app SPA
 */
var LazyComponent = /** @class */ (function () {
    function LazyComponent(exampleService, store) {
        this.exampleService = exampleService;
        this.store = store;
        this.pageHeader = new __WEBPACK_IMPORTED_MODULE_1__shared_components_components__["a" /* PageHeader */]('LAZY', '');
        this.pageNum$ = this.store.select(__WEBPACK_IMPORTED_MODULE_4__reducers__["a" /* getPageNum */]);
        // example of ngrx-store's usage
        // subscribe to pageNum (a number, for instance the current page of a table with pagination)
        // initially is 0, after it will be 4 (see below) -> this is only an example for demonstration purpose
        this.pageNumSubscription = this.pageNum$.subscribe(function (val) {
            console.log("Page num retrieved from ngrx-store is " + val);
        });
    }
    LazyComponent.prototype.ngOnInit = function () {
        var _this = this;
        // call a service and dispatch an action to ngrx to trigger a new event into pageNum$ Observable
        this.exampleServiceSubscription = this.exampleService.getExample()
            .subscribe(function (val) {
            console.log("Result of getExample", val);
            // dispatch the setPageNum action with '4' as payload
            _this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_5__actions_page_num__["c" /* SetPageNum */](4)); // I chose a constant value for this example :)
        });
    };
    LazyComponent.prototype.ngOnDestroy = function () {
        console.log('Destroy called');
        // unsubscribe to all Subscriptions to prevent memory leaks and wrong behaviour
        if (this.pageNumSubscription) {
            this.pageNumSubscription.unsubscribe();
        }
        if (this.exampleServiceSubscription) {
            this.exampleServiceSubscription.unsubscribe();
        }
    };
    LazyComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-lazy-page',
            template: __webpack_require__("../../../../../src/app/pages/lazy/lazy.html"),
            styles: [__webpack_require__("../../../../../src/app/pages/lazy/lazy.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__core_services_example_service__["a" /* ExampleService */],
            __WEBPACK_IMPORTED_MODULE_3__ngrx_store__["h" /* Store */]])
    ], LazyComponent);
    return LazyComponent;
}());



/***/ }),

/***/ "../../../../../src/app/pages/lazy/lazy.html":
/***/ (function(module, exports) {

module.exports = "<div>\n  <app-page-header [header]=\"pageHeader\"></app-page-header>\n\n  <small>Lazy loaded module</small>\n\n  <br>\n  <br>\n  <p><strong>Please, open your browser's console to see all features of this application!!!</strong></p>\n\n  <br>\n\n  <!-- taken from https://ng-bootstrap.github.io/#/components/tabs -->\n  <ngb-tabset>\n    <ngb-tab title=\"Simple\">\n      <ng-template ngbTabContent>\n        <p>Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth\n          master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh\n          dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum\n          iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.</p>\n      </ng-template>\n    </ngb-tab>\n    <ngb-tab>\n      <ng-template ngbTabTitle><strong>Fancy</strong> title</ng-template>\n      <ng-template ngbTabContent>Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid.\n        <p>Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table\n          craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl\n          cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit. Keytar helvetica VHS salvia\n          yr, vero magna velit sapiente labore stumptown. Vegan fanny pack odio cillum wes anderson 8-bit, sustainable jean\n          shorts beard ut DIY ethical culpa terry richardson biodiesel. Art party scenester stumptown, tumblr butcher vero\n          sint qui sapiente accusamus tattooed echo park.</p>\n      </ng-template>\n    </ngb-tab>\n    <ngb-tab title=\"Disabled\" [disabled]=\"true\">\n      <ng-template ngbTabContent>\n        <p>Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth\n          master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh\n          dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum\n          iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.</p>\n      </ng-template>\n    </ngb-tab>\n  </ngb-tabset>\n\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/pages/lazy/lazy.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LazyModule", function() { return LazyModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lazy_routes__ = __webpack_require__("../../../../../src/app/pages/lazy/lazy.routes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lazy_component__ = __webpack_require__("../../../../../src/app/pages/lazy/lazy.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngrx_store__ = __webpack_require__("../../../../@ngrx/store/@ngrx/store.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__reducers__ = __webpack_require__("../../../../../src/app/pages/lazy/reducers/index.ts");
/*
 * MIT License
 *
 * Copyright (c) 2017-2018 Stefano Cappa
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









console.log('`Lazy` bundle loaded asynchronously');
/**
 * Lazy loaded module (asynchronously) to reduce the initial boot time required to start the application.
 * This module is loaded asynchronously with a network call when the app is ready to use.
 */
var LazyModule = /** @class */ (function () {
    function LazyModule() {
    }
    LazyModule.routes = __WEBPACK_IMPORTED_MODULE_4__lazy_routes__["a" /* routes */];
    LazyModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__lazy_component__["a" /* LazyComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* RouterModule */].forChild(__WEBPACK_IMPORTED_MODULE_4__lazy_routes__["a" /* routes */]),
                __WEBPACK_IMPORTED_MODULE_3__ng_bootstrap_ng_bootstrap__["a" /* NgbModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_6__shared_shared_module__["a" /* SharedModule */],
                // add ngrx to this lazy loaded module
                __WEBPACK_IMPORTED_MODULE_7__ngrx_store__["i" /* StoreModule */].forFeature('pageNum', __WEBPACK_IMPORTED_MODULE_8__reducers__["b" /* reducers */])
            ],
            providers: []
        })
    ], LazyModule);
    return LazyModule;
}());



/***/ }),

/***/ "../../../../../src/app/pages/lazy/lazy.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lazy_component__ = __webpack_require__("../../../../../src/app/pages/lazy/lazy.component.ts");
/*
 * MIT License
 *
 * Copyright (c) 2017-2018 Stefano Cappa
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * Array of lazy loaded module's routes for the app SPA
 */
var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_0__lazy_component__["a" /* LazyComponent */] }
];


/***/ }),

/***/ "../../../../../src/app/pages/lazy/lazy.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "small {\n  color: red; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/pages/lazy/reducers/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return reducers; });
/* unused harmony export selectPageNumState */
/* unused harmony export selectPageNumValState */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getPageNum; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ngrx_store__ = __webpack_require__("../../../../@ngrx/store/@ngrx/store.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__page_num__ = __webpack_require__("../../../../../src/app/pages/lazy/reducers/page-num.ts");
/*
 * MIT License
 *
 * Copyright (c) 2017-2018 Stefano Cappa
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */


var reducers = {
    pageNum: __WEBPACK_IMPORTED_MODULE_1__page_num__["b" /* reducer */]
};
var selectPageNumState = Object(__WEBPACK_IMPORTED_MODULE_0__ngrx_store__["m" /* createFeatureSelector */])('pageNum');
var selectPageNumValState = Object(__WEBPACK_IMPORTED_MODULE_0__ngrx_store__["n" /* createSelector */])(selectPageNumState, function (state) { return state.pageNum; });
var getPageNum = Object(__WEBPACK_IMPORTED_MODULE_0__ngrx_store__["n" /* createSelector */])(selectPageNumValState, __WEBPACK_IMPORTED_MODULE_1__page_num__["a" /* getPageNum */]);


/***/ }),

/***/ "../../../../../src/app/pages/lazy/reducers/page-num.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export initialState */
/* harmony export (immutable) */ __webpack_exports__["b"] = reducer;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getPageNum; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions_page_num__ = __webpack_require__("../../../../../src/app/pages/lazy/actions/page-num.ts");
/*
 * MIT License
 *
 * Copyright (c) 2017-2018 Stefano Cappa
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

var initialState = {
    pageNum: 0
};
function reducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case __WEBPACK_IMPORTED_MODULE_0__actions_page_num__["a" /* GET_PAGE */]:
            return state;
        case __WEBPACK_IMPORTED_MODULE_0__actions_page_num__["b" /* SET_PAGE */]:
            return {
                pageNum: action.payload
            };
        default:
            return state;
    }
}
var getPageNum = function (state) { return state.pageNum; };


/***/ })

});
//# sourceMappingURL=lazy.module.chunk.js.map