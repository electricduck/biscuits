import Vue from "vue"
import Vuelidate from 'vuelidate'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowDown, faArrowLeft, faArrowUp,
  faBolt,
  faCheck, faChevronRight, faCog, faCoins, faCookieBite,
  faEllipsisH,
  faFileAlt,
  faHome,
  faInfoCircle,
  faMinus, faMobile,
  faPlay, faPlus,
  faRedoAlt,
  faSignInAlt, faSignOutAlt, faSpinner, faSync,
  faTasks, faTimes,
  faWallet
} from "@fortawesome/free-solid-svg-icons"
import {
  faGithub
} from "@fortawesome/free-brands-svg-icons"

const thirdParty = {
  FontAwesome() {
    library.add(
      faArrowDown, faArrowLeft, faArrowUp,
      faBolt,
      faCheck, faChevronRight, faCog, faCoins, faCookieBite,
      faEllipsisH,
      faFileAlt,
      faHome,
      faInfoCircle,
      faMinus, faMobile,
      faPlay, faPlus,
      faRedoAlt,
      faSignInAlt, faSignOutAlt, faSpinner, faSync,
      faTasks, faTimes,
      faWallet,

      faGithub
    )

    Vue.component('font-awesome-icon', FontAwesomeIcon)
  },
  Moment() {
    Vue.use(require('vue-moment'))
  },
  Vuelidate() {
    Vue.use(Vuelidate)
  }
}

export default thirdParty
