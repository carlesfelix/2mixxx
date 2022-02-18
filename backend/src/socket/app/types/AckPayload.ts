type AckPayload<Data = unknown> = {
  error?: unknown;
  data?: Data;
  status: 'OK' | 'FAILED'
};

export default AckPayload;
