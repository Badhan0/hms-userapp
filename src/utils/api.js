const BASE_URL = 'http://192.168.1.15:5000/api/auth'; // Using Android Emulator default for localhost

export const API_ENDPOINTS = {
  LOGIN: `${BASE_URL}/login`,
  SIGNUP: `${BASE_URL}/signup`,
  REQUEST_OTP: `${BASE_URL}/request-otp`,
  VERIFY_OTP: `${BASE_URL}/verify-otp`,
  RESET_PASSWORD: `${BASE_URL}/reset-password`,
};

const apiRequest = async (endpoint, method, body = null) => {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(endpoint, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Medical Security Breach Detected');
    }

    return data;
  } catch (error) {
    console.error(`[API-ERROR] at ${endpoint}:`, error);
    throw error;
  }
};

export const hmsAuth = {
  login: (credentials) => apiRequest(API_ENDPOINTS.LOGIN, 'POST', credentials),
  signup: (userData) => apiRequest(API_ENDPOINTS.SIGNUP, 'POST', userData),
  requestOTP: (email) => apiRequest(API_ENDPOINTS.REQUEST_OTP, 'POST', { email }),
  verifyOTP: (email, otp) => apiRequest(API_ENDPOINTS.VERIFY_OTP, 'POST', { email, otp }),
  resetPassword: (email, newPassword) => apiRequest(API_ENDPOINTS.RESET_PASSWORD, 'POST', { email, newPassword }),
};
