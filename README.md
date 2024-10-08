<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

E-Commerce Platform
This is a full-featured e-commerce platform built using NestJS, TypeORM, PostgreSQL, GraphQL, WebSocket, and React. It provides a complete shopping experience with product management, cart, checkout, and payment gateway integration.

## Features

User Authentication and Authorization: Users can register, log in, and access restricted areas based on roles.
Product Listing and Search: Products can be listed, searched, and filtered by categories.
Shopping Cart: Users can add products to the cart, view the cart, and proceed to checkout.
Order Management: Allows users to place orders and administrators to manage them.
Payment Gateway Integration: Stripe (or another service) is used to handle payments securely.
Admin Dashboard: Administrators can manage products, users, and orders.
Real-time Inventory Updates: Using WebSocket, inventory is updated in real time as products are purchased or modified.
File Upload (Images): Products can have images uploaded using GraphQL file uploads.

## Tech Stack

NestJS
TypeORM (with PostgreSQL)
GraphQL
WebSocket
Stripe API
Cloudinary for image storage

## Database:

PostgreSQL

## project testing

<img src="https://res.cloudinary.com/dmkicbywv/image/upload/v1725534269/images/namkxwrywjoxmbsfk7kj.png" alt="NPM Version" />
<img src="https://res.cloudinary.com/dmkicbywv/image/upload/v1725534470/images/z31aoqdgdhmb3lpykn54.png" alt="NPM Version" />
<img src="https://res.cloudinary.com/dmkicbywv/image/upload/v1725534533/images/z7bbgxerdvebxtnhvbak.png" alt="NPM Version" />
<img src="https://res.cloudinary.com/dmkicbywv/image/upload/v1725534731/images/e9a42waj04asgycwv3gb.png" alt="NPM Version" />

## Containerization:

Docker with Docker Compose (for MySQL/ PostgreSQL)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
