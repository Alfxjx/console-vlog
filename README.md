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

## test it

clone this repo, and use `http-server .` after run `npm run build`.

open the browser(chrome preferred),and get `http://127.0.0.1:8080/test.html`

## Log

2020-11-23 : mvp version

## TODO

1. when end the capturing, automatically save the video.

## Q&A

> Access to script at 'file:///C:/Users/xujx/workspace/console-vlog/dist/bundle.esm.js' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, chrome-untrusted, https.

this may because you open test.html as a file, plz run `npm run dev` to start the example. view [http://127.0.0.1:8080/test.html](http://127.0.0.1:8080/test.html)
