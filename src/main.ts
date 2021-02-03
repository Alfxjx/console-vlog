interface Options {
	name: string;
	width?: number;
	height?: number;
}

/**
 * @description screen capturing
 * @author xujx
 * @date 2020-11-23
 * @export
 * @class Vlog
 */
export class Vlog {
    vlog: any; // logged file
    stream: any;
	downLoadName: string;
	windowWidth: number;
	windowHeight: number;
	constructor(options: Options) {
		this.downLoadName = options.name ? options.name : "video";
		this.windowWidth = options.width ? options.width : 640;
		this.windowHeight = options.height ? options.height : 480;
	}
	start() {
		window.navigator.mediaDevices
			// @ts-ignore for no support
			.getDisplayMedia({ video: true, audio: true })
			.then((media: MediaStream) => {
                this.stream = media;
				this.createInstance(media);
			})
			.catch((err: Error) => {
				console.error(err);
			});
	}
	stop() {
		this.vlog.stop();
		this.stream.getTracks().forEach(function (track: any) {
			track.stop();
		});
	}
	createInstance(stream: MediaStream) {
		this.vlog = new MediaRecorder(stream);
		this.vlog.start(2000);
		let chunks: any[] = [];
		this.vlog.ondataavailable = (event: any) => {
			chunks.push(event.data);
		};
		this.vlog.onstop = (event: Event) => {
			let blob: Blob = new Blob(chunks, {
				type: "video/mp4",
			});
			this.saveMedia(blob);
		};
	}
	saveMedia(blob: Blob) {
		let url = window.URL.createObjectURL(blob);
		const video = document.createElement("video");
		video.src = url;
		video.width = this.windowWidth;
		video.height = this.windowHeight;
		video.style.display = "none";
		video.controls = true;
		document.body.appendChild(video);

		const a = document.createElement("a");
		a.style.display = "none";
		// a.innerHTML = "downloadVideo";
		a.download = this.downLoadName;
		a.href = url;
		document.body.appendChild(a);
		a.click();

		window.URL.revokeObjectURL(a.href);
		document.body.removeChild(a);
	}
}
