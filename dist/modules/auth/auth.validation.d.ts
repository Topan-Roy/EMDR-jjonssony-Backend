import { z } from 'zod';
export declare const signupSchema: z.ZodObject<{
    body: z.ZodEffects<z.ZodObject<{
        firstName: z.ZodString;
        lastName: z.ZodString;
        email: z.ZodString;
        password: z.ZodString;
        confirmPassword: z.ZodString;
        isAcceptPrivacyStatement: z.ZodEffects<z.ZodBoolean, boolean, boolean>;
    }, "strip", z.ZodTypeAny, {
        email: string;
        firstName: string;
        lastName: string;
        password: string;
        isAcceptPrivacyStatement: boolean;
        confirmPassword: string;
    }, {
        email: string;
        firstName: string;
        lastName: string;
        password: string;
        isAcceptPrivacyStatement: boolean;
        confirmPassword: string;
    }>, {
        email: string;
        firstName: string;
        lastName: string;
        password: string;
        isAcceptPrivacyStatement: boolean;
        confirmPassword: string;
    }, {
        email: string;
        firstName: string;
        lastName: string;
        password: string;
        isAcceptPrivacyStatement: boolean;
        confirmPassword: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        email: string;
        firstName: string;
        lastName: string;
        password: string;
        isAcceptPrivacyStatement: boolean;
        confirmPassword: string;
    };
}, {
    body: {
        email: string;
        firstName: string;
        lastName: string;
        password: string;
        isAcceptPrivacyStatement: boolean;
        confirmPassword: string;
    };
}>;
export declare const loginSchema: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodString;
        password: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        email: string;
        password: string;
    }, {
        email: string;
        password: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        email: string;
        password: string;
    };
}, {
    body: {
        email: string;
        password: string;
    };
}>;
export declare const verifyOtpSchema: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodString;
        otp: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        email: string;
        otp: string;
    }, {
        email: string;
        otp: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        email: string;
        otp: string;
    };
}, {
    body: {
        email: string;
        otp: string;
    };
}>;
export declare const resendOtpSchema: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        email: string;
    }, {
        email: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        email: string;
    };
}, {
    body: {
        email: string;
    };
}>;
export declare const forgotPasswordSchema: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        email: string;
    }, {
        email: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        email: string;
    };
}, {
    body: {
        email: string;
    };
}>;
export declare const recoverAccountSchema: z.ZodObject<{
    body: z.ZodEffects<z.ZodObject<{
        newPassword: z.ZodString;
        confirmPassword: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        newPassword: string;
        confirmPassword: string;
    }, {
        newPassword: string;
        confirmPassword: string;
    }>, {
        newPassword: string;
        confirmPassword: string;
    }, {
        newPassword: string;
        confirmPassword: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        newPassword: string;
        confirmPassword: string;
    };
}, {
    body: {
        newPassword: string;
        confirmPassword: string;
    };
}>;
export declare const sendVerificationOTPSchema: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodString;
        otp: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        email: string;
        otp?: string | undefined;
    }, {
        email: string;
        otp?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        email: string;
        otp?: string | undefined;
    };
}, {
    body: {
        email: string;
        otp?: string | undefined;
    };
}>;
export declare const verifyEmailWithTokenSchema: z.ZodObject<{
    body: z.ZodObject<{
        otp: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        otp: string;
    }, {
        otp: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        otp: string;
    };
}, {
    body: {
        otp: string;
    };
}>;
export declare const logoutSchema: z.ZodObject<{
    body: z.ZodObject<{
        refreshToken: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        refreshToken: string;
    }, {
        refreshToken: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        refreshToken: string;
    };
}, {
    body: {
        refreshToken: string;
    };
}>;
export declare const refreshTokenSchema: z.ZodObject<{
    body: z.ZodObject<{
        refreshToken: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        refreshToken: string;
    }, {
        refreshToken: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        refreshToken: string;
    };
}, {
    body: {
        refreshToken: string;
    };
}>;
export declare const googleAuthSchema: z.ZodObject<{
    body: z.ZodObject<{
        idToken: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        idToken: string;
    }, {
        idToken: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        idToken: string;
    };
}, {
    body: {
        idToken: string;
    };
}>;
//# sourceMappingURL=auth.validation.d.ts.map