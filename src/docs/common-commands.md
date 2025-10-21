The Nest CLI command to generate a controller without a spec file:
```shell
nest g controller gemname --no-spec
```

To set the output folder of the generated controller file:
```shell
nest g controller controllers/gemname --no-spec
```

To delete a controller and its associated files, you can use the nest g controller command with the --dry-run flag first to see what files would be affected, then manually remove them.
```shell
nest g controller gemname --dry-run
```

xml2js package to convert JavaScript objects to XML
```shell
npm install xml2js
```