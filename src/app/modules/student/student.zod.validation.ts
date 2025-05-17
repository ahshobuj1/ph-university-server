import { z } from 'zod';

const createNameValidation = z.object({
  firstName: z
    .string({
      required_error: 'First name is required',
      invalid_type_error: 'First name must be a string',
    })
    .trim()
    .min(1, 'First name cannot be empty')
    .max(50, 'First name cannot exceed 50 characters'),

  middleName: z
    .string({
      invalid_type_error: 'Middle name must be a string',
    })
    .trim()
    .max(50, 'Middle name cannot exceed 50 characters')
    .optional(),

  lastName: z
    .string({
      required_error: 'Last name is required',
      invalid_type_error: 'Last name must be a string',
    })
    .trim()
    .min(1, 'Last name cannot be empty')
    .max(50, 'Last name cannot exceed 50 characters'),
});

const createAddressValidation = z.object({
  village: z
    .string({
      invalid_type_error: 'Village must be a string',
    })
    .max(100, 'Village cannot exceed 100 characters')
    .optional(),

  postOffice: z
    .string({
      required_error: 'Post office is required',
      invalid_type_error: 'Post office must be a string',
    })
    .min(1, 'Post office cannot be empty')
    .max(100, 'Post office cannot exceed 100 characters'),

  policeStation: z
    .string({
      required_error: 'Police station is required',
      invalid_type_error: 'Police station must be a string',
    })
    .min(1, 'Police station cannot be empty')
    .max(100, 'Police station cannot exceed 100 characters'),

  town: z
    .string({
      required_error: 'Town is required',
      invalid_type_error: 'Town must be a string',
    })
    .min(1, 'Town cannot be empty')
    .max(100, 'Town cannot exceed 100 characters'),
});

const createStudentValidationsSchema = z.object({
  password: z.string().optional(),
  student: z.object({
    name: createNameValidation,
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
      })
      .email('Invalid email address')
      .trim()
      .toLowerCase()
      .max(100, 'Email cannot exceed 100 characters'),

    gender: z.enum(['male', 'female', 'others'], {
      required_error: 'Gender is required',
      invalid_type_error: "Gender must be either 'male', 'female' or 'others'",
    }),

    age: z
      .number({
        required_error: 'Age is required',
        invalid_type_error: 'Age must be a number',
      })
      .int('Age must be an integer')
      .positive('Age must be a positive number')
      .max(120, 'Age cannot exceed 120 years'),

    motherName: z
      .string({
        required_error: "Mother's name is required",
        invalid_type_error: "Mother's name must be a string",
      })
      .min(1, "Mother's name cannot be empty")
      .max(100, "Mother's name cannot exceed 100 characters"),

    fatherName: z
      .string({
        required_error: "Father's name is required",
        invalid_type_error: "Father's name must be a string",
      })
      .min(1, "Father's name cannot be empty")
      .max(100, "Father's name cannot exceed 100 characters"),

    matherContact: z
      .string({
        required_error: "Mother's contact is required",
        invalid_type_error: "Mother's contact must be a string",
      })
      .trim()
      .min(1, "Mother's contact cannot be empty")
      .max(20, "Mother's contact cannot exceed 20 characters"),

    fatherContact: z
      .string({
        required_error: "Father's contact is required",
        invalid_type_error: "Father's contact must be a string",
      })
      .trim()
      .min(1, "Father's contact cannot be empty")
      .max(20, "Father's contact cannot exceed 20 characters"),

    contact: z
      .string({
        required_error: 'Contact number is required',
        invalid_type_error: 'Contact must be a string',
      })
      .trim()
      .min(1, 'Contact number cannot be empty')
      .max(20, 'Contact number cannot exceed 20 characters'),

    blood: z
      .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
        invalid_type_error:
          'Blood group must be one of: A+, A-, B+, B-, AB+, AB-, O+, O-',
      })
      .optional(),

    permanentAddress: createAddressValidation,
    localAddress: createAddressValidation,
  }),
});

const updateNameValidation = z.object({
  firstName: z
    .string({
      invalid_type_error: 'First name must be a string',
    })
    .trim()
    .min(1, 'First name cannot be empty')
    .max(50, 'First name cannot exceed 50 characters')
    .optional(),

  middleName: z
    .string({
      invalid_type_error: 'Middle name must be a string',
    })
    .trim()
    .max(50, 'Middle name cannot exceed 50 characters')
    .optional(),

  lastName: z
    .string({
      invalid_type_error: 'Last name must be a string',
    })
    .trim()
    .min(1, 'Last name cannot be empty')
    .max(50, 'Last name cannot exceed 50 characters')
    .optional(),
});

const updateAddressValidation = z.object({
  village: z
    .string({
      invalid_type_error: 'Village must be a string',
    })
    .max(100, 'Village cannot exceed 100 characters')
    .optional(),

  postOffice: z
    .string({
      invalid_type_error: 'Post office must be a string',
    })
    .min(1, 'Post office cannot be empty')
    .max(100, 'Post office cannot exceed 100 characters')
    .optional(),

  policeStation: z
    .string({
      invalid_type_error: 'Police station must be a string',
    })
    .min(1, 'Police station cannot be empty')
    .max(100, 'Police station cannot exceed 100 characters')
    .optional(),

  town: z
    .string({
      invalid_type_error: 'Town must be a string',
    })
    .min(1, 'Town cannot be empty')
    .max(100, 'Town cannot exceed 100 characters')
    .optional(),
});

const updateStudentValidationSchema = z.object({
  student: z
    .object({
      name: updateNameValidation.optional(),
      email: z
        .string({
          invalid_type_error: 'Email must be a string',
        })
        .email('Invalid email address')
        .trim()
        .toLowerCase()
        .max(100, 'Email cannot exceed 100 characters')
        .optional(),

      gender: z
        .enum(['male', 'female', 'others'], {
          invalid_type_error:
            "Gender must be either 'male', 'female' or 'others'",
        })
        .optional(),

      age: z
        .number({
          invalid_type_error: 'Age must be a number',
        })
        .int('Age must be an integer')
        .positive('Age must be a positive number')
        .max(120, 'Age cannot exceed 120 years')
        .optional(),

      motherName: z
        .string({
          invalid_type_error: "Mother's name must be a string",
        })
        .min(1, "Mother's name cannot be empty")
        .max(100, "Mother's name cannot exceed 100 characters")
        .optional(),

      fatherName: z
        .string({
          invalid_type_error: "Father's name must be a string",
        })
        .min(1, "Father's name cannot be empty")
        .max(100, "Father's name cannot exceed 100 characters")
        .optional(),

      matherContact: z
        .string({
          invalid_type_error: "Mother's contact must be a string",
        })
        .trim()
        .min(1, "Mother's contact cannot be empty")
        .max(20, "Mother's contact cannot exceed 20 characters")
        .optional(),

      fatherContact: z
        .string({
          invalid_type_error: "Father's contact must be a string",
        })
        .trim()
        .min(1, "Father's contact cannot be empty")
        .max(20, "Father's contact cannot exceed 20 characters")
        .optional(),

      contact: z
        .string({
          invalid_type_error: 'Contact must be a string',
        })
        .trim()
        .min(1, 'Contact number cannot be empty')
        .max(20, 'Contact number cannot exceed 20 characters')
        .optional(),

      blood: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
          invalid_type_error:
            'Blood group must be one of: A+, A-, B+, B-, AB+, AB-, O+, O-',
        })
        .optional(),

      permanentAddress: updateAddressValidation.optional(),
      localAddress: updateAddressValidation.optional(),
    })
    .partial(), // Makes all properties in student object optional
});

export const studentValidations = {
  createStudentValidationsSchema,
  updateStudentValidationSchema,
};
