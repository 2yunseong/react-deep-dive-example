/// <reference types="react-scripts" />

declare namespace NodeJS {
    interface ProcessEnv {
      readonly REACT_APP_SERVER_URL: string;
      readonly NODE_ENV: 'development' | 'production' | 'test';
    }
  }
  