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

/**
 * @description 录屏插件
 * @author xujx
 * @date 2020-11-23
 * @export
 * @class Vlog
 */
var Vlog = /*#__PURE__*/function () {
  function Vlog(options) {
    _classCallCheck(this, Vlog);

    _defineProperty(this, "vlog", void 0);

    _defineProperty(this, "downLoadName", void 0);

    this.downLoadName = options.name;
  }

  _createClass(Vlog, [{
    key: "start",
    value: function start() {
      var _this = this;

      window.navigator.mediaDevices // @ts-ignore for no support
      .getDisplayMedia({
        video: true,
        audio: true
      }).then(function (Mediastream) {
        _this.createInstance(Mediastream);
      })["catch"](function (err) {
        console.error(err);
      });
    }
  }, {
    key: "stop",
    value: function stop() {
      this.vlog.stop();
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

        _this2.saveMedia(blob);
      };
    }
  }, {
    key: "saveMedia",
    value: function saveMedia(blob) {
      var url = window.URL.createObjectURL(blob);
      var video = document.createElement("video");
      video.src = url;
      video.width = 320;
      video.height = 240;
      video.style.display = "none";
      video.controls = true;
      document.body.appendChild(video);
      var a = document.createElement("a");
      a.style.display = "none"; // a.innerHTML = "下载视频";

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
