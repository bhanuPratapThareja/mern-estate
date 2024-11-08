import { Router } from "express";
import { check, body, param } from "express-validator";

import {
  createListing,
  deleteListing,
  getListing,
  searchListings,
  updateListing,
} from "../controllers/listing.controller.js";
import { verifyUserToken } from "../middlewares/verifyUser.js";

const router = Router();

router.post("/create", verifyUserToken,
  [
    // body('name').notEmpty().withMessage('Bola na abhi... Add name for the listing'),
    // body('description').notEmpty().withMessage('Bola na description bhi... Add description for the listing'),
    // body('imageUrls').custom(images => {
    //     if(!images.length) {
    //        throw new Error('Add atleast one image na baba')
    //     }
    // })
  ],
  [
    check("name").trim().notEmpty().withMessage("Add name for the listing"),
    check("description")
      .trim().notEmpty().withMessage("Add description for the listing"),
    check("address")
      .trim().notEmpty().withMessage("Add address for the listing"),
    check('discountPrice')
        .isNumeric().withMessage('Discount price must be a number'),
    check("regularPrice")
        .not().isString().withMessage('Regular price must be a number')
        .custom((regularPrice, { req, location, path }) => {
            if(!req.body.discountPrice) {
                return true
            }
            if(req.body.discountPrice >= regularPrice) {
                throw new Error('Discount price must be lower Regular price')
            }
            return true
        }),
    check('bedrooms')
        .isInt().withMessage('Bedrooms is a number field'),
    check('bathrooms')
        .isInt().withMessage('Bathrooms is a number field'),
    check('furnished')
        .isBoolean().withMessage('Furnished is a boolean field'),
    check('parking')
        .isBoolean().withMessage('Parking is a boolean field'),
    check('offer')
        .isBoolean().withMessage('Offer is a boolean field'),
    check('type')
        .notEmpty().withMessage('Type cannot be empty')
        .isIn(['sale', 'rent']).withMessage('Type can be either sale or rent'),
    check("imageUrls")
        .custom((images) => {
            if (!images.length) {
            throw new Error("check if there is atleast one image added");
            }
        return true;
      }),
  ],
  createListing
);

router.delete("/delete/:listingId", verifyUserToken, deleteListing);

router.put("/update/:listingId", verifyUserToken,
  [
    check("name")
        .notEmpty()
        .withMessage("Add name for the listing"),
    check("description")
        .notEmpty()
        .withMessage("Add description for the listing"),
    check("address")
        .notEmpty()
        .withMessage("Add address for the listing"),
  ],
  updateListing
);

router.get("/fetch/:id", getListing);
router.get("/search", searchListings);

export default router;
