import { Router } from "express";
import { check, body, param, checkSchema } from "express-validator";

import { verifyUserToken } from "../middlewares/verifyUser.js";
import { listingValidationSchema } from "../validations/listingValidation.schema.js";
import {
  createListing,
  deleteListing,
  getListing,
  searchListings,
  updateListing,
} from "../controllers/listing.controller.js";

const router = Router();


router.post("/create", verifyUserToken, checkSchema(listingValidationSchema),
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
    // check("name").trim().notEmpty().withMessage("Add name for the listing"),
    // check("description")
    //   .trim().notEmpty().withMessage("Add description for the listing"),
    // check("address")
    //   .trim().notEmpty().withMessage("Add address for the listing"),
    // check('discountPrice')
    //     .isInt().withMessage('Discount price must be a number'),
    // check("regularPrice")
    //     .isInt().withMessage('Regular price must be a number')
    //     .custom((regularPrice, { req, location, path }) => {
    //         if(req.body.discountPrice >= regularPrice) {
    //             throw new Error('Discount price must be lower Regular price')
    //         }
    //         return true
    //     }),
    // check('bedrooms')
    //     .isInt().withMessage('Bedrooms is a number field'),
    // check('bathrooms')
    //     .isInt().withMessage('Bathrooms is a number field'),
    // check('furnished')
    //     .isBoolean().withMessage('Furnished is a boolean field'),
    // check('parking')
    //     .isBoolean().withMessage('Parking is a boolean field'),
    // check('offer')
    //     .isBoolean().withMessage('Offer is a boolean field'),
    // check('type')
    //     .notEmpty().withMessage('Type cannot be empty')
    //     .isIn(['sale', 'rent']).withMessage('Type can be either sale or rent'),
    // check("imageUrls")
    //     .custom((images) => {
    //         if (!images.length) {
    //         throw new Error("check if there is atleast one image added");
    //         }
    //     return true;
    //   }),
  ],
  createListing
);


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

router.delete("/delete/:listingId", verifyUserToken, deleteListing);
router.get("/fetch/:id", getListing);
router.get("/search", searchListings);

export default router;
