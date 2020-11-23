# console.vlog()

fast screen capturing.

## Usage

```html
<script type="module">
    import { Vlog } from "./bundle.esm.js";
    var recorder = new Vlog({ name: "download" });
    console.log(recorder);

    document.getElementById("start").addEventListener("click", function () {
        recorder.start();
    });
    document.getElementById("end").addEventListener("click", function () {
        recorder.stop();
    });
</script>
```

also offer commonjs packages for use. (end with `cjs.js`).

## Log

2020-11-23 : mvp version

## TODO

1. when end the capturing, automatically save the video.
