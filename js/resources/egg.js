
// thatmikeflynn.com/egg.js/
/*
Copyright (c) 2015 Mike Flynn
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
 */
function Egg() {
  this.eggs = [];
  this.hooks = [];
  this.kps = [];
  this.activeEgg = '';
  this.ignoredKeys = [16];

  if(arguments.length) {
    this.AddCode.apply(this, arguments);
  }
}

Egg.prototype.__execute = function(fn) {
  return typeof fn === 'function' && fn.call(this);
}

Egg.prototype.__toCharCodes = function(keys) {
  var special = {
      "slash": 191, "up": 38, "down": 40, "left": 37, "right": 39, "enter": 13, "space": 32, "ctrl": 17, "alt": 18, "tab": 9, "esc": 27
    },
    specialKeys = Object.keys(special);

  if(typeof keys === 'string') {
    keys = keys.split(',').map(function(key){
      return key.trim();
    });
  }

  var characterKeyCodes = keys.map(function(key) {

    if(key === parseInt(key, 10)) {
      return key;
    }
    if(specialKeys.indexOf(key) > -1) {
      return special[key];
    }
    return (key).charCodeAt(0);
  });

  return characterKeyCodes.join(',');
}

Egg.prototype.AddCode = function(keys, fn, metadata) {
  this.eggs.push({keys: this.__toCharCodes(keys), fn: fn, metadata: metadata});

  return this;
}

Egg.prototype.AddHook = function(fn) {
  this.hooks.push(fn);

  return this;
}

Egg.prototype.handleEvent = function(e) {
  var keyCode  = e.which;
  var isLetter = keyCode >= 65 && keyCode <= 90;

  if ( e.type === "keydown" && !e.metaKey && !e.ctrlKey && !e.altKey && !e.shiftKey ) {
    var tag = e.target.tagName;

    if ( ( tag === "HTML" || tag === "BODY" ) && isLetter ) {
      e.preventDefault();
      return;
    }
  }

  if ( e.type === "keyup" && this.eggs.length > 0 ) {

    if(isLetter) {
      if(!e.shiftKey) {
        keyCode = keyCode + 32;
      }
    }

    if(this.ignoredKeys.indexOf(keyCode) === -1) {
      this.kps.push(keyCode);
    }

    this.eggs.forEach(function(currentEgg, i) {
      var foundEgg = this.kps.toString().indexOf(currentEgg.keys) >= 0;

      if(foundEgg) {
        this.kps = [];
        this.activeEgg = currentEgg;
        this.__execute(currentEgg.fn, this);
        this.hooks.forEach(this.__execute, this);
        this.activeEgg = '';
      }
    }, this);
  }
};

Egg.prototype.Listen = function() {
  // Standards compliant only. Don't waste time on IE8.
  if ( document.addEventListener !== void 0 ) {
    document.addEventListener( "keydown", this, false );
    document.addEventListener( "keyup", this, false );
  }

  return this;
};

Egg.prototype.listen  = Egg.prototype.Listen;
Egg.prototype.addCode = Egg.prototype.AddCode;
Egg.prototype.addHook = Egg.prototype.AddHook;

