type AckPayload<Data = unknown> = {
  error?: unknown;
  data?: Data;
};

export default AckPayload;
