import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideHotToastConfig } from '@ngneat/hot-toast';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHotToastConfig(),
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'credentials-f83d6',
          appId: '1:785495119444:web:a5b47035fce15cdc653fc1',
          storageBucket: 'credentials-f83d6.appspot.com',
          apiKey: 'AIzaSyAiTk4alZNyZK1XnZexyupEUGeFySa241Y',
          authDomain: 'credentials-f83d6.firebaseapp.com',
          messagingSenderId: '785495119444',
        })
      )
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
  ],
};
