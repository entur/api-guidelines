# API Guidelines

## Human-readable API Guidelines
A human-readable version of the API Guidelines at Entur can be found [here](guidelines.md). The rest of this document describes how to do automatic checks on your API using a linter. 

## Linting your API
By "linting your API", we mean [linting](https://en.wikipedia.org/wiki/Lint_(software)) the [OpenAPI specification](https://swagger.io/specification/) of your API.
This is done using [Spectral](https://docs.stoplight.io/docs/spectral/674b27b261c3c-overview) with the Entur [linting rules](.spectral.yml).

### Adding the linter as a Github Action
[gha-api linter](https://github.com/entur/gha-api)

### Running the linter on the command line, using Spectral CLI

#### Installing Spectral CLI
Using npm:  
`npm install -g @stoplight/spectral-cli`

Or using yarn:  
`yarn global add @stoplight/spectral-cli`

#### Running Spectral CLI
`spectral lint api-spec.json --ruleset https://raw.githubusercontent.com/entur/api-guidelines/refs/tags/v2/.spectral.yml`


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
      "pre-commit": "spectral lint specs/*.{json,yml,yaml} --ruleset https://raw.githubusercontent.com/entur/api-guidelines/refs/tags/v0.1.0/.spectral.yml",
      "pre-push": "spectral lint specs/*.{json,yml,yaml} --ruleset https://raw.githubusercontent.com/entur/api-guidelines/refs/tags/v0.1.0/.spectral.yml",
      "...": "..."
    }
  }
}
```
