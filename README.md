# json-sync-server
Simple ExpressJS HTTP server that allows all clients to sync (read or update) a single JSON object. This came up while developing a browser extension that needs to sync its settings between clients without having the server care about the underlying structure of the configuration. This is intended for development purposes and is about the most basic implementation imaginable. We write to a plaintext file whenever the object is updated. As far as exposing this over the internet is concerned, there's some very rudimentary auth here that combined with HTTPS and rate limiting using a reverse proxy suffices for my needs (although I'm using this to sync not particulary sensitive data on a throwaway server, so make of that what you will).

## Usage

```
git clone https://github.com/lloydeverett/json-sync-server.git
cd json-sync-server
echo "YOUR_AUTH_TOKEN" > token # Any long random string, e.g. generated from a password manager. This never expires.
echo "{}" > object # JSON object you want to sync.
npm install
npm run start # or start-dev for development mode
```

You should then see something like

```
Listening on http://127.0.0.1:5900
```

You can change the port by editing `index.js`.

## API

We can read and update like this

```
URL=localhost:5900
TOKEN=`cat token`

curl --header "X-Auth-Token: ${TOKEN}" \
  -v \
  $URL

curl --header "Content-Type: application/json" \
  --header "X-Auth-Token: ${TOKEN}" \
  --request POST \
  --data '{"username":"xyz","password":"xyz"}' \
  -v \
  $URL
```

...and that's it!

