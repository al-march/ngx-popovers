import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import hljs from 'highlight.js/lib/core';
import ts from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import bash from 'highlight.js/lib/languages/bash';

hljs.registerLanguage('typescript', ts);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('bash', bash);

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
