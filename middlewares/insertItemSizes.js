const insertItemSizes = (req, res, next) => {
  let itemSizes = [];
  if (typeof req.body.itemSizes === "string") {
    itemSizes = JSON.parse(req.body.itemSizes);
  }

  const sizes = [];

  if (itemSizes?.length > 0) {
    for (let i = 0; i < itemSizes.length; i++){
      if (itemSizes[i]?.size) {
        sizes.push(itemSizes[i].size);        
      }
    }
    req.body.sizes = sizes
    req.body.prices = itemSizes;
  }

  delete req.body.itemSizes;
  next();
}

module.exports = insertItemSizes;