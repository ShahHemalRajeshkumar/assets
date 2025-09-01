export const formatPrice = (price, language) => {
    const numericPrice = Math.floor(price);

    if (numericPrice < 1000) {
      return numericPrice.toString();
    }

    if (language === 'de' || language === 'ch-de' || language?.includes('de')) {
      return numericPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
    }

    return numericPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};