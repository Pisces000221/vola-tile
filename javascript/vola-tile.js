(function (window) {
  'use strict';
  var vtile = {},
      FACE_F = 0, FACE_B = 1,
      FACE_U = 2, FACE_D = 3,
      FACE_L = 4, FACE_R = 5;
  var COL = 1 << 8, RVAL = 1 << 7, RPOS = 1 << 6, FACE_MASK = 7;
  var turn_shift = [
    // Shift data in clockwise direction.
    // F operation
    [FACE_U | RPOS, FACE_R | COL | RVAL, FACE_D, FACE_L | COL | RVAL | RPOS],
    // F' operation
    [FACE_U | RPOS | RVAL, FACE_L | COL | RPOS, FACE_D | RVAL, FACE_R | COL]
  ];

  vtile.cube = function (size) {
    this.tiles = [];
    this.size = size;
    var i, j;
    for (i = 0; i < 6; ++i) {
      this.tiles[i] = [];
      for (j = 0; j < size * size; ++j)
        this.tiles[i][j] = i;
    }
  };
  vtile.cube.prototype = {
    // Examples in a 4x4x4 cube:
    // R  = (FACE_R, 0, false) = (FACE_L, 3, true)
    // R' = (FACE_R, 0, true)  = (FACE_L, 3, false)
    // MR = (FACE_R, 1, true)  = (FACE_L, 2, false)
    turn: function (face, layer, counter_clockwise) {
      if (face & 1) {
        face ^= 1;
        layer = this.size - layer - 1;
        counter_clockwise ^= 1;
      } else counter_clockwise &= 1;
      // Now face must be one of F, U, and L,
      // and counter_clockwise is a 0/1 number.
      layer = layer || 0;
      var i, j, t, pos, out_tiles = [];
      // Step 1: Shift the four sides surrounding the turned face.
      // Step 1 a) Get the shifted tiles.
      for (i = 0; i < 4; ++i) {
        out_tiles[i] = [];
        t = turn_shift[face + counter_clockwise][i];
        // pos is the row or column number.
        pos = (t & RPOS) ? (this.size - layer - 1) : layer;
        for (j = 0; j < this.size; ++j)
          out_tiles[i][(t & RVAL) ? (this.size - j - 1) : j]
            = this.tiles[t & FACE_MASK]
              [(t & COL) ? (j * this.size + pos) : (pos * this.size + j)]
      }
      // Step 1 b) Put te shifted tiles to the next face.
      for (i = 0; i < 4; ++i) {
        t = turn_shift[face + counter_clockwise][i];
        pos = (t & RPOS) ? (this.size - layer - 1) : layer;
        for (j = 0; j < this.size; ++j)
          this.tiles[t & FACE_MASK]
          [(t & COL) ? (j * this.size + pos) : (pos * this.size + j)]
            = out_tiles[(i + 3) % 4][j];
      }
      // Step 2: Transpose the face if turning a face layer
      if (layer === 0
          || (counter_clockwise ^= 1, face ^= 1, layer === this.size - 1)) {
        var new_face = [];
        for (i = 0; i < this.size; ++i)
          for (j = 0; j < this.size; ++j) {
            new_face[counter_clockwise ?
              i + this.size * (this.size - j - 1) :
              j * this.size + (this.size - i - 1)]
              = this.tiles[face][i * this.size + j];
          }
        this.tiles[face] = new_face;
      }
    }
  };

  window.vtile = vtile;
}(window));
