declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      CLOUDFLARE_API_KEY: string;
      CLOUDFLARE_WORKER_DOMAIN: string;
      // add more environment variables and their types here
    }
  }
}

export {};
