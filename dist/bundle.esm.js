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

    _defineProperty(this, "windowWidth", void 0);

    _defineProperty(this, "windowHeight", void 0);

    this.downLoadName = options.name ? options.name : "video";
    this.windowWidth = options.width ? options.width : 640;
    this.windowHeight = options.height ? options.height : 480;
  }

  _createClass(Vlog, [{
    key: "start",
    value: function start() {
      var _this = this;

      window.navigator.mediaDevices // @ts-ignore for no support
      .getDisplayMedia({
        video: true,
        audio: true
      }).then(function (media) {
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

        _this2.saveMedia(blob);
      };
    }
  }, {
    key: "saveMedia",
    value: function saveMedia(blob) {
      var url = window.URL.createObjectURL(blob);
      var video = document.createElement("video");
      video.src = url;
      video.width = this.windowWidth;
      video.height = this.windowHeight;
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

export { Vlog };
