function normalizeApiErrorMessage(message: string): string {
  const trimmedMessage = message.trim();

  if (trimmedMessage.length === 0) {
    return "Request failed.";
  }

  const pydanticValueErrorMatch = trimmedMessage.match(
    /Value error,\s*([\s\S]+?)(?:\s*\[type=value_error|$)/,
  );

  if (pydanticValueErrorMatch?.[1]) {
    return pydanticValueErrorMatch[1].replace(/\s+/g, " ").trim();
  }

  return trimmedMessage.replace(/\s+/g, " ").trim();
}

export function getApiErrorMessage(error: unknown): string {
  if (error && typeof error === "object" && "data" in error) {
    const data = (error as { data?: unknown }).data;

    if (!data) return "Request failed.";

    // 1. Direct message
    if (
      typeof data === "object" &&
      data !== null &&
      "message" in data &&
      typeof data.message === "string"
    ) {
      return normalizeApiErrorMessage(data.message);
    }

    // 2. Error field
    if (
      typeof data === "object" &&
      data !== null &&
      "error" in data &&
      typeof data.error === "string"
    ) {
      return normalizeApiErrorMessage(data.error);
    }
    if (
      typeof data === "object" &&
      data !== null &&
      "error" in data &&
      typeof data.error === "object" &&
      data.error !== null &&
      "message" in data.error &&
      typeof data.error.message === "string"
    ) {
      return normalizeApiErrorMessage(data.error.message);
    }

    // 3. Detail
    if (
      typeof data === "object" &&
      data !== null &&
      "detail" in data &&
      typeof data.detail === "string"
    ) {
      return normalizeApiErrorMessage(data.detail);
    }

    if (
      typeof data === "object" &&
      data !== null &&
      "detail" in data &&
      Array.isArray(data.detail) &&
      typeof data.detail[0] === "object" &&
      data.detail[0] !== null &&
      "msg" in data.detail[0] &&
      typeof data.detail[0].msg === "string"
    ) {
      return normalizeApiErrorMessage(data.detail[0].msg);
    }

    // 4. Generic field errors (IMPORTANT FIX)
    if (typeof data === "object" && data !== null && !Array.isArray(data)) {
      for (const key in data) {
        const value = (data as Record<string, unknown>)[key];

        if (Array.isArray(value) && typeof value[0] === "string") {
          return normalizeApiErrorMessage(value[0]); // return first field error
        }
      }
    }

    // 5. Array response
    if (Array.isArray(data) && typeof data[0] === "string") {
      return normalizeApiErrorMessage(data[0]);
    }

    // 6. Fallback (better debugging)
    try {
      return JSON.stringify(data);
    } catch {
      return "Request failed.";
    }
  }

  return "Request failed.";
}
