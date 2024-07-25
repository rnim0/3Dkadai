/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
/* harmony import */ var _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tweenjs/tween.js */ "./node_modules/@tweenjs/tween.js/dist/tween.esm.js");



class ThreeJSContainer {
    scene;
    light;
    cloud; //cloudの宣言
    particleVelocity; // 速度 3次元ベクトル
    constructor() {
    }
    // 画面部分の作成(表示する枠ごとに)*
    createRendererDOM = (width, height, cameraPos) => {
        const renderer = new three__WEBPACK_IMPORTED_MODULE_2__.WebGLRenderer();
        renderer.setSize(width, height);
        // renderer.setClearColor(new THREE.Color(0x495ed));
        renderer.shadowMap.enabled = true; //シャドウマップを有効にする
        //カメラの設定
        const camera = new three__WEBPACK_IMPORTED_MODULE_2__.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.copy(cameraPos);
        camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(0, 0, 0));
        // 背景
        renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_2__.Color(0xb3dbff));
        const orbitControls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__.OrbitControls(camera, renderer.domElement);
        this.createScene();
        // 毎フレームのupdateを呼んで，render
        // reqestAnimationFrame により次フレームを呼ぶ
        const render = (time) => {
            orbitControls.update();
            renderer.render(this.scene, camera);
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
        renderer.domElement.style.cssFloat = "left";
        renderer.domElement.style.margin = "10px";
        return renderer.domElement;
    };
    // シーンの作成(全体で1回)
    createScene = () => {
        this.scene = new three__WEBPACK_IMPORTED_MODULE_2__.Scene();
        // 軸の生成
        const axesBarLength = 10.0;
        // this.scene.add(new THREE.AxesHelper(axesBarLength));
        // 球のジオメトリを作成 スノードーム
        const sphereGeometry = new three__WEBPACK_IMPORTED_MODULE_2__.SphereGeometry(10, 32, 32);
        const sphereMaterial = new three__WEBPACK_IMPORTED_MODULE_2__.MeshPhysicalMaterial({
            color: 0xffffff,
            transmission: 1,
            opacity: 1,
            metalness: 0.01,
            roughness: 0.1,
            ior: 1.6,
            // thickness: 5,
            reflectivity: 0,
            specularIntensity: 0.5,
            side: three__WEBPACK_IMPORTED_MODULE_2__.DoubleSide,
            depthWrite: false
        });
        const sphere = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(sphereGeometry, sphereMaterial);
        this.scene.add(sphere);
        // 下の土台
        const standMaterial = new three__WEBPACK_IMPORTED_MODULE_2__.MeshLambertMaterial({ color: 0x99734d });
        const standGrometry = new three__WEBPACK_IMPORTED_MODULE_2__.CylinderGeometry(4, 5, 3, 32);
        const stand = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(standGrometry, standMaterial);
        stand.position.set(0, -10, 0);
        this.scene.add(stand);
        // 中の地面
        const groundGrometry = new three__WEBPACK_IMPORTED_MODULE_2__.CircleGeometry(8, 32);
        const groundMaterial = new three__WEBPACK_IMPORTED_MODULE_2__.MeshBasicMaterial({ color: 0xe6e6e6, side: three__WEBPACK_IMPORTED_MODULE_2__.DoubleSide });
        const ground = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(groundGrometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.position.set(0, -5, 0);
        this.scene.add(ground);
        // 雪だるま
        let createSnowman = () => {
            const hatGrometry = new three__WEBPACK_IMPORTED_MODULE_2__.CylinderGeometry(0.2, 1, 0.9, 10);
            const hatMaterial = new three__WEBPACK_IMPORTED_MODULE_2__.MeshBasicMaterial({ color: 0xff8080 });
            const hat = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(hatGrometry, hatMaterial);
            hat.position.set(0, 1.2, 0);
            const headGrometry = new three__WEBPACK_IMPORTED_MODULE_2__.SphereGeometry(1.5, 20);
            const headMaterial = new three__WEBPACK_IMPORTED_MODULE_2__.MeshBasicMaterial({ color: 0xffffff });
            const head = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(headGrometry, headMaterial);
            head.position.set(0, -0.5, 0);
            const bodyGrometry = new three__WEBPACK_IMPORTED_MODULE_2__.SphereGeometry(2, 20);
            const bodyMaterial = new three__WEBPACK_IMPORTED_MODULE_2__.MeshBasicMaterial({ color: 0xffffff });
            const body = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(bodyGrometry, bodyMaterial);
            body.position.set(0, -3, 0);
            const snowman = new three__WEBPACK_IMPORTED_MODULE_2__.Group();
            snowman.add(hat, head, body);
            snowman.position.set(3, 0, -2);
            this.scene.add(snowman);
        };
        createSnowman();
        // 家
        const house = new three__WEBPACK_IMPORTED_MODULE_2__.Group();
        const wallGeometry = new three__WEBPACK_IMPORTED_MODULE_2__.BoxGeometry(4, 4, 5);
        const wallMaterial = new three__WEBPACK_IMPORTED_MODULE_2__.MeshBasicMaterial({ color: 0xccbdb8 });
        const wall = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(wallGeometry, wallMaterial);
        wall.position.set(0, -2.99, 0);
        const roofGeometry = new three__WEBPACK_IMPORTED_MODULE_2__.ConeGeometry(4.5, 3, 32);
        const roofMaterial = new three__WEBPACK_IMPORTED_MODULE_2__.MeshBasicMaterial({ color: 0x6680cc });
        const roof = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(roofGeometry, roofMaterial);
        roof.position.set(0, 0, 0);
        const chimneyGeometry = new three__WEBPACK_IMPORTED_MODULE_2__.BoxGeometry(1, 3, 1);
        const chimneyMaterial = new three__WEBPACK_IMPORTED_MODULE_2__.MeshBasicMaterial({ color: 0x99654d });
        const chimney = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(chimneyGeometry, chimneyMaterial);
        chimney.position.set(0, 0, 2);
        house.add(wall, roof, chimney);
        house.position.set(-4, 0, 0);
        house.rotateY(3 * Math.PI / 4);
        this.scene.add(house);
        // 人
        const hatGrometry = new three__WEBPACK_IMPORTED_MODULE_2__.CylinderGeometry(0.5, 1, 0.6, 10);
        const hatMaterial = new three__WEBPACK_IMPORTED_MODULE_2__.MeshBasicMaterial({ color: 0xff8080 });
        const hat = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(hatGrometry, hatMaterial);
        hat.position.set(0, -2.5, 0);
        const headGrometry = new three__WEBPACK_IMPORTED_MODULE_2__.SphereGeometry(0.8, 20);
        const headMaterial = new three__WEBPACK_IMPORTED_MODULE_2__.MeshBasicMaterial({ color: 0xffeecc });
        const head = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(headGrometry, headMaterial);
        const human = new three__WEBPACK_IMPORTED_MODULE_2__.Group();
        const bodyGrometry = new three__WEBPACK_IMPORTED_MODULE_2__.CylinderGeometry(0.4, 0.7, 1.5, 15);
        const bodyMaterial = new three__WEBPACK_IMPORTED_MODULE_2__.MeshBasicMaterial({ color: 0x73e6bf });
        const body = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(bodyGrometry, bodyMaterial);
        body.position.set(0, -4.2, 0);
        head.position.set(0, -3, 0);
        human.add(head, body, hat);
        this.scene.add(human);
        // Tweenでコントロールする変数の定義
        let tweeninfo = { placeX: 0, placeZ: 0 };
        //  Tweenでパラメータの更新の際に呼び出される関数
        let updateScale = () => {
            human.position.x = tweeninfo.placeX;
            human.position.z = tweeninfo.placeZ;
        };
        // Tweenの作成
        const tween = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Tween(tweeninfo).to({ placeX: 5 }, 1000).onUpdate(updateScale);
        const tween2 = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Tween(tweeninfo).to({ placeX: 0, placeZ: 5 }, 900).onUpdate(updateScale);
        const tween3 = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Tween(tweeninfo).to({ placeX: 0, placeZ: 0 }, 1000).onUpdate(updateScale);
        tween.chain(tween2);
        tween2.chain(tween3);
        tween3.chain(tween);
        // アニメーションの開始
        tween.start();
        // パーティクル作成関数
        let createParticles = () => {
            //ジオメトリの作成
            const geometry = new three__WEBPACK_IMPORTED_MODULE_2__.BufferGeometry();
            //マテリアルの作成
            // const material = new THREE.PointsMaterial({ size: 1, color: 0xFFFFFF, transparent: true, opacity: 0.8 });
            // size パーティクルのサイズ color つける色 opacity:透明度 transparent:透明度の有効無効
            // テクスチャを読み込む
            const textureLoader = new three__WEBPACK_IMPORTED_MODULE_2__.TextureLoader();
            const texture = textureLoader.load('snow_mtl.png');
            const material = new three__WEBPACK_IMPORTED_MODULE_2__.PointsMaterial({ size: 1, map: texture, blending: three__WEBPACK_IMPORTED_MODULE_2__.AdditiveBlending, color: 0xffffff, depthWrite: false, transparent: true, opacity: 0.5 });
            //particleの作成
            const particleNum = 100; // パーティクルの数
            const positions = new Float32Array(particleNum * 3);
            let particleIndex = 0;
            this.particleVelocity = []; //速度
            for (let i = 0; i < particleNum; i++) {
                positions[particleIndex++] = Math.random() * 12 - 6; // x座標
                positions[particleIndex++] = Math.random() * 10 - 5; // y座標
                positions[particleIndex++] = Math.random() * 10 - 5; // z座標
                this.particleVelocity.push(new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(Math.random() * 0.05, -Math.random() * 10, 0));
            }
            // geometryに座標をセット
            geometry.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_2__.BufferAttribute(positions, 3));
            //THREE.Pointsの作成
            this.cloud = new three__WEBPACK_IMPORTED_MODULE_2__.Points(geometry, material);
            //シーンへの追加
            this.scene.add(this.cloud);
        };
        createParticles();
        const clock = new three__WEBPACK_IMPORTED_MODULE_2__.Clock();
        //ライトの設定
        this.light = new three__WEBPACK_IMPORTED_MODULE_2__.DirectionalLight(0xffffff);
        const lvec = new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(1, 1, 1).clone().normalize();
        this.light.position.set(lvec.x, lvec.y, lvec.z);
        this.scene.add(this.light);
        // 毎フレームのupdateを呼んで，更新
        // reqestAnimationFrame により次フレームを呼ぶ
        let update = (time) => {
            const deltaTime = clock.getDelta();
            const geom = this.cloud.geometry;
            const positions = geom.getAttribute('position'); // 座標データ
            for (let i = 0; i < positions.count; i++) {
                if (positions.getY(i) < -5) {
                    positions.setY(i, 8);
                }
                // positions.setX(i, positions.getX(i) + this.particleVelocity[i].x);
                positions.setY(i, positions.getY(i) + this.particleVelocity[i].y * deltaTime);
            }
            positions.setZ(0, positions.getZ(0) + this.particleVelocity[0].z);
            positions.needsUpdate = true;
            requestAnimationFrame(update);
            _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.update(); //追加分
        };
        requestAnimationFrame(update);
    };
}
window.addEventListener("DOMContentLoaded", init);
function init() {
    let container = new ThreeJSContainer();
    let viewport = container.createRendererDOM(640, 480, new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(3, 2, 20));
    document.body.appendChild(viewport);
}


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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcgprendering"] = self["webpackChunkcgprendering"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_tweenjs_tween_js_dist_tween_esm_js-node_modules_three_examples_jsm_contr-78d392"], () => (__webpack_require__("./src/app.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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a0JBQWtCLHFCQUFxQjtXQUN2QztXQUNBO1dBQ0EsS0FBSztXQUNMO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0MzQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOzs7OztVRWhEQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nLy4vc3JjL2FwcC50cyIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xyXG5pbXBvcnQgeyBPcmJpdENvbnRyb2xzIH0gZnJvbSBcInRocmVlL2V4YW1wbGVzL2pzbS9jb250cm9scy9PcmJpdENvbnRyb2xzXCI7XHJcbmltcG9ydCAqIGFzIFRXRUVOIGZyb20gXCJAdHdlZW5qcy90d2Vlbi5qc1wiO1xyXG5cclxuY2xhc3MgVGhyZWVKU0NvbnRhaW5lciB7XHJcbiAgICBwcml2YXRlIHNjZW5lOiBUSFJFRS5TY2VuZTtcclxuICAgIHByaXZhdGUgbGlnaHQ6IFRIUkVFLkxpZ2h0O1xyXG4gICAgcHJpdmF0ZSBjbG91ZDogVEhSRUUuUG9pbnRzOyAvL2Nsb3Vk44Gu5a6j6KiAXHJcbiAgICBwcml2YXRlIHBhcnRpY2xlVmVsb2NpdHk6IFRIUkVFLlZlY3RvcjNbXTsgLy8g6YCf5bqmIDPmrKHlhYPjg5njgq/jg4jjg6tcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy8g55S76Z2i6YOo5YiG44Gu5L2c5oiQKOihqOekuuOBmeOCi+aeoOOBlOOBqOOBqykqXHJcbiAgICBwdWJsaWMgY3JlYXRlUmVuZGVyZXJET00gPSAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIGNhbWVyYVBvczogVEhSRUUuVmVjdG9yMykgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoKTtcclxuICAgICAgICByZW5kZXJlci5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIC8vIHJlbmRlcmVyLnNldENsZWFyQ29sb3IobmV3IFRIUkVFLkNvbG9yKDB4NDk1ZWQpKTtcclxuICAgICAgICByZW5kZXJlci5zaGFkb3dNYXAuZW5hYmxlZCA9IHRydWU7IC8v44K344Oj44OJ44Km44Oe44OD44OX44KS5pyJ5Yq544Gr44GZ44KLXHJcblxyXG4gICAgICAgIC8v44Kr44Oh44Op44Gu6Kit5a6aXHJcbiAgICAgICAgY29uc3QgY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKDc1LCB3aWR0aCAvIGhlaWdodCwgMC4xLCAxMDAwKTtcclxuICAgICAgICBjYW1lcmEucG9zaXRpb24uY29weShjYW1lcmFQb3MpO1xyXG4gICAgICAgIGNhbWVyYS5sb29rQXQobmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMCkpO1xyXG5cclxuICAgICAgICAvLyDog4zmma9cclxuICAgICAgICByZW5kZXJlci5zZXRDbGVhckNvbG9yKG5ldyBUSFJFRS5Db2xvcigweGIzZGJmZikpO1xyXG5cclxuICAgICAgICBjb25zdCBvcmJpdENvbnRyb2xzID0gbmV3IE9yYml0Q29udHJvbHMoY2FtZXJhLCByZW5kZXJlci5kb21FbGVtZW50KTtcclxuXHJcbiAgICAgICAgdGhpcy5jcmVhdGVTY2VuZSgpO1xyXG4gICAgICAgIC8vIOavjuODleODrOODvOODoOOBrnVwZGF0ZeOCkuWRvOOCk+OBp++8jHJlbmRlclxyXG4gICAgICAgIC8vIHJlcWVzdEFuaW1hdGlvbkZyYW1lIOOBq+OCiOOCiuasoeODleODrOODvOODoOOCkuWRvOOBtlxyXG4gICAgICAgIGNvbnN0IHJlbmRlcjogRnJhbWVSZXF1ZXN0Q2FsbGJhY2sgPSAodGltZSkgPT4ge1xyXG4gICAgICAgICAgICBvcmJpdENvbnRyb2xzLnVwZGF0ZSgpO1xyXG5cclxuICAgICAgICAgICAgcmVuZGVyZXIucmVuZGVyKHRoaXMuc2NlbmUsIGNhbWVyYSk7XHJcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcclxuXHJcbiAgICAgICAgcmVuZGVyZXIuZG9tRWxlbWVudC5zdHlsZS5jc3NGbG9hdCA9IFwibGVmdFwiO1xyXG4gICAgICAgIHJlbmRlcmVyLmRvbUVsZW1lbnQuc3R5bGUubWFyZ2luID0gXCIxMHB4XCI7XHJcbiAgICAgICAgcmV0dXJuIHJlbmRlcmVyLmRvbUVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g44K344O844Oz44Gu5L2c5oiQKOWFqOS9k+OBpzHlm54pXHJcbiAgICBwcml2YXRlIGNyZWF0ZVNjZW5lID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcclxuXHJcbiAgICAgICAgLy8g6Lu444Gu55Sf5oiQXHJcbiAgICAgICAgY29uc3QgYXhlc0Jhckxlbmd0aCA9IDEwLjA7XHJcbiAgICAgICAgLy8gdGhpcy5zY2VuZS5hZGQobmV3IFRIUkVFLkF4ZXNIZWxwZXIoYXhlc0Jhckxlbmd0aCkpO1xyXG5cclxuICAgICAgICAvLyDnkIPjga7jgrjjgqrjg6Hjg4jjg6rjgpLkvZzmiJAg44K544OO44O844OJ44O844OgXHJcbiAgICAgICAgY29uc3Qgc3BoZXJlR2VvbWV0cnkgPSBuZXcgVEhSRUUuU3BoZXJlR2VvbWV0cnkoMTAsIDMyLCAzMik7XHJcbiAgICAgICAgY29uc3Qgc3BoZXJlTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaFBoeXNpY2FsTWF0ZXJpYWwoe1xyXG4gICAgICAgICAgICBjb2xvcjogMHhmZmZmZmYsXHJcbiAgICAgICAgICAgIHRyYW5zbWlzc2lvbjogMSxcclxuICAgICAgICAgICAgb3BhY2l0eTogMSxcclxuICAgICAgICAgICAgbWV0YWxuZXNzOiAwLjAxLFxyXG4gICAgICAgICAgICByb3VnaG5lc3M6IDAuMSxcclxuICAgICAgICAgICAgaW9yOiAxLjYsXHJcbiAgICAgICAgICAgIC8vIHRoaWNrbmVzczogNSxcclxuICAgICAgICAgICAgcmVmbGVjdGl2aXR5OiAwLFxyXG4gICAgICAgICAgICBzcGVjdWxhckludGVuc2l0eTogMC41LFxyXG4gICAgICAgICAgICBzaWRlOiBUSFJFRS5Eb3VibGVTaWRlLFxyXG4gICAgICAgICAgICBkZXB0aFdyaXRlOiBmYWxzZVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBzcGhlcmUgPSBuZXcgVEhSRUUuTWVzaChzcGhlcmVHZW9tZXRyeSwgc3BoZXJlTWF0ZXJpYWwpO1xyXG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHNwaGVyZSk7XHJcblxyXG4gICAgICAgIC8vIOS4i+OBruWcn+WPsFxyXG4gICAgICAgIGNvbnN0IHN0YW5kTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7IGNvbG9yOiAweDk5NzM0ZCB9KVxyXG4gICAgICAgIGNvbnN0IHN0YW5kR3JvbWV0cnkgPSBuZXcgVEhSRUUuQ3lsaW5kZXJHZW9tZXRyeSg0LCA1LCAzLCAzMik7XHJcbiAgICAgICAgY29uc3Qgc3RhbmQgPSBuZXcgVEhSRUUuTWVzaChzdGFuZEdyb21ldHJ5LCBzdGFuZE1hdGVyaWFsKTtcclxuICAgICAgICBzdGFuZC5wb3NpdGlvbi5zZXQoMCwgLTEwLCAwKTtcclxuICAgICAgICB0aGlzLnNjZW5lLmFkZChzdGFuZCk7XHJcblxyXG4gICAgICAgIC8vIOS4reOBruWcsOmdolxyXG4gICAgICAgIGNvbnN0IGdyb3VuZEdyb21ldHJ5ID0gbmV3IFRIUkVFLkNpcmNsZUdlb21ldHJ5KDgsIDMyKTtcclxuICAgICAgICBjb25zdCBncm91bmRNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7IGNvbG9yOiAweGU2ZTZlNiwgc2lkZTogVEhSRUUuRG91YmxlU2lkZSB9KTtcclxuICAgICAgICBjb25zdCBncm91bmQgPSBuZXcgVEhSRUUuTWVzaChncm91bmRHcm9tZXRyeSwgZ3JvdW5kTWF0ZXJpYWwpO1xyXG4gICAgICAgIGdyb3VuZC5yb3RhdGlvbi54ID0gLU1hdGguUEkgLyAyO1xyXG4gICAgICAgIGdyb3VuZC5wb3NpdGlvbi5zZXQoMCwgLTUsIDApO1xyXG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKGdyb3VuZCk7XHJcblxyXG4gICAgICAgIC8vIOmbquOBoOOCi+OBvlxyXG4gICAgICAgIGxldCBjcmVhdGVTbm93bWFuID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBoYXRHcm9tZXRyeSA9IG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KDAuMiwgMSwgMC45LCAxMCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGhhdE1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHsgY29sb3I6IDB4ZmY4MDgwIH0pXHJcbiAgICAgICAgICAgIGNvbnN0IGhhdCA9IG5ldyBUSFJFRS5NZXNoKGhhdEdyb21ldHJ5LCBoYXRNYXRlcmlhbCk7XHJcbiAgICAgICAgICAgIGhhdC5wb3NpdGlvbi5zZXQoMCwgMS4yLCAwKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGhlYWRHcm9tZXRyeSA9IG5ldyBUSFJFRS5TcGhlcmVHZW9tZXRyeSgxLjUsIDIwKTtcclxuICAgICAgICAgICAgY29uc3QgaGVhZE1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHsgY29sb3I6IDB4ZmZmZmZmIH0pXHJcbiAgICAgICAgICAgIGNvbnN0IGhlYWQgPSBuZXcgVEhSRUUuTWVzaChoZWFkR3JvbWV0cnksIGhlYWRNYXRlcmlhbCk7XHJcbiAgICAgICAgICAgIGhlYWQucG9zaXRpb24uc2V0KDAsIC0wLjUsIDApO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgYm9keUdyb21ldHJ5ID0gbmV3IFRIUkVFLlNwaGVyZUdlb21ldHJ5KDIsIDIwKTtcclxuICAgICAgICAgICAgY29uc3QgYm9keU1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHsgY29sb3I6IDB4ZmZmZmZmIH0pXHJcbiAgICAgICAgICAgIGNvbnN0IGJvZHkgPSBuZXcgVEhSRUUuTWVzaChib2R5R3JvbWV0cnksIGJvZHlNYXRlcmlhbCk7XHJcbiAgICAgICAgICAgIGJvZHkucG9zaXRpb24uc2V0KDAsIC0zLCAwKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNub3dtYW4gPSBuZXcgVEhSRUUuR3JvdXAoKTtcclxuICAgICAgICAgICAgc25vd21hbi5hZGQoaGF0LCBoZWFkLCBib2R5KTtcclxuICAgICAgICAgICAgc25vd21hbi5wb3NpdGlvbi5zZXQoMywgMCwgLTIpO1xyXG4gICAgICAgICAgICB0aGlzLnNjZW5lLmFkZChzbm93bWFuKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY3JlYXRlU25vd21hbigpO1xyXG5cclxuICAgICAgICAvLyDlrrZcclxuICAgICAgICBjb25zdCBob3VzZSA9IG5ldyBUSFJFRS5Hcm91cCgpO1xyXG4gICAgICAgIGNvbnN0IHdhbGxHZW9tZXRyeSA9IG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSg0LCA0LCA1KTtcclxuICAgICAgICBjb25zdCB3YWxsTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoeyBjb2xvcjogMHhjY2JkYjggfSlcclxuICAgICAgICBjb25zdCB3YWxsID0gbmV3IFRIUkVFLk1lc2god2FsbEdlb21ldHJ5LCB3YWxsTWF0ZXJpYWwpO1xyXG4gICAgICAgIHdhbGwucG9zaXRpb24uc2V0KDAsIC0yLjk5LCAwKTtcclxuXHJcbiAgICAgICAgY29uc3Qgcm9vZkdlb21ldHJ5ID0gbmV3IFRIUkVFLkNvbmVHZW9tZXRyeSg0LjUsIDMsIDMyKTtcclxuICAgICAgICBjb25zdCByb29mTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoeyBjb2xvcjogMHg2NjgwY2MgfSlcclxuICAgICAgICBjb25zdCByb29mID0gbmV3IFRIUkVFLk1lc2gocm9vZkdlb21ldHJ5LCByb29mTWF0ZXJpYWwpO1xyXG4gICAgICAgIHJvb2YucG9zaXRpb24uc2V0KDAsIDAsIDApO1xyXG5cclxuICAgICAgICBjb25zdCBjaGltbmV5R2VvbWV0cnkgPSBuZXcgVEhSRUUuQm94R2VvbWV0cnkoMSwgMywgMSk7XHJcbiAgICAgICAgY29uc3QgY2hpbW5leU1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHsgY29sb3I6IDB4OTk2NTRkIH0pXHJcbiAgICAgICAgY29uc3QgY2hpbW5leSA9IG5ldyBUSFJFRS5NZXNoKGNoaW1uZXlHZW9tZXRyeSwgY2hpbW5leU1hdGVyaWFsKTtcclxuICAgICAgICBjaGltbmV5LnBvc2l0aW9uLnNldCgwLCAwLCAyKTtcclxuXHJcbiAgICAgICAgaG91c2UuYWRkKHdhbGwsIHJvb2YsIGNoaW1uZXkpO1xyXG4gICAgICAgIGhvdXNlLnBvc2l0aW9uLnNldCgtNCwgMCwgMCk7XHJcbiAgICAgICAgaG91c2Uucm90YXRlWSgzICogTWF0aC5QSSAvIDQpO1xyXG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKGhvdXNlKTtcclxuXHJcbiAgICAgICAgLy8g5Lq6XHJcbiAgICAgICAgY29uc3QgaGF0R3JvbWV0cnkgPSBuZXcgVEhSRUUuQ3lsaW5kZXJHZW9tZXRyeSgwLjUsIDEsIDAuNiwgMTApO1xyXG4gICAgICAgIGNvbnN0IGhhdE1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHsgY29sb3I6IDB4ZmY4MDgwIH0pXHJcbiAgICAgICAgY29uc3QgaGF0ID0gbmV3IFRIUkVFLk1lc2goaGF0R3JvbWV0cnksIGhhdE1hdGVyaWFsKTtcclxuICAgICAgICBoYXQucG9zaXRpb24uc2V0KDAsIC0yLjUsIDApO1xyXG4gICAgICAgIGNvbnN0IGhlYWRHcm9tZXRyeSA9IG5ldyBUSFJFRS5TcGhlcmVHZW9tZXRyeSgwLjgsIDIwKTtcclxuICAgICAgICBjb25zdCBoZWFkTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoeyBjb2xvcjogMHhmZmVlY2MgfSlcclxuICAgICAgICBjb25zdCBoZWFkID0gbmV3IFRIUkVFLk1lc2goaGVhZEdyb21ldHJ5LCBoZWFkTWF0ZXJpYWwpO1xyXG4gICAgICAgIGNvbnN0IGh1bWFuID0gbmV3IFRIUkVFLkdyb3VwKCk7XHJcbiAgICAgICAgY29uc3QgYm9keUdyb21ldHJ5ID0gbmV3IFRIUkVFLkN5bGluZGVyR2VvbWV0cnkoMC40LCAwLjcsIDEuNSwgMTUpO1xyXG4gICAgICAgIGNvbnN0IGJvZHlNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7IGNvbG9yOiAweDczZTZiZiB9KVxyXG4gICAgICAgIGNvbnN0IGJvZHkgPSBuZXcgVEhSRUUuTWVzaChib2R5R3JvbWV0cnksIGJvZHlNYXRlcmlhbCk7XHJcbiAgICAgICAgYm9keS5wb3NpdGlvbi5zZXQoMCwgLTQuMiwgMCk7XHJcbiAgICAgICAgaGVhZC5wb3NpdGlvbi5zZXQoMCwgLTMsIDApO1xyXG4gICAgICAgIGh1bWFuLmFkZChoZWFkLCBib2R5LGhhdCk7XHJcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQoaHVtYW4pO1xyXG5cclxuICAgICAgICAvLyBUd2VlbuOBp+OCs+ODs+ODiOODreODvOODq+OBmeOCi+WkieaVsOOBruWumue+qVxyXG4gICAgICAgIGxldCB0d2VlbmluZm8gPSB7IHBsYWNlWDogMCwgcGxhY2VaOiAwIH07XHJcblxyXG4gICAgICAgIC8vICBUd2VlbuOBp+ODkeODqeODoeODvOOCv+OBruabtOaWsOOBrumam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsFxyXG4gICAgICAgIGxldCB1cGRhdGVTY2FsZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgaHVtYW4ucG9zaXRpb24ueCA9IHR3ZWVuaW5mby5wbGFjZVg7XHJcbiAgICAgICAgICAgIGh1bWFuLnBvc2l0aW9uLnogPSB0d2VlbmluZm8ucGxhY2VaO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVHdlZW7jga7kvZzmiJBcclxuICAgICAgICBjb25zdCB0d2VlbiA9IG5ldyBUV0VFTi5Ud2Vlbih0d2VlbmluZm8pLnRvKHsgcGxhY2VYOiA1IH0sIDEwMDApLm9uVXBkYXRlKHVwZGF0ZVNjYWxlKTtcclxuICAgICAgICBjb25zdCB0d2VlbjIgPSBuZXcgVFdFRU4uVHdlZW4odHdlZW5pbmZvKS50byh7IHBsYWNlWDogMCwgcGxhY2VaOiA1IH0sIDkwMCkub25VcGRhdGUodXBkYXRlU2NhbGUpO1xyXG4gICAgICAgIGNvbnN0IHR3ZWVuMyA9IG5ldyBUV0VFTi5Ud2Vlbih0d2VlbmluZm8pLnRvKHsgcGxhY2VYOiAwLCBwbGFjZVo6IDAgfSwgMTAwMCkub25VcGRhdGUodXBkYXRlU2NhbGUpO1xyXG5cclxuICAgICAgICB0d2Vlbi5jaGFpbih0d2VlbjIpO1xyXG4gICAgICAgIHR3ZWVuMi5jaGFpbih0d2VlbjMpO1xyXG4gICAgICAgIHR3ZWVuMy5jaGFpbih0d2Vlbik7XHJcblxyXG4gICAgICAgIC8vIOOCouODi+ODoeODvOOCt+ODp+ODs+OBrumWi+Wni1xyXG4gICAgICAgIHR3ZWVuLnN0YXJ0KCk7XHJcblxyXG5cclxuICAgICAgICAvLyDjg5Hjg7zjg4bjgqPjgq/jg6vkvZzmiJDplqLmlbBcclxuICAgICAgICBsZXQgY3JlYXRlUGFydGljbGVzID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAvL+OCuOOCquODoeODiOODquOBruS9nOaIkFxyXG4gICAgICAgICAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpO1xyXG5cclxuICAgICAgICAgICAgLy/jg57jg4bjg6rjgqLjg6vjga7kvZzmiJBcclxuICAgICAgICAgICAgLy8gY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuUG9pbnRzTWF0ZXJpYWwoeyBzaXplOiAxLCBjb2xvcjogMHhGRkZGRkYsIHRyYW5zcGFyZW50OiB0cnVlLCBvcGFjaXR5OiAwLjggfSk7XHJcbiAgICAgICAgICAgIC8vIHNpemUg44OR44O844OG44Kj44Kv44Or44Gu44K144Kk44K6IGNvbG9yIOOBpOOBkeOCi+iJsiBvcGFjaXR5OumAj+aYjuW6piB0cmFuc3BhcmVudDrpgI/mmI7luqbjga7mnInlirnnhKHlirlcclxuXHJcbiAgICAgICAgICAgIC8vIOODhuOCr+OCueODgeODo+OCkuiqreOBv+i+vOOCgFxyXG4gICAgICAgICAgICBjb25zdCB0ZXh0dXJlTG9hZGVyID0gbmV3IFRIUkVFLlRleHR1cmVMb2FkZXIoKTtcclxuICAgICAgICAgICAgY29uc3QgdGV4dHVyZSA9IHRleHR1cmVMb2FkZXIubG9hZCgnc25vd19tdGwucG5nJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLlBvaW50c01hdGVyaWFsKHsgc2l6ZTogMSwgbWFwOiB0ZXh0dXJlLCBibGVuZGluZzogVEhSRUUuQWRkaXRpdmVCbGVuZGluZywgY29sb3I6IDB4ZmZmZmZmLCBkZXB0aFdyaXRlOiBmYWxzZSwgdHJhbnNwYXJlbnQ6IHRydWUsIG9wYWNpdHk6IDAuNSB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vcGFydGljbGXjga7kvZzmiJBcclxuICAgICAgICAgICAgY29uc3QgcGFydGljbGVOdW0gPSAxMDA7IC8vIOODkeODvOODhuOCo+OCr+ODq+OBruaVsFxyXG4gICAgICAgICAgICBjb25zdCBwb3NpdGlvbnMgPSBuZXcgRmxvYXQzMkFycmF5KHBhcnRpY2xlTnVtICogMyk7XHJcbiAgICAgICAgICAgIGxldCBwYXJ0aWNsZUluZGV4ID0gMDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucGFydGljbGVWZWxvY2l0eSA9IFtdOyAvL+mAn+W6plxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJ0aWNsZU51bTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbnNbcGFydGljbGVJbmRleCsrXSA9IE1hdGgucmFuZG9tKCkgKiAxMiAtIDY7IC8vIHjluqfmqJlcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uc1twYXJ0aWNsZUluZGV4KytdID0gTWF0aC5yYW5kb20oKSAqIDEwIC0gNTsgLy8geeW6p+aomVxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb25zW3BhcnRpY2xlSW5kZXgrK10gPSBNYXRoLnJhbmRvbSgpICogMTAgLSA1OyAvLyB65bqn5qiZXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcnRpY2xlVmVsb2NpdHkucHVzaChuZXcgVEhSRUUuVmVjdG9yMyhNYXRoLnJhbmRvbSgpICogMC4wNSwgLU1hdGgucmFuZG9tKCkgKiAxMCwgMCkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBnZW9tZXRyeeOBq+W6p+aomeOCkuOCu+ODg+ODiFxyXG4gICAgICAgICAgICBnZW9tZXRyeS5zZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJywgbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShwb3NpdGlvbnMsIDMpKTtcclxuXHJcbiAgICAgICAgICAgIC8vVEhSRUUuUG9pbnRz44Gu5L2c5oiQXHJcbiAgICAgICAgICAgIHRoaXMuY2xvdWQgPSBuZXcgVEhSRUUuUG9pbnRzKGdlb21ldHJ5LCBtYXRlcmlhbCk7XHJcblxyXG4gICAgICAgICAgICAvL+OCt+ODvOODs+OBuOOBrui/veWKoFxyXG4gICAgICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmNsb3VkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNyZWF0ZVBhcnRpY2xlcygpO1xyXG5cclxuICAgICAgICBjb25zdCBjbG9jayA9IG5ldyBUSFJFRS5DbG9jaygpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8v44Op44Kk44OI44Gu6Kit5a6aXHJcbiAgICAgICAgdGhpcy5saWdodCA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KDB4ZmZmZmZmKTtcclxuICAgICAgICBjb25zdCBsdmVjID0gbmV3IFRIUkVFLlZlY3RvcjMoMSwgMSwgMSkubm9ybWFsaXplKCk7XHJcbiAgICAgICAgdGhpcy5saWdodC5wb3NpdGlvbi5zZXQobHZlYy54LCBsdmVjLnksIGx2ZWMueik7XHJcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQodGhpcy5saWdodCk7XHJcblxyXG4gICAgICAgIC8vIOavjuODleODrOODvOODoOOBrnVwZGF0ZeOCkuWRvOOCk+OBp++8jOabtOaWsFxyXG4gICAgICAgIC8vIHJlcWVzdEFuaW1hdGlvbkZyYW1lIOOBq+OCiOOCiuasoeODleODrOODvOODoOOCkuWRvOOBtlxyXG4gICAgICAgIGxldCB1cGRhdGU6IEZyYW1lUmVxdWVzdENhbGxiYWNrID0gKHRpbWUpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZGVsdGFUaW1lID0gY2xvY2suZ2V0RGVsdGEoKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGdlb20gPSA8VEhSRUUuQnVmZmVyR2VvbWV0cnk+dGhpcy5jbG91ZC5nZW9tZXRyeTtcclxuICAgICAgICAgICAgY29uc3QgcG9zaXRpb25zID0gZ2VvbS5nZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJyk7IC8vIOW6p+aomeODh+ODvOOCv1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb3NpdGlvbnMuY291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9ucy5nZXRZKGkpIDwgLTUpIHtcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbnMuc2V0WShpLCA4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIHBvc2l0aW9ucy5zZXRYKGksIHBvc2l0aW9ucy5nZXRYKGkpICsgdGhpcy5wYXJ0aWNsZVZlbG9jaXR5W2ldLngpO1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb25zLnNldFkoaSwgcG9zaXRpb25zLmdldFkoaSkgKyB0aGlzLnBhcnRpY2xlVmVsb2NpdHlbaV0ueSAqIGRlbHRhVGltZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHBvc2l0aW9ucy5zZXRaKDAsIHBvc2l0aW9ucy5nZXRaKDApICsgdGhpcy5wYXJ0aWNsZVZlbG9jaXR5WzBdLnopO1xyXG4gICAgICAgICAgICBwb3NpdGlvbnMubmVlZHNVcGRhdGUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSk7XHJcbiAgICAgICAgICAgIFRXRUVOLnVwZGF0ZSgpOy8v6L+95Yqg5YiGXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBpbml0KTtcclxuXHJcbmZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICBsZXQgY29udGFpbmVyID0gbmV3IFRocmVlSlNDb250YWluZXIoKTtcclxuXHJcbiAgICBsZXQgdmlld3BvcnQgPSBjb250YWluZXIuY3JlYXRlUmVuZGVyZXJET00oNjQwLCA0ODAsIG5ldyBUSFJFRS5WZWN0b3IzKDMsIDIsIDIwKSk7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHZpZXdwb3J0KTtcclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2NncHJlbmRlcmluZ1wiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtjZ3ByZW5kZXJpbmdcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3R3ZWVuanNfdHdlZW5fanNfZGlzdF90d2Vlbl9lc21fanMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbGVzX2pzbV9jb250ci03OGQzOTJcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvYXBwLnRzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=