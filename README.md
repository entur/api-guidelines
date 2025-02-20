# API Guidelines

## Human-readable API Guidelines
A human-readable version of the API Guidelines at Entur can be found [here](guidelines.md). The rest of this document describes how to do automatic checks on your API using a linter. 

## Linting your API
By "linting your API", we mean [linting](https://en.wikipedia.org/wiki/Lint_(software)) the [OpenAPI specification](https://swagger.io/specification/) of your API.
This is done using [Spectral](https://docs.stoplight.io/docs/spectral/674b27b261c3c-overview) with the Entur [linting rules](.spectral.yml).

### Running the linter on the command line, using Spectral CLI

This is the eaiest way to quickly try out the linter.

#### Installing Spectral CLI
Using npm:  
`npm install -g @stoplight/spectral-cli`

Or using yarn:  
`yarn global add @stoplight/spectral-cli`

#### Running Spectral CLI
Download [.spectral.yml](.spectral.yml), and then:   
`spectral lint api-spec.json --ruleset .spectral.yaml`


### Running the linter in your IDE

[Spectral Linter for VS Code](https://marketplace.visualstudio.com/items?itemName=stoplight.spectral)

Spectral Linter for Intellij : No good plugin seems to exist yet.

### Running the linter using Git-hooks

[Git hooks](https://git-scm.com/docs/githooks) are programs or commands you can set up and have them run when you commit or push.

Here's an example of a Spectral Git hook using Husky:

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "spectral lint ./openapi/**/*.{json,yml,yaml}",
      "pre-push": "spectral lint ./openapi/**/*.{json,yml,yaml}",
      "...": "..."
    }
  }
}
```