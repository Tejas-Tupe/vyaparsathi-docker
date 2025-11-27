// Signup Schema
import Joi from "joi";

export const signupSchema = Joi.object({
  firstName: Joi.string().trim().required().messages({
    "string.empty": "First name is required.",
  }),

  lastName: Joi.string().allow("").optional(),

  mobile: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.empty": "Mobile number is required.",
      "string.pattern.base": "Mobile number must be 10 digits.",
    }),

  email: Joi.string().email().required().messages({
    "string.empty": "Email is required.",
    "string.email": "Please enter a valid email address.",
  }),

  password: Joi.string()
    .min(6)
    .disallow(Joi.ref("oldPassword"))
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
    .message(
      "New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    )
    .required()
    .messages({
      "string.empty": "New password is required.",
      "string.min": "New password must be at least 6 characters.",
      "any.invalid": "New password cannot be the same as the old password.",
    }),

  confirmPassword: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Passwords do not match."
    }),

  shopName: Joi.string().allow("").optional(),
  shopType: Joi.string().allow("").optional(),
  address: Joi.string().allow("").optional(),
  gstin: Joi.string().allow("").optional(),
});


// Login Schema
export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required.",
    "string.email": "Please enter a valid email address.",
  }),
    password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required.",
    "string.min": "Password must be at least 6 characters long.",
  }),
});

// Update Profile Schema
export const updateProfileSchema = Joi.object({
    firstName: Joi.string().min(2).required().messages({
      "string.empty": "First name is required.",
      "string.min": "First name must be at least 2 characters.",
    }),
    lastName: Joi.string().allow("").optional(),
    email: Joi.string().email().required().messages({
      "string.empty": "Email is required.",
      "string.email": "Invalid email format.",
    }),
    mobile: Joi.string()
      .pattern(/^[0-9]{10,}$/)
      .required()
      .messages({
        "string.empty": "Mobile number is required.",
        "string.pattern.base": "Mobile number must be at least 10 digits.",
      }),
    shopName: Joi.string().min(2).allow("").optional().messages({
      "string.min": "Shop name must be at least 2 characters.",
    }),
    shopType: Joi.string().allow("").optional(),
    address: Joi.string().allow("").optional(),
    gstin: Joi.string().allow("").optional(),
  });

  // Change Password
export const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().min(6).required().messages({
    "string.empty": "Old password is required.",
    "string.min": "Old password must be at least 6 characters.",
  }),
  newPassword: Joi.string()
    .min(6)
    .disallow(Joi.ref("oldPassword"))
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
    .message(
      "New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    )
    .required()
    .messages({
      "string.empty": "New password is required.",
      "string.min": "New password must be at least 6 characters.",
      "any.invalid": "New password cannot be the same as the old password.",
    }),
});

