const TSHIRT_IMAGE = require('../../assets/images/tshirt.png');
const JACKET_IMAGE = require('../../assets/images/jacket.png');
const HOODIE_IMAGE = require('../../assets/images/hoodie.png');
const COAT_IMAGE = require('../../assets/images/coat.png');
const SUNNIES_IMAGE = require('../../assets/images/sunglasses.png');
const WINTER_IMAGE = require('../../assets/images/winter.png');
const UMBRELLA_IMAGE = require('../../assets/images/umbrella.png');
const NA_IMAGE = require('../../assets/images/na.png');

export const getImageSource = (image) => {
  switch (image) {
    case 'tshirt':
      return TSHIRT_IMAGE;
    case 'jacket':
      return JACKET_IMAGE;
    case 'hoodie':
      return HOODIE_IMAGE;
    case 'coat':
      return COAT_IMAGE;
    case 'sunglasses':
      return SUNNIES_IMAGE;
    case 'winter':
      return WINTER_IMAGE;
    case 'umbrella':
      return UMBRELLA_IMAGE;
    default:
      return NA_IMAGE;
  }
};
