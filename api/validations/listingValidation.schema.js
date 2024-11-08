export const listingValidationSchema = {
    name: {
        trim: true,
        notEmpty: {
            errorMessage: 'User Name must have a value'
        }
    },
    description: {
        trim: true,
        notEmpty: {
            errorMessage: 'Description cannot be empty'
        }
    },
    address: {
        trim: true,
        notEmpty: {
            errorMessage: 'Add address for the listing'
        }
    },
    discountPrice: {
        isInt: {
            errorMessage: 'Discount price must be a number'
        }
    },
    regularPrice: {
        isInt: {
            errorMessage: 'Regular price must be a number'
        },
        custom: {
            options: ((regularPrice, { req, location, path }) => {
                if(req.body.discountPrice >= regularPrice) {
                    throw new Error('Discount price must be lower Regular price')
                }
                return true
            })
        }
    },
    bedrooms: {
        isInt: {
            errorMessage: 'Bedrooms price must be a number'
        }
    },
    bathrooms: {
        isInt: {
            errorMessage: 'Bathrooms price must be a number'
        }
    },
    furnished: {
        isBoolean: {
            errorMessage: 'Furnished is a boolean field'
        }
    },
    parking: {
        isBoolean: {
            errorMessage: 'Parking is a boolean field'
        }
    },
    offer: {
        isBoolean: {
            errorMessage: 'Offer is a boolean field'
        }
    },
    type: {
        notEmpty: {
            errorMessage: 'Type cannot be empty'
        },
        isIn: {
            options: [['rent', 'sale']],
            errorMessage: 'Type can be either sale or rent'
        }
    },
    imageUrls: {
        isArray: {
            errorMessage: 'Image Urls must be an array'
        },
        custom: {
            options: (images => {
                if(!images.length) {
                    throw new Error("Double Check if there is atleast one image added")
                }
                return true
            })
        }
    }
}