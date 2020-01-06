! function (t) {
    var e = {};

    function n(i) {
        if (e[i]) return e[i].exports;
        var r = e[i] = {
            i: i,
            l: !1,
            exports: {}
        };
        return t[i].call(r.exports, r, r.exports, n), r.l = !0, r.exports
    }
    n.m = t, n.c = e, n.d = function (t, e, i) {
        n.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: i
        })
    }, n.r = function (t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, n.t = function (t, e) {
        if (1 & e && (t = n(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var i = Object.create(null);
        if (n.r(i), Object.defineProperty(i, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
            for (var r in t) n.d(i, r, function (e) {
                return t[e]
            }.bind(null, r));
        return i
    }, n.n = function (t) {
        var e = t && t.__esModule ? function () {
            return t.default
        } : function () {
            return t
        };
        return n.d(e, "a", e), e
    }, n.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, n.p = "", n(n.s = 3)
}([function (t, e, n) {
    "use strict";

    function i(t) {
        var e;
        if (this.planes = [], this.shaderPasses = [], this._drawStack = [], this._drawingEnabled = !0, this._forceRender = !1, "string" == typeof t && (console.warn("Since v4.0 you should use an object to pass your container and other parameters. Please refer to the docs: https://www.curtainsjs.com/documentation.html"), t = {
                container: e = t
            }), t.container ? "string" == typeof t.container ? this.container = document.getElementById(t.container) : t.container instanceof Element && (this.container = t.container) : ((e = document.createElement("div")).setAttribute("id", "curtains-canvas"), document.body.appendChild(e), this.container = e), this._autoResize = t.autoResize, null !== this._autoResize && void 0 !== this._autoResize || (this._autoResize = !0), this._autoRender = t.autoRender, null !== this._autoRender && void 0 !== this._autoRender || (this._autoRender = !0), this._watchScroll = t.watchScroll, null !== this._watchScroll && void 0 !== this._watchScroll || (this._watchScroll = !0), this.productionMode = t.production || !1, !this.container) return this.productionMode || console.warn("You must specify a valid container ID"), void(this._onErrorCallback && this._onErrorCallback());
        this._init()
    }
    i.prototype._init = function () {
        if (this.glCanvas = document.createElement("canvas"), this.glContext = this.glCanvas.getContext("webgl", {
                alpha: !0
            }) || this.glCanvas.getContext("experimental-webgl"), !this.glContext) return this.productionMode || console.warn("WebGL context could not be created"), void(this._onErrorCallback && this._onErrorCallback());
        this._loseContextExtension = this.glContext.getExtension("WEBGL_lose_context"), this._contextLostHandler = this._contextLost.bind(this), this.glCanvas.addEventListener("webglcontextlost", this._contextLostHandler, !1), this._contextRestoredHandler = this._contextRestored.bind(this), this.glCanvas.addEventListener("webglcontextrestored", this._contextRestoredHandler, !1), this._scrollManager = {
            handler: this._scroll.bind(this, !0),
            shouldWatch: this._watchScroll,
            xOffset: window.pageXOffset,
            yOffset: window.pageYOffset,
            lastXDelta: 0,
            lastYDelta: 0
        }, this._watchScroll && window.addEventListener("scroll", this._scrollManager.handler, {
            passive: !0
        });
        var t = window.devicePixelRatio || 1;
        this.setPixelRatio(t, !1), this._resizeHandler = null, this._autoResize && (this._resizeHandler = this.resize.bind(this, !0), window.addEventListener("resize", this._resizeHandler, !1)), this._readyToDraw()
    }, i.prototype.setPixelRatio = function (t, e) {
        this.pixelRatio = parseFloat(Math.max(t, 1)) || 1, this.resize(e)
    }, i.prototype._setSize = function () {
        var t = this.container.getBoundingClientRect();
        this._boundingRect = {
            width: t.width * this.pixelRatio,
            height: t.height * this.pixelRatio,
            top: t.top * this.pixelRatio,
            left: t.left * this.pixelRatio
        };
        var e = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/),
            n = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        e && n && (this._boundingRect.top = function (t) {
            for (var e = 0; t && !isNaN(t.offsetTop);) e += t.offsetTop - t.scrollTop, t = t.offsetParent;
            return e
        }(this.container) * this.pixelRatio), this.glCanvas.style.width = Math.floor(this._boundingRect.width / this.pixelRatio) + "px", this.glCanvas.style.height = Math.floor(this._boundingRect.height / this.pixelRatio) + "px", this.glCanvas.width = Math.floor(this._boundingRect.width), this.glCanvas.height = Math.floor(this._boundingRect.height), this.glContext.viewport(0, 0, this.glContext.drawingBufferWidth, this.glContext.drawingBufferHeight), this._scrollManager.shouldWatch && (this._scrollManager.xOffset = window.pageXOffset, this._scrollManager.yOffset = window.pageYOffset)
    }, i.prototype.getBoundingRect = function () {
        return this._boundingRect
    }, i.prototype.resize = function (t) {
        this._setSize();
        for (var e = 0; e < this.planes.length; e++) this.planes[e]._canDraw && this.planes[e].planeResize();
        for (e = 0; e < this.shaderPasses.length; e++) this.shaderPasses[e]._canDraw && this.shaderPasses[e].planeResize();
        this.needRender();
        var n = this;
        setTimeout((function () {
            n._onAfterResizeCallback && t && n._onAfterResizeCallback()
        }), 0)
    }, i.prototype._scroll = function () {
        var t = {
            x: window.pageXOffset,
            y: window.pageYOffset
        };
        if (this.updateScrollValues(t.x, t.y), this._scrollManager.shouldWatch) {
            for (var e = 0; e < this.planes.length; e++) this.planes[e].watchScroll && this.planes[e].updateScrollPosition();
            this.needRender()
        }
        var n = this;
        setTimeout((function () {
            n._onScrollCallback && n._onScrollCallback()
        }), 0)
    }, i.prototype.updateScrollValues = function (t, e) {
        var n = this._scrollManager.xOffset;
        this._scrollManager.xOffset = t, this._scrollManager.lastXDelta = n - this._scrollManager.xOffset;
        var i = this._scrollManager.yOffset;
        this._scrollManager.yOffset = e, this._scrollManager.lastYDelta = i - this._scrollManager.yOffset
    }, i.prototype.getScrollDeltas = function () {
        return {
            x: this._scrollManager.lastXDelta,
            y: this._scrollManager.lastYDelta
        }
    }, i.prototype.getScrollValues = function () {
        return {
            x: this._scrollManager.xOffset,
            y: this._scrollManager.yOffset
        }
    }, i.prototype.enableDrawing = function () {
        this._drawingEnabled = !0
    }, i.prototype.disableDrawing = function () {
        this._drawingEnabled = !1
    }, i.prototype.needRender = function () {
        this._forceRender = !0
    }, i.prototype._contextLost = function (t) {
        t.preventDefault(), this._animationFrameID && window.cancelAnimationFrame(this._animationFrameID);
        var e = this;
        setTimeout((function () {
            e._onContextLostCallback && e._onContextLostCallback()
        }), 0)
    }, i.prototype.restoreContext = function () {
        this.glContext && this._loseContextExtension ? this._loseContextExtension.restoreContext() : this.productionMode || (this.glContext ? this._loseContextExtension || console.warn("Could not restore context because the restore context extension is not defined") : console.warn("Could not restore context because the context is not defined"))
    }, i.prototype._contextRestored = function () {
        for (var t = 0; t < this.planes.length; t++) this.planes[t]._restoreContext();
        for (t = 0; t < this.shaderPasses.length; t++) this.shaderPasses[t]._restoreContext();
        var e = this;
        setTimeout((function () {
            e._onContextRestoredCallback && e._onContextRestoredCallback()
        }), 0), this.needRender(), this._animate()
    }, i.prototype.dispose = function () {
        for (; this.planes.length > 0;) this.removePlane(this.planes[0]);
        for (; this.shaderPasses.length > 0;) this.removeShaderPass(this.shaderPasses[0]);
        var t = this,
            e = setInterval((function () {
                0 === t.planes.length && 0 === t.shaderPasses.length && (clearInterval(e), t.glContext.clear(t.glContext.DEPTH_BUFFER_BIT | t.glContext.COLOR_BUFFER_BIT), t._animationFrameID && window.cancelAnimationFrame(t._animationFrameID), this._resizeHandler && window.removeEventListener("resize", t._resizeHandler, !1), this._watchScroll && window.removeEventListener("scroll", this._scrollManager.handler, {
                    passive: !0
                }), t.glCanvas.removeEventListener("webglcontextlost", t._contextLostHandler, !1), t.glCanvas.removeEventListener("webglcontextrestored", t._contextRestoredHandler, !1), t.glContext && t._loseContextExtension && t._loseContextExtension.loseContext(), t.glCanvas.width = t.glCanvas.width, t.glContext = null, t.container.removeChild(t.glCanvas), t.container = null, t.glCanvas = null)
            }), 100)
    }, i.prototype._createPlane = function (t, e) {
        var n = new i.Plane(this, t, e);
        return n._isProgramValid ? this.planes.push(n) : n = !1, n
    }, i.prototype.addPlane = function (t, e) {
        return this.glContext ? t && 0 !== t.length ? this._createPlane(t, e) : (this.productionMode || console.warn("The html element you specified does not currently exists in the DOM"), this._onErrorCallback && this._onErrorCallback(), !1) : (this.productionMode || console.warn("Unable to create a plane. The WebGl context couldn't be created"), this._onErrorCallback && this._onErrorCallback(), null)
    }, i.prototype.removePlane = function (t) {
        t._canDraw = !1, t && t._dispose();
        for (var e, n = this._drawStack, i = 0; i < n.length; i++) t.index === n[i] && this._drawStack.splice(i, 1);
        for (i = 0; i < this.planes.length; i++) t.index === this.planes[i].index && (e = i);
        t = null, this.planes[e] = null, this.planes.splice(e, 1), this.glContext && this.glContext.clear(this.glContext.DEPTH_BUFFER_BIT | this.glContext.COLOR_BUFFER_BIT)
    }, i.prototype._stackPlane = function (t) {
        this._drawStack.push(t)
    }, i.prototype._createShaderPass = function (t) {
        var e = new i.ShaderPass(this, t);
        return e._isProgramValid ? this.shaderPasses.push(e) : e = !1, e
    }, i.prototype.addShaderPass = function (t) {
        return this.glContext ? this._createShaderPass(t) : (this.productionMode || console.warn("Unable to create a plane. The WebGl context couldn't be created"), this._onErrorCallback && this._onErrorCallback(), null)
    }, i.prototype.removeShaderPass = function (t) {
        var e;
        t._canDraw = !1, t && t._dispose();
        for (var n = 0; n < this.shaderPasses.length; n++) t.index === this.shaderPasses[n].index && (e = n);
        t = null, this.shaderPasses[e] = null, this.shaderPasses.splice(e, 1), this.glContext && this.glContext.clear(this.glContext.DEPTH_BUFFER_BIT | this.glContext.COLOR_BUFFER_BIT)
    }, i.prototype._handleDepth = function (t) {
        this._shouldHandleDepth = t, t ? this.glContext.enable(this.glContext.DEPTH_TEST) : this.glContext.disable(this.glContext.DEPTH_TEST)
    }, i.prototype._multiplyMatrix = function (t, e) {
        var n = [],
            i = t[0],
            r = t[1],
            o = t[2],
            a = t[3],
            s = t[4],
            u = t[5],
            l = t[6],
            h = t[7],
            c = t[8],
            d = t[9],
            p = t[10],
            f = t[11],
            m = t[12],
            g = t[13],
            v = t[14],
            _ = t[15],
            x = e[0],
            y = e[1],
            b = e[2],
            T = e[3];
        return n[0] = x * i + y * s + b * c + T * m, n[1] = x * r + y * u + b * d + T * g, n[2] = x * o + y * l + b * p + T * v, n[3] = x * a + y * h + b * f + T * _, x = e[4], y = e[5], b = e[6], T = e[7], n[4] = x * i + y * s + b * c + T * m, n[5] = x * r + y * u + b * d + T * g, n[6] = x * o + y * l + b * p + T * v, n[7] = x * a + y * h + b * f + T * _, x = e[8], y = e[9], b = e[10], T = e[11], n[8] = x * i + y * s + b * c + T * m, n[9] = x * r + y * u + b * d + T * g, n[10] = x * o + y * l + b * p + T * v, n[11] = x * a + y * h + b * f + T * _, x = e[12], y = e[13], b = e[14], T = e[15], n[12] = x * i + y * s + b * c + T * m, n[13] = x * r + y * u + b * d + T * g, n[14] = x * o + y * l + b * p + T * v, n[15] = x * a + y * h + b * f + T * _, n
    }, i.prototype._scaleMatrix = function (t, e, n, i) {
        var r = new Float32Array(16);
        return r[0] = e * t[0], r[1] = e * t[1], r[2] = e * t[2], r[3] = e * t[3], r[4] = n * t[4], r[5] = n * t[5], r[6] = n * t[6], r[7] = n * t[7], r[8] = i * t[8], r[9] = i * t[9], r[10] = i * t[10], r[11] = i * t[11], t !== r && (r[12] = t[12], r[13] = t[13], r[14] = t[14], r[15] = t[15]), r
    }, i.prototype._applyTransformationsMatrix = function (t, e, n) {
        var i = new Float32Array(16),
            r = new Float32Array(4),
            o = .5 * e[0],
            a = .5 * e[1],
            s = .5 * e[2],
            u = Math.sin(o),
            l = Math.cos(o),
            h = Math.sin(a),
            c = Math.cos(a),
            d = Math.sin(s),
            p = Math.cos(s);
        r[0] = u * c * p - l * h * d, r[1] = l * h * p + u * c * d, r[2] = l * c * d - u * h * p, r[3] = l * c * p + u * h * d;
        var f = r[0],
            m = r[1],
            g = r[2],
            v = r[3],
            _ = f + f,
            x = m + m,
            y = g + g,
            b = f * _,
            T = f * x,
            w = f * y,
            P = m * x,
            C = m * y,
            R = g * y,
            E = v * _,
            S = v * x,
            M = v * y,
            D = n[0],
            A = n[1],
            B = n[2];
        return i[0] = (1 - (P + R)) * D, i[1] = (T + M) * D, i[2] = (w - S) * D, i[3] = 0, i[4] = (T - M) * A, i[5] = (1 - (b + R)) * A, i[6] = (C + E) * A, i[7] = 0, i[8] = (w + S) * B, i[9] = (C - E) * B, i[10] = (1 - (b + P)) * B, i[11] = 0, i[12] = t[0], i[13] = t[1], i[14] = t[2], i[15] = 1, i
    }, i.prototype._applyMatrixToPoint = function (t, e) {
        var n = t[0],
            i = t[1],
            r = t[2],
            o = 1 / (e[3] * n + e[7] * i + e[11] * r + e[15]);
        return t[0] = (e[0] * n + e[4] * i + e[8] * r + e[12]) * o, t[1] = (e[1] * n + e[5] * i + e[9] * r + e[13]) * o, t[2] = (e[2] * n + e[6] * i + e[10] * r + e[14]) * o, t
    }, i.prototype._readyToDraw = function () {
        this.container.appendChild(this.glCanvas), this.glContext.enable(this.glContext.BLEND), this.glContext.blendFunc(this.glContext.ONE, this.glContext.ONE_MINUS_SRC_ALPHA), this._handleDepth(!0), console.log("curtains.js - v4.0"), this._animationFrameID = null, this._autoRender && this._animate()
    }, i.prototype._animate = function () {
        this.render(), this._animationFrameID = window.requestAnimationFrame(this._animate.bind(this))
    }, i.prototype.render = function () {
        if (this._drawingEnabled || this._forceRender) {
            this._forceRender && (this._forceRender = !1), this.__onRenderCallback && this.__onRenderCallback(), this.shaderPasses.length > 0 ? this.shaderPasses[0]._enableFrameBuffer() : (this.glContext.clearColor(0, 0, 0, 0), this.glContext.clearDepth(1), this.glContext.clear(this.glContext.COLOR_BUFFER_BIT | this.glContext.DEPTH_BUFFER_BIT));
            for (var t = 0; t < this._drawStack.length; t++) {
                var e = this.planes[this._drawStack[t]];
                e && (e._shouldUseDepthTest && !this._shouldHandleDepth ? this._handleDepth(!0) : !e._shouldUseDepthTest && this._shouldHandleDepth && this._handleDepth(!1), e._drawPlane())
            }
            if (this.shaderPasses.length > 0)
                for (t = 0; t < this.shaderPasses.length; t++) this.shaderPasses[t]._drawPlane()
        }
    }, i.prototype.onAfterResize = function (t) {
        return t && (this._onAfterResizeCallback = t), this
    }, i.prototype.onError = function (t) {
        return t && (this._onErrorCallback = t), this
    }, i.prototype.onContextLost = function (t) {
        return t && (this._onContextLostCallback = t), this
    }, i.prototype.onContextRestored = function (t) {
        return t && (this._onContextRestoredCallback = t), this
    }, i.prototype.onRender = function (t) {
        return t && (this.__onRenderCallback = t), this
    }, i.prototype.onScroll = function (t) {
        return t && (this._onScrollCallback = t), this
    }, i.BasePlane = function (t, e, n) {
        this._type = "BasicPlane", this._wrapper = t, this.htmlElement = e, this._initBasePlane(e, n)
    }, i.BasePlane.prototype._initBasePlane = function (t, e) {
        e || (e = {}), this._canDraw = !1, this._definition = {
            width: parseInt(e.widthSegments) || 1,
            height: parseInt(e.heightSegments) || 1
        }, this._loadingManager = {
            sourcesLoaded: 0
        }, this._setupShaders(e);
        var n = this._setupPlaneProgram();
        this.images = [], this.videos = [], this.canvases = [], this.textures = [], this.crossOrigin = e.crossOrigin || "anonymous", e.uniforms || (this._wrapper.productionMode || console.warn("You are setting a plane without uniforms, you won't be able to interact with it. Please check your addPlane method for : ", this.htmlElement), e.uniforms = {}), this.uniforms = {};
        var i = this;
        return e.uniforms && Object.keys(e.uniforms).map((function (t, n) {
            var r = e.uniforms[t];
            i.uniforms[t] = {
                name: r.name,
                type: r.type,
                value: r.value
            }
        })), n ? (this._shouldDraw = !0, this._setAttributes(), this._setDocumentSizes(), this._setUniforms(this.uniforms), this._initializeBuffers(), this._canDraw = !0, this) : n
    }, i.BasePlane.prototype._setDefaultVS = function (t) {
        return this._wrapper.productionMode || console.warn("No vertex shader provided, will use a default one"), "#ifdef GL_ES\nprecision mediump float;\n#endif\nattribute vec3 aVertexPosition;attribute vec2 aTextureCoord;uniform mat4 uMVMatrix;uniform mat4 uPMatrix;varying vec3 vVertexPosition;varying vec2 vTextureCoord;void main() {vTextureCoord = aTextureCoord;vVertexPosition = aVertexPosition;gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);}"
    }, i.BasePlane.prototype._setDefaultFS = function (t) {
        return "#ifdef GL_ES\nprecision mediump float;\n#endif\nvarying vec3 vVertexPosition;varying vec2 vTextureCoord;void main( void ) {gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);}"
    }, i.BasePlane.prototype._setupShaders = function (t) {
        var e, n, i = this._wrapper,
            r = t.vertexShaderID || this.htmlElement.getAttribute("data-vs-id"),
            o = t.fragmentShaderID || this.htmlElement.getAttribute("data-fs-id");
        t.vertexShader || (e = r && document.getElementById(r) ? document.getElementById(r).innerHTML : this._setDefaultVS()), t.fragmentShader || (o && document.getElementById(o) ? n = document.getElementById(o).innerHTML : (i.productionMode || console.warn("No fragment shader provided, will use a default one"), n = this._setDefaultFS())), this._shaders = {
            vertexShaderCode: t.vertexShader || e,
            fragmentShaderCode: t.fragmentShader || n
        }
    }, i.BasePlane.prototype._createShader = function (t, e) {
        var n = this._wrapper.glContext,
            i = n.createShader(e);
        return n.shaderSource(i, t), n.compileShader(i), this._wrapper.productionMode || n.getShaderParameter(i, n.COMPILE_STATUS) ? i : (console.warn("Errors occurred while compiling the shader:\n" + n.getShaderInfoLog(i)), null)
    }, i.BasePlane.prototype._setupPlaneProgram = function () {
        var t = !0,
            e = this._wrapper,
            n = e.glContext;
        return this._program = n.createProgram(), this._shaders.vertexShader = this._createShader(this._shaders.vertexShaderCode, n.VERTEX_SHADER), this._shaders.fragmentShader = this._createShader(this._shaders.fragmentShaderCode, n.FRAGMENT_SHADER), this._shaders.vertexShader && this._shaders.fragmentShader || (e.productionMode || console.warn("Unable to find or compile the vertex or fragment shader"), t = !1), t && (n.attachShader(this._program, this._shaders.vertexShader), n.attachShader(this._program, this._shaders.fragmentShader), n.linkProgram(this._program), e.productionMode || n.getProgramParameter(this._program, n.LINK_STATUS) || (console.warn("Unable to initialize the shader program."), t = !1)), this._isProgramValid = t, t
    }, i.BasePlane.prototype._handleUniformSetting = function (t, e, n) {
        var i = this._wrapper.glContext;
        switch (t) {
            case "1i":
                i.uniform1i(e, n);
                break;
            case "1iv":
                i.uniform1iv(e, n);
                break;
            case "1f":
                i.uniform1f(e, n);
                break;
            case "1fv":
                i.uniform1fv(e, n);
                break;
            case "2i":
                i.uniform2i(e, n[0], n[1]);
                break;
            case "2iv":
                i.uniform2iv(e, n);
                break;
            case "2f":
                i.uniform2f(e, n[0], n[1]);
                break;
            case "2fv":
                i.uniform2fv(e, n);
                break;
            case "3i":
                i.uniform3i(e, n[0], n[1], n[2]);
                break;
            case "3iv":
                i.uniform3iv(e, n);
                break;
            case "3f":
                i.uniform3f(e, n[0], n[1], n[2]);
                break;
            case "3fv":
                i.uniform3fv(e, n);
                break;
            case "4i":
                i.uniform4i(e, n[0], n[1], n[2], n[3]);
                break;
            case "4iv":
                i.uniform4iv(e, n);
                break;
            case "4f":
                i.uniform4f(e, n[0], n[1], n[2], n[3]);
                break;
            case "4fv":
                i.uniform4fv(e, n);
                break;
            case "mat2":
                i.uniformMatrix2fv(e, !1, n);
                break;
            case "mat3":
                i.uniformMatrix3fv(e, !1, n);
                break;
            case "mat4":
                i.uniformMatrix4fv(e, !1, n);
                break;
            default:
                this._wrapper.productionMode || console.warn("This uniform type is not handled : ", t)
        }
    }, i.BasePlane.prototype._setUniforms = function (t) {
        var e = this._wrapper,
            n = e.glContext;
        n.useProgram(this._program);
        var i = this;
        t && Object.keys(t).map((function (r, o) {
            var a = t[r];
            a.location = n.getUniformLocation(i._program, a.name), a.type || (Array.isArray(a.value) ? 4 === a.value.length ? (a.type = "4f", e.productionMode || console.warn("No uniform type declared for " + a.name + ", applied a 4f (array of 4 floats) uniform type")) : 3 === a.value.length ? (a.type = "3f", e.productionMode || console.warn("No uniform type declared for " + a.name + ", applied a 3f (array of 3 floats) uniform type")) : 2 === a.value.length && (a.type = "2f", e.productionMode || console.warn("No uniform type declared for " + a.name + ", applied a 2f (array of 2 floats) uniform type")) : a.value.constructor === Float32Array ? 16 === a.value.length ? (a.type = "mat4", e.productionMode || console.warn("No uniform type declared for " + a.name + ", applied a mat4 (4x4 matrix array) uniform type")) : 9 === a.value.length ? (a.type = "mat3", e.productionMode || console.warn("No uniform type declared for " + a.name + ", applied a mat3 (3x3 matrix array) uniform type")) : 4 === a.value.length && (a.type = "mat2", e.productionMode || console.warn("No uniform type declared for " + a.name + ", applied a mat2 (2x2 matrix array) uniform type")) : (a.type = "1f", e.productionMode || console.warn("No uniform type declared for " + a.name + ", applied a 1f (float) uniform type"))), i._handleUniformSetting(a.type, a.location, a.value)
        }))
    }, i.BasePlane.prototype._updateUniforms = function (t) {
        if (t) {
            var e = this;
            Object.keys(t).map((function (n) {
                var i = t[n],
                    r = i.location,
                    o = i.value,
                    a = i.type;
                e._handleUniformSetting(a, r, o)
            }))
        }
    }, i.BasePlane.prototype._setAttributes = function () {
        this._attributes || (this._attributes = {}), this._attributes.vertexPosition = {
            name: "aVertexPosition",
            location: this._wrapper.glContext.getAttribLocation(this._program, "aVertexPosition")
        }, this._attributes.textureCoord = {
            name: "aTextureCoord",
            location: this._wrapper.glContext.getAttribLocation(this._program, "aTextureCoord")
        }
    }, i.BasePlane.prototype._setPlaneVertices = function () {
        this._geometry = {
            vertices: []
        }, this._material = {
            uvs: []
        };
        for (var t = 0; t < this._definition.height; ++t)
            for (var e = t / this._definition.height, n = 0; n < this._definition.width; ++n) {
                var i = n / this._definition.width;
                this._material.uvs.push(i), this._material.uvs.push(e), this._material.uvs.push(0), this._geometry.vertices.push(2 * (i - .5)), this._geometry.vertices.push(2 * (e - .5)), this._geometry.vertices.push(0), this._material.uvs.push(i + 1 / this._definition.width), this._material.uvs.push(e), this._material.uvs.push(0), this._geometry.vertices.push(2 * (i + 1 / this._definition.width - .5)), this._geometry.vertices.push(2 * (e - .5)), this._geometry.vertices.push(0), this._material.uvs.push(i), this._material.uvs.push(e + 1 / this._definition.height), this._material.uvs.push(0), this._geometry.vertices.push(2 * (i - .5)), this._geometry.vertices.push(2 * (e + 1 / this._definition.height - .5)), this._geometry.vertices.push(0), this._material.uvs.push(i), this._material.uvs.push(e + 1 / this._definition.height), this._material.uvs.push(0), this._geometry.vertices.push(2 * (i - .5)), this._geometry.vertices.push(2 * (e + 1 / this._definition.height - .5)), this._geometry.vertices.push(0), this._material.uvs.push(i + 1 / this._definition.width), this._material.uvs.push(e + 1 / this._definition.height), this._material.uvs.push(0), this._geometry.vertices.push(2 * (i + 1 / this._definition.width - .5)), this._geometry.vertices.push(2 * (e + 1 / this._definition.height - .5)), this._geometry.vertices.push(0), this._material.uvs.push(i + 1 / this._definition.width), this._material.uvs.push(e), this._material.uvs.push(0), this._geometry.vertices.push(2 * (i + 1 / this._definition.width - .5)), this._geometry.vertices.push(2 * (e - .5)), this._geometry.vertices.push(0)
            }
    }, i.BasePlane.prototype._initializeBuffers = function () {
        var t = this._wrapper.glContext;
        this._geometry || this._material || this._setPlaneVertices(), this._attributes && (this._geometry.bufferInfos = {
            id: t.createBuffer(),
            itemSize: 3,
            numberOfItems: this._geometry.vertices.length / 3
        }, t.enableVertexAttribArray(this._attributes.vertexPosition.location), t.bindBuffer(t.ARRAY_BUFFER, this._geometry.bufferInfos.id), t.bufferData(t.ARRAY_BUFFER, new Float32Array(this._geometry.vertices), t.STATIC_DRAW), t.vertexAttribPointer(this._attributes.vertexPosition.location, this._geometry.bufferInfos.itemSize, t.FLOAT, !1, 0, 0), this._material.bufferInfos = {
            id: t.createBuffer(),
            itemSize: 3,
            numberOfItems: this._material.uvs.length / 3
        }, t.enableVertexAttribArray(this._attributes.textureCoord.location), t.bindBuffer(t.ARRAY_BUFFER, this._material.bufferInfos.id), t.bufferData(t.ARRAY_BUFFER, new Float32Array(this._material.uvs), t.STATIC_DRAW), t.vertexAttribPointer(this._attributes.textureCoord.location, this._material.bufferInfos.itemSize, t.FLOAT, !1, 0, 0))
    }, i.BasePlane.prototype._restoreContext = function () {
        if (this._canDraw = !1, this._shaders.vertexShader = null, this._shaders.fragmentShader = null, this._program = null, this._matrices && (this._matrices = null), this._attributes = null, this._geometry.bufferInfos = null, this._material.bufferInfos = null, "ShaderPass" === this._type && (this._frameBuffer = null, this._depthBuffer = null), this._setupPlaneProgram()) {
            this._setAttributes(), this._setUniforms(this.uniforms), this._initializeBuffers();
            for (var t = 0; t < this.textures.length; t++) {
                var e = this.textures[t].source;
                "texturePass" === this.textures[t].type ? this.textures[t]._initShaderPassTexture() : (this.textures[t]._init(), this.textures[t].setSource(e))
            }
            "Plane" === this._type ? (this._initMatrices(), this.setPerspective(this._fov, .1, 2 * this._fov), this._applyCSSPositions()) : this._createFrameBuffer(), this._canDraw = !0
        }
    }, i.BasePlane.prototype._setDocumentSizes = function () {
        var t = this._wrapper,
            e = this.htmlElement.getBoundingClientRect();
        0 === e.width && 0 === e.height && (e = t._boundingRect), this._boundingRect || (this._boundingRect = {}), this._boundingRect.document = {
            width: e.width * t.pixelRatio,
            height: e.height * t.pixelRatio,
            top: e.top * t.pixelRatio,
            left: e.left * t.pixelRatio
        }
    }, i.BasePlane.prototype.getBoundingRect = function () {
        return {
            width: this._boundingRect.document.width,
            height: this._boundingRect.document.height,
            top: this._boundingRect.document.top,
            left: this._boundingRect.document.left,
            right: this._boundingRect.document.left + this._boundingRect.document.width,
            bottom: this._boundingRect.document.top + this._boundingRect.document.height
        }
    }, i.BasePlane.prototype.getWebGLBoundingRect = function () {
        var t = this._wrapper,
            e = this._matrices.viewProjectionMatrix;
        if (e) {
            for (var n = [t._applyMatrixToPoint([-1, 1, 0], e), t._applyMatrixToPoint([1, 1, 0], e), t._applyMatrixToPoint([1, -1, 0], e), t._applyMatrixToPoint([-1, -1, 0], e)], i = 1e6, r = -1e6, o = 1e6, a = -1e6, s = 0; s < n.length; s++) {
                var u = n[s];
                u[0] = (u[0] + 1) / 2, u[1] = 1 - (u[1] + 1) / 2, u[0] < i ? i = u[0] : u[0] > r && (r = u[0]), u[1] < o ? o = u[1] : u[1] > a && (a = u[1])
            }
            return {
                width: (r - i) * t._boundingRect.width,
                height: (a - o) * t._boundingRect.height,
                top: o * t._boundingRect.height + t._boundingRect.top,
                left: i * t._boundingRect.width + t._boundingRect.left,
                right: i * t._boundingRect.width + t._boundingRect.left + (r - i) * t._boundingRect.width,
                bottom: o * t._boundingRect.height + t._boundingRect.top + (a - o) * t._boundingRect.height
            }
        }
        return this._boundingRect.document
    }, i.BasePlane.prototype.planeResize = function () {
        this._setDocumentSizes(), "Plane" === this._type && (this._setComputedSizes(), this.setPerspective(this._fov, .1, 2 * this._fov), this._applyCSSPositions());
        for (var t = 0; t < this.textures.length; t++) this.textures[t]._adjustTextureSize();
        "ShaderPass" === this._type && (this._wrapper.glContext.bindFramebuffer(this._wrapper.glContext.FRAMEBUFFER, this._frameBuffer), this._bindDepthBuffer());
        var e = this;
        setTimeout((function () {
            e._onAfterResizeCallback && e._onAfterResizeCallback()
        }))
    }, i.BasePlane.prototype.createTexture = function (t, e) {
        var n = new i.Texture(this, {
            index: this.textures.length,
            sampler: t,
            isTexturePass: e
        });
        return this.textures.push(n), n
    }, i.BasePlane.prototype.loadSources = function (t) {
        for (var e = 0; e < t.length; e++) this.loadSource(t[e])
    }, i.BasePlane.prototype.loadSource = function (t) {
        "IMG" === t.tagName.toUpperCase() ? this.loadImage(t) : "VIDEO" === t.tagName.toUpperCase() ? this.loadVideo(t) : "CANVAS" === t.tagName.toUpperCase() ? this.loadCanvas(t) : this._wrapper.productionMode || console.warn("this HTML tag could not be converted into a texture:", t.tagName)
    }, i.BasePlane.prototype.loadImage = function (t) {
        var e = t;
        e.crossOrigin = this.crossOrigin || "anonymous", e.sampler = t.getAttribute("data-sampler") || null;
        var n = this.createTexture(e.sampler);
        n._onSourceLoadedHandler = n._onSourceLoaded.bind(n, e), e.addEventListener("load", n._onSourceLoadedHandler, !1), e.complete && n._onSourceLoaded(e), this.images.push(e)
    }, i.BasePlane.prototype.loadVideo = function (t) {
        var e = t;
        e.preload = !0, e.muted = !0, e.loop = !0, e.sampler = t.getAttribute("data-sampler") || null, e.crossOrigin = this.crossOrigin || "anonymous";
        var n = this.createTexture(e.sampler);
        n._onSourceLoadedHandler = n._onVideoLoadedData.bind(n, e), e.addEventListener("canplaythrough", n._onSourceLoadedHandler, !1), e.readyState >= e.HAVE_FUTURE_DATA && n._onSourceLoaded(e), e.load(), this.videos.push(e)
    }, i.BasePlane.prototype.loadCanvas = function (t) {
        var e = t;
        e.sampler = t.getAttribute("data-sampler") || null;
        var n = this.createTexture(e.sampler);
        this.canvases.push(e), n._onSourceLoaded(e)
    }, i.BasePlane.prototype.loadImages = function (t) {
        for (var e = 0; e < t.length; e++) this.loadImage(t[e])
    }, i.BasePlane.prototype.loadVideos = function (t) {
        for (var e = 0; e < t.length; e++) this.loadVideo(t[e])
    }, i.BasePlane.prototype.loadCanvases = function (t) {
        for (var e = 0; e < t.length; e++) this.loadCanvas(t[e])
    }, i.BasePlane.prototype.playVideos = function () {
        for (var t = 0; t < this.textures.length; t++) {
            var e = this.textures[t];
            if ("video" === e.type) {
                var n = e.source.play(),
                    i = this;
                void 0 !== n && n.catch((function (t) {
                    i._wrapper.productionMode || console.warn("Could not play the video : ", t)
                }))
            }
        }
    }, i.BasePlane.prototype.mouseToPlaneCoords = function (t, e) {
        var n = this.scale ? this.scale : {
                x: 1,
                y: 1
            },
            i = (this._boundingRect.document.width - this._boundingRect.document.width * n.x) / 2,
            r = (this._boundingRect.document.height - this._boundingRect.document.height * n.y) / 2,
            o = this._boundingRect.document.width * n.x / this._wrapper.pixelRatio,
            a = this._boundingRect.document.height * n.y / this._wrapper.pixelRatio,
            s = (this._boundingRect.document.top + r) / this._wrapper.pixelRatio;
        return {
            x: (t - (this._boundingRect.document.left + i) / this._wrapper.pixelRatio) / o * 2 - 1,
            y: 1 - (e - s) / a * 2
        }
    }, i.BasePlane.prototype._bindPlaneBuffers = function () {
        var t = this._wrapper.glContext;
        t.enableVertexAttribArray(this._attributes.vertexPosition.location), t.bindBuffer(t.ARRAY_BUFFER, this._geometry.bufferInfos.id), t.vertexAttribPointer(this._attributes.vertexPosition.location, this._geometry.bufferInfos.itemSize, t.FLOAT, !1, 0, 0), t.enableVertexAttribArray(this._attributes.textureCoord.location), t.bindBuffer(t.ARRAY_BUFFER, this._material.bufferInfos.id), t.vertexAttribPointer(this._attributes.textureCoord.location, this._material.bufferInfos.itemSize, t.FLOAT, !1, 0, 0)
    }, i.BasePlane.prototype._bindPlaneTexture = function (t) {
        var e = this._wrapper.glContext;
        e.activeTexture(e.TEXTURE0 + t.index), e.bindTexture(e.TEXTURE_2D, t._sampler.texture)
    }, i.BasePlane.prototype._drawPlane = function () {
        var t = this._wrapper.glContext;
        if (this._canDraw && (t.useProgram(this._program), this._onRenderCallback && this._onRenderCallback(), "ShaderPass" === this._type && this.index + 1 <= this._wrapper.shaderPasses.length - 1 && this._wrapper.shaderPasses[this.index + 1]._enableFrameBuffer(), this._updateUniforms(this.uniforms), this._bindPlaneBuffers(), this._shouldDraw)) {
            for (var e = 0; e < this.textures.length; e++) this.textures[e]._drawTexture();
            "ShaderPass" === this._type && this.index === this._wrapper.shaderPasses.length - 1 && t.bindFramebuffer(t.FRAMEBUFFER, null), t.drawArrays(t.TRIANGLES, 0, this._geometry.bufferInfos.numberOfItems)
        }
    }, i.BasePlane.prototype._dispose = function () {
        for (var t = this._wrapper.glContext, e = 0; e < this.textures.length; e++) this.textures[e]._dispose();
        this.textures = null, t && (this._geometry && (t.bindBuffer(t.ARRAY_BUFFER, this._geometry.bufferInfos.id), t.bufferData(t.ARRAY_BUFFER, 1, t.STATIC_DRAW), t.deleteBuffer(this._geometry.bufferInfos.id), this._geometry = null), this._material && (t.bindBuffer(t.ARRAY_BUFFER, this._material.bufferInfos.id), t.bufferData(t.ARRAY_BUFFER, 1, t.STATIC_DRAW), t.deleteBuffer(this._material.bufferInfos.id), this._material = null), this._frameBuffer && (this._wrapper.glContext.deleteFramebuffer(this.framebuffer), this.framebuffer = null), this._depthBuffer && (this._wrapper.glContext.deleteRenderbuffer(this._depthBuffer), this._depthBuffer = null), this._shaders && (t.deleteShader(this._shaders.fragmentShader), t.deleteShader(this._shaders.vertexShader), this._shaders = null), this._program && (t.deleteProgram(this._program), this._program = null))
    }, i.BasePlane.prototype.onAfterResize = function (t) {
        return t && (this._onAfterResizeCallback = t), this
    }, i.BasePlane.prototype.onLoading = function (t) {
        return t && (this._onPlaneLoadingCallback = t), this
    }, i.BasePlane.prototype.onReady = function (t) {
        return t && (this._onReadyCallback = t), this
    }, i.BasePlane.prototype.onRender = function (t) {
        return t && (this._onRenderCallback = t), this
    }, i.Plane = function (t, e, n) {
        i.BasePlane.call(this, t, e, n), this.index = this._wrapper.planes.length, this._type = "Plane", this._canDraw = !1, n || (n = {}), this._setInitParams(n), this._isProgramValid ? (this._initPositions(), this._initSources()) : this._wrapper._onErrorCallback && this._wrapper._onErrorCallback()
    }, i.Plane.prototype = Object.create(i.BasePlane.prototype), i.Plane.prototype.constructor = i.Plane, i.Plane.prototype._setInitParams = function (t) {
        var e = this._wrapper;
        this.alwaysDraw = t.alwaysDraw || !1;
        var n = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        };
        t.drawCheckMargins && (n = t.drawCheckMargins), this.drawCheckMargins = n, this.rotation = {
            x: 0,
            y: 0,
            z: 0
        }, this.relativeTranslation = {
            x: 0,
            y: 0
        }, this._translation = {
            x: 0,
            y: 0,
            z: 0
        }, this.scale = {
            x: 1,
            y: 1
        }, e._stackPlane(this.index), this.autoloadSources = t.autoloadSources, null !== this.autoloadSources && void 0 !== this.autoloadSources || (this.autoloadSources = !0), this._fov = t.fov || 75, null === t.watchScroll || void 0 === t.watchScroll ? this.watchScroll = this._wrapper._watchScroll : this.watchScroll = t.watchScroll || !1, this.watchScroll && (this._wrapper._scrollManager.shouldWatch = !0), this._shouldUseDepthTest = !0
    }, i.Plane.prototype._initPositions = function () {
        this._initMatrices(), this.setPerspective(this._fov, .1, 2 * this._fov), this._applyCSSPositions()
    }, i.Plane.prototype._initSources = function () {
        if (this.autoloadSources) {
            for (var t = [], e = 0; e < this.htmlElement.getElementsByTagName("img").length; e++) t.push(this.htmlElement.getElementsByTagName("img")[e]);
            t.length > 0 && this.loadSources(t);
            var n = [];
            for (e = 0; e < this.htmlElement.getElementsByTagName("video").length; e++) n.push(this.htmlElement.getElementsByTagName("video")[e]);
            n.length > 0 && this.loadSources(n);
            var i = [];
            for (e = 0; e < this.htmlElement.getElementsByTagName("canvas").length; e++) i.push(this.htmlElement.getElementsByTagName("canvas")[e]);
            i.length > 0 && this.loadSources(i), this._loadingManager.initSourcesToLoad = t.length + n.length + i.length
        }
        var r;
        0 !== this._loadingManager.initSourcesToLoad || this._wrapper.productionMode || console.warn("This plane does not contain any image, video or canvas element. You may want to add some later with the loadSource() or loadSources() method.");
        var o = this;
        r = setInterval((function () {
            o._loadingManager.sourcesLoaded >= o._loadingManager.initSourcesToLoad && (clearInterval(r), o._onReadyCallback && o._onReadyCallback())
        }), 16), this._canDraw = !0, this._wrapper.needRender(), this.alwaysDraw || this._shouldDrawCheck()
    }, i.Plane.prototype._initMatrices = function () {
        var t = this._wrapper.glContext;
        this._matrices = {
            mvMatrix: {
                name: "uMVMatrix",
                matrix: new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]),
                location: t.getUniformLocation(this._program, "uMVMatrix")
            },
            pMatrix: {
                name: "uPMatrix",
                matrix: new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                location: t.getUniformLocation(this._program, "uPMatrix")
            }
        }
    }, i.Plane.prototype._setComputedSizes = function () {
        var t = this._wrapper,
            e = this._boundingRect.document.width / 2 + this._boundingRect.document.left,
            n = this._boundingRect.document.height / 2 + this._boundingRect.document.top,
            i = t._boundingRect.width / 2 + t._boundingRect.left,
            r = t._boundingRect.height / 2 + t._boundingRect.top;
        this._boundingRect.computed = {
            width: this._boundingRect.document.width / t._boundingRect.width,
            height: this._boundingRect.document.height / t._boundingRect.height,
            top: (r - n) / t._boundingRect.height,
            left: (e - i) / t._boundingRect.height
        }
    }, i.Plane.prototype._setPerspectiveMatrix = function (t, e, n) {
        var i = this._wrapper._boundingRect.width / this._wrapper._boundingRect.height;
        return t !== this._fov && (this._fov = t), [t / i, 0, 0, 0, 0, t, 0, 0, 0, 0, (e + n) * (1 / (e - n)), -1, 0, 0, e * n * (1 / (e - n)) * 2, 0]
    }, i.Plane.prototype.setPerspective = function (t, e, n) {
        var i;
        (i = null === t || "number" != typeof t ? 75 : parseInt(t)) < 1 ? i = 1 : i > 180 && (i = 180);
        var r = parseFloat(e) || .1,
            o = parseFloat(n) || 100;
        this._matrices && (this._matrices.pMatrix.matrix = this._setPerspectiveMatrix(i, r, o), this._wrapper.glContext.useProgram(this._program), this._wrapper.glContext.uniformMatrix4fv(this._matrices.pMatrix.location, !1, this._matrices.pMatrix.matrix), this._canDraw && this._setMVMatrix())
    }, i.Plane.prototype._setMVMatrix = function () {
        var t = this._wrapper,
            e = {
                x: this.scale.x * (t._boundingRect.width / t._boundingRect.height * this._boundingRect.computed.width / 2),
                y: this.scale.y * this._boundingRect.computed.height / 2
            },
            n = [this._translation.x, this._translation.y, this._translation.z - this._fov / 2],
            i = [this.rotation.x, this.rotation.y, this.rotation.z],
            r = [e.x, e.y, 1];
        this._matrices && (this._matrices.mvMatrix.matrix = t._applyTransformationsMatrix(n, i, r), t.glContext.useProgram(this._program), t.glContext.uniformMatrix4fv(this._matrices.mvMatrix.location, !1, this._matrices.mvMatrix.matrix), this._matrices.viewProjectionMatrix = t._multiplyMatrix(this._matrices.pMatrix.matrix, this._matrices.mvMatrix.matrix)), !this.alwaysDraw && this._canDraw && this._shouldDrawCheck()
    }, i.Plane.prototype.setScale = function (t, e) {
        if (t = null === t || "number" != typeof t ? 1 : Math.max(parseFloat(t), .001), e = null === e || "number" != typeof e ? 1 : Math.max(parseFloat(e), .001), t !== this.scale.x || e !== this.scale.y) {
            this.scale = {
                x: t,
                y: e
            }, this._setMVMatrix();
            for (var n = 0; n < this.textures.length; n++) this.textures[n]._adjustTextureSize()
        }
    }, i.Plane.prototype.setRotation = function (t, e, n) {
        t = parseFloat(t) || 0, e = parseFloat(e) || 0, n = parseFloat(n) || 0, t === this.rotation.x && e === this.rotation.y && n === this.rotation.z || (this.rotation = {
            x: t,
            y: e,
            z: n
        }, this._setMVMatrix())
    }, i.Plane.prototype._setTranslation = function () {
        var t = {
            x: 0,
            y: 0
        };
        0 === this.relativeTranslation.x && 0 === this.relativeTranslation.y || (t = this._documentToPlaneSpace(this.relativeTranslation.x, this.relativeTranslation.y)), this._translation.x = this._boundingRect.computed.left + t.x, this._translation.y = this._boundingRect.computed.top + t.y, this._setMVMatrix()
    }, i.Plane.prototype.setRelativePosition = function (t, e) {
        this.relativeTranslation = {
            x: t,
            y: e
        }, this._setTranslation()
    }, i.Plane.prototype._documentToPlaneSpace = function (t, e) {
        var n = this._wrapper;
        return {
            x: t / (n._boundingRect.width / n.pixelRatio) * (n._boundingRect.width / n._boundingRect.height),
            y: -e / (n._boundingRect.height / n.pixelRatio)
        }
    }, i.Plane.prototype._shouldDrawCheck = function () {
        var t = this._wrapper,
            e = this.getWebGLBoundingRect(),
            n = this;
        e.right < t._boundingRect.left - this.drawCheckMargins.right || e.left > t._boundingRect.left + t._boundingRect.width + this.drawCheckMargins.left || e.bottom < t._boundingRect.top - this.drawCheckMargins.bottom || e.top > t._boundingRect.top + t._boundingRect.height + this.drawCheckMargins.top ? this._shouldDraw && (this._shouldDraw = !1, setTimeout((function () {
            n._onLeaveViewCallback && n._onLeaveViewCallback()
        }), 0)) : (this._shouldDraw || setTimeout((function () {
            n._onReEnterViewCallback && n._onReEnterViewCallback()
        }), 0), this._shouldDraw = !0)
    }, i.Plane.prototype._applyCSSPositions = function () {
        this._setComputedSizes(), this._setTranslation()
    }, i.Plane.prototype.updatePosition = function () {
        this._setDocumentSizes(), this._applyCSSPositions()
    }, i.Plane.prototype.updateScrollPosition = function () {
        (this._wrapper._scrollManager.lastXDelta || this._wrapper._scrollManager.lastYDelta) && (this._boundingRect.document.top += this._wrapper._scrollManager.lastYDelta * this._wrapper.pixelRatio, this._boundingRect.document.left += this._wrapper._scrollManager.lastXDelta * this._wrapper.pixelRatio, this._applyCSSPositions())
    }, i.Plane.prototype.enableDepthTest = function (t) {
        this._shouldUseDepthTest = t
    }, i.Plane.prototype.moveToFront = function () {
        this.enableDepthTest(!1);
        for (var t = this._wrapper._drawStack, e = 0; e < t.length; e++) this.index === t[e] && t.splice(e, 1);
        t.push(this.index)
    }, i.Plane.prototype.onReEnterView = function (t) {
        return t && (this._onReEnterViewCallback = t), this
    }, i.Plane.prototype.onLeaveView = function (t) {
        return t && (this._onLeaveViewCallback = t), this
    }, i.ShaderPass = function (t, e) {
        e || (e = {}), e.widthSegments = 1, e.heightSegments = 1, i.BasePlane.call(this, t, t.container, e), this.index = this._wrapper.shaderPasses.length, this._type = "ShaderPass", this._isProgramValid && this._initShaderPassPlane()
    }, i.ShaderPass.prototype = Object.create(i.BasePlane.prototype), i.ShaderPass.prototype.constructor = i.ShaderPass, i.ShaderPass.prototype._initShaderPassPlane = function () {
        this.createTexture("uRenderTexture", !0), this._createFrameBuffer();
        var t = this;
        setTimeout((function () {
            t._onReadyCallback && t._onReadyCallback()
        }), 0), this._canDraw = !0, this._wrapper.needRender()
    }, i.ShaderPass.prototype._setDefaultVS = function (t) {
        return "#ifdef GL_ES\nprecision mediump float;\n#endif\nattribute vec3 aVertexPosition;attribute vec2 aTextureCoord;varying vec3 vVertexPosition;varying vec2 vTextureCoord;void main() {vTextureCoord = aTextureCoord;vVertexPosition = aVertexPosition;gl_Position = vec4(aVertexPosition, 1.0);}"
    }, i.ShaderPass.prototype._setDefaultFS = function (t) {
        return "#ifdef GL_ES\nprecision mediump float;\n#endif\nvarying vec3 vVertexPosition;varying vec2 vTextureCoord;uniform sampler2D uRenderTexture;void main( void ) {gl_FragColor = texture2D(uRenderTexture, vTextureCoord);}"
    }, i.ShaderPass.prototype._enableFrameBuffer = function () {
        var t = this._wrapper.glContext;
        this._frameBuffer && (t.bindFramebuffer(t.FRAMEBUFFER, this._frameBuffer), t.clearColor(0, 0, 0, 0), t.clearDepth(1), t.clear(t.COLOR_BUFFER_BIT | t.DEPTH_BUFFER_BIT)), t.viewport(0, 0, t.drawingBufferWidth, t.drawingBufferHeight)
    }, i.ShaderPass.prototype._bindDepthBuffer = function () {
        var t = this._wrapper.glContext;
        this._depthBuffer && (t.bindRenderbuffer(t.RENDERBUFFER, this._depthBuffer), t.renderbufferStorage(t.RENDERBUFFER, t.DEPTH_COMPONENT16, this._boundingRect.document.width, this._boundingRect.document.height), t.framebufferRenderbuffer(t.FRAMEBUFFER, t.DEPTH_ATTACHMENT, t.RENDERBUFFER, this._depthBuffer))
    }, i.ShaderPass.prototype._createFrameBuffer = function () {
        var t = this._wrapper.glContext;
        this._frameBuffer = t.createFramebuffer(), t.bindFramebuffer(t.FRAMEBUFFER, this._frameBuffer), t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, this.textures[0]._sampler.texture, 0), this._depthBuffer = t.createRenderbuffer(), this._bindDepthBuffer()
    }, i.Texture = function (t, e) {
        if (this._plane = t, this._wrapper = t._wrapper, t._isProgramValid || e.isTexturePass) return this.index = t.textures.length, this._sampler = {
            name: e.sampler || null
        }, this._willUpdate = !1, this.shouldUpdate = !1, this.scale = {
            x: 1,
            y: 1
        }, e.isTexturePass ? this._initShaderPassTexture() : this._init(), this;
        this._wrapper.productionMode || console.warn("Unable to create the texture because the program is not valid")
    }, i.Texture.prototype._init = function () {
        var t = this._wrapper.glContext,
            e = this._plane;
        this._sampler.texture = t.createTexture(), t.bindTexture(t.TEXTURE_2D, this._sampler.texture), t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, !1), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, 1, 1, 0, t.RGBA, t.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255])), this._sourceLoaded = !1, t.useProgram(e._program);
        var n = this._sampler.name || "uSampler" + this.index;
        this._sampler.location = t.getUniformLocation(e._program, n), t.uniform1i(this._sampler.location, this.index);
        var i = this._sampler.name ? this._sampler.name + "Matrix" : "uTextureMatrix" + this.index;
        this._textureMatrix = {
            name: i,
            matrix: null,
            location: t.getUniformLocation(this._plane._program, i)
        }, this._sampler.name = n
    }, i.Texture.prototype._initShaderPassTexture = function () {
        var t = this._wrapper.glContext;
        this.type = "texturePass", this._size = {
            width: this._plane._boundingRect.document.width,
            height: this._plane._boundingRect.document.height
        }, this._sampler.texture = t.createTexture(), t.bindTexture(t.TEXTURE_2D, this._sampler.texture), t.useProgram(this._plane._program), this._sampler.location = t.getUniformLocation(this._plane._program, this._sampler.name), t.uniform1i(this._sampler.location, this.index), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, this._size.width, this._size.height, 0, t.RGBA, t.UNSIGNED_BYTE, null), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE)
    }, i.Texture.prototype.setSource = function (t) {
        if (this._plane._isProgramValid) {
            this.source = t, "IMG" === t.tagName.toUpperCase() ? this.type = "image" : "VIDEO" === t.tagName.toUpperCase() ? (this.type = "video", this.shouldUpdate = !0) : "CANVAS" === t.tagName.toUpperCase() ? (this.type = "canvas", this._willUpdate = !0, this.shouldUpdate = !0) : this._wrapper.productionMode || console.warn("this HTML tag could not be converted into a texture:", t.tagName), this._size = {
                width: this.source.naturalWidth || this.source.width || this.source.videoWidth,
                height: this.source.naturalHeight || this.source.height || this.source.videoHeight
            };
            var e = this._wrapper.glContext;
            e.bindTexture(e.TEXTURE_2D, this._sampler.texture), e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, !0), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR), this._adjustTextureSize(), "video" !== this.type && e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, t), this._wrapper.needRender()
        } else this._wrapper.productionMode || console.warn("Unable to set the texture source because the program is not valid")
    }, i.Texture.prototype._update = function () {
        var t = this._wrapper.glContext;
        t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, this.source)
    }, i.Texture.prototype._getSizes = function () {
        var t = this._plane.scale ? this._plane.scale : {
                x: 1,
                y: 1
            },
            e = this._plane._boundingRect.document.width * t.x,
            n = this._plane._boundingRect.document.height * t.y,
            i = this._size.width,
            r = this._size.height,
            o = i / r,
            a = e / n,
            s = 0,
            u = 0;
        return a > o ? u = Math.min(0, n - e * (1 / o)) : a < o && (s = Math.min(0, e - n * o)), {
            planeWidth: e,
            planeHeight: n,
            sourceWidth: i,
            sourceHeight: r,
            xOffset: s,
            yOffset: u
        }
    }, i.Texture.prototype.setScale = function (t, e) {
        t = parseFloat(t) || 1, t = Math.max(t, .001), e = parseFloat(e) || 1, e = Math.max(e, .001), this.scale = {
            x: t,
            y: e
        }, this._adjustTextureSize()
    }, i.Texture.prototype._adjustTextureSize = function () {
        if ("texturePass" === this.type) {
            var t = this._wrapper.glContext;
            this._size.width = this._plane._boundingRect.document.width, this._size.height = this._plane._boundingRect.document.height, t.bindTexture(t.TEXTURE_2D, this._sampler.texture), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, this._size.width, this._size.height, 0, t.RGBA, t.UNSIGNED_BYTE, null)
        } else if (this.source) {
            var e = this._getSizes();
            this._updateTextureMatrix(e)
        }
    }, i.Texture.prototype._updateTextureMatrix = function (t) {
        var e = {
            x: t.planeWidth / (t.planeWidth - t.xOffset),
            y: t.planeHeight / (t.planeHeight - t.yOffset)
        };
        e.x /= this.scale.x, e.y /= this.scale.y;
        var n = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, (1 - e.x) / 2, (1 - e.y) / 2, 0, 1]);
        this._textureMatrix.matrix = this._wrapper._scaleMatrix(n, e.x, e.y, 1), this._wrapper.glContext.useProgram(this._plane._program), this._wrapper.glContext.uniformMatrix4fv(this._textureMatrix.location, !1, this._textureMatrix.matrix)
    }, i.Texture.prototype._onSourceLoaded = function (t) {
        this._plane._loadingManager.sourcesLoaded++, this.setSource(t);
        var e = this;
        this._sourceLoaded || setTimeout((function () {
            e._plane._onPlaneLoadingCallback && e._plane._onPlaneLoadingCallback()
        }), 0), this._sourceLoaded = !0
    }, i.Texture.prototype._onVideoLoadedData = function (t) {
        this._sourceLoaded || this._onSourceLoaded(t)
    }, i.Texture.prototype._drawTexture = function () {
        this._plane._bindPlaneTexture(this), "video" === this.type && this.source && this.source.readyState >= this.source.HAVE_CURRENT_DATA && !this.source.paused && this.source.currentTime > 0 && !this.source.ended && (this._willUpdate = !this._willUpdate), this._willUpdate && this.shouldUpdate && this._update()
    }, i.Texture.prototype._dispose = function () {
        "video" === this.type ? (this.source.removeEventListener("canplaythrough", this._onSourceLoadedHandler, !1), this.source.pause(), this.source.removeAttribute("src"), this.source.load(), this.source.updateInterval && clearInterval(this.source.updateInterval)) : "canvas" === this.type ? this.source.width = this.source.width : "image" === this.type && this.source.removeEventListener("load", this._onSourceLoadedHandler, !1), this.source = null;
        var t = this._wrapper.glContext;
        t && (t.activeTexture(t.TEXTURE0 + this.index), t.bindTexture(t.TEXTURE_2D, null), t.deleteTexture(this._sampler.texture)), this._plane._loadingManager.sourcesLoaded--
    }, t.exports = {
        Curtains: i
    }
}, function (t, e) {
    t.exports = function (t, {
        tagName: e = "span",
        split: n,
        setClassName: i = function (t) {
            return "char" + t
        }
    } = {}) {
        t.normalize();
        let r = 1;

        function o(t) {
            const o = t.parentNode,
                a = t.nodeValue;
            (n ? n(a) : a.split("")).forEach((function (n) {
                const a = document.createElement(e),
                    s = i(r++, n);
                s && (a.className = s), a.appendChild(document.createTextNode(n)), a.setAttribute("aria-hidden", "true"), o.insertBefore(a, t)
            })), "" !== a.trim() && o.setAttribute("aria-label", a), o.removeChild(t)
        }! function t(e) {
            if (3 === e.nodeType) return o(e);
            const n = Array.prototype.slice.call(e.childNodes);
            if (1 === n.length && 3 === n[0].nodeType) return o(n[0]);
            n.forEach((function (e) {
                t(e)
            }))
        }(t)
    }
}, function (t, e, n) {
    var i;
    /*! Hammer.JS - v2.0.8 - 2016-04-23
     * http://hammerjs.github.io/
     *
     * Copyright (c) 2016 Jorik Tangelder;
     * Licensed under the MIT license */
    ! function (r, o, a, s) {
        "use strict";

        function u(t, e, n) {
            return setTimeout(p(t, n), e)
        }

        function l(t, e, n) {
            return !!Array.isArray(t) && (h(t, n[e], n), !0)
        }

        function h(t, e, n) {
            var i;
            if (t)
                if (t.forEach) t.forEach(e, n);
                else if (t.length !== s)
                for (i = 0; i < t.length;) e.call(n, t[i], i, t), i++;
            else
                for (i in t) t.hasOwnProperty(i) && e.call(n, t[i], i, t)
        }

        function c(t, e, n) {
            var i = "DEPRECATED METHOD: " + e + "\n" + n + " AT \n";
            return function () {
                var e = new Error("get-stack-trace"),
                    n = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace",
                    o = r.console && (r.console.warn || r.console.log);
                return o && o.call(r.console, i, n), t.apply(this, arguments)
            }
        }

        function d(t, e, n) {
            var i, r = e.prototype;
            (i = t.prototype = Object.create(r)).constructor = t, i._super = r, n && st(i, n)
        }

        function p(t, e) {
            return function () {
                return t.apply(e, arguments)
            }
        }

        function f(t, e) {
            return typeof t == ht ? t.apply(e && e[0] || s, e) : t
        }

        function m(t, e) {
            return t === s ? e : t
        }

        function g(t, e, n) {
            h(y(e), (function (e) {
                t.addEventListener(e, n, !1)
            }))
        }

        function v(t, e, n) {
            h(y(e), (function (e) {
                t.removeEventListener(e, n, !1)
            }))
        }

        function _(t, e) {
            for (; t;) {
                if (t == e) return !0;
                t = t.parentNode
            }
            return !1
        }

        function x(t, e) {
            return t.indexOf(e) > -1
        }

        function y(t) {
            return t.trim().split(/\s+/g)
        }

        function b(t, e, n) {
            if (t.indexOf && !n) return t.indexOf(e);
            for (var i = 0; i < t.length;) {
                if (n && t[i][n] == e || !n && t[i] === e) return i;
                i++
            }
            return -1
        }

        function T(t) {
            return Array.prototype.slice.call(t, 0)
        }

        function w(t, e, n) {
            for (var i = [], r = [], o = 0; o < t.length;) {
                var a = e ? t[o][e] : t[o];
                b(r, a) < 0 && i.push(t[o]), r[o] = a, o++
            }
            return n && (i = e ? i.sort((function (t, n) {
                return t[e] > n[e]
            })) : i.sort()), i
        }

        function P(t, e) {
            for (var n, i, r = e[0].toUpperCase() + e.slice(1), o = 0; o < ut.length;) {
                if ((i = (n = ut[o]) ? n + r : e) in t) return i;
                o++
            }
            return s
        }

        function C(t) {
            var e = t.ownerDocument || t;
            return e.defaultView || e.parentWindow || r
        }

        function R(t, e) {
            var n = this;
            this.manager = t, this.callback = e, this.element = t.element, this.target = t.options.inputTarget, this.domHandler = function (e) {
                f(t.options.enable, [t]) && n.handler(e)
            }, this.init()
        }

        function E(t, e, n) {
            var i = n.pointers.length,
                r = n.changedPointers.length,
                o = e & wt && i - r == 0,
                a = e & (Ct | Rt) && i - r == 0;
            n.isFirst = !!o, n.isFinal = !!a, o && (t.session = {}), n.eventType = e,
                function (t, e) {
                    var n = t.session,
                        i = e.pointers,
                        r = i.length;
                    n.firstInput || (n.firstInput = M(e)), r > 1 && !n.firstMultiple ? n.firstMultiple = M(e) : 1 === r && (n.firstMultiple = !1);
                    var o = n.firstInput,
                        a = n.firstMultiple,
                        s = a ? a.center : o.center,
                        u = e.center = D(i);
                    e.timeStamp = pt(), e.deltaTime = e.timeStamp - o.timeStamp, e.angle = I(s, u), e.distance = L(s, u),
                        function (t, e) {
                            var n = e.center,
                                i = t.offsetDelta || {},
                                r = t.prevDelta || {},
                                o = t.prevInput || {};
                            e.eventType !== wt && o.eventType !== Ct || (r = t.prevDelta = {
                                x: o.deltaX || 0,
                                y: o.deltaY || 0
                            }, i = t.offsetDelta = {
                                x: n.x,
                                y: n.y
                            }), e.deltaX = r.x + (n.x - i.x), e.deltaY = r.y + (n.y - i.y)
                        }(n, e), e.offsetDirection = B(e.deltaX, e.deltaY);
                    var l = A(e.deltaTime, e.deltaX, e.deltaY);
                    e.overallVelocityX = l.x, e.overallVelocityY = l.y, e.overallVelocity = dt(l.x) > dt(l.y) ? l.x : l.y, e.scale = a ? function (t, e) {
                        return L(e[0], e[1], kt) / L(t[0], t[1], kt)
                    }(a.pointers, i) : 1, e.rotation = a ? function (t, e) {
                        return I(e[1], e[0], kt) + I(t[1], t[0], kt)
                    }(a.pointers, i) : 0, e.maxPointers = n.prevInput ? e.pointers.length > n.prevInput.maxPointers ? e.pointers.length : n.prevInput.maxPointers : e.pointers.length, S(n, e);
                    var h = t.element;
                    _(e.srcEvent.target, h) && (h = e.srcEvent.target), e.target = h
                }(t, n), t.emit("hammer.input", n), t.recognize(n), t.session.prevInput = n
        }

        function S(t, e) {
            var n, i, r, o, a = t.lastInterval || e,
                u = e.timeStamp - a.timeStamp;
            if (e.eventType != Rt && (u > Tt || a.velocity === s)) {
                var l = e.deltaX - a.deltaX,
                    h = e.deltaY - a.deltaY,
                    c = A(u, l, h);
                i = c.x, r = c.y, n = dt(c.x) > dt(c.y) ? c.x : c.y, o = B(l, h), t.lastInterval = e
            } else n = a.velocity, i = a.velocityX, r = a.velocityY, o = a.direction;
            e.velocity = n, e.velocityX = i, e.velocityY = r, e.direction = o
        }

        function M(t) {
            for (var e = [], n = 0; n < t.pointers.length;) e[n] = {
                clientX: ct(t.pointers[n].clientX),
                clientY: ct(t.pointers[n].clientY)
            }, n++;
            return {
                timeStamp: pt(),
                pointers: e,
                center: D(e),
                deltaX: t.deltaX,
                deltaY: t.deltaY
            }
        }

        function D(t) {
            var e = t.length;
            if (1 === e) return {
                x: ct(t[0].clientX),
                y: ct(t[0].clientY)
            };
            for (var n = 0, i = 0, r = 0; e > r;) n += t[r].clientX, i += t[r].clientY, r++;
            return {
                x: ct(n / e),
                y: ct(i / e)
            }
        }

        function A(t, e, n) {
            return {
                x: e / t || 0,
                y: n / t || 0
            }
        }

        function B(t, e) {
            return t === e ? Et : dt(t) >= dt(e) ? 0 > t ? St : Mt : 0 > e ? Dt : At
        }

        function L(t, e, n) {
            n || (n = Ft);
            var i = e[n[0]] - t[n[0]],
                r = e[n[1]] - t[n[1]];
            return Math.sqrt(i * i + r * r)
        }

        function I(t, e, n) {
            n || (n = Ft);
            var i = e[n[0]] - t[n[0]],
                r = e[n[1]] - t[n[1]];
            return 180 * Math.atan2(r, i) / Math.PI
        }

        function F() {
            this.evEl = Nt, this.evWin = Ut, this.pressed = !1, R.apply(this, arguments)
        }

        function k() {
            this.evEl = Ht, this.evWin = Xt, R.apply(this, arguments), this.store = this.manager.session.pointerEvents = []
        }

        function O() {
            this.evTarget = Wt, this.evWin = Gt, this.started = !1, R.apply(this, arguments)
        }

        function N(t, e) {
            var n = T(t.touches),
                i = T(t.changedTouches);
            return e & (Ct | Rt) && (n = w(n.concat(i), "identifier", !0)), [n, i]
        }

        function U() {
            this.evTarget = jt, this.targetIds = {}, R.apply(this, arguments)
        }

        function z(t, e) {
            var n = T(t.touches),
                i = this.targetIds;
            if (e & (wt | Pt) && 1 === n.length) return i[n[0].identifier] = !0, [n, n];
            var r, o, a = T(t.changedTouches),
                s = [],
                u = this.target;
            if (o = n.filter((function (t) {
                    return _(t.target, u)
                })), e === wt)
                for (r = 0; r < o.length;) i[o[r].identifier] = !0, r++;
            for (r = 0; r < a.length;) i[a[r].identifier] && s.push(a[r]), e & (Ct | Rt) && delete i[a[r].identifier], r++;
            return s.length ? [w(o.concat(s), "identifier", !0), s] : void 0
        }

        function V() {
            R.apply(this, arguments);
            var t = p(this.handler, this);
            this.touch = new U(this.manager, t), this.mouse = new F(this.manager, t), this.primaryTouch = null, this.lastTouches = []
        }

        function H(t, e) {
            t & wt ? (this.primaryTouch = e.changedPointers[0].identifier, X.call(this, e)) : t & (Ct | Rt) && X.call(this, e)
        }

        function X(t) {
            var e = t.changedPointers[0];
            if (e.identifier === this.primaryTouch) {
                var n = {
                    x: e.clientX,
                    y: e.clientY
                };
                this.lastTouches.push(n);
                var i = this.lastTouches;
                setTimeout((function () {
                    var t = i.indexOf(n);
                    t > -1 && i.splice(t, 1)
                }), Zt)
            }
        }

        function Y(t) {
            for (var e = t.srcEvent.clientX, n = t.srcEvent.clientY, i = 0; i < this.lastTouches.length; i++) {
                var r = this.lastTouches[i],
                    o = Math.abs(e - r.x),
                    a = Math.abs(n - r.y);
                if ($t >= o && $t >= a) return !0
            }
            return !1
        }

        function W(t, e) {
            this.manager = t, this.set(e)
        }

        function G(t) {
            this.options = st({}, this.defaults, t || {}), this.id = gt++, this.manager = null, this.options.enable = m(this.options.enable, !0), this.state = ae, this.simultaneous = {}, this.requireFail = []
        }

        function q(t) {
            return t & ce ? "cancel" : t & le ? "end" : t & ue ? "move" : t & se ? "start" : ""
        }

        function j(t) {
            return t == At ? "down" : t == Dt ? "up" : t == St ? "left" : t == Mt ? "right" : ""
        }

        function Z(t, e) {
            var n = e.manager;
            return n ? n.get(t) : t
        }

        function $() {
            G.apply(this, arguments)
        }

        function K() {
            $.apply(this, arguments), this.pX = null, this.pY = null
        }

        function Q() {
            $.apply(this, arguments)
        }

        function J() {
            G.apply(this, arguments), this._timer = null, this._input = null
        }

        function tt() {
            $.apply(this, arguments)
        }

        function et() {
            $.apply(this, arguments)
        }

        function nt() {
            G.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0
        }

        function it(t, e) {
            return (e = e || {}).recognizers = m(e.recognizers, it.defaults.preset), new rt(t, e)
        }

        function rt(t, e) {
            this.options = st({}, it.defaults, e || {}), this.options.inputTarget = this.options.inputTarget || t, this.handlers = {}, this.session = {}, this.recognizers = [], this.oldCssProps = {}, this.element = t, this.input = function (t) {
                var e = t.options.inputClass;
                return new(e || (_t ? k : xt ? U : vt ? V : F))(t, E)
            }(this), this.touchAction = new W(this, this.options.touchAction), ot(this, !0), h(this.options.recognizers, (function (t) {
                var e = this.add(new t[0](t[1]));
                t[2] && e.recognizeWith(t[2]), t[3] && e.requireFailure(t[3])
            }), this)
        }

        function ot(t, e) {
            var n, i = t.element;
            i.style && (h(t.options.cssProps, (function (r, o) {
                n = P(i.style, o), e ? (t.oldCssProps[n] = i.style[n], i.style[n] = r) : i.style[n] = t.oldCssProps[n] || ""
            })), e || (t.oldCssProps = {}))
        }

        function at(t, e) {
            var n = o.createEvent("Event");
            n.initEvent(t, !0, !0), n.gesture = e, e.target.dispatchEvent(n)
        }
        var st, ut = ["", "webkit", "Moz", "MS", "ms", "o"],
            lt = o.createElement("div"),
            ht = "function",
            ct = Math.round,
            dt = Math.abs,
            pt = Date.now;
        st = "function" != typeof Object.assign ? function (t) {
            if (t === s || null === t) throw new TypeError("Cannot convert undefined or null to object");
            for (var e = Object(t), n = 1; n < arguments.length; n++) {
                var i = arguments[n];
                if (i !== s && null !== i)
                    for (var r in i) i.hasOwnProperty(r) && (e[r] = i[r])
            }
            return e
        } : Object.assign;
        var ft = c((function (t, e, n) {
                for (var i = Object.keys(e), r = 0; r < i.length;)(!n || n && t[i[r]] === s) && (t[i[r]] = e[i[r]]), r++;
                return t
            }), "extend", "Use `assign`."),
            mt = c((function (t, e) {
                return ft(t, e, !0)
            }), "merge", "Use `assign`."),
            gt = 1,
            vt = "ontouchstart" in r,
            _t = P(r, "PointerEvent") !== s,
            xt = vt && /mobile|tablet|ip(ad|hone|od)|android/i.test(navigator.userAgent),
            yt = "touch",
            bt = "mouse",
            Tt = 25,
            wt = 1,
            Pt = 2,
            Ct = 4,
            Rt = 8,
            Et = 1,
            St = 2,
            Mt = 4,
            Dt = 8,
            At = 16,
            Bt = St | Mt,
            Lt = Dt | At,
            It = Bt | Lt,
            Ft = ["x", "y"],
            kt = ["clientX", "clientY"];
        R.prototype = {
            handler: function () {},
            init: function () {
                this.evEl && g(this.element, this.evEl, this.domHandler), this.evTarget && g(this.target, this.evTarget, this.domHandler), this.evWin && g(C(this.element), this.evWin, this.domHandler)
            },
            destroy: function () {
                this.evEl && v(this.element, this.evEl, this.domHandler), this.evTarget && v(this.target, this.evTarget, this.domHandler), this.evWin && v(C(this.element), this.evWin, this.domHandler)
            }
        };
        var Ot = {
                mousedown: wt,
                mousemove: Pt,
                mouseup: Ct
            },
            Nt = "mousedown",
            Ut = "mousemove mouseup";
        d(F, R, {
            handler: function (t) {
                var e = Ot[t.type];
                e & wt && 0 === t.button && (this.pressed = !0), e & Pt && 1 !== t.which && (e = Ct), this.pressed && (e & Ct && (this.pressed = !1), this.callback(this.manager, e, {
                    pointers: [t],
                    changedPointers: [t],
                    pointerType: bt,
                    srcEvent: t
                }))
            }
        });
        var zt = {
                pointerdown: wt,
                pointermove: Pt,
                pointerup: Ct,
                pointercancel: Rt,
                pointerout: Rt
            },
            Vt = {
                2: yt,
                3: "pen",
                4: bt,
                5: "kinect"
            },
            Ht = "pointerdown",
            Xt = "pointermove pointerup pointercancel";
        r.MSPointerEvent && !r.PointerEvent && (Ht = "MSPointerDown", Xt = "MSPointerMove MSPointerUp MSPointerCancel"), d(k, R, {
            handler: function (t) {
                var e = this.store,
                    n = !1,
                    i = t.type.toLowerCase().replace("ms", ""),
                    r = zt[i],
                    o = Vt[t.pointerType] || t.pointerType,
                    a = o == yt,
                    s = b(e, t.pointerId, "pointerId");
                r & wt && (0 === t.button || a) ? 0 > s && (e.push(t), s = e.length - 1) : r & (Ct | Rt) && (n = !0), 0 > s || (e[s] = t, this.callback(this.manager, r, {
                    pointers: e,
                    changedPointers: [t],
                    pointerType: o,
                    srcEvent: t
                }), n && e.splice(s, 1))
            }
        });
        var Yt = {
                touchstart: wt,
                touchmove: Pt,
                touchend: Ct,
                touchcancel: Rt
            },
            Wt = "touchstart",
            Gt = "touchstart touchmove touchend touchcancel";
        d(O, R, {
            handler: function (t) {
                var e = Yt[t.type];
                if (e === wt && (this.started = !0), this.started) {
                    var n = N.call(this, t, e);
                    e & (Ct | Rt) && n[0].length - n[1].length == 0 && (this.started = !1), this.callback(this.manager, e, {
                        pointers: n[0],
                        changedPointers: n[1],
                        pointerType: yt,
                        srcEvent: t
                    })
                }
            }
        });
        var qt = {
                touchstart: wt,
                touchmove: Pt,
                touchend: Ct,
                touchcancel: Rt
            },
            jt = "touchstart touchmove touchend touchcancel";
        d(U, R, {
            handler: function (t) {
                var e = qt[t.type],
                    n = z.call(this, t, e);
                n && this.callback(this.manager, e, {
                    pointers: n[0],
                    changedPointers: n[1],
                    pointerType: yt,
                    srcEvent: t
                })
            }
        });
        var Zt = 2500,
            $t = 25;
        d(V, R, {
            handler: function (t, e, n) {
                var i = n.pointerType == yt,
                    r = n.pointerType == bt;
                if (!(r && n.sourceCapabilities && n.sourceCapabilities.firesTouchEvents)) {
                    if (i) H.call(this, e, n);
                    else if (r && Y.call(this, n)) return;
                    this.callback(t, e, n)
                }
            },
            destroy: function () {
                this.touch.destroy(), this.mouse.destroy()
            }
        });
        var Kt = P(lt.style, "touchAction"),
            Qt = Kt !== s,
            Jt = "compute",
            te = "auto",
            ee = "manipulation",
            ne = "none",
            ie = "pan-x",
            re = "pan-y",
            oe = function () {
                if (!Qt) return !1;
                var t = {},
                    e = r.CSS && r.CSS.supports;
                return ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach((function (n) {
                    t[n] = !e || r.CSS.supports("touch-action", n)
                })), t
            }();
        W.prototype = {
            set: function (t) {
                t == Jt && (t = this.compute()), Qt && this.manager.element.style && oe[t] && (this.manager.element.style[Kt] = t), this.actions = t.toLowerCase().trim()
            },
            update: function () {
                this.set(this.manager.options.touchAction)
            },
            compute: function () {
                var t = [];
                return h(this.manager.recognizers, (function (e) {
                        f(e.options.enable, [e]) && (t = t.concat(e.getTouchAction()))
                    })),
                    function (t) {
                        if (x(t, ne)) return ne;
                        var e = x(t, ie),
                            n = x(t, re);
                        return e && n ? ne : e || n ? e ? ie : re : x(t, ee) ? ee : te
                    }(t.join(" "))
            },
            preventDefaults: function (t) {
                var e = t.srcEvent,
                    n = t.offsetDirection;
                if (!this.manager.session.prevented) {
                    var i = this.actions,
                        r = x(i, ne) && !oe[ne],
                        o = x(i, re) && !oe[re],
                        a = x(i, ie) && !oe[ie];
                    if (r) {
                        var s = 1 === t.pointers.length,
                            u = t.distance < 2,
                            l = t.deltaTime < 250;
                        if (s && u && l) return
                    }
                    return a && o ? void 0 : r || o && n & Bt || a && n & Lt ? this.preventSrc(e) : void 0
                }
                e.preventDefault()
            },
            preventSrc: function (t) {
                this.manager.session.prevented = !0, t.preventDefault()
            }
        };
        var ae = 1,
            se = 2,
            ue = 4,
            le = 8,
            he = le,
            ce = 16;
        G.prototype = {
            defaults: {},
            set: function (t) {
                return st(this.options, t), this.manager && this.manager.touchAction.update(), this
            },
            recognizeWith: function (t) {
                if (l(t, "recognizeWith", this)) return this;
                var e = this.simultaneous;
                return e[(t = Z(t, this)).id] || (e[t.id] = t, t.recognizeWith(this)), this
            },
            dropRecognizeWith: function (t) {
                return l(t, "dropRecognizeWith", this) ? this : (t = Z(t, this), delete this.simultaneous[t.id], this)
            },
            requireFailure: function (t) {
                if (l(t, "requireFailure", this)) return this;
                var e = this.requireFail;
                return -1 === b(e, t = Z(t, this)) && (e.push(t), t.requireFailure(this)), this
            },
            dropRequireFailure: function (t) {
                if (l(t, "dropRequireFailure", this)) return this;
                t = Z(t, this);
                var e = b(this.requireFail, t);
                return e > -1 && this.requireFail.splice(e, 1), this
            },
            hasRequireFailures: function () {
                return this.requireFail.length > 0
            },
            canRecognizeWith: function (t) {
                return !!this.simultaneous[t.id]
            },
            emit: function (t) {
                function e(e) {
                    n.manager.emit(e, t)
                }
                var n = this,
                    i = this.state;
                le > i && e(n.options.event + q(i)), e(n.options.event), t.additionalEvent && e(t.additionalEvent), i >= le && e(n.options.event + q(i))
            },
            tryEmit: function (t) {
                return this.canEmit() ? this.emit(t) : void(this.state = 32)
            },
            canEmit: function () {
                for (var t = 0; t < this.requireFail.length;) {
                    if (!(this.requireFail[t].state & (32 | ae))) return !1;
                    t++
                }
                return !0
            },
            recognize: function (t) {
                var e = st({}, t);
                return f(this.options.enable, [this, e]) ? (this.state & (he | ce | 32) && (this.state = ae), this.state = this.process(e), void(this.state & (se | ue | le | ce) && this.tryEmit(e))) : (this.reset(), void(this.state = 32))
            },
            process: function (t) {},
            getTouchAction: function () {},
            reset: function () {}
        }, d($, G, {
            defaults: {
                pointers: 1
            },
            attrTest: function (t) {
                var e = this.options.pointers;
                return 0 === e || t.pointers.length === e
            },
            process: function (t) {
                var e = this.state,
                    n = t.eventType,
                    i = e & (se | ue),
                    r = this.attrTest(t);
                return i && (n & Rt || !r) ? e | ce : i || r ? n & Ct ? e | le : e & se ? e | ue : se : 32
            }
        }), d(K, $, {
            defaults: {
                event: "pan",
                threshold: 10,
                pointers: 1,
                direction: It
            },
            getTouchAction: function () {
                var t = this.options.direction,
                    e = [];
                return t & Bt && e.push(re), t & Lt && e.push(ie), e
            },
            directionTest: function (t) {
                var e = this.options,
                    n = !0,
                    i = t.distance,
                    r = t.direction,
                    o = t.deltaX,
                    a = t.deltaY;
                return r & e.direction || (e.direction & Bt ? (r = 0 === o ? Et : 0 > o ? St : Mt, n = o != this.pX, i = Math.abs(t.deltaX)) : (r = 0 === a ? Et : 0 > a ? Dt : At, n = a != this.pY, i = Math.abs(t.deltaY))), t.direction = r, n && i > e.threshold && r & e.direction
            },
            attrTest: function (t) {
                return $.prototype.attrTest.call(this, t) && (this.state & se || !(this.state & se) && this.directionTest(t))
            },
            emit: function (t) {
                this.pX = t.deltaX, this.pY = t.deltaY;
                var e = j(t.direction);
                e && (t.additionalEvent = this.options.event + e), this._super.emit.call(this, t)
            }
        }), d(Q, $, {
            defaults: {
                event: "pinch",
                threshold: 0,
                pointers: 2
            },
            getTouchAction: function () {
                return [ne]
            },
            attrTest: function (t) {
                return this._super.attrTest.call(this, t) && (Math.abs(t.scale - 1) > this.options.threshold || this.state & se)
            },
            emit: function (t) {
                if (1 !== t.scale) {
                    var e = t.scale < 1 ? "in" : "out";
                    t.additionalEvent = this.options.event + e
                }
                this._super.emit.call(this, t)
            }
        }), d(J, G, {
            defaults: {
                event: "press",
                pointers: 1,
                time: 251,
                threshold: 9
            },
            getTouchAction: function () {
                return [te]
            },
            process: function (t) {
                var e = this.options,
                    n = t.pointers.length === e.pointers,
                    i = t.distance < e.threshold,
                    r = t.deltaTime > e.time;
                if (this._input = t, !i || !n || t.eventType & (Ct | Rt) && !r) this.reset();
                else if (t.eventType & wt) this.reset(), this._timer = u((function () {
                    this.state = he, this.tryEmit()
                }), e.time, this);
                else if (t.eventType & Ct) return he;
                return 32
            },
            reset: function () {
                clearTimeout(this._timer)
            },
            emit: function (t) {
                this.state === he && (t && t.eventType & Ct ? this.manager.emit(this.options.event + "up", t) : (this._input.timeStamp = pt(), this.manager.emit(this.options.event, this._input)))
            }
        }), d(tt, $, {
            defaults: {
                event: "rotate",
                threshold: 0,
                pointers: 2
            },
            getTouchAction: function () {
                return [ne]
            },
            attrTest: function (t) {
                return this._super.attrTest.call(this, t) && (Math.abs(t.rotation) > this.options.threshold || this.state & se)
            }
        }), d(et, $, {
            defaults: {
                event: "swipe",
                threshold: 10,
                velocity: .3,
                direction: Bt | Lt,
                pointers: 1
            },
            getTouchAction: function () {
                return K.prototype.getTouchAction.call(this)
            },
            attrTest: function (t) {
                var e, n = this.options.direction;
                return n & (Bt | Lt) ? e = t.overallVelocity : n & Bt ? e = t.overallVelocityX : n & Lt && (e = t.overallVelocityY), this._super.attrTest.call(this, t) && n & t.offsetDirection && t.distance > this.options.threshold && t.maxPointers == this.options.pointers && dt(e) > this.options.velocity && t.eventType & Ct
            },
            emit: function (t) {
                var e = j(t.offsetDirection);
                e && this.manager.emit(this.options.event + e, t), this.manager.emit(this.options.event, t)
            }
        }), d(nt, G, {
            defaults: {
                event: "tap",
                pointers: 1,
                taps: 1,
                interval: 300,
                time: 250,
                threshold: 9,
                posThreshold: 10
            },
            getTouchAction: function () {
                return [ee]
            },
            process: function (t) {
                var e = this.options,
                    n = t.pointers.length === e.pointers,
                    i = t.distance < e.threshold,
                    r = t.deltaTime < e.time;
                if (this.reset(), t.eventType & wt && 0 === this.count) return this.failTimeout();
                if (i && r && n) {
                    if (t.eventType != Ct) return this.failTimeout();
                    var o = !this.pTime || t.timeStamp - this.pTime < e.interval,
                        a = !this.pCenter || L(this.pCenter, t.center) < e.posThreshold;
                    if (this.pTime = t.timeStamp, this.pCenter = t.center, a && o ? this.count += 1 : this.count = 1, this._input = t, 0 === this.count % e.taps) return this.hasRequireFailures() ? (this._timer = u((function () {
                        this.state = he, this.tryEmit()
                    }), e.interval, this), se) : he
                }
                return 32
            },
            failTimeout: function () {
                return this._timer = u((function () {
                    this.state = 32
                }), this.options.interval, this), 32
            },
            reset: function () {
                clearTimeout(this._timer)
            },
            emit: function () {
                this.state == he && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input))
            }
        }), it.VERSION = "2.0.8", 
        it.defaults = {
            domEvents: !1,
            touchAction: Jt,
            enable: !0,
            inputTarget: null,
            inputClass: null,
            preset: [
                [tt, {
                    enable: !1
                }],
                [Q, {
                        enable: !1
                    },
                    ["rotate"]
                ],
                [et, {
                    direction: Bt
                }],
                [K, {
                        direction: Bt
                    },
                    ["swipe"]
                ],
                [nt],
                [nt, {
                        event: "doubletap",
                        taps: 2
                    },
                    ["tap"]
                ],
                [J]
            ],
            cssProps: {
                userSelect: "none",
                touchSelect: "none",
                touchCallout: "none",
                contentZooming: "none",
                userDrag: "none",
                tapHighlightColor: "rgba(0,0,0,0)"
            }
        };
        rt.prototype = {
            set: function (t) {
                return st(this.options, t), t.touchAction && this.touchAction.update(), t.inputTarget && (this.input.destroy(), this.input.target = t.inputTarget, this.input.init()), this
            },
            stop: function (t) {
                this.session.stopped = t ? 2 : 1
            },
            recognize: function (t) {
                var e = this.session;
                if (!e.stopped) {
                    this.touchAction.preventDefaults(t);
                    var n, i = this.recognizers,
                        r = e.curRecognizer;
                    (!r || r && r.state & he) && (r = e.curRecognizer = null);
                    for (var o = 0; o < i.length;) n = i[o], 2 === e.stopped || r && n != r && !n.canRecognizeWith(r) ? n.reset() : n.recognize(t), !r && n.state & (se | ue | le) && (r = e.curRecognizer = n), o++
                }
            },
            get: function (t) {
                if (t instanceof G) return t;
                for (var e = this.recognizers, n = 0; n < e.length; n++)
                    if (e[n].options.event == t) return e[n];
                return null
            },
            add: function (t) {
                if (l(t, "add", this)) return this;
                var e = this.get(t.options.event);
                return e && this.remove(e), this.recognizers.push(t), t.manager = this, this.touchAction.update(), t
            },
            remove: function (t) {
                if (l(t, "remove", this)) return this;
                if (t = this.get(t)) {
                    var e = this.recognizers,
                        n = b(e, t); - 1 !== n && (e.splice(n, 1), this.touchAction.update())
                }
                return this
            },
            on: function (t, e) {
                if (t !== s && e !== s) {
                    var n = this.handlers;
                    return h(y(t), (function (t) {
                        n[t] = n[t] || [], n[t].push(e)
                    })), this
                }
            },
            off: function (t, e) {
                if (t !== s) {
                    var n = this.handlers;
                    return h(y(t), (function (t) {
                        e ? n[t] && n[t].splice(b(n[t], e), 1) : delete n[t]
                    })), this
                }
            },
            emit: function (t, e) {
                this.options.domEvents && at(t, e);
                var n = this.handlers[t] && this.handlers[t].slice();
                if (n && n.length) {
                    e.type = t, e.preventDefault = function () {
                        e.srcEvent.preventDefault()
                    };
                    for (var i = 0; i < n.length;) n[i](e), i++
                }
            },
            destroy: function () {
                this.element && ot(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null
            }
        }, st(it, {
            INPUT_START: wt,
            INPUT_MOVE: Pt,
            INPUT_END: Ct,
            INPUT_CANCEL: Rt,
            STATE_POSSIBLE: ae,
            STATE_BEGAN: se,
            STATE_CHANGED: ue,
            STATE_ENDED: le,
            STATE_RECOGNIZED: he,
            STATE_CANCELLED: ce,
            STATE_FAILED: 32,
            DIRECTION_NONE: Et,
            DIRECTION_LEFT: St,
            DIRECTION_RIGHT: Mt,
            DIRECTION_UP: Dt,
            DIRECTION_DOWN: At,
            DIRECTION_HORIZONTAL: Bt,
            DIRECTION_VERTICAL: Lt,
            DIRECTION_ALL: It,
            Manager: rt,
            Input: R,
            TouchAction: W,
            TouchInput: U,
            MouseInput: F,
            PointerEventInput: k,
            TouchMouseInput: V,
            SingleTouchInput: O,
            Recognizer: G,
            AttrRecognizer: $,
            Tap: nt,
            Pan: K,
            Swipe: et,
            Pinch: Q,
            Rotate: tt,
            Press: J,
            on: g,
            off: v,
            each: h,
            merge: mt,
            extend: ft,
            assign: st,
            inherit: d,
            bindFn: p,
            prefixed: P
        }), (void 0 !== r ? r : "undefined" != typeof self ? self : {}).Hammer = it, void 0 === (i = function () {
            return it
        }.call(e, n, e, t)) || (t.exports = i)
    }(window, document)
}, function (t, e, n) {
    "use strict";
    n.r(e);
    n(2);
    var i = {
            update: null,
            begin: null,
            loopBegin: null,
            changeBegin: null,
            change: null,
            changeComplete: null,
            loopComplete: null,
            complete: null,
            loop: 1,
            direction: "normal",
            autoplay: !0,
            timelineOffset: 0
        },
        r = {
            duration: 1e3,
            delay: 0,
            endDelay: 0,
            easing: "easeOutElastic(1, .5)",
            round: 0
        },
        o = ["translateX", "translateY", "translateZ", "rotate", "rotateX", "rotateY", "rotateZ", "scale", "scaleX", "scaleY", "scaleZ", "skew", "skewX", "skewY", "perspective"],
        a = {
            CSS: {},
            springs: {}
        };

    function s(t, e, n) {
        return Math.min(Math.max(t, e), n)
    }

    function u(t, e) {
        return t.indexOf(e) > -1
    }

    function l(t, e) {
        return t.apply(null, e)
    }
    var h = {
        arr: function (t) {
            return Array.isArray(t)
        },
        obj: function (t) {
            return u(Object.prototype.toString.call(t), "Object")
        },
        pth: function (t) {
            return h.obj(t) && t.hasOwnProperty("totalLength")
        },
        svg: function (t) {
            return t instanceof SVGElement
        },
        inp: function (t) {
            return t instanceof HTMLInputElement
        },
        dom: function (t) {
            return t.nodeType || h.svg(t)
        },
        str: function (t) {
            return "string" == typeof t
        },
        fnc: function (t) {
            return "function" == typeof t
        },
        und: function (t) {
            return void 0 === t
        },
        hex: function (t) {
            return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(t)
        },
        rgb: function (t) {
            return /^rgb/.test(t)
        },
        hsl: function (t) {
            return /^hsl/.test(t)
        },
        col: function (t) {
            return h.hex(t) || h.rgb(t) || h.hsl(t)
        },
        key: function (t) {
            return !i.hasOwnProperty(t) && !r.hasOwnProperty(t) && "targets" !== t && "keyframes" !== t
        }
    };

    function c(t) {
        var e = /\(([^)]+)\)/.exec(t);
        return e ? e[1].split(",").map((function (t) {
            return parseFloat(t)
        })) : []
    }

    function d(t, e) {
        var n = c(t),
            i = s(h.und(n[0]) ? 1 : n[0], .1, 100),
            r = s(h.und(n[1]) ? 100 : n[1], .1, 100),
            o = s(h.und(n[2]) ? 10 : n[2], .1, 100),
            u = s(h.und(n[3]) ? 0 : n[3], .1, 100),
            l = Math.sqrt(r / i),
            d = o / (2 * Math.sqrt(r * i)),
            p = d < 1 ? l * Math.sqrt(1 - d * d) : 0,
            f = 1,
            m = d < 1 ? (d * l - u) / p : -u + l;

        function g(t) {
            var n = e ? e * t / 1e3 : t;
            return n = d < 1 ? Math.exp(-n * d * l) * (f * Math.cos(p * n) + m * Math.sin(p * n)) : (f + m * n) * Math.exp(-n * l), 0 === t || 1 === t ? t : 1 - n
        }
        return e ? g : function () {
            var e = a.springs[t];
            if (e) return e;
            for (var n = 0, i = 0;;)
                if (1 === g(n += 1 / 6)) {
                    if (++i >= 16) break
                } else i = 0;
            var r = n * (1 / 6) * 1e3;
            return a.springs[t] = r, r
        }
    }

    function p(t) {
        return void 0 === t && (t = 10),
            function (e) {
                return Math.round(e * t) * (1 / t)
            }
    }
    var f, m, g = function () {
            var t = 11,
                e = 1 / (t - 1);

            function n(t, e) {
                return 1 - 3 * e + 3 * t
            }

            function i(t, e) {
                return 3 * e - 6 * t
            }

            function r(t) {
                return 3 * t
            }

            function o(t, e, o) {
                return ((n(e, o) * t + i(e, o)) * t + r(e)) * t
            }

            function a(t, e, o) {
                return 3 * n(e, o) * t * t + 2 * i(e, o) * t + r(e)
            }
            return function (n, i, r, s) {
                if (0 <= n && n <= 1 && 0 <= r && r <= 1) {
                    var u = new Float32Array(t);
                    if (n !== i || r !== s)
                        for (var l = 0; l < t; ++l) u[l] = o(l * e, n, r);
                    return function (t) {
                        return n === i && r === s ? t : 0 === t || 1 === t ? t : o(h(t), i, s)
                    }
                }

                function h(i) {
                    for (var s = 0, l = 1, h = t - 1; l !== h && u[l] <= i; ++l) s += e;
                    var c = s + (i - u[--l]) / (u[l + 1] - u[l]) * e,
                        d = a(c, n, r);
                    return d >= .001 ? function (t, e, n, i) {
                        for (var r = 0; r < 4; ++r) {
                            var s = a(e, n, i);
                            if (0 === s) return e;
                            e -= (o(e, n, i) - t) / s
                        }
                        return e
                    }(i, c, n, r) : 0 === d ? c : function (t, e, n, i, r) {
                        var a, s, u = 0;
                        do {
                            (a = o(s = e + (n - e) / 2, i, r) - t) > 0 ? n = s : e = s
                        } while (Math.abs(a) > 1e-7 && ++u < 10);
                        return s
                    }(i, s, s + e, n, r)
                }
            }
        }(),
        v = (f = {
            linear: function () {
                return function (t) {
                    return t
                }
            }
        }, m = {
            Sine: function () {
                return function (t) {
                    return 1 - Math.cos(t * Math.PI / 2)
                }
            },
            Circ: function () {
                return function (t) {
                    return 1 - Math.sqrt(1 - t * t)
                }
            },
            Back: function () {
                return function (t) {
                    return t * t * (3 * t - 2)
                }
            },
            Bounce: function () {
                return function (t) {
                    for (var e, n = 4; t < ((e = Math.pow(2, --n)) - 1) / 11;);
                    return 1 / Math.pow(4, 3 - n) - 7.5625 * Math.pow((3 * e - 2) / 22 - t, 2)
                }
            },
            Elastic: function (t, e) {
                void 0 === t && (t = 1), void 0 === e && (e = .5);
                var n = s(t, 1, 10),
                    i = s(e, .1, 2);
                return function (t) {
                    return 0 === t || 1 === t ? t : -n * Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1 - i / (2 * Math.PI) * Math.asin(1 / n)) * (2 * Math.PI) / i)
                }
            }
        }, ["Quad", "Cubic", "Quart", "Quint", "Expo"].forEach((function (t, e) {
            m[t] = function () {
                return function (t) {
                    return Math.pow(t, e + 2)
                }
            }
        })), Object.keys(m).forEach((function (t) {
            var e = m[t];
            f["easeIn" + t] = e, f["easeOut" + t] = function (t, n) {
                return function (i) {
                    return 1 - e(t, n)(1 - i)
                }
            }, f["easeInOut" + t] = function (t, n) {
                return function (i) {
                    return i < .5 ? e(t, n)(2 * i) / 2 : 1 - e(t, n)(-2 * i + 2) / 2
                }
            }
        })), f);

    function _(t, e) {
        if (h.fnc(t)) return t;
        var n = t.split("(")[0],
            i = v[n],
            r = c(t);
        switch (n) {
            case "spring":
                return d(t, e);
            case "cubicBezier":
                return l(g, r);
            case "steps":
                return l(p, r);
            default:
                return l(i, r)
        }
    }

    function x(t) {
        try {
            return document.querySelectorAll(t)
        } catch (t) {
            return
        }
    }

    function y(t, e) {
        for (var n = t.length, i = arguments.length >= 2 ? arguments[1] : void 0, r = [], o = 0; o < n; o++)
            if (o in t) {
                var a = t[o];
                e.call(i, a, o, t) && r.push(a)
            } return r
    }

    function b(t) {
        return t.reduce((function (t, e) {
            return t.concat(h.arr(e) ? b(e) : e)
        }), [])
    }

    function T(t) {
        return h.arr(t) ? t : (h.str(t) && (t = x(t) || t), t instanceof NodeList || t instanceof HTMLCollection ? [].slice.call(t) : [t])
    }

    function w(t, e) {
        return t.some((function (t) {
            return t === e
        }))
    }

    function P(t) {
        var e = {};
        for (var n in t) e[n] = t[n];
        return e
    }

    function C(t, e) {
        var n = P(t);
        for (var i in t) n[i] = e.hasOwnProperty(i) ? e[i] : t[i];
        return n
    }

    function R(t, e) {
        var n = P(t);
        for (var i in e) n[i] = h.und(t[i]) ? e[i] : t[i];
        return n
    }

    function E(t) {
        return h.rgb(t) ? (n = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(e = t)) ? "rgba(" + n[1] + ",1)" : e : h.hex(t) ? function (t) {
            var e = t.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (function (t, e, n, i) {
                    return e + e + n + n + i + i
                })),
                n = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
            return "rgba(" + parseInt(n[1], 16) + "," + parseInt(n[2], 16) + "," + parseInt(n[3], 16) + ",1)"
        }(t) : h.hsl(t) ? function (t) {
            var e, n, i, r = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(t) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(t),
                o = parseInt(r[1], 10) / 360,
                a = parseInt(r[2], 10) / 100,
                s = parseInt(r[3], 10) / 100,
                u = r[4] || 1;

            function l(t, e, n) {
                return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + 6 * (e - t) * n : n < .5 ? e : n < 2 / 3 ? t + (e - t) * (2 / 3 - n) * 6 : t
            }
            if (0 == a) e = n = i = s;
            else {
                var h = s < .5 ? s * (1 + a) : s + a - s * a,
                    c = 2 * s - h;
                e = l(c, h, o + 1 / 3), n = l(c, h, o), i = l(c, h, o - 1 / 3)
            }
            return "rgba(" + 255 * e + "," + 255 * n + "," + 255 * i + "," + u + ")"
        }(t) : void 0;
        var e, n
    }

    function S(t) {
        var e = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(t);
        if (e) return e[1]
    }

    function M(t, e) {
        return h.fnc(t) ? t(e.target, e.id, e.total) : t
    }

    function D(t, e) {
        return t.getAttribute(e)
    }

    function A(t, e, n) {
        if (w([n, "deg", "rad", "turn"], S(e))) return e;
        var i = a.CSS[e + n];
        if (!h.und(i)) return i;
        var r = document.createElement(t.tagName),
            o = t.parentNode && t.parentNode !== document ? t.parentNode : document.body;
        o.appendChild(r), r.style.position = "absolute", r.style.width = 100 + n;
        var s = 100 / r.offsetWidth;
        o.removeChild(r);
        var u = s * parseFloat(e);
        return a.CSS[e + n] = u, u
    }

    function B(t, e, n) {
        if (e in t.style) {
            var i = e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
                r = t.style[e] || getComputedStyle(t).getPropertyValue(i) || "0";
            return n ? A(t, r, n) : r
        }
    }

    function L(t, e) {
        return h.dom(t) && !h.inp(t) && (D(t, e) || h.svg(t) && t[e]) ? "attribute" : h.dom(t) && w(o, e) ? "transform" : h.dom(t) && "transform" !== e && B(t, e) ? "css" : null != t[e] ? "object" : void 0
    }

    function I(t) {
        if (h.dom(t)) {
            for (var e, n = t.style.transform || "", i = /(\w+)\(([^)]*)\)/g, r = new Map; e = i.exec(n);) r.set(e[1], e[2]);
            return r
        }
    }

    function F(t, e, n, i) {
        var r = u(e, "scale") ? 1 : 0 + function (t) {
                return u(t, "translate") || "perspective" === t ? "px" : u(t, "rotate") || u(t, "skew") ? "deg" : void 0
            }(e),
            o = I(t).get(e) || r;
        return n && (n.transforms.list.set(e, o), n.transforms.last = e), i ? A(t, o, i) : o
    }

    function k(t, e, n, i) {
        switch (L(t, e)) {
            case "transform":
                return F(t, e, i, n);
            case "css":
                return B(t, e, n);
            case "attribute":
                return D(t, e);
            default:
                return t[e] || 0
        }
    }

    function O(t, e) {
        var n = /^(\*=|\+=|-=)/.exec(t);
        if (!n) return t;
        var i = S(t) || 0,
            r = parseFloat(e),
            o = parseFloat(t.replace(n[0], ""));
        switch (n[0][0]) {
            case "+":
                return r + o + i;
            case "-":
                return r - o + i;
            case "*":
                return r * o + i
        }
    }

    function N(t, e) {
        if (h.col(t)) return E(t);
        if (/\s/g.test(t)) return t;
        var n = S(t),
            i = n ? t.substr(0, t.length - n.length) : t;
        return e ? i + e : i
    }

    function U(t, e) {
        return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2))
    }

    function z(t) {
        for (var e, n = t.points, i = 0, r = 0; r < n.numberOfItems; r++) {
            var o = n.getItem(r);
            r > 0 && (i += U(e, o)), e = o
        }
        return i
    }

    function V(t) {
        if (t.getTotalLength) return t.getTotalLength();
        switch (t.tagName.toLowerCase()) {
            case "circle":
                return function (t) {
                    return 2 * Math.PI * D(t, "r")
                }(t);
            case "rect":
                return function (t) {
                    return 2 * D(t, "width") + 2 * D(t, "height")
                }(t);
            case "line":
                return function (t) {
                    return U({
                        x: D(t, "x1"),
                        y: D(t, "y1")
                    }, {
                        x: D(t, "x2"),
                        y: D(t, "y2")
                    })
                }(t);
            case "polyline":
                return z(t);
            case "polygon":
                return function (t) {
                    var e = t.points;
                    return z(t) + U(e.getItem(e.numberOfItems - 1), e.getItem(0))
                }(t)
        }
    }

    function H(t, e) {
        var n = e || {},
            i = n.el || function (t) {
                for (var e = t.parentNode; h.svg(e) && h.svg(e.parentNode);) e = e.parentNode;
                return e
            }(t),
            r = i.getBoundingClientRect(),
            o = D(i, "viewBox"),
            a = r.width,
            s = r.height,
            u = n.viewBox || (o ? o.split(" ") : [0, 0, a, s]);
        return {
            el: i,
            viewBox: u,
            x: u[0] / 1,
            y: u[1] / 1,
            w: a / u[2],
            h: s / u[3]
        }
    }

    function X(t, e) {
        function n(n) {
            void 0 === n && (n = 0);
            var i = e + n >= 1 ? e + n : 0;
            return t.el.getPointAtLength(i)
        }
        var i = H(t.el, t.svg),
            r = n(),
            o = n(-1),
            a = n(1);
        switch (t.property) {
            case "x":
                return (r.x - i.x) * i.w;
            case "y":
                return (r.y - i.y) * i.h;
            case "angle":
                return 180 * Math.atan2(a.y - o.y, a.x - o.x) / Math.PI
        }
    }

    function Y(t, e) {
        var n = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g,
            i = N(h.pth(t) ? t.totalLength : t, e) + "";
        return {
            original: i,
            numbers: i.match(n) ? i.match(n).map(Number) : [0],
            strings: h.str(t) || e ? i.split(n) : []
        }
    }

    function W(t) {
        return y(t ? b(h.arr(t) ? t.map(T) : T(t)) : [], (function (t, e, n) {
            return n.indexOf(t) === e
        }))
    }

    function G(t) {
        var e = W(t);
        return e.map((function (t, n) {
            return {
                target: t,
                id: n,
                total: e.length,
                transforms: {
                    list: I(t)
                }
            }
        }))
    }

    function q(t, e) {
        var n = P(e);
        if (/^spring/.test(n.easing) && (n.duration = d(n.easing)), h.arr(t)) {
            var i = t.length;
            2 === i && !h.obj(t[0]) ? t = {
                value: t
            } : h.fnc(e.duration) || (n.duration = e.duration / i)
        }
        var r = h.arr(t) ? t : [t];
        return r.map((function (t, n) {
            var i = h.obj(t) && !h.pth(t) ? t : {
                value: t
            };
            return h.und(i.delay) && (i.delay = n ? 0 : e.delay), h.und(i.endDelay) && (i.endDelay = n === r.length - 1 ? e.endDelay : 0), i
        })).map((function (t) {
            return R(t, n)
        }))
    }

    function j(t, e) {
        var n = [],
            i = e.keyframes;
        for (var r in i && (e = R(function (t) {
                for (var e = y(b(t.map((function (t) {
                        return Object.keys(t)
                    }))), (function (t) {
                        return h.key(t)
                    })).reduce((function (t, e) {
                        return t.indexOf(e) < 0 && t.push(e), t
                    }), []), n = {}, i = function (i) {
                        var r = e[i];
                        n[r] = t.map((function (t) {
                            var e = {};
                            for (var n in t) h.key(n) ? n == r && (e.value = t[n]) : e[n] = t[n];
                            return e
                        }))
                    }, r = 0; r < e.length; r++) i(r);
                return n
            }(i), e)), e) h.key(r) && n.push({
            name: r,
            tweens: q(e[r], t)
        });
        return n
    }

    function Z(t, e) {
        var n;
        return t.tweens.map((function (i) {
            var r = function (t, e) {
                    var n = {};
                    for (var i in t) {
                        var r = M(t[i], e);
                        h.arr(r) && 1 === (r = r.map((function (t) {
                            return M(t, e)
                        }))).length && (r = r[0]), n[i] = r
                    }
                    return n.duration = parseFloat(n.duration), n.delay = parseFloat(n.delay), n
                }(i, e),
                o = r.value,
                a = h.arr(o) ? o[1] : o,
                s = S(a),
                u = k(e.target, t.name, s, e),
                l = n ? n.to.original : u,
                c = h.arr(o) ? o[0] : l,
                d = S(c) || S(u),
                p = s || d;
            return h.und(a) && (a = l), r.from = Y(c, p), r.to = Y(O(a, c), p), r.start = n ? n.end : 0, r.end = r.start + r.delay + r.duration + r.endDelay, r.easing = _(r.easing, r.duration), r.isPath = h.pth(o), r.isColor = h.col(r.from.original), r.isColor && (r.round = 1), n = r, r
        }))
    }
    var $ = {
        css: function (t, e, n) {
            return t.style[e] = n
        },
        attribute: function (t, e, n) {
            return t.setAttribute(e, n)
        },
        object: function (t, e, n) {
            return t[e] = n
        },
        transform: function (t, e, n, i, r) {
            if (i.list.set(e, n), e === i.last || r) {
                var o = "";
                i.list.forEach((function (t, e) {
                    o += e + "(" + t + ") "
                })), t.style.transform = o
            }
        }
    };

    function K(t, e) {
        G(t).forEach((function (t) {
            for (var n in e) {
                var i = M(e[n], t),
                    r = t.target,
                    o = S(i),
                    a = k(r, n, o, t),
                    s = O(N(i, o || S(a)), a),
                    u = L(r, n);
                $[u](r, n, s, t.transforms, !0)
            }
        }))
    }

    function Q(t, e) {
        return y(b(t.map((function (t) {
            return e.map((function (e) {
                return function (t, e) {
                    var n = L(t.target, e.name);
                    if (n) {
                        var i = Z(e, t),
                            r = i[i.length - 1];
                        return {
                            type: n,
                            property: e.name,
                            animatable: t,
                            tweens: i,
                            duration: r.end,
                            delay: i[0].delay,
                            endDelay: r.endDelay
                        }
                    }
                }(t, e)
            }))
        }))), (function (t) {
            return !h.und(t)
        }))
    }

    function J(t, e) {
        var n = t.length,
            i = function (t) {
                return t.timelineOffset ? t.timelineOffset : 0
            },
            r = {};
        return r.duration = n ? Math.max.apply(Math, t.map((function (t) {
            return i(t) + t.duration
        }))) : e.duration, r.delay = n ? Math.min.apply(Math, t.map((function (t) {
            return i(t) + t.delay
        }))) : e.delay, r.endDelay = n ? r.duration - Math.max.apply(Math, t.map((function (t) {
            return i(t) + t.duration - t.endDelay
        }))) : e.endDelay, r
    }
    var tt = 0;
    var et, nt = [],
        it = [],
        rt = function () {
            function t() {
                et = requestAnimationFrame(e)
            }

            function e(e) {
                var n = nt.length;
                if (n) {
                    for (var i = 0; i < n;) {
                        var r = nt[i];
                        if (r.paused) {
                            var o = nt.indexOf(r);
                            o > -1 && (nt.splice(o, 1), n = nt.length)
                        } else r.tick(e);
                        i++
                    }
                    t()
                } else et = cancelAnimationFrame(et)
            }
            return t
        }();

    function ot(t) {
        void 0 === t && (t = {});
        var e, n = 0,
            o = 0,
            a = 0,
            u = 0,
            l = null;

        function h(t) {
            var e = window.Promise && new Promise((function (t) {
                return l = t
            }));
            return t.finished = e, e
        }
        var c = function (t) {
            var e = C(i, t),
                n = C(r, t),
                o = j(n, t),
                a = G(t.targets),
                s = Q(a, o),
                u = J(s, n),
                l = tt;
            return tt++, R(e, {
                id: l,
                children: [],
                animatables: a,
                animations: s,
                duration: u.duration,
                delay: u.delay,
                endDelay: u.endDelay
            })
        }(t);
        h(c);

        function d() {
            var t = c.direction;
            "alternate" !== t && (c.direction = "normal" !== t ? "normal" : "reverse"), c.reversed = !c.reversed, e.forEach((function (t) {
                return t.reversed = c.reversed
            }))
        }

        function p(t) {
            return c.reversed ? c.duration - t : t
        }

        function f() {
            n = 0, o = p(c.currentTime) * (1 / ot.speed)
        }

        function m(t, e) {
            e && e.seek(t - e.timelineOffset)
        }

        function g(t) {
            for (var e = 0, n = c.animations, i = n.length; e < i;) {
                var r = n[e],
                    o = r.animatable,
                    a = r.tweens,
                    u = a.length - 1,
                    l = a[u];
                u && (l = y(a, (function (e) {
                    return t < e.end
                }))[0] || l);
                for (var h = s(t - l.start - l.delay, 0, l.duration) / l.duration, d = isNaN(h) ? 1 : l.easing(h), p = l.to.strings, f = l.round, m = [], g = l.to.numbers.length, v = void 0, _ = 0; _ < g; _++) {
                    var x = void 0,
                        b = l.to.numbers[_],
                        T = l.from.numbers[_] || 0;
                    x = l.isPath ? X(l.value, d * b) : T + d * (b - T), f && (l.isColor && _ > 2 || (x = Math.round(x * f) / f)), m.push(x)
                }
                var w = p.length;
                if (w) {
                    v = p[0];
                    for (var P = 0; P < w; P++) {
                        p[P];
                        var C = p[P + 1],
                            R = m[P];
                        isNaN(R) || (v += C ? R + C : R + " ")
                    }
                } else v = m[0];
                $[r.type](o.target, r.property, v, o.transforms), r.currentValue = v, e++
            }
        }

        function v(t) {
            c[t] && !c.passThrough && c[t](c)
        }

        function _(t) {
            var i = c.duration,
                r = c.delay,
                f = i - c.endDelay,
                _ = p(t);
            c.progress = s(_ / i * 100, 0, 100), c.reversePlayback = _ < c.currentTime, e && function (t) {
                if (c.reversePlayback)
                    for (var n = u; n--;) m(t, e[n]);
                else
                    for (var i = 0; i < u; i++) m(t, e[i])
            }(_), !c.began && c.currentTime > 0 && (c.began = !0, v("begin")), !c.loopBegan && c.currentTime > 0 && (c.loopBegan = !0, v("loopBegin")), _ <= r && 0 !== c.currentTime && g(0), (_ >= f && c.currentTime !== i || !i) && g(i), _ > r && _ < f ? (c.changeBegan || (c.changeBegan = !0, c.changeCompleted = !1, v("changeBegin")), v("change"), g(_)) : c.changeBegan && (c.changeCompleted = !0, c.changeBegan = !1, v("changeComplete")), c.currentTime = s(_, 0, i), c.began && v("update"), t >= i && (o = 0, c.remaining && !0 !== c.remaining && c.remaining--, c.remaining ? (n = a, v("loopComplete"), c.loopBegan = !1, "alternate" === c.direction && d()) : (c.paused = !0, c.completed || (c.completed = !0, v("loopComplete"), v("complete"), !c.passThrough && "Promise" in window && (l(), h(c)))))
        }
        return c.reset = function () {
            var t = c.direction;
            c.passThrough = !1, c.currentTime = 0, c.progress = 0, c.paused = !0, c.began = !1, c.loopBegan = !1, c.changeBegan = !1, c.completed = !1, c.changeCompleted = !1, c.reversePlayback = !1, c.reversed = "reverse" === t, c.remaining = c.loop, e = c.children;
            for (var n = u = e.length; n--;) c.children[n].reset();
            (c.reversed && !0 !== c.loop || "alternate" === t && 1 === c.loop) && c.remaining++, g(c.reversed ? c.duration : 0)
        }, c.set = function (t, e) {
            return K(t, e), c
        }, c.tick = function (t) {
            a = t, n || (n = a), _((a + (o - n)) * ot.speed)
        }, c.seek = function (t) {
            _(p(t))
        }, c.pause = function () {
            c.paused = !0, f()
        }, c.play = function () {
            c.paused && (c.completed && c.reset(), c.paused = !1, nt.push(c), f(), et || rt())
        }, c.reverse = function () {
            d(), f()
        }, c.restart = function () {
            c.reset(), c.play()
        }, c.reset(), c.autoplay && c.play(), c
    }

    function at(t, e) {
        for (var n = e.length; n--;) w(t, e[n].animatable.target) && e.splice(n, 1)
    }
    "undefined" != typeof document && document.addEventListener("visibilitychange", (function () {
        document.hidden ? (nt.forEach((function (t) {
            return t.pause()
        })), it = nt.slice(0), ot.running = nt = []) : it.forEach((function (t) {
            return t.play()
        }))
    })), ot.version = "3.1.0", ot.speed = 1, ot.running = nt, ot.remove = function (t) {
        for (var e = W(t), n = nt.length; n--;) {
            var i = nt[n],
                r = i.animations,
                o = i.children;
            at(e, r);
            for (var a = o.length; a--;) {
                var s = o[a],
                    u = s.animations;
                at(e, u), u.length || s.children.length || o.splice(a, 1)
            }
            r.length || o.length || i.pause()
        }
    }, ot.get = k, ot.set = K, ot.convertPx = A, ot.path = function (t, e) {
        var n = h.str(t) ? x(t)[0] : t,
            i = e || 100;
        return function (t) {
            return {
                property: t,
                el: n,
                svg: H(n),
                totalLength: V(n) * (i / 100)
            }
        }
    }, ot.setDashoffset = function (t) {
        var e = V(t);
        return t.setAttribute("stroke-dasharray", e), e
    }, ot.stagger = function (t, e) {
        void 0 === e && (e = {});
        var n = e.direction || "normal",
            i = e.easing ? _(e.easing) : null,
            r = e.grid,
            o = e.axis,
            a = e.from || 0,
            s = "first" === a,
            u = "center" === a,
            l = "last" === a,
            c = h.arr(t),
            d = c ? parseFloat(t[0]) : parseFloat(t),
            p = c ? parseFloat(t[1]) : 0,
            f = S(c ? t[1] : t) || 0,
            m = e.start || 0 + (c ? d : 0),
            g = [],
            v = 0;
        return function (t, e, h) {
            if (s && (a = 0), u && (a = (h - 1) / 2), l && (a = h - 1), !g.length) {
                for (var _ = 0; _ < h; _++) {
                    if (r) {
                        var x = u ? (r[0] - 1) / 2 : a % r[0],
                            y = u ? (r[1] - 1) / 2 : Math.floor(a / r[0]),
                            b = x - _ % r[0],
                            T = y - Math.floor(_ / r[0]),
                            w = Math.sqrt(b * b + T * T);
                        "x" === o && (w = -b), "y" === o && (w = -T), g.push(w)
                    } else g.push(Math.abs(a - _));
                    v = Math.max.apply(Math, g)
                }
                i && (g = g.map((function (t) {
                    return i(t / v) * v
                }))), "reverse" === n && (g = g.map((function (t) {
                    return o ? t < 0 ? -1 * t : -t : Math.abs(v - t)
                })))
            }
            return m + (c ? (p - d) / v : d) * (Math.round(100 * g[e]) / 100) + f
        }
    }, ot.timeline = function (t) {
        void 0 === t && (t = {});
        var e = ot(t);
        return e.duration = 0, e.add = function (n, i) {
            var o = nt.indexOf(e),
                a = e.children;

            function s(t) {
                t.passThrough = !0
            }
            o > -1 && nt.splice(o, 1);
            for (var u = 0; u < a.length; u++) s(a[u]);
            var l = R(n, C(r, t));
            l.targets = l.targets || t.targets;
            var c = e.duration;
            l.autoplay = !1, l.direction = e.direction, l.timelineOffset = h.und(i) ? c : O(i, c), s(e), e.seek(l.timelineOffset);
            var d = ot(l);
            s(d), a.push(d);
            var p = J(a, t);
            return e.delay = p.delay, e.endDelay = p.endDelay, e.duration = p.duration, e.seek(0), e.reset(), e.autoplay && e.play(), e
        }, e
    }, ot.easing = _, ot.penner = v, ot.random = function (t, e) {
        return Math.floor(Math.random() * (e - t + 1)) + t
    };
    var st = ot,
        ut = n(0);
    const lt = n(1);
    var ht = function () {
        const t = "\n\t\t#ifdef GL_ES\n\t\tprecision mediump float;\n\t\t#endif\n\n\t\t// default mandatory variables\n\t\tattribute vec3 aVertexPosition;\n\t\tattribute vec2 aTextureCoord;\n\n\t\tuniform mat4 uMVMatrix;\n\t\tuniform mat4 uPMatrix;\n\n\t\t// custom varyings\n\t\tvarying vec3 vVertexPosition;\n\t\tvarying vec2 vTextureMatrixCoord;\n\n\t\tvoid main() {\n\t\t\tvec3 vertexPosition = aVertexPosition;\n\n\t\t\tgl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);\n\n\t\t\t// varyings\n\t\t\tvVertexPosition = vertexPosition;\n\t\t\tvTextureMatrixCoord = (vec4(aTextureCoord, 0.0, 1.0)).xy;\n\t\t}\n\t",
            e = "\n\t\t#ifdef GL_ES\n\t\tprecision mediump float;\n\t\t#endif\n\n\t\tvarying vec3 vVertexPosition;\n\t\tvarying vec2 vTextureCoord;\n\t\tvarying vec2 vTextureMatrixCoord;\n\n\t\tuniform sampler2D uSampler0;\n\n\t\tvoid main( void ) {\n\t\t\tvec2 textureCoord = vTextureMatrixCoord;\n\n\t\t\tvec4 finalColor = texture2D(uSampler0, textureCoord);\n\n\t\t\tgl_FragColor = finalColor;\n\t\t}\n\t",
            n = "\n\t\t#ifdef GL_ES\n\t\tprecision mediump float;\n\t\t#endif\n\n\t\tvarying vec3 vVertexPosition;\n\t\tvarying vec2 vTextureCoord;\n\t\tvarying vec2 vTextureMatrixCoord;\n\t\t\n\t\tuniform vec2 uMousePosition;\n\n\t\tuniform sampler2D statueTexture;\n\t\tuniform sampler2D statueMapTexture;\n\n\t\tvoid main( void ) {\n\t\t\tvec2 textureCoord = vTextureMatrixCoord;\n\t\t\tvec3 vertexPosition = vVertexPosition;\n\n\t\t\tvec4 depth = texture2D(statueMapTexture, textureCoord);\n\n\t\t\tvec4 finalColor = texture2D(statueTexture, textureCoord - depth.r * uMousePosition*0.03);\n\n\t\t\t// Lighting\n\t\t\tfloat yCoordRatio = vertexPosition.y - 1.4;\n\n\t\t\tfloat distanceToMouse = distance(vec2(uMousePosition.x, 0.0), vec2(vertexPosition.x, 0.0));\n\n\t\t\tfloat waveMouse = 2.0 * cos(distanceToMouse * 2.0);\n\n\t\t\tfloat xAttenuation = ((4.0 - abs(uMousePosition.x - vertexPosition.x)) / 4.0);\n\n\t\t\tfloat clothEffect = yCoordRatio * waveMouse * xAttenuation;\n\n\t\t\tvertexPosition.z +=  clothEffect / 60.0;\n\n\t\t\tfinalColor.rgb += clamp(-vertexPosition.z, 0.0, 1.0) * 0.1;\n\t\t\tfinalColor.rgb -= clamp(vertexPosition.z, 0.0, 1.0) * 0.1;\n\t\t\t\n\t\t\tfinalColor = vec4(finalColor.rgb * finalColor.a, finalColor.a);\n\n\t\t\tgl_FragColor = finalColor;\n\t\t}\n\t";
        var i = {
                x: 0,
                y: 0
            },
            r = {
                x: 0,
                y: 0
            },
            o = 0,
            a = (window.devicePixelRatio && window.devicePixelRatio, []),
            s = document.body,
            u = {
                vertexShader: "\n\t\t#ifdef GL_ES\n\t\tprecision mediump float;\n\t\t#endif\n\n\t\tattribute vec3 aVertexPosition;\n\t\tattribute vec2 aTextureCoord;\n\t\tvarying vec3 vVertexPosition;\n\t\tvarying vec2 vTextureCoord;\n\t\tvoid main() {\n\t\t\tgl_Position = vec4(aVertexPosition, 1.0);\n\t\t\tvTextureCoord = aTextureCoord;\n\t\t\tvVertexPosition = aVertexPosition;\n\t\t}\n\t",
                fragmentShader: "\n\t\t#ifdef GL_ES\n\t\tprecision mediump float;\n\t\t#endif\n\n\t\tvarying vec3 vVertexPosition;\n\t\tvarying vec2 vTextureCoord;\n\n\t\tuniform float uTime;\n\t\tuniform vec2 uMousePosition;\n\t\tuniform float uMouseMoveStrength;\n\n\t\tuniform sampler2D uRenderTexture;\n\n\t\t#define PI 3.14159\n\n\t\tfloat numflaps = 4.0;\n\t\tfloat amplitude = 2.0;\n\t\tfloat frequency = 5.0;\n\n\t\tvoid main() {\n\t\t\tvec2 textureCoord = vTextureCoord;\n\t\t\tvec3 vertexPosition = vVertexPosition;\n\n\t\t\tfloat yCoordRatio = vertexPosition.y - 1.4;\n\t\t\tfloat mouseStrength = max(sqrt(uMouseMoveStrength), 1.0);\n\n\t\t\tfloat distanceToMouse = distance(vec2(uMousePosition.x, 0.0), vec2(vertexPosition.x, 0.0));\n\n\t\t\t//float waveAmbience = cos(10.0 * ((1.0 / (distanceToMouse - 2.4)) - (uTime / 500.0)));\n\t\t\tfloat waveAmbience = amplitude * sin(vertexPosition.x*numflaps - frequency * 0.01*uTime);\n\t\t\t\n\t\t\tfloat waveMouse = amplitude * cos(distanceToMouse * 2.0) * mouseStrength;\n\n\t\t\t//waveAmbience = amplitude * cos(distanceToMouse * 4.0);\n\n\t\t\tfloat xAttenuation = ((4.0 - abs(uMousePosition.x - vertexPosition.x)) / 4.0);\n\n\t\t\tvertexPosition.z = yCoordRatio * (waveAmbience - waveMouse) * mouseStrength * xAttenuation / 60.0;\n\t\t\tvertexPosition.x = yCoordRatio * amplitude * cos(vertexPosition.x*numflaps - frequency * 0.01*uTime) * xAttenuation / 200.0;\n\t\t\t//vertexPosition.x =  yCoordRatio * cos(10.0 * 1.5 * ((1.0 / (distanceToMouse - 3.0)) - (uTime / 500.0))) / 100.0;\n\n\t\t\ttextureCoord.y += vertexPosition.z * 0.2;\n\t\t\ttextureCoord.x -= vertexPosition.x * 0.6;\n\n\t\t\tvec4 finalColor = texture2D(uRenderTexture, textureCoord);\n\n\t\t\tvertexPosition.z = vertexPosition.z *1.2 / mouseStrength;\n\t\t\t//vertexPosition.z = vertexPosition.z *1.5 / uMouseMoveStrength - vertexPosition.x * 5.0; //+ yCoordRatio * cos(10.0 * 1.5 * ((1.0 / (distanceToMouse - 3.0)) - (uTime / 500.0)) - 3.14 * 0.3) / 100.0 * 2.0;\n\n\t\t\t//finalColor.rgb -= 0.05;\n\t\t\tfinalColor.rgb += clamp(-vertexPosition.z, 0.0, 1.0) * 0.2;\n\t\t\tfinalColor.rgb -= clamp(vertexPosition.z, 0.0, 1.0) * 0.4;\n\n\t\t\tfinalColor = vec4(finalColor.rgb * finalColor.a, finalColor.a);\n\n\t\t\tgl_FragColor = finalColor;\n\t\t}\n\t",
                widthSegments: 20,
                heightSegments: 20,
                uniforms: {
                    time: {
                        name: "uTime",
                        type: "1f",
                        value: 0
                    },
                    resolution: {
                        name: "uResolution",
                        type: "2f",
                        value: [window.innerWidth, window.innerHeight]
                    },
                    mousePosition: {
                        name: "uMousePosition",
                        type: "2f",
                        value: [i.x, i.y]
                    },
                    mouseMoveStrength: {
                        name: "uMouseMoveStrength",
                        type: "1f",
                        value: 0
                    }
                }
            },
            l = new ut.Curtains({
                container: "canvas",
                production: !0,
                watchScroll: !1
            });
        l.onError((function () {
            s.classList.add("no-curtains")
        }));
        var h, c, d = document.getElementsByClassName("plane"),
            p = document.getElementsByClassName("plane--media"),
            f = !1,
            m = document.getElementById("pattern");

        function g(t, e) {
            var n = t.htmlElement,
                i = window.getComputedStyle(n),
                r = n.classList;
            t.setRelativePosition(0, -4);
            var o = t.getBoundingRect(),
                a = o.width / l.pixelRatio,
                s = o.height / l.pixelRatio;
            e.width = a, e.height = s;
            var u = e.getContext("2d", {
                    alpha: !1
                }),
                h = u.createPattern(m, "repeat");
            u.fillStyle = h, u.fillRect(0, 0, a, s), n.innerText && (u.fillStyle = i.color, u.font = i.fontWeight + " " + parseFloat(i.fontSize) + "px " + i.fontFamily, u.textBaseline = "top", r.contains("vert") ? (u.textBaseline = "bottom", u.translate(a - 5, a), u.rotate(Math.PI / 2), u.fillText(n.innerText, -a, a), t.setRelativePosition(0, 0)) : parseFloat(i.fontSize) > 52 ? u.fillText(n.innerText, 0, -4) : parseFloat(i.fontSize) > 36 ? u.fillText(n.innerText, 0, 2) : u.fillText(n.innerText, 0, 0))
        }
        var v, _ = document.querySelector(".section--quote .statue__img");
        var x = {
            enable: !0,
            el: document.getElementById("cursor"),
            processTimer: null
        };
        window.matchMedia("(max-width : 992px)").matches && (x.enable = !1);
        var y = Math.min(1, window.innerWidth / 1366),
            b = 1;

        function T(t, e) {
            t.targetTouches ? (i.x = t.targetTouches[0].clientX, i.y = t.targetTouches[0].clientY) : (i.x = t.clientX, i.y = t.clientY), w(t.target);
            var n = e.mouseToPlaneCoords(i.x, i.y);
            if (v && (v.uniforms.mousePosition.value = [n.x, n.y]), r.x && r.y) {
                var a = Math.sqrt(Math.pow(i.x - r.x, 2) + Math.pow(i.y - r.y, 2)) / 30;
                a = Math.min(3, a), (a *= y) >= o && (o = a, b = i.x > r.x ? 1 : -1)
            }
            r.x = i.x, r.y = i.y
        }

        function w(t) {
            var e = x.el.classList,
                n = x.enable ? 1500 : 500;

            function i() {
                e.contains("processing") && (e.remove("processing"), clearTimeout(x.processTimer)), e.contains("detailed") && (e.remove("detailed"), c.textures[0].shouldUpdate = !1, c.textures[0].source.pause(), c.textures[0].setSource(c.images[0]))
            }
            "A" == t.tagName || t.classList.contains("clickable") || t.parentElement.classList.contains("clickable") || s.classList.contains("dragging") ? (f && t.classList.contains("project__image") ? e.contains("processing") || (e.add("processing"), x.processTimer = setTimeout((function () {
                e.add("detailed"), (c = a[t.children[0].dataset.index]).textures[0].setSource(c.videos[0]), c.textures[0].source.muted = !0, c.textures[0].source.play()
            }), n)) : e.contains("processing") && i(), e.contains("active") || e.add("active")) : (i(), e.contains("active") && e.remove("active"))
        }
        return {
            init: function () {
                for (var n = 0; n < d.length; n++)
                    if (d[n].style.height = d[n].offsetHeight + 8 + "px", d[n].dataset.index = n, !d[n].classList.contains("plane--media")) {
                        var r = l.addPlane(d[n], {
                            vertexShader: t,
                            fragmentShader: e
                        });
                        if (r) {
                            var c = document.createElement("canvas");
                            g(r, c), r.loadCanvas(c), a[n] = r, r.textures[0].shouldUpdate = !1
                        }
                    } var p = l.addShaderPass(u),
                    f = p.mouseToPlaneCoords(i.x, i.y);
                p && p.onReady((function () {
                    s.classList.add("curtains-ready"), l.setPixelRatio(l.pixelRatio), s.addEventListener("mousemove", (function (t) {
                        T(t, p)
                    })), s.addEventListener("touchmove", (function (t) {
                        T(t, p)
                    }), {
                        passive: !0
                    }), window.addEventListener("resize", (function () {
                        (h = a[a.length - 1]).textures[0].shouldUpdate = !0, h.htmlElement.style.height = 1.1 * s.offsetHeight + "px", h.planeResize(), h.textures[0].shouldUpdate = !1
                    }))
                })).onRender((function () {
                    p.uniforms.time.value += b * o, p.uniforms.mouseMoveStrength.value = o, o = Math.max(1 * y, .992 * o);
                    var t = p.mouseToPlaneCoords(i.x, i.y);
                    f.x += .2 * (t.x - f.x), p.uniforms.mousePosition.value = [f.x, f.y], x.enable && (x.el.style.transform = "translate(calc(" + i.x + "px - 50%),calc(" + i.y + "px  - 50%))")
                }))
            },
            loadMedia: function () {
                for (var r = 0; r < p.length; r++)
                    for (var o = 0, s = p[r].children; o < s.length; o++) s[o].src = s[o].dataset.src;
                for (r = 0; r < d.length; r++)
                    if (d[r].classList.contains("plane--media")) {
                        var u = l.addPlane(d[r], {
                            vertexShader: t,
                            fragmentShader: e
                        });
                        u && (u.moveToFront(), a[r] = u, u.onReady((function () {
                            for (var t = 0; t < u.textures.length; t++) u.textures[t].shouldUpdate = !1
                        })))
                    } for (r = 0, s = _.children; r < s.length; r++) s[r].src = s[r].dataset.src;
                var h = new ut.Curtains({
                    container: "canvas-statue",
                    production: !0,
                    watchScroll: !1
                });
                (v = h.addPlane(_, {
                    vertexShader: t,
                    fragmentShader: n,
                    uniforms: {
                        mousePosition: {
                            name: "uMousePosition",
                            type: "2f",
                            value: [i.x, i.y]
                        }
                    }
                })) && v.onReady((function () {
                    v.textures[0].shouldUpdate = !1, _.classList.add("ready"), h.setPixelRatio(h.pixelRatio)
                })), f = !0
            },
            scroll: function (t) {
                l.updateScrollValues(t, 0);
                for (var e = 0; e < a.length - 1; e++) a[e].updateScrollPosition()
            },
            setMousePosition: function (t, e, n) {
                i.x = e, i.y = n, w(t)
            }
        }
    }();

    function ct(t) {
        var e, n = document.getElementById("scrollbar__thumb"),
            i = 0,
            r = 0,
            o = 0,
            a = 0,
            s = 1500,
            u = n.parentElement.offsetWidth,
            l = document.getElementById("page"),
            h = parseFloat(l.offsetWidth),
            c = document.getElementsByClassName("section"),
            d = c.length,
            p = u / d;
        n.style.width = p + "px";
        for (var f = {
                documentBody: document.body,
                scrollThumbText: n.querySelector("span"),
                sectionNavigates: [],
                sectionNavLeftSpans: [],
                sectionNavRightSpans: [],
                sectionNavSpans: [],
                sectionReveals: []
            }, m = 0; m < c.length; m++) f.sectionNavigates = document.getElementsByClassName("section__nav"), f.sectionNavLeftSpans[m] = c[m].querySelectorAll(".section__nav--left > span > span"), f.sectionNavRightSpans[m] = c[m].querySelectorAll(".section__nav--right > span > span"), f.sectionNavSpans[m] = c[m].querySelectorAll(".section__nav > span > span"), f.sectionReveals[m] = c[m].getElementsByClassName("reveal");
        var g = new Hammer.Manager(n, {
            recognizers: [
                [Hammer.Pan, {
                    threshold: 0,
                    pointers: 0
                }]
            ]
        });
        g.on("panstart", (function (t) {
            i = t.deltaX, _(t), f.documentBody.classList.add("dragging"), n.classList.contains("virgin") && n.classList.remove("virgin")
        })), g.on("panmove", _), g.on("panend", (function () {
            T(a), f.documentBody.classList.remove("dragging")
        })), delete Hammer.defaults.cssProps.userSelect;
        var v = new Hammer(document.body);

        function _(t) {
            var e = t.deltaX,
                o = Math.min(u - p, Math.max(0, r + (e - i)));
            n.style.transform = "translate(" + o + "px,0)", a = Math.min(Math.floor(o / p * 1.2), d - 1), f.scrollThumbText.innerHTML = c[a].dataset.label, r = o, i = e
        }

        function x(t) {
            if ((t = window.event || t).preventDefault(), !(Date.now() - e < s)) {
                var n = -Math.max(-1, Math.min(1, t.wheelDelta || -t.detail));
                T(a = Math.min(d - 1, Math.max(0, a + n)))
            }
        }

        function y(t) {
            if (9 == (t = window.event || t).keyCode && t.target) {
                var n = t.target.getBoundingClientRect(),
                    i = h / d,
                    r = function (t, e) {
                        for (;
                            (t = t.parentElement) && !t.classList.contains(e););
                        return t
                    }(t.target, "section"),
                    u = r ? [...r.parentElement.children].indexOf(r) : o;
                ht.setMousePosition(t.target, n.left + n.width / 2 - i * (u - o), n.top + n.height / 2), u != o && T(u)
            }
            if (!(Date.now() - e < s || 37 != t.keyCode && 39 != t.keyCode)) {
                var l = 37 == t.keyCode ? -1 : 1;
                T(a = Math.min(d - 1, Math.max(0, a + l)))
            }
        }
        v.get("swipe").set({
            direction: Hammer.DIRECTION_HORIZONTAL
        }), v.on("swipeleft swiperight", (function (t) {
            "touch" != t.pointerType || Date.now() - e < s || T(a = Math.min(d - 1, Math.max(0, o + ("swipeleft" == t.type ? 1 : -1))))
        })), l.addEventListener ? (l.addEventListener("mousewheel", x, !1), l.addEventListener("DOMMouseScroll", x, !1)) : l.attachEvent("onmousewheel", x), document.addEventListener ? document.addEventListener("keyup", y) : document.onkeydown = y;
        var b = function (t) {
            if ((t = window.event || t).preventDefault(), !(Date.now() - e < s)) {
                var n = parseInt(this.dataset.direction);
                T(a = 0 == n ? 0 : o + n)
            }
        };
        for (m = 0; m < f.sectionNavigates.length; m++) f.sectionNavigates[m].addEventListener("click", b, !1);

        function T(t) {
            if (t != o) {
                e = Date.now(), r = t * p, n.style.transform = "translate(" + t * p + "px,0)";
                var i, a = t > o ? 1 : -1;
                if (f.scrollThumbText.innerHTML = c[t].dataset.label, st({
                        targets: l,
                        translateX: -t * h / d,
                        duration: 1e3,
                        easing: "easeInOutCubic",
                        update: function (t) {
                            ht.scroll(-parseInt(t.animations[0].currentValue))
                        }
                    }), t < d - 1)
                    for (var s = 0, u = f.sectionNavLeftSpans[t + 1]; s < u.length; s++) P(u[s].children, a);
                if (t > 0) {
                    for (s = 0, u = f.sectionNavRightSpans[t - 1]; s < u.length; s++) P(u[s].children, a);
                    4 == t && (i = document.getElementById("canvas-statue"), st({
                        targets: i,
                        translateY: ["30%", "0"],
                        duration: 1e3,
                        easing: "easeOutExpo",
                        delay: 500
                    }))
                }
                for (s = 0, u = f.sectionNavSpans[t]; s < u.length; s++) w(u[s].children, a);
                s = 0;
                for (var m = f.sectionReveals[t]; s < m.length; s++) C(m[s].children, m[s].childElementCount);
                n.classList.contains("virgin") && n.classList.remove("virgin"), 0 != o && 0 != t || function (t = 1) {
                    st({
                        targets: ".stalking__text span",
                        translateY: [40, 0],
                        translateZ: 0,
                        duration: 500,
                        easing: "easeOutExpo",
                        delay: function (e, n, i) {
                            return 10 * n + (t ? 500 : 0)
                        },
                        direction: t ? "normal" : "reverse"
                    }), st({
                        targets: ".stalking__media a",
                        translateY: [40, 0],
                        translateZ: 0,
                        duration: 500,
                        easing: "easeOutExpo",
                        delay: function (e, n, i) {
                            return 100 * n + (t ? 500 : 0)
                        },
                        direction: t ? "normal" : "reverse"
                    })
                }(t > 0 ? 1 : 0);
                s = 0;
                for (var g = c.length; s < g; s++) c[s].classList.remove("current");
                o = t
            }
        }

        function w(t, e = 1, n = 0) {
            st({
                targets: t,
                translateX: 1 == e ? ["60%", "0"] : ["-60%", "0"],
                translateY: 1 == e ? ["110%", "0"] : ["-110%", "0"],
                translateZ: 0,
                rotateZ: 1 == e ? [10, 0] : [-10, 0],
                duration: 1500,
                easing: "easeOutExpo",
                delay: function (t, e, i) {
                    return n + 400 + 60 * (e - i)
                },
                complete: function (t) {
                    c[a].classList.add("current")
                }
            })
        }

        function P(t, e = 1, n = 0) {
            st({
                targets: t,
                translateX: 1 == e ? ["0", "-60%"] : ["0", "20%"],
                translateY: 1 == e ? ["0", "-110%"] : ["0", "120%"],
                translateZ: 0,
                rotateZ: 1 == e ? [0, -20] : [0, 40],
                duration: 1500,
                easing: "easeOutExpo",
                delay: function (t, i, r) {
                    return n + i * e * 40
                }
            })
        }

        function C(t, e = 0) {
            st({
                targets: t,
                translateY: ["150%", "0"],
                duration: 1e3,
                easing: "easeOutExpo",
                delay: function (t, n, i) {
                    return 500 + n * (e < 15 ? 80 : 20)
                }
            })
        }
        document.querySelector(".header .logo").addEventListener("click", b, !1)
    }! function () {
        var t = document.getElementById("page");
        if (t.style.width = 100 * t.childElementCount + "vw", window.matchMedia("(max-width : 280px)").matches)
            for (var e = document.querySelectorAll(".project__meta-title"), n = 0; n < e.length; n++) e[n].classList.remove("plane");
        for (var i, r = document.getElementsByClassName("section__nav"), o = (n = 0, r.length); n < o; n++) r[n].dataset.direction = r[n].className.includes("right") ? 1 : -1, lt(r[n], {
            setClassName: function (t, e) {
                return " " == e ? "blank" : "letter"
            }
        }), (i = r[n].querySelector(".blank")) && i.parentNode.removeChild(i);
        n = 0;
        for (var a = document.querySelectorAll("span.reveal"); n < a.length; n++) lt(a[n]);
        lt(document.querySelector(".stalking__text")), lt(document.querySelector("#cursor span")), lt(document.querySelector(".section--quote .statue span")), ct()
    }(), window.addEventListener("load", (function () {
        ht.init();
        var t = document.getElementsByClassName("progress__present")[0];
        t.style.width = t.offsetWidth + "px", t.style.transition = "width 500ms", t.style.width = t.parentElement.offsetWidth + "px", setTimeout((function () {
            document.body.classList.add("loaded")
        }), 200), ht.loadMedia()
    }))
}]);