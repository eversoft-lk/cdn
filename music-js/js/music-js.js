"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => MusicJS
});
module.exports = __toCommonJS(src_exports);

// src/functions/youtube/init.ts
var import_youtube_player = __toESM(require("youtube-player"));
function init() {
  const player = document.createElement("div");
  player.id = "yt-player";
  player.classList.add("yt-player");
  document.body.appendChild(player);
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://eversoft.lk/assets/css/music-js.css";
  document.head.appendChild(link);
  return (0, import_youtube_player.default)("yt-player", {
    playerVars: {
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      enablejsapi: 1,
      fs: 0,
      iv_load_policy: 3,
      modestbranding: 1,
      playsinline: 1,
      rel: 0
    }
  });
}

// src/functions/youtube/getIdByUrl.ts
function getIdByUrl(url) {
  const youtubeComMatch = url.match(/youtube\.com\/watch\?v=(\w+)/);
  const youtuBeMatch = url.match(/youtu\.be\/(\w+)/);
  return youtubeComMatch ? youtubeComMatch[1] : youtuBeMatch ? youtuBeMatch[1] : "";
}

// src/functions/file/init.ts
function init2() {
  const audio = new Audio();
  audio.volume = 0.5;
  return audio;
}

// src/functions/initUI.ts
function initUI(elements) {
  if (elements === void 0) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css";
    document.head.appendChild(link);
    const container = document.createElement("div");
    container.classList.add("help-button-wrapper");
    container.innerHTML = `
        <ul class="help-list">
        <div id="player">
          <div id="controls">
            <button id="prev"><i class="bi bi-rewind-fill"></i></button>
            <button id="play-pause"><i class="bi bi-pause-fill"></i></button>
            <button id="next"><i class="bi bi-fast-forward-fill"></i></button>
          </div>
          <div id="volume-container">
            <i class="bi bi-volume-up" id="mute-unmute"></i>
            <input
              type="range"
              id="volume"
              min="0"
              max="1"
              step="0.05"
              value="0.5"
            />
          </div>
        </div>
      </ul>

      <button class="help-button">
        <img src="/icon.png" alt="" />
      </button>
    `;
    document.body.appendChild(container);
    document.querySelector("#mute-unmute")?.addEventListener("click", async () => {
      let volume = await MusicJS.getVolume();
      if (volume === 0) {
        MusicJS.setVolume(MusicJS.options?.volume ?? 0.5);
        document.querySelector("#mute-unmute")?.classList.remove("bi-volume-mute");
        document.querySelector("#mute-unmute")?.classList.add("bi-volume-up");
        document.querySelector("#volume")?.setAttribute("value", (MusicJS.options?.volume ?? 0.5).toString());
        return;
      }
      MusicJS.setVolume(0);
      document.querySelector("#mute-unmute")?.classList.remove("bi-volume-up");
      document.querySelector("#mute-unmute")?.classList.add("bi-volume-mute");
      document.querySelector("#volume")?.setAttribute("value", "0");
    });
    document.querySelector(".help-button")?.addEventListener("click", toggleExpanded);
    window.addEventListener("click", (event) => {
      const target = event.target;
      if (!target.closest(".help-button-wrapper")) {
        closeExpanded();
      }
    });
    document.getElementById("volume")?.addEventListener("change", (event) => {
      const volume = event.target.value;
      if (volume === "0") {
        document.querySelector("#mute-unmute")?.classList.remove("bi-volume-up");
        document.querySelector("#mute-unmute")?.classList.add("bi-volume-mute");
      } else {
        document.querySelector("#mute-unmute")?.classList.remove("bi-volume-mute");
        document.querySelector("#mute-unmute")?.classList.add("bi-volume-up");
      }
      MusicJS.setVolume(parseFloat(volume));
    });
    elements = {
      playPauseButton: "#play-pause",
      nextButton: "#next",
      prevButton: "#prev"
    };
  }
  document.querySelector(elements.playPauseButton)?.addEventListener("click", () => {
    MusicJS.PlayOrPause();
  });
  document.querySelector(elements.nextButton)?.addEventListener("click", () => {
    MusicJS.next();
  });
  document.querySelector(elements.prevButton)?.addEventListener("click", () => {
    MusicJS.prev();
  });
}
function toggleExpanded() {
  document.querySelector(".help-button-wrapper")?.classList.toggle("expanded");
}
function closeExpanded() {
  document.querySelector(".help-button-wrapper")?.classList.remove("expanded");
}

// src/functions/shuffle.ts
function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex]
    ];
  }
  return array;
}

// src/index.ts
var MusicJS = class {
  static options = null;
  static YTPlayer = null;
  static AudioPlayer = null;
  static songs = [];
  static currentSongIndex = 0;
  static init(options) {
    this.options = options;
    initUI(options.elements);
    if (options.method === "youtube") {
      this.YTPlayer = init();
      this.setSongs(options.src);
      if (options.randomize) {
        this.songs = shuffle(this.songs);
      }
      this.setVolume(options.volume ?? 0.5);
      this.YTPlayer.loadVideoById(this.songs[0]);
      this.YTPlayer.playVideo().then(() => {
        console.log(
          "Starting to play song. It will take some time to buffer video before it starts playing."
        );
      });
      this.YTPlayer.on("stateChange", (event) => {
        if (event.data === 0) {
          this.next();
        }
      });
      return;
    }
    this.AudioPlayer = init2();
    this.setSongs(options.src);
    if (options.randomize) {
      this.songs = shuffle(this.songs);
    }
    this.setVolume(options.volume ?? 0.5);
    this.AudioPlayer.src = this.songs[0];
    this.AudioPlayer.play().then(() => {
      console.log(
        "Starting to play song. It will take some time to buffer video before it starts playing."
      );
    });
    this.AudioPlayer.addEventListener("ended", () => {
      this.next();
    });
  }
  static setSongs(songs) {
    if (this.options?.method === "youtube") {
      if (Array.isArray(songs)) {
        songs.forEach((song) => {
          let url = getIdByUrl(song);
          if (url != "") {
            this.songs.push(url);
          }
        });
        return;
      } else {
        let url = getIdByUrl(songs);
        if (url != "") {
          this.songs.push(url);
          return;
        }
      }
    }
    if (Array.isArray(songs)) {
      this.songs = songs;
      return;
    }
    this.songs.push(songs);
  }
  static PlayOrPause() {
    let icon = null;
    let isCustomized = this.options?.elements !== void 0;
    if (!isCustomized) {
      icon = document.querySelector("#play-pause i");
    }
    if (this.options?.method === "youtube") {
      if (!this.YTPlayer) {
        return;
      }
      this.YTPlayer.getPlayerState().then((state) => {
        if (state === 1) {
          icon?.classList.remove("bi-pause-fill");
          icon?.classList.add("bi-play-fill");
          this.YTPlayer?.pauseVideo();
        } else {
          icon?.classList.remove("bi-play-fill");
          icon?.classList.add("bi-pause-fill");
          this.YTPlayer?.playVideo();
        }
      });
      return;
    }
    if (!this.AudioPlayer) {
      return;
    }
    if (this.AudioPlayer.paused) {
      icon?.classList.remove("bi-play-fill");
      icon?.classList.add("bi-pause-fill");
      this.AudioPlayer.play();
    } else {
      icon?.classList.remove("bi-pause-fill");
      icon?.classList.add("bi-play-fill");
      this.AudioPlayer.pause();
    }
  }
  static next() {
    if (this.currentSongIndex + 1 < this.songs.length) {
      this.currentSongIndex += 1;
    } else {
      this.currentSongIndex = 0;
    }
    if (this.options?.method === "youtube") {
      this.YTPlayer?.loadVideoById(this.songs[this.currentSongIndex]);
      this.YTPlayer?.playVideo();
      return;
    }
    if (!this.AudioPlayer) {
      return;
    }
    this.AudioPlayer.pause();
    this.AudioPlayer.src = this.songs[this.currentSongIndex];
    this.AudioPlayer.play();
  }
  static prev() {
    if (this.currentSongIndex - 1 >= 0) {
      this.currentSongIndex -= 1;
    } else {
      this.currentSongIndex = this.songs.length - 1;
    }
    if (this.options?.method === "youtube") {
      this.YTPlayer?.loadVideoById(this.songs[this.currentSongIndex]);
      this.YTPlayer?.playVideo();
      return;
    }
    if (!this.AudioPlayer) {
      return;
    }
    this.AudioPlayer.pause();
    this.AudioPlayer.src = this.songs[this.currentSongIndex];
    this.AudioPlayer.play();
  }
  static setVolume(volume) {
    if (this.options?.method === "youtube") {
      if (!this.YTPlayer) {
        return;
      }
      this.YTPlayer.setVolume(volume * 100);
      return;
    }
    if (!this.AudioPlayer) {
      return;
    }
    this.AudioPlayer.volume = volume;
  }
  static async getVolume() {
    if (this.options?.method === "youtube") {
      if (!this.YTPlayer) {
        return 0;
      }
      return await this.YTPlayer.getVolume() / 100;
    }
    if (!this.AudioPlayer) {
      return 0;
    }
    return this.AudioPlayer.volume;
  }
};
