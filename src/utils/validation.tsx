// ─── Individual field validators ──────────────────────────────────

export const validators = {
  required: (v: string) =>
    v.trim().length > 0 ? '' : 'This field is required.',

  name: (v: string) => {
    if (!v.trim()) return 'Name is required.';
    if (v.trim().length < 2) return 'Name must be at least 2 characters.';
    if (!/^[a-zA-Z\s'.'-]+$/.test(v.trim())) return 'Please enter a valid name.';
    return '';
  },

  email: (v: string) => {
    if (!v.trim()) return 'Email is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())) return 'Please enter a valid email address.';
    return '';
  },

  phone: (v: string) => {
    if (!v.trim()) return ''; // phone is optional in contact form
    const digits = v.replace(/\D/g, '');
    if (digits.length < 10) return 'Phone number must be at least 10 digits.';
    return '';
  },

  phoneRequired: (v: string) => {
    if (!v.trim()) return 'Phone number is required.';
    const digits = v.replace(/\D/g, '');
    if (digits.length < 10) return 'Phone number must be at least 10 digits.';
    return '';
  },

  password: (v: string) => {
    if (!v) return 'Password is required.';
    if (v.length < 6) return 'Password must be at least 6 characters.';
    return '';
  },

  confirmPassword: (password: string, confirm: string) => {
    if (!confirm) return 'Please confirm your password.';
    if (password !== confirm) return 'Passwords do not match.';
    return '';
  },

  message: (v: string) => {
    if (!v.trim()) return 'Message is required.';
    if (v.trim().length < 10) return 'Message is too short (min 10 characters).';
    return '';
  },

  address: (v: string) => {
    if (!v.trim()) return 'Address is required.';
    if (v.trim().length < 10) return 'Please enter your full address.';
    return '';
  },

  newsletterEmail: (v: string) => {
    if (!v.trim()) return 'Please enter your email to subscribe.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())) return 'Please enter a valid email address.';
    return '';
  },
};

// ─── Form-level helper: returns true if any errors exist ──────────
export function hasErrors(errors: Record<string, string>): boolean {
  return Object.values(errors).some((e) => e.length > 0);
}

// ─── Touch all fields (show errors on submit attempt) ─────────────
export function touchAll<T extends Record<string, boolean>>(
  fields: T,
): T {
  return Object.keys(fields).reduce(
    (acc, key) => ({ ...acc, [key]: true }),
    {} as T,
  );
}
