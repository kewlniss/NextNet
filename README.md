# NextNet sample

This sample illustrates a few things that help run a Next.js application reliably and at scale with an ASP .NET Core server.
This used [NextJsStaticHosting-AspNetCore](https://github.com/davidnx/NextjsStaticHosting-AspNetCore) as a starting point. It is using the Nuget package from David's project.
His article can be found [here](https://medium.com/@david.nissimoff/next-js-meets-asp-net-core-a-story-of-performance-and-love-at-long-tail-41cf9231b2de).

The key thing to note is this is strictly for SSG (Static Site Generation) and CSR (Client Side Rendering). It is not for SSR (Server Side Rendering). Fortunately, NextJs prefers SSG over SSR anyway and when working with sites SSG + CSR meets most needs.

## 1. Folder structure

Notice the folders `NextNet.API` and `NextNet.ClientApp`.

Ultimately, the Client App is built and exported to the API's /wwwroot folder. That is where ASP.NET serves static files so it made sense to me to output them there. I didn't need any other files in wwwroot besides what gets generated from NextJs so this works for me.

In the package.json the export goes to /wwwroot folder of the API with the added ` -o ../NextNet.API/wwwroot`

## Dev experience

When developing locally, you need to do two things:

1. Run your Next.js app in development, which gives you full Hot-Module-Reload support with NextJsStaticHosting.AspNetCore.
   Example: `cd ./NextNet.ClientApp && yarn dev`

2. Run the server ASP .NET Core app in development mode (i.e. `ASPNETCORE_ENVIRONMENT=Development`).
   This is done automatically for you when running from Visual Studio.
   Notice that when the server app runs in development mode, the `appsettings.Development.json` file
   instructs `NextJsStaticHosting.AspNetCore` to proxy appropriate requests to your local Next.js dev server
   via configuration keys `NextjsStaticHosting:DevServer` and `NextjsStaticHosting:ProxyToDevServer`

## Production experience

When deploying to production, `NextNet.API` is configured to copy the compiled Next.js app outputs to the published outputs.
When running in production, configuration option `NextjsStaticHosting:ProxyToDevServer` is `false` (default), therefore no proxying
will be performed, and the right files will be served directly from disk.

This means you WILL NOT run Node.js in production. All Next.js compiled outputs will be served as static files
but with smart routing capabilities to enable full fidelity to an actual Next.js server running in SSG-only mode.

**Remember to build and export the client app before publishing `NextNet.API`!** This can be automated with MSBuild in the csproj if desired, but isn't shown in this demo.
