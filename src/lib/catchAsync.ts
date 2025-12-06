/* eslint-disable @typescript-eslint/no-explicit-any */

type AsyncFn = (...args: any[]) => Promise<any>;

const catchAsync = (fn: AsyncFn) => {
  return async (...args: any[]) => {
    try {
      return await fn(...args); // spread correctly
    } catch (error: any) {
      // Preserve Next.js redirect behavior
      if (error?.digest?.startsWith("NEXT_REDIRECT")) {
        throw error;
      }

      console.error("Error from catchAsync:", error);

      return {
        success: false,
        message: error?.message || "Unexpected server error",
      };
    }
  };
};

export default catchAsync;
