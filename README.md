# brologer

A simple logging library

# Installation

Npm
```javascript
npm install brologger-elasticsearch
```

Yarn
```javascript
yarn add brologger-elasticsearch
```

# Support

This library is quite fresh, and maybe has bugs. Write me an **email** to *natashkinsash@gmail.com* and I will fix the bug in a few working days.

# Quick start

```javascript
    import Loger from 'brolloger';
    import ESTransport from 'brologger-elasticsearch';

    const client = new elasticsearch.Client({
        host: "URL",
    });
    const transport = new ESTransport({ indexPrefix: 'development', client })
    const logger = new Loger({transports: [transport]});
   
```

# TypesScript

This library have typing in module.