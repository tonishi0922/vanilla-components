import { BaseElement } from "../../internal/BaseElement";
import css from "./video-player.css?raw";

type Attrs = "src" | "poster" | "autoplay" | "muted" | "controls";

export class VideoPlayer extends BaseElement<Attrs> {
  private video!: HTMLVideoElement;

  static override get observedAttributes() {
    return ["src", "poster", "autoplay", "muted", "controls"];
  }

  constructor() {
    super({
      css,
      template: `
        <div class="player">
            <video></video>
            <div class="controls">
              <button class="play">▶︎</button>
              <input class="seek" type="range" min="0" max="100" />
              <span class="time"></span>
              <button class="fullscreen">⛶</button>
            </div>
          </div>
      `,
    });
  }

  protected override update(): void {
    this.video = this.root.querySelector("video")!;
    this.syncAttrs();
    this.bindEvents();
  }

  private syncAttrs() {
    const src = this.attr("src");
    if (src && this.video.src !== src) {
      this.video.src = src;
    }
    this.video.poster = this.attr("poster") ?? "";
    this.video.muted = this.hasAttribute("muted");
    this.video.autoplay = this.hasAttribute("autoplay");
  }

  private bindEvents() {
    const playBtn: HTMLButtonElement = this.root.querySelector(".play")!;
    playBtn.onclick = () => {
      this.video.paused ? this.video.play() : this.video.pause();
    };
  }
}
