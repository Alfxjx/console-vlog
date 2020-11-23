interface Options{
	name: string;
	width: number;
	height: number;
}

/**
 * @description 录屏插件
 * @author xujx
 * @date 2020-11-23
 * @export
 * @class Vlog
 */
export class Vlog {
	vlog: any;
	downLoadName: string;
	windowWidth:number;
	windowHeight:number;
	constructor(options: Options){
		this.downLoadName = options.name;
		this.windowWidth = options.width;
		this.windowHeight = options.height;
	}
	start() {
		window.navigator.mediaDevices
			// @ts-ignore for no support
			.getDisplayMedia({ video: true, audio: true })
			.then((Mediastream: any) => {
				this.createInstance(Mediastream);
			})
			.catch((err: Error) => {
				console.error(err);
			});
	}
	stop() {
		this.vlog.stop();
	}
	createInstance(stream: any) {
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
		// a.innerHTML = "下载视频";
		a.download = this.downLoadName;
		a.href = url;
		document.body.appendChild(a);
		a.click();

		window.URL.revokeObjectURL(a.href);
		document.body.removeChild(a);
	}
}
