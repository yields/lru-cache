
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

#### #get

  Get `key`'s value, and promote it.

#### #has

  Check if `key` exists.

#### #remove

  Remove `key`

#### #max

  Set `max` vals and remove items if necessary.

#### #toJSON

  Get a cloned cache with `{ key: val }` structure.

#### #promote

  Manually promote `key`.

## License

  MIT
