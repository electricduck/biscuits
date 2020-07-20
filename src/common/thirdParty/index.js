import Vue from "vue"
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowLeft,
  faCheck, faChevronRight, faCog, faCoins, faCookieBite,
  faEllipsisH,
  faFileAlt,
  faHome,
  faInfoCircle,
  faMobile,
  faPlay, faPlus,
  faRedoAlt,
  faSignInAlt, faSignOutAlt, faSync,
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
      faCheck, faChevronRight, faCog, faCoins, faCookieBite,
      faEllipsisH,
      faFileAlt,
      faHome,
      faInfoCircle,
      faMobile,
      faPlay, faPlus,
      faRedoAlt,
      faSignInAlt, faSignOutAlt, faSync,
      faTasks,
      faWallet,

      faGithub
    )

    Vue.component('font-awesome-icon', FontAwesomeIcon)
  }
}

export default thirdParty
