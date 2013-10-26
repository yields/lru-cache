
# lru-cache

  LRU Cache

## Installation

  Install with [component(1)](http://component.io):

    $ component install yields/lru-cache

## API

### Cache(opts)

  Initialize `Cache` with `opts`

  - `.max` max items.

#### #set

  Set `key`, `val`.
  `key` may be an object.

  an optional `ttl` may be given, if omitted the global `ttl` is used.

    var c = cache();
    c.set('a', 'b', '5ms');

#### #get

  Get `key`'s value, and promote it.

#### #has

  Check if `key` exists.

#### #remove

  Remove `key`

#### #max

  Set `max` vals and remove items if necessary.

#### #ttl

  Set `ttl` for all values, you can override this at a value level.

    var c = cache({ ttl: '2ms' });
    c.ttl('5ms');
    c.set('a', 'b', '1ms');
    c.set('d', 'c'); // => 5ms

  by default `ttl` is `0`, which means no values will expire.

#### #toJSON

  Get a cloned cache with `{ key: val }` structure.

#### #promote

  Manually promote `key`.

## License

  MIT
