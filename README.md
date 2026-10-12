# Life Saver — Automatic Traffic Alert Demo

## What's new
This prototype automatically triggers the simulated roadside display when a demo ambulance progresses into the warning zone of each registered demo junction. It clears the alert after the ambulance passes the junction.

## Run it
1. Extract the ZIP.
2. Open `index.html` in a modern browser.
3. Select **Start ambulance trip**.
4. Watch the route progress, junction statuses, display preview, and activity log.

## Important limitation
This is a frontend simulation. The route progress is simulated, and no real ambulance, hospital, GPS tracking service, traffic controller, or roadside display receives a message.

## What a real implementation needs
- An authenticated ambulance app/device providing live GPS and trip status.
- A backend service that map-matches the ambulance to its approved route and detects upcoming registered junctions using geofencing.
- A registry of roadside display devices and secure communications (for example HTTPS or MQTT over TLS).
- Message acknowledgements, duplicate suppression, timestamps, expiry, audit logs, and automatic cancellation after passing or trip cancellation.
- Approval and integration from the responsible traffic authority and display-system operator.

The display-alert feature should only operate on approved informational displays. Do not connect this prototype to traffic-light control circuits or alter signal phases. Any actual traffic-signal priority must be implemented and tested by the authorized traffic-system operator.
