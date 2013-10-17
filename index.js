
/**
 * Export `Cache`
 */

module.exports = Cache;

/**
 * Has.
 */

var has = ({}).hasOwnProperty;

/**
 * Initialize `Cache`.
 *
 * @param {Object} opts
 * @api public
 */

function Cache(opts){
  if (!(this instanceof Cache)) return new Cache(opts);
  opts = opts || {};
  this.keys = [];
  this.vals = {};
  this.max(opts.max || Infinity);
}

/**
 * Set `key`, `val`.
 *
 * @param {String|Object} key
 * @param {Mixed} val
 * @return {Cache}
 * @api public
 */

Cache.prototype.set = function(key, val){
  if ('object' == typeof key) {
    for (var k in key) this.set(k, key[k]);
    return this;
  }

  if (this.has(key)) {
    this.remove(key);
  }

  this.keys.push(key);
  this.vals[key] = {
    value: val
  };

  this.cap();

  return this;
};

/**
 * Get `key`.
 *
 * @param {String} key
 * @return {Mixed}
 * @api public
 */

Cache.prototype.get = function(key){
  if (!this.has(key)) return;
  this.promote(key);
  return this.vals[key].value;
};

/**
 * Has `key`
 *
 * @param {String} key
 * @return {Boolean}
 * @api public
 */

Cache.prototype.has = function(key){
  return has.call(this.vals, key);
};

/**
 * Remove `key`
 *
 * @param {String} key
 * @return {Cache}
 * @api public
 */

Cache.prototype.remove = function(key){
  if (!this.has(key)) return this;
  var i = this.keys.indexOf(key);
  this.keys.splice(i, 1);
  delete this.vals[key];
  return this;
};

/**
 * Set `max`.
 *
 * @param {Number} max
 * @return {Cache}
 * @api public
 */

Cache.prototype.max = function(max){
  this._max = max;
  this.cap();
  return this;
};

/**
 * To json
 *
 * @return {Object}
 * @api public
 */

Cache.prototype.toJSON = function(){
  var ret = {};

  for (var k in this.vals) {
    if (!has.call(this.vals, k)) continue;
    ret[k] = this.vals[k].value;
  }

  return ret;
};

/**
 * Promote `key`
 *
 * @param {String} key
 * @return {Cache}
 * @api public
 */

Cache.prototype.promote = function(key){
  if (!this.has(key)) return this;
  var i = this.keys.indexOf(key);
  this.keys.splice(i, 1);
  this.keys.push(key);
  return this;
};

/**
 * Cap
 *
 * @return {Cache}
 * @api private
 */

Cache.prototype.cap = function(){
  var length = this.keys.length
    , n = length - this._max;

  while (0 < n--) {
    var k = this.keys.shift();
    delete this.vals[k];
  }

  return this;
};
