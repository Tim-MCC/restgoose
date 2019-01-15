# Restgoose
Model-driven REST API framework

[![npm version](https://img.shields.io/npm/v/%40xureilab%2Frestgoose.svg)](https://www.npmjs.com/package/@xureilab/restgoose)
[![wercker status](https://app.wercker.com/status/8ae5627cc2fb406638c44d6784b02815/s/master "wercker status")](https://app.wercker.com/project/byKey/8ae5627cc2fb406638c44d6784b02815)
[![codecov](https://codecov.io/gh/xurei/restgoose/branch/master/graphs/badge.svg)](https://codecov.io/gh/xurei/restgoose)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/91cdb5b6e3444a7b91949a022bf650f2)](https://www.codacy.com/app/xurei/restgoose?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=xurei/restgoose&amp;utm_campaign=Badge_Grade)

[![CII Best Practices](https://img.shields.io/cii/summary/2181.svg)](https://bestpractices.coreinfrastructure.org/projects/2181)
[![npms score](https://badges.npms.io/%40xureilab%2Frestgoose.svg)](https://npms.io/search?q=%40xureilab%2Frestgoose)

[![wercker status](https://app.wercker.com/status/8ae5627cc2fb406638c44d6784b02815/m/master "wercker status")](https://app.wercker.com/project/byKey/8ae5627cc2fb406638c44d6784b02815)


#### MongoDB + Typegoose + Restgoose = ❤️️

Restgoose exposes your MongoDB database through a REST API with ease. 
It is driven by the model itself, which reduces the boilerplate code necessary to write simple endpoints.
It is open for extension, so you can add complex logic easily too.

## Installation

```
npm install @xureilab/restgoose
```

## Minimal usage
This creates the typical CRUD endpoints on a model : 
```typescript
import { prop, Typegoose } from 'typegoose';
import { all, create, one, remove, rest, update } from '@xureilab/restgoose';

@rest({
    route: '/todos',
    methods: [
        all(), // GET /todos
        one(), // GET /todos/:id
        create(), // POST /todos
        update(), // PATCH /todos/:id
        remove(), // DELETE /todos/:id
    ],
})
export class Todo extends Typegoose {
    @prop({required: true})
    name: string;
}

export const TodoModel = new Todo().getModelForClass(Todo);
```
See the full example (with express/mongoose boilerplates) [in the examples directory](./examples)

Check out [the docs](docs/index.md) for details. 

## The Philosophy behind Restgoose
Restgoose takes its inspiration from Typegoose and Loopback.
We also had some objectives in mind while writing Restgoose :
- Simple, common behaviors should be really easy to write,
- The framework should follow a RESTful design,
- The framework should be simple to add in an existing project,
- While promoting some best practices, the framework should let the user add 
  complex endpoints without Restgoose if necessary
- The framework should be small and provide as little middlewares as necessary. 
  Plugins will be created for better cherry-picking. 

