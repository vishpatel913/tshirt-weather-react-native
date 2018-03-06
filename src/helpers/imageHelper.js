export const getImageSource = (image) => {
  switch (image) {
    case 'tshirt':
      return require('../../assets/images/tshirt.png');
    case 'jacket':
      return require('../../assets/images/jacket.png');
    case 'hoodie':
      return require('../../assets/images/hoodie.png');
    case 'coat':
      return require('../../assets/images/coat.png');
    case 'sunglasses':
      return require('../../assets/images/sunglasses.png');
    case 'winter':
      return require('../../assets/images/winter.png');
    case 'umbrella':
      return require('../../assets/images/umbrella.png');
    default:
      return require('../../assets/images/na.png');
  }
};
