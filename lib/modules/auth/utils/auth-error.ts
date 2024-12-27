const errorMessages: { [key: string]: string } = {
    "auth/claims-too-large": "Custom claims payload is too large.",
    "auth/email-already-exists": "This email is already registered.",
    "auth/id-token-expired": "Your session has expired. Please sign in again.",
    "auth/id-token-revoked":
        "Your session has been revoked. Please sign in again.",
    "auth/insufficient-permission":
        "You don't have permission to perform this action.",
    "auth/internal-error":
        "An unexpected error occurred. Please try again later.",
    "auth/invalid-argument":
        "Invalid input provided. Please check and try again.",
    "auth/invalid-claims": "Invalid custom claims provided.",
    "auth/invalid-continue-uri": "The provided URL is invalid.",
    "auth/invalid-creation-time": "Invalid creation time format.",
    "auth/invalid-credential": "Invalid credentials. Please try again.",
    "auth/invalid-disabled-field": "Invalid value for disabled user property.",
    "auth/invalid-display-name": "Invalid display name. It must not be empty.",
    "auth/invalid-dynamic-link-domain":
        "Invalid or unauthorized dynamic link domain.",
    "auth/invalid-email": "Invalid email address format.",
    "auth/invalid-email-verified":
        "Invalid value for email verification status.",
    "auth/invalid-hash-algorithm": "Unsupported hash algorithm provided.",
    "auth/invalid-hash-block-size": "Invalid hash block size.",
    "auth/invalid-hash-derived-key-length": "Invalid hash key length.",
    "auth/invalid-hash-key": "Invalid hash key.",
    "auth/invalid-hash-memory-cost": "Invalid hash memory cost.",
    "auth/invalid-hash-parallelization": "Invalid hash parallelization.",
    "auth/invalid-hash-rounds": "Invalid hash rounds.",
    "auth/invalid-hash-salt-separator": "Invalid hash salt separator.",
    "auth/invalid-id-token": "Invalid ID token provided.",
    "auth/invalid-last-sign-in-time": "Invalid last sign-in time format.",
    "auth/invalid-page-token": "Invalid pagination token.",
    "auth/invalid-password": "Password must be at least six characters.",
    "auth/invalid-password-hash": "Invalid password hash.",
    "auth/invalid-password-salt": "Invalid password salt.",
    "auth/invalid-phone-number": "Invalid phone number format.",
    "auth/invalid-photo-url": "Invalid photo URL.",
    "auth/invalid-provider-data": "Invalid provider data format.",
    "auth/invalid-provider-id": "Invalid provider identifier.",
    "auth/invalid-oauth-responsetype":
        "Only one OAuth response type can be true.",
    "auth/invalid-session-cookie-duration":
        "Session duration must be between 5 minutes and 2 weeks.",
    "auth/invalid-uid": "User ID must be non-empty and up to 128 characters.",
    "auth/invalid-user-import": "Invalid user import data.",
    "auth/maximum-user-count-exceeded": "Maximum number of users exceeded.",
    "auth/missing-android-pkg-name": "Android package name is required.",
    "auth/missing-continue-uri": "A valid URL is required.",
    "auth/missing-hash-algorithm":
        "Hash algorithm is required for password imports.",
    "auth/missing-ios-bundle-id": "iOS bundle ID is missing.",
    "auth/missing-uid": "User ID is required.",
    "auth/missing-oauth-client-secret": "OAuth client secret is required.",
    "auth/operation-not-allowed": "This sign-in method is disabled.",
    "auth/phone-number-already-exists":
        "This phone number is already registered.",
    "auth/project-not-found": "No Firebase project found for the credentials.",
    "auth/reserved-claims": "Reserved claims cannot be used.",
    "auth/session-cookie-expired": "Session cookie has expired.",
    "auth/session-cookie-revoked": "Session cookie has been revoked.",
    "auth/too-many-requests": "Too many requests. Please try again later.",
    "auth/uid-already-exists": "This user ID is already registered.",
    "auth/unauthorized-continue-uri": "Unauthorized URL domain.",
    "auth/user-not-found": "User not found. Please check the details.",
};

type ErrorCode = keyof typeof errorMessages;

export function getErrorMessage(firebaseError: string): string {
    const errorCode = firebaseError
        .split("auth/")[1]
        .split(")")[0] satisfies ErrorCode;

    return errorMessages[`auth/${errorCode}`] || "An unknown error occurred.";
}
