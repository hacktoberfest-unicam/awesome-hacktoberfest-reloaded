// noinspection EqualityComparisonWithCoercionJS

import Player from "../modules/Player.js";
import Turn from "../modules/Turn.js";

export default Vue.component("sidebar-player", {
  props: {
    player: Player,
    playerId: Number, // this client's ID
    chooser: Player,
    turn: Turn
  },
  template: `
    <div class="player" :class="{me: player.id == playerId}">
      <img class="turn-arrow" v-if="player.id == turn.player" src="/images/turn-arrow.svg" alt="Current turn">
      <div class="current-turn" v-if="player.id == playerId && player.id == turn.player">
        È il tuo turno
      </div>
      <div class="flex">
        <div class="avatar">
          <svg class="crown" v-if="chooser && player.id == chooser.id" xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
            <g transform="translate(128 128) scale(1.21 1.21)" style="">
              <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"
                 transform="translate(-104.85 -104.85) scale(2.33 2.33)">
                <path
                    d="M 78.517 77.617 H 11.483 c -0.951 0 -1.77 -0.669 -1.959 -1.601 L 0.041 29.542 c -0.159 -0.778 0.157 -1.576 0.806 -2.034 c 0.648 -0.459 1.506 -0.489 2.186 -0.079 l 25.585 15.421 l 14.591 -29.358 c 0.335 -0.674 1.021 -1.104 1.774 -1.11 c 0.709 -0.003 1.445 0.411 1.792 1.08 l 15.075 29.1 L 86.968 27.43 c 0.681 -0.41 1.537 -0.379 2.186 0.079 s 0.965 1.256 0.807 2.034 l -9.483 46.474 C 80.286 76.948 79.467 77.617 78.517 77.617 z"
                    fill="currentColor"
                    style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill-rule: nonzero; opacity: 1;"
                    transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
              </g>
            </g>
          </svg>
          <img src="/images/player-avatar.svg" alt="">
        </div>
        <div class="name">{{ player.nickname }}</div>
      </div>
    </div>`,
});
