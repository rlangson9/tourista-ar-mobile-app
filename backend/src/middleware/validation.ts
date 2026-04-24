import { body, param, query, validationResult } from 'express-validator';

export const validate = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Validation failed',
        details: errors.array().map(err => ({
          field: err.type === 'field' ? err.path : 'unknown',
          message: err.msg
        }))
      }
    });
  }
  next();
};

export const registerValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email address')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('phone')
    .optional()
    .isMobilePhone('any').withMessage('Invalid phone number'),
  body('country')
    .optional()
    .isString().withMessage('Country must be a string'),
  body('role')
    .optional()
    .isIn(['user', 'partner', 'supplier']).withMessage('Invalid role'),
  validate
];

export const loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email address')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required'),
  validate
];

export const partnerValidation = [
  body('businessName')
    .trim()
    .notEmpty().withMessage('Business name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Business name must be between 2 and 100 characters'),
  body('businessEmail')
    .trim()
    .notEmpty().withMessage('Business email is required')
    .isEmail().withMessage('Invalid business email')
    .normalizeEmail(),
  body('businessPhone')
    .trim()
    .notEmpty().withMessage('Business phone is required'),
  body('businessAddress')
    .trim()
    .notEmpty().withMessage('Business address is required'),
  body('categories')
    .optional()
    .isArray().withMessage('Categories must be an array'),
  body('services')
    .optional()
    .isArray().withMessage('Services must be an array'),
  validate
];

export const supplierValidation = [
  body('companyName')
    .trim()
    .notEmpty().withMessage('Company name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Company name must be between 2 and 100 characters'),
  body('companyEmail')
    .trim()
    .notEmpty().withMessage('Company email is required')
    .isEmail().withMessage('Invalid company email')
    .normalizeEmail(),
  body('companyPhone')
    .trim()
    .notEmpty().withMessage('Company phone is required'),
  body('companyAddress')
    .trim()
    .notEmpty().withMessage('Company address is required'),
  body('businessType')
    .optional()
    .isIn(['manufacturer', 'trader', 'distributor']).withMessage('Invalid business type'),
  body('productCategories')
    .optional()
    .isArray().withMessage('Product categories must be an array'),
  body('minimumOrderQuantity')
    .optional()
    .isNumeric().withMessage('MOQ must be a number'),
  body('paymentMethods')
    .optional()
    .isArray().withMessage('Payment methods must be an array'),
  validate
];

export const tourValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Tour title is required')
    .isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),
  body('description')
    .trim()
    .notEmpty().withMessage('Tour description is required'),
  body('destination')
    .trim()
    .notEmpty().withMessage('Destination is required'),
  body('duration')
    .notEmpty().withMessage('Duration is required')
    .isNumeric().withMessage('Duration must be a number'),
  body('price')
    .notEmpty().withMessage('Price is required')
    .isNumeric().withMessage('Price must be a number')
    .custom(value => value > 0).withMessage('Price must be greater than 0'),
  body('maxParticipants')
    .optional()
    .isNumeric().withMessage('Max participants must be a number'),
  body('category')
    .optional()
    .isString().withMessage('Category must be a string'),
  body('highlights')
    .optional()
    .isArray().withMessage('Highlights must be an array'),
  body('included')
    .optional()
    .isArray().withMessage('Included must be an array'),
  body('images')
    .optional()
    .isArray().withMessage('Images must be an array'),
  body('videos')
    .optional()
    .isArray().withMessage('Videos must be an array'),
  validate
];

export const productValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Product name is required')
    .isLength({ min: 2, max: 200 }).withMessage('Name must be between 2 and 200 characters'),
  body('description')
    .trim()
    .notEmpty().withMessage('Product description is required'),
  body('category')
    .trim()
    .notEmpty().withMessage('Category is required'),
  body('price')
    .notEmpty().withMessage('Price is required')
    .isNumeric().withMessage('Price must be a number')
    .custom(value => value > 0).withMessage('Price must be greater than 0'),
  body('minOrderQuantity')
    .optional()
    .isNumeric().withMessage('MOQ must be a number'),
  body('images')
    .optional()
    .isArray().withMessage('Images must be an array'),
  body('videos')
    .optional()
    .isArray().withMessage('Videos must be an array'),
  body('specifications')
    .optional()
    .isObject().withMessage('Specifications must be an object'),
  validate
];

export const bookingValidation = [
  body('tourId')
    .notEmpty().withMessage('Tour ID is required')
    .isMongoId().withMessage('Invalid tour ID'),
  body('partnerId')
    .notEmpty().withMessage('Partner ID is required')
    .isMongoId().withMessage('Invalid partner ID'),
  body('tourDate')
    .notEmpty().withMessage('Tour date is required')
    .isISO8601().withMessage('Invalid date format'),
  body('numberOfParticipants')
    .notEmpty().withMessage('Number of participants is required')
    .isNumeric().withMessage('Must be a number')
    .custom(value => value > 0).withMessage('Must be at least 1'),
  body('specialRequests')
    .optional()
    .isString().withMessage('Special requests must be a string'),
  body('participantDetails')
    .optional()
    .isArray().withMessage('Participant details must be an array'),
  validate
];

export const orderValidation = [
  body('supplierId')
    .notEmpty().withMessage('Supplier ID is required')
    .isMongoId().withMessage('Invalid supplier ID'),
  body('items')
    .notEmpty().withMessage('Order items are required')
    .isArray().withMessage('Items must be an array'),
  body('deliveryDate')
    .optional()
    .isISO8601().withMessage('Invalid date format'),
  body('totalPrice')
    .notEmpty().withMessage('Total price is required')
    .isNumeric().withMessage('Must be a number'),
  body('shippingAddress')
    .notEmpty().withMessage('Shipping address is required')
    .isObject().withMessage('Shipping address must be an object'),
  validate
];

export const messageValidation = [
  body('receiverId')
    .notEmpty().withMessage('Receiver ID is required')
    .isMongoId().withMessage('Invalid receiver ID'),
  body('content')
    .trim()
    .notEmpty().withMessage('Message content is required')
    .isLength({ min: 1, max: 5000 }).withMessage('Message must be between 1 and 5000 characters'),
  body('type')
    .optional()
    .isIn(['text', 'image', 'file', 'system']).withMessage('Invalid message type'),
  body('attachments')
    .optional()
    .isArray().withMessage('Attachments must be an array'),
  body('existingConversationId')
    .optional()
    .isString().withMessage('Conversation ID must be a string'),
  validate
];

export const mongoIdValidation = (paramName: string) => [
  param(paramName)
    .isMongoId().withMessage(`Invalid ${paramName}`),
  validate
];

export const paginationValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  validate
];