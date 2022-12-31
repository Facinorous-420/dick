<br>
<p align="center">
  <a href="assets/dick_example_2.png">
    <img src="assets/dick_example_2.png" alt="Login">
  </a>
  <details align="center">
  <summary>Profile Preview</summary>
    <a href="assets/dick_example_1.png">
    <img src="assets/dick_example_1.png" alt="Profile">
  </a>
  </details>

  <h1 align="center">DICK</h1>

  <h2 align="center">Directly Integrated Client for Keisters</h2>

  <p align="center">
    The main repository for DICK, a frontend for <a href="https://github.com/tycrek/ass">ass</a>.
    <br>
    <br>
    <a href="https://github.com/facinorous-420/dick/issues">Report Bug</a>
    &bull;
    <a href="https://github.com/facinorous-420/dick/issues">Request Feature</a>
  </p>
</p>

<!-- Table of Contents -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#running-the-dashboard">Running The Dashboard</a>
      <ul>
        <li><a href="#config">Config</a></li>
          <ul>
            <li><a href="#development">Starting Development</a></li>
            <li><a href="#production">Starting Production</a></li>
          </ul>
        </ul>
    </li>
    <li>
      <a href="#contributing">Contributing</a>
    </li>
  </ol>
</details>


## About The Project

DICK was created to be an easy to use frontend for [ass](https://github.com/tycrek/ass) as there was no public option to allow users to view their saved images on their server. I decided to learn tailwind and also at the same time build this. I did this all in my spare time, and will keep updating as best as I can while I use it. I'm still learning all this so if anyone has suggestions on how to do things better, I am all ears!

**Current Features:**
1. General statistics on your file uploads
2. File browser, allows you to see all your uploads on one webpage
3. Deletion of items
4. Copy link of items
5. Customize DICK (completely white label)
6. Register new ASS users
7. hCaptcha on login and register pages <a href="https://www.hcaptcha.com/">You can learn more here</a>.

**Planned Features:**
1. There are a lot of good ideas out there, to keep track of what is currently planned see <a href="https://github.com/users/Facinorous-420/projects/2">the project board</a>

The frontend is built using <a href="https://tailwindcss.com">Tailwind CSS</a>, <a href="https://lucide.dev/">Lucide Icons</a>, as well as hand crafted components all templated using <a href="https://ejs.co/">EJS</a>. I plan to eventually rewrite this in React.

The backend is written in <a href="https://www.typescriptlang.org/">TypeScript</a>, utilizing <a href="https://expressjs.com/">ExpressJS</a>.

## Running The Dashboard

Running DICK is very simple, though there is no docker container.<br/>
You must have `Node >=v16.14.0`, which you should if you're running ASS.<br/>
**NOTE:** DICK requires you to use JSON for ASS' data storage method.

### Config

Inside of your DICK root folder, you will see `src/constants.ts.example`. Copy this to `constants.ts`<br/>
Inside this file, is some basic configuration you can change for your set up. There are only 5 variables you need to worry about in this file:

| Variable | Description |
|:-:|:-:|
| `ASS_DOMAIN = "127.0.0.1:40115"` | Put this to your ASS domain. Can be an ip, or domain for example `https://cdn.mydomain.com` |
| `ASS_LOCATION = "../ass"` | If running DICK seperately, DICK will use this to find your ASS install folder. Leave this alone if using Docker. |
| `ASS_SECURE = false` | Put this to true if you are running ASS behind a domain with HTTPS. Keep at the default `false`, if you are using HTTP. |
| `PORT = "3000"` | Change this number to the port you wish DICK to run on. Leave this alone if using Docker. |

> **Note**
> If you want to set a user as admin, currently you must do it via the database file generated at `/src/database/users.json` and change the users role from `user` to `admin`. By default, the first user to login to your dick instance will be admin.

### Running

#### Development

<details>
    <summary>
      <sub>Open to view the development set up steps</sub>
    </summary>

  1. Create a folder, call it whatever you wish
  2. Install, and run ASS https://github.com/tycrek/ass#installation (This will create an `ass` folder) 
  3. Go back into the folder you created and clone this repo `git clone https://github.com/Facinorous-420/dick`
  4. Go into the newly created `dick` folder `cd dick`
  5. Go into `/src` and copy `constants.ts.example` to `constants.ts` and edit it as needed
  6. Go back to the root of `dick` and install the dependancies for the frontend, `npm i`
  7. Run `npm run build:dev` to compile the code base in watch mode
  8. In a new terminal, run `npm run serve:dev` to run DICK using nodemon
</details>
  
#### Production
<details>
    <summary>
      <sub>Open to view the docker production set up steps</sub>
    </summary><br>

  1. Create a folder, call it whatever you wish
  2. Install, and run ASS https://github.com/tycrek/ass#installation (This will create an `ass` folder) 
  3. Go back into the folder you created and clone this repo `git clone https://github.com/Facinorous-420/dick.git`
  4. Go into the newly created `dick` folder `cd dick`
  5. Go into `/src` and copy `constants.ts.example` to `constants.ts` and edit it as needed
  6. Go back to the root of `dick` and edit the `docker-compose.yml` to match your specific needs by changing the port, and voluime location where your ass files are on your system.
  7. Run the docker compose file `docker-compose up -d` this will create a new container named `dick`.
</details>

<details>
    <summary>
      <sub>Open to view the source production set up steps</sub>
    </summary><br>

  1. Create a folder, call it whatever you wish
  2. Install, and run ASS https://github.com/tycrek/ass#installation (This will create an `ass` folder) 
  3. Go back into the folder you created and clone this repo `git clone https://github.com/Facinorous-420/dick.git`
  4. Go into the newly created `dick` folder `cd dick`
  5. Go into `/src` and copy `constants.ts.example` to `constants.ts` and edit it as needed
  6. Go back to the root of `dick` and install the dependancies for the frontend, `npm i`
  7. Run `npm start` to compile the code base and run DICK
</details>

When you approach the login screen, the login information is your ASS username, and the secret key generated by ASS is your password.
The first user to login will be added to the instance admin list.

> **Note**
> ```ASS and the dashboard will be under their own ports.```<br>
> <sub> They will have entirely different routing, and ports. ASS will be running under it's port of `40115` whereas the dashboard will be under the port `3000`. This means you can use two different domains for each, such as `cdn.yourdomain.com` for ASS and `dashboard.yourdomain.com` for DICK.</sub>

### Customizing

App settings ware available through the admin page. This is where a user can whitelabel their DICK instance.

| Variable | Description |
|:-:|:-:|
| `App Emoji` | This will allow you to change the emoji you see around the instance, by default it is an eggplant. 🍆 |
| `App Logo` | This is the app image shown various places in DICK. |
| `App Name` | This will replace all the **DICK** occurrences around the app. |
| `Default Profile Picture` | This is the default image set as users profile pictures. |
| `hCaptcha Enabled` | If enabled, your instance will use hCaptcha for the login and register pages, if disabled it will only send failed logins to a Rick Roll. |
| `hCaptcha Secret Key` | This is the hCaptcha secret key found in your hCaptcha account if you plan to use hCaptcha as captcha to protect your DICK instance. |
| `hCaptcha Site ID` | This is the hCaptcha site id if you plan to use hCaptcha as captcha to protect your DICK instance. |
| `Login Text` | This text is the text on the login screen, above the form. |
| `Private Mode` | If set, this will hide the global instance stats shown on the login page. |
| `Registrations Enabled` | If set, this will allow people to use the register page to create new accounts. |
| `Site Description` | This text is the description text on the embed when you link the DICK dashboard **NOT** to be confused with ASS' picture embeds. |
| `Site Title` | This is the text that shows up in browser tabs, as well as the title for the embed when you link the DICK dashboard **NOT** to be confused with ASS' picture embeds. |

## Contributing

<sub>If you are using Visual Studio Code, I'd recommend using this extension: https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github</sub>

1. [Fork](https://github.com/facinorous-420/dick/fork) the project
2. Create your feature branch (`git checkout -b feature/amazing`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing`)
5. Open a pull request
