
describe('Cache', function(){

  var cache = require('lru-cache')
    , assert = require('assert');

  describe('()', function(){
    it('should return new cache', function(){
      assert(cache() != cache());
    })
  })

  describe('({ max: 20 })', function(){
    it('should respect options', function(){
      assert(20 == cache({ max: 20 })._max)
    })
  })

  describe('#set', function(){
    it('should push to keys', function(){
      var c = cache();
      c.set('a', 'b');
      c.set('b', 'c');
      assert(2 == c.keys.length);
      assert('b' == c.keys[1]);
    })

    it('should add to `.vals`', function(){
      var c = cache();
      c.set('a', 'a');
      c.set('c', 'c');
      assert('c' == c.vals.c.value);
      assert('a' == c.vals.a.value);
    })

    it('should remove if the key exists', function(){
      var c = cache();
      c.set('a', 'a');
      c.set('a', 'b');
      c.set('c', 'b');
      assert('b' == c.vals.a.value);
      assert(2 == c.keys.length);
      assert('a' == c.keys[0]);
      assert('c' == c.keys[1]);
    })

    it('should cap', function(){
      var c = cache({ max: 2 });
      c.set('a', 'a');
      c.set('b', 'b');
      c.set('c', 'c');
      assert(2 == c.keys.length);
      assert('b' == c.keys[0]);
      assert('c' == c.keys[1]);
    })
  })

  describe('#get', function(){
    it('should return the value', function(){
      assert('a' == cache().set('a', 'a').get('a'));
    })

    it('should promote', function(){
      var c = cache();
      c.set('a', 'a');
      c.set('b', 'b');
      c.set('c', 'c');
      c.set('d', 'd');
      assert('d' == c.keys[c.keys.length - 1]);
      c.get('a');
      assert('a' == c.keys[c.keys.length - 1]);
      c.get('c');
      assert('c' == c.keys[c.keys.length - 1]);
      c.get('b');
      assert('b' == c.keys[c.keys.length - 1]);
      assert('d' == c.keys[0]);
    })
  })

  describe('#has', function(){
    it('should work', function(){
      var c = cache();
      c.set('a', 'a');
      assert(c.has('a'));
      assert(!c.has('b'));
    })
  })

  describe('#remove', function(){
    it('should work', function(){
      var c = cache();
      c.set('a', 'a');
      assert(c.has('a'));
      c.remove('a');
      assert(!c.has('a'));
    })
  })

  describe('#max', function(){
    it('should set ._max', function(){
      assert(2 == cache().max(2)._max);
    })

    it('should cap', function(){
      var c = cache();
      c.set('a', 'a');
      c.set('b', 'b');
      c.set('c', 'c');
      c.max(1);
      assert(1 == c.keys.length);
      assert('c' == c.keys[0]);
      assert('c' == c.vals.c.value);
    })
  })

  describe('#toJSON', function(){
    it('should return object of key => val', function(){
      var c = cache();
      c.set('a', 'a');
      c.set('b', 'b');
      assert('a' == c.toJSON().a);
      assert('b' == c.toJSON().b);
    })
  })

  describe('#promote', function(){
    it('should remove and push a key', function(){
      var c = cache();
      c.set('a', 'a');
      c.set('b', 'b');
      c.set('c', 'c');
      assert(3 == c.keys.length)
      assert('c' == c.keys[c.keys.length - 1]);
      c.promote('a');
      assert(3 == c.keys.length);
      assert('a' == c.keys[c.keys.length - 1]);
    })
  })
})
