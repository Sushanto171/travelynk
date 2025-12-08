/* eslint-disable @typescript-eslint/no-explicit-any */
export const catchAsyncAction = <S, P extends any[],>(fn: (state: S | null, ...payload: P) => Promise<any>
) => {
  return async (
    state: S | null,
    ...payload: P
  ): Promise<any> => {
    try {
      return await fn(state, ...payload)
    } catch (error: any) {
      console.log("Error from catchAsyncAction");
      if (error?.digest?.startsWith("NEXT_REDIRECT")) {
        throw error;
      }
      return {
        success: false,
        message: error?.message ?? "Something went wrong!"
      } as S
    }
  }
}
