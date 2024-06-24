# 🧱 Building Blocks

Here's an explanation of all of the scripts in package.json.

- **lint** - This a quick linting commmand that should help you make sure that when you do a pull request that all of the code that you've added is lint compliant.

```
npm run lint
```

---

- **tsc:build** - This is a helper function that you should not use. All it does is convert the TypeScript files into JavaScript files.

```
npm run tsc:build
```

---

- **webpack:dev** - This is a helper function that you should not use. All it does is uses the webpack config to create one script.

```
npm run webpack:dev
```

---

- **webpack:prod** - This is a helper function that you should not use. All it does is uses the webpack config to minify and create one script with a source map.

```
npm run webpack:prod
```

---

- **build:dev** - This is the script you should use to develop the framework. The test file is located in public. If you notice this build script uses another config. This config is used just for hot loading the files. (This is not working at the moment.)

```
npm run build:dev
```

---

- **build:prod** - This is a script you should use when you want to release this framework into the wild.

```
npm run build:prod
```

---

## 🧑🏽‍💻 Development Procedure

So this has a bit of a weird development structure. I'm still working on the scripts and the procedure, but this works for now.

Run the build command for development.

```
npm run build:dev
```

Then run the unused commmand in the package.

```
npm run unused
```

When you update anything in the public folder, all you have to do is refresh the page. However if you update something in the src folder then you will have to stop the current process in the terminal. (^c)

Then you will have to run the build:dev command. Then right after you can run the unused command. This will get you testing out the framework.

There's a couple things to note:

- Because the build:dev command has `rm -r ./dist` in it, if you don't have a dist folder then you will have to make a dist folder so that it can have something to delete.
- In `./public/index/html` you'll see this:

```
        <div id="items" style="display: none;">
            <img id="title" src="./walk/title.jpg" />
            <img id="dvd" src="./walk/dvd.png" />
            <img id="clouds" src="./walk/clouds.jpg" />
        </div>
```

This is here because when using webpack to watch the public folder it renames all of the files or removes them from their folders. Also if you don't declare all of the files you're using in the localhoast then those files will not be available.
