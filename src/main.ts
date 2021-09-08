interface Options {
	name: string;
	options: MyProps;
}

interface MyProps extends MediaTrackConstraints{
	video: boolean;
	audio: boolean;
	saveAfterStop?: boolean;
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
	saveAfterStop: boolean;
	blob: Blob;
	options: MediaTrackConstraints;
	constructor(options: Options) {
		this.saveAfterStop = options.options.saveAfterStop ? options.options.saveAfterStop : true;
		this.downLoadName = options.name ? options.name : "video";
		this.options = options.options ? options.options : {};
		this.blob = new Blob();
	}
	start() {
		window.navigator.mediaDevices
			// @ts-ignore for no support
			.getDisplayMedia({ video: true, audio: true, ...this.options })
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
			if(this.saveAfterStop){
				this.saveMedia(blob);
			} else {
				this.blob = blob;
			}
		};
	}
	saveMedia(blob: Blob) {
		let url = window.URL.createObjectURL(blob);
		const video = document.createElement("video");
		video.src = url;
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
