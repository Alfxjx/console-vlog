'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

/**
 * @description screen capturing
 * @author xujx
 * @date 2020-11-23
 * @export
 * @class Vlog
 */
var Vlog = /*#__PURE__*/function () {
  // logged file
  function Vlog(options) {
    _classCallCheck(this, Vlog);

    _defineProperty(this, "vlog", void 0);

    _defineProperty(this, "stream", void 0);

    _defineProperty(this, "downLoadName", void 0);

    _defineProperty(this, "saveAfterStop", void 0);

    _defineProperty(this, "blob", void 0);

    _defineProperty(this, "options", void 0);

    this.saveAfterStop = options.options.saveAfterStop ? options.options.saveAfterStop : true;
    this.downLoadName = options.name ? options.name : "video";
    this.options = options.options ? options.options : {};
    this.blob = new Blob();
  }

  _createClass(Vlog, [{
    key: "start",
    value: function start() {
      var _this = this;

      window.navigator.mediaDevices // @ts-ignore for no support
      .getDisplayMedia(_objectSpread2({
        video: true,
        audio: true
      }, this.options)).then(function (media) {
        _this.stream = media;

        _this.createInstance(media);
      })["catch"](function (err) {
        console.error(err);
      });
    }
  }, {
    key: "stop",
    value: function stop() {
      this.vlog.stop();
      this.stream.getTracks().forEach(function (track) {
        track.stop();
      });
    }
  }, {
    key: "createInstance",
    value: function createInstance(stream) {
      var _this2 = this;

      this.vlog = new MediaRecorder(stream);
      this.vlog.start(2000);
      var chunks = [];

      this.vlog.ondataavailable = function (event) {
        chunks.push(event.data);
      };

      this.vlog.onstop = function (event) {
        var blob = new Blob(chunks, {
          type: "video/mp4"
        });

        if (_this2.saveAfterStop) {
          _this2.saveMedia(blob);
        } else {
          _this2.blob = blob;
        }
      };
    }
  }, {
    key: "saveMedia",
    value: function saveMedia(blob) {
      var url = window.URL.createObjectURL(blob);
      var video = document.createElement("video");
      video.src = url;
      video.style.display = "none";
      video.controls = true;
      document.body.appendChild(video);
      var a = document.createElement("a");
      a.style.display = "none"; // a.innerHTML = "downloadVideo";

      a.download = this.downLoadName;
      a.href = url;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(a.href);
      document.body.removeChild(a);
    }
  }]);

  return Vlog;
}();

exports.Vlog = Vlog;
