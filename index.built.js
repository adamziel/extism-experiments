// node_modules/@extism/extism/dist/browser/mod.js
var ze = Object.create;
var St = Object.defineProperty;
var Je = Object.getOwnPropertyDescriptor;
var Me = Object.getOwnPropertyNames;
var Be = Object.getPrototypeOf;
var Ae = Object.prototype.hasOwnProperty;
var Pe = (o, t, e) => t in o ? St(o, t, { enumerable: true, configurable: true, writable: true, value: e }) : o[t] = e;
var jt = (o, t) => () => (t || o((t = { exports: {} }).exports, t), t.exports);
var Ue = (o, t, e, s) => {
  if (t && typeof t == "object" || typeof t == "function") for (let i of Me(t)) !Ae.call(o, i) && i !== e && St(o, i, { get: () => t[i], enumerable: !(s = Je(t, i)) || s.enumerable });
  return o;
};
var ve = (o, t, e) => (e = o != null ? ze(Be(o)) : {}, Ue(t || !o || !o.__esModule ? St(e, "default", { value: o, enumerable: true }) : e, o));
var $t = (o, t, e) => (Pe(o, typeof t != "symbol" ? t + "" : t, e), e);
var _t = (o, t, e) => {
  if (!t.has(o)) throw TypeError("Cannot " + e);
};
var h = (o, t, e) => (_t(o, t, "read from private field"), e ? e.call(o) : t.get(o));
var V = (o, t, e) => {
  if (t.has(o)) throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(o) : t.set(o, e);
};
var x = (o, t, e, s) => (_t(o, t, "write to private field"), s ? s.call(o, e) : t.set(o, e), e);
var z = (o, t, e) => (_t(o, t, "access private method"), e);
var pe = jt((di, fe) => {
  "use strict";
  fe.exports = he;
  function he(o, t, e) {
    o instanceof RegExp && (o = de(o, e)), t instanceof RegExp && (t = de(t, e));
    var s = me(o, t, e);
    return s && { start: s[0], end: s[1], pre: e.slice(0, s[0]), body: e.slice(s[0] + o.length, s[1]), post: e.slice(s[1] + t.length) };
  }
  function de(o, t) {
    var e = t.match(o);
    return e ? e[0] : null;
  }
  he.range = me;
  function me(o, t, e) {
    var s, i, n, r, a, l = e.indexOf(o), c = e.indexOf(t, l + 1), u = l;
    if (l >= 0 && c > 0) {
      if (o === t) return [l, c];
      for (s = [], n = e.length; u >= 0 && !a; ) u == l ? (s.push(u), l = e.indexOf(o, u + 1)) : s.length == 1 ? a = [s.pop(), c] : (i = s.pop(), i < n && (n = i, r = c), c = e.indexOf(t, u + 1)), u = l < c && l >= 0 ? l : c;
      s.length && (a = [n, r]);
    }
    return a;
  }
});
var xe = jt((hi, ge) => {
  var be = pe();
  ge.exports = ls;
  var Ze = "\0SLASH" + Math.random() + "\0", ye = "\0OPEN" + Math.random() + "\0", Mt = "\0CLOSE" + Math.random() + "\0", Ge = "\0COMMA" + Math.random() + "\0", Re = "\0PERIOD" + Math.random() + "\0";
  function Jt(o) {
    return parseInt(o, 10) == o ? parseInt(o, 10) : o.charCodeAt(0);
  }
  function rs(o) {
    return o.split("\\\\").join(Ze).split("\\{").join(ye).split("\\}").join(Mt).split("\\,").join(Ge).split("\\.").join(Re);
  }
  function os(o) {
    return o.split(Ze).join("\\").split(ye).join("{").split(Mt).join("}").split(Ge).join(",").split(Re).join(".");
  }
  function Xe(o) {
    if (!o) return [""];
    var t = [], e = be("{", "}", o);
    if (!e) return o.split(",");
    var s = e.pre, i = e.body, n = e.post, r = s.split(",");
    r[r.length - 1] += "{" + i + "}";
    var a = Xe(n);
    return n.length && (r[r.length - 1] += a.shift(), r.push.apply(r, a)), t.push.apply(t, r), t;
  }
  function ls(o) {
    return o ? (o.substr(0, 2) === "{}" && (o = "\\{\\}" + o.substr(2)), ht(rs(o), true).map(os)) : [];
  }
  function as(o) {
    return "{" + o + "}";
  }
  function cs(o) {
    return /^-?0\d/.test(o);
  }
  function us(o, t) {
    return o <= t;
  }
  function ds(o, t) {
    return o >= t;
  }
  function ht(o, t) {
    var e = [], s = be("{", "}", o);
    if (!s) return [o];
    var i = s.pre, n = s.post.length ? ht(s.post, false) : [""];
    if (/\$$/.test(s.pre)) for (var r = 0; r < n.length; r++) {
      var a = i + "{" + s.body + "}" + n[r];
      e.push(a);
    }
    else {
      var l = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(s.body), c = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(s.body), u = l || c, f = s.body.indexOf(",") >= 0;
      if (!u && !f) return s.post.match(/,.*\}/) ? (o = s.pre + "{" + s.body + Mt + s.post, ht(o)) : [o];
      var d;
      if (u) d = s.body.split(/\.\./);
      else if (d = Xe(s.body), d.length === 1 && (d = ht(d[0], false).map(as), d.length === 1)) return n.map(function(Ke) {
        return s.pre + d[0] + Ke;
      });
      var p;
      if (u) {
        var b = Jt(d[0]), m = Jt(d[1]), Z = Math.max(d[0].length, d[1].length), X = d.length == 3 ? Math.abs(Jt(d[2])) : 1, N = us, T = m < b;
        T && (X *= -1, N = ds);
        var F = d.some(cs);
        p = [];
        for (var K = b; N(K, m); K += X) {
          var _;
          if (c) _ = String.fromCharCode(K), _ === "\\" && (_ = "");
          else if (_ = String(K), F) {
            var Dt = Z - _.length;
            if (Dt > 0) {
              var Qt = new Array(Dt + 1).join("0");
              K < 0 ? _ = "-" + Qt + _.slice(1) : _ = Qt + _;
            }
          }
          p.push(_);
        }
      } else {
        p = [];
        for (var j = 0; j < d.length; j++) p.push.apply(p, ht(d[j], false));
      }
      for (var j = 0; j < p.length; j++) for (var r = 0; r < n.length; r++) {
        var a = i + p[j] + n[r];
        (!t || u || a) && e.push(a);
      }
    }
    return e;
  }
});
var J = { allowSharedBufferCodec: false, manifestSupportsPaths: false, crossOriginChecksEnforced: true, fsAccess: false, hasWorkerCapability: typeof globalThis < "u" ? globalThis.crossOriginIsolated && typeof SharedArrayBuffer < "u" : true, supportsWasiPreview1: true, extismStdoutEnvVarSet: false };
async function qt(o) {
  throw new Error("readFile not supported in this environment");
}
async function Et(o, t) {
  if (String(o.headers.get("Content-Type")).split(";")[0] === "application/octet-stream") {
    let i = new Headers(o.headers);
    i.set("Content-Type", "application/wasm"), o = new Response(o.body, { status: o.status, statusText: o.statusText, headers: i });
  }
  let e = t ? await o.clone().arrayBuffer() : void 0;
  return { module: await WebAssembly.compileStreaming(o), data: e };
}
async function Ct(o, t) {
  if (o instanceof ArrayBuffer) return { wasm: [{ data: new Uint8Array(o) }] };
  if (o instanceof WebAssembly.Module) return { wasm: [{ module: o }] };
  if (typeof o == "string") {
    if (o.search(/^\s*\{/g) === 0) return JSON.parse(o);
    if (o.search(/^(https?|file):\/\//) !== 0) return { wasm: [{ path: o }] };
    o = new URL(o);
  }
  if (o instanceof Response || o?.constructor?.name === "Response") {
    let s = o, i = s.headers.get("content-type") || "application/octet-stream";
    switch (i.split(";")[0]) {
      case "application/octet-stream":
      case "application/wasm":
        return { wasm: [{ response: s }] };
      case "application/json":
      case "text/json":
        return Ct(JSON.parse(await s.text()), t);
      default:
        throw new TypeError(`While processing manifest URL "${s.url}"; expected content-type of "text/json", "application/json", "application/octet-stream", or "application/wasm"; got "${i}" after stripping off charset.`);
    }
  }
  if (o instanceof URL) return Ct(await t(o, { redirect: "follow" }), t);
  if (!("wasm" in o)) throw new TypeError('Expected "wasm" key in manifest');
  if (!Array.isArray(o.wasm)) throw new TypeError('Expected "manifest.wasm" to be array');
  let e = o.wasm.findIndex((s) => !("data" in s) && !("url" in s) && !("path" in s) && !("module" in s) && !("response" in s));
  if (e > -1) throw new TypeError(`Expected every item in "manifest.wasm" to include either a "data", "url", or "path" key; got bad item at index ${e}`);
  return { ...o };
}
async function De(o, t = fetch) {
  let e = await Ct(o, t);
  return e.config ??= {}, e;
}
async function te(o, t) {
  let e = [], s = await De(o, t), i = await Promise.all(s.wasm.map(async (n, r) => {
    let a, l;
    if (n.data) {
      let c = n.data;
      l = c.buffer ? c.buffer : c, a = await WebAssembly.compile(c);
    } else if (n.path) {
      let c = n.path, u = await qt(c);
      l = u.buffer, a = await WebAssembly.compile(u);
    } else if (n.url) {
      let c = await t(n.url, { headers: { accept: "application/wasm;q=0.9,application/octet-stream;q=0.8", "user-agent": "extism" } }), u = await Et(c, Boolean(n.hash));
      l = u.data, a = u.module;
    } else if (n.response) {
      let c = await Et(n.response, Boolean(n.hash));
      l = c.data, a = c.module;
    } else if (n.module) e[r] = n.name ?? String(r), a = n.module;
    else throw new Error(`Unrecognized wasm item at index ${r}. Keys include: "${Object.keys(n).sort().join(",")}"`);
    if (n.hash) {
      if (!l) throw new Error("Item specified a hash but WebAssembly.Module source data is unavailable for hashing");
      let c = new Uint8Array(await crypto.subtle.digest("SHA-256", l)), u = new Uint8Array(32), f = true;
      for (let p = 0; p < 32; ++p) u[p] = parseInt(n.hash.slice(p << 1, (p << 1) + 2), 16), f = f && u[p] === c[p];
      let d = () => [...c].map((p) => p.toString(16).padStart(2, "0")).join("");
      if (!f) throw new Error(`Plugin error: hash mismatch. Expected: ${n.hash}. Actual: ${d()}`);
      n.name ??= d();
    }
    return e[r] = n.name ?? String(r), a;
  }));
  return [e, i];
}
var Zt;
var ot;
var Tt = class extends DataView {
  constructor(e) {
    super(e);
    V(this, ot, null);
  }
  json() {
    return JSON.parse(this.string());
  }
  arrayBuffer() {
    return this.buffer;
  }
  text() {
    return this.string();
  }
  string() {
    return h(Tt, Zt).decode(this.buffer);
  }
  bytes() {
    return h(this, ot) ?? x(this, ot, new Uint8Array(this.buffer)), h(this, ot);
  }
  setInt8(e, s) {
    throw new Error("Cannot set values on output");
  }
  setInt16(e, s, i) {
    throw new Error("Cannot set values on output");
  }
  setInt32(e, s, i) {
    throw new Error("Cannot set values on output");
  }
  setUint8(e, s) {
    throw new Error("Cannot set values on output");
  }
  setUint16(e, s, i) {
    throw new Error("Cannot set values on output");
  }
  setUint32(e, s, i) {
    throw new Error("Cannot set values on output");
  }
  setFloat32(e, s, i) {
    throw new Error("Cannot set values on output");
  }
  setFloat64(e, s, i) {
    throw new Error("Cannot set values on output");
  }
  setBigInt64(e, s, i) {
    throw new Error("Cannot set values on output");
  }
  setBigUint64(e, s, i) {
    throw new Error("Cannot set values on output");
  }
};
var Y = Tt;
Zt = /* @__PURE__ */ new WeakMap(), ot = /* @__PURE__ */ new WeakMap(), V(Y, Zt, new TextDecoder());
var M = 4;
var kt = Symbol("begin");
var yt = Symbol("end");
var Ft = Symbol("env");
var lt = Symbol("get-block");
var Gt = Symbol("import-state");
var Rt = Symbol("export-state");
var $ = Symbol("store-value");
var at = Symbol("reset");
var G = class {
  get byteLength() {
    return this.buffer.byteLength;
  }
  constructor(t, e) {
    this.buffer = t, this.view = new DataView(this.buffer), this.local = e;
  }
  static indexToAddress(t) {
    return BigInt(t) << 48n;
  }
  static addressToIndex(t) {
    return Number(BigInt(t) >> 48n);
  }
  static maskAddress(t) {
    return Number(BigInt(t) & (1n << 48n) - 1n);
  }
};
var Qe;
var nt = class {
  constructor(t, e, s) {
    this.#t = [];
    this.#o = /* @__PURE__ */ new Map();
    this[Qe] = { alloc: (t2) => this.alloc(t2), free: (t2) => {
      this.#t[G.addressToIndex(t2)] = null;
    }, load_u8: (t2) => {
      let e2 = G.addressToIndex(t2), s2 = G.maskAddress(t2);
      return this.#t[e2]?.view.getUint8(Number(s2));
    }, load_u64: (t2) => {
      let e2 = G.addressToIndex(t2), s2 = G.maskAddress(t2);
      return this.#t[e2]?.view.getBigUint64(Number(s2), true);
    }, store_u8: (t2, e2) => {
      let s2 = G.addressToIndex(t2), i = G.maskAddress(t2);
      this.#t[s2]?.view.setUint8(Number(i), Number(e2));
    }, store_u64: (t2, e2) => {
      let s2 = G.addressToIndex(t2), i = G.maskAddress(t2);
      this.#t[s2]?.view.setBigUint64(Number(i), e2, true);
    }, input_offset: () => {
      let t2 = this.#e[this.#e.length - 1][0];
      return G.indexToAddress(t2 || 0);
    }, input_length: () => BigInt(this.#a?.byteLength ?? 0), input_load_u8: (t2) => {
      let e2 = G.maskAddress(t2);
      return this.#a?.view.getUint8(Number(e2));
    }, input_load_u64: (t2) => {
      let e2 = G.maskAddress(t2);
      return this.#a?.view.getBigUint64(Number(e2), true);
    }, output_set: (t2, e2) => {
      let s2 = G.addressToIndex(t2), i = this.#t[s2];
      if (!i) throw new Error(`cannot assign to this block (addr=${t2.toString(16).padStart(16, "0")}; length=${e2})`);
      if (e2 > i.buffer.byteLength) throw new Error("length longer than target block");
      this.#e[this.#e.length - 1][1] = s2;
    }, error_set: (t2) => {
      let e2 = G.addressToIndex(t2);
      if (!this.#t[e2]) throw new Error("cannot assign to this block");
      this.#e[this.#e.length - 1][2] = e2;
    }, config_get: (t2) => {
      let e2 = this.read(t2);
      if (e2 === null) return 0n;
      let s2 = e2.string();
      return s2 in this.#l ? this.store(this.#l[s2]) : 0n;
    }, var_get: (t2) => {
      let e2 = this.read(t2);
      if (e2 === null) return 0n;
      let s2 = e2.string();
      return this.#o.has(s2) ? G.indexToAddress(this.#o.get(s2)) : 0n;
    }, var_set: (t2, e2) => {
      let s2 = this.read(t2);
      if (s2 === null) return 0n;
      let i = s2.string();
      if (e2 === 0n) return this.#o.delete(i), 0n;
      this.#o.set(i, G.addressToIndex(e2));
    }, http_request: (t2, e2) => (this.#s.error("http_request is not enabled"), 0n), http_status_code: () => (this.#s.error("http_status_code is not enabled"), 0), length: (t2) => this.length(t2), length_unsafe: (t2) => this.length(t2), log_warn: (t2) => {
      let e2 = G.addressToIndex(t2), s2 = this.#t[e2];
      if (!s2) return this.#s.error(`failed to log(warn): bad block reference in addr 0x${t2.toString(16).padStart(64, "0")}`);
      let i = this.#n.decode(s2.buffer);
      this.#s.warn(i);
    }, log_info: (t2) => {
      let e2 = G.addressToIndex(t2), s2 = this.#t[e2];
      if (!s2) return this.#s.error(`failed to log(info): bad block reference in addr 0x${t2.toString(16).padStart(64, "0")}`);
      let i = this.#n.decode(s2.buffer);
      this.#s.info(i);
    }, log_debug: (t2) => {
      let e2 = G.addressToIndex(t2), s2 = this.#t[e2];
      if (!s2) return this.#s.error(`failed to log(debug): bad block reference in addr 0x${t2.toString(16).padStart(64, "0")}`);
      let i = this.#n.decode(s2.buffer);
      this.#s.debug(i);
    }, log_error: (t2) => {
      let e2 = G.addressToIndex(t2), s2 = this.#t[e2];
      if (!s2) return this.#s.error(`failed to log(error): bad block reference in addr 0x${t2.toString(16).padStart(64, "0")}`);
      let i = this.#n.decode(s2.buffer);
      this.#s.error(i);
    } };
    this.#i = t, this.#s = e, this.#n = new TextDecoder(), this.#r = new TextEncoder(), this.#e = [], this.alloc(1), this.#l = s;
  }
  #e;
  #t;
  #s;
  #n;
  #r;
  #i;
  #l;
  #o;
  alloc(t) {
    let e = new G(new this.#i(Number(t)), true), s = this.#t.length;
    return this.#t.push(e), G.indexToAddress(s);
  }
  getVariable(t) {
    return this.#o.has(t) ? this.read(this.#o.get(t)) : null;
  }
  setVariable(t, e) {
    let s = this[$](e);
    if (s === null) return 0n;
    let i = this.#o.get(t) ?? null;
    return i !== null && (this.#t[i] = this.#t[s], this.#t[s] = null, s === this.#t.length - 1 && this.#t.pop()), this.#o.set(t, i ?? s), G.indexToAddress(i ?? s);
  }
  read(t) {
    let e = G.addressToIndex(t), s = this.#t[e];
    if (!s) return null;
    let i = !(s.buffer instanceof ArrayBuffer) && !J.allowSharedBufferCodec ? new Uint8Array(s.buffer).slice().buffer : s.buffer;
    return new Y(i);
  }
  store(t) {
    let e = this[$](t);
    if (!e) throw new Error("failed to store output");
    return G.indexToAddress(e);
  }
  length(t) {
    let e = G.addressToIndex(t), s = this.#t[e];
    return s ? BigInt(s.buffer.byteLength) : 0n;
  }
  get #a() {
    let t = this.#e[this.#e.length - 1][0];
    return t === null ? null : this.#t[t];
  }
  [(Qe = Ft, at)]() {
    this.#t.length = 1, this.#e.length = 0;
  }
  [lt](t) {
    let e = this.#t[t];
    if (!e) throw new Error(`invalid block index: ${t}`);
    return e;
  }
  [Gt](t, e = false) {
    for (let [s, i] of t.blocks) {
      if (s && e) {
        let n = new Uint8Array(new this.#i(Number(s.byteLength)));
        n.set(new Uint8Array(s)), s = n.buffer;
      }
      this.#t[i] = s ? new G(s, false) : null;
    }
    this.#e = t.stack;
  }
  [Rt]() {
    return { stack: this.#e.slice(), blocks: this.#t.map((t, e) => t ? t.local ? (t.local = false, [t.buffer, e]) : null : [null, e]).filter(Boolean) };
  }
  [$](t) {
    if (!t) return null;
    if (typeof t == "string" && (t = this.#r.encode(t)), t instanceof Uint8Array) {
      if (t.buffer.constructor === this.#i) {
        let n = this.#t.length;
        return this.#t.push(new G(t.buffer, true)), n;
      }
      let e = G.addressToIndex(this.alloc(t.length)), s = this.#t[e];
      return new Uint8Array(s.buffer).set(t, 0), e;
    }
    return t;
  }
  [kt](t) {
    this.#e.push([t, null, null]);
  }
  [yt]() {
    let [, t, e] = this.#e.pop(), s = e === null ? 1 : 0, i = e ?? t, n = [null, null];
    return i === null || this.#t[i] === null || (n[s] = i), n;
  }
};
var B = class {
  static read_bytes(t, e) {
    let s = new B();
    return s.buf = t.getUint32(e, true), s.buf_len = t.getUint32(e + 4, true), s;
  }
  static read_bytes_array(t, e, s) {
    let i = [];
    for (let n = 0; n < s; n++) i.push(B.read_bytes(t, e + 8 * n));
    return i;
  }
};
var A = class {
  static read_bytes(t, e) {
    let s = new A();
    return s.buf = t.getUint32(e, true), s.buf_len = t.getUint32(e + 4, true), s;
  }
  static read_bytes_array(t, e, s) {
    let i = [];
    for (let n = 0; n < s; n++) i.push(A.read_bytes(t, e + 8 * n));
    return i;
  }
};
var ee = 0;
var se = 1;
var Yt = 2;
var Ot = 4;
var ne = 1 << 0;
var un = 1 << 1;
var dn = 1 << 2;
var hn = 1 << 3;
var mn = 1 << 4;
var Xt = class {
  write_bytes(t, e) {
    t.setUint8(e, this.fs_filetype), t.setUint16(e + 2, this.fs_flags, true), t.setBigUint64(e + 8, this.fs_rights_base, true), t.setBigUint64(e + 16, this.fs_rights_inherited, true);
  }
  constructor(t, e) {
    this.fs_rights_base = 0n, this.fs_rights_inherited = 0n, this.fs_filetype = t, this.fs_flags = e;
  }
};
var fn = 1 << 0;
var pn = 1 << 1;
var bn = 1 << 2;
var Zn = 1 << 3;
var je = 1 << 0;
var $e = 1 << 1;
var qe = 1 << 2;
var ts = 1 << 3;
var gt = class {
  write_bytes(t, e) {
    t.setBigUint64(e, this.dev, true), t.setBigUint64(e + 8, this.ino, true), t.setUint8(e + 16, this.filetype), t.setBigUint64(e + 24, this.nlink, true), t.setBigUint64(e + 32, this.size, true), t.setBigUint64(e + 38, this.atim, true), t.setBigUint64(e + 46, this.mtim, true), t.setBigUint64(e + 52, this.ctim, true);
  }
  constructor(t, e) {
    this.dev = 0n, this.ino = 0n, this.nlink = 0n, this.atim = 0n, this.mtim = 0n, this.ctim = 0n, this.filetype = t, this.size = e;
  }
};
var yn = 1 << 0;
var Gn = 1 << 0;
var Rn = 1 << 0;
var Xn = 1 << 1;
var gn = 1 << 0;
var xn = 1 << 0;
var Wn = 1 << 1;
var es = class {
  enable(t) {
    this.log = ss(t === void 0 ? true : t, this.prefix);
  }
  get enabled() {
    return this.isEnabled;
  }
  constructor(t) {
    this.isEnabled = t, this.prefix = "wasi:", this.enable(t);
  }
};
function ss(o, t) {
  return o ? console.log.bind(console, "%c%s", "color: #265BA0", t) : () => {
  };
}
var k = new es(false);
var Wt = class extends Error {
  constructor(t) {
    super("exit with exit code " + t), this.code = t;
  }
};
var Kt = class {
  start(t) {
    this.inst = t;
    try {
      t.exports._start();
    } catch (e) {
      if (e instanceof Wt) return e.code;
      throw e;
    }
  }
  initialize(t) {
    this.inst = t, t.exports._initialize();
  }
  constructor(t, e, s, i = {}) {
    this.args = [], this.env = [], this.fds = [], k.enable(i.debug), this.args = t, this.env = e, this.fds = s;
    let n = this;
    this.wasiImport = { args_sizes_get(r, a) {
      let l = new DataView(n.inst.exports.memory.buffer);
      l.setUint32(r, n.args.length, true);
      let c = 0;
      for (let u of n.args) c += u.length + 1;
      return l.setUint32(a, c, true), k.log(l.getUint32(r, true), l.getUint32(a, true)), 0;
    }, args_get(r, a) {
      let l = new DataView(n.inst.exports.memory.buffer), c = new Uint8Array(n.inst.exports.memory.buffer), u = a;
      for (let f = 0; f < n.args.length; f++) {
        l.setUint32(r, a, true), r += 4;
        let d = new TextEncoder().encode(n.args[f]);
        c.set(d, a), l.setUint8(a + d.length, 0), a += d.length + 1;
      }
      return k.enabled && k.log(new TextDecoder("utf-8").decode(c.slice(u, a))), 0;
    }, environ_sizes_get(r, a) {
      let l = new DataView(n.inst.exports.memory.buffer);
      l.setUint32(r, n.env.length, true);
      let c = 0;
      for (let u of n.env) c += u.length + 1;
      return l.setUint32(a, c, true), k.log(l.getUint32(r, true), l.getUint32(a, true)), 0;
    }, environ_get(r, a) {
      let l = new DataView(n.inst.exports.memory.buffer), c = new Uint8Array(n.inst.exports.memory.buffer), u = a;
      for (let f = 0; f < n.env.length; f++) {
        l.setUint32(r, a, true), r += 4;
        let d = new TextEncoder().encode(n.env[f]);
        c.set(d, a), l.setUint8(a + d.length, 0), a += d.length + 1;
      }
      return k.enabled && k.log(new TextDecoder("utf-8").decode(c.slice(u, a))), 0;
    }, clock_res_get(r, a) {
      let l;
      switch (r) {
        case 1: {
          l = 5000n;
          break;
        }
        case 0: {
          l = 1000000n;
          break;
        }
        default:
          return 52;
      }
      return new DataView(n.inst.exports.memory.buffer).setBigUint64(a, l, true), 0;
    }, clock_time_get(r, a, l) {
      let c = new DataView(n.inst.exports.memory.buffer);
      if (r === 0) c.setBigUint64(l, BigInt((/* @__PURE__ */ new Date()).getTime()) * 1000000n, true);
      else if (r == 1) {
        let u;
        try {
          u = BigInt(Math.round(performance.now() * 1e6));
        } catch {
          u = 0n;
        }
        c.setBigUint64(l, u, true);
      } else c.setBigUint64(l, 0n, true);
      return 0;
    }, fd_advise(r, a, l, c) {
      return n.fds[r] != null ? n.fds[r].fd_advise(a, l, c) : 8;
    }, fd_allocate(r, a, l) {
      return n.fds[r] != null ? n.fds[r].fd_allocate(a, l) : 8;
    }, fd_close(r) {
      if (n.fds[r] != null) {
        let a = n.fds[r].fd_close();
        return n.fds[r] = void 0, a;
      } else return 8;
    }, fd_datasync(r) {
      return n.fds[r] != null ? n.fds[r].fd_datasync() : 8;
    }, fd_fdstat_get(r, a) {
      if (n.fds[r] != null) {
        let { ret: l, fdstat: c } = n.fds[r].fd_fdstat_get();
        return c?.write_bytes(new DataView(n.inst.exports.memory.buffer), a), l;
      } else return 8;
    }, fd_fdstat_set_flags(r, a) {
      return n.fds[r] != null ? n.fds[r].fd_fdstat_set_flags(a) : 8;
    }, fd_fdstat_set_rights(r, a, l) {
      return n.fds[r] != null ? n.fds[r].fd_fdstat_set_rights(a, l) : 8;
    }, fd_filestat_get(r, a) {
      if (n.fds[r] != null) {
        let { ret: l, filestat: c } = n.fds[r].fd_filestat_get();
        return c?.write_bytes(new DataView(n.inst.exports.memory.buffer), a), l;
      } else return 8;
    }, fd_filestat_set_size(r, a) {
      return n.fds[r] != null ? n.fds[r].fd_filestat_set_size(a) : 8;
    }, fd_filestat_set_times(r, a, l, c) {
      return n.fds[r] != null ? n.fds[r].fd_filestat_set_times(a, l, c) : 8;
    }, fd_pread(r, a, l, c, u) {
      let f = new DataView(n.inst.exports.memory.buffer), d = new Uint8Array(n.inst.exports.memory.buffer);
      if (n.fds[r] != null) {
        let p = B.read_bytes_array(f, a, l), { ret: b, nread: m } = n.fds[r].fd_pread(d, p, c);
        return f.setUint32(u, m, true), b;
      } else return 8;
    }, fd_prestat_get(r, a) {
      let l = new DataView(n.inst.exports.memory.buffer);
      if (n.fds[r] != null) {
        let { ret: c, prestat: u } = n.fds[r].fd_prestat_get();
        return u?.write_bytes(l, a), c;
      } else return 8;
    }, fd_prestat_dir_name(r, a, l) {
      if (n.fds[r] != null) {
        let { ret: c, prestat_dir_name: u } = n.fds[r].fd_prestat_dir_name();
        return u != null && new Uint8Array(n.inst.exports.memory.buffer).set(u, a), c;
      } else return 8;
    }, fd_pwrite(r, a, l, c, u) {
      let f = new DataView(n.inst.exports.memory.buffer), d = new Uint8Array(n.inst.exports.memory.buffer);
      if (n.fds[r] != null) {
        let p = A.read_bytes_array(f, a, l), { ret: b, nwritten: m } = n.fds[r].fd_pwrite(d, p, c);
        return f.setUint32(u, m, true), b;
      } else return 8;
    }, fd_read(r, a, l, c) {
      let u = new DataView(n.inst.exports.memory.buffer), f = new Uint8Array(n.inst.exports.memory.buffer);
      if (n.fds[r] != null) {
        let d = B.read_bytes_array(u, a, l), { ret: p, nread: b } = n.fds[r].fd_read(f, d);
        return u.setUint32(c, b, true), p;
      } else return 8;
    }, fd_readdir(r, a, l, c, u) {
      let f = new DataView(n.inst.exports.memory.buffer), d = new Uint8Array(n.inst.exports.memory.buffer);
      if (n.fds[r] != null) {
        let p = 0;
        for (; ; ) {
          let { ret: b, dirent: m } = n.fds[r].fd_readdir_single(c);
          if (b != 0) return f.setUint32(u, p, true), b;
          if (m == null) break;
          if (l - p < m.head_length()) {
            p = l;
            break;
          }
          let Z = new ArrayBuffer(m.head_length());
          if (m.write_head_bytes(new DataView(Z), 0), d.set(new Uint8Array(Z).slice(0, Math.min(Z.byteLength, l - p)), a), a += m.head_length(), p += m.head_length(), l - p < m.name_length()) {
            p = l;
            break;
          }
          m.write_name_bytes(d, a, l - p), a += m.name_length(), p += m.name_length(), c = m.d_next;
        }
        return f.setUint32(u, p, true), 0;
      } else return 8;
    }, fd_renumber(r, a) {
      if (n.fds[r] != null && n.fds[a] != null) {
        let l = n.fds[a].fd_close();
        return l != 0 ? l : (n.fds[a] = n.fds[r], n.fds[r] = void 0, 0);
      } else return 8;
    }, fd_seek(r, a, l, c) {
      let u = new DataView(n.inst.exports.memory.buffer);
      if (n.fds[r] != null) {
        let { ret: f, offset: d } = n.fds[r].fd_seek(a, l);
        return u.setBigInt64(c, d, true), f;
      } else return 8;
    }, fd_sync(r) {
      return n.fds[r] != null ? n.fds[r].fd_sync() : 8;
    }, fd_tell(r, a) {
      let l = new DataView(n.inst.exports.memory.buffer);
      if (n.fds[r] != null) {
        let { ret: c, offset: u } = n.fds[r].fd_tell();
        return l.setBigUint64(a, u, true), c;
      } else return 8;
    }, fd_write(r, a, l, c) {
      let u = new DataView(n.inst.exports.memory.buffer), f = new Uint8Array(n.inst.exports.memory.buffer);
      if (n.fds[r] != null) {
        let d = A.read_bytes_array(u, a, l), { ret: p, nwritten: b } = n.fds[r].fd_write(f, d);
        return u.setUint32(c, b, true), p;
      } else return 8;
    }, path_create_directory(r, a, l) {
      let c = new Uint8Array(n.inst.exports.memory.buffer);
      if (n.fds[r] != null) {
        let u = new TextDecoder("utf-8").decode(c.slice(a, a + l));
        return n.fds[r].path_create_directory(u);
      }
    }, path_filestat_get(r, a, l, c, u) {
      let f = new DataView(n.inst.exports.memory.buffer), d = new Uint8Array(n.inst.exports.memory.buffer);
      if (n.fds[r] != null) {
        let p = new TextDecoder("utf-8").decode(d.slice(l, l + c)), { ret: b, filestat: m } = n.fds[r].path_filestat_get(a, p);
        return m?.write_bytes(f, u), b;
      } else return 8;
    }, path_filestat_set_times(r, a, l, c, u, f, d) {
      let p = new Uint8Array(n.inst.exports.memory.buffer);
      if (n.fds[r] != null) {
        let b = new TextDecoder("utf-8").decode(p.slice(l, l + c));
        return n.fds[r].path_filestat_set_times(a, b, u, f, d);
      } else return 8;
    }, path_link(r, a, l, c, u, f, d) {
      let p = new Uint8Array(n.inst.exports.memory.buffer);
      if (n.fds[r] != null && n.fds[u] != null) {
        let b = new TextDecoder("utf-8").decode(p.slice(l, l + c)), m = new TextDecoder("utf-8").decode(p.slice(f, f + d));
        return n.fds[u].path_link(r, a, b, m);
      } else return 8;
    }, path_open(r, a, l, c, u, f, d, p, b) {
      let m = new DataView(n.inst.exports.memory.buffer), Z = new Uint8Array(n.inst.exports.memory.buffer);
      if (n.fds[r] != null) {
        let X = new TextDecoder("utf-8").decode(Z.slice(l, l + c));
        k.log(X);
        let { ret: N, fd_obj: T } = n.fds[r].path_open(a, X, u, f, d, p);
        if (N != 0) return N;
        n.fds.push(T);
        let F = n.fds.length - 1;
        return m.setUint32(b, F, true), 0;
      } else return 8;
    }, path_readlink(r, a, l, c, u, f) {
      let d = new DataView(n.inst.exports.memory.buffer), p = new Uint8Array(n.inst.exports.memory.buffer);
      if (n.fds[r] != null) {
        let b = new TextDecoder("utf-8").decode(p.slice(a, a + l));
        k.log(b);
        let { ret: m, data: Z } = n.fds[r].path_readlink(b);
        if (Z != null) {
          if (Z.length > u) return d.setUint32(f, 0, true), 8;
          p.set(Z, c), d.setUint32(f, Z.length, true);
        }
        return m;
      } else return 8;
    }, path_remove_directory(r, a, l) {
      let c = new Uint8Array(n.inst.exports.memory.buffer);
      if (n.fds[r] != null) {
        let u = new TextDecoder("utf-8").decode(c.slice(a, a + l));
        return n.fds[r].path_remove_directory(u);
      } else return 8;
    }, path_rename(r, a, l, c, u, f) {
      throw "FIXME what is the best abstraction for this?";
    }, path_symlink(r, a, l, c, u) {
      let f = new Uint8Array(n.inst.exports.memory.buffer);
      if (n.fds[l] != null) {
        let d = new TextDecoder("utf-8").decode(f.slice(r, r + a)), p = new TextDecoder("utf-8").decode(f.slice(c, c + u));
        return n.fds[l].path_symlink(d, p);
      } else return 8;
    }, path_unlink_file(r, a, l) {
      let c = new Uint8Array(n.inst.exports.memory.buffer);
      if (n.fds[r] != null) {
        let u = new TextDecoder("utf-8").decode(c.slice(a, a + l));
        return n.fds[r].path_unlink_file(u);
      } else return 8;
    }, poll_oneoff(r, a, l) {
      throw "async io not supported";
    }, proc_exit(r) {
      throw new Wt(r);
    }, proc_raise(r) {
      throw "raised signal " + r;
    }, sched_yield() {
    }, random_get(r, a) {
      let l = new Uint8Array(n.inst.exports.memory.buffer);
      for (let c = 0; c < a; c++) l[r + c] = Math.random() * 256 | 0;
    }, sock_recv(r, a, l) {
      throw "sockets not supported";
    }, sock_send(r, a, l) {
      throw "sockets not supported";
    }, sock_shutdown(r, a) {
      throw "sockets not supported";
    }, sock_accept(r, a) {
      throw "sockets not supported";
    } };
  }
};
var q = class {
  fd_advise(t, e, s) {
    return 58;
  }
  fd_allocate(t, e) {
    return 58;
  }
  fd_close() {
    return 0;
  }
  fd_datasync() {
    return 58;
  }
  fd_fdstat_get() {
    return { ret: 58, fdstat: null };
  }
  fd_fdstat_set_flags(t) {
    return 58;
  }
  fd_fdstat_set_rights(t, e) {
    return 58;
  }
  fd_filestat_get() {
    return { ret: 58, filestat: null };
  }
  fd_filestat_set_size(t) {
    return 58;
  }
  fd_filestat_set_times(t, e, s) {
    return 58;
  }
  fd_pread(t, e, s) {
    return { ret: 58, nread: 0 };
  }
  fd_prestat_get() {
    return { ret: 58, prestat: null };
  }
  fd_prestat_dir_name() {
    return { ret: 58, prestat_dir_name: null };
  }
  fd_pwrite(t, e, s) {
    return { ret: 58, nwritten: 0 };
  }
  fd_read(t, e) {
    return { ret: 58, nread: 0 };
  }
  fd_readdir_single(t) {
    return { ret: 58, dirent: null };
  }
  fd_seek(t, e) {
    return { ret: 58, offset: 0n };
  }
  fd_sync() {
    return 0;
  }
  fd_tell() {
    return { ret: 58, offset: 0n };
  }
  fd_write(t, e) {
    return { ret: 58, nwritten: 0 };
  }
  path_create_directory(t) {
    return 58;
  }
  path_filestat_get(t, e) {
    return { ret: 58, filestat: null };
  }
  path_filestat_set_times(t, e, s, i, n) {
    return 58;
  }
  path_link(t, e, s, i) {
    return 58;
  }
  path_open(t, e, s, i, n, r) {
    return { ret: 58, fd_obj: null };
  }
  path_readlink(t) {
    return { ret: 58, data: null };
  }
  path_remove_directory(t) {
    return 58;
  }
  path_rename(t, e, s) {
    return 58;
  }
  path_symlink(t, e) {
    return 58;
  }
  path_unlink_file(t) {
    return 58;
  }
};
var P = class extends q {
  fd_fdstat_get() {
    return { ret: 0, fdstat: new Xt(Ot, 0) };
  }
  fd_read(t, e) {
    let s = 0;
    for (let i of e) if (this.file_pos < this.file.data.byteLength) {
      let n = this.file.data.slice(Number(this.file_pos), Number(this.file_pos + BigInt(i.buf_len)));
      t.set(n, i.buf), this.file_pos += BigInt(n.length), s += n.length;
    } else break;
    return { ret: 0, nread: s };
  }
  fd_pread(t, e, s) {
    let i = 0;
    for (let n of e) if (s < this.file.data.byteLength) {
      let r = this.file.data.slice(Number(s), Number(s + BigInt(n.buf_len)));
      t.set(r, n.buf), s += BigInt(r.length), i += r.length;
    } else break;
    return { ret: 0, nread: i };
  }
  fd_seek(t, e) {
    let s;
    switch (e) {
      case ee:
        s = t;
        break;
      case se:
        s = this.file_pos + t;
        break;
      case Yt:
        s = BigInt(this.file.data.byteLength) + t;
        break;
      default:
        return { ret: 28, offset: 0n };
    }
    return s < 0 ? { ret: 28, offset: 0n } : (this.file_pos = s, { ret: 0, offset: this.file_pos });
  }
  fd_tell() {
    return { ret: 0, offset: this.file_pos };
  }
  fd_write(t, e) {
    let s = 0;
    if (this.file.readonly) return { ret: 8, nwritten: s };
    for (let i of e) {
      let n = t.slice(i.buf, i.buf + i.buf_len);
      if (this.file_pos + BigInt(n.byteLength) > this.file.size) {
        let r = this.file.data;
        this.file.data = new Uint8Array(Number(this.file_pos + BigInt(n.byteLength))), this.file.data.set(r);
      }
      this.file.data.set(n.slice(0, Number(this.file.size - this.file_pos)), Number(this.file_pos)), this.file_pos += BigInt(n.byteLength), s += i.buf_len;
    }
    return { ret: 0, nwritten: s };
  }
  fd_pwrite(t, e, s) {
    let i = 0;
    if (this.file.readonly) return { ret: 8, nwritten: i };
    for (let n of e) {
      let r = t.slice(n.buf, n.buf + n.buf_len);
      if (s + BigInt(r.byteLength) > this.file.size) {
        let a = this.file.data;
        this.file.data = new Uint8Array(Number(s + BigInt(r.byteLength))), this.file.data.set(a);
      }
      this.file.data.set(r.slice(0, Number(this.file.size - s)), Number(s)), s += BigInt(r.byteLength), i += n.buf_len;
    }
    return { ret: 0, nwritten: i };
  }
  fd_filestat_get() {
    return { ret: 0, filestat: this.file.stat() };
  }
  constructor(t) {
    super(), this.file_pos = 0n, this.file = t;
  }
};
var tt = class {
  open(t) {
    let e = new P(this);
    return t & ne && e.fd_seek(0n, Yt), e;
  }
  get size() {
    return BigInt(this.data.byteLength);
  }
  stat() {
    return new gt(Ot, this.size);
  }
  truncate() {
    return this.readonly ? 63 : (this.data = new Uint8Array([]), 0);
  }
  constructor(t, e) {
    this.data = new Uint8Array(t), this.readonly = !!e?.readonly;
  }
};
var ct = class extends q {
  #e;
  constructor(t) {
    super(), this.#e = t;
  }
  fd_write(t, e) {
    let s = 0, i = new TextDecoder(), n = e.reduce((r, a, l, c) => {
      s += a.buf_len;
      let u = t.slice(a.buf, a.buf + a.buf_len);
      return r + i.decode(u, { stream: l !== c.length - 1 });
    }, "");
    return console[this.#e](n), { ret: 0, nwritten: s };
  }
};
async function le(o, t) {
  let e = [], s = [], i = t ? [new ct("log"), new ct("log"), new ct("error")] : [new P(new tt([])), new P(new tt([])), new P(new tt([]))], n = new Kt(e, s, i);
  return { async importObject() {
    return n.wasiImport;
  }, async close() {
  }, async initialize(r) {
    let a = r.exports.memory;
    if (!a) throw new Error("The module has to export a default memory.");
    if (r.exports._initialize) {
      let l = r.exports._initialize;
      n.initialize ? n.initialize({ exports: { memory: a, _initialize: () => {
        l();
      } } }) : l();
    } else n.start({ exports: { memory: a, _start: () => {
    } } });
  } };
}
var ut = "extism:host/env";
var zt = class {
  #e;
  #t;
  #s;
  #n = false;
  #r;
  constructor(t, e, s, i) {
    this.#e = t, this.#s = e, this.#t = s, this.#r = i;
  }
  async reset() {
    return this.isActive() ? false : (this.#e[at](), true);
  }
  isActive() {
    return this.#n;
  }
  async functionExists(t) {
    try {
      let e = [].concat(t), [s, i] = e.length === 2 ? [this.lookupTarget(e[0]), e[1]] : [this.#t.find((r) => WebAssembly.Module.exports(r.module).find((l) => l.name === e[0] && l.kind === "function")), e[0]];
      return !(!s || !s.instance.exports[i]);
    } catch {
      return false;
    }
  }
  async callBlock(t, e) {
    this.#n = true;
    let s = [].concat(t), [i, n] = s.length === 2 ? [this.lookupTarget(s[0]), s[1]] : [this.#t.find((a) => WebAssembly.Module.exports(a.module).find((c) => c.name === s[0] && c.kind === "function")), s[0]];
    if (!i) throw Error(`Plugin error: target "${s.join('" "')}" does not exist`);
    let r = i.instance.exports[n];
    if (!r) throw Error(`Plugin error: function "${s.join('" "')}" does not exist`);
    this.#e[kt](e ?? null);
    try {
      return r(), this.#e[yt]();
    } catch (a) {
      throw this.#e[yt](), a;
    } finally {
      this.#n = false;
    }
  }
  async call(t, e) {
    let s = this.#e[$](e), [i, n] = await this.callBlock(t, s), r = i !== null, a = i ?? n;
    if (a === null) return null;
    let l = this.#e[lt](a);
    if (!l) return null;
    let c = new Y(l.buffer);
    if (r) throw new Error(`Plugin-originated error: ${c.string()}`);
    return c;
  }
  lookupTarget(t) {
    let e = String(t ?? "0"), s = this.#s.findIndex((i) => i === e);
    if (s === -1) throw new Error(`no module named "${t}"`);
    return this.#t[s];
  }
  async getExports(t) {
    return WebAssembly.Module.exports(this.lookupTarget(t).module) || [];
  }
  async getImports(t) {
    return WebAssembly.Module.imports(this.lookupTarget(t).module) || [];
  }
  async getInstance(t) {
    return this.lookupTarget(t).instance;
  }
  async close() {
    this.#r && (await this.#r.close(), this.#r = null);
  }
};
async function ae(o, t, e, s = new nt(ArrayBuffer, o.logger, o.config)) {
  let i = o.wasiEnabled ? await le(o.allowedPaths, o.enableWasiOutput) : null, n = { ...i ? { wasi_snapshot_preview1: await i.importObject() } : {}, [ut]: s[Ft], env: {} };
  for (let a in o.functions) {
    n[a] = n[a] || {};
    for (let l in o.functions[a]) n[a][l] = o.functions[a][l].bind(null, s);
  }
  let r = await Promise.all(e.map(async (a) => {
    let l = await WebAssembly.instantiate(a, n);
    i && await i?.initialize(l);
    let c = l.exports.hs_init ? "haskell" : l.exports._initialize ? "reactor" : l.exports._start ? "command" : "none";
    return (l.exports.hs_init ? l.exports.hs_init : () => {
    })(), { module: a, instance: l, guestType: c };
  }));
  return new zt(s, t, r, i);
}
var ce = new URL("data:text/javascript;base64,dmFyIHJ0PShjLHQsZSk9PntpZighdC5oYXMoYykpdGhyb3cgVHlwZUVycm9yKCJDYW5ub3QgIitlKX07dmFyIFQ9KGMsdCxlKT0+KHJ0KGMsdCwicmVhZCBmcm9tIHByaXZhdGUgZmllbGQiKSxlP2UuY2FsbChjKTp0LmdldChjKSksTD0oYyx0LGUpPT57aWYodC5oYXMoYykpdGhyb3cgVHlwZUVycm9yKCJDYW5ub3QgYWRkIHRoZSBzYW1lIHByaXZhdGUgbWVtYmVyIG1vcmUgdGhhbiBvbmNlIik7dCBpbnN0YW5jZW9mIFdlYWtTZXQ/dC5hZGQoYyk6dC5zZXQoYyxlKX0sQz0oYyx0LGUscyk9PihydChjLHQsIndyaXRlIHRvIHByaXZhdGUgZmllbGQiKSxzP3MuY2FsbChjLGUpOnQuc2V0KGMsZSksZSk7dmFyIGl0PXtvbihjLHQpe2FkZEV2ZW50TGlzdGVuZXIoYyxlPT57dChlLmRhdGEpfSl9LHBvc3RNZXNzYWdlKGMsdD1bXSl7c2VsZi5wb3N0TWVzc2FnZShjLHQpfX07dmFyIGssVSx6PWNsYXNzIGV4dGVuZHMgRGF0YVZpZXd7Y29uc3RydWN0b3IoZSl7c3VwZXIoZSk7TCh0aGlzLFUsbnVsbCl9anNvbigpe3JldHVybiBKU09OLnBhcnNlKHRoaXMuc3RyaW5nKCkpfWFycmF5QnVmZmVyKCl7cmV0dXJuIHRoaXMuYnVmZmVyfXRleHQoKXtyZXR1cm4gdGhpcy5zdHJpbmcoKX1zdHJpbmcoKXtyZXR1cm4gVCh6LGspLmRlY29kZSh0aGlzLmJ1ZmZlcil9Ynl0ZXMoKXtyZXR1cm4gVCh0aGlzLFUpPz9DKHRoaXMsVSxuZXcgVWludDhBcnJheSh0aGlzLmJ1ZmZlcikpLFQodGhpcyxVKX1zZXRJbnQ4KGUscyl7dGhyb3cgbmV3IEVycm9yKCJDYW5ub3Qgc2V0IHZhbHVlcyBvbiBvdXRwdXQiKX1zZXRJbnQxNihlLHMsYSl7dGhyb3cgbmV3IEVycm9yKCJDYW5ub3Qgc2V0IHZhbHVlcyBvbiBvdXRwdXQiKX1zZXRJbnQzMihlLHMsYSl7dGhyb3cgbmV3IEVycm9yKCJDYW5ub3Qgc2V0IHZhbHVlcyBvbiBvdXRwdXQiKX1zZXRVaW50OChlLHMpe3Rocm93IG5ldyBFcnJvcigiQ2Fubm90IHNldCB2YWx1ZXMgb24gb3V0cHV0Iil9c2V0VWludDE2KGUscyxhKXt0aHJvdyBuZXcgRXJyb3IoIkNhbm5vdCBzZXQgdmFsdWVzIG9uIG91dHB1dCIpfXNldFVpbnQzMihlLHMsYSl7dGhyb3cgbmV3IEVycm9yKCJDYW5ub3Qgc2V0IHZhbHVlcyBvbiBvdXRwdXQiKX1zZXRGbG9hdDMyKGUscyxhKXt0aHJvdyBuZXcgRXJyb3IoIkNhbm5vdCBzZXQgdmFsdWVzIG9uIG91dHB1dCIpfXNldEZsb2F0NjQoZSxzLGEpe3Rocm93IG5ldyBFcnJvcigiQ2Fubm90IHNldCB2YWx1ZXMgb24gb3V0cHV0Iil9c2V0QmlnSW50NjQoZSxzLGEpe3Rocm93IG5ldyBFcnJvcigiQ2Fubm90IHNldCB2YWx1ZXMgb24gb3V0cHV0Iil9c2V0QmlnVWludDY0KGUscyxhKXt0aHJvdyBuZXcgRXJyb3IoIkNhbm5vdCBzZXQgdmFsdWVzIG9uIG91dHB1dCIpfX0seT16O2s9bmV3IFdlYWtNYXAsVT1uZXcgV2Vha01hcCxMKHksayxuZXcgVGV4dERlY29kZXIpO3ZhciBtPTQ7dmFyIG90PXthbGxvd1NoYXJlZEJ1ZmZlckNvZGVjOiExLG1hbmlmZXN0U3VwcG9ydHNQYXRoczohMSxjcm9zc09yaWdpbkNoZWNrc0VuZm9yY2VkOiEwLGZzQWNjZXNzOiExLGhhc1dvcmtlckNhcGFiaWxpdHk6dHlwZW9mIGdsb2JhbFRoaXM8InUiP2dsb2JhbFRoaXMuY3Jvc3NPcmlnaW5Jc29sYXRlZCYmdHlwZW9mIFNoYXJlZEFycmF5QnVmZmVyPCJ1IjohMCxzdXBwb3J0c1dhc2lQcmV2aWV3MTohMCxleHRpc21TdGRvdXRFbnZWYXJTZXQ6ITF9O3ZhciBLPVN5bWJvbCgiYmVnaW4iKSxCPVN5bWJvbCgiZW5kIiksaj1TeW1ib2woImVudiIpLFg9U3ltYm9sKCJnZXQtYmxvY2siKSxHPVN5bWJvbCgiaW1wb3J0LXN0YXRlIiksTT1TeW1ib2woImV4cG9ydC1zdGF0ZSIpLFA9U3ltYm9sKCJzdG9yZS12YWx1ZSIpLCQ9U3ltYm9sKCJyZXNldCIpLHA9Y2xhc3N7Z2V0IGJ5dGVMZW5ndGgoKXtyZXR1cm4gdGhpcy5idWZmZXIuYnl0ZUxlbmd0aH1jb25zdHJ1Y3Rvcih0LGUpe3RoaXMuYnVmZmVyPXQsdGhpcy52aWV3PW5ldyBEYXRhVmlldyh0aGlzLmJ1ZmZlciksdGhpcy5sb2NhbD1lfXN0YXRpYyBpbmRleFRvQWRkcmVzcyh0KXtyZXR1cm4gQmlnSW50KHQpPDw0OG59c3RhdGljIGFkZHJlc3NUb0luZGV4KHQpe3JldHVybiBOdW1iZXIoQmlnSW50KHQpPj40OG4pfXN0YXRpYyBtYXNrQWRkcmVzcyh0KXtyZXR1cm4gTnVtYmVyKEJpZ0ludCh0KSYoMW48PDQ4biktMW4pfX0sYnQsUz1jbGFzc3tjb25zdHJ1Y3Rvcih0LGUscyl7dGhpcy4jdD1bXTt0aGlzLiNyPW5ldyBNYXA7dGhpc1tidF09e2FsbG9jOnQ9PnRoaXMuYWxsb2ModCksZnJlZTp0PT57dGhpcy4jdFtwLmFkZHJlc3NUb0luZGV4KHQpXT1udWxsfSxsb2FkX3U4OnQ9PntsZXQgZT1wLmFkZHJlc3NUb0luZGV4KHQpLHM9cC5tYXNrQWRkcmVzcyh0KTtyZXR1cm4gdGhpcy4jdFtlXT8udmlldy5nZXRVaW50OChOdW1iZXIocykpfSxsb2FkX3U2NDp0PT57bGV0IGU9cC5hZGRyZXNzVG9JbmRleCh0KSxzPXAubWFza0FkZHJlc3ModCk7cmV0dXJuIHRoaXMuI3RbZV0/LnZpZXcuZ2V0QmlnVWludDY0KE51bWJlcihzKSwhMCl9LHN0b3JlX3U4Oih0LGUpPT57bGV0IHM9cC5hZGRyZXNzVG9JbmRleCh0KSxhPXAubWFza0FkZHJlc3ModCk7dGhpcy4jdFtzXT8udmlldy5zZXRVaW50OChOdW1iZXIoYSksTnVtYmVyKGUpKX0sc3RvcmVfdTY0Oih0LGUpPT57bGV0IHM9cC5hZGRyZXNzVG9JbmRleCh0KSxhPXAubWFza0FkZHJlc3ModCk7dGhpcy4jdFtzXT8udmlldy5zZXRCaWdVaW50NjQoTnVtYmVyKGEpLGUsITApfSxpbnB1dF9vZmZzZXQ6KCk9PntsZXQgdD10aGlzLiNlW3RoaXMuI2UubGVuZ3RoLTFdWzBdO3JldHVybiBwLmluZGV4VG9BZGRyZXNzKHR8fDApfSxpbnB1dF9sZW5ndGg6KCk9PkJpZ0ludCh0aGlzLiNsPy5ieXRlTGVuZ3RoPz8wKSxpbnB1dF9sb2FkX3U4OnQ9PntsZXQgZT1wLm1hc2tBZGRyZXNzKHQpO3JldHVybiB0aGlzLiNsPy52aWV3LmdldFVpbnQ4KE51bWJlcihlKSl9LGlucHV0X2xvYWRfdTY0OnQ9PntsZXQgZT1wLm1hc2tBZGRyZXNzKHQpO3JldHVybiB0aGlzLiNsPy52aWV3LmdldEJpZ1VpbnQ2NChOdW1iZXIoZSksITApfSxvdXRwdXRfc2V0Oih0LGUpPT57bGV0IHM9cC5hZGRyZXNzVG9JbmRleCh0KSxhPXRoaXMuI3Rbc107aWYoIWEpdGhyb3cgbmV3IEVycm9yKGBjYW5ub3QgYXNzaWduIHRvIHRoaXMgYmxvY2sgKGFkZHI9JHt0LnRvU3RyaW5nKDE2KS5wYWRTdGFydCgxNiwiMCIpfTsgbGVuZ3RoPSR7ZX0pYCk7aWYoZT5hLmJ1ZmZlci5ieXRlTGVuZ3RoKXRocm93IG5ldyBFcnJvcigibGVuZ3RoIGxvbmdlciB0aGFuIHRhcmdldCBibG9jayIpO3RoaXMuI2VbdGhpcy4jZS5sZW5ndGgtMV1bMV09c30sZXJyb3Jfc2V0OnQ9PntsZXQgZT1wLmFkZHJlc3NUb0luZGV4KHQpO2lmKCF0aGlzLiN0W2VdKXRocm93IG5ldyBFcnJvcigiY2Fubm90IGFzc2lnbiB0byB0aGlzIGJsb2NrIik7dGhpcy4jZVt0aGlzLiNlLmxlbmd0aC0xXVsyXT1lfSxjb25maWdfZ2V0OnQ9PntsZXQgZT10aGlzLnJlYWQodCk7aWYoZT09PW51bGwpcmV0dXJuIDBuO2xldCBzPWUuc3RyaW5nKCk7cmV0dXJuIHMgaW4gdGhpcy4jYT90aGlzLnN0b3JlKHRoaXMuI2Fbc10pOjBufSx2YXJfZ2V0OnQ9PntsZXQgZT10aGlzLnJlYWQodCk7aWYoZT09PW51bGwpcmV0dXJuIDBuO2xldCBzPWUuc3RyaW5nKCk7cmV0dXJuIHRoaXMuI3IuaGFzKHMpP3AuaW5kZXhUb0FkZHJlc3ModGhpcy4jci5nZXQocykpOjBufSx2YXJfc2V0Oih0LGUpPT57bGV0IHM9dGhpcy5yZWFkKHQpO2lmKHM9PT1udWxsKXJldHVybiAwbjtsZXQgYT1zLnN0cmluZygpO2lmKGU9PT0wbilyZXR1cm4gdGhpcy4jci5kZWxldGUoYSksMG47dGhpcy4jci5zZXQoYSxwLmFkZHJlc3NUb0luZGV4KGUpKX0saHR0cF9yZXF1ZXN0Oih0LGUpPT4odGhpcy4jbi5lcnJvcigiaHR0cF9yZXF1ZXN0IGlzIG5vdCBlbmFibGVkIiksMG4pLGh0dHBfc3RhdHVzX2NvZGU6KCk9Pih0aGlzLiNuLmVycm9yKCJodHRwX3N0YXR1c19jb2RlIGlzIG5vdCBlbmFibGVkIiksMCksbGVuZ3RoOnQ9PnRoaXMubGVuZ3RoKHQpLGxlbmd0aF91bnNhZmU6dD0+dGhpcy5sZW5ndGgodCksbG9nX3dhcm46dD0+e2xldCBlPXAuYWRkcmVzc1RvSW5kZXgodCkscz10aGlzLiN0W2VdO2lmKCFzKXJldHVybiB0aGlzLiNuLmVycm9yKGBmYWlsZWQgdG8gbG9nKHdhcm4pOiBiYWQgYmxvY2sgcmVmZXJlbmNlIGluIGFkZHIgMHgke3QudG9TdHJpbmcoMTYpLnBhZFN0YXJ0KDY0LCIwIil9YCk7bGV0IGE9dGhpcy4jcy5kZWNvZGUocy5idWZmZXIpO3RoaXMuI24ud2FybihhKX0sbG9nX2luZm86dD0+e2xldCBlPXAuYWRkcmVzc1RvSW5kZXgodCkscz10aGlzLiN0W2VdO2lmKCFzKXJldHVybiB0aGlzLiNuLmVycm9yKGBmYWlsZWQgdG8gbG9nKGluZm8pOiBiYWQgYmxvY2sgcmVmZXJlbmNlIGluIGFkZHIgMHgke3QudG9TdHJpbmcoMTYpLnBhZFN0YXJ0KDY0LCIwIil9YCk7bGV0IGE9dGhpcy4jcy5kZWNvZGUocy5idWZmZXIpO3RoaXMuI24uaW5mbyhhKX0sbG9nX2RlYnVnOnQ9PntsZXQgZT1wLmFkZHJlc3NUb0luZGV4KHQpLHM9dGhpcy4jdFtlXTtpZighcylyZXR1cm4gdGhpcy4jbi5lcnJvcihgZmFpbGVkIHRvIGxvZyhkZWJ1Zyk6IGJhZCBibG9jayByZWZlcmVuY2UgaW4gYWRkciAweCR7dC50b1N0cmluZygxNikucGFkU3RhcnQoNjQsIjAiKX1gKTtsZXQgYT10aGlzLiNzLmRlY29kZShzLmJ1ZmZlcik7dGhpcy4jbi5kZWJ1ZyhhKX0sbG9nX2Vycm9yOnQ9PntsZXQgZT1wLmFkZHJlc3NUb0luZGV4KHQpLHM9dGhpcy4jdFtlXTtpZighcylyZXR1cm4gdGhpcy4jbi5lcnJvcihgZmFpbGVkIHRvIGxvZyhlcnJvcik6IGJhZCBibG9jayByZWZlcmVuY2UgaW4gYWRkciAweCR7dC50b1N0cmluZygxNikucGFkU3RhcnQoNjQsIjAiKX1gKTtsZXQgYT10aGlzLiNzLmRlY29kZShzLmJ1ZmZlcik7dGhpcy4jbi5lcnJvcihhKX19O3RoaXMuI289dCx0aGlzLiNuPWUsdGhpcy4jcz1uZXcgVGV4dERlY29kZXIsdGhpcy4jaT1uZXcgVGV4dEVuY29kZXIsdGhpcy4jZT1bXSx0aGlzLmFsbG9jKDEpLHRoaXMuI2E9c30jZTsjdDsjbjsjczsjaTsjbzsjYTsjcjthbGxvYyh0KXtsZXQgZT1uZXcgcChuZXcgdGhpcy4jbyhOdW1iZXIodCkpLCEwKSxzPXRoaXMuI3QubGVuZ3RoO3JldHVybiB0aGlzLiN0LnB1c2goZSkscC5pbmRleFRvQWRkcmVzcyhzKX1nZXRWYXJpYWJsZSh0KXtyZXR1cm4gdGhpcy4jci5oYXModCk/dGhpcy5yZWFkKHRoaXMuI3IuZ2V0KHQpKTpudWxsfXNldFZhcmlhYmxlKHQsZSl7bGV0IHM9dGhpc1tQXShlKTtpZihzPT09bnVsbClyZXR1cm4gMG47bGV0IGE9dGhpcy4jci5nZXQodCk/P251bGw7cmV0dXJuIGEhPT1udWxsJiYodGhpcy4jdFthXT10aGlzLiN0W3NdLHRoaXMuI3Rbc109bnVsbCxzPT09dGhpcy4jdC5sZW5ndGgtMSYmdGhpcy4jdC5wb3AoKSksdGhpcy4jci5zZXQodCxhPz9zKSxwLmluZGV4VG9BZGRyZXNzKGE/P3MpfXJlYWQodCl7bGV0IGU9cC5hZGRyZXNzVG9JbmRleCh0KSxzPXRoaXMuI3RbZV07aWYoIXMpcmV0dXJuIG51bGw7bGV0IGE9IShzLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSYmIW90LmFsbG93U2hhcmVkQnVmZmVyQ29kZWM/bmV3IFVpbnQ4QXJyYXkocy5idWZmZXIpLnNsaWNlKCkuYnVmZmVyOnMuYnVmZmVyO3JldHVybiBuZXcgeShhKX1zdG9yZSh0KXtsZXQgZT10aGlzW1BdKHQpO2lmKCFlKXRocm93IG5ldyBFcnJvcigiZmFpbGVkIHRvIHN0b3JlIG91dHB1dCIpO3JldHVybiBwLmluZGV4VG9BZGRyZXNzKGUpfWxlbmd0aCh0KXtsZXQgZT1wLmFkZHJlc3NUb0luZGV4KHQpLHM9dGhpcy4jdFtlXTtyZXR1cm4gcz9CaWdJbnQocy5idWZmZXIuYnl0ZUxlbmd0aCk6MG59Z2V0I2woKXtsZXQgdD10aGlzLiNlW3RoaXMuI2UubGVuZ3RoLTFdWzBdO3JldHVybiB0PT09bnVsbD9udWxsOnRoaXMuI3RbdF19WyhidD1qLCQpXSgpe3RoaXMuI3QubGVuZ3RoPTEsdGhpcy4jZS5sZW5ndGg9MH1bWF0odCl7bGV0IGU9dGhpcy4jdFt0XTtpZighZSl0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgYmxvY2sgaW5kZXg6ICR7dH1gKTtyZXR1cm4gZX1bR10odCxlPSExKXtmb3IobGV0W3MsYV1vZiB0LmJsb2Nrcyl7aWYocyYmZSl7bGV0IG49bmV3IFVpbnQ4QXJyYXkobmV3IHRoaXMuI28oTnVtYmVyKHMuYnl0ZUxlbmd0aCkpKTtuLnNldChuZXcgVWludDhBcnJheShzKSkscz1uLmJ1ZmZlcn10aGlzLiN0W2FdPXM/bmV3IHAocywhMSk6bnVsbH10aGlzLiNlPXQuc3RhY2t9W01dKCl7cmV0dXJue3N0YWNrOnRoaXMuI2Uuc2xpY2UoKSxibG9ja3M6dGhpcy4jdC5tYXAoKHQsZSk9PnQ/dC5sb2NhbD8odC5sb2NhbD0hMSxbdC5idWZmZXIsZV0pOm51bGw6W251bGwsZV0pLmZpbHRlcihCb29sZWFuKX19W1BdKHQpe2lmKCF0KXJldHVybiBudWxsO2lmKHR5cGVvZiB0PT0ic3RyaW5nIiYmKHQ9dGhpcy4jaS5lbmNvZGUodCkpLHQgaW5zdGFuY2VvZiBVaW50OEFycmF5KXtpZih0LmJ1ZmZlci5jb25zdHJ1Y3Rvcj09PXRoaXMuI28pe2xldCBuPXRoaXMuI3QubGVuZ3RoO3JldHVybiB0aGlzLiN0LnB1c2gobmV3IHAodC5idWZmZXIsITApKSxufWxldCBlPXAuYWRkcmVzc1RvSW5kZXgodGhpcy5hbGxvYyh0Lmxlbmd0aCkpLHM9dGhpcy4jdFtlXTtyZXR1cm4gbmV3IFVpbnQ4QXJyYXkocy5idWZmZXIpLnNldCh0LDApLGV9cmV0dXJuIHR9W0tdKHQpe3RoaXMuI2UucHVzaChbdCxudWxsLG51bGxdKX1bQl0oKXtsZXRbLHQsZV09dGhpcy4jZS5wb3AoKSxzPWU9PT1udWxsPzE6MCxhPWU/P3Qsbj1bbnVsbCxudWxsXTtyZXR1cm4gYT09PW51bGx8fHRoaXMuI3RbYV09PT1udWxsfHwobltzXT1hKSxufX07dmFyIHg9Y2xhc3N7c3RhdGljIHJlYWRfYnl0ZXModCxlKXtsZXQgcz1uZXcgeDtyZXR1cm4gcy5idWY9dC5nZXRVaW50MzIoZSwhMCkscy5idWZfbGVuPXQuZ2V0VWludDMyKGUrNCwhMCksc31zdGF0aWMgcmVhZF9ieXRlc19hcnJheSh0LGUscyl7bGV0IGE9W107Zm9yKGxldCBuPTA7bjxzO24rKylhLnB1c2goeC5yZWFkX2J5dGVzKHQsZSs4Km4pKTtyZXR1cm4gYX19LE49Y2xhc3N7c3RhdGljIHJlYWRfYnl0ZXModCxlKXtsZXQgcz1uZXcgTjtyZXR1cm4gcy5idWY9dC5nZXRVaW50MzIoZSwhMCkscy5idWZfbGVuPXQuZ2V0VWludDMyKGUrNCwhMCksc31zdGF0aWMgcmVhZF9ieXRlc19hcnJheSh0LGUscyl7bGV0IGE9W107Zm9yKGxldCBuPTA7bjxzO24rKylhLnB1c2goTi5yZWFkX2J5dGVzKHQsZSs4Km4pKTtyZXR1cm4gYX19LGF0PTAsbHQ9MSxRPTI7dmFyIFo9NDt2YXIgZnQ9MTw8MCxrdD0xPDwxLEJ0PTE8PDIsR3Q9MTw8MyxNdD0xPDw0LFc9Y2xhc3N7d3JpdGVfYnl0ZXModCxlKXt0LnNldFVpbnQ4KGUsdGhpcy5mc19maWxldHlwZSksdC5zZXRVaW50MTYoZSsyLHRoaXMuZnNfZmxhZ3MsITApLHQuc2V0QmlnVWludDY0KGUrOCx0aGlzLmZzX3JpZ2h0c19iYXNlLCEwKSx0LnNldEJpZ1VpbnQ2NChlKzE2LHRoaXMuZnNfcmlnaHRzX2luaGVyaXRlZCwhMCl9Y29uc3RydWN0b3IodCxlKXt0aGlzLmZzX3JpZ2h0c19iYXNlPTBuLHRoaXMuZnNfcmlnaHRzX2luaGVyaXRlZD0wbix0aGlzLmZzX2ZpbGV0eXBlPXQsdGhpcy5mc19mbGFncz1lfX0sV3Q9MTw8MCx2dD0xPDwxLEh0PTE8PDIsVnQ9MTw8MyxFdD0xPDwwLFJ0PTE8PDEsd3Q9MTw8MixtdD0xPDwzLHY9Y2xhc3N7d3JpdGVfYnl0ZXModCxlKXt0LnNldEJpZ1VpbnQ2NChlLHRoaXMuZGV2LCEwKSx0LnNldEJpZ1VpbnQ2NChlKzgsdGhpcy5pbm8sITApLHQuc2V0VWludDgoZSsxNix0aGlzLmZpbGV0eXBlKSx0LnNldEJpZ1VpbnQ2NChlKzI0LHRoaXMubmxpbmssITApLHQuc2V0QmlnVWludDY0KGUrMzIsdGhpcy5zaXplLCEwKSx0LnNldEJpZ1VpbnQ2NChlKzM4LHRoaXMuYXRpbSwhMCksdC5zZXRCaWdVaW50NjQoZSs0Nix0aGlzLm10aW0sITApLHQuc2V0QmlnVWludDY0KGUrNTIsdGhpcy5jdGltLCEwKX1jb25zdHJ1Y3Rvcih0LGUpe3RoaXMuZGV2PTBuLHRoaXMuaW5vPTBuLHRoaXMubmxpbms9MG4sdGhpcy5hdGltPTBuLHRoaXMubXRpbT0wbix0aGlzLmN0aW09MG4sdGhpcy5maWxldHlwZT10LHRoaXMuc2l6ZT1lfX07dmFyIFl0PTE8PDAsenQ9MTw8MDt2YXIgS3Q9MTw8MCxqdD0xPDwxLFh0PTE8PDAsJHQ9MTw8MCxRdD0xPDwxO3ZhciB4dD1jbGFzc3tlbmFibGUodCl7dGhpcy5sb2c9TnQodD09PXZvaWQgMD8hMDp0LHRoaXMucHJlZml4KX1nZXQgZW5hYmxlZCgpe3JldHVybiB0aGlzLmlzRW5hYmxlZH1jb25zdHJ1Y3Rvcih0KXt0aGlzLmlzRW5hYmxlZD10LHRoaXMucHJlZml4PSJ3YXNpOiIsdGhpcy5lbmFibGUodCl9fTtmdW5jdGlvbiBOdChjLHQpe3JldHVybiBjP2NvbnNvbGUubG9nLmJpbmQoY29uc29sZSwiJWMlcyIsImNvbG9yOiAjMjY1QkEwIix0KTooKT0+e319dmFyIFI9bmV3IHh0KCExKTt2YXIgVj1jbGFzcyBleHRlbmRzIEVycm9ye2NvbnN0cnVjdG9yKHQpe3N1cGVyKCJleGl0IHdpdGggZXhpdCBjb2RlICIrdCksdGhpcy5jb2RlPXR9fSxKPWNsYXNze3N0YXJ0KHQpe3RoaXMuaW5zdD10O3RyeXt0LmV4cG9ydHMuX3N0YXJ0KCl9Y2F0Y2goZSl7aWYoZSBpbnN0YW5jZW9mIFYpcmV0dXJuIGUuY29kZTt0aHJvdyBlfX1pbml0aWFsaXplKHQpe3RoaXMuaW5zdD10LHQuZXhwb3J0cy5faW5pdGlhbGl6ZSgpfWNvbnN0cnVjdG9yKHQsZSxzLGE9e30pe3RoaXMuYXJncz1bXSx0aGlzLmVudj1bXSx0aGlzLmZkcz1bXSxSLmVuYWJsZShhLmRlYnVnKSx0aGlzLmFyZ3M9dCx0aGlzLmVudj1lLHRoaXMuZmRzPXM7bGV0IG49dGhpczt0aGlzLndhc2lJbXBvcnQ9e2FyZ3Nfc2l6ZXNfZ2V0KHIsaSl7bGV0IG89bmV3IERhdGFWaWV3KG4uaW5zdC5leHBvcnRzLm1lbW9yeS5idWZmZXIpO28uc2V0VWludDMyKHIsbi5hcmdzLmxlbmd0aCwhMCk7bGV0IGw9MDtmb3IobGV0IGYgb2Ygbi5hcmdzKWwrPWYubGVuZ3RoKzE7cmV0dXJuIG8uc2V0VWludDMyKGksbCwhMCksUi5sb2coby5nZXRVaW50MzIociwhMCksby5nZXRVaW50MzIoaSwhMCkpLDB9LGFyZ3NfZ2V0KHIsaSl7bGV0IG89bmV3IERhdGFWaWV3KG4uaW5zdC5leHBvcnRzLm1lbW9yeS5idWZmZXIpLGw9bmV3IFVpbnQ4QXJyYXkobi5pbnN0LmV4cG9ydHMubWVtb3J5LmJ1ZmZlciksZj1pO2ZvcihsZXQgdT0wO3U8bi5hcmdzLmxlbmd0aDt1Kyspe28uc2V0VWludDMyKHIsaSwhMCkscis9NDtsZXQgXz1uZXcgVGV4dEVuY29kZXIoKS5lbmNvZGUobi5hcmdzW3VdKTtsLnNldChfLGkpLG8uc2V0VWludDgoaStfLmxlbmd0aCwwKSxpKz1fLmxlbmd0aCsxfXJldHVybiBSLmVuYWJsZWQmJlIubG9nKG5ldyBUZXh0RGVjb2RlcigidXRmLTgiKS5kZWNvZGUobC5zbGljZShmLGkpKSksMH0sZW52aXJvbl9zaXplc19nZXQocixpKXtsZXQgbz1uZXcgRGF0YVZpZXcobi5pbnN0LmV4cG9ydHMubWVtb3J5LmJ1ZmZlcik7by5zZXRVaW50MzIocixuLmVudi5sZW5ndGgsITApO2xldCBsPTA7Zm9yKGxldCBmIG9mIG4uZW52KWwrPWYubGVuZ3RoKzE7cmV0dXJuIG8uc2V0VWludDMyKGksbCwhMCksUi5sb2coby5nZXRVaW50MzIociwhMCksby5nZXRVaW50MzIoaSwhMCkpLDB9LGVudmlyb25fZ2V0KHIsaSl7bGV0IG89bmV3IERhdGFWaWV3KG4uaW5zdC5leHBvcnRzLm1lbW9yeS5idWZmZXIpLGw9bmV3IFVpbnQ4QXJyYXkobi5pbnN0LmV4cG9ydHMubWVtb3J5LmJ1ZmZlciksZj1pO2ZvcihsZXQgdT0wO3U8bi5lbnYubGVuZ3RoO3UrKyl7by5zZXRVaW50MzIocixpLCEwKSxyKz00O2xldCBfPW5ldyBUZXh0RW5jb2RlcigpLmVuY29kZShuLmVudlt1XSk7bC5zZXQoXyxpKSxvLnNldFVpbnQ4KGkrXy5sZW5ndGgsMCksaSs9Xy5sZW5ndGgrMX1yZXR1cm4gUi5lbmFibGVkJiZSLmxvZyhuZXcgVGV4dERlY29kZXIoInV0Zi04IikuZGVjb2RlKGwuc2xpY2UoZixpKSkpLDB9LGNsb2NrX3Jlc19nZXQocixpKXtsZXQgbztzd2l0Y2gocil7Y2FzZSAxOntvPTUwMDBuO2JyZWFrfWNhc2UgMDp7bz0xMDAwMDAwbjticmVha31kZWZhdWx0OnJldHVybiA1Mn1yZXR1cm4gbmV3IERhdGFWaWV3KG4uaW5zdC5leHBvcnRzLm1lbW9yeS5idWZmZXIpLnNldEJpZ1VpbnQ2NChpLG8sITApLDB9LGNsb2NrX3RpbWVfZ2V0KHIsaSxvKXtsZXQgbD1uZXcgRGF0YVZpZXcobi5pbnN0LmV4cG9ydHMubWVtb3J5LmJ1ZmZlcik7aWYocj09PTApbC5zZXRCaWdVaW50NjQobyxCaWdJbnQobmV3IERhdGUoKS5nZXRUaW1lKCkpKjEwMDAwMDBuLCEwKTtlbHNlIGlmKHI9PTEpe2xldCBmO3RyeXtmPUJpZ0ludChNYXRoLnJvdW5kKHBlcmZvcm1hbmNlLm5vdygpKjFlNikpfWNhdGNoe2Y9MG59bC5zZXRCaWdVaW50NjQobyxmLCEwKX1lbHNlIGwuc2V0QmlnVWludDY0KG8sMG4sITApO3JldHVybiAwfSxmZF9hZHZpc2UocixpLG8sbCl7cmV0dXJuIG4uZmRzW3JdIT1udWxsP24uZmRzW3JdLmZkX2FkdmlzZShpLG8sbCk6OH0sZmRfYWxsb2NhdGUocixpLG8pe3JldHVybiBuLmZkc1tyXSE9bnVsbD9uLmZkc1tyXS5mZF9hbGxvY2F0ZShpLG8pOjh9LGZkX2Nsb3NlKHIpe2lmKG4uZmRzW3JdIT1udWxsKXtsZXQgaT1uLmZkc1tyXS5mZF9jbG9zZSgpO3JldHVybiBuLmZkc1tyXT12b2lkIDAsaX1lbHNlIHJldHVybiA4fSxmZF9kYXRhc3luYyhyKXtyZXR1cm4gbi5mZHNbcl0hPW51bGw/bi5mZHNbcl0uZmRfZGF0YXN5bmMoKTo4fSxmZF9mZHN0YXRfZ2V0KHIsaSl7aWYobi5mZHNbcl0hPW51bGwpe2xldHtyZXQ6byxmZHN0YXQ6bH09bi5mZHNbcl0uZmRfZmRzdGF0X2dldCgpO3JldHVybiBsPy53cml0ZV9ieXRlcyhuZXcgRGF0YVZpZXcobi5pbnN0LmV4cG9ydHMubWVtb3J5LmJ1ZmZlciksaSksb31lbHNlIHJldHVybiA4fSxmZF9mZHN0YXRfc2V0X2ZsYWdzKHIsaSl7cmV0dXJuIG4uZmRzW3JdIT1udWxsP24uZmRzW3JdLmZkX2Zkc3RhdF9zZXRfZmxhZ3MoaSk6OH0sZmRfZmRzdGF0X3NldF9yaWdodHMocixpLG8pe3JldHVybiBuLmZkc1tyXSE9bnVsbD9uLmZkc1tyXS5mZF9mZHN0YXRfc2V0X3JpZ2h0cyhpLG8pOjh9LGZkX2ZpbGVzdGF0X2dldChyLGkpe2lmKG4uZmRzW3JdIT1udWxsKXtsZXR7cmV0Om8sZmlsZXN0YXQ6bH09bi5mZHNbcl0uZmRfZmlsZXN0YXRfZ2V0KCk7cmV0dXJuIGw/LndyaXRlX2J5dGVzKG5ldyBEYXRhVmlldyhuLmluc3QuZXhwb3J0cy5tZW1vcnkuYnVmZmVyKSxpKSxvfWVsc2UgcmV0dXJuIDh9LGZkX2ZpbGVzdGF0X3NldF9zaXplKHIsaSl7cmV0dXJuIG4uZmRzW3JdIT1udWxsP24uZmRzW3JdLmZkX2ZpbGVzdGF0X3NldF9zaXplKGkpOjh9LGZkX2ZpbGVzdGF0X3NldF90aW1lcyhyLGksbyxsKXtyZXR1cm4gbi5mZHNbcl0hPW51bGw/bi5mZHNbcl0uZmRfZmlsZXN0YXRfc2V0X3RpbWVzKGksbyxsKTo4fSxmZF9wcmVhZChyLGksbyxsLGYpe2xldCB1PW5ldyBEYXRhVmlldyhuLmluc3QuZXhwb3J0cy5tZW1vcnkuYnVmZmVyKSxfPW5ldyBVaW50OEFycmF5KG4uaW5zdC5leHBvcnRzLm1lbW9yeS5idWZmZXIpO2lmKG4uZmRzW3JdIT1udWxsKXtsZXQgZD14LnJlYWRfYnl0ZXNfYXJyYXkodSxpLG8pLHtyZXQ6RSxucmVhZDpifT1uLmZkc1tyXS5mZF9wcmVhZChfLGQsbCk7cmV0dXJuIHUuc2V0VWludDMyKGYsYiwhMCksRX1lbHNlIHJldHVybiA4fSxmZF9wcmVzdGF0X2dldChyLGkpe2xldCBvPW5ldyBEYXRhVmlldyhuLmluc3QuZXhwb3J0cy5tZW1vcnkuYnVmZmVyKTtpZihuLmZkc1tyXSE9bnVsbCl7bGV0e3JldDpsLHByZXN0YXQ6Zn09bi5mZHNbcl0uZmRfcHJlc3RhdF9nZXQoKTtyZXR1cm4gZj8ud3JpdGVfYnl0ZXMobyxpKSxsfWVsc2UgcmV0dXJuIDh9LGZkX3ByZXN0YXRfZGlyX25hbWUocixpLG8pe2lmKG4uZmRzW3JdIT1udWxsKXtsZXR7cmV0OmwscHJlc3RhdF9kaXJfbmFtZTpmfT1uLmZkc1tyXS5mZF9wcmVzdGF0X2Rpcl9uYW1lKCk7cmV0dXJuIGYhPW51bGwmJm5ldyBVaW50OEFycmF5KG4uaW5zdC5leHBvcnRzLm1lbW9yeS5idWZmZXIpLnNldChmLGkpLGx9ZWxzZSByZXR1cm4gOH0sZmRfcHdyaXRlKHIsaSxvLGwsZil7bGV0IHU9bmV3IERhdGFWaWV3KG4uaW5zdC5leHBvcnRzLm1lbW9yeS5idWZmZXIpLF89bmV3IFVpbnQ4QXJyYXkobi5pbnN0LmV4cG9ydHMubWVtb3J5LmJ1ZmZlcik7aWYobi5mZHNbcl0hPW51bGwpe2xldCBkPU4ucmVhZF9ieXRlc19hcnJheSh1LGksbykse3JldDpFLG53cml0dGVuOmJ9PW4uZmRzW3JdLmZkX3B3cml0ZShfLGQsbCk7cmV0dXJuIHUuc2V0VWludDMyKGYsYiwhMCksRX1lbHNlIHJldHVybiA4fSxmZF9yZWFkKHIsaSxvLGwpe2xldCBmPW5ldyBEYXRhVmlldyhuLmluc3QuZXhwb3J0cy5tZW1vcnkuYnVmZmVyKSx1PW5ldyBVaW50OEFycmF5KG4uaW5zdC5leHBvcnRzLm1lbW9yeS5idWZmZXIpO2lmKG4uZmRzW3JdIT1udWxsKXtsZXQgXz14LnJlYWRfYnl0ZXNfYXJyYXkoZixpLG8pLHtyZXQ6ZCxucmVhZDpFfT1uLmZkc1tyXS5mZF9yZWFkKHUsXyk7cmV0dXJuIGYuc2V0VWludDMyKGwsRSwhMCksZH1lbHNlIHJldHVybiA4fSxmZF9yZWFkZGlyKHIsaSxvLGwsZil7bGV0IHU9bmV3IERhdGFWaWV3KG4uaW5zdC5leHBvcnRzLm1lbW9yeS5idWZmZXIpLF89bmV3IFVpbnQ4QXJyYXkobi5pbnN0LmV4cG9ydHMubWVtb3J5LmJ1ZmZlcik7aWYobi5mZHNbcl0hPW51bGwpe2xldCBkPTA7Zm9yKDs7KXtsZXR7cmV0OkUsZGlyZW50OmJ9PW4uZmRzW3JdLmZkX3JlYWRkaXJfc2luZ2xlKGwpO2lmKEUhPTApcmV0dXJuIHUuc2V0VWludDMyKGYsZCwhMCksRTtpZihiPT1udWxsKWJyZWFrO2lmKG8tZDxiLmhlYWRfbGVuZ3RoKCkpe2Q9bzticmVha31sZXQgdz1uZXcgQXJyYXlCdWZmZXIoYi5oZWFkX2xlbmd0aCgpKTtpZihiLndyaXRlX2hlYWRfYnl0ZXMobmV3IERhdGFWaWV3KHcpLDApLF8uc2V0KG5ldyBVaW50OEFycmF5KHcpLnNsaWNlKDAsTWF0aC5taW4ody5ieXRlTGVuZ3RoLG8tZCkpLGkpLGkrPWIuaGVhZF9sZW5ndGgoKSxkKz1iLmhlYWRfbGVuZ3RoKCksby1kPGIubmFtZV9sZW5ndGgoKSl7ZD1vO2JyZWFrfWIud3JpdGVfbmFtZV9ieXRlcyhfLGksby1kKSxpKz1iLm5hbWVfbGVuZ3RoKCksZCs9Yi5uYW1lX2xlbmd0aCgpLGw9Yi5kX25leHR9cmV0dXJuIHUuc2V0VWludDMyKGYsZCwhMCksMH1lbHNlIHJldHVybiA4fSxmZF9yZW51bWJlcihyLGkpe2lmKG4uZmRzW3JdIT1udWxsJiZuLmZkc1tpXSE9bnVsbCl7bGV0IG89bi5mZHNbaV0uZmRfY2xvc2UoKTtyZXR1cm4gbyE9MD9vOihuLmZkc1tpXT1uLmZkc1tyXSxuLmZkc1tyXT12b2lkIDAsMCl9ZWxzZSByZXR1cm4gOH0sZmRfc2VlayhyLGksbyxsKXtsZXQgZj1uZXcgRGF0YVZpZXcobi5pbnN0LmV4cG9ydHMubWVtb3J5LmJ1ZmZlcik7aWYobi5mZHNbcl0hPW51bGwpe2xldHtyZXQ6dSxvZmZzZXQ6X309bi5mZHNbcl0uZmRfc2VlayhpLG8pO3JldHVybiBmLnNldEJpZ0ludDY0KGwsXywhMCksdX1lbHNlIHJldHVybiA4fSxmZF9zeW5jKHIpe3JldHVybiBuLmZkc1tyXSE9bnVsbD9uLmZkc1tyXS5mZF9zeW5jKCk6OH0sZmRfdGVsbChyLGkpe2xldCBvPW5ldyBEYXRhVmlldyhuLmluc3QuZXhwb3J0cy5tZW1vcnkuYnVmZmVyKTtpZihuLmZkc1tyXSE9bnVsbCl7bGV0e3JldDpsLG9mZnNldDpmfT1uLmZkc1tyXS5mZF90ZWxsKCk7cmV0dXJuIG8uc2V0QmlnVWludDY0KGksZiwhMCksbH1lbHNlIHJldHVybiA4fSxmZF93cml0ZShyLGksbyxsKXtsZXQgZj1uZXcgRGF0YVZpZXcobi5pbnN0LmV4cG9ydHMubWVtb3J5LmJ1ZmZlciksdT1uZXcgVWludDhBcnJheShuLmluc3QuZXhwb3J0cy5tZW1vcnkuYnVmZmVyKTtpZihuLmZkc1tyXSE9bnVsbCl7bGV0IF89Ti5yZWFkX2J5dGVzX2FycmF5KGYsaSxvKSx7cmV0OmQsbndyaXR0ZW46RX09bi5mZHNbcl0uZmRfd3JpdGUodSxfKTtyZXR1cm4gZi5zZXRVaW50MzIobCxFLCEwKSxkfWVsc2UgcmV0dXJuIDh9LHBhdGhfY3JlYXRlX2RpcmVjdG9yeShyLGksbyl7bGV0IGw9bmV3IFVpbnQ4QXJyYXkobi5pbnN0LmV4cG9ydHMubWVtb3J5LmJ1ZmZlcik7aWYobi5mZHNbcl0hPW51bGwpe2xldCBmPW5ldyBUZXh0RGVjb2RlcigidXRmLTgiKS5kZWNvZGUobC5zbGljZShpLGkrbykpO3JldHVybiBuLmZkc1tyXS5wYXRoX2NyZWF0ZV9kaXJlY3RvcnkoZil9fSxwYXRoX2ZpbGVzdGF0X2dldChyLGksbyxsLGYpe2xldCB1PW5ldyBEYXRhVmlldyhuLmluc3QuZXhwb3J0cy5tZW1vcnkuYnVmZmVyKSxfPW5ldyBVaW50OEFycmF5KG4uaW5zdC5leHBvcnRzLm1lbW9yeS5idWZmZXIpO2lmKG4uZmRzW3JdIT1udWxsKXtsZXQgZD1uZXcgVGV4dERlY29kZXIoInV0Zi04IikuZGVjb2RlKF8uc2xpY2UobyxvK2wpKSx7cmV0OkUsZmlsZXN0YXQ6Yn09bi5mZHNbcl0ucGF0aF9maWxlc3RhdF9nZXQoaSxkKTtyZXR1cm4gYj8ud3JpdGVfYnl0ZXModSxmKSxFfWVsc2UgcmV0dXJuIDh9LHBhdGhfZmlsZXN0YXRfc2V0X3RpbWVzKHIsaSxvLGwsZix1LF8pe2xldCBkPW5ldyBVaW50OEFycmF5KG4uaW5zdC5leHBvcnRzLm1lbW9yeS5idWZmZXIpO2lmKG4uZmRzW3JdIT1udWxsKXtsZXQgRT1uZXcgVGV4dERlY29kZXIoInV0Zi04IikuZGVjb2RlKGQuc2xpY2UobyxvK2wpKTtyZXR1cm4gbi5mZHNbcl0ucGF0aF9maWxlc3RhdF9zZXRfdGltZXMoaSxFLGYsdSxfKX1lbHNlIHJldHVybiA4fSxwYXRoX2xpbmsocixpLG8sbCxmLHUsXyl7bGV0IGQ9bmV3IFVpbnQ4QXJyYXkobi5pbnN0LmV4cG9ydHMubWVtb3J5LmJ1ZmZlcik7aWYobi5mZHNbcl0hPW51bGwmJm4uZmRzW2ZdIT1udWxsKXtsZXQgRT1uZXcgVGV4dERlY29kZXIoInV0Zi04IikuZGVjb2RlKGQuc2xpY2UobyxvK2wpKSxiPW5ldyBUZXh0RGVjb2RlcigidXRmLTgiKS5kZWNvZGUoZC5zbGljZSh1LHUrXykpO3JldHVybiBuLmZkc1tmXS5wYXRoX2xpbmsocixpLEUsYil9ZWxzZSByZXR1cm4gOH0scGF0aF9vcGVuKHIsaSxvLGwsZix1LF8sZCxFKXtsZXQgYj1uZXcgRGF0YVZpZXcobi5pbnN0LmV4cG9ydHMubWVtb3J5LmJ1ZmZlciksdz1uZXcgVWludDhBcnJheShuLmluc3QuZXhwb3J0cy5tZW1vcnkuYnVmZmVyKTtpZihuLmZkc1tyXSE9bnVsbCl7bGV0IG50PW5ldyBUZXh0RGVjb2RlcigidXRmLTgiKS5kZWNvZGUody5zbGljZShvLG8rbCkpO1IubG9nKG50KTtsZXR7cmV0OnN0LGZkX29iajpwdH09bi5mZHNbcl0ucGF0aF9vcGVuKGksbnQsZix1LF8sZCk7aWYoc3QhPTApcmV0dXJuIHN0O24uZmRzLnB1c2gocHQpO2xldCBndD1uLmZkcy5sZW5ndGgtMTtyZXR1cm4gYi5zZXRVaW50MzIoRSxndCwhMCksMH1lbHNlIHJldHVybiA4fSxwYXRoX3JlYWRsaW5rKHIsaSxvLGwsZix1KXtsZXQgXz1uZXcgRGF0YVZpZXcobi5pbnN0LmV4cG9ydHMubWVtb3J5LmJ1ZmZlciksZD1uZXcgVWludDhBcnJheShuLmluc3QuZXhwb3J0cy5tZW1vcnkuYnVmZmVyKTtpZihuLmZkc1tyXSE9bnVsbCl7bGV0IEU9bmV3IFRleHREZWNvZGVyKCJ1dGYtOCIpLmRlY29kZShkLnNsaWNlKGksaStvKSk7Ui5sb2coRSk7bGV0e3JldDpiLGRhdGE6d309bi5mZHNbcl0ucGF0aF9yZWFkbGluayhFKTtpZih3IT1udWxsKXtpZih3Lmxlbmd0aD5mKXJldHVybiBfLnNldFVpbnQzMih1LDAsITApLDg7ZC5zZXQodyxsKSxfLnNldFVpbnQzMih1LHcubGVuZ3RoLCEwKX1yZXR1cm4gYn1lbHNlIHJldHVybiA4fSxwYXRoX3JlbW92ZV9kaXJlY3RvcnkocixpLG8pe2xldCBsPW5ldyBVaW50OEFycmF5KG4uaW5zdC5leHBvcnRzLm1lbW9yeS5idWZmZXIpO2lmKG4uZmRzW3JdIT1udWxsKXtsZXQgZj1uZXcgVGV4dERlY29kZXIoInV0Zi04IikuZGVjb2RlKGwuc2xpY2UoaSxpK28pKTtyZXR1cm4gbi5mZHNbcl0ucGF0aF9yZW1vdmVfZGlyZWN0b3J5KGYpfWVsc2UgcmV0dXJuIDh9LHBhdGhfcmVuYW1lKHIsaSxvLGwsZix1KXt0aHJvdyJGSVhNRSB3aGF0IGlzIHRoZSBiZXN0IGFic3RyYWN0aW9uIGZvciB0aGlzPyJ9LHBhdGhfc3ltbGluayhyLGksbyxsLGYpe2xldCB1PW5ldyBVaW50OEFycmF5KG4uaW5zdC5leHBvcnRzLm1lbW9yeS5idWZmZXIpO2lmKG4uZmRzW29dIT1udWxsKXtsZXQgXz1uZXcgVGV4dERlY29kZXIoInV0Zi04IikuZGVjb2RlKHUuc2xpY2UocixyK2kpKSxkPW5ldyBUZXh0RGVjb2RlcigidXRmLTgiKS5kZWNvZGUodS5zbGljZShsLGwrZikpO3JldHVybiBuLmZkc1tvXS5wYXRoX3N5bWxpbmsoXyxkKX1lbHNlIHJldHVybiA4fSxwYXRoX3VubGlua19maWxlKHIsaSxvKXtsZXQgbD1uZXcgVWludDhBcnJheShuLmluc3QuZXhwb3J0cy5tZW1vcnkuYnVmZmVyKTtpZihuLmZkc1tyXSE9bnVsbCl7bGV0IGY9bmV3IFRleHREZWNvZGVyKCJ1dGYtOCIpLmRlY29kZShsLnNsaWNlKGksaStvKSk7cmV0dXJuIG4uZmRzW3JdLnBhdGhfdW5saW5rX2ZpbGUoZil9ZWxzZSByZXR1cm4gOH0scG9sbF9vbmVvZmYocixpLG8pe3Rocm93ImFzeW5jIGlvIG5vdCBzdXBwb3J0ZWQifSxwcm9jX2V4aXQocil7dGhyb3cgbmV3IFYocil9LHByb2NfcmFpc2Uocil7dGhyb3cicmFpc2VkIHNpZ25hbCAiK3J9LHNjaGVkX3lpZWxkKCl7fSxyYW5kb21fZ2V0KHIsaSl7bGV0IG89bmV3IFVpbnQ4QXJyYXkobi5pbnN0LmV4cG9ydHMubWVtb3J5LmJ1ZmZlcik7Zm9yKGxldCBsPTA7bDxpO2wrKylvW3IrbF09TWF0aC5yYW5kb20oKSoyNTZ8MH0sc29ja19yZWN2KHIsaSxvKXt0aHJvdyJzb2NrZXRzIG5vdCBzdXBwb3J0ZWQifSxzb2NrX3NlbmQocixpLG8pe3Rocm93InNvY2tldHMgbm90IHN1cHBvcnRlZCJ9LHNvY2tfc2h1dGRvd24ocixpKXt0aHJvdyJzb2NrZXRzIG5vdCBzdXBwb3J0ZWQifSxzb2NrX2FjY2VwdChyLGkpe3Rocm93InNvY2tldHMgbm90IHN1cHBvcnRlZCJ9fX19O3ZhciBBPWNsYXNze2ZkX2FkdmlzZSh0LGUscyl7cmV0dXJuIDU4fWZkX2FsbG9jYXRlKHQsZSl7cmV0dXJuIDU4fWZkX2Nsb3NlKCl7cmV0dXJuIDB9ZmRfZGF0YXN5bmMoKXtyZXR1cm4gNTh9ZmRfZmRzdGF0X2dldCgpe3JldHVybntyZXQ6NTgsZmRzdGF0Om51bGx9fWZkX2Zkc3RhdF9zZXRfZmxhZ3ModCl7cmV0dXJuIDU4fWZkX2Zkc3RhdF9zZXRfcmlnaHRzKHQsZSl7cmV0dXJuIDU4fWZkX2ZpbGVzdGF0X2dldCgpe3JldHVybntyZXQ6NTgsZmlsZXN0YXQ6bnVsbH19ZmRfZmlsZXN0YXRfc2V0X3NpemUodCl7cmV0dXJuIDU4fWZkX2ZpbGVzdGF0X3NldF90aW1lcyh0LGUscyl7cmV0dXJuIDU4fWZkX3ByZWFkKHQsZSxzKXtyZXR1cm57cmV0OjU4LG5yZWFkOjB9fWZkX3ByZXN0YXRfZ2V0KCl7cmV0dXJue3JldDo1OCxwcmVzdGF0Om51bGx9fWZkX3ByZXN0YXRfZGlyX25hbWUoKXtyZXR1cm57cmV0OjU4LHByZXN0YXRfZGlyX25hbWU6bnVsbH19ZmRfcHdyaXRlKHQsZSxzKXtyZXR1cm57cmV0OjU4LG53cml0dGVuOjB9fWZkX3JlYWQodCxlKXtyZXR1cm57cmV0OjU4LG5yZWFkOjB9fWZkX3JlYWRkaXJfc2luZ2xlKHQpe3JldHVybntyZXQ6NTgsZGlyZW50Om51bGx9fWZkX3NlZWsodCxlKXtyZXR1cm57cmV0OjU4LG9mZnNldDowbn19ZmRfc3luYygpe3JldHVybiAwfWZkX3RlbGwoKXtyZXR1cm57cmV0OjU4LG9mZnNldDowbn19ZmRfd3JpdGUodCxlKXtyZXR1cm57cmV0OjU4LG53cml0dGVuOjB9fXBhdGhfY3JlYXRlX2RpcmVjdG9yeSh0KXtyZXR1cm4gNTh9cGF0aF9maWxlc3RhdF9nZXQodCxlKXtyZXR1cm57cmV0OjU4LGZpbGVzdGF0Om51bGx9fXBhdGhfZmlsZXN0YXRfc2V0X3RpbWVzKHQsZSxzLGEsbil7cmV0dXJuIDU4fXBhdGhfbGluayh0LGUscyxhKXtyZXR1cm4gNTh9cGF0aF9vcGVuKHQsZSxzLGEsbixyKXtyZXR1cm57cmV0OjU4LGZkX29iajpudWxsfX1wYXRoX3JlYWRsaW5rKHQpe3JldHVybntyZXQ6NTgsZGF0YTpudWxsfX1wYXRoX3JlbW92ZV9kaXJlY3RvcnkodCl7cmV0dXJuIDU4fXBhdGhfcmVuYW1lKHQsZSxzKXtyZXR1cm4gNTh9cGF0aF9zeW1saW5rKHQsZSl7cmV0dXJuIDU4fXBhdGhfdW5saW5rX2ZpbGUodCl7cmV0dXJuIDU4fX07dmFyIE89Y2xhc3MgZXh0ZW5kcyBBe2ZkX2Zkc3RhdF9nZXQoKXtyZXR1cm57cmV0OjAsZmRzdGF0Om5ldyBXKFosMCl9fWZkX3JlYWQodCxlKXtsZXQgcz0wO2ZvcihsZXQgYSBvZiBlKWlmKHRoaXMuZmlsZV9wb3M8dGhpcy5maWxlLmRhdGEuYnl0ZUxlbmd0aCl7bGV0IG49dGhpcy5maWxlLmRhdGEuc2xpY2UoTnVtYmVyKHRoaXMuZmlsZV9wb3MpLE51bWJlcih0aGlzLmZpbGVfcG9zK0JpZ0ludChhLmJ1Zl9sZW4pKSk7dC5zZXQobixhLmJ1ZiksdGhpcy5maWxlX3Bvcys9QmlnSW50KG4ubGVuZ3RoKSxzKz1uLmxlbmd0aH1lbHNlIGJyZWFrO3JldHVybntyZXQ6MCxucmVhZDpzfX1mZF9wcmVhZCh0LGUscyl7bGV0IGE9MDtmb3IobGV0IG4gb2YgZSlpZihzPHRoaXMuZmlsZS5kYXRhLmJ5dGVMZW5ndGgpe2xldCByPXRoaXMuZmlsZS5kYXRhLnNsaWNlKE51bWJlcihzKSxOdW1iZXIocytCaWdJbnQobi5idWZfbGVuKSkpO3Quc2V0KHIsbi5idWYpLHMrPUJpZ0ludChyLmxlbmd0aCksYSs9ci5sZW5ndGh9ZWxzZSBicmVhaztyZXR1cm57cmV0OjAsbnJlYWQ6YX19ZmRfc2Vlayh0LGUpe2xldCBzO3N3aXRjaChlKXtjYXNlIGF0OnM9dDticmVhaztjYXNlIGx0OnM9dGhpcy5maWxlX3Bvcyt0O2JyZWFrO2Nhc2UgUTpzPUJpZ0ludCh0aGlzLmZpbGUuZGF0YS5ieXRlTGVuZ3RoKSt0O2JyZWFrO2RlZmF1bHQ6cmV0dXJue3JldDoyOCxvZmZzZXQ6MG59fXJldHVybiBzPDA/e3JldDoyOCxvZmZzZXQ6MG59Oih0aGlzLmZpbGVfcG9zPXMse3JldDowLG9mZnNldDp0aGlzLmZpbGVfcG9zfSl9ZmRfdGVsbCgpe3JldHVybntyZXQ6MCxvZmZzZXQ6dGhpcy5maWxlX3Bvc319ZmRfd3JpdGUodCxlKXtsZXQgcz0wO2lmKHRoaXMuZmlsZS5yZWFkb25seSlyZXR1cm57cmV0OjgsbndyaXR0ZW46c307Zm9yKGxldCBhIG9mIGUpe2xldCBuPXQuc2xpY2UoYS5idWYsYS5idWYrYS5idWZfbGVuKTtpZih0aGlzLmZpbGVfcG9zK0JpZ0ludChuLmJ5dGVMZW5ndGgpPnRoaXMuZmlsZS5zaXplKXtsZXQgcj10aGlzLmZpbGUuZGF0YTt0aGlzLmZpbGUuZGF0YT1uZXcgVWludDhBcnJheShOdW1iZXIodGhpcy5maWxlX3BvcytCaWdJbnQobi5ieXRlTGVuZ3RoKSkpLHRoaXMuZmlsZS5kYXRhLnNldChyKX10aGlzLmZpbGUuZGF0YS5zZXQobi5zbGljZSgwLE51bWJlcih0aGlzLmZpbGUuc2l6ZS10aGlzLmZpbGVfcG9zKSksTnVtYmVyKHRoaXMuZmlsZV9wb3MpKSx0aGlzLmZpbGVfcG9zKz1CaWdJbnQobi5ieXRlTGVuZ3RoKSxzKz1hLmJ1Zl9sZW59cmV0dXJue3JldDowLG53cml0dGVuOnN9fWZkX3B3cml0ZSh0LGUscyl7bGV0IGE9MDtpZih0aGlzLmZpbGUucmVhZG9ubHkpcmV0dXJue3JldDo4LG53cml0dGVuOmF9O2ZvcihsZXQgbiBvZiBlKXtsZXQgcj10LnNsaWNlKG4uYnVmLG4uYnVmK24uYnVmX2xlbik7aWYocytCaWdJbnQoci5ieXRlTGVuZ3RoKT50aGlzLmZpbGUuc2l6ZSl7bGV0IGk9dGhpcy5maWxlLmRhdGE7dGhpcy5maWxlLmRhdGE9bmV3IFVpbnQ4QXJyYXkoTnVtYmVyKHMrQmlnSW50KHIuYnl0ZUxlbmd0aCkpKSx0aGlzLmZpbGUuZGF0YS5zZXQoaSl9dGhpcy5maWxlLmRhdGEuc2V0KHIuc2xpY2UoMCxOdW1iZXIodGhpcy5maWxlLnNpemUtcykpLE51bWJlcihzKSkscys9QmlnSW50KHIuYnl0ZUxlbmd0aCksYSs9bi5idWZfbGVufXJldHVybntyZXQ6MCxud3JpdHRlbjphfX1mZF9maWxlc3RhdF9nZXQoKXtyZXR1cm57cmV0OjAsZmlsZXN0YXQ6dGhpcy5maWxlLnN0YXQoKX19Y29uc3RydWN0b3IodCl7c3VwZXIoKSx0aGlzLmZpbGVfcG9zPTBuLHRoaXMuZmlsZT10fX07dmFyIEk9Y2xhc3N7b3Blbih0KXtsZXQgZT1uZXcgTyh0aGlzKTtyZXR1cm4gdCZmdCYmZS5mZF9zZWVrKDBuLFEpLGV9Z2V0IHNpemUoKXtyZXR1cm4gQmlnSW50KHRoaXMuZGF0YS5ieXRlTGVuZ3RoKX1zdGF0KCl7cmV0dXJuIG5ldyB2KFosdGhpcy5zaXplKX10cnVuY2F0ZSgpe3JldHVybiB0aGlzLnJlYWRvbmx5PzYzOih0aGlzLmRhdGE9bmV3IFVpbnQ4QXJyYXkoW10pLDApfWNvbnN0cnVjdG9yKHQsZSl7dGhpcy5kYXRhPW5ldyBVaW50OEFycmF5KHQpLHRoaXMucmVhZG9ubHk9ISFlPy5yZWFkb25seX19O3ZhciBGPWNsYXNzIGV4dGVuZHMgQXsjZTtjb25zdHJ1Y3Rvcih0KXtzdXBlcigpLHRoaXMuI2U9dH1mZF93cml0ZSh0LGUpe2xldCBzPTAsYT1uZXcgVGV4dERlY29kZXIsbj1lLnJlZHVjZSgocixpLG8sbCk9PntzKz1pLmJ1Zl9sZW47bGV0IGY9dC5zbGljZShpLmJ1ZixpLmJ1ZitpLmJ1Zl9sZW4pO3JldHVybiByK2EuZGVjb2RlKGYse3N0cmVhbTpvIT09bC5sZW5ndGgtMX0pfSwiIik7cmV0dXJuIGNvbnNvbGVbdGhpcy4jZV0obikse3JldDowLG53cml0dGVuOnN9fX07YXN5bmMgZnVuY3Rpb24gZHQoYyx0KXtsZXQgZT1bXSxzPVtdLGE9dD9bbmV3IEYoImxvZyIpLG5ldyBGKCJsb2ciKSxuZXcgRigiZXJyb3IiKV06W25ldyBPKG5ldyBJKFtdKSksbmV3IE8obmV3IEkoW10pKSxuZXcgTyhuZXcgSShbXSkpXSxuPW5ldyBKKGUscyxhKTtyZXR1cm57YXN5bmMgaW1wb3J0T2JqZWN0KCl7cmV0dXJuIG4ud2FzaUltcG9ydH0sYXN5bmMgY2xvc2UoKXt9LGFzeW5jIGluaXRpYWxpemUocil7bGV0IGk9ci5leHBvcnRzLm1lbW9yeTtpZighaSl0aHJvdyBuZXcgRXJyb3IoIlRoZSBtb2R1bGUgaGFzIHRvIGV4cG9ydCBhIGRlZmF1bHQgbWVtb3J5LiIpO2lmKHIuZXhwb3J0cy5faW5pdGlhbGl6ZSl7bGV0IG89ci5leHBvcnRzLl9pbml0aWFsaXplO24uaW5pdGlhbGl6ZT9uLmluaXRpYWxpemUoe2V4cG9ydHM6e21lbW9yeTppLF9pbml0aWFsaXplOigpPT57bygpfX19KTpvKCl9ZWxzZSBuLnN0YXJ0KHtleHBvcnRzOnttZW1vcnk6aSxfc3RhcnQ6KCk9Pnt9fX0pfX19dmFyIEF0PSJleHRpc206aG9zdC9lbnYiLHR0PWNsYXNzeyNlOyN0OyNuOyNzPSExOyNpO2NvbnN0cnVjdG9yKHQsZSxzLGEpe3RoaXMuI2U9dCx0aGlzLiNuPWUsdGhpcy4jdD1zLHRoaXMuI2k9YX1hc3luYyByZXNldCgpe3JldHVybiB0aGlzLmlzQWN0aXZlKCk/ITE6KHRoaXMuI2VbJF0oKSwhMCl9aXNBY3RpdmUoKXtyZXR1cm4gdGhpcy4jc31hc3luYyBmdW5jdGlvbkV4aXN0cyh0KXt0cnl7bGV0IGU9W10uY29uY2F0KHQpLFtzLGFdPWUubGVuZ3RoPT09Mj9bdGhpcy5sb29rdXBUYXJnZXQoZVswXSksZVsxXV06W3RoaXMuI3QuZmluZChyPT5XZWJBc3NlbWJseS5Nb2R1bGUuZXhwb3J0cyhyLm1vZHVsZSkuZmluZChvPT5vLm5hbWU9PT1lWzBdJiZvLmtpbmQ9PT0iZnVuY3Rpb24iKSksZVswXV07cmV0dXJuISghc3x8IXMuaW5zdGFuY2UuZXhwb3J0c1thXSl9Y2F0Y2h7cmV0dXJuITF9fWFzeW5jIGNhbGxCbG9jayh0LGUpe3RoaXMuI3M9ITA7bGV0IHM9W10uY29uY2F0KHQpLFthLG5dPXMubGVuZ3RoPT09Mj9bdGhpcy5sb29rdXBUYXJnZXQoc1swXSksc1sxXV06W3RoaXMuI3QuZmluZChpPT5XZWJBc3NlbWJseS5Nb2R1bGUuZXhwb3J0cyhpLm1vZHVsZSkuZmluZChsPT5sLm5hbWU9PT1zWzBdJiZsLmtpbmQ9PT0iZnVuY3Rpb24iKSksc1swXV07aWYoIWEpdGhyb3cgRXJyb3IoYFBsdWdpbiBlcnJvcjogdGFyZ2V0ICIke3Muam9pbignIiAiJyl9IiBkb2VzIG5vdCBleGlzdGApO2xldCByPWEuaW5zdGFuY2UuZXhwb3J0c1tuXTtpZighcil0aHJvdyBFcnJvcihgUGx1Z2luIGVycm9yOiBmdW5jdGlvbiAiJHtzLmpvaW4oJyIgIicpfSIgZG9lcyBub3QgZXhpc3RgKTt0aGlzLiNlW0tdKGU/P251bGwpO3RyeXtyZXR1cm4gcigpLHRoaXMuI2VbQl0oKX1jYXRjaChpKXt0aHJvdyB0aGlzLiNlW0JdKCksaX1maW5hbGx5e3RoaXMuI3M9ITF9fWFzeW5jIGNhbGwodCxlKXtsZXQgcz10aGlzLiNlW1BdKGUpLFthLG5dPWF3YWl0IHRoaXMuY2FsbEJsb2NrKHQscykscj1hIT09bnVsbCxpPWE/P247aWYoaT09PW51bGwpcmV0dXJuIG51bGw7bGV0IG89dGhpcy4jZVtYXShpKTtpZighbylyZXR1cm4gbnVsbDtsZXQgbD1uZXcgeShvLmJ1ZmZlcik7aWYocil0aHJvdyBuZXcgRXJyb3IoYFBsdWdpbi1vcmlnaW5hdGVkIGVycm9yOiAke2wuc3RyaW5nKCl9YCk7cmV0dXJuIGx9bG9va3VwVGFyZ2V0KHQpe2xldCBlPVN0cmluZyh0Pz8iMCIpLHM9dGhpcy4jbi5maW5kSW5kZXgoYT0+YT09PWUpO2lmKHM9PT0tMSl0aHJvdyBuZXcgRXJyb3IoYG5vIG1vZHVsZSBuYW1lZCAiJHt0fSJgKTtyZXR1cm4gdGhpcy4jdFtzXX1hc3luYyBnZXRFeHBvcnRzKHQpe3JldHVybiBXZWJBc3NlbWJseS5Nb2R1bGUuZXhwb3J0cyh0aGlzLmxvb2t1cFRhcmdldCh0KS5tb2R1bGUpfHxbXX1hc3luYyBnZXRJbXBvcnRzKHQpe3JldHVybiBXZWJBc3NlbWJseS5Nb2R1bGUuaW1wb3J0cyh0aGlzLmxvb2t1cFRhcmdldCh0KS5tb2R1bGUpfHxbXX1hc3luYyBnZXRJbnN0YW5jZSh0KXtyZXR1cm4gdGhpcy5sb29rdXBUYXJnZXQodCkuaW5zdGFuY2V9YXN5bmMgY2xvc2UoKXt0aGlzLiNpJiYoYXdhaXQgdGhpcy4jaS5jbG9zZSgpLHRoaXMuI2k9bnVsbCl9fTthc3luYyBmdW5jdGlvbiBodChjLHQsZSxzPW5ldyBTKEFycmF5QnVmZmVyLGMubG9nZ2VyLGMuY29uZmlnKSl7bGV0IGE9Yy53YXNpRW5hYmxlZD9hd2FpdCBkdChjLmFsbG93ZWRQYXRocyxjLmVuYWJsZVdhc2lPdXRwdXQpOm51bGwsbj17Li4uYT97d2FzaV9zbmFwc2hvdF9wcmV2aWV3MTphd2FpdCBhLmltcG9ydE9iamVjdCgpfTp7fSxbQXRdOnNbal0sZW52Ont9fTtmb3IobGV0IGkgaW4gYy5mdW5jdGlvbnMpe25baV09bltpXXx8e307Zm9yKGxldCBvIGluIGMuZnVuY3Rpb25zW2ldKW5baV1bb109Yy5mdW5jdGlvbnNbaV1bb10uYmluZChudWxsLHMpfWxldCByPWF3YWl0IFByb21pc2UuYWxsKGUubWFwKGFzeW5jIGk9PntsZXQgbz1hd2FpdCBXZWJBc3NlbWJseS5pbnN0YW50aWF0ZShpLG4pO2EmJmF3YWl0IGE/LmluaXRpYWxpemUobyk7bGV0IGw9by5leHBvcnRzLmhzX2luaXQ/Imhhc2tlbGwiOm8uZXhwb3J0cy5faW5pdGlhbGl6ZT8icmVhY3RvciI6by5leHBvcnRzLl9zdGFydD8iY29tbWFuZCI6Im5vbmUiO3JldHVybihvLmV4cG9ydHMuaHNfaW5pdD9vLmV4cG9ydHMuaHNfaW5pdDooKT0+e30pKCkse21vZHVsZTppLGluc3RhbmNlOm8sZ3Vlc3RUeXBlOmx9fSkpO3JldHVybiBuZXcgdHQocyx0LHIsYSl9dmFyIGV0PWNsYXNze2NvbnN0cnVjdG9yKHQpe2lmKCF0KXRocm93IG5ldyBFcnJvcigiVGhpcyBzaG91bGQgYmUgdW5yZWFjaGFibGU6IHRoaXMgbW9kdWxlIHNob3VsZCBvbmx5IGJlIGludm9rZWQgYXMgYSB3ZWIgd29ya2VyLiIpO3RoaXMuc2hhcmVkRGF0YT1udWxsLHRoaXMuc2hhcmVkRGF0YVZpZXc9bnVsbCx0aGlzLmhvc3RGbGFnPW51bGwsdGhpcy5wb3J0PXQsdGhpcy5wb3J0Lm9uKCJtZXNzYWdlIixlPT50aGlzLmhhbmRsZU1lc3NhZ2UoZSkpLHRoaXMucG9ydC5wb3N0TWVzc2FnZSh7dHlwZToiaW5pdGlhbGl6ZWQifSksdGhpcy5keW5hbWljSGFuZGxlcnM9bmV3IE1hcCx0aGlzLmR5bmFtaWNIYW5kbGVycy5zZXQoImNhbGwiLGFzeW5jKGUscyxhLG4pPT57aWYoIXRoaXMuY29udGV4dCl0aHJvdyBuZXcgRXJyb3IoImludmFsaWQgc3RhdGU6IG5vIGNvbnRleHQgYXZhaWxhYmxlIHRvIHdvcmtlciByZWFjdG9yIik7dGhpcy5jb250ZXh0W0ddKG4pO2xldCByPWF3YWl0IHRoaXMucGx1Z2luPy5jYWxsQmxvY2socyxhKS50aGVuKGk9PltudWxsLGldLGk9PltpLG51bGxdKTtuPXRoaXMuY29udGV4dFtNXSgpO2ZvcihsZXRbaV1vZiBuLmJsb2NrcylpJiZlLnB1c2goaSk7cmV0dXJuIHJbMF0mJihyWzBdPXtvcmlnaW5hbFN0YWNrOnJbMF0/LnN0YWNrLG1lc3NhZ2U6clswXT8ubWVzc2FnZX0pLHtyZXN1bHRzOnIsc3RhdGU6bn19KSx0aGlzLmR5bmFtaWNIYW5kbGVycy5zZXQoInJlc2V0Iixhc3luYyBlPT50aGlzLnBsdWdpbj8ucmVzZXQoKSksdGhpcy5keW5hbWljSGFuZGxlcnMuc2V0KCJnZXRFeHBvcnRzIixhc3luYyhlLHMpPT50aGlzLnBsdWdpbj8uZ2V0RXhwb3J0cyhzKSksdGhpcy5keW5hbWljSGFuZGxlcnMuc2V0KCJnZXRJbXBvcnRzIixhc3luYyhlLHMpPT50aGlzLnBsdWdpbj8uZ2V0SW1wb3J0cyhzKSksdGhpcy5keW5hbWljSGFuZGxlcnMuc2V0KCJmdW5jdGlvbkV4aXN0cyIsYXN5bmMoZSxzKT0+dGhpcy5wbHVnaW4/LmZ1bmN0aW9uRXhpc3RzKHMpKX1hc3luYyBoYW5kbGVNZXNzYWdlKHQpe3N3aXRjaCh0LnR5cGUpe2Nhc2UiaW5pdCI6cmV0dXJuIGF3YWl0IHRoaXMuaGFuZGxlSW5pdCh0KTtjYXNlImludm9rZSI6cmV0dXJuIGF3YWl0IHRoaXMuaGFuZGxlSW52b2tlKHQpfX1hc3luYyBoYW5kbGVJbnZva2UodCl7bGV0IGU9dGhpcy5keW5hbWljSGFuZGxlcnMuZ2V0KHQuaGFuZGxlcik7aWYoIWUpcmV0dXJuIHRoaXMucG9ydC5wb3N0TWVzc2FnZSh7dHlwZToicmV0dXJuIixyZXN1bHQ6W2BubyBoYW5kbGVyIHJlZ2lzdGVyZWQgZm9yICR7dC5oYW5kbGVyfWAsbnVsbF19KTtsZXQgcz1bXSxhPWF3YWl0IGUocywuLi50LmFyZ3N8fFtdKS50aGVuKG49PltudWxsLG5dLG49PltuLG51bGxdKTtyZXR1cm4gYVswXSYmKGFbMF09e29yaWdpbmFsU3RhY2s6YVswXT8uc3RhY2ssbWVzc2FnZTphWzBdPy5tZXNzYWdlfSksdGhpcy5wb3J0LnBvc3RNZXNzYWdlKHt0eXBlOiJyZXR1cm4iLHJlc3VsdHM6YX0scyl9YXN5bmMgaGFuZGxlSW5pdCh0KXt0aGlzLnNoYXJlZERhdGE9dC5zaGFyZWREYXRhLHRoaXMuc2hhcmVkRGF0YVZpZXc9bmV3IERhdGFWaWV3KHQuc2hhcmVkRGF0YSksdGhpcy5ob3N0RmxhZz1uZXcgSW50MzJBcnJheSh0aGlzLnNoYXJlZERhdGEpO2xldCBlPU9iamVjdC5mcm9tRW50cmllcyhPYmplY3QuZW50cmllcyh0LmZ1bmN0aW9ucykubWFwKChbbCxmXSk9PltsLE9iamVjdC5mcm9tRW50cmllcyhmLm1hcCh1PT5bdSwoXywuLi5kKT0+dGhpcy5jYWxsSG9zdChfLGwsdSxkKV0pKV0pKSx7dHlwZTpzLG1vZHVsZXM6YSxmdW5jdGlvbnM6biwuLi5yfT10LGk9bD0+Zj0+dGhpcy5wb3J0LnBvc3RNZXNzYWdlKHt0eXBlOiJsb2ciLGxldmVsOmwsbWVzc2FnZTpmfSksbz1PYmplY3QuZnJvbUVudHJpZXMoWyJpbmZvIiwiZGVidWciLCJ3YXJuIiwiZXJyb3IiXS5tYXAobD0+W2wsaShsKV0pKTt0aGlzLmNvbnRleHQ9bmV3IFMoQXJyYXlCdWZmZXIsbyx0LmNvbmZpZyksdGhpcy5wbHVnaW49YXdhaXQgaHQoey4uLnIsZnVuY3Rpb25zOmUsZmV0Y2gsbG9nZ2VyOm99LHQubmFtZXMsYSx0aGlzLmNvbnRleHQpLHRoaXMucG9ydC5wb3N0TWVzc2FnZSh7dHlwZToicmVhZHkifSl9Y2FsbEhvc3QodCxlLHMsYSl7aWYoIXRoaXMuaG9zdEZsYWcpdGhyb3cgbmV3IEVycm9yKCJhdHRlbXB0ZWQgdG8gY2FsbCBob3N0IGJlZm9yZSByZWNlaXZpbmcgc2hhcmVkIGFycmF5IGJ1ZmZlciIpO0F0b21pY3Muc3RvcmUodGhpcy5ob3N0RmxhZywwLG0pO2xldCBuPXRbTV0oKTt0aGlzLnBvcnQucG9zdE1lc3NhZ2Uoe3R5cGU6Imludm9rZSIsbmFtZXNwYWNlOmUsZnVuYzpzLGFyZ3M6YSxzdGF0ZTpufSk7bGV0IHI9bmV3IFkodGhpcy5zaGFyZWREYXRhKSxpPVtdLG87ZG97bGV0IGw9ci5yZWFkVWludDgoKTtzd2l0Y2gobCl7Y2FzZSAyNTU6cmV0dXJuIG4uYmxvY2tzPWksdFtHXShuKSxyLmNsb3NlKCksbztjYXNlIDE6bz1yLnJlYWRVaW50NjQoKTticmVhaztjYXNlIDI6bz1yLnJlYWRGbG9hdDY0KCk7YnJlYWs7Y2FzZSAzOm89dm9pZCAwO2JyZWFrO2Nhc2UgNDp7bGV0IGY9ci5yZWFkVWludDMyKCksdT1yLnJlYWRVaW50MzIoKTtpZighdSlpLnB1c2goW251bGwsZl0pO2Vsc2V7bGV0IF89bmV3IFVpbnQ4QXJyYXkodSk7ci5yZWFkKF8pLGkucHVzaChbXy5idWZmZXIsZl0pfX1icmVhaztkZWZhdWx0OnRocm93IG5ldyBFcnJvcihgaW52YWxpZCBzZWN0aW9uIHR5cGU9IiR7bH0iIGF0IHBvc2l0aW9uICR7ci5wb3NpdGlvbn07IHBsZWFzZSBvcGVuIGFuIGlzc3VlIChodHRwczovL2dpdGh1Yi5jb20vZXh0aXNtL2pzLXNkay9pc3N1ZXMvbmV3P3RpdGxlPXNoYXJlZCthcnJheStidWZmZXIrYmFkK3NlY3Rpb24rdHlwZSske2x9JmxhYmVscz1idWcpYCl9fXdoaWxlKDEpfX07bmV3IGV0KGl0KTt2YXIgSXQ9NTAwLEQsWT1jbGFzc3tjb25zdHJ1Y3Rvcih0KXtMKHRoaXMsRCx2b2lkIDApO3RoaXMuaW5wdXQ9dCx0aGlzLmlucHV0T2Zmc2V0PW0sdGhpcy5mbGFnPW5ldyBJbnQzMkFycmF5KHRoaXMuaW5wdXQpLHRoaXMuc2NyYXRjaD1uZXcgQXJyYXlCdWZmZXIoOCksdGhpcy5zY3JhdGNoVmlldz1uZXcgRGF0YVZpZXcodGhpcy5zY3JhdGNoKSx0aGlzLnBvc2l0aW9uPTAsQyh0aGlzLEQsMCksdGhpcy53YWl0KCl9Y2xvc2UoKXt0aGlzLnNpZ25hbCgpLEF0b21pY3Muc3RvcmUodGhpcy5mbGFnLDAsbSl9d2FpdCgpe2xldCB0PW07ZG8gdD1BdG9taWNzLmxvYWQodGhpcy5mbGFnLDApLHQ9PT1tJiZBdG9taWNzLndhaXQodGhpcy5mbGFnLDAsbSxJdCk7d2hpbGUodDw9bSk7Qyh0aGlzLEQsQXRvbWljcy5sb2FkKHRoaXMuZmxhZywwKSksdGhpcy5pbnB1dE9mZnNldD1tfWdldCBhdmFpbGFibGUoKXtyZXR1cm4gVCh0aGlzLEQpLXRoaXMuaW5wdXRPZmZzZXR9c2lnbmFsKCl7QXRvbWljcy5zdG9yZSh0aGlzLmZsYWcsMCxtKSxBdG9taWNzLm5vdGlmeSh0aGlzLmZsYWcsMCwxKX1wdWxsKCl7dGhpcy5zaWduYWwoKSx0aGlzLndhaXQoKX1yZWFkKHQpe2lmKHRoaXMucG9zaXRpb24rPXQuYnl0ZUxlbmd0aCx0LmJ5dGVMZW5ndGg8dGhpcy5hdmFpbGFibGUpe3Quc2V0KG5ldyBVaW50OEFycmF5KHRoaXMuaW5wdXQpLnN1YmFycmF5KHRoaXMuaW5wdXRPZmZzZXQsdGhpcy5pbnB1dE9mZnNldCt0LmJ5dGVMZW5ndGgpKSx0aGlzLmlucHV0T2Zmc2V0Kz10LmJ5dGVMZW5ndGg7cmV0dXJufWxldCBlPTAscz10aGlzLmF2YWlsYWJsZTtkb3tpZih0LnNldChuZXcgVWludDhBcnJheSh0aGlzLmlucHV0KS5zdWJhcnJheSh0aGlzLmlucHV0T2Zmc2V0LHRoaXMuaW5wdXRPZmZzZXQrcyksZSksZSs9cyx0aGlzLmlucHV0T2Zmc2V0Kz1zLGU9PT10LmJ5dGVMZW5ndGh8fHRoaXMuYXZhaWxhYmxlPDApYnJlYWs7dGhpcy5wdWxsKCkscz1NYXRoLm1pbihNYXRoLm1heCh0aGlzLmF2YWlsYWJsZSwwKSx0LmJ5dGVMZW5ndGgtZSl9d2hpbGUoZSE9PXQuYnl0ZUxlbmd0aCl9cmVhZFVpbnQ4KCl7cmV0dXJuIHRoaXMucmVhZChuZXcgVWludDhBcnJheSh0aGlzLnNjcmF0Y2gpLnN1YmFycmF5KDAsMSkpLHRoaXMuc2NyYXRjaFZpZXcuZ2V0VWludDgoMCl9cmVhZFVpbnQzMigpe3JldHVybiB0aGlzLnJlYWQobmV3IFVpbnQ4QXJyYXkodGhpcy5zY3JhdGNoKS5zdWJhcnJheSgwLDQpKSx0aGlzLnNjcmF0Y2hWaWV3LmdldFVpbnQzMigwLCEwKX1yZWFkVWludDY0KCl7cmV0dXJuIHRoaXMucmVhZChuZXcgVWludDhBcnJheSh0aGlzLnNjcmF0Y2gpKSx0aGlzLnNjcmF0Y2hWaWV3LmdldEJpZ1VpbnQ2NCgwLCEwKX1yZWFkRmxvYXQ2NCgpe3JldHVybiB0aGlzLnJlYWQobmV3IFVpbnQ4QXJyYXkodGhpcy5zY3JhdGNoKSksdGhpcy5zY3JhdGNoVmlldy5nZXRGbG9hdDY0KDAsITApfX07RD1uZXcgV2Vha01hcCxZLlNBQl9JRFg9MDsKLy8jIHNvdXJjZU1hcHBpbmdVUkw9d29ya2VyLmpzLm1hcAo=");
var ue = /* @__PURE__ */ new WeakMap();
var dt = class extends (globalThis.Worker || Object) {
  constructor(t) {
    super(t, { type: "module", credentials: "omit", name: "extism-worker", crossOriginIsolated: true });
  }
  on(t, e) {
    let s = (i) => e(i.data);
    ue.set(e, s), this.addEventListener(t, s);
  }
  removeListener(t, e) {
    let s = ue.get(e);
    s && this.removeEventListener(t, s);
  }
  once(t, e) {
    let s = this;
    this.addEventListener(t, function i(...n) {
      s.removeEventListener(t, i), e.call(s, ...n);
    });
  }
};
var Ce = ve(xe(), 1);
var mt = (o) => {
  if (typeof o != "string") throw new TypeError("invalid pattern");
  if (o.length > 65536) throw new TypeError("pattern is too long");
};
var hs = { "[:alnum:]": ["\\p{L}\\p{Nl}\\p{Nd}", true], "[:alpha:]": ["\\p{L}\\p{Nl}", true], "[:ascii:]": ["\\x00-\\x7f", false], "[:blank:]": ["\\p{Zs}\\t", true], "[:cntrl:]": ["\\p{Cc}", true], "[:digit:]": ["\\p{Nd}", true], "[:graph:]": ["\\p{Z}\\p{C}", true, true], "[:lower:]": ["\\p{Ll}", true], "[:print:]": ["\\p{C}", true], "[:punct:]": ["\\p{P}", true], "[:space:]": ["\\p{Z}\\t\\r\\n\\v\\f", true], "[:upper:]": ["\\p{Lu}", true], "[:word:]": ["\\p{L}\\p{Nl}\\p{Nd}\\p{Pc}", true], "[:xdigit:]": ["A-Fa-f0-9", false] };
var ft = (o) => o.replace(/[[\]\\-]/g, "\\$&");
var ms = (o) => o.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
var We = (o) => o.join("");
var Ve = (o, t) => {
  let e = t;
  if (o.charAt(e) !== "[") throw new Error("not in a brace expression");
  let s = [], i = [], n = e + 1, r = false, a = false, l = false, c = false, u = e, f = "";
  t: for (; n < o.length; ) {
    let m = o.charAt(n);
    if ((m === "!" || m === "^") && n === e + 1) {
      c = true, n++;
      continue;
    }
    if (m === "]" && r && !l) {
      u = n + 1;
      break;
    }
    if (r = true, m === "\\" && !l) {
      l = true, n++;
      continue;
    }
    if (m === "[" && !l) {
      for (let [Z, [X, N, T]] of Object.entries(hs)) if (o.startsWith(Z, n)) {
        if (f) return ["$.", false, o.length - e, true];
        n += Z.length, T ? i.push(X) : s.push(X), a = a || N;
        continue t;
      }
    }
    if (l = false, f) {
      m > f ? s.push(ft(f) + "-" + ft(m)) : m === f && s.push(ft(m)), f = "", n++;
      continue;
    }
    if (o.startsWith("-]", n + 1)) {
      s.push(ft(m + "-")), n += 2;
      continue;
    }
    if (o.startsWith("-", n + 1)) {
      f = m, n += 2;
      continue;
    }
    s.push(ft(m)), n++;
  }
  if (u < n) return ["", false, 0, false];
  if (!s.length && !i.length) return ["$.", false, o.length - e, true];
  if (i.length === 0 && s.length === 1 && /^\\?.$/.test(s[0]) && !c) {
    let m = s[0].length === 2 ? s[0].slice(-1) : s[0];
    return [ms(m), false, u - e, false];
  }
  let d = "[" + (c ? "^" : "") + We(s) + "]", p = "[" + (c ? "" : "^") + We(i) + "]";
  return [s.length && i.length ? "(" + d + "|" + p + ")" : s.length ? d : p, a, u - e, true];
};
var U = (o, { windowsPathsNoEscape: t = false } = {}) => t ? o.replace(/\[([^\/\\])\]/g, "$1") : o.replace(/((?!\\).|^)\[([^\/\\])\]/g, "$1$2").replace(/\\([^\/])/g, "$1");
var fs = /* @__PURE__ */ new Set(["!", "?", "+", "*", "@"]);
var we = (o) => fs.has(o);
var ps = "(?!(?:^|/)\\.\\.?(?:$|/))";
var Vt = "(?!\\.)";
var bs = /* @__PURE__ */ new Set(["[", "."]);
var Zs = /* @__PURE__ */ new Set(["..", "."]);
var ys = new Set("().*{}+?[]^$\\!");
var Gs = (o) => o.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
var At = "[^/]";
var Ie = At + "*?";
var Le = At + "+?";
var w;
var I;
var O;
var g;
var W;
var v;
var et;
var D;
var H;
var st;
var pt;
var It;
var Ne;
var it;
var wt;
var bt;
var Bt;
var Lt;
var Se;
var S = class {
  constructor(t, e, s = {}) {
    V(this, It);
    V(this, bt);
    $t(this, "type");
    V(this, w, void 0);
    V(this, I, void 0);
    V(this, O, false);
    V(this, g, []);
    V(this, W, void 0);
    V(this, v, void 0);
    V(this, et, void 0);
    V(this, D, false);
    V(this, H, void 0);
    V(this, st, void 0);
    V(this, pt, false);
    this.type = t, t && x(this, I, true), x(this, W, e), x(this, w, h(this, W) ? h(h(this, W), w) : this), x(this, H, h(this, w) === this ? s : h(h(this, w), H)), x(this, et, h(this, w) === this ? [] : h(h(this, w), et)), t === "!" && !h(h(this, w), D) && h(this, et).push(this), x(this, v, h(this, W) ? h(h(this, W), g).length : 0);
  }
  get hasMagic() {
    if (h(this, I) !== void 0) return h(this, I);
    for (let t of h(this, g)) if (typeof t != "string" && (t.type || t.hasMagic)) return x(this, I, true);
    return h(this, I);
  }
  toString() {
    return h(this, st) !== void 0 ? h(this, st) : this.type ? x(this, st, this.type + "(" + h(this, g).map((t) => String(t)).join("|") + ")") : x(this, st, h(this, g).map((t) => String(t)).join(""));
  }
  push(...t) {
    for (let e of t) if (e !== "") {
      if (typeof e != "string" && !(e instanceof S && h(e, W) === this)) throw new Error("invalid part: " + e);
      h(this, g).push(e);
    }
  }
  toJSON() {
    let t = this.type === null ? h(this, g).slice().map((e) => typeof e == "string" ? e : e.toJSON()) : [this.type, ...h(this, g).map((e) => e.toJSON())];
    return this.isStart() && !this.type && t.unshift([]), this.isEnd() && (this === h(this, w) || h(h(this, w), D) && h(this, W)?.type === "!") && t.push({}), t;
  }
  isStart() {
    if (h(this, w) === this) return true;
    if (!h(this, W)?.isStart()) return false;
    if (h(this, v) === 0) return true;
    let t = h(this, W);
    for (let e = 0; e < h(this, v); e++) {
      let s = h(t, g)[e];
      if (!(s instanceof S && s.type === "!")) return false;
    }
    return true;
  }
  isEnd() {
    if (h(this, w) === this || h(this, W)?.type === "!") return true;
    if (!h(this, W)?.isEnd()) return false;
    if (!this.type) return h(this, W)?.isEnd();
    let t = h(this, W) ? h(h(this, W), g).length : 0;
    return h(this, v) === t - 1;
  }
  copyIn(t) {
    typeof t == "string" ? this.push(t) : this.push(t.clone(this));
  }
  clone(t) {
    let e = new S(this.type, t);
    for (let s of h(this, g)) e.copyIn(s);
    return e;
  }
  static fromGlob(t, e = {}) {
    var i;
    let s = new S(null, void 0, e);
    return z(i = S, it, wt).call(i, t, s, 0, e), s;
  }
  toMMPattern() {
    if (this !== h(this, w)) return h(this, w).toMMPattern();
    let t = this.toString(), [e, s, i, n] = this.toRegExpSource();
    if (!(i || h(this, I) || h(this, H).nocase && !h(this, H).nocaseMagicOnly && t.toUpperCase() !== t.toLowerCase())) return s;
    let a = (h(this, H).nocase ? "i" : "") + (n ? "u" : "");
    return Object.assign(new RegExp(`^${e}$`, a), { _src: e, _glob: t });
  }
  toRegExpSource(t) {
    let e = t ?? !!h(this, H).dot;
    if (h(this, w) === this && z(this, It, Ne).call(this), !this.type) {
      let l = this.isStart() && this.isEnd(), c = h(this, g).map((p) => {
        var N;
        let [b, m, Z, X] = typeof p == "string" ? z(N = S, Lt, Se).call(N, p, h(this, I), l) : p.toRegExpSource(t);
        return x(this, I, h(this, I) || Z), x(this, O, h(this, O) || X), b;
      }).join(""), u = "";
      if (this.isStart() && typeof h(this, g)[0] == "string" && !(h(this, g).length === 1 && Zs.has(h(this, g)[0]))) {
        let b = bs, m = e && b.has(c.charAt(0)) || c.startsWith("\\.") && b.has(c.charAt(2)) || c.startsWith("\\.\\.") && b.has(c.charAt(4)), Z = !e && !t && b.has(c.charAt(0));
        u = m ? ps : Z ? Vt : "";
      }
      let f = "";
      return this.isEnd() && h(h(this, w), D) && h(this, W)?.type === "!" && (f = "(?:$|\\/)"), [u + c + f, U(c), x(this, I, !!h(this, I)), h(this, O)];
    }
    let s = this.type === "*" || this.type === "+", i = this.type === "!" ? "(?:(?!(?:" : "(?:", n = z(this, bt, Bt).call(this, e);
    if (this.isStart() && this.isEnd() && !n && this.type !== "!") {
      let l = this.toString();
      return x(this, g, [l]), this.type = null, x(this, I, void 0), [l, U(this.toString()), false, false];
    }
    let r = !s || t || e || !Vt ? "" : z(this, bt, Bt).call(this, true);
    r === n && (r = ""), r && (n = `(?:${n})(?:${r})*?`);
    let a = "";
    if (this.type === "!" && h(this, pt)) a = (this.isStart() && !e ? Vt : "") + Le;
    else {
      let l = this.type === "!" ? "))" + (this.isStart() && !e && !t ? Vt : "") + Ie + ")" : this.type === "@" ? ")" : this.type === "?" ? ")?" : this.type === "+" && r ? ")" : this.type === "*" && r ? ")?" : `)${this.type}`;
      a = i + n + l;
    }
    return [a, U(n), x(this, I, !!h(this, I)), h(this, O)];
  }
};
var Q = S;
w = /* @__PURE__ */ new WeakMap(), I = /* @__PURE__ */ new WeakMap(), O = /* @__PURE__ */ new WeakMap(), g = /* @__PURE__ */ new WeakMap(), W = /* @__PURE__ */ new WeakMap(), v = /* @__PURE__ */ new WeakMap(), et = /* @__PURE__ */ new WeakMap(), D = /* @__PURE__ */ new WeakMap(), H = /* @__PURE__ */ new WeakMap(), st = /* @__PURE__ */ new WeakMap(), pt = /* @__PURE__ */ new WeakMap(), It = /* @__PURE__ */ new WeakSet(), Ne = function() {
  if (this !== h(this, w)) throw new Error("should only call on root");
  if (h(this, D)) return this;
  this.toString(), x(this, D, true);
  let t;
  for (; t = h(this, et).pop(); ) {
    if (t.type !== "!") continue;
    let e = t, s = h(e, W);
    for (; s; ) {
      for (let i = h(e, v) + 1; !s.type && i < h(s, g).length; i++) for (let n of h(t, g)) {
        if (typeof n == "string") throw new Error("string part in extglob AST??");
        n.copyIn(h(s, g)[i]);
      }
      e = s, s = h(e, W);
    }
  }
  return this;
}, it = /* @__PURE__ */ new WeakSet(), wt = function(t, e, s, i) {
  var p, b;
  let n = false, r = false, a = -1, l = false;
  if (e.type === null) {
    let m = s, Z = "";
    for (; m < t.length; ) {
      let X = t.charAt(m++);
      if (n || X === "\\") {
        n = !n, Z += X;
        continue;
      }
      if (r) {
        m === a + 1 ? (X === "^" || X === "!") && (l = true) : X === "]" && !(m === a + 2 && l) && (r = false), Z += X;
        continue;
      } else if (X === "[") {
        r = true, a = m, l = false, Z += X;
        continue;
      }
      if (!i.noext && we(X) && t.charAt(m) === "(") {
        e.push(Z), Z = "";
        let N = new S(X, e);
        m = z(p = S, it, wt).call(p, t, N, m, i), e.push(N);
        continue;
      }
      Z += X;
    }
    return e.push(Z), m;
  }
  let c = s + 1, u = new S(null, e), f = [], d = "";
  for (; c < t.length; ) {
    let m = t.charAt(c++);
    if (n || m === "\\") {
      n = !n, d += m;
      continue;
    }
    if (r) {
      c === a + 1 ? (m === "^" || m === "!") && (l = true) : m === "]" && !(c === a + 2 && l) && (r = false), d += m;
      continue;
    } else if (m === "[") {
      r = true, a = c, l = false, d += m;
      continue;
    }
    if (we(m) && t.charAt(c) === "(") {
      u.push(d), d = "";
      let Z = new S(m, u);
      u.push(Z), c = z(b = S, it, wt).call(b, t, Z, c, i);
      continue;
    }
    if (m === "|") {
      u.push(d), d = "", f.push(u), u = new S(null, e);
      continue;
    }
    if (m === ")") return d === "" && h(e, g).length === 0 && x(e, pt, true), u.push(d), d = "", e.push(...f, u), c;
    d += m;
  }
  return e.type = null, x(e, I, void 0), x(e, g, [t.substring(s - 1)]), c;
}, bt = /* @__PURE__ */ new WeakSet(), Bt = function(t) {
  return h(this, g).map((e) => {
    if (typeof e == "string") throw new Error("string type in extglob ast??");
    let [s, i, n, r] = e.toRegExpSource(t);
    return x(this, O, h(this, O) || r), s;
  }).filter((e) => !(this.isStart() && this.isEnd()) || !!e).join("|");
}, Lt = /* @__PURE__ */ new WeakSet(), Se = function(t, e, s = false) {
  let i = false, n = "", r = false;
  for (let a = 0; a < t.length; a++) {
    let l = t.charAt(a);
    if (i) {
      i = false, n += (ys.has(l) ? "\\" : "") + l;
      continue;
    }
    if (l === "\\") {
      a === t.length - 1 ? n += "\\\\" : i = true;
      continue;
    }
    if (l === "[") {
      let [c, u, f, d] = Ve(t, a);
      if (f) {
        n += c, r = r || u, a += f - 1, e = e || d;
        continue;
      }
    }
    if (l === "*") {
      s && t === "*" ? n += Le : n += Ie, e = true;
      continue;
    }
    if (l === "?") {
      n += At, e = true;
      continue;
    }
    n += Gs(l);
  }
  return [n, U(t), !!e, r];
}, V(Q, it), V(Q, Lt);
var Pt = (o, { windowsPathsNoEscape: t = false } = {}) => t ? o.replace(/[?*()[\]]/g, "[$&]") : o.replace(/[?*()[\]\\]/g, "\\$&");
var L = (o, t, e = {}) => (mt(t), !e.nocomment && t.charAt(0) === "#" ? false : new rt(t, e).match(o));
var Rs = /^\*+([^+@!?\*\[\(]*)$/;
var Xs = (o) => (t) => !t.startsWith(".") && t.endsWith(o);
var gs = (o) => (t) => t.endsWith(o);
var xs = (o) => (o = o.toLowerCase(), (t) => !t.startsWith(".") && t.toLowerCase().endsWith(o));
var Ws = (o) => (o = o.toLowerCase(), (t) => t.toLowerCase().endsWith(o));
var Vs = /^\*+\.\*+$/;
var ws = (o) => !o.startsWith(".") && o.includes(".");
var Is = (o) => o !== "." && o !== ".." && o.includes(".");
var Ls = /^\.\*+$/;
var Ns = (o) => o !== "." && o !== ".." && o.startsWith(".");
var Ss = /^\*+$/;
var _s = (o) => o.length !== 0 && !o.startsWith(".");
var Es = (o) => o.length !== 0 && o !== "." && o !== "..";
var Cs = /^\?+([^+@!?\*\[\(]*)?$/;
var Ts = ([o, t = ""]) => {
  let e = Te([o]);
  return t ? (t = t.toLowerCase(), (s) => e(s) && s.toLowerCase().endsWith(t)) : e;
};
var ks = ([o, t = ""]) => {
  let e = ke([o]);
  return t ? (t = t.toLowerCase(), (s) => e(s) && s.toLowerCase().endsWith(t)) : e;
};
var Fs = ([o, t = ""]) => {
  let e = ke([o]);
  return t ? (s) => e(s) && s.endsWith(t) : e;
};
var Ys = ([o, t = ""]) => {
  let e = Te([o]);
  return t ? (s) => e(s) && s.endsWith(t) : e;
};
var Te = ([o]) => {
  let t = o.length;
  return (e) => e.length === t && !e.startsWith(".");
};
var ke = ([o]) => {
  let t = o.length;
  return (e) => e.length === t && e !== "." && e !== "..";
};
var Fe = typeof process == "object" && process ? typeof process.env == "object" && process.env && process.env.__MINIMATCH_TESTING_PLATFORM__ || process.platform : "posix";
var _e = { win32: { sep: "\\" }, posix: { sep: "/" } };
var Os = Fe === "win32" ? _e.win32.sep : _e.posix.sep;
L.sep = Os;
var C = Symbol("globstar **");
L.GLOBSTAR = C;
var Hs = "[^/]";
var Ks = Hs + "*?";
var zs = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?";
var Js = "(?:(?!(?:\\/|^)\\.).)*?";
var Ms = (o, t = {}) => (e) => L(e, o, t);
L.filter = Ms;
var E = (o, t = {}) => Object.assign({}, o, t);
var Bs = (o) => {
  if (!o || typeof o != "object" || !Object.keys(o).length) return L;
  let t = L;
  return Object.assign((s, i, n = {}) => t(s, i, E(o, n)), { Minimatch: class extends t.Minimatch {
    constructor(i, n = {}) {
      super(i, E(o, n));
    }
    static defaults(i) {
      return t.defaults(E(o, i)).Minimatch;
    }
  }, AST: class extends t.AST {
    constructor(i, n, r = {}) {
      super(i, n, E(o, r));
    }
    static fromGlob(i, n = {}) {
      return t.AST.fromGlob(i, E(o, n));
    }
  }, unescape: (s, i = {}) => t.unescape(s, E(o, i)), escape: (s, i = {}) => t.escape(s, E(o, i)), filter: (s, i = {}) => t.filter(s, E(o, i)), defaults: (s) => t.defaults(E(o, s)), makeRe: (s, i = {}) => t.makeRe(s, E(o, i)), braceExpand: (s, i = {}) => t.braceExpand(s, E(o, i)), match: (s, i, n = {}) => t.match(s, i, E(o, n)), sep: t.sep, GLOBSTAR: C });
};
L.defaults = Bs;
var Ye = (o, t = {}) => (mt(o), t.nobrace || !/\{(?:(?!\{).)*\}/.test(o) ? [o] : (0, Ce.default)(o));
L.braceExpand = Ye;
var As = (o, t = {}) => new rt(o, t).makeRe();
L.makeRe = As;
var Ps = (o, t, e = {}) => {
  let s = new rt(t, e);
  return o = o.filter((i) => s.match(i)), s.options.nonull && !o.length && o.push(t), o;
};
L.match = Ps;
var Ee = /[?*]|[+@!]\(.*?\)|\[|\]/;
var Us = (o) => o.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
var rt = class {
  options;
  set;
  pattern;
  windowsPathsNoEscape;
  nonegate;
  negate;
  comment;
  empty;
  preserveMultipleSlashes;
  partial;
  globSet;
  globParts;
  nocase;
  isWindows;
  platform;
  windowsNoMagicRoot;
  regexp;
  constructor(t, e = {}) {
    mt(t), e = e || {}, this.options = e, this.pattern = t, this.platform = e.platform || Fe, this.isWindows = this.platform === "win32", this.windowsPathsNoEscape = !!e.windowsPathsNoEscape || e.allowWindowsEscape === false, this.windowsPathsNoEscape && (this.pattern = this.pattern.replace(/\\/g, "/")), this.preserveMultipleSlashes = !!e.preserveMultipleSlashes, this.regexp = null, this.negate = false, this.nonegate = !!e.nonegate, this.comment = false, this.empty = false, this.partial = !!e.partial, this.nocase = !!this.options.nocase, this.windowsNoMagicRoot = e.windowsNoMagicRoot !== void 0 ? e.windowsNoMagicRoot : !!(this.isWindows && this.nocase), this.globSet = [], this.globParts = [], this.set = [], this.make();
  }
  hasMagic() {
    if (this.options.magicalBraces && this.set.length > 1) return true;
    for (let t of this.set) for (let e of t) if (typeof e != "string") return true;
    return false;
  }
  debug(...t) {
  }
  make() {
    let t = this.pattern, e = this.options;
    if (!e.nocomment && t.charAt(0) === "#") {
      this.comment = true;
      return;
    }
    if (!t) {
      this.empty = true;
      return;
    }
    this.parseNegate(), this.globSet = [...new Set(this.braceExpand())], e.debug && (this.debug = (...n) => console.error(...n)), this.debug(this.pattern, this.globSet);
    let s = this.globSet.map((n) => this.slashSplit(n));
    this.globParts = this.preprocess(s), this.debug(this.pattern, this.globParts);
    let i = this.globParts.map((n, r, a) => {
      if (this.isWindows && this.windowsNoMagicRoot) {
        let l = n[0] === "" && n[1] === "" && (n[2] === "?" || !Ee.test(n[2])) && !Ee.test(n[3]), c = /^[a-z]:/i.test(n[0]);
        if (l) return [...n.slice(0, 4), ...n.slice(4).map((u) => this.parse(u))];
        if (c) return [n[0], ...n.slice(1).map((u) => this.parse(u))];
      }
      return n.map((l) => this.parse(l));
    });
    if (this.debug(this.pattern, i), this.set = i.filter((n) => n.indexOf(false) === -1), this.isWindows) for (let n = 0; n < this.set.length; n++) {
      let r = this.set[n];
      r[0] === "" && r[1] === "" && this.globParts[n][2] === "?" && typeof r[3] == "string" && /^[a-z]:$/i.test(r[3]) && (r[2] = "?");
    }
    this.debug(this.pattern, this.set);
  }
  preprocess(t) {
    if (this.options.noglobstar) for (let s = 0; s < t.length; s++) for (let i = 0; i < t[s].length; i++) t[s][i] === "**" && (t[s][i] = "*");
    let { optimizationLevel: e = 1 } = this.options;
    return e >= 2 ? (t = this.firstPhasePreProcess(t), t = this.secondPhasePreProcess(t)) : e >= 1 ? t = this.levelOneOptimize(t) : t = this.adjascentGlobstarOptimize(t), t;
  }
  adjascentGlobstarOptimize(t) {
    return t.map((e) => {
      let s = -1;
      for (; (s = e.indexOf("**", s + 1)) !== -1; ) {
        let i = s;
        for (; e[i + 1] === "**"; ) i++;
        i !== s && e.splice(s, i - s);
      }
      return e;
    });
  }
  levelOneOptimize(t) {
    return t.map((e) => (e = e.reduce((s, i) => {
      let n = s[s.length - 1];
      return i === "**" && n === "**" ? s : i === ".." && n && n !== ".." && n !== "." && n !== "**" ? (s.pop(), s) : (s.push(i), s);
    }, []), e.length === 0 ? [""] : e));
  }
  levelTwoFileOptimize(t) {
    Array.isArray(t) || (t = this.slashSplit(t));
    let e = false;
    do {
      if (e = false, !this.preserveMultipleSlashes) {
        for (let i = 1; i < t.length - 1; i++) {
          let n = t[i];
          i === 1 && n === "" && t[0] === "" || (n === "." || n === "") && (e = true, t.splice(i, 1), i--);
        }
        t[0] === "." && t.length === 2 && (t[1] === "." || t[1] === "") && (e = true, t.pop());
      }
      let s = 0;
      for (; (s = t.indexOf("..", s + 1)) !== -1; ) {
        let i = t[s - 1];
        i && i !== "." && i !== ".." && i !== "**" && (e = true, t.splice(s - 1, 2), s -= 2);
      }
    } while (e);
    return t.length === 0 ? [""] : t;
  }
  firstPhasePreProcess(t) {
    let e = false;
    do {
      e = false;
      for (let s of t) {
        let i = -1;
        for (; (i = s.indexOf("**", i + 1)) !== -1; ) {
          let r = i;
          for (; s[r + 1] === "**"; ) r++;
          r > i && s.splice(i + 1, r - i);
          let a = s[i + 1], l = s[i + 2], c = s[i + 3];
          if (a !== ".." || !l || l === "." || l === ".." || !c || c === "." || c === "..") continue;
          e = true, s.splice(i, 1);
          let u = s.slice(0);
          u[i] = "**", t.push(u), i--;
        }
        if (!this.preserveMultipleSlashes) {
          for (let r = 1; r < s.length - 1; r++) {
            let a = s[r];
            r === 1 && a === "" && s[0] === "" || (a === "." || a === "") && (e = true, s.splice(r, 1), r--);
          }
          s[0] === "." && s.length === 2 && (s[1] === "." || s[1] === "") && (e = true, s.pop());
        }
        let n = 0;
        for (; (n = s.indexOf("..", n + 1)) !== -1; ) {
          let r = s[n - 1];
          if (r && r !== "." && r !== ".." && r !== "**") {
            e = true;
            let l = n === 1 && s[n + 1] === "**" ? ["."] : [];
            s.splice(n - 1, 2, ...l), s.length === 0 && s.push(""), n -= 2;
          }
        }
      }
    } while (e);
    return t;
  }
  secondPhasePreProcess(t) {
    for (let e = 0; e < t.length - 1; e++) for (let s = e + 1; s < t.length; s++) {
      let i = this.partsMatch(t[e], t[s], !this.preserveMultipleSlashes);
      !i || (t[e] = i, t[s] = []);
    }
    return t.filter((e) => e.length);
  }
  partsMatch(t, e, s = false) {
    let i = 0, n = 0, r = [], a = "";
    for (; i < t.length && n < e.length; ) if (t[i] === e[n]) r.push(a === "b" ? e[n] : t[i]), i++, n++;
    else if (s && t[i] === "**" && e[n] === t[i + 1]) r.push(t[i]), i++;
    else if (s && e[n] === "**" && t[i] === e[n + 1]) r.push(e[n]), n++;
    else if (t[i] === "*" && e[n] && (this.options.dot || !e[n].startsWith(".")) && e[n] !== "**") {
      if (a === "b") return false;
      a = "a", r.push(t[i]), i++, n++;
    } else if (e[n] === "*" && t[i] && (this.options.dot || !t[i].startsWith(".")) && t[i] !== "**") {
      if (a === "a") return false;
      a = "b", r.push(e[n]), i++, n++;
    } else return false;
    return t.length === e.length && r;
  }
  parseNegate() {
    if (this.nonegate) return;
    let t = this.pattern, e = false, s = 0;
    for (let i = 0; i < t.length && t.charAt(i) === "!"; i++) e = !e, s++;
    s && (this.pattern = t.slice(s)), this.negate = e;
  }
  matchOne(t, e, s = false) {
    let i = this.options;
    if (this.isWindows) {
      let m = typeof t[0] == "string" && /^[a-z]:$/i.test(t[0]), Z = !m && t[0] === "" && t[1] === "" && t[2] === "?" && /^[a-z]:$/i.test(t[3]), X = typeof e[0] == "string" && /^[a-z]:$/i.test(e[0]), N = !X && e[0] === "" && e[1] === "" && e[2] === "?" && typeof e[3] == "string" && /^[a-z]:$/i.test(e[3]), T = Z ? 3 : m ? 0 : void 0, F = N ? 3 : X ? 0 : void 0;
      if (typeof T == "number" && typeof F == "number") {
        let [K, _] = [t[T], e[F]];
        K.toLowerCase() === _.toLowerCase() && (e[F] = K, F > T ? e = e.slice(F) : T > F && (t = t.slice(T)));
      }
    }
    let { optimizationLevel: n = 1 } = this.options;
    n >= 2 && (t = this.levelTwoFileOptimize(t)), this.debug("matchOne", this, { file: t, pattern: e }), this.debug("matchOne", t.length, e.length);
    for (var r = 0, a = 0, l = t.length, c = e.length; r < l && a < c; r++, a++) {
      this.debug("matchOne loop");
      var u = e[a], f = t[r];
      if (this.debug(e, u, f), u === false) return false;
      if (u === C) {
        this.debug("GLOBSTAR", [e, u, f]);
        var d = r, p = a + 1;
        if (p === c) {
          for (this.debug("** at the end"); r < l; r++) if (t[r] === "." || t[r] === ".." || !i.dot && t[r].charAt(0) === ".") return false;
          return true;
        }
        for (; d < l; ) {
          var b = t[d];
          if (this.debug(`
globstar while`, t, d, e, p, b), this.matchOne(t.slice(d), e.slice(p), s)) return this.debug("globstar found match!", d, l, b), true;
          if (b === "." || b === ".." || !i.dot && b.charAt(0) === ".") {
            this.debug("dot detected!", t, d, e, p);
            break;
          }
          this.debug("globstar swallow a segment, and continue"), d++;
        }
        return !!(s && (this.debug(`
>>> no match, partial?`, t, d, e, p), d === l));
      }
      let m;
      if (typeof u == "string" ? (m = f === u, this.debug("string match", u, f, m)) : (m = u.test(f), this.debug("pattern match", u, f, m)), !m) return false;
    }
    if (r === l && a === c) return true;
    if (r === l) return s;
    if (a === c) return r === l - 1 && t[r] === "";
    throw new Error("wtf?");
  }
  braceExpand() {
    return Ye(this.pattern, this.options);
  }
  parse(t) {
    mt(t);
    let e = this.options;
    if (t === "**") return C;
    if (t === "") return "";
    let s, i = null;
    (s = t.match(Ss)) ? i = e.dot ? Es : _s : (s = t.match(Rs)) ? i = (e.nocase ? e.dot ? Ws : xs : e.dot ? gs : Xs)(s[1]) : (s = t.match(Cs)) ? i = (e.nocase ? e.dot ? ks : Ts : e.dot ? Fs : Ys)(s) : (s = t.match(Vs)) ? i = e.dot ? Is : ws : (s = t.match(Ls)) && (i = Ns);
    let n = Q.fromGlob(t, this.options).toMMPattern();
    return i ? Object.assign(n, { test: i }) : n;
  }
  makeRe() {
    if (this.regexp || this.regexp === false) return this.regexp;
    let t = this.set;
    if (!t.length) return this.regexp = false, this.regexp;
    let e = this.options, s = e.noglobstar ? Ks : e.dot ? zs : Js, i = new Set(e.nocase ? ["i"] : []), n = t.map((l) => {
      let c = l.map((u) => {
        if (u instanceof RegExp) for (let f of u.flags.split("")) i.add(f);
        return typeof u == "string" ? Us(u) : u === C ? C : u._src;
      });
      return c.forEach((u, f) => {
        let d = c[f + 1], p = c[f - 1];
        u !== C || p === C || (p === void 0 ? d !== void 0 && d !== C ? c[f + 1] = "(?:\\/|" + s + "\\/)?" + d : c[f] = s : d === void 0 ? c[f - 1] = p + "(?:\\/|" + s + ")?" : d !== C && (c[f - 1] = p + "(?:\\/|\\/" + s + "\\/)" + d, c[f + 1] = C));
      }), c.filter((u) => u !== C).join("/");
    }).join("|"), [r, a] = t.length > 1 ? ["(?:", ")"] : ["", ""];
    n = "^" + r + n + a + "$", this.negate && (n = "^(?!" + n + ").+$");
    try {
      this.regexp = new RegExp(n, [...i].join(""));
    } catch {
      this.regexp = false;
    }
    return this.regexp;
  }
  slashSplit(t) {
    return this.preserveMultipleSlashes ? t.split("/") : this.isWindows && /^\/\/[^\/]+/.test(t) ? ["", ...t.split(/\/+/)] : t.split(/\/+/);
  }
  match(t, e = this.partial) {
    if (this.debug("match", t, this.pattern), this.comment) return false;
    if (this.empty) return t === "";
    if (t === "/" && e) return true;
    let s = this.options;
    this.isWindows && (t = t.split("\\").join("/"));
    let i = this.slashSplit(t);
    this.debug(this.pattern, "split", i);
    let n = this.set;
    this.debug(this.pattern, "set", n);
    let r = i[i.length - 1];
    if (!r) for (let a = i.length - 2; !r && a >= 0; a--) r = i[a];
    for (let a = 0; a < n.length; a++) {
      let l = n[a], c = i;
      if (s.matchBase && l.length === 1 && (c = [r]), this.matchOne(c, l, e)) return s.flipNegate ? true : !this.negate;
    }
    return s.flipNegate ? false : this.negate;
  }
  static defaults(t) {
    return L.defaults(t).Minimatch;
  }
};
L.AST = Q;
L.Minimatch = rt;
L.escape = Pt;
L.unescape = U;
function Oe(o, t) {
  return L(o, t);
}
var vs = Atomics.waitAsync || (() => {
  let o = `onmessage = ev => {
    const [b, i, v] = ev.data
    const f = new Int32Array(b)
    postMessage(Atomics.wait(f, i, v));
  }`, t = new Blob([o], { type: "text/javascript" }), e = URL.createObjectURL(t), s = new dt(e);
  return (i, n, r) => {
    let a = new Promise((l) => {
      s.once("message", (c) => {
        l(c);
      });
    });
    return s.postMessage([i.buffer, n, r]), { async: true, value: a };
  };
})();
var Ut = class {
  constructor(t, e, s, i) {
    this.#t = null;
    this.worker = t, this.sharedData = e, this.sharedDataView = new DataView(e), this.hostFlag = new Int32Array(e), this.opts = s, this.#e = i, this.hostFlag[0] = M, this.worker.on("message", (n) => this.#s(n));
  }
  #e;
  #t;
  async reset() {
    return this.isActive() ? false : (await this.#i("reset"), this.#e[at](), true);
  }
  isActive() {
    return Boolean(this.#t);
  }
  async #s(t) {
    switch (t?.type) {
      case "invoke":
        return this.#l(t);
      case "return":
        return this.#r(t);
      case "log":
        return this.#n(t);
    }
  }
  #n(t) {
    let e = this.opts.logger[t.level];
    typeof e != "function" ? this.opts.logger?.error(`failed to find loglevel="${t.level}" on logger: message=${t.message}`) : e.call(this.opts.logger, t.message);
  }
  #r(t) {
    let e = this.#t || null;
    if (e === null) throw new Error('received "return" call with no corresponding request');
    this.#t = null;
    let [s, i] = e;
    if (!Array.isArray(t.results) || t.results.length !== 2) return i(new Error('received malformed "return"'));
    let [n, r] = t.results;
    n ? i(n) : s(r);
  }
  async #i(t, ...e) {
    if (this.#t) throw new Error("plugin is not reentrant");
    let s, i, n = new Promise((r, a) => {
      s = r, i = a;
    });
    return this.#t = [s, i], this.worker.postMessage({ type: "invoke", handler: t, args: e }), n;
  }
  async functionExists(t) {
    return await this.#i("functionExists", t);
  }
  async call(t, e) {
    let s = this.#e[$](e), [i, n] = await this.callBlock(t, s), r = i !== null, a = i ?? n;
    if (a === null) return null;
    let l = this.#e[lt](a);
    if (l === null) return null;
    let c = new Y(J.allowSharedBufferCodec ? l.buffer : new Uint8Array(l.buffer).slice().buffer);
    if (r) {
      let u = new TextDecoder().decode(c);
      throw new Error(`Plugin-originated error: ${u}`);
    }
    return c;
  }
  async callBlock(t, e) {
    let s = this.#e[Rt](), { results: i, state: n } = await this.#i("call", t, e, s);
    this.#e[Gt](n, true);
    let [r, a] = i;
    if (r) throw r;
    return a;
  }
  async getExports(t) {
    return await this.#i("getExports", t ?? "0");
  }
  async getImports(t) {
    return await this.#i("getImports", t ?? "0");
  }
  async getInstance() {
    throw new Error("todo");
  }
  async close() {
    this.worker && (this.worker.terminate(), this.worker = null);
  }
  async #l(t) {
    let e = new Nt(this.sharedData), i = (this.opts.functions[t.namespace] ?? {})[t.func], n = setInterval(() => {
    }, 0);
    try {
      if (!i) throw Error(`Plugin error: host function "${t.namespace}" "${t.func}" does not exist`);
      new Uint8Array(this.sharedData).subarray(8).fill(254), this.#e[Gt](t.state, true);
      let r = await i(this.#e, ...t.args), { blocks: a } = this.#e[Rt](), l;
      for (let [c, u] of a) l = e.writeUint8(4), l && await l, l = e.writeUint32(u), l && await l, l = e.writeUint32(c?.byteLength || 0), l && await l, c && (l = e.write(c), l && await l);
      typeof r == "bigint" ? (l = e.writeUint8(1), l && await l, l = e.writeUint64(r), l && await l) : typeof r == "number" ? (l = e.writeUint8(2), l && await l, l = e.writeFloat64(r), l && await l) : (l = e.writeUint8(3), l && await l), l = e.writeUint8(255), l && await l, await e.flush();
    } catch (r) {
      this.close();
      let [, a] = this.#t;
      return this.#t = null, a(r);
    } finally {
      clearInterval(n);
    }
  }
};
var Ds = 500;
var Nt = class {
  constructor(t) {
    this.scratch = new ArrayBuffer(8), this.scratchView = new DataView(this.scratch), this.output = t, this.outputOffset = M, this.flag = new Int32Array(this.output), this.wait(0);
  }
  async wait(t) {
    let e = 0;
    do
      if (e = Atomics.load(this.flag, 0), e === t) {
        let { value: s, async: i } = vs(this.flag, 0, t, Ds);
        if (i && await s === "timed-out") continue;
      }
    while (e === t);
  }
  signal() {
    let t = Atomics.load(this.flag, 0);
    for (; Atomics.compareExchange(this.flag, 0, t, this.outputOffset) === t; ) ;
    Atomics.notify(this.flag, 0, 1);
  }
  async flush() {
    if (this.outputOffset === M) return;
    let t = this.outputOffset;
    this.signal(), this.outputOffset = M, await this.wait(t);
  }
  async spanningWrite(t) {
    let e = 0, s = this.output.byteLength - this.outputOffset, i = 1 + Math.floor((t.byteLength - s) / (this.output.byteLength - M)), n = (t.byteLength - s) % (this.output.byteLength - M);
    do
      new Uint8Array(this.output).set(t.subarray(e, e + s), this.outputOffset), this.outputOffset += s, e += s, await this.flush(), s = this.output.byteLength - M, --i;
    while (i != 0);
    n && this.write(t.subarray(e, e + n));
  }
  write(t) {
    if (t.byteLength + this.outputOffset < this.output.byteLength) {
      new Uint8Array(this.output).set(new Uint8Array(t), this.outputOffset), this.outputOffset += t.byteLength;
      return;
    }
    return this.spanningWrite(new Uint8Array(t));
  }
  writeUint8(t) {
    return this.scratchView.setUint8(0, t), this.write(this.scratch.slice(0, 1));
  }
  writeUint32(t) {
    return this.scratchView.setUint32(0, t, true), this.write(this.scratch.slice(0, 4));
  }
  writeUint64(t) {
    return this.scratchView.setBigUint64(0, t, true), this.write(this.scratch.slice(0, 8));
  }
  writeFloat64(t) {
    return this.scratchView.setFloat64(0, t, true), this.write(this.scratch.slice(0, 8));
  }
};
Nt.SAB_IDX = 0;
var vt = class {
  constructor(t, e) {
    this.fetch = t, this.allowedHosts = e, this.lastStatusCode = 0;
  }
  contribute(t) {
    t[ut] ??= {}, t[ut].http_request = (e, s, i) => this.makeRequest(e, s, i), t[ut].http_status_code = () => this.lastStatusCode;
  }
  async makeRequest(t, e, s) {
    let i = t.read(e);
    if (i === null) return 0n;
    let { headers: n, header: r, url: a, method: l } = i.json(), c = l ?? "GET", u = new URL(a);
    if (!this.allowedHosts.some((Z) => Z === u.hostname || Oe(u.hostname, Z))) throw new Error(`Call error: HTTP request to "${u}" is not allowed (no allowedHosts match "${u.hostname}")`);
    let d = s === 0n || c === "GET" || c === "HEAD" ? null : t.read(s)?.bytes(), p = this.fetch, b = await p(a, { headers: n || r, method: c, ...d ? { body: d.slice() } : {} });
    return this.lastStatusCode = b.status, t.store(new Uint8Array(await b.arrayBuffer()));
  }
};
async function He(o, t, e) {
  let s = new dt(ce), i = new nt(SharedArrayBuffer, o.logger, o.config);
  new vt(o.fetch, o.allowedHosts).contribute(o.functions), await new Promise((d, p) => {
    s.on("message", function b(m) {
      m?.type !== "initialized" && p(new Error(`received unexpected message (type=${m?.type})`)), s.removeListener("message", b), d(null);
    });
  });
  let r = new SharedArrayBuffer(o.sharedArrayBufferSize);
  new Uint8Array(r).subarray(8).fill(254);
  let { fetch: a, logger: l, ...c } = o, u = { ...c, type: "init", functions: Object.fromEntries(Object.entries(o.functions || {}).map(([d, p]) => [d, Object.keys(p)])), names: t, modules: e, sharedData: r }, f = new Promise((d, p) => {
    s.on("message", function b(m) {
      m?.type !== "ready" && p(new Error(`received unexpected message (type=${m?.type})`)), s.removeListener("message", b), d(null);
    });
  });
  return s.postMessage(u), await f, new Ut(s, r, o, i);
}
async function Qs(o, t = {}) {
  if (t = { ...t }, t.useWasi ??= false, t.enableWasiOutput ??= t.useWasi ? J.extismStdoutEnvVarSet : false, t.functions = t.functions || {}, t.allowedPaths ??= {}, t.allowedHosts ??= [].concat(t.allowedHosts || []), t.logger ??= console, t.config ??= {}, t.fetch ??= fetch, t.runInWorker ??= false, t.runInWorker && !J.hasWorkerCapability) throw new Error("Cannot enable off-thread wasm; current context is not `crossOriginIsolated` (see https://mdn.io/crossOriginIsolated)");
  let [e, s] = await te(await Promise.resolve(o), t.fetch ?? fetch), i = { allowedHosts: t.allowedHosts, allowedPaths: t.allowedPaths, functions: t.functions, fetch: t.fetch || fetch, wasiEnabled: t.useWasi, logger: t.logger, config: t.config, enableWasiOutput: t.enableWasiOutput, sharedArrayBufferSize: Number(t.sharedArrayBufferSize) || 1 << 16 };
  return (t.runInWorker ? He : ae)(i, e, s);
}

// index.ts
async function runPlugin(wasmUrl, functionName, ...args) {
  const plugin = await Qs(
    await (await fetch(wasmUrl)).arrayBuffer(),
    { useWasi: true, enableWasiOutput: true }
  );
  await plugin.call(functionName, ...args);
}
var WASIExamples = {
  countVowels: () => runPlugin("./wasi/count_vowels/count_vowels.wasm", "count_vowels", "Hello, World!"),
  helloWorldRust: () => runPlugin("./wasi/wasi_hello_world_rust/target/wasm32-wasi/debug/wasi_hello_world.wasm", "__main_void"),
  helloWorldCWithEmscripten: () => runPlugin("./wasi/wasi_hello_world_c/output.wasm", "main"),
  // Doesn't work – needs __syscall_connect
  syncNetworkRequest: () => runPlugin("./wasi/wasi_network_request_c/output.wasm", "main"),
  // Doesn't work – crash on munmap
  partialMunmap: () => runPlugin("./wasi/wasi_partial_munmap_c/output.wasm", "main"),
  // An asynchronous host functions work, but only when `runInWorker` is true
  asyncHostFunction: async () => {
    let kvStore = /* @__PURE__ */ new Map();
    const plugin = await Qs(
      await (await fetch("./wasi/count_vowels_kvstore/count_vowels_kvstore.wasm")).arrayBuffer(),
      {
        useWasi: true,
        enableWasiOutput: true,
        runInWorker: true,
        functions: {
          "extism:host/user": {
            async kv_read(cp, offs) {
              const key = cp.read(offs).text();
              let value = kvStore.get(key) ?? new Uint8Array([0, 0, 0, 0]);
              await new Promise((resolve) => {
                setTimeout(resolve, 1e5);
              });
              console.log(`Read ${new DataView(value.buffer).getUint32(0, true)} from key=${key}`);
              return cp.store(value);
            },
            kv_write(cp, kOffs, vOffs) {
              const key = cp.read(kOffs).text();
              const value = cp.read(vOffs);
              console.log(`Writing value=${value.getUint32(0, true)} from key=${key}`);
              kvStore.set(key, value.bytes());
            }
          }
        }
      }
    );
    await plugin.call("count_vowels");
  }
};
async function main() {
  let last = Object.keys(WASIExamples).slice(-1);
  for (let example in WASIExamples) {
    if (last.includes(example)) {
      console.group(`Running WASI example: ${example}`);
    } else {
      console.groupCollapsed(`Running WASI example: ${example}`);
    }
    try {
      await WASIExamples[example]();
    } catch (e) {
      console.error(e);
    }
    console.groupEnd();
  }
}
main();
