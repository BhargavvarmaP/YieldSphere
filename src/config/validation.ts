export const VALIDATION_RULES = {
  // Auth validation rules
  AUTH: {
    EMAIL: {
      required: 'Email is required',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Invalid email address',
      },
    },
    PASSWORD: {
      required: 'Password is required',
      minLength: {
        value: 8,
        message: 'Password must be at least 8 characters',
      },
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
      },
    },
    CONFIRM_PASSWORD: {
      required: 'Please confirm your password',
      validate: (value: string, formValues: { password: string }) =>
        value === formValues.password || 'Passwords do not match',
    },
    NAME: {
      required: 'Name is required',
      minLength: {
        value: 2,
        message: 'Name must be at least 2 characters',
      },
    },
  },

  // Portfolio validation rules
  PORTFOLIO: {
    NAME: {
      required: 'Portfolio name is required',
      minLength: {
        value: 3,
        message: 'Portfolio name must be at least 3 characters',
      },
    },
    DESCRIPTION: {
      maxLength: {
        value: 500,
        message: 'Description cannot exceed 500 characters',
      },
    },
    AMOUNT: {
      required: 'Amount is required',
      min: {
        value: 0,
        message: 'Amount must be greater than 0',
      },
    },
  },

  // Investment validation rules
  INVESTMENT: {
    AMOUNT: {
      required: 'Investment amount is required',
      min: {
        value: 0,
        message: 'Investment amount must be greater than 0',
      },
    },
    ASSET: {
      required: 'Asset selection is required',
    },
    QUANTITY: {
      required: 'Quantity is required',
      min: {
        value: 0,
        message: 'Quantity must be greater than 0',
      },
    },
  },

  // Risk assessment validation rules
  RISK: {
    TOLERANCE: {
      required: 'Risk tolerance selection is required',
    },
    HORIZON: {
      required: 'Investment horizon is required',
    },
    INCOME: {
      required: 'Income information is required',
      min: {
        value: 0,
        message: 'Income must be greater than 0',
      },
    },
  },

  // Profile validation rules
  PROFILE: {
    PHONE: {
      pattern: {
        value: /^\+?[1-9]\d{1,14}$/,
        message: 'Invalid phone number',
      },
    },
    ADDRESS: {
      minLength: {
        value: 10,
        message: 'Address must be at least 10 characters',
      },
    },
    COUNTRY: {
      required: 'Country selection is required',
    },
  },
};

export const validateField = (
  value: any,
  rules: Record<string, any>,
  formValues?: Record<string, any>
) => {
  for (const [rule, config] of Object.entries(rules)) {
    switch (rule) {
      case 'required':
        if (!value) return config;
        break;
      case 'minLength':
        if (value.length < config.value) return config.message;
        break;
      case 'maxLength':
        if (value.length > config.value) return config.message;
        break;
      case 'pattern':
        if (!config.value.test(value)) return config.message;
        break;
      case 'min':
        if (Number(value) < config.value) return config.message;
        break;
      case 'max':
        if (Number(value) > config.value) return config.message;
        break;
      case 'validate':
        if (typeof config === 'function') {
          const result = config(value, formValues || {});
          if (result !== true) return result;
        }
        break;
    }
  }
  return true;
};
