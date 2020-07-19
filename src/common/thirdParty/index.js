import Vue from "vue"
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowLeft,
  faCheck, faCog, faCoins, faCookieBite,
  faEllipsisH,
  faMobile,
  faPlus,
  faRedoAlt,
  faSignInAlt, faSync,
  faTasks,
  faWallet
} from "@fortawesome/free-solid-svg-icons"
import {
  faGithub
} from "@fortawesome/free-brands-svg-icons"

const thirdParty = {
  FontAwesome() {
    library.add(
      faArrowLeft,
      faCheck, faCog, faCoins, faCookieBite,
      faEllipsisH,
      faMobile,
      faPlus,
      faRedoAlt,
      faSignInAlt, faSync,
      faTasks,
      faWallet,

      faGithub
    )

    Vue.component('font-awesome-icon', FontAwesomeIcon)
  }
}

export default thirdParty