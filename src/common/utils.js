//import Balance from "../models/Balance"

export const getCurrencySymbol = (code = "") => {
  code = code.toLowerCase()

  switch(code) {
    case "gbp":
    case "egp":
    case "fkp":
    case "ggp":
    case "imp":
    case "jep":
    case "lbp":
    case "shp":
    case "syp":
      return "£";
    case "eur":
      return "€";
    case "usd":
    case "ars":
    case "aud":
    case "bsd":
    case "bbd":
    case "bmd":
    case "bnd":
    case "cad":
    case "clp":
    case "cop":
    case "fjd":
    case "gip":
    case "gyp":
    case "hkd":
    case "lrd":
    case "kyd":
    case "mxn":
    case "nad":
    case "nzd":
    case "sbd":
    case "sgd":
    case "srd":
    case "svc":
    case "tvd":
    case "xcd":
      return "$";
    case "cny":
    case "jpy":
      return "¥";
    case "all":
      return "Lek";
    case "afn":
      return "؋";
    case "ang":
    case "awg":
      return "ƒ";
    case "azn":
      return "₼";
    case "bam":
      return "KM";
    case "bgn":
    case "kzt":
    case "kgs":
    case "uzs":
      return "лв";
    case "bob":
      return "$b";
    case "brl":
      return "R$";
    case "bwp":
      return "P";
    case "byn":
      return "Br";
    case "bzd":
      return "BZ$";
    case "chf":
      return "CHF";
    case "crc":
      return "₡";
    case "cup":
    case "php":
      return "₱";
    case "czk":
      return "Kč";
    case "dkk":
    case "isk":
    case "nok":
    case "sek":
      return "kr";
    case "dop":
      return "RD$";
    case "ghs":
      return "¢";
    case "gtq":
      return "Q";
    case "hnl":
      return "L";
    case "hrk":
      return "kn";
    case "huf":
      return "Ft";
    case "idr":
      return "Rp";
    case "ils":
      return "₪";
    case "inr":
      return "₹";
    case "irr":
    case "omr":
    case "qar":
    case "sar":
    case "yer":
      return "﷼";
    case "jmd":
      return "J$";
    case "khr":
      return "៛";
    case "kpw":
    case "krw":
      return "₩";
    case "lak":
      return "₭";
    case "lkr":
      case "mur":
      case "npr":
      case "pkr":
      case "scr":
        return "₨";
    case "mkd":
      return "ден";
    case "mnt":
      return "₮";
    case "myd":
      return "RM";
    case "mzn":
      return "MT";
    case "ngn":
      return "₦";
    case "nio":
      return "C$";
    case "pab":
      return "B/.";
    case "pen":
      return "S/.";
    case "pln":
      return "zł";
    case "pyg":
      return "Gs";
    case "ron":
      return "lei";
    case "rub":
      return "₽";
    case "rsd":
      return "Дин.";
    case "sos":
      return "S";
    case "thb":
      return "฿";
    case "try":
      return "₺";
    case "ttd":
      return "TT$";
    case "twd":
      return "NT$";
    case "uah":
      return "₴";
    case "uyu":
      return "$U";
    case "vef":
      return "Bs";
    case "vnd":
      return "₫";
    case "zar":
      return "R";
    case "zwd":
      return "Z$";
    default:
      return "¤";
  }
}

export const getProductSuggestion = (amount = 0 /*balance = new Balance()*/) => {
  //let amount = balance.amount

  function randomProduct(amount = 0) {
    function product(name = "", cost = 0) {
      return {
        cost: cost,
        name: name
      }
    }

    let products = [
      product("Costa flat white", 240),
      product("2019 Dacia Sandero Access", 6995)
    ]

    let affordableProducts = []

    for (let i = 0; i < products.length; i++) {
      if(products[i].cost <= amount) {
        affordableProducts.push(products[i])
      } else {
        break;
      }
    }

    return affordableProducts[Math.floor(Math.random() * products.length)];
  }

  let product = randomProduct(amount)

  if(product) {
    let productTimes = Math.trunc(amount / product.cost)
    return (productTimes > 1) ?
      `${productTimes} ${product.name}'s` :
      `a ${product.name}`
  } else {
    return "nothing"
  }
}
