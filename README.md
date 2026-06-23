# WEB103 Project 3 - UnityGrid Plaza

Submitted by: **xyin20**

About this web app: **UnityGrid Plaza is a virtual community space where users can explore an illustrated venue map, select a location, and view upcoming events pulled from a PostgreSQL-backed API.**

Time spent: **4** hours

## Required Features

The following **required** functionality is completed:

- [x] **The web app uses React to display data from the API**
- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured Events table**
  - [ ] **NOTE: Your walkthrough added to the README must include a view of your Render dashboard demonstrating that your Postgres database is available**
  - [ ] **NOTE: Your walkthrough added to the README must include a demonstration of your table contents. Use the psql command 'SELECT * FROM tablename;' to display your table contents.**
- [x] **The web app displays a title.**
- [x] **Website includes a visual interface that allows users to select a location they would like to view.**
  - [x] *Note: A non-visual list of links to different locations is insufficient.*
- [x] **Each location has a detail page with its own unique URL.**
- [x] **Clicking on a location navigates to its corresponding detail page and displays list of all events from the `events` table associated with that location.**

The following **optional** features are implemented:

- [x] An additional page shows all possible events
  - [ ] Users can sort *or* filter events by location.
- [x] Events display a countdown showing the time remaining before that event
  - [x] Events appear with different formatting when the event has passed (ex. negative time, indication the event has passed, crossed out, etc.).

The following **additional** features are implemented:

- [x] Added API services for locations and events to keep frontend data fetching organized.
- [x] Added loading and error states for event/location API requests.
- [x] Added a database setup script that creates and seeds the `locations` and `events` tables.
- [x] Added API routes for all events, individual events, all locations, individual locations, and events by location.

## Video Walkthrough

Here's a walkthrough of implemented required features:

<!-- Replace this placeholder after recording the walkthrough. The final walkthrough should show the app, the Render Postgres dashboard, and table contents using SELECT * FROM locations; and SELECT * FROM events;. -->

<img src='http://i.imgur.com/link/to/your/gif/file.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with ScreenToGif

## Notes

The backend now uses Express routes and controllers to query a Render PostgreSQL database. The database credentials are stored locally in `server/.env`, which is intentionally ignored by Git so secrets are not committed.

The main challenge was connecting the starter React pages to real API responses because some starter files referenced services and helpers that were not present yet. The app now fetches locations and events from the database-backed API instead of relying on hardcoded page data.

## License

Copyright 2026 xyin20

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
