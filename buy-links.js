// Metal Wire Art — Square payment links (HAND-EDITABLE).
//
// How to wire up online sales:
//   1. In your Square Dashboard (squareup.com), go to Payment Links and
//      create one link per piece you want to sell (name, price, photo).
//   2. Paste each shareable URL below next to the matching photo file name.
//   3. Pieces WITHOUT a URL automatically show an "Ask about this piece"
//      email button instead — so the site always looks finished.
//
// Photo file names match images/gallery/ (see gallery-data.js).
const BUY_LINKS = {
  // Default for every piece: the $25 "Example Wire Art Piece" payment link.
  // Add per-piece URLs (keyed by photo file name) any time to override it.
  "*": "https://square.link/u/FdRs2kXR",
  // Example per-piece override:
  // "trees-blue-tree.jpg": "https://square.link/u/xxxxxxxxxxxx",
};
