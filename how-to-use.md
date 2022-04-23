# 👨💻 Quick start

{% hint style="success" %}
If you want to make your life easy use [create-react-app](https://create-react-app.dev) and start from one of the template repos:

* [keycloakify-demo-app with CSS only configuration](https://github.com/garronej/keycloakify-demo-app).
* [keycloakify-demo-app with component level configuration](https://github.com/garronej/keycloakify-demo-app/tree/look\_and\_feel).
{% endhint %}

### Setting up the build tool

```bash
yarn add keycloakify @emotion/react
```

[`package.json`](https://github.com/garronej/keycloakify-demo-app/blob/main/package.json)

```json
"scripts": {
    "keycloak": "yarn build && build-keycloak-theme",
}
```

```bash
yarn keycloak # generates the keycloak-theme.jar
```

On the console will be printed all the instructions about how to load the generated theme in Keycloak

{% tabs %}
{% tab title="CSS Only customization" %}
The first approach is to only customize the style of the default Keycloak login theme by providing your own class names.

{% hint style="info" %}
The keycloakify components are a plain React translation of the default theme that comes with Keycloak v11.0.3. &#x20;

You can download the FTL/CSS source files the components are based on with the following command `npx -p keycloakify download-builtin-keycloak-theme` and selecting version 11.0.3.
{% endhint %}

`src/index.tsx`

```tsx
import { KcApp, defaultKcProps, getKcContext } from "keycloakify";
//We assume the file contains: ".my-class { color: red; }"
import "./index.css";

const { kcContext } = getKcContext();

if( kcContex === undefined ){
    throw new Error(
        "This app is a Keycloak theme" +
        "It isn't meant to be deployed outside of Keycloak"
    );
}

reactDom.render(
    <KcApp
        kcContext={kcContext}
        {...{
            ...defaultKcProps,
            "kcHeaderWrapperClass": "my-class",
        }}
    />,
    document.getElementById("root"),
);
```

The above snippet of code assumes you are in a react project wich only purpose is to be a Keycloak theme.

But if you want to make your keycloak theme an integral part of a preexisting React app you would apply the following modification to the above snipet:

```diff
+import { App } from "<you know where";
 import { KcApp, defaultKcProps, getKcContext } from "keycloakify";
 import "./index.css";

 const { kcContext } = getKcContext();

-if( kcContex === undefined ){
-    throw new Error(
-        "This app is a Keycloak theme" +
-        "It isn't meant to be deployed outside of Keycloak"
-    );
-}

 reactDom.render(
+    kcContext === undefined ?
+        <App /> :
         <KcApp
             kcContext={kcContext}
             {...{
                 ...defaultKcProps,
                 "kcHeaderWrapperClass": myClassName,
             }}
         />,
     document.getElementById("root"),
);
```

![Result: MYREALM is red](https://user-images.githubusercontent.com/6702424/114326299-6892fc00-9b34-11eb-8d75-85696e55458f.png)

#### Real world example

To give you an idea of what you can already achieve by only customizing the style the style,

Here is [**the code**](https://github.com/InseeFrLab/onyxia-web/blob/012639d62327a9a56be80c46e32c32c9497b82db/src/app/components/KcApp.tsx) that produces:&#x20;

![Results obtained with CSS only customization of the default theme](https://github.com/InseeFrLab/keycloakify/releases/download/v0.3.8/keycloakify\_after.gif)
{% endtab %}

{% tab title="Component level customization" %}
If you want to go beyond only customizing the CSS you can re-implement some of the pages or even add new ones.

If you want to go this way checkout the demo setup provided [here](https://github.com/garronej/keycloakify-demo-app/tree/look\_and\_feel). If you prefer a real life example you can checkout [onyxia-web's source](https://github.com/InseeFrLab/onyxia-web/tree/main/src/ui/components/KcApp). The web app is in production [here](https://datalab.sspcloud.fr).

Main takeaways are:

* You must declare your custom pages in the package.json. [example](https://github.com/garronej/keycloakify-demo-app/blob/4eb2a9f63e9823e653b2d439495bda55e5ecc134/package.json#L17-L22)
* (TS only) You must declare theses page in the type argument of the getter function for the `kcContext` in order to have the correct typings. [example](https://github.com/garronej/keycloakify-demo-app/blob/4eb2a9f63e9823e653b2d439495bda55e5ecc134/src/KcApp/kcContext.ts#L16-L21)
* (TS only) If you use Keycloak plugins that defines non standard `.ftl` values (Like for example [this plugin](https://github.com/micedre/keycloak-mail-whitelisting) that define `authorizedMailDomains` in `register.ftl`) you should declare theses value to get the type. [example](https://github.com/garronej/keycloakify-demo-app/blob/4eb2a9f63e9823e653b2d439495bda55e5ecc134/src/KcApp/kcContext.ts#L6-L13)
* You should provide sample data for all the non standard value if you want to be able to debug the page outside of keycloak. [example](https://github.com/garronej/keycloakify-demo-app/blob/4eb2a9f63e9823e653b2d439495bda55e5ecc134/src/KcApp/kcContext.ts#L28-L43)
{% endtab %}
{% endtabs %}

####

#### Hot reload

Rebuild the theme each time you make a change to see the result is not practical. If you want to test your login screens outside of Keycloak you can mock a given `kcContext`:

```tsx
import {
    KcApp,
    defaultKcProps,
    getKcContext
} from "keycloakify";

const { kcContext } = getKcContext({
    "mockPageId": "login.ftl"
});

reactDom.render(
        <KcApp
            kcContext={kcContextMocks.kcLoginContext}
            {...defaultKcProps}
        />
    document.getElementById("root")
);
```

Then `yarn start`, you will see your login page.

Checkout [this concrete example](https://github.com/garronej/keycloakify-demo-app/blob/main/src/index.tsx)

### Enable loading in a blink of an eye of login pages ⚡ (--external-assets)

By default the theme generated is standalone. Meaning that when your users reach the login pages all scripts, images and stylesheet are downloaded from the Keycloak server.\
If you are specifically building a theme to integrate with an app or a website that allows users to first browse unauthenticated before logging in, you will get a significant performance boost if you jump through those hoops:

* Provide the url of your app in the `homepage` field of package.json. [ex](https://github.com/garronej/keycloakify-demo-app/blob/7847cc70ef374ab26a6cc7953461cf25603e9a6d/package.json#L2) or in a `public/CNAME` file. [ex](https://github.com/garronej/keycloakify-demo-app/blob/main/public/CNAME).
* Build the theme using `npx build-keycloak-theme --external-assets` [ex](https://github.com/garronej/keycloakify-demo-app/blob/7847cc70ef374ab26a6cc7953461cf25603e9a6d/.github/workflows/ci.yaml#L21)
* Enable [long-term assets caching](https://create-react-app.dev/docs/production-build/#static-file-caching) on the server hosting your app.
* Make sure not to build your app and the keycloak theme separately and remember to update the Keycloak theme every time you update your app.
* Be mindful that if your app is down your login pages are down as well.

Checkout a complete setup [here](https://github.com/garronej/keycloakify-demo-app#about-keycloakify)