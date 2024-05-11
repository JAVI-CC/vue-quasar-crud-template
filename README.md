<p align="center"><img src="https://cdn.jsdelivr.net/gh/quasarframework/quasar-art@863c14bd/dist/svg/quasar-logo-full-inline.svg" width="400"></p>

## Quasar Crud Template (vue-quasar-crud-template)

A Quasar Crud Template

## Install the dependencies

```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

<br>
<hr>

<h2>Deploy to Docker <g-emoji class="g-emoji" alias="whale" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f433.png">🐳</g-emoji></h2>

<h4>Containers:</h4>
<ul>
<li><span>nginx:alpine3.18</span> - <code>:9000->9000/tcp</code></li>
</ul>

<h4>Containers structure:</h4>
<div class="highlight highlight-source-shell"><pre>├── vue-quasar-crud-template-app
</pre></div>

<h4>Setup</h4>
<pre>
<code>$ git clone https://github.com/JAVI-CC/vue-quasar-crud-template.git
$ cd vue-quasar-crud-template
$ cp .env.example .env.dev
$ cp .env.example .env.prod</code>
</pre>

<h4>Running mode dev:</h4>
<pre>
<code>$ docker compose up</code>
</pre>

<h4>Running mode build:</h4>
<pre>
<code>$ docker compose up -d</code>
<code>$ docker compose exec app quasar build -m pwa</code>
</pre>

<h4>Running mode prod:</h4>
<span>It is about creating a new container that contains the application once the build is done on the nginx web server listening on port <code>:85->80/tcp</code>
</span>
<div class="highlight highlight-source-shell"><pre>├── vue-quasar-crud-template-app-prod
</pre></div><pre>
<code>$ docker compose -f docker-compose.prod.yml up -d</code>
</pre>

<br>

<p>In case you are using your IDE to develop the application and it does not detect the files it contains within the <strong>node_modules folder</strong>, you have to copy the files from the node_modules folder of the container to the host machine with the following command.</p>
<pre>
<code>$ docker compose cp app:/src/node_modules .</code>
</pre>
